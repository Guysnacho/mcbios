import { useAptabase } from "@aptabase/react";

export const useAnalytics = () => {
  const { trackEvent: aptabaseTrackEvent } = useAptabase();

  function trackEvent(
    eventName: string,
    eventBody?: Record<string, string | number | boolean>,
  ) {
    aptabaseTrackEvent(eventName, {
      ...eventBody,
      org: process.env.NEXT_PUBLIC_ORG_ID ?? "",
      url: process.env.NEXT_PUBLIC_APP_URL ?? "",
    });
  }

  return { trackEvent };
};

export const isPresent = (str?: string) => {
  return str !== undefined && str !== "";
};

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Conference Suite base URL. Must be the canonical host: browsers will not follow
 * a redirect on a CORS preflight, and the old suite.tunjiproductions.com now
 * redirects (twice) to www.conferencesuite.net.
 */
export const getBaseServiceURL = () =>
  process.env.NEXT_PUBLIC_SUITE_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://www.conferencesuite.net");
