import { createBrowserClient } from "@supabase/ssr";
import { clearHostOnlyAuthCookies, cookieDomainFor } from "./cookie-domain";
import { Database } from "./types";

export function createClient() {
  const domain =
    typeof window === "undefined"
      ? undefined
      : cookieDomainFor(window.location.hostname);
  if (domain) clearHostOnlyAuthCookies();

  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUB_KEY!,
    {
      ...(domain ? { cookieOptions: { domain } } : {}),
      global: {
        headers: {
          org_id: process.env.NEXT_PUBLIC_ORG_ID,
        },
      },
    },
  );
}
