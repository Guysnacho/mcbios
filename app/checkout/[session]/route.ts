import createClient from "@/lib/supabase/service";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import { Stripe } from "stripe";

/**
 * Fetch session result on confirmation page
 * @param _req 
 * @param param1 
 * @returns 
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ session: string }> },
) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const loadedParams = await params;

    console.info(
      "Starting checkout session confirmation. Session Id",
      loadedParams.session,
    );

    const session = await stripe.checkout.sessions.retrieve(
      loadedParams.session,
    );

    if (session.status === "complete") {
      console.log(
        session!.metadata!.userId
          ? `Payment completed for user ${session!.metadata!.userId}!`
          : `Payment completed for an unauthenticated user - ${session.metadata!.fname} ${session.metadata!.lname}!`,
      );
      const client = createClient();
      if (session && session.metadata && session.metadata["userId"]) {
        console.log("Updated authed user");
        await handleUpdate(client, session);
        console.log(
          `Table update complete | user_role=${
            session.metadata.tier
          } | user_id=${session.metadata.userId} | member_only=${
            session.metadata.memberOnly
          }`,
        );
      } else {
        console.log("Handling unauthenticated registration update");
        await handleRawUpdate(client, session);
      }
    }

    return Response.json(
      {
        status: session.status,
        customer_email: session!.customer_details!.email,
      },
      {
        status: 201,
      },
    );
  } catch (err) {
    return Response.json(
      // @ts-expect-error should be an error message somewhere
      { message: err.message },
      {
        status: 500,
      },
    );
  }
}

/**
 * Update user's role and payment date in DB
 * @param client
 * @param session
 */
async function handleUpdate(
  client: SupabaseClient<Database>,
  session: Stripe.Response<Stripe.Checkout.Session>,
) {
  const { data, error } = await client
    .from("member")
    .update({
      fees_paid_at: new Date().toISOString(),
      role: session!.metadata!.tier as Database["public"]["Enums"]["user_role"],
      institution: session!.metadata!.institution,
    })
    .eq("user_id", session!.metadata!.userId)
    .eq("org_id", process.env.NEXT_PUBLIC_ORG_ID)
    .select("user_id")
    .maybeSingle();

  if (error) {
    console.error(error.message);
    return;
  }

  const { error: appendError } = await client.rpc(
    "append_current_year_to_attended",
    {
      target_user: data!.user_id,
    },
  );

  if (appendError) {
    console.error(appendError.message);
    return;
  }

  console.log(`Successfully updated attendee year for user=${data?.user_id}`);
}

/**
 * Take note of unauthed registration
 * @param client
 * @param session
 */
async function handleRawUpdate(
  client: SupabaseClient<Database>,
  session: Stripe.Response<Stripe.Checkout.Session>,
) {
  console.log("Recording unauthenticated registration");
  await client.from("raw_registration").upsert(
    {
      org_id: process.env.NEXT_PUBLIC_ORG_ID,
      email: session.metadata!.email,
      fname: session.metadata!.fname,
      lname: session.metadata!.lname,
      institution: session!.metadata!.institution,
      created_at: new Date().toISOString(),
      role: session!.metadata!.tier as Database["public"]["Enums"]["user_role"],
    },
    {
      ignoreDuplicates: false,
    },
  );
}
