"use client";

import { Events, getBaseServiceURL, useAnalytics } from "@/lib";
import { fetchRegistrationProducts, SuiteProduct } from "@/lib/registration";
import { createClient } from "@/lib/supabase/client";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useCallback, useEffect, useState } from "react";

export type PaymentHandlerType =
  | "professional"
  | "student"
  | "postdoctorial"
  | "member_only_professional"
  | "member_only_student"
  | "member_only_postdoctorial"
  | undefined;

export type PaymentBody = {
  tier: PaymentHandlerType;
  userId?: string;
  email: string;
  fname?: string;
  lname?: string;
  institution?: string;
};

type Checkout = { stripe: Promise<Stripe | null>; priceId: string };

/**
 * Price for a tier from the suite's registration products (one product per
 * role, `metadata.role`). Member-only tiers need a product tagged
 * `metadata.type = "membership"`; everything else is the conference price.
 */
function findPriceId(products: SuiteProduct[], tier: NonNullable<PaymentHandlerType>) {
  const memberOnly = tier.startsWith("member_only_");
  const role = tier.replace("member_only_", "");
  const product = products.find(
    (p) =>
      p.active &&
      p.metadata?.role === role &&
      (p.metadata?.type === "membership") === memberOnly,
  );
  const price = product?.default_price;
  return typeof price === "string" ? price : price?.id;
}

/**
 * Embedded registration checkout. Prices and the checkout session come from the
 * Conference Suite (Stripe Connect); the suite's webhook applies the payment, so
 * this site holds no Stripe secret key and no service-role key.
 */
export const PaymentHandler = ({
  tier,
  email,
  fname,
  lname,
  institution,
}: PaymentBody) => {
  const { trackEvent } = useAnalytics();
  const [checkout, setCheckout] = useState<Checkout>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!tier) return;
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchRegistrationProducts();
        const priceId = findPriceId(data.products ?? [], tier);
        const key = data.publishableKey;
        if (!priceId || !key || !data.stripeAccount) {
          throw new Error(
            data.configError
              ? "Payments are not available right now"
              : "No matching product found for the selected tier",
          );
        }
        if (!cancelled) {
          setCheckout({
            stripe: loadStripe(key, { stripeAccount: data.stripeAccount }),
            priceId,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unable to load payments");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [tier]);

  const fetchClientSecret = useCallback(async () => {
    trackEvent(Events.REGISTRATION.CHECKOUT_FORM_CREATED, undefined);
    // Signed-in members send their access token; the suite derives the member
    // from it (never from the body).
    const { data: sessionData } = await createClient().auth.getSession();
    const token = sessionData.session?.access_token;

    const res = await fetch(
      `${getBaseServiceURL()}/api/stripe/registration-checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          org_id: process.env.NEXT_PUBLIC_ORG_ID,
          price_id: checkout!.priceId,
          email,
          fname,
          lname,
          institution,
          return_url: `${window.location.origin}/payment/{CHECKOUT_SESSION_ID}`,
        }),
      },
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message ?? "Unable to start checkout");
    return data.clientSecret as string;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkout, email, fname, lname, institution]);

  if (error) return <p role="alert">{error}</p>;
  if (!checkout) return null;

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={checkout.stripe}
        options={{ fetchClientSecret }}
      >
        <EmbeddedCheckout id={`stripe-checkout-${tier}`} />
      </EmbeddedCheckoutProvider>
    </div>
  );
};
