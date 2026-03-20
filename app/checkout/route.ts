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
    const idempotencyKey = `checkout-${body.email}-${body.fname}-${body.tier}`;
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
      return_url: `${process.env.NEXT_PUBLIC_APP_URL!}/payment/{CHECKOUT_SESSION_ID}`,
      customer_email: body.email,
      customer_creation: "always",
      metadata: {
        userId: body.userId!,
        email: body.email!,
        fname: body.fname!,
        lname: body.lname!,
        institution: body.institution!,
        tier: price.tier || "student",
        memberOnly: price.memberOnly!,
      },
    }, { idempotencyKey });

    return Response.json({ clientSecret: session.client_secret });
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
      return Response.json({}, { status: 400 });
    }
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
 * Take note of unauthed registration
 * @param client
 * @param body
 */
async function handleInstitutionUpdate(
  client: SupabaseClient<Database>,
  body: PaymentBody,
) {
  console.log("Recording unauthenticated registration");
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
      "Issue updating unauthenticated registration - ",
      error?.message || "Upsert failed",
    );
    throw new Error(
      "Issue updating unauthenticated registration - " + error?.message ||
        "Upsert failed",
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
    ((isPresent(body.fname) &&
      isPresent(body.lname) &&
      isPresent(body.institution)) ||
      isPresent(body.userId)) &&
    isPresent(body.email) &&
    (body.tier satisfies PaymentBody["tier"])
  );
}
