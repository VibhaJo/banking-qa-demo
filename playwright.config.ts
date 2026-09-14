import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "docker compose up -d && docker compose logs -f parabank",
    url: "http://localhost:8080/parabank/index.htm",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],

  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:8080",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
    actionTimeout: 10_000,
  },

  projects: [
    { name: "api", testDir: "./tests/api" },
    {
      name: "ui",
      testDir: "./tests/ui",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          channel: "chrome",
        },
      },
    },
    {
      name: "integration",
      testDir: "./tests/integration",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          channel: "chrome",
        },
      },
    },
  ],
});
