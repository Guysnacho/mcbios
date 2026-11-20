/**
 * Shared sign-in across an org's sites.
 *
 * Set NEXT_PUBLIC_COOKIE_DOMAIN to the org's base domain (e.g. `mcbios.com`) and
 * every site on it or on a subdomain (mcbios.com, 2027.mcbios.com) reads the
 * same Supabase session cookie. It is the same rule the suite uses for CORS
 * (an org's base_url covers its subdomains). Leave it unset for host-only cookies.
 *
 * The domain only applies when the current host is inside it: a Domain cookie
 * for a host it doesn't cover (localhost, a deploy preview) is rejected by the
 * browser, which would break sign-in there.
 */
export function cookieDomainFor(
  hostname: string | null | undefined,
): string | undefined {
  const configured = process.env.NEXT_PUBLIC_COOKIE_DOMAIN?.trim()
    .replace(/^\./, "")
    .toLowerCase();
  if (!configured || !hostname) return undefined;
  const host = hostname.split(":")[0].toLowerCase();
  return host === configured || host.endsWith(`.${configured}`)
    ? `.${configured}`
    : undefined;
}

const AUTH_COOKIE = /^sb-.+-auth-token(\.\d+)?$/;
const MIGRATED_KEY = "mcbios:shared-cookie-migrated";

/**
 * Before the shared cookie existed, sessions lived in host-only cookies with the
 * same names. Those would shadow the shared cookie (the browser lists the older,
 * more specific one first), so expire them once. A member who was signed in
 * signs in again one time. Browser only.
 */
export function clearHostOnlyAuthCookies(): void {
  try {
    if (localStorage.getItem(MIGRATED_KEY)) return;
    for (const part of document.cookie.split(";")) {
      const name = part.split("=")[0].trim();
      if (AUTH_COOKIE.test(name)) {
        // No Domain attribute: only the host-only cookie matches, never the shared one
        document.cookie = `${name}=; Max-Age=0; Path=/`;
      }
    }
    localStorage.setItem(MIGRATED_KEY, "1");
  } catch {
    // storage blocked: skip, the shared cookie still works for new sign-ins
  }
}
