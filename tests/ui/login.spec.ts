import { test, expect } from "@playwright/test";
function required(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing ${name}. Copy .env.sample to .env and fill it in.`,
    );
  }
  return value;
}

const username = required("PARABANK_USER");
const password = required("PARABANK_PASS");
const incorrectPasswordError =
  "The username and password could not be verified.";
const incorrectPassword = "a123b456";

// Timestamped so the account cannot exist in the seeded database.
const unknownUsername = `no-such-user-${Date.now()}`;

// Tests the valid login tests
test.describe("Valid login test", () => {
  test("validate user can login with valid credentials", async ({ page }) => {
    await page.goto("/parabank/index.htm");
    await page.locator('input[name="username"]').fill(username);
    await page.locator('input[name="password"]').fill(password);
    await page.getByRole("button", { name: "Log In" }).click();
    await expect(
      page.getByRole("heading", { name: "Accounts Overview" }),
    ).toBeVisible();
  });
});

// Tests that verify the invalid / wrong username/password scenarios
test.describe("Invalid login tests", () => {
  test("validate user can not login with valid username but incorrect password", async ({
    page,
  }) => {
    await page.goto("/parabank/index.htm");
    await page.locator('input[name="username"]').fill(username);
    await page.locator('input[name="password"]').fill(incorrectPassword);
    await page.getByRole("button", { name: "Log In" }).click();
    await expect(page.getByText(incorrectPasswordError)).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Accounts Overview" }),
    ).toBeHidden();
  });

  test("shows the same error for a unknown user even with valid password of another user", async ({
    page,
  }) => {
    await page.goto("/parabank/index.htm");
    await page.locator('input[name="username"]').fill(unknownUsername);
    await page.locator('input[name="password"]').fill(password);
    await page.getByRole("button", { name: "Log In" }).click();
    await expect(page.getByText(incorrectPasswordError)).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Accounts Overview" }),
    ).toBeHidden();
  });

  test("shows the same error for a wrong password and an unknown user", async ({
    page,
  }) => {
    await page.goto("/parabank/index.htm");
    await page.locator('input[name="username"]').fill(unknownUsername);
    await page.locator('input[name="password"]').fill(incorrectPassword);
    await page.getByRole("button", { name: "Log In" }).click();
    await expect(page.getByText(incorrectPasswordError)).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Accounts Overview" }),
    ).toBeHidden();
  });
});
