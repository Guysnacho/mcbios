"use client";

import { useAnalytics } from "@/lib/common";
import { useEffect } from "react";

export function PageViewTracker({ event }: { event: string }) {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent(event);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
