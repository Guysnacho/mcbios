"use client";

import { Events, useAnalytics } from "@/lib";
import { useEffect } from "react";

export function PaymentAnalyticsTrigger({ error }: { error?: string }) {
  const { trackEvent } = useAnalytics();
  useEffect(() => {
    trackEvent(
      Events.REGISTRATION.RESULT,
      error
        ? {
            error: error ? error : false,
          }
        : { success: true },
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
