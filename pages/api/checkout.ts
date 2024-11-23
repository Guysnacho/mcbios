import { PaymentHandlerType } from "@/components/dashboard/admin/PaymentHandler";
import createClient from "@/lib/utils/supabase/service";
import { Database } from "@/lib/utils/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";

/**
 * MCBIOS Payment Endpoint
 * @param req
 * @param res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  switch (req.method) {
    // Request embedded form using params
    case "POST":
      try {
        const body = JSON.parse(req.body);
        const price = derivePriceId(body.tier as PaymentHandlerType);
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          ui_mode: "embedded",
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of
              // the product you want to sell
              price,
              quantity: 1,
            },
          ],
          mode: "payment",
          return_url: `${req.headers.origin}/dashboard/payment/{CHECKOUT_SESSION_ID}`,
          customer_email: body.email,
          customer_creation: "always",
          metadata: {
            userId: body.userId,
            email: body.email,
            tier: body.tier,
          },
        });

        res.send({ clientSecret: session.client_secret });
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
      break;
    // Fetch session result on confirmation page
    case "GET":
      try {
        console.log(req.query);
        const session = await stripe.checkout.sessions.retrieve(
          req.query.session_id as string
        );

        if (session.status === "complete") {
          console.log(
            `Payment completed for user ${session!.metadata!.userId}!`
          );
          const client = createClient(req, res);
          await handleUpdate(client, session);
          console.log(
            `Table update complete | user_role=${
              session!.metadata!.tier
            } user_id=${session!.metadata!.userId}`
          );
        }

        res.send({
          status: session.status,
          customer_email: session!.customer_details!.email,
        });
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
      break;
    default:
      res.setHeader("Allow", req.method);
      res.status(405).end("Method Not Allowed");
  }
}

/**
 * Derive the price ID from ID's listed in env file
 * @param tier
 * @returns
 */
function derivePriceId(tier: PaymentHandlerType): string {
  switch (tier) {
    case "student":
      return process.env.EB_CONF_REGISTRATION_STUDENT!;
      break;
    case "postdoctorial":
      return process.env.EB_CONF_REGISTRATION_POSTDOC!;
      break;
    case "professional":
      return process.env.EB_CONF_REGISTRATION_PROFESSIONAL!;
      break;
    case "member_only_student":
      return process.env.STUDENT!;
      break;
    case "member_only_postdoctorial":
      return process.env.POSTDOC!;
      break;
    case "member_only_professional":
      return process.env.PROFESSIONAL!;
      break;

    default:
      return "";
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
  session: Stripe.Response<Stripe.Checkout.Session>
) {
  await client
    .from("member")
    .update({
      dues_paid_at: new Date().toISOString(),
      role: session!.metadata!.tier as Database["public"]["Enums"]["user_role"],
    })
    .eq("user_id", session!.metadata!.userId);
}
