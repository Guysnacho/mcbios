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
        console.log("starting code creation");
        const body = JSON.parse(req.body);
        console.log(body);
        const reqType = validateCouponRequest(body);
        if (reqType === "INVALID") {
          res.status(400).end();
          break;
        } else if (reqType === "DUPLICATE") {
          console.log("Creating duplicate promo code for coupon");
          const promoResponse = await stripe.promotionCodes.create({
            coupon: body.coupon,
            max_redemptions: 1,
          });
          res.send(promoResponse);
        } else {
          // Create coupon
          const couponResponse = await stripe.coupons.create({
            name: body.couponName,
            percent_off: body.discount,
            max_redemptions: 1,
            applies_to: {
              products: [
                process.env.CONF_REGISTRATION_STUDENT_PRODUCT!,
                process.env.CONF_REGISTRATION_POSTDOC_PRODUCT!,
                process.env.CONF_REGISTRATION_PROFESSIONAL_PRODUCT!,
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

          res.send(promoResponse);
        }
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
        ({
          active,
          code,
          created,
          max_redemptions,
          times_redeemed,
          expires_at,
          coupon,
          id,
        }) => ({
          coupon,
          active,
          promo_code: code,
          promo_id: id,
          created: created * 1000,
          max_redemptions,
          times_redeemed,
          expires_at,
        })
      );
      res.send(promo);
      break;
    case "DELETE":
      console.log("starting code delete");
      const body = JSON.parse(req.body);
      console.log(body);
      const code: string | null = body.promo || body.coupon || null;

      console.log("Code recieved - %s", code);
      let reqType: "promo" | "coupon";
      if (!code) {
        res.status(400).end("Invalid body");
        break;
      } else if (body.coupon) {
        reqType = "coupon";
      } else if (body.promo) {
        reqType = "promo";
      } else {
        res.status(400).end("Invalid body");
        break;
      }

      if (reqType === "coupon") {
        console.log("Deleting coupon");
        const data = await stripe.coupons.del(code);
        console.log("Coupon response");
        console.log(data);
        res.send({ id: data.id, deleted: data.deleted });
      } else {
        console.log("Deleting promotion code");
        const data = await stripe.promotionCodes.update(code, {
          active: false,
        });
        console.log("promotion code delete response");
        console.log(data);
        res.send({
          id: data.id,
          active: data.active,
          coupon: data.coupon,
          code: data.code,
        });
      }

      break;
    // Fetch session result on confir mation page
    default:
      res.setHeader("Allow", req.method!);
      res.status(405).end("Method Not Allowed");
  }
}

const validateCouponRequest = (body: any) => {
  const hasDiscount =
    body.discount != undefined && Number.isInteger(body.discount);
  const hasCoupon = body.coupon != undefined;
  const hasCouponName = body.couponName != undefined;
  if (hasDiscount && hasCouponName) {
    return "NEW_COUPON";
  } else if (hasCoupon && !hasDiscount && !hasCouponName) {
    return "DUPLICATE";
  } else {
    return "INVALID";
  }
};
