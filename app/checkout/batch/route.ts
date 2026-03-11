import {
  handleStripeRawUpdate,
  handleStripeSessionUpdate,
  wait,
} from "@/lib/common";
import createClient from "@/lib/supabase/service";
import { NextRequest } from "next/server";
import { Stripe } from "stripe";

export type BatchSessionResult = {
  sessionId: string;
  success: boolean;
  customer_email?: string;
  message?: string;
};

/**
 * Batch confirm multiple Stripe session IDs.
 * Sleeps 5 seconds after every 25 sessions to avoid rate limits.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sessionIds: string[] = body.sessionIds;

    if (!Array.isArray(sessionIds) || sessionIds.length === 0) {
      return Response.json(
        { message: "sessionIds must be a non-empty array" },
        { status: 400 },
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const client = createClient();
    const results: BatchSessionResult[] = [];

    for (let i = 0; i < sessionIds.length; i++) {
      const sessionId = sessionIds[i].trim();

      if (i > 0 && i % 25 === 0) {
        await wait(5000);
      }

      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.status === "complete") {
          if (session.metadata?.userId) {
            await handleStripeSessionUpdate(client, session);
          } else {
            await handleStripeRawUpdate(client, session);
          }
          results.push({
            sessionId,
            success: true,
            customer_email: session.customer_details?.email ?? undefined,
          });
        } else {
          results.push({
            sessionId,
            success: false,
            message: `Session status is "${session.status}" — not complete`,
          });
        }
      } catch (err) {
        results.push({
          sessionId,
          success: false,
          message: err instanceof Error ? err.message : "Unknown error",
        });
      }
    }

    return Response.json({ results }, { status: 200 });
  } catch (err) {
    return Response.json(
      // @ts-expect-error error message
      { message: err.message },
      { status: 500 },
    );
  }
}
