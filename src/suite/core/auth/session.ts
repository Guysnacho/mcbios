import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { SuiteConfig } from "../types";
import { getOrg } from "./api";
import { type CookieEnv, browserCookieEnv, createCookieHandlers, createDomainResolver } from "./cookies";

export type SuiteSession = {
  supabase: SupabaseClient;
  /** Await before a sign-in writes its first cookie, so the shared domain is known. */
  ensureCookieDomain: () => Promise<void>;
  /** The Domain the session cookie uses on this host (undefined = host-only). */
  cookieDomain: () => string | undefined;
};

/**
 * The Supabase browser client for this org. Cookie format is @supabase/ssr's
 * (shared with the main site); the Domain comes from config or the org's base_url.
 */
export function createSuiteSession(
  config: SuiteConfig,
  deps: { env?: CookieEnv; fetch?: typeof fetch } = {},
): SuiteSession {
  const env = deps.env ?? browserCookieEnv();
  const domain = createDomainResolver({
    orgId: config.orgId,
    explicit: config.cookieDomain,
    env,
    fetchOrgUrl: async () => (await getOrg(config, deps.fetch)).url,
  });

  const supabase = createBrowserClient(config.supabaseUrl, config.supabaseKey, {
    // The suite's RLS reads the org from this header (same as the main site)
    global: { headers: { org_id: config.orgId } },
    cookies: createCookieHandlers(env, domain.resolve),
  });

  return { supabase, ensureCookieDomain: domain.ensure, cookieDomain: domain.resolve };
}
