"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useRef, useState } from "react";
import { ui } from "./classes";

/**
 * Stripe's embedded checkout, mounted with the vanilla API (no react-stripe-js).
 * Card entry happens in Stripe's own frame; this only provides the mount point,
 * and cleans it up. `stripeAccount` is the org's connected account (a direct charge).
 */
export function CheckoutMount({
  publishableKey,
  stripeAccount,
  clientSecret,
}: {
  publishableKey: string;
  stripeAccount: string;
  clientSecret: string;
}) {
  const el = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let destroyed = false;
    let checkout: { destroy: () => void } | null = null;
    (async () => {
      try {
        const stripe = await loadStripe(publishableKey, { stripeAccount });
        if (!stripe) throw new Error("Stripe did not load");
        const embedded = await stripe.initEmbeddedCheckout({ clientSecret });
        if (destroyed) return embedded.destroy();
        checkout = embedded;
        if (el.current) embedded.mount(el.current);
      } catch {
        if (!destroyed) setError("We could not load the payment form. Check your connection and try again.");
      }
    })();
    return () => {
      destroyed = true;
      checkout?.destroy();
    };
  }, [publishableKey, stripeAccount, clientSecret]);

  return (
    <section aria-label="Secure payment form" className="flex flex-col gap-3">
      {error && (
        <p role="alert" className={ui.statusError}>
          {error}
        </p>
      )}
      <div ref={el} />
    </section>
  );
}
