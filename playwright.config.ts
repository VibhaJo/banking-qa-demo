import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],

  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:8080",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10_000,
  },

  projects: [
    { name: "api", testDir: "./tests/api" },
    {
      name: "ui",
      testDir: "./tests/ui",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "integration",
      testDir: "./tests/integration",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
