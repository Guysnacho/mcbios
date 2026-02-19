import { useAptabase } from "@aptabase/react";

export const isPresent = (str?: string) => {
  return str !== undefined && str !== "";
};

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const useAnalytics = () => {
  const { trackEvent: aptabaseTrackEvent } = useAptabase();

  function trackEvent(
    eventName: string,
    eventBody: Record<string, string | number | boolean> | undefined,
  ) {
    aptabaseTrackEvent(eventName, {
      ...eventBody,
      org: process.env.NEXT_PUBLIC_ORG_ID,
      url: process.env.NEXT_PUBLIC_APP_URL,
    });
  }

  return { trackEvent };
};
