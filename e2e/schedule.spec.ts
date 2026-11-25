import AxeBuilder from "@axe-core/playwright";
import { type Page, type Route, expect, test } from "@playwright/test";

const CORS = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*" };
const json = (route: Route, status: number, body: unknown = {}, headers: Record<string, string> = {}) =>
  route.fulfill({ status, contentType: "application/json", headers: { ...CORS, ...headers }, body: JSON.stringify(body) });

const TEST_ORG = process.env.NEXT_PUBLIC_ORG_ID ?? ""; // set by playwright.config.ts (from .env.local, or a fixed id)
const R1 = "aaaaaaaa-0000-4000-8000-000000000001";
const R2 = "aaaaaaaa-0000-4000-8000-000000000002";
const T1 = "bbbbbbbb-0000-4000-8000-000000000001";
const T2 = "bbbbbbbb-0000-4000-8000-000000000002";
const id = (n: number) => `cccccccc-0000-4000-8000-00000000000${n}`;

const session = (n: number, title: string, start: string, end: string, over: Record<string, unknown> = {}) => ({
  id: id(n), title, description: `About ${title}`, kind: "talk", starts_at: start, ends_at: end, room_id: R1, track_id: null, speakers: [], ...over,
});

const SCHEDULE = {
  timezone: "America/Chicago",
  theme: {},
  rooms: [{ id: R1, name: "Ballroom A", sort: 0 }, { id: R2, name: "Room B", sort: 1 }],
  tracks: [{ id: T1, name: "Genomics", color: "#1d4ed8", sort: 0 }, { id: T2, name: "AI", color: "#b91c1c", sort: 1 }],
  version: "v1",
  sessions: [
    session(1, "Opening keynote", "2027-03-17T14:00:00Z", "2027-03-17T15:00:00Z", { kind: "keynote", speakers: [{ name: "Ada Lovelace", title: "Countess", affiliation: "Analytical Engines", urls: ["https://example.com/ada", "javascript:alert(1)"] }] }),
    session(2, "Single-cell genomics", "2027-03-17T14:30:00Z", "2027-03-17T15:30:00Z", { room_id: R2, track_id: T1, speakers: [{ name: "Barbara McClintock", affiliation: "Cold Spring Harbor", talk: "Jumping genes" }] }),
    session(3, "Coffee break", "2027-03-17T15:30:00Z", "2027-03-17T16:00:00Z", { kind: "break", room_id: null }),
    session(4, "Machine learning in toxicology", "2027-03-17T16:00:00Z", "2027-03-17T17:00:00Z", { track_id: T2 }),
    session(5, "Closing panel", "2027-03-18T19:00:00Z", "2027-03-18T20:00:00Z", { kind: "panel", speakers: [{ name: "Grace Hopper" }] }),
    session(6, "Evening social", "2027-03-18T02:00:00Z", "2027-03-18T03:00:00Z", { kind: "social", room_id: null }), // 9 pm on the 17th in Chicago
  ],
};

type Mock = { schedule?: unknown; status?: number; me?: { ids: string[] } };

async function mockSuite(page: Page, m: Mock = {}) {
  const calls = { put: [] as { headers: Record<string, string>; body: { session_ids: string[] } }[], get: [] as string[] };
  await page.route(/\/api\/org\//, (r) => json(r, 200, { id: "o", url: "https://mcbios.com", name: "MCBIOS", shortName: "MCBIOS" }));
  await page.route(/\/api\/schedule(\?|$)/, (r) => {
    if (r.request().method() === "OPTIONS") return r.fulfill({ status: 204, headers: CORS });
    if (m.status && m.status !== 200) return json(r, m.status, { message: "This schedule isn't available", code: "plan_inactive" });
    return json(r, 200, m.schedule ?? SCHEDULE, { ETag: '"v1"' });
  });
  let remote = m.me?.ids ?? [];
  await page.route(/\/api\/schedule\/me/, (r) => {
    const req = r.request();
    if (req.method() === "OPTIONS") return r.fulfill({ status: 204, headers: CORS });
    if (req.method() === "PUT") {
      const body = req.postDataJSON();
      calls.put.push({ headers: req.headers(), body });
      remote = body.session_ids;
    } else calls.get.push(req.headers().authorization ?? "");
    return json(r, 200, { session_ids: remote, feed_url: "https://suite.test/api/schedule/ical?org_id=o&token=t0k3n" });
  });
  await page.route(/\/api\/auth\//, (r) => (r.request().method() === "OPTIONS" ? r.fulfill({ status: 204, headers: CORS }) : json(r, 200, { authed: true })));
  return calls;
}

async function expectNoViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(results.violations.map((v) => ({ id: v.id, nodes: v.nodes.slice(0, 3).map((n) => `${n.target.join(" ")}: ${n.any[0]?.message ?? n.failureSummary}`) }))).toEqual([]);
}

test.describe("desktop grid", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("days, rooms as labelled lists, and a session's details (axe throughout)", async ({ page }) => {
    await mockSuite(page);
    await page.goto("/schedule");
    await expect(page.getByRole("tab", { name: /Wed, Mar 17/ })).toHaveAttribute("aria-selected", "true");
    // the 9 pm social is on the 17th (its own zone), not the 18th
    await expect(page.getByRole("tab", { name: /Thu, Mar 18/ })).toContainText("1 sessions");
    await expect(page.getByRole("heading", { name: "Wednesday, March 17: 5 sessions" })).toBeVisible();
    await expect(page.getByRole("list", { name: /^Ballroom A, 2 sessions$/ })).toBeVisible();
    await expect(page.getByRole("list", { name: /^Room B, 1 sessions$/ })).toBeVisible();
    await expect(page.getByRole("list", { name: /^No room, 2 sessions$/ })).toBeVisible();
    await expect(page.getByText(/Times are in Central Daylight Time \(America\/Chicago\)/)).toBeVisible();
    await expectNoViolations(page);

    await page.getByRole("button", { name: /^Opening keynote/ }).click();
    const dialog = page.getByRole("dialog", { name: "Opening keynote" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("Wednesday, March 17, 9:00 AM to 10:00 AM (60 minutes), Ballroom A")).toBeVisible();
    await expect(dialog.getByText("Ada Lovelace")).toBeVisible();
    await expect(dialog.getByRole("link", { name: /example\.com\/ada/ })).toHaveAttribute("rel", /noopener/);
    await expect(dialog.locator('a[href^="javascript"]')).toHaveCount(0); // a non-http link is never rendered
    await expectNoViolations(page);
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(page.getByRole("button", { name: /^Opening keynote/ })).toBeFocused(); // focus goes back
  });

  test("keyboard: one tab stop, arrows move between sessions, Enter opens, B bookmarks", async ({ page }) => {
    await mockSuite(page);
    await page.goto("/schedule");
    const keynote = page.getByRole("button", { name: /^Opening keynote/ });
    const genomics = page.getByRole("button", { name: /^Single-cell genomics/ });
    // roving tabindex: only the active session is a tab stop
    await expect(keynote).toHaveAttribute("tabindex", "0");
    await expect(genomics).toHaveAttribute("tabindex", "-1");
    await keynote.focus();
    await page.keyboard.press("ArrowRight"); // the overlapping session in the next room
    await expect(genomics).toBeFocused();
    await expect(genomics).toHaveAttribute("tabindex", "0");
    await page.keyboard.press("ArrowLeft");
    await expect(keynote).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("button", { name: /^Machine learning/ })).toBeFocused();
    await page.keyboard.press("ArrowUp");
    await page.keyboard.press("b");
    await expect(page.getByRole("button", { name: /^Opening keynote.*In your schedule/ })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog", { name: "Opening keynote" })).toBeVisible();
  });

  test("an overlap in MY schedule is called out; browsing the full schedule never is", async ({ page }) => {
    await mockSuite(page);
    await page.goto("/schedule");
    await expect(page.getByRole("button", { name: /Overlaps with/ })).toHaveCount(0);
    await page.getByRole("button", { name: /^Opening keynote/ }).focus();
    await page.keyboard.press("b");
    await page.getByRole("button", { name: /^Single-cell genomics/ }).focus();
    await page.keyboard.press("b");
    await expect(page.getByRole("button", { name: /^Opening keynote.*Overlaps with Single-cell genomics in your schedule/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /^Single-cell genomics.*Overlaps with Opening keynote/ })).toBeVisible();
  });
});

test.describe("phone agenda", () => {
  test.use({ viewport: { width: 390, height: 800 } });

  test("an agenda list grouped by start time, bookmarkable (axe)", async ({ page }) => {
    await mockSuite(page);
    await page.goto("/schedule");
    await expect(page.getByRole("heading", { name: "9:00 AM", level: 3 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "9:30 AM", level: 3 })).toBeVisible();
    await expect(page.getByRole("list", { name: /Ballroom A/ })).toHaveCount(0); // the grid is not rendered on a phone
    await expectNoViolations(page);

    const add = page.getByRole("button", { name: "Add to my schedule: Opening keynote" });
    await expect(add).toHaveAttribute("aria-pressed", "false");
    await add.click();
    await expect(add).toHaveAttribute("aria-pressed", "true"); // the name stays; the pressed state says it's on
    await expect(page.getByRole("button", { name: /My schedule \(1\)/ })).toBeVisible();
    await expect(page.getByText("Added “Opening keynote” to your schedule.")).toBeAttached();
    await expectNoViolations(page);
  });

  test("My schedule shows only picks, survives a reload, and says what to do when empty", async ({ page }) => {
    await mockSuite(page);
    await page.goto("/schedule");
    await page.getByRole("button", { name: /My schedule \(0\)/ }).click();
    await expect(page.getByText(/You haven't added anything on this day/)).toBeVisible();
    await page.getByRole("button", { name: "Full schedule" }).click();
    await page.getByRole("button", { name: "Add to my schedule: Coffee break" }).click();
    await page.reload();
    await page.getByRole("button", { name: /My schedule \(1\)/ }).click();
    await expect(page.getByRole("heading", { name: "Wednesday, March 17: 1 session" })).toBeVisible();
    await expect(page.getByText("Coffee break").first()).toBeVisible();
    await expect(page.getByText("Opening keynote")).toHaveCount(0);
    await expectNoViolations(page);
  });

  test("search and filters narrow the list, with a count and a way to clear", async ({ page }) => {
    await mockSuite(page);
    await page.goto("/schedule");
    await page.getByLabel("Search sessions, speakers and topics").fill("mcclintock");
    await expect(page.getByText("1 session match.")).toBeVisible();
    await expect(page.getByText("Single-cell genomics").first()).toBeVisible();
    await expect(page.getByText("Opening keynote")).toHaveCount(0);
    await page.getByRole("button", { name: "Clear filters" }).click();
    await page.getByLabel("Track").selectOption({ label: "AI" });
    await expect(page.getByText("1 session match.")).toBeVisible();
    await expect(page.getByText("Machine learning in toxicology").first()).toBeVisible();
    await page.getByLabel("Track").selectOption("");
    await page.getByLabel("Room").selectOption({ label: "Room B" });
    await expect(page.getByText("1 session match.")).toBeVisible();
  });

  test("days switch with the tabs, keyboard included", async ({ page }) => {
    await mockSuite(page);
    await page.goto("/schedule");
    await page.getByRole("tab", { name: /Wed, Mar 17/ }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("tab", { name: /Thu, Mar 18/ })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("heading", { name: "Thursday, March 18: 1 session" })).toBeVisible();
    await expect(page.getByText("Closing panel").first()).toBeVisible();
  });
});

test.describe("states, theme, time zones, print", () => {
  test("not published yet / plan inactive / load error say so", async ({ page }) => {
    await mockSuite(page, { schedule: { ...SCHEDULE, sessions: [] } });
    await page.goto("/schedule");
    await expect(page.getByRole("status").filter({ hasText: "The program hasn't been published yet" })).toBeVisible();
    await expectNoViolations(page);

    const p2 = await page.context().newPage();
    await mockSuite(p2, { status: 402 });
    await p2.goto("/schedule");
    await expect(p2.getByRole("status").filter({ hasText: "isn't available right now" })).toBeVisible();

    const p3 = await page.context().newPage();
    await p3.route(/\/api\/schedule(\?|$)/, (r) => json(r, 500, { message: "boom" }));
    await p3.goto("/schedule");
    await expect(p3.getByRole("alert").filter({ hasText: "We couldn't load the schedule" })).toBeVisible();
    await expect(p3.getByRole("button", { name: "Try again" })).toBeVisible();
  });

  test("the org's theme applies as CSS variables and still passes axe (dark preset)", async ({ page }) => {
    await mockSuite(page, { schedule: { ...SCHEDULE, theme: { preset: "Midnight", bg: "#0f172a", fg: "#f1f5f9", surface: "#1e293b", accent: "#38bdf8", accent_fg: "#0f172a" } } });
    await page.goto("/schedule");
    const root = page.locator(".cs-schedule, [style*='--cs-bg']").first();
    await expect(root).toHaveAttribute("style", /--cs-bg: #0f172a/);
    await expectNoViolations(page);
  });

  test("a malformed theme is ignored rather than injected", async ({ page }) => {
    await mockSuite(page, { schedule: { ...SCHEDULE, theme: { bg: "red;background:url(x)", fg: "#000000", surface: "#ffffff", accent: "#047857", accent_fg: "#ffffff" } } });
    await page.goto("/schedule");
    await expect(page.getByRole("heading", { name: /Wednesday, March 17/ })).toBeVisible();
    await expect(page.locator("[style*='--cs-bg']")).toHaveCount(0);
  });

  test("a viewer in another time zone can switch to their own", async ({ browser }) => {
    const ctx = await browser.newContext({ timezoneId: "Asia/Kolkata", viewport: { width: 390, height: 800 } });
    const page = await ctx.newPage();
    await mockSuite(page);
    await page.goto("/schedule");
    await expect(page.getByRole("heading", { name: "9:00 AM", level: 3 })).toBeVisible();
    await page.getByLabel(/Show in my time zone \(Asia\/(Kolkata|Calcutta)\)/).check();
    await expect(page.getByRole("heading", { name: "7:30 PM", level: 3 })).toBeVisible();
    await expect(page.getByText(/Times are in India Standard Time/)).toBeVisible();
    await ctx.close();
  });

  test("calendar links use the suite's feeds", async ({ page }) => {
    await mockSuite(page);
    await page.goto("/schedule");
    await expect(page.getByRole("link", { name: "Subscribe to the full schedule in your calendar" })).toHaveAttribute("href", /^webcal:\/\/.*\/api\/schedule\/ical\?org_id=/);
    await expect(page.getByRole("link", { name: "Download the full schedule (.ics)" })).toHaveAttribute("href", /^https?:\/\/.*\/api\/schedule\/ical\?org_id=/);
    await expect(page.getByRole("link", { name: "Subscribe to my schedule in your calendar" })).toHaveCount(0); // signed out
  });

  test("print shows every day as plain lists and hides the site chrome", async ({ page }) => {
    await mockSuite(page);
    await page.goto("/schedule");
    await expect(page.getByRole("heading", { name: /Wednesday, March 17/ })).toBeVisible();
    await page.emulateMedia({ media: "print" });
    await expect(page.locator("header.navbar")).toBeHidden();
    await expect(page.locator("footer")).toBeHidden();
    await expect(page.getByRole("tablist")).toBeHidden();
    const printed = page.locator("div.hidden.print\\:block");
    await expect(printed).toBeVisible();
    await expect(printed).toContainText("Wednesday, March 17");
    await expect(printed).toContainText("Thursday, March 18");
    await expect(printed).toContainText("Closing panel");
  });
});

test.describe("signed in: the agenda follows you", () => {
  const USER = { id: "22222222-2222-2222-2222-222222222222", aud: "authenticated", role: "authenticated", email: "grace@example.com", app_metadata: {}, user_metadata: {}, created_at: "2026-01-01T00:00:00Z" };
  const SESSION = { access_token: "member-token", token_type: "bearer", expires_in: 3600, refresh_token: "ref", user: USER };

  async function signIn(page: Page) {
    await page.route(/\/auth\/v1\/token/, (r) => json(r, 200, SESSION));
    await page.route(/\/auth\/v1\/user/, (r) => json(r, 200, USER));
    await page.goto("/");
    await page.getByRole("button", { name: "Sign in" }).click();
    const dialog = page.getByRole("dialog");
    await dialog.getByLabel("Email").fill("grace@example.com");
    await page.keyboard.press("Enter");
    await dialog.getByLabel("Password", { exact: true }).fill("secret1");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  }

  test("signing in merges this device's picks with the account's and pushes the union; toggles sync with the Bearer token", async ({ page }) => {
    const calls = await mockSuite(page, { me: { ids: [id(4)] } });
    await page.setViewportSize({ width: 390, height: 800 });
    await page.addInitScript(([k, v]) => localStorage.setItem(k, v), ["cs:agenda:" + TEST_ORG, JSON.stringify({ ids: [id(3)], base: [] })] as const);
    await signIn(page);
    await page.goto("/schedule");
    await expect(page.getByText("Your schedule is saved to your account and follows you across devices.")).toBeVisible();
    await expect(page.getByRole("button", { name: /My schedule \(2\)/ })).toBeVisible();
    expect(calls.get[0]).toBe("Bearer member-token");
    expect(new Set(calls.put.at(-1)!.body.session_ids)).toEqual(new Set([id(3), id(4)]));

    await page.getByRole("button", { name: "Add to my schedule: Opening keynote" }).click();
    await expect.poll(() => calls.put.length).toBeGreaterThan(1);
    expect(calls.put.at(-1)!.headers.authorization).toBe("Bearer member-token");
    expect(new Set(calls.put.at(-1)!.body.session_ids)).toEqual(new Set([id(1), id(3), id(4)]));
    await expect(page.getByRole("link", { name: "Subscribe to my schedule in your calendar" })).toHaveAttribute("href", /^webcal:\/\/suite\.test\/api\/schedule\/ical\?org_id=o&token=t0k3n$/);
  });
});
