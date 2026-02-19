"use client";

import { Events, useAnalytics } from "@/lib";

export function PaymentAnalyticsTrigger({ error }: { error?: string }) {
  const { trackEvent } = useAnalytics();
  trackEvent(
    Events.REGISTRATION.RESULT,
    error
      ? {
          error: error ? error : false,
        }
      : { success: true },
  );
  return <></>;
}
