import { describe, expect, it, vi } from "vitest";
import type { SuiteConfig } from "../../types";
import { checkEmail, getOrg, linkAccount } from "../api";
import { type AuthState, type EmailCheck, type Mode, decideEmailCheck, initialAuthState, reduce } from "../machine";
import { fieldErrors, signInSchema, signUpSchema } from "../schemas";

const config: SuiteConfig = {
  orgId: "522ab88a-5093-43ae-bea9-313d630233d5",
  suiteUrl: "https://suite.test",
  supabaseUrl: "https://x.supabase.co",
  supabaseKey: "anon",
};
const json = (status: number, body: unknown = {}) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

describe("decideEmailCheck (the AuthModal decision table, with the existing-account fix)", () => {
  type Want = { mode: Mode; step: 0 | 1; linking: boolean; needsProfile: boolean; status: string };
  const cases: Array<[Mode, EmailCheck["kind"], Want]> = [
    ["signin", "registered", { mode: "signin", step: 1, linking: false, needsProfile: false, status: "info" }],
    // Signing up with an email that already has an account: switch to sign-in, password only
    ["signup", "registered", { mode: "signin", step: 1, linking: false, needsProfile: false, status: "info" }],
    ["signin", "guest", { mode: "signin", step: 0, linking: false, needsProfile: false, status: "error" }], // nothing to sign in to
    ["signup", "guest", { mode: "signup", step: 1, linking: false, needsProfile: true, status: "info" }], // sign-up claims the guest row
    ["signin", "not_found", { mode: "signin", step: 0, linking: false, needsProfile: false, status: "error" }],
    ["signup", "not_found", { mode: "signup", step: 1, linking: false, needsProfile: true, status: "info" }],
    // Another org's account: signing up there needs the profile (it creates this org's member row)
    ["signin", "other_org", { mode: "signin", step: 1, linking: true, needsProfile: false, status: "info" }],
    ["signup", "other_org", { mode: "signup", step: 1, linking: true, needsProfile: true, status: "info" }],
    ["signin", "rate_limited", { mode: "signin", step: 0, linking: false, needsProfile: false, status: "error" }],
    ["signup", "rate_limited", { mode: "signup", step: 0, linking: false, needsProfile: false, status: "error" }],
    ["signup", "error", { mode: "signup", step: 0, linking: false, needsProfile: false, status: "error" }],
  ];
  it.each(cases)("%s + %s", (mode, kind, want) => {
    const got = decideEmailCheck(mode, { kind } as EmailCheck);
    expect({ mode: got.mode, step: got.step, linking: got.linking, needsProfile: got.needsProfile, status: got.status.kind }).toEqual(want);
  });

  it("tells a person who is signing up that they already have an account", () => {
    const got = decideEmailCheck("signup", { kind: "registered" });
    expect(got.status).toMatchObject({ kind: "info" });
    expect((got.status as { message: string }).message).toContain("already have an account");
  });
});

describe("reduce", () => {
  const open = reduce(initialAuthState, { type: "open", mode: "signup" });

  it("opens in the requested mode and closes back to the initial state", () => {
    expect(open).toMatchObject({ open: true, mode: "signup", step: 0 });
    expect(reduce(open, { type: "close" })).toEqual(initialAuthState);
  });

  it("walks email -> checked -> back", () => {
    let s: AuthState = reduce(open, { type: "emailChecking", email: "a@b.co" });
    expect(s.status.kind).toBe("busy");
    s = reduce(s, { type: "emailChecked", check: { kind: "other_org" } });
    expect(s).toMatchObject({ step: 1, linking: true, needsProfile: true, email: "a@b.co" });
    s = reduce(s, { type: "back" });
    expect(s).toMatchObject({ step: 0, linking: false, needsProfile: false, email: "a@b.co" });
  });

  it("an existing account found while signing up becomes a password-only sign-in, and Back returns to the email step", () => {
    let s = reduce(open, { type: "emailChecking", email: "a@b.co" });
    s = reduce(s, { type: "emailChecked", check: { kind: "registered" } });
    expect(s).toMatchObject({ mode: "signin", step: 1, needsProfile: false, linking: false });
    s = reduce(s, { type: "back" });
    expect(s).toMatchObject({ mode: "signin", step: 0, email: "a@b.co" });
  });

  it("switching mode keeps the email but restarts the flow and stays open", () => {
    let s = reduce(open, { type: "emailChecking", email: "a@b.co" });
    s = reduce(s, { type: "emailChecked", check: { kind: "not_found" } });
    s = reduce(s, { type: "setMode", mode: "signin" });
    expect(s).toMatchObject({ open: true, mode: "signin", step: 0, email: "a@b.co", linking: false });
  });

  it("failures keep the step so the user can retry; done resets", () => {
    let s = reduce(open, { type: "emailChecked", check: { kind: "registered" } });
    s = reduce(s, { type: "failed", message: "Invalid login credentials" });
    expect(s).toMatchObject({ step: 1, status: { kind: "error", message: "Invalid login credentials" } });
    expect(reduce(s, { type: "done" })).toEqual(initialAuthState);
  });
});

describe("schemas", () => {
  it("sign-in only needs a password, not the policy", () => {
    expect(signInSchema.safeParse({ email: "a@b.co", password: "x" }).success).toBe(true);
    expect(fieldErrors(signInSchema, { email: "nope", password: "" })).toEqual({
      email: "Enter a valid email address",
      password: "Enter your password",
    });
  });

  it("sign-up applies the same 2-character rule to both names (the mcbios modal required 3 for family name)", () => {
    const ok = { fname: "Al", lname: "Li", institution: "MIT", email: "a@b.co", password: "secret1" };
    expect(signUpSchema.safeParse(ok).success).toBe(true);
    expect(fieldErrors(signUpSchema, { ...ok, lname: "L", password: "12345" })).toEqual({
      lname: "Enter your family name (at least 2 characters)",
      password: "Password must be at least 6 characters",
    });
  });
});

describe("suite api", () => {
  it("maps /api/auth/[org] responses to EmailCheck", async () => {
    const check = async (res: Response | Error) => {
      const doFetch = vi.fn(async () => { if (res instanceof Error) throw res; return res; }) as unknown as typeof fetch;
      return (await checkEmail(config, "a+b@c.co", doFetch)).kind;
    };
    expect(await check(json(200, { authed: true }))).toBe("registered");
    expect(await check(json(200, { authed: false }))).toBe("guest");
    expect(await check(json(404))).toBe("not_found");
    expect(await check(json(406))).toBe("other_org");
    expect(await check(json(429))).toBe("rate_limited");
    expect(await check(json(500))).toBe("error");
    expect(await check(new Error("offline"))).toBe("error");
  });

  it("checkEmail is a plain GET (no CORS preflight) with the email encoded", async () => {
    const doFetch = vi.fn(async () => json(404)) as unknown as typeof fetch;
    await checkEmail(config, "a+b@c.co", doFetch);
    expect(doFetch).toHaveBeenCalledWith(`https://suite.test/api/auth/${config.orgId}?email=a%2Bb%40c.co`);
  });

  it("linkAccount sends the signup header only with a profile, and tolerates 409", async () => {
    const calls: Array<[string, RequestInit]> = [];
    const doFetch = (async (url: string, init: RequestInit) => { calls.push([url, init]); return json(409, { message: "Already a member" }); }) as unknown as typeof fetch;
    await linkAccount(config, "tok", undefined, doFetch);
    await linkAccount(config, "tok", { fname: "Al", lname: "Li", institution: "MIT" }, doFetch);
    expect((calls[0][1].headers as Record<string, string>).signup).toBeUndefined();
    expect((calls[1][1].headers as Record<string, string>).signup).toBe("true");
    expect(JSON.parse(calls[1][1].body as string)).toMatchObject({ org_id: config.orgId, token: "tok", fname: "Al" });
  });

  it("linkAccount surfaces real failures with the suite's message and code", async () => {
    const doFetch = (async () => json(402, { message: "Member limit reached", code: "member_limit" })) as unknown as typeof fetch;
    await expect(linkAccount(config, "t", undefined, doFetch)).rejects.toMatchObject({ message: "Member limit reached", code: "member_limit", status: 402 });
  });

  it("getOrg returns the public org (its url scopes the shared cookie)", async () => {
    const doFetch = (async () => json(200, { id: config.orgId, url: "https://mcbios.com", name: "MCBIOS", shortName: null })) as unknown as typeof fetch;
    expect((await getOrg(config, doFetch)).url).toBe("https://mcbios.com");
  });
});
