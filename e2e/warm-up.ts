/**
 * `next dev` compiles a page the first time it is requested, and a compile that
 * lands while another test is mid-page can hot-reload it (state lost, flaky test).
 * Request every page once before any test runs so the dev server is already warm.
 */
const PAGES = ["/", "/sessions", "/abstracts", "/ysea", "/schedule", "/accommodations", "/about", "/register", "/register/status"];

export default async function warmUp() {
  const base = `http://localhost:${process.env.PORT ?? 3100}`;
  for (const path of PAGES) {
    await fetch(base + path).catch(() => undefined);
  }
}
