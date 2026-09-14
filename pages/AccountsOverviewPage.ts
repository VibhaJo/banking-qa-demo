import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AccountsOverviewPage extends BasePage {
  protected readonly path = "/parabank/overview.htm";

  get heading(): Locator {
    return this.page.getByRole("heading", { name: "Accounts Overview" });
  }
}
