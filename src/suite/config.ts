import type { SuiteConfig } from "./core/types";

/**
 * The only file in src/suite/ that reads process.env. Everything else takes a
 * SuiteConfig, so the folder can move into a package unchanged.
 */
export const suiteConfig: SuiteConfig = {
  orgId: process.env.NEXT_PUBLIC_ORG_ID ?? "",
  suiteUrl: process.env.NEXT_PUBLIC_SUITE_URL || "https://www.conferencesuite.net",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_PUB_KEY ?? "",
  // Optional. When unset the domain is derived from the org's base_url (see core/cookie-domain).
  cookieDomain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined,
};
