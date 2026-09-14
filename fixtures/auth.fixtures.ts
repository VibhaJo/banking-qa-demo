import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { AccountsOverviewPage } from "../pages/AccountsOverviewPage";

type AuthFixtures = {
  loginPage: LoginPage;
  accountsOverviewPage: AccountsOverviewPage;
};

// Auth layer. Owns the login page and the page it lands on, and imports nothing
// it does not own. Feature layers that need a signed-in user (transfers, bill
// pay) extend this one; registration and the API specs do not, because they do
// not depend on auth.
export const test = base.extend<AuthFixtures>({
  // Constructed, not navigated. The test decides when to call goto(), so a test
  // can still assert on the login page's initial state.
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  accountsOverviewPage: async ({ page }, use) => {
    await use(new AccountsOverviewPage(page));
  },
});

export { expect } from "@playwright/test";
