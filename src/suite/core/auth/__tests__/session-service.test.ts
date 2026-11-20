import type { User } from "@supabase/supabase-js";
import { describe, expect, it, vi } from "vitest";
import type { SuiteConfig } from "../../types";
import {
  type CookieEnv,
  cacheBaseUrl,
  createCookieHandlers,
  createDomainResolver,
  parseCookies,
  readCachedBaseUrl,
  serializeCookie,
} from "../cookies";
import { createAuthService } from "../service";

const config: SuiteConfig = { orgId: "org-1", suiteUrl: "https://suite.test", supabaseUrl: "https://x.supabase.co", supabaseKey: "anon" };

function fakeEnv(over: Partial<{ hostname: string; secure: boolean; cookie: string; storage: Record<string, string> }> = {}) {
  const writes: string[] = [];
  const store = new Map(Object.entries(over.storage ?? {}));
  const env: CookieEnv = {
    getCookie: () => over.cookie ?? "",
    setCookie: (c) => void writes.push(c),
    storage: { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => void store.set(k, v) },
    hostname: () => over.hostname ?? "2027.mcbios.com",
    isSecure: () => over.secure ?? true,
  };
  return { env, writes, store };
}

describe("cookie format", () => {
  it("parses and decodes a cookie header", () => {
    expect(parseCookies("a=1; sb-x-auth-token=base64-abc%3D; bad; =x")).toEqual([
      { name: "a", value: "1" },
      { name: "sb-x-auth-token", value: "base64-abc=" },
    ]);
  });

  it("serializes with path, max-age, samesite and optional domain/secure", () => {
    expect(serializeCookie("n", "v=1", { maxAge: 100, sameSite: "lax", path: "/" })).toBe("n=v%3D1; Max-Age=100; Path=/; SameSite=Lax");
    expect(serializeCookie("n", "v", { domain: ".mcbios.com", secure: true })).toBe("n=v; Domain=.mcbios.com; Path=/; Secure");
  });
});

describe("cookie handlers", () => {
  const set = [{ name: "sb-x-auth-token", value: "base64-abc", options: { path: "/", maxAge: 400, sameSite: "lax" as const } }];

  it("adds the shared Domain and Secure at write time", () => {
    const { env, writes } = fakeEnv();
    createCookieHandlers(env, () => ".mcbios.com").setAll(set);
    expect(writes).toEqual(["sb-x-auth-token=base64-abc; Max-Age=400; Domain=.mcbios.com; Path=/; SameSite=Lax; Secure"]);
  });

  it("stays host-only (and not Secure on http) when no domain applies", () => {
    const { env, writes } = fakeEnv({ hostname: "localhost", secure: false });
    createCookieHandlers(env, () => undefined).setAll(set);
    expect(writes[0]).not.toContain("Domain");
    expect(writes[0]).not.toContain("Secure");
  });

  it("deletes with the same domain it wrote (so the shared cookie really goes away)", () => {
    const { env, writes } = fakeEnv();
    createCookieHandlers(env, () => ".mcbios.com").setAll([{ name: "sb-x-auth-token", value: "", options: { path: "/", maxAge: 0 } }]);
    expect(writes[0]).toContain("Max-Age=0");
    expect(writes[0]).toContain("Domain=.mcbios.com");
  });
});

describe("domain resolver", () => {
  it("derives the domain from the org's base_url, fetching once and caching", async () => {
    const { env, store } = fakeEnv();
    const fetchOrgUrl = vi.fn(async () => "https://www.mcbios.com");
    const d = createDomainResolver({ orgId: "org-1", env, fetchOrgUrl });
    expect(d.resolve()).toBeUndefined(); // unknown until ensured
    await d.ensure();
    await d.ensure();
    expect(d.resolve()).toBe(".mcbios.com");
    expect(fetchOrgUrl).toHaveBeenCalledTimes(1);
    expect(readCachedBaseUrl("org-1", env.storage)).toBe("https://www.mcbios.com");
    expect([...store.keys()].some((k) => k.startsWith("cs:org-base-url"))).toBe(true);
  });

  it("uses a fresh cache without any request, and ignores a stale one", () => {
    const { env } = fakeEnv();
    cacheBaseUrl("org-1", "https://mcbios.com", env.storage, 1_000);
    expect(readCachedBaseUrl("org-1", env.storage, 1_000 + 60_000)).toBe("https://mcbios.com");
    expect(readCachedBaseUrl("org-1", env.storage, 1_000 + 25 * 3_600_000)).toBeUndefined();
  });

  it("an explicit domain needs no fetch", async () => {
    const { env } = fakeEnv();
    const fetchOrgUrl = vi.fn(async () => "https://other.org");
    const d = createDomainResolver({ orgId: "org-1", explicit: "mcbios.com", env, fetchOrgUrl });
    await d.ensure();
    expect(d.resolve()).toBe(".mcbios.com");
    expect(fetchOrgUrl).not.toHaveBeenCalled();
  });

  it("is host-only on hosts outside the domain, and retries after a failed fetch", async () => {
    const { env } = fakeEnv({ hostname: "localhost" });
    const fetchOrgUrl = vi.fn(async () => "https://mcbios.com");
    const d = createDomainResolver({ orgId: "org-1", env, fetchOrgUrl });
    await d.ensure();
    expect(d.resolve()).toBeUndefined();

    const flaky = fakeEnv();
    const fail = vi.fn().mockRejectedValueOnce(new Error("offline")).mockResolvedValue("https://mcbios.com");
    const d2 = createDomainResolver({ orgId: "org-1", env: flaky.env, fetchOrgUrl: fail });
    await d2.ensure();
    expect(d2.resolve()).toBeUndefined();
    await d2.ensure();
    expect(d2.resolve()).toBe(".mcbios.com");
  });

  it("expires old host-only auth cookies once the domain is known", async () => {
    const { env, writes } = fakeEnv({ cookie: "sb-x-auth-token=old", hostname: "mcbios.com" });
    await createDomainResolver({ orgId: "org-1", explicit: "mcbios.com", env, fetchOrgUrl: async () => "" }).ensure();
    expect(writes).toEqual(["sb-x-auth-token=; Max-Age=0; Path=/"]);
  });
});

describe("auth service", () => {
  const user = { id: "u1" } as User;
  const session = { access_token: "tok", user };

  function setup(auth: Record<string, unknown>, fetchImpl?: typeof fetch) {
    const ensureCookieDomain = vi.fn(async () => {});
    const svc = createAuthService(config, { supabase: { auth } as never, ensureCookieDomain, fetch: fetchImpl });
    return { svc, ensureCookieDomain };
  }

  it("signs in after resolving the cookie domain, and links only when asked", async () => {
    const signInWithPassword = vi.fn(async () => ({ data: { user, session }, error: null }));
    const f = vi.fn(async () => new Response("{}", { status: 201 })) as unknown as typeof fetch;
    const { svc, ensureCookieDomain } = setup({ signInWithPassword }, f);
    expect(await svc.signIn({ email: "a@b.co", password: "pw", linking: false })).toEqual({ user, linkError: null });
    expect(f).not.toHaveBeenCalled();
    await svc.signIn({ email: "a@b.co", password: "pw", linking: true });
    expect(f).toHaveBeenCalledTimes(1);
    expect(ensureCookieDomain).toHaveBeenCalledTimes(2);
    expect(ensureCookieDomain.mock.invocationCallOrder[0]).toBeLessThan(signInWithPassword.mock.invocationCallOrder[0]);
  });

  it("a failed link never undoes the sign-in", async () => {
    const signInWithPassword = vi.fn(async () => ({ data: { user, session }, error: null }));
    const bad = vi.fn(async () => new Response(JSON.stringify({ message: "Member limit", code: "member_limit" }), { status: 402 })) as unknown as typeof fetch;
    const { svc } = setup({ signInWithPassword }, bad);
    expect(await svc.signIn({ email: "a@b.co", password: "pw", linking: true })).toEqual({
      user,
      linkError: "this organization has reached its member limit",
    });
  });

  it("a sign-up for an email that already has an account (no identities) is not 'check your email'", async () => {
    const signUp = vi.fn(async () => ({ data: { user: { ...user, identities: [] }, session: null }, error: null }));
    const { svc } = setup({ signUp });
    await expect(
      svc.signUp({ email: "a@b.co", password: "secret1", fname: "Al", lname: "Li", institution: "MIT", linking: false }),
    ).rejects.toMatchObject({ code: "already_registered" });
  });

  it("network failures get a plain message", async () => {
    const { svc } = setup({ signInWithPassword: async () => ({ data: {}, error: { message: "Failed to fetch", status: 0 } }) });
    await expect(svc.signIn({ email: "a@b.co", password: "x", linking: false })).rejects.toMatchObject({ code: "network" });
  });

  it("maps Supabase errors to friendly messages with codes", async () => {
    const { svc } = setup({ signInWithPassword: async () => ({ data: {}, error: { message: "Invalid login credentials", status: 400 } }) });
    await expect(svc.signIn({ email: "a@b.co", password: "x", linking: false })).rejects.toMatchObject({ message: "Wrong email or password.", code: "invalid_credentials" });
    const unconfirmed = setup({ signInWithPassword: async () => ({ data: {}, error: { message: "Email not confirmed", status: 400 } }) });
    await expect(unconfirmed.svc.signIn({ email: "a@b.co", password: "x", linking: false })).rejects.toMatchObject({ code: "email_not_confirmed" });
  });

  it("validates before touching the network", async () => {
    const signInWithPassword = vi.fn();
    const { svc } = setup({ signInWithPassword });
    await expect(svc.signIn({ email: "nope", password: "x", linking: false })).rejects.toMatchObject({ code: "invalid_input" });
    expect(signInWithPassword).not.toHaveBeenCalled();
  });

  it("sign-up creates the account with the profile in user metadata; no session means confirm email", async () => {
    const signUp = vi.fn(async () => ({ data: { user, session: null }, error: null }));
    const { svc } = setup({ signUp });
    const res = await svc.signUp({ email: "a@b.co", password: "secret1", fname: "Al", lname: "Li", institution: "MIT", linking: false });
    expect(res).toEqual({ kind: "confirmEmail" });
    expect(signUp).toHaveBeenCalledWith({
      email: "a@b.co",
      password: "secret1",
      options: { data: { fname: "Al", lname: "Li", role: "student", institution: "MIT", org_id: "org-1" } },
    });
  });

  it("sign-up for an existing account signs in with its password, then links with the profile (signup header)", async () => {
    const signInWithPassword = vi.fn(async () => ({ data: { user, session }, error: null }));
    const signUp = vi.fn();
    const f = vi.fn(async () => new Response("{}", { status: 201 })) as unknown as typeof fetch;
    const { svc } = setup({ signInWithPassword, signUp }, f);
    const res = await svc.signUp({ email: "a@b.co", password: "old-pass", fname: "Al", lname: "Li", institution: "MIT", linking: true });
    expect(res).toEqual({ kind: "signedIn", user, linkError: null });
    expect(signUp).not.toHaveBeenCalled();
    const [, init] = (f as unknown as { mock: { calls: [string, RequestInit][] } }).mock.calls[0];
    expect((init.headers as Record<string, string>).signup).toBe("true");
  });

  it("reset validates the email, and signOut clears the local (shared) session", async () => {
    const resetPasswordForEmail = vi.fn(async () => ({ error: null }));
    const signOut = vi.fn(async () => ({ error: null }));
    const { svc } = setup({ resetPasswordForEmail, signOut });
    await expect(svc.resetPassword("nope")).rejects.toMatchObject({ code: "invalid_input" });
    await svc.resetPassword("a@b.co");
    expect(resetPasswordForEmail).toHaveBeenCalledWith("a@b.co", undefined);
    await svc.signOut();
    expect(signOut).toHaveBeenCalledWith({ scope: "local" });
  });
});
