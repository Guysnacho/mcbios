import {
  PaymentBody,
  PaymentHandlerType,
} from "@/components/dashboard/PaymentHandler";
import { isPresent } from "@/lib";
import createClient from "@/lib/supabase/service";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import { Stripe } from "stripe";

/**
 * Request embedded form using params
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentBody;

    if (!isValidSessionCreateBody(body))
      return Response.json({}, { status: 400 });

    const price = derivePriceId(body.tier as PaymentHandlerType);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      allow_promotion_codes: true,
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${req.headers.get("origin")}/payment/{CHECKOUT_SESSION_ID}`,
      customer_email: body.email,
      customer_creation: "if_required",
      metadata: {
        userId: body.userId!,
        email: body.email!,
        fname: body.fname!,
        lname: body.lname!,
        institution: body.institution!,
        tier: price.tier || "student",
        memberOnly: price.memberOnly!,
      },
    });

    Response.json({ clientSecret: session.client_secret });
  } catch (err) {
    Response.json(
      // @ts-expect-error should be an error message somewhere
      { message: err.message },
      {
        status: 500,
      },
    );
  }
}

/**
 * Fetch session result on confirmation page
 * @param req
 * @returns
 */
export async function GET(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const session = await stripe.checkout.sessions.retrieve(
      req.headers.get("session_id")!,
    );

    if (session.status === "complete") {
      console.log(`Payment completed for user ${session!.metadata!.userId}!`);
      const client = createClient();
      if (session!.metadata!.userId ?? false) {
        console.log("Updated authed user");
        await handleUpdate(client, session);
        console.log(
          `Table update complete | user_role=${
            session!.metadata!.tier
          } | user_id=${session!.metadata!.userId} | member_only=${
            session!.metadata!.memberOnly
          }`,
        );
      } else await handleRawUpdate(client, session);
    }

    return Response.json({
      status: session.status,
      customer_email: session!.customer_details!.email,
    });
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
 * Retroactively update user with institution
 * @param req
 * @returns
 */
export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentBody;
    console.log(body);
    if (isValidUpdateBody(body)) {
      const client = createClient();
      return await handleInstitutionUpdate(client, body)
        .then(() => Response.json({}, { status: 201 }))
        .catch((err) =>
          Response.json({ message: err.message }, { status: 500 }),
        );
    } else {
      Response.json({}, { status: 400 });
    }
  } catch (err) {
    Response.json(
      // @ts-expect-error should be an error message somewhere
      { message: err.message },
      {
        status: 500,
      },
    );
  }
}

/**
 * Derive the price ID from ID's listed in env file
 * @param tier
 * @returns
 */
function derivePriceId(tier: PaymentHandlerType): {
  id?: string;
  tier?: Database["public"]["Enums"]["user_role"];
  memberOnly?: string;
} {
  switch (tier) {
    case "student":
      return {
        id: process.env.CONF_REGISTRATION_STUDENT!,
        // id: process.env.EB_CONF_REGISTRATION_STUDENT!,
        tier: "student",
        memberOnly: "false",
      };
      break;
    case "postdoctorial":
      return {
        id: process.env.CONF_REGISTRATION_POSTDOC!,
        // id: process.env.EB_CONF_REGISTRATION_POSTDOC!,
        tier: "postdoctorial",
        memberOnly: "false",
      };
      break;
    case "professional":
      return {
        id: process.env.CONF_REGISTRATION_PROFESSIONAL!,
        // id: process.env.EB_CONF_REGISTRATION_PROFESSIONAL!,
        tier: "professional",
        memberOnly: "false",
      };
      break;
    case "member_only_student":
      return { id: process.env.STUDENT!, tier: "student", memberOnly: "true" };
      break;
    case "member_only_postdoctorial":
      return {
        id: process.env.POSTDOC!,
        tier: "postdoctorial",
        memberOnly: "true",
      };
      break;
    case "member_only_professional":
      return {
        id: process.env.PROFESSIONAL!,
        tier: "professional",
        memberOnly: "true",
      };
      break;

    default:
      return {};
      break;
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
  console.log("Recording raw registration");
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
      onConflict: "email",
    },
  );
}

/**
 * Take note of unauthed registration
 * @param client
 * @param body
 */
async function handleInstitutionUpdate(
  client: SupabaseClient<Database>,
  body: PaymentBody,
) {
  console.log("Recording raw registration");
  const { data, error } = await client
    .from("raw_registration")
    .upsert({
      org_id: process.env.NEXT_PUBLIC_ORG_ID,
      email: body.email!,
      fname: body.fname!,
      lname: body.lname!,
      institution: body.institution,
      created_at: new Date().toISOString(),
      role: body.tier as Database["public"]["Enums"]["user_role"],
    })
    .select();
  if (error || !data || data.length == 0) {
    console.error(
      "Issue updating raw registration - ",
      error?.message || "Upsert failed",
    );
    throw new Error(
      "Issue updating raw registration - " + error?.message || "Upsert failed",
    );
  } else {
    console.log("Successfully updated registration for user - ", data);
  }
}

/**
 * Is a valid update request
 * @param body
 */
function isValidUpdateBody(body: PaymentBody) {
  return (
    isPresent(body.email) &&
    isPresent(body.fname) &&
    isPresent(body.lname) &&
    (body.tier satisfies PaymentBody["tier"]) &&
    isPresent(body.institution)
  );
}

/**
 * Is a valid update request
 * @param body
 */
function isValidSessionCreateBody(body: PaymentBody) {
  return (
    isPresent(body.email) &&
    isPresent(body.fname) &&
    isPresent(body.lname) &&
    (body.tier satisfies PaymentBody["tier"]) &&
    isPresent(body.institution)
  );
}
