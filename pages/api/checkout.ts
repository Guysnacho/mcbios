import { PaymentHandlerType } from "@/components/dashboard/admin/PaymentHandler";
import createClient from "@/lib/utils/supabase/service";
import { Database } from "@/lib/utils/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  switch (req.method) {
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
    case "GET":
      try {
        const session = await stripe.checkout.sessions.retrieve(
          req.query.session_id as string
        );

        if (session.status === "complete") {
          console.log(
            `Payment completed for user ${session!.metadata!.userId}!`
          );
          const client = createClient(req, res);
          await handleUpdate(client, session);
          console.log(`Table update complete`);
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
function derivePriceId(tier: PaymentHandlerType): string {
  switch (tier) {
    case "professional":
      return process.env.CONF_REGISTRATION!;
      break;
    case "postdoctorial":
      return process.env.CONF_REGISTRATION!;
      break;
    case "student":
      return process.env.CONF_REGISTRATION!;
      break;

    default:
      return "";
      break;
  }
}
async function handleUpdate(
  client: SupabaseClient<Database>,
  session: Stripe.Response<Stripe.Checkout.Session>
) {
  await client
    .from("member")
    .update({ dues_paid_at: new Date().toISOString() })
    .eq("user_id", session!.metadata!.userId);
}
