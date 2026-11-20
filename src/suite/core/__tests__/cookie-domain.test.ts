import { describe, expect, it } from "vitest";
import {
  MIGRATED_KEY,
  clearHostOnlyAuthCookies,
  cookieDomainFor,
  domainFromBaseUrl,
} from "../cookie-domain";

describe("domainFromBaseUrl", () => {
  it("strips www and requires https", () => {
    expect(domainFromBaseUrl("https://www.mcbios.com/")).toBe("mcbios.com");
    expect(domainFromBaseUrl("https://MCBIOS.com")).toBe("mcbios.com");
    expect(domainFromBaseUrl("http://mcbios.com")).toBeUndefined();
    expect(domainFromBaseUrl("nonsense")).toBeUndefined();
    expect(domainFromBaseUrl(null)).toBeUndefined();
  });
});

describe("cookieDomainFor", () => {
  const explicit = "mcbios.com";
  it("applies on the apex, www and subdomains", () => {
    for (const hostname of ["mcbios.com", "www.mcbios.com", "2027.mcbios.com", "www.mcbios.com:443"]) {
      expect(cookieDomainFor({ hostname, explicit })).toBe(".mcbios.com");
    }
  });
  it("tolerates a leading dot and casing in config", () => {
    expect(cookieDomainFor({ hostname: "2027.mcbios.com", explicit: ".MCBIOS.com" })).toBe(".mcbios.com");
  });
  it("never applies to hosts outside the domain", () => {
    for (const hostname of ["localhost:3000", "evilmcbios.com", "mcbios.com.evil.io", "mcbios.netlify.app", null, undefined]) {
      expect(cookieDomainFor({ hostname, explicit })).toBeUndefined();
    }
  });
  it("derives the domain from the org's base_url when none is configured", () => {
    expect(cookieDomainFor({ hostname: "2027.mcbios.com", orgBaseUrl: "https://mcbios.com" })).toBe(".mcbios.com");
    expect(cookieDomainFor({ hostname: "other.org", orgBaseUrl: "https://mcbios.com" })).toBeUndefined();
  });
  it("prefers the explicit domain over the derived one", () => {
    expect(cookieDomainFor({ hostname: "a.example.org", explicit: "example.org", orgBaseUrl: "https://mcbios.com" })).toBe(".example.org");
  });
  it("is off without any config", () => {
    expect(cookieDomainFor({ hostname: "mcbios.com" })).toBeUndefined();
  });
});

describe("clearHostOnlyAuthCookies", () => {
  const make = (cookie: string, migrated = false) => {
    const written: string[] = [];
    const store = new Map<string, string>(migrated ? [[MIGRATED_KEY, "1"]] : []);
    return {
      written,
      store,
      io: {
        getCookie: () => cookie,
        setCookie: (c: string) => void written.push(c),
        storage: { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => void store.set(k, v) },
      },
    };
  };

  it("expires only supabase auth cookies, host-only, once", () => {
    const t = make("a=1; sb-abc-auth-token=x; sb-abc-auth-token.0=y; theme=dark");
    expect(clearHostOnlyAuthCookies(t.io)).toEqual(["sb-abc-auth-token", "sb-abc-auth-token.0"]);
    expect(t.written).toEqual(["sb-abc-auth-token=; Max-Age=0; Path=/", "sb-abc-auth-token.0=; Max-Age=0; Path=/"]);
    expect(t.written.join()).not.toContain("Domain");
    expect(t.store.get(MIGRATED_KEY)).toBe("1");
  });

  it("does nothing after the first run", () => {
    const t = make("sb-abc-auth-token=x", true);
    expect(clearHostOnlyAuthCookies(t.io)).toEqual([]);
    expect(t.written).toEqual([]);
  });

  it("survives blocked storage", () => {
    const io = { getCookie: () => "sb-abc-auth-token=x", setCookie: () => {}, storage: { getItem: () => { throw new Error("blocked"); }, setItem: () => {} } };
    expect(() => clearHostOnlyAuthCookies(io)).not.toThrow();
  });
});
