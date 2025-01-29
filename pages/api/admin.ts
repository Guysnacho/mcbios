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
              process.env.CONF_REGISTRATION_PROFESSIONAL_PRODUCT!,
            ],
          },
        });

        const promoResponse = await stripe.promotionCodes.create({
          coupon: couponResponse.id,
          max_redemptions: 1,
        });

        let final = couponResponse;
        final.id = promoResponse.code;

        res.send(final);
      } catch (err) {
        // @ts-expect-error error fields are unknown
        res.status(err.statusCode || 500).json(err.message);
      }
      break;
    case "GET":
      const data = await stripe.promotionCodes.list({
        limit: 100,
        active: true,
      });
      const promo = data.data.map(
        ({ active, code, created, max_redemptions, times_redeemed }) => ({
          active,
          code,
          created: new Date(created * 1000),
          max_redemptions,
          times_redeemed,
        })
      );
      res.send(promo);
      break;
    // Fetch session result on confir mation page
    default:
      res.setHeader("Allow", req.method!);
      res.status(405).end("Method Not Allowed");
  }
}
