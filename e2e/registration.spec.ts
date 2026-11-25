import AxeBuilder from "@axe-core/playwright";
import { type Page, type Route, expect, test } from "@playwright/test";

const FORM_ID = "11111111-2222-3333-4444-555555555555";
const CORS = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*" };
const json = (route: Route, status: number, body: unknown = {}) =>
  route.fulfill({ status, contentType: "application/json", headers: CORS, body: JSON.stringify(body) });

const PRODUCTS = [
  { id: "p1", name: "Student", active: true, metadata: { role: "student" }, default_price: { id: "price_student", unit_amount: 25000, currency: "usd" } },
  { id: "p2", name: "Student, late", active: true, metadata: { role: "student" }, default_price: { id: "price_late", unit_amount: 35000, currency: "usd" } },
  { id: "p3", name: "Professional", active: true, metadata: { role: "professional" }, default_price: { id: "price_pro", unit_amount: 45000, currency: "usd" } },
];

const FORM = {
  id: FORM_ID,
  org_id: "o",
  type: "registration",
  meta: { title: "Registration", public: true },
  schema: [
    { id: "q-diet", type: "text", title: "Dietary needs", description: "Anything we should know?", required: false },
    { id: "q-shirt", type: "select", title: "Shirt size", description: "", required: true, items: [{ key: "S" }, { key: "M" }, { key: "L" }] },
    { id: "q-guest", type: "person", title: "Guests", description: "", required: false, repeatable: true, maxItems: 2, itemLabel: "Guest", extras: { email: false } },
    { id: "q-pay", type: "payment", title: "Payment", description: "", required: true },
  ],
};

type Mock = {
  window?: { startDate: string | null; endDate: string | null; windowOpen: boolean };
  checkout?: { status: number; body: unknown };
  paymentStatus?: "paid" | "unpaid";
  emailStatus?: number;
};

async function mockSuite(page: Page, m: Mock = {}) {
  const calls = { checkout: [] as { headers: Record<string, string>; body: Record<string, unknown> }[], submit: [] as { headers: Record<string, string>; body: Record<string, unknown> }[] };
  await page.route("**/api/org/**", (r) => json(r, 200, { id: "o", url: "https://mcbios.com", name: "MCBIOS", shortName: "MCBIOS" }));
  await page.route("**/api/stripe/registration-product**", (r) =>
    json(r, 200, {
      products: PRODUCTS,
      stripeAccount: "acct_test",
      publishableKey: "pk_test_123",
      subscriptionActive: true,
      registration: m.window ?? { startDate: "2026-01-01", endDate: "2099-03-19", windowOpen: true },
    }),
  );
  await page.route("**/api/form**", async (r) => {
    const req = r.request();
    if (req.method() === "OPTIONS") return r.fulfill({ status: 204, headers: CORS });
    if (req.method() === "PATCH") {
      calls.submit.push({ headers: req.headers(), body: req.postDataJSON() });
      return json(r, 201, { id: "sub-1" });
    }
    return json(r, 200, FORM);
  });
  await page.route("**/api/stripe/form-checkout", async (r) => {
    const req = r.request();
    if (req.method() === "OPTIONS") return r.fulfill({ status: 204, headers: CORS });
    calls.checkout.push({ headers: req.headers(), body: req.postDataJSON() });
    const c = m.checkout ?? { status: 200, body: { clientSecret: "cs_test_secret" } };
    return json(r, c.status, c.body);
  });
  await page.route("**/api/stripe/registration-checkout**", (r) =>
    json(r, 200, { status: "complete", payment_status: m.paymentStatus ?? "paid", customer_email: "ada@example.com" }),
  );
  await page.route("**/api/auth/**", (r) =>
    r.request().method() === "OPTIONS" ? r.fulfill({ status: 204, headers: CORS }) : json(r, m.emailStatus ?? 404, m.emailStatus === 200 ? { authed: true } : { message: "x" }),
  );
  // Stripe.js: a stand-in whose embedded checkout just mounts a labelled box
  await page.route("https://js.stripe.com/**", (r) =>
    r.fulfill({
      contentType: "application/javascript",
      body: `window.Stripe = function () { return { initEmbeddedCheckout: async function (o) { window.__checkoutSecret = o.clientSecret; return { mount: function (el) { el.innerHTML = '<p>Stripe checkout (test double)</p>'; }, destroy: function () {} }; } }; };`,
    }),
  );
  return calls;
}

async function expectNoViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(
    results.violations.map((v) => ({ id: v.id, nodes: v.nodes.slice(0, 3).map((n) => `${n.target.join(" ")}: ${n.any[0]?.message ?? n.failureSummary}`) })),
  ).toEqual([]);
}

async function fillDetails(page: Page, over: { email?: string; role?: string } = {}) {
  await page.getByLabel("First name").fill("Ada");
  await page.getByLabel("Last name").fill("Lovelace");
  await page.getByLabel("Email").fill(over.email ?? "ada@example.com");
  await page.getByLabel("Institution").fill("Analytical Engines");
  await page.getByLabel("Role").selectOption(over.role ?? "student");
  await page.getByLabel("Shirt size").selectOption("M");
}

test.describe("registration window and states", () => {
  test("before it opens, says when (from the suite, not a hardcoded date)", async ({ page }) => {
    await mockSuite(page, { window: { startDate: "2099-01-08", endDate: "2099-03-19", windowOpen: false } });
    await page.goto("/register");
    await expect(page.getByRole("status").filter({ hasText: "Registration opens January 8, 2099" })).toBeVisible();
    await expect(page.getByLabel("First name")).toHaveCount(0);
    await expectNoViolations(page);
  });

  test("after it closes, says so and offers no form", async ({ page }) => {
    await mockSuite(page, { window: { startDate: "2020-01-08", endDate: "2020-03-19", windowOpen: false } });
    await page.goto("/register");
    await expect(page.getByRole("status").filter({ hasText: "Registration is closed" })).toBeVisible();
    await expectNoViolations(page);
  });

  test("the home page button and key date follow the same window", async ({ page }) => {
    await mockSuite(page, { window: { startDate: "2099-01-08", endDate: "2099-03-19", windowOpen: false } });
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Registration opens January 8, 2099" })).toBeDisabled();
    await expect(page.getByText("January 8, 2099").first()).toBeVisible();
    await expect(page.getByText("Registration opens Jan 8")).toHaveCount(0);
  });

  test("when open, the home page links to registration", async ({ page }) => {
    await mockSuite(page);
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Register now" })).toHaveAttribute("href", "/register");
  });
});

test.describe("guest registration", () => {
  test("details, then payment, then Stripe (axe on every step)", async ({ page }) => {
    const calls = await mockSuite(page);
    await page.goto("/register");
    await expect(page.getByRole("heading", { name: "Your details" })).toBeVisible();
    await expectNoViolations(page);

    // Nothing filled in: an announced summary, focus on it, and every gap flagged
    await page.getByRole("button", { name: "Continue to payment" }).click();
    const summary = page.getByRole("alert").filter({ hasText: "Please fix" });
    await expect(summary).toBeVisible();
    await expect(summary).toBeFocused();
    await expect(page.getByLabel("First name")).toHaveAttribute("aria-invalid", "true");
    await expectNoViolations(page);

    await fillDetails(page);
    await page.getByLabel("Dietary needs").fill("Vegetarian");
    await page.getByRole("button", { name: "Add a guest" }).click();
    await page.getByLabel("First name").nth(1).fill("Charles");
    await page.getByLabel("Last name").nth(1).fill("Babbage");
    await page.getByLabel("Affiliation").fill("Difference Engines");
    await page.getByRole("button", { name: "Continue to payment" }).click();

    const payHeading = page.getByRole("heading", { name: "Payment" });
    await expect(payHeading).toBeFocused();
    await expect(page.getByText("Student, late")).toBeVisible();
    await expect(page.getByText("Professional")).toHaveCount(0); // only the chosen role's prices
    await expectNoViolations(page);

    // Pick the second price with the keyboard-reachable radio group
    await page.getByRole("radio", { name: /Student, late/ }).check({ force: true });
    await page.getByRole("button", { name: /Continue to payment \(\$350\.00\)/ }).click();
    await expect(page.getByText("Stripe checkout (test double)")).toBeVisible();
    await expect(page.getByRole("region", { name: "Secure payment form" })).toBeVisible();
    await expectNoViolations(page);

    expect(calls.checkout).toHaveLength(1);
    expect(calls.checkout[0].headers.authorization).toBeUndefined();
    expect(calls.checkout[0].body).toMatchObject({
      org_id: expect.any(String),
      form_id: FORM_ID,
      field_id: "q-pay",
      price_id: "price_late",
      email: "ada@example.com",
      fname: "Ada",
      is_public: true,
    });
    expect(String(calls.checkout[0].body.return_url)).toContain("/register/status?session_id={CHECKOUT_SESSION_ID}");
  });

  test("Enter submits the details step, and Back keeps what was typed", async ({ page }) => {
    await mockSuite(page);
    await page.goto("/register");
    await fillDetails(page);
    await page.getByLabel("Institution").press("Enter");
    await expect(page.getByRole("heading", { name: "Payment" })).toBeFocused();
    await page.getByRole("button", { name: "Back to your details" }).click();
    await expect(page.getByRole("heading", { name: "Your details" })).toBeFocused();
    await expect(page.getByLabel("First name")).toHaveValue("Ada");
    await expect(page.getByLabel("Role")).toHaveValue("student");
  });

  test("a guard from the suite is shown in plain words and nothing is mounted", async ({ page }) => {
    await mockSuite(page, { checkout: { status: 409, body: { message: "already", code: "already_registered" } } });
    await page.goto("/register");
    await fillDetails(page);
    await page.getByRole("button", { name: "Continue to payment" }).click();
    await page.getByRole("button", { name: /Continue to payment \(/ }).click();
    await expect(page.getByRole("alert").filter({ hasText: "already registered" })).toBeVisible();
    await expect(page.getByText("Stripe checkout (test double)")).toHaveCount(0);
    await expectNoViolations(page);
  });

  test("registration_closed at checkout (the window shut meanwhile) says it is closed", async ({ page }) => {
    await mockSuite(page, { checkout: { status: 403, body: { message: "closed", code: "registration_closed" } } });
    await page.goto("/register");
    await fillDetails(page);
    await page.getByRole("button", { name: "Continue to payment" }).click();
    await page.getByRole("button", { name: /Continue to payment \(/ }).click();
    await expect(page.getByRole("alert").filter({ hasText: "not open" })).toBeVisible();
  });

  test("an email that already has an account offers sign-in without blocking", async ({ page }) => {
    await mockSuite(page, { emailStatus: 200 });
    await page.goto("/register");
    await page.getByLabel("Email").fill("ada@example.com");
    await page.getByLabel("Institution").focus(); // blur runs the lookup
    const hint = page.getByRole("status").filter({ hasText: "already has an account" });
    await expect(hint).toBeVisible();
    await expectNoViolations(page);
    await hint.getByRole("button", { name: "Sign in to register faster" }).click();
    await expect(page.getByRole("dialog", { name: "Sign in" })).toBeVisible();
  });
});

test.describe("after Stripe", () => {
  const draft = {
    details: { fname: "Ada", lname: "Lovelace", email: "ada@example.com", institution: "Analytical Engines", role: "student" },
    values: { "q-diet": "Vegetarian", "q-shirt": "M" },
    priceId: "price_student",
    savedAt: Date.now(),
  };
  const withDraft = (page: Page) =>
    page.addInitScript(([id, d]) => localStorage.setItem(`cs:registration:${id}`, d), [FORM_ID, JSON.stringify(draft)] as const);

  test("a paid session submits the saved answers once, with the payment, then confirms", async ({ page }) => {
    const calls = await mockSuite(page);
    await withDraft(page);
    await page.goto("/register/status?session_id=cs_test_123");
    await expect(page.getByRole("heading", { name: "You're registered" })).toBeFocused();
    expect(calls.submit).toHaveLength(1);
    expect(calls.submit[0].body).toMatchObject({
      id: FORM_ID,
      user_json: { email: "ada@example.com", role: "student", institution: "Analytical Engines" },
    });
    const data = calls.submit[0].body.data as { id: string; title: string; value: unknown }[];
    expect(data.at(-1)).toEqual({ id: "q-pay", title: "payment", value: "cs_test_123" });
    expect(data.find((d) => d.id === "q-shirt")?.value).toBe("M");
    expect(await page.evaluate((id) => localStorage.getItem(`cs:registration:${id}`), FORM_ID)).toBeNull();
    await expectNoViolations(page);
  });

  test("without saved answers (another device) it still confirms the payment", async ({ page }) => {
    const calls = await mockSuite(page);
    await page.goto("/register/status?session_id=cs_test_123");
    await expect(page.getByRole("heading", { name: "You're registered" })).toBeVisible();
    expect(calls.submit).toHaveLength(0);
  });

  test("an unpaid session explains and links back", async ({ page }) => {
    await mockSuite(page, { paymentStatus: "unpaid" });
    await page.goto("/register/status?session_id=cs_test_123");
    await expect(page.getByRole("heading", { name: "Your payment isn't complete" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to registration" })).toHaveAttribute("href", "/register");
    await expectNoViolations(page);
  });

  test("no session id shows a way back", async ({ page }) => {
    await mockSuite(page);
    await page.goto("/register/status");
    await expect(page.getByRole("heading", { name: "No payment to show" })).toBeVisible();
    await expectNoViolations(page);
  });
});

test.describe("signed-in member", () => {
  const USER = { id: "22222222-2222-2222-2222-222222222222", aud: "authenticated", role: "authenticated", email: "grace@example.com", app_metadata: {}, user_metadata: {}, created_at: "2026-01-01T00:00:00Z" };
  const SESSION = { access_token: "member-token", token_type: "bearer", expires_in: 3600, refresh_token: "ref", user: USER };

  async function signInAs(page: Page, membership: { paid: boolean }) {
    await page.route(/\/auth\/v1\/token/, (r) => json(r, 200, SESSION));
    await page.route(/\/auth\/v1\/user/, (r) => json(r, 200, USER));
    await page.route(/\/auth\/v1\/logout/, (r) => r.fulfill({ status: 204, headers: CORS }));
    await page.route("**/rest/v1/member**", (r) =>
      r.request().method() === "OPTIONS"
        ? r.fulfill({ status: 204, headers: CORS })
        : json(r, 200, { fname: "Grace", lname: "Hopper", institution: "US Navy", role: "professional" }),
    );
    await page.route("**/rest/v1/rpc/my_membership**", (r) =>
      r.request().method() === "OPTIONS"
        ? r.fulfill({ status: 204, headers: CORS })
        : json(r, 200, [{ role: "professional", fees_paid_at: membership.paid ? "2027-01-09T00:00:00Z" : null, paid_this_cycle: membership.paid, registration_open: true }]),
    );
    // Sign in through the dialog, as a member would (the suite says the email has an account)
    await page.goto("/");
    await page.getByRole("button", { name: "Sign in" }).click();
    const dialog = page.getByRole("dialog");
    await dialog.getByLabel("Email").fill("grace@example.com");
    await page.keyboard.press("Enter");
    await dialog.getByLabel("Password", { exact: true }).fill("secret1");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  }

  test("profile is prefilled, and checkout carries the Bearer token", async ({ page }) => {
    const calls = await mockSuite(page, { emailStatus: 200 });
    await signInAs(page, { paid: false });
    await page.goto("/register");
    await expect(page.getByText("Your profile is filled in below.")).toBeVisible();
    await expect(page.getByLabel("First name")).toHaveValue("Grace");
    await expect(page.getByLabel("Institution")).toHaveValue("US Navy");
    await expect(page.getByLabel("Role")).toHaveValue("professional");
    await expect(page.getByLabel("Email")).toHaveAttribute("readonly", "");
    await expectNoViolations(page);

    await page.getByLabel("Shirt size").selectOption("L");
    await page.getByRole("button", { name: "Continue to payment" }).click();
    await page.getByRole("button", { name: /Continue to payment \(\$450\.00\)/ }).click();
    await expect(page.getByText("Stripe checkout (test double)")).toBeVisible();
    expect(calls.checkout[0].headers.authorization).toBe("Bearer member-token");
    expect(calls.checkout[0].body).toMatchObject({ email: "grace@example.com", fname: "Grace", price_id: "price_pro" });
  });

  test("someone already paid this cycle is told so instead of seeing the form", async ({ page }) => {
    await mockSuite(page, { emailStatus: 200 });
    await signInAs(page, { paid: true });
    await page.goto("/register");
    await expect(page.getByRole("status").filter({ hasText: "You're registered" })).toBeVisible();
    await expect(page.getByLabel("First name")).toHaveCount(0);
    await expectNoViolations(page);
  });
});
