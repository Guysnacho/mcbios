import { PaymentHandlerType } from "@/components/dashboard/admin/PaymentHandler";
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
        const price = derivePriceId(req.query.tier as PaymentHandlerType);
        console.debug("price - ", price);
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
        });

        res.send({ clientSecret: session.client_secret });
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
      break;
    case "GET":
      try {
        const session = await stripe.checkout.sessions.retrieve(
          req.query.session_id
        );

        res.send({
          status: session.status,
          customer_email: session.customer_details.email,
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
  console.debug("tier - ", tier);
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
