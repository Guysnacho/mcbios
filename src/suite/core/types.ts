/** Everything the SDK needs from its host app. Built once, in src/suite/config.ts. */
export type SuiteConfig = {
  /** The org's id in the Conference Suite */
  orgId: string;
  /** Suite origin, canonical host (browsers won't follow redirects on CORS preflights) */
  suiteUrl: string;
  supabaseUrl: string;
  /** Supabase anon (publishable) key. Never a service-role key. */
  supabaseKey: string;
  /** Explicit shared-cookie domain, e.g. "mcbios.com". Omit to derive it from the org's base_url. */
  cookieDomain?: string;
  /** The suite `registration` form people fill in (a form with a payment field). Interim: replaced by "the active registration form" lookup when the suite has form archival. */
  registrationFormId?: string;
};
