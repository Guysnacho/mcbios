import type { CookieOptions } from "@supabase/ssr";
import { type CookieIO, clearHostOnlyAuthCookies, cookieDomainFor } from "../cookie-domain";

/** The browser surface the session layer needs; a fake in tests, `document`/`location` in the app. */
export type CookieEnv = CookieIO & {
  hostname: () => string;
  isSecure: () => boolean;
};

/** document + location + localStorage, or inert stand-ins during server rendering. */
export function browserCookieEnv(): CookieEnv {
  if (typeof document === "undefined") {
    return { getCookie: () => "", setCookie: () => {}, hostname: () => "", isSecure: () => false };
  }
  let storage: CookieEnv["storage"];
  try {
    storage = window.localStorage;
  } catch {
    storage = undefined; // blocked storage
  }
  return {
    getCookie: () => document.cookie,
    setCookie: (c) => {
      document.cookie = c;
    },
    storage,
    hostname: () => window.location.hostname,
    isSecure: () => window.location.protocol === "https:",
  };
}

export function parseCookies(header: string): { name: string; value: string }[] {
  const out: { name: string; value: string }[] = [];
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    const name = part.slice(0, i).trim();
    if (!name) continue;
    let value = part.slice(i + 1).trim();
    try {
      value = decodeURIComponent(value);
    } catch {
      // leave undecodable values as they are
    }
    out.push({ name, value });
  }
  return out;
}

export function serializeCookie(name: string, value: string, o: CookieOptions & { secure?: boolean }): string {
  let s = `${name}=${encodeURIComponent(value)}`;
  if (o.maxAge != null) s += `; Max-Age=${Math.floor(o.maxAge)}`;
  if (o.domain) s += `; Domain=${o.domain}`;
  s += `; Path=${o.path ?? "/"}`;
  if (o.expires) s += `; Expires=${o.expires.toUTCString()}`;
  if (o.sameSite) s += `; SameSite=${typeof o.sameSite === "string" ? o.sameSite.charAt(0).toUpperCase() + o.sameSite.slice(1) : "Lax"}`;
  if (o.secure) s += "; Secure";
  return s;
}

/**
 * getAll/setAll for @supabase/ssr's browser client. The cookie names, chunking
 * and encoding stay @supabase/ssr's (so a session written here is readable by
 * the main site and the reverse); we only decide the Domain attribute, at write
 * time, from `resolveDomain`.
 */
export function createCookieHandlers(env: CookieEnv, resolveDomain: () => string | undefined) {
  return {
    getAll: () => parseCookies(env.getCookie()),
    setAll: (cookies: { name: string; value: string; options: CookieOptions }[]) => {
      const domain = resolveDomain();
      for (const { name, value, options } of cookies) {
        env.setCookie(
          serializeCookie(name, value, { ...options, ...(domain ? { domain } : {}), secure: env.isSecure() }),
        );
      }
    },
  };
}

const ORG_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const orgKey = (orgId: string) => `cs:org-base-url:${orgId}`;

export function readCachedBaseUrl(orgId: string, storage: CookieEnv["storage"], now = Date.now()): string | undefined {
  try {
    const raw = storage?.getItem(orgKey(orgId));
    if (!raw) return undefined;
    const { url, at } = JSON.parse(raw) as { url?: string; at?: number };
    return url && at && now - at < ORG_CACHE_TTL_MS ? url : undefined;
  } catch {
    return undefined;
  }
}

export function cacheBaseUrl(orgId: string, url: string, storage: CookieEnv["storage"], now = Date.now()): void {
  try {
    storage?.setItem(orgKey(orgId), JSON.stringify({ url, at: now }));
  } catch {
    // blocked storage: just refetch next time
  }
}

/**
 * Resolves the shared-cookie domain lazily: explicit config, else the org's
 * `base_url` (cached after one fetch). `ensure()` is awaited before a sign-in
 * writes its first cookie so a brand-new browser still gets the shared domain.
 */
export function createDomainResolver(args: {
  orgId: string;
  explicit?: string;
  env: CookieEnv;
  fetchOrgUrl: () => Promise<string>;
}) {
  let baseUrl = readCachedBaseUrl(args.orgId, args.env.storage);
  let ensured: Promise<void> | null = null;

  const resolve = () =>
    cookieDomainFor({ hostname: args.env.hostname(), explicit: args.explicit, orgBaseUrl: baseUrl });

  const ensure = () =>
    (ensured ??= (async () => {
      if (!args.explicit && !baseUrl) {
        try {
          baseUrl = await args.fetchOrgUrl();
          cacheBaseUrl(args.orgId, baseUrl, args.env.storage);
        } catch {
          // offline or suite down: stay host-only for now, self-corrects on the next load
          ensured = null;
          return;
        }
      }
      if (resolve()) clearHostOnlyAuthCookies(args.env);
    })());

  return { resolve, ensure };
}
