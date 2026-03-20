import { Events, useAnalytics } from "@/lib";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback, useMemo } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

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

export const PaymentHandler = ({
  tier,
  userId,
  email,
  fname,
  lname,
  institution,
}: PaymentBody) => {
  const { trackEvent } = useAnalytics();
  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    const res = await fetch("/checkout", {
      method: "POST",
      body: JSON.stringify({
        tier,
        userId,
        email,
        fname,
        lname,
        institution,
      } as PaymentBody),
    });
    const data = await res.json();
    trackEvent(Events.REGISTRATION.CHECKOUT_FORM_CREATED, undefined);
    return data.clientSecret;
  }, [email, tier, userId, fname, lname, institution]);

  const options = useMemo(() => ({ fetchClientSecret }), [fetchClientSecret]);

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout id={`stripe-checkout-${tier}`} />
      </EmbeddedCheckoutProvider>
    </div>
  );
};
