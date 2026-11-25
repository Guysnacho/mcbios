import { loadEnvConfig } from "@next/env";
import { defineConfig, devices } from "@playwright/test";

// The dev server reads .env.local; so do the tests (the schedule agenda is stored per org id).
loadEnvConfig(process.cwd());
// No .env.local (CI): any fixed id will do, the suite is mocked.
process.env.NEXT_PUBLIC_ORG_ID ||= "00000000-0000-4000-8000-0000000000aa";

const PORT = 3100;

export default defineConfig({
  testDir: "./e2e",
  globalSetup: "./e2e/warm-up.ts",
  fullyParallel: true,
  reporter: [["list"]],
  use: { baseURL: `http://localhost:${PORT}`, trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `yarn dev --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    // The registration form's id (any value: the suite is mocked in e2e/registration.spec.ts)
    env: {
      NEXT_PUBLIC_REGISTRATION_FORM_ID: "11111111-2222-3333-4444-555555555555",
      NEXT_PUBLIC_ORG_ID: process.env.NEXT_PUBLIC_ORG_ID,
    },
    timeout: 120_000,
  },
});
