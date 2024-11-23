import { Database } from "@/lib/utils/supabase/types";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export type PaymentHandlerType =
  | Database["public"]["Enums"]["user_role"]
  | undefined;

export const PaymentHandler = ({
  tier,
  userId,
}: {
  tier: PaymentHandlerType;
  userId: string;
}) => {
  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ tier, userId }),
    });
    const data = await res.json();
    return data.clientSecret;
  }, [tier]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout id={`stripe-checkout-${tier}`} />
      </EmbeddedCheckoutProvider>
    </div>
  );
};
