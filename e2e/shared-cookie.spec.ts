import { type Page, expect, test } from "@playwright/test";

/**
 * The shared sign-in, for real: two hostnames on one domain (a.mcbios.test and
 * b.mcbios.test, both mapped to the dev server) in one browser. Signing in on
 * one must sign in the other, and signing out must sign out both. The cookie
 * domain is derived from the org's base_url (https://mcbios.test), not config.
 */
test.use({ launchOptions: { args: ["--host-resolver-rules=MAP *.mcbios.test 127.0.0.1"] } });

const CORS = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*" };
const USER = { id: "11111111-1111-1111-1111-111111111111", aud: "authenticated", role: "authenticated", email: "ada@example.com", app_metadata: {}, user_metadata: {}, created_at: "2026-01-01T00:00:00Z" };
const SESSION = { access_token: "tok", token_type: "bearer", expires_in: 3600, refresh_token: "ref", user: USER };

async function mock(page: Page) {
  const json = (status: number, body: unknown) => ({ status, contentType: "application/json", headers: CORS, body: JSON.stringify(body) });
  await page.route("**/api/org/**", (r) => r.fulfill(json(200, { id: "o", url: "https://mcbios.test", name: "MCBIOS", shortName: null })));
  await page.route("**/api/auth/**", (r) => r.fulfill(json(200, { authed: true })));
  await page.route(/\/auth\/v1\/token/, (r) => r.fulfill(json(200, SESSION)));
  await page.route(/\/auth\/v1\/user/, (r) => r.fulfill(json(200, USER)));
  await page.route(/\/auth\/v1\/logout/, (r) => r.fulfill({ status: 204, headers: CORS }));
}

test("sign in on one subdomain signs in the other; sign out signs out both", async ({ context }) => {
  const a = await context.newPage();
  const b = await context.newPage();
  await mock(a);
  await mock(b);

  await a.goto("http://a.mcbios.test:3100/");
  await a.getByRole("button", { name: "Sign in" }).click();
  const dialog = a.getByRole("dialog");
  await dialog.getByLabel("Email").fill("ada@example.com");
  await a.keyboard.press("Enter");
  await dialog.getByLabel("Password", { exact: true }).fill("secret1");
  await a.keyboard.press("Enter");
  await expect(a.getByRole("button", { name: /Account menu for ada@example.com/ })).toBeVisible();

  // One session cookie, scoped to the whole domain
  const cookies = (await context.cookies()).filter((c) => /^sb-.+-auth-token/.test(c.name));
  expect(cookies.length).toBeGreaterThan(0);
  for (const c of cookies) expect(c.domain).toBe(".mcbios.test");

  // The sibling subdomain is signed in without doing anything
  await b.goto("http://b.mcbios.test:3100/");
  await expect(b.getByRole("button", { name: /Account menu for ada@example.com/ })).toBeVisible();

  // Signing out on the sibling clears it for both
  await b.getByRole("button", { name: /Account menu/ }).click();
  await b.getByRole("menuitem", { name: "Sign out" }).click();
  await expect(b.getByRole("button", { name: "Sign in" })).toBeVisible();
  expect((await context.cookies()).filter((c) => /^sb-.+-auth-token/.test(c.name))).toEqual([]);
  await a.reload();
  await expect(a.getByRole("button", { name: "Sign in" })).toBeVisible();
});

test("a host outside the org's domain keeps a host-only cookie", async ({ page }) => {
  await mock(page);
  // localhost is not inside mcbios.test, so the shared Domain must not be applied
  await page.goto("http://localhost:3100/");
  await page.getByRole("button", { name: "Sign in" }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("Email").fill("ada@example.com");
  await page.keyboard.press("Enter");
  await dialog.getByLabel("Password", { exact: true }).fill("secret1");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: /Account menu/ })).toBeVisible();
  const cookies = (await page.context().cookies()).filter((c) => /^sb-.+-auth-token/.test(c.name));
  expect(cookies.length).toBeGreaterThan(0);
  for (const c of cookies) expect(c.domain).toBe("localhost");
});
