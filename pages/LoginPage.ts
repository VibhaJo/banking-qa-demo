import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  protected readonly path = "/parabank/index.htm";

  // ParaBank's login inputs have no label associated with them, so there is no
  // accessible name to locate by and getByLabel also does not work. So going with the name attribute.
  // The missing association is an accessibility defect in the application, not a preference here.
  private get usernameInput(): Locator {
    return this.page.locator('input[name="username"]');
  }

  private get passwordInput(): Locator {
    return this.page.locator('input[name="password"]');
  }

  private get logInButton(): Locator {
    return this.page.getByRole("button", { name: "Log In" });
  }

  // Exposed as a locator rather than a string so specs keep web-first
  // assertions and auto-waiting. Different failures render different messages,
  // so the spec asserts which one, not this page object.
  get errorMessage(): Locator {
    return this.page.locator("#rightPanel .error");
  }

  // Deliberately does not assert success. Most login tests expect this to fail,
  // and a method that asserted would need a failing twin.
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.logInButton.click();
  }
}
