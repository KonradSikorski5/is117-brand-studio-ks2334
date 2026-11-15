import { defineConfig, devices } from "@playwright/test";
import { tmpdir } from "node:os";
import path from "node:path";

// A fresh SQLite file for every test run, so old demo orders never interfere.
const testDatabase = path.join(
  tmpdir(),
  `full-shift-test-${Date.now()}.sqlite`,
);

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: { baseURL: "http://127.0.0.1:5174", trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "node server.mjs",
    url: "http://127.0.0.1:5174",
    env: { PORT: "5174", FULLSHIFT_DB: testDatabase },
    reuseExistingServer: false,
    timeout: 15000,
  },
});
