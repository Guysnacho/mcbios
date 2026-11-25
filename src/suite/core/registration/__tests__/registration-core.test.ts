import { describe, expect, it, vi } from "vitest";
import { SuiteError } from "../../errors";
import { createFormCheckout, getRegistrationForm, getRegistrationProducts, submitRegistration } from "../api";
import { createDraftStore } from "../draft";
import { registrationMessage } from "../errors";
import { formatDay, priceOptions, registrationState } from "../options";
import type { Details, FormField, RegistrationProducts, SuiteProduct } from "../types";
import { buildSubmissionData, entryBounds, validateDetails, validateValues } from "../validation";

const config = { orgId: "org-1", suiteUrl: "https://suite.test", supabaseUrl: "", supabaseKey: "" };
const details: Details = { fname: "Ada", lname: "Lovelace", email: "ada@example.com", institution: "Analytical Engines", role: "student" };

const product = (over: Partial<SuiteProduct> & { amount?: number | null } = {}): SuiteProduct => ({
  id: "prod_1",
  name: "Student",
  active: true,
  metadata: { role: "student" },
  default_price: { id: "price_1", unit_amount: over.amount === undefined ? 25000 : over.amount, currency: "usd" },
  ...over,
});

describe("priceOptions", () => {
  it("keeps active registration products, cheapest first, and formats the price", () => {
    const opts = priceOptions([
      product({ id: "p2", name: "Professional", metadata: { role: "professional" }, default_price: { id: "price_pro", unit_amount: 45000, currency: "usd" } }),
      product(),
    ]);
    expect(opts.map((o) => [o.role, o.priceId, o.price])).toEqual([
      ["student", "price_1", "$250.00"],
      ["professional", "price_pro", "$450.00"],
    ]);
  });

  it("drops inactive, membership, role-less, admin and price-less products", () => {
    expect(
      priceOptions([
        product({ active: false }),
        product({ metadata: { role: "student", type: "membership" } }),
        product({ metadata: {} }),
        product({ metadata: { role: "admin" } }),
        product({ amount: null }),
        product({ default_price: "price_str" }),
      ]),
    ).toEqual([]);
  });
});

describe("registrationState", () => {
  const data = (over: Partial<RegistrationProducts> & { windowOpen?: boolean; startDate?: string | null } = {}): RegistrationProducts => ({
    products: [],
    registration: { startDate: over.startDate ?? null, endDate: null, windowOpen: over.windowOpen ?? true },
    subscriptionActive: over.subscriptionActive,
    configError: over.configError,
  });
  const one = priceOptions([product()]);

  it("takes open/closed from the suite's windowOpen, and uses today only to word it", () => {
    expect(registrationState(data(), one).kind).toBe("open");
    expect(registrationState(data({ windowOpen: false, startDate: "2027-01-08" }), one, "2026-12-01")).toEqual({ kind: "opens_soon", startDate: "2027-01-08" });
    expect(registrationState(data({ windowOpen: false, startDate: "2027-01-08" }), one, "2027-03-20").kind).toBe("closed");
    expect(registrationState(data({ windowOpen: false }), one).kind).toBe("closed");
  });

  it("is unavailable without a plan, an account, or products", () => {
    expect(registrationState(data({ subscriptionActive: false }), one).kind).toBe("unavailable");
    expect(registrationState(data({ configError: "no_account" }), one).kind).toBe("unavailable");
    expect(registrationState(data(), []).kind).toBe("unavailable");
  });

  it("formats a day without shifting time zones", () => {
    expect(formatDay("2027-01-08")).toBe("January 8, 2027");
  });
});

describe("validateDetails", () => {
  it("accepts a full profile", () => expect(validateDetails(details)).toEqual({}));
  it("flags each gap by field", () => {
    expect(Object.keys(validateDetails({ fname: "", lname: " ", email: "nope", institution: "MI", role: "" })).sort()).toEqual(
      ["email", "fname", "institution", "lname", "role"],
    );
  });
});

describe("validateValues / buildSubmissionData", () => {
  const fields: FormField[] = [
    { id: "q1", type: "text", title: "Dietary needs", description: "", required: false },
    { id: "q2", type: "select", title: "Workshop", description: "", required: true, items: [{ key: "a" }, { key: "b" }] },
    { id: "q3", type: "person", title: "Guest", description: "", required: false, repeatable: true, maxItems: 2, extras: { email: false } },
    { id: "pay", type: "payment", title: "Payment", description: "", required: true },
    { id: "up", type: "dropzone", title: "File", description: "", required: false },
  ];

  it("requires required fields, and checks select choices", () => {
    expect(validateValues(fields, {})).toEqual({ q2: "This is required." });
    expect(validateValues(fields, { q2: "z" })).toEqual({ q2: "Choose one of the options." });
    expect(validateValues(fields, { q2: "a" })).toEqual({});
  });

  it("checks people entry by entry and caps repeatable entries", () => {
    const half = { fname: "Al", lname: "", email: "", affiliation: "" };
    expect(validateValues(fields, { q2: "a", q3: [half] }).q3).toMatch(/first and last name/);
    const ok = { fname: "Al", lname: "Li", email: "", affiliation: "MIT" };
    expect(validateValues(fields, { q2: "a", q3: [ok] })).toEqual({});
    expect(validateValues(fields, { q2: "a", q3: [ok, ok, ok] }).q3).toBe("Add at most 2.");
  });

  it("enforces word and length limits", () => {
    const f: FormField[] = [{ id: "t", type: "textarea", title: "Why", description: "", required: false, maxWords: 3 }];
    expect(validateValues(f, { t: "one two three four" }).t).toMatch(/3 words/);
    expect(validateValues(f, { t: "one two three" })).toEqual({});
  });

  it("builds the submission: askable fields only, payment last, repeatable as a list", () => {
    const data = buildSubmissionData(fields, { q1: " vegan ", q2: "a", q3: [{ fname: "Al", lname: "Li", email: "", affiliation: "MIT" }] }, { fieldId: "pay", sessionId: "cs_1" });
    expect(data.map((d) => d.id)).toEqual(["q1", "q2", "q3", "pay"]);
    expect(data[0].value).toBe("vegan");
    expect(Array.isArray(data[2].value)).toBe(true);
    expect(data[3]).toEqual({ id: "pay", title: "payment", value: "cs_1" });
  });

  it("derives entry bounds", () => {
    expect(entryBounds(fields[0])).toEqual([1, 1]);
    expect(entryBounds(fields[2])).toEqual([0, 2]);
  });
});

describe("draft store", () => {
  const mem = () => {
    const m = new Map<string, string>();
    return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), removeItem: (k: string) => void m.delete(k) };
  };
  const draft = { details, values: { q1: "x" }, priceId: "price_1" };

  it("round-trips, expires after a day, and clears", () => {
    const s = createDraftStore(mem());
    s.save("f", draft, 1000);
    expect(s.load("f", 2000)?.priceId).toBe("price_1");
    expect(s.load("f", 1000 + 25 * 3600 * 1000)).toBeNull();
    s.clear("f");
    expect(s.load("f", 2000)).toBeNull();
  });

  it("survives missing or throwing storage", () => {
    expect(createDraftStore(undefined).load("f")).toBeNull();
    const bad = { getItem: () => { throw new Error("x"); }, setItem: () => { throw new Error("x"); }, removeItem: () => { throw new Error("x"); } };
    const s = createDraftStore(bad);
    expect(() => s.save("f", draft)).not.toThrow();
    expect(s.load("f")).toBeNull();
  });
});

describe("api", () => {
  const reply = (status: number, body: unknown) => vi.fn(async () => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } }));

  it("maps the suite's guard codes to typed errors with friendly messages", async () => {
    for (const [status, code, text] of [
      [403, "registration_closed", /not open/],
      [409, "already_registered", /already registered/],
      [402, "registration_limit", /full/],
      [402, "member_limit", /isn't accepting/],
    ] as const) {
      const f = reply(status, { message: "server words", code });
      const err = await createFormCheckout(config, { formId: "f", fieldId: "p", priceId: "price_1", details, returnUrl: "https://x/y", isPublic: true }, { fetch: f }).catch((e) => e);
      expect(err).toBeInstanceOf(SuiteError);
      expect(err.code).toBe(code);
      expect(err.status).toBe(status);
      expect(registrationMessage(err)).toMatch(text);
    }
  });

  it("reports a network failure as such", async () => {
    const err = await getRegistrationProducts(config, { fetch: vi.fn(async () => { throw new TypeError("Failed to fetch"); }) }).catch((e) => e);
    expect(err.code).toBe("network");
    expect(registrationMessage(err)).toMatch(/reach the server/);
  });

  it("sends the checkout body, with Bearer only when signed in", async () => {
    const f = reply(200, { clientSecret: "cs_secret" });
    await createFormCheckout(config, { formId: "f", fieldId: "p", priceId: "price_1", details, returnUrl: "https://x/y", isPublic: true }, { fetch: f });
    const [url, init] = f.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://suite.test/api/stripe/form-checkout");
    expect(new Headers(init.headers).get("Authorization")).toBeNull();
    expect(JSON.parse(init.body as string)).toMatchObject({ org_id: "org-1", form_id: "f", price_id: "price_1", email: "ada@example.com", is_public: true });

    const g = reply(200, { clientSecret: "cs_secret" });
    await createFormCheckout(config, { formId: "f", fieldId: "p", priceId: "price_1", details, returnUrl: "https://x/y", isPublic: true }, { fetch: g, token: "tok" });
    expect(new Headers((g.mock.calls[0] as unknown as [string, RequestInit])[1].headers).get("Authorization")).toBe("Bearer tok");
  });

  it("submits as a guest with user_json, and as a member without it", async () => {
    const guest = reply(201, { id: "s1" });
    await submitRegistration(config, { formId: "f", data: [], guest: details }, { fetch: guest });
    expect(JSON.parse(((guest.mock.calls[0] as unknown as [string, RequestInit])[1].body) as string).user_json).toMatchObject({ email: "ada@example.com", role: "student" });

    const member = reply(201, { id: "s1" });
    await submitRegistration(config, { formId: "f", data: [], guest: details }, { fetch: member, token: "tok" });
    expect(JSON.parse(((member.mock.calls[0] as unknown as [string, RequestInit])[1].body) as string).user_json).toBeUndefined();
  });

  it("reads the form and products from the suite", async () => {
    const f = reply(200, { id: "f", schema: [] });
    await getRegistrationForm(config, "f", { fetch: f });
    expect((f.mock.calls[0] as unknown as [string])[0]).toBe("https://suite.test/api/form?id=f&org_id=org-1");
  });
});
