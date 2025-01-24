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
    case "POST":
      try {
        // Create coupon
        const couponResponse = await stripe.coupons.create({
          percent_off: 100,
          max_redemptions: 1,
          applies_to: {
            products: [
              process.env.EB_CONF_REGISTRATION_STUDENT_PRODUCT!,
              process.env.EB_CONF_REGISTRATION_POSTDOC_PRODUCT!,
              process.env.EB_CONF_REGISTRATION_PROFESSIONAL_PRODUCT!,
              process.env.CONF_REGISTRATION_STUDENT_PRODUCT!,
              process.env.CONF_REGISTRATION_POSTDOC_PRODUCT!,
              process.env.CONF_REGISTRATION_PROFESSIONAL_PRODUCT!]
          }
        })

        console.log(couponResponse)

        res.send(couponResponse);
      } catch (err) {
        // @ts-expect-error error fields are unknown
        res.status(err.statusCode || 500).json(err.message);
      }
      break;
    // Fetch session result on confirmation page
    default:
      res.setHeader("Allow", req.method!);
      res.status(405).end("Method Not Allowed");
  }
}
