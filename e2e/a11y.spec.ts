import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Accessibility baseline. Every page must have zero WCAG 2.x A/AA violations in
 * light and dark. New pages and components join this list when they ship (the
 * "accessibility ratchet" in conf_suite/suite/docs/sdk-roadmap.md).
 */
const PAGES = [
  "/",
  "/sessions",
  "/abstracts",
  "/ysea",
  "/schedule",
  "/accommodations",
  "/about",
  "/register",
];

// Dark is the default theme; light is switched on with the navbar toggle.
for (const theme of ["dark", "light"] as const) {
  test.describe(`axe (${theme})`, () => {
    for (const path of PAGES) {
      test(path, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState("networkidle");
        if (theme === "light") {
          await page.getByLabel("Toggle light and dark theme").click();
          await expect(page.locator("input.theme-controller")).toBeChecked();
        }
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze();
        expect(
          results.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            nodes: v.nodes
              .slice(0, 3)
              .map((n) => `${n.target.join(" ")}: ${n.any[0]?.message ?? n.failureSummary}`),
          })),
        ).toEqual([]);
      });
    }
  });
}

test("the site is usable by keyboard: skip to the nav and open the menu", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open menu" });
  await menu.focus();
  await expect(menu).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("link", { name: "Session Proposals" }).first()).toBeVisible();
});
