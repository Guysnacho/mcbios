import AxeBuilder from "@axe-core/playwright";
import { type Page, type Route, expect, test } from "@playwright/test";

const CORS = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*" };
const json = (route: Route, status: number, body: unknown = {}) =>
  route.fulfill({ status, contentType: "application/json", headers: CORS, body: JSON.stringify(body) });

const USER = {
  id: "11111111-1111-1111-1111-111111111111",
  aud: "authenticated",
  role: "authenticated",
  email: "ada@example.com",
  app_metadata: {},
  user_metadata: {},
  created_at: "2026-01-01T00:00:00Z",
};
const SESSION = { access_token: "tok", token_type: "bearer", expires_in: 3600, refresh_token: "ref", user: USER };

type Mock = { emailStatus: number; authed?: boolean; signedUpWithSession?: boolean; signupIdentities?: unknown[] };

/** Mocks the suite (/api/auth, /api/org) and Supabase auth; returns the calls that were made. */
async function mockBackend(page: Page, m: Mock) {
  const calls = { elevate: [] as { headers: Record<string, string>; body: unknown }[], signup: [] as unknown[], reset: 0 };
  await page.route("**/api/org/**", (r) => json(r, 200, { id: "o", url: "https://mcbios.com", name: "MCBIOS", shortName: "MCBIOS" }));
  await page.route("**/api/auth/**", async (r) => {
    const req = r.request();
    if (req.method() === "OPTIONS") return r.fulfill({ status: 204, headers: CORS });
    if (req.method() === "PUT") {
      calls.elevate.push({ headers: req.headers(), body: req.postDataJSON() });
      return json(r, 201, { message: "ok" });
    }
    return m.emailStatus === 200 ? json(r, 200, { authed: m.authed ?? true }) : json(r, m.emailStatus, { message: "x" });
  });
  await page.route("**/api/auth", async (r) => {
    const req = r.request();
    if (req.method() === "OPTIONS") return r.fulfill({ status: 204, headers: CORS });
    calls.elevate.push({ headers: req.headers(), body: req.postDataJSON() });
    return json(r, 201, { message: "ok" });
  });
  await page.route(/\/auth\/v1\/token/, (r) => json(r, 200, SESSION));
  await page.route(/\/auth\/v1\/signup/, (r) => {
    calls.signup.push(r.request().postDataJSON());
    return json(r, 200, m.signedUpWithSession ? SESSION : { ...USER, ...(m.signupIdentities ? { identities: m.signupIdentities } : {}) });
  });
  await page.route(/\/auth\/v1\/recover/, (r) => {
    calls.reset++;
    return json(r, 200, {});
  });
  await page.route(/\/auth\/v1\/user/, (r) => json(r, 200, USER));
  await page.route(/\/auth\/v1\/logout/, (r) => r.fulfill({ status: 204, headers: CORS }));
  return calls;
}

async function expectNoViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(
    results.violations.map((v) => ({ id: v.id, nodes: v.nodes.slice(0, 3).map((n) => `${n.target.join(" ")}: ${n.any[0]?.message ?? n.failureSummary}`) })),
  ).toEqual([]);
}

async function openSignIn(page: Page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("dialog", { name: "Sign in" })).toBeVisible();
  // Not keyed on the name: it changes with the mode (sign in / create account / reset)
  return page.getByRole("dialog");
}

test.describe("sign in", () => {
  test("email, then password, then signed in (axe on every step)", async ({ page }) => {
    await mockBackend(page, { emailStatus: 200, authed: true });
    const dialog = await openSignIn(page);
    await expect(dialog.getByLabel("Email")).toBeFocused();
    await expectNoViolations(page);

    await dialog.getByLabel("Email").fill("ada@example.com");
    await page.keyboard.press("Enter"); // Enter works on the email step (the old modal ignored it)
    await expect(dialog.getByLabel("Password", { exact: true })).toBeVisible();
    await expect(dialog.getByLabel("Password", { exact: true })).toBeFocused();
    await expect(dialog.getByRole("status")).toContainText("Email verified");
    await expectNoViolations(page);

    await dialog.getByLabel("Password", { exact: true }).fill("secret1");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.getByRole("status").filter({ hasText: "Welcome back" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Account menu for ada@example.com/ })).toBeVisible();
  });

  test("the password can be shown, and the toggle says what it does", async ({ page }) => {
    await mockBackend(page, { emailStatus: 200 });
    const dialog = await openSignIn(page);
    await dialog.getByLabel("Email").fill("ada@example.com");
    await page.keyboard.press("Enter");
    const toggle = dialog.getByRole("button", { name: "Show password" });
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await toggle.click();
    await expect(dialog.getByRole("button", { name: "Hide password" })).toHaveAttribute("aria-pressed", "true");
    await expect(dialog.locator('input[type="text"]').first()).toBeVisible();
    await expect(dialog.locator('input[autocomplete="current-password"]')).toHaveCount(1);
  });

  test("an unregistered email stays on step one with an announced error", async ({ page }) => {
    await mockBackend(page, { emailStatus: 404 });
    const dialog = await openSignIn(page);
    await dialog.getByLabel("Email").fill("new@example.com");
    await page.keyboard.press("Enter");
    await expect(dialog.getByRole("alert")).toContainText("not registered");
    await expect(dialog.getByLabel("Email")).toBeVisible();
    await expectNoViolations(page);
  });

  test("a bad email is caught inline before any request", async ({ page }) => {
    const calls: string[] = [];
    page.on("request", (r) => r.url().includes("/api/auth/") && calls.push(r.url()));
    await mockBackend(page, { emailStatus: 200 });
    const dialog = await openSignIn(page);
    await dialog.getByLabel("Email").fill("nope");
    await page.keyboard.press("Enter");
    const email = dialog.getByLabel("Email");
    await expect(email).toHaveAttribute("aria-invalid", "true");
    await expect(dialog.getByText("Enter a valid email address")).toBeVisible();
    expect(calls).toEqual([]);
    await expectNoViolations(page);
  });

  test("an account from another organization is linked after sign-in", async ({ page }) => {
    const calls = await mockBackend(page, { emailStatus: 406 });
    const dialog = await openSignIn(page);
    await dialog.getByLabel("Email").fill("ada@example.com");
    await page.keyboard.press("Enter");
    await expect(dialog.getByRole("status")).toContainText("another organization");
    await dialog.getByLabel("Password", { exact: true }).fill("secret1");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect.poll(() => calls.elevate.length).toBe(1);
    expect(calls.elevate[0].headers.signup).toBeUndefined();
    expect(calls.elevate[0].body).toMatchObject({ token: "tok" });
  });
});

test("the dialog has no violations in the light theme either", async ({ page }) => {
  await mockBackend(page, { emailStatus: 406 });
  await page.goto("/");
  await page.getByLabel("Toggle light and dark theme").click();
  await expect(page.locator("input.theme-controller")).toBeChecked();
  await page.getByRole("button", { name: "Sign in" }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("Email").fill("ada@example.com");
  await page.keyboard.press("Enter");
  await expect(dialog.getByRole("status")).toContainText("another organization");
  await expectNoViolations(page);
  await dialog.getByLabel("Password", { exact: true }).fill("x");
  await page.getByRole("button", { name: "Use a different email" }).click();
  await dialog.getByLabel("Email").fill("nope");
  await page.keyboard.press("Enter");
  await expectNoViolations(page);
});

test.describe("sign up", () => {
  test("new account: profile and password, with inline errors, then confirm-your-email", async ({ page }) => {
    const calls = await mockBackend(page, { emailStatus: 404 });
    const dialog = await openSignIn(page);
    await dialog.getByRole("button", { name: "New here? Create an account" }).click();
    await expect(page.getByRole("dialog", { name: "Create your account" })).toBeVisible();
    await dialog.getByLabel("Email").fill("new@example.com");
    await page.keyboard.press("Enter");

    await expect(dialog.getByLabel("Given name")).toBeFocused();
    await expect(dialog.locator('input[autocomplete="new-password"]')).toHaveCount(1);
    await expectNoViolations(page);

    await dialog.getByLabel("Given name").fill("A");
    await dialog.getByLabel("Family name").fill("L");
    await dialog.getByLabel("Institution").fill("MIT");
    await dialog.getByLabel("Choose a password").fill("12345");
    await page.keyboard.press("Enter");
    await expect(dialog.getByLabel("Given name")).toHaveAttribute("aria-invalid", "true");
    await expect(dialog.getByText("Password must be at least 6 characters")).toBeVisible();
    await expectNoViolations(page);

    await dialog.getByLabel("Given name").fill("Ada");
    await dialog.getByLabel("Family name").fill("Lovelace");
    await dialog.getByLabel("Choose a password").fill("secret123");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.getByRole("status").filter({ hasText: "Check your email" })).toBeVisible();
    expect(calls.signup[0]).toMatchObject({ email: "new@example.com", data: { fname: "Ada", lname: "Lovelace", role: "student", institution: "MIT" } });
  });
});

test.describe("sign up with an email that already has an account", () => {
  test("in this org: becomes a password-only sign-in (no profile form)", async ({ page }) => {
    await mockBackend(page, { emailStatus: 200, authed: true });
    const dialog = await openSignIn(page);
    await dialog.getByRole("button", { name: "New here? Create an account" }).click();
    await dialog.getByLabel("Email").fill("ada@example.com");
    await page.keyboard.press("Enter");

    // The dialog is now a sign-in: the title says so, and only the password is asked for
    await expect(page.getByRole("dialog", { name: "Sign in" })).toBeVisible();
    await expect(dialog.getByRole("status")).toContainText("already have an account");
    await expect(dialog.getByLabel("Password", { exact: true })).toBeFocused();
    await expect(dialog.getByLabel("Given name")).toHaveCount(0);
    await expect(dialog.getByLabel("Family name")).toHaveCount(0);
    await expect(dialog.getByLabel("Institution")).toHaveCount(0);
    await expect(dialog.locator('input[autocomplete="current-password"]')).toHaveCount(1);
    await expectNoViolations(page);

    await dialog.getByLabel("Password", { exact: true }).fill("secret1");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.getByRole("button", { name: /Account menu for ada@example.com/ })).toBeVisible();
  });

  test("in another org: asks for the profile, signs in with the existing password, then links", async ({ page }) => {
    const calls = await mockBackend(page, { emailStatus: 406 });
    const dialog = await openSignIn(page);
    await dialog.getByRole("button", { name: "New here? Create an account" }).click();
    await dialog.getByLabel("Email").fill("ada@example.com");
    await page.keyboard.press("Enter");

    await expect(dialog.getByLabel("Given name")).toBeVisible();
    await expect(dialog.locator('input[autocomplete="current-password"]')).toHaveCount(1); // their password, not a new one
    await expect(dialog.getByLabel("Password", { exact: true })).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Link my account" })).toBeVisible();
    await expectNoViolations(page);

    await dialog.getByLabel("Given name").fill("Ada");
    await dialog.getByLabel("Family name").fill("Lovelace");
    await dialog.getByLabel("Institution").fill("Analytical Engines");
    await dialog.getByLabel("Password", { exact: true }).fill("secret1");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect.poll(() => calls.elevate.length).toBe(1);
    expect(calls.elevate[0].headers.signup).toBe("true");
    expect(calls.elevate[0].body).toMatchObject({ token: "tok", fname: "Ada", lname: "Lovelace", institution: "Analytical Engines" });
  });

  test("if Supabase hides an existing account, we don't say 'check your email'", async ({ page }) => {
    // Email confirmation on: signing up an existing email returns a user with no identities and sends nothing
    await mockBackend(page, { emailStatus: 404, signupIdentities: [] });
    const dialog = await openSignIn(page);
    await dialog.getByRole("button", { name: "New here? Create an account" }).click();
    await dialog.getByLabel("Email").fill("ada@example.com");
    await page.keyboard.press("Enter");
    await dialog.getByLabel("Given name").fill("Ada");
    await dialog.getByLabel("Family name").fill("Lovelace");
    await dialog.getByLabel("Institution").fill("Analytical Engines");
    await dialog.getByLabel("Choose a password").fill("secret123");
    await page.keyboard.press("Enter");
    await expect(dialog.getByRole("alert")).toContainText("already exists");
    await expect(page.getByRole("status").filter({ hasText: "Check your email" })).toHaveCount(0);
    await expect(page.getByRole("dialog")).toBeVisible();
  });
});

test.describe("reset", () => {
  test("sends a reset link and announces it", async ({ page }) => {
    const calls = await mockBackend(page, { emailStatus: 200 });
    const dialog = await openSignIn(page);
    await dialog.getByRole("button", { name: "Forgot your password?" }).click();
    await expect(page.getByRole("dialog", { name: "Reset your password" })).toBeVisible();
    await expectNoViolations(page);
    await dialog.getByLabel("Email").fill("ada@example.com");
    await page.keyboard.press("Enter");
    const notice = page.getByRole("status").filter({ hasText: "reset link" });
    await expect(notice).toBeVisible();
    // The link opens Conference Suite, so say so and say to come back
    await expect(notice).toContainText("Conference Suite");
    await expect(notice).toContainText("sign in here again");
    expect(calls.reset).toBe(1);
  });
});

test.describe("keyboard and focus", () => {
  test("opens from the keyboard, traps focus, and Escape returns focus to the button", async ({ page }) => {
    await mockBackend(page, { emailStatus: 200 });
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Sign in" });
    await trigger.focus();
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog");
    await expect(page.getByRole("dialog", { name: "Sign in" })).toBeVisible();
    await expect(dialog.getByLabel("Email")).toBeFocused();
    for (let i = 0; i < 8; i++) await page.keyboard.press("Tab");
    expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test("signed-in menu: sign out from the keyboard", async ({ page }) => {
    await mockBackend(page, { emailStatus: 200 });
    const dialog = await openSignIn(page);
    await dialog.getByLabel("Email").fill("ada@example.com");
    await page.keyboard.press("Enter");
    await dialog.getByLabel("Password", { exact: true }).fill("secret1");
    await page.keyboard.press("Enter");
    const menu = page.getByRole("button", { name: /Account menu/ });
    await menu.focus();
    await page.keyboard.press("Enter");
    await expectNoViolations(page);
    await page.getByRole("menuitem", { name: "Sign out" }).click();
    await expect(page.getByRole("status").filter({ hasText: "signed out" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  });
});
