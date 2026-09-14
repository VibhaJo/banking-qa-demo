import { test, expect } from "../../fixtures/auth.fixtures";
import { env } from "../../config/env";

const incorrectPasswordError =
  "The username and password could not be verified.";
const incorrectPassword = "a123b456";

// Timestamped so the account cannot exist in the seeded database.
const unknownUsername = `no-such-user-${Date.now()}`;

test.describe("Valid login test", () => {
  test("validate user can login with valid credentials", async ({
    loginPage,
    accountsOverviewPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(env.username, env.password);

    await expect(accountsOverviewPage.heading).toBeVisible();
  });
});

test.describe("Invalid login tests", () => {
  test("validate user can not login with valid username but incorrect password", async ({
    loginPage,
    accountsOverviewPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(env.username, incorrectPassword);

    await expect(loginPage.errorMessage).toHaveText(incorrectPasswordError);
    await expect(accountsOverviewPage.heading).toBeHidden();
  });

  test("shows the same error for an unknown user even with valid password of another user", async ({
    loginPage,
    accountsOverviewPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(unknownUsername, env.password);

    await expect(loginPage.errorMessage).toHaveText(incorrectPasswordError);
    await expect(accountsOverviewPage.heading).toBeHidden();
  });

  test("shows the same error for a wrong password and an unknown user", async ({
    loginPage,
    accountsOverviewPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(unknownUsername, incorrectPassword);

    await expect(loginPage.errorMessage).toHaveText(incorrectPasswordError);
    await expect(accountsOverviewPage.heading).toBeHidden();
  });
});
