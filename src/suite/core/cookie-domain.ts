/**
 * Shared sign-in across an org's sites.
 *
 * A Supabase session cookie scoped to the org's base domain (".mcbios.com") is
 * read by every site on that domain and its subdomains. The domain is explicit
 * config, or derived from the org's base_url, which is the same rule the suite
 * uses for CORS (a base_url covers its subdomains). It applies only when the
 * current host is inside it: browsers reject a Domain cookie for a host it
 * doesn't cover (localhost, deploy previews), which would break sign-in there.
 */

/** "https://www.mcbios.com/" -> "mcbios.com". Only https base URLs qualify. */
export function domainFromBaseUrl(baseUrl: string | null | undefined): string | undefined {
  if (!baseUrl) return undefined;
  try {
    const u = new URL(baseUrl);
    if (u.protocol !== "https:") return undefined;
    return u.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return undefined;
  }
}

function normalize(domain: string | null | undefined): string | undefined {
  const d = domain?.trim().replace(/^\./, "").toLowerCase();
  return d || undefined;
}

/**
 * The Domain attribute to use on this host (".mcbios.com"), or undefined for a
 * host-only cookie. `explicit` wins over `orgBaseUrl`.
 */
export function cookieDomainFor(args: {
  hostname: string | null | undefined;
  explicit?: string | null;
  orgBaseUrl?: string | null;
}): string | undefined {
  const domain = normalize(args.explicit) ?? domainFromBaseUrl(args.orgBaseUrl);
  if (!domain || !args.hostname) return undefined;
  const host = args.hostname.split(":")[0].toLowerCase();
  return host === domain || host.endsWith(`.${domain}`) ? `.${domain}` : undefined;
}

const AUTH_COOKIE = /^sb-.+-auth-token(\.\d+)?$/;
export const MIGRATED_KEY = "cs:shared-cookie-migrated";

/** Where the cleanup reads and writes: document.cookie and localStorage in a browser, fakes in tests. */
export type CookieIO = {
  getCookie: () => string;
  setCookie: (cookie: string) => void;
  storage?: Pick<Storage, "getItem" | "setItem">;
};

/**
 * Before a shared cookie existed, sessions lived in host-only cookies with the
 * same names. Those shadow the shared cookie (the browser lists the older, more
 * specific one first), so expire them once. A signed-in member signs in one more
 * time. Returns the names it expired.
 */
export function clearHostOnlyAuthCookies(io: CookieIO): string[] {
  const expired: string[] = [];
  try {
    if (io.storage?.getItem(MIGRATED_KEY)) return expired;
    for (const part of io.getCookie().split(";")) {
      const name = part.split("=")[0].trim();
      if (AUTH_COOKIE.test(name)) {
        // No Domain attribute: only the host-only cookie matches, never the shared one
        io.setCookie(`${name}=; Max-Age=0; Path=/`);
        expired.push(name);
      }
    }
    io.storage?.setItem(MIGRATED_KEY, "1");
  } catch {
    // storage blocked: skip, the shared cookie still works for new sign-ins
  }
  return expired;
}
