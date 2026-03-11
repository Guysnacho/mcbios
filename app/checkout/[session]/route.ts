import { handleStripeRawUpdate, handleStripeSessionUpdate } from "@/lib/common";
import createClient from "@/lib/supabase/service";
import { NextRequest } from "next/server";
import { Stripe } from "stripe";

/**
 * Fetch session result on confirmation page
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
        await handleStripeSessionUpdate(client, session);
        console.log(
          `Table update complete | user_role=${session.metadata.tier} | user_id=${session.metadata.userId} | member_only=${session.metadata.memberOnly}`,
        );
      } else {
        console.log("Handling unauthenticated registration update");
        await handleStripeRawUpdate(client, session);
      }
    }

    return Response.json(
      {
        status: session.status,
        customer_email: session!.customer_details!.email,
      },
      { status: 201 },
    );
  } catch (err) {
    return Response.json(
      // @ts-expect-error should be an error message somewhere
      { message: err.message },
      { status: 500 },
    );
  }
}
