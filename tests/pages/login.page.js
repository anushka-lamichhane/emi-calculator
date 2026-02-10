const { expect } = require("@playwright/test");
const constants = require("../../config/constants");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.selectors = constants.selectors;
  }

  async clickLogin() {
    const loginButton = this.page.getByRole(this.selectors.loginButton.role, {
      name: this.selectors.loginButton.name,
    });
    await loginButton.click();
  }

  async selectInsydeIdp() {
    const idpButton = this.page.getByRole(this.selectors.insydeIdpButton.role, {
      name: this.selectors.insydeIdpButton.name,
    });
    await idpButton.click();
  }

  async verifyAssistantHomePageLoaded() {
    const assistantText = this.page.getByText(
      this.selectors.selectAssistantText.text,
      { exact: this.selectors.selectAssistantText.exact }
    );
    const userProfile = this.page.getByRole(
      this.selectors.userProfileButton.role,
      { name: this.selectors.userProfileButton.name }
    );

    await expect(assistantText).toBeVisible();
    await expect(userProfile).toBeVisible();
  }

  async goToDocsAdmin() {
    const userProfile = this.page.getByRole(
      this.selectors.userProfileButton.role,
      { name: this.selectors.userProfileButton.name }
    );
    await userProfile.click();

    const docsAdminLink = this.page.getByRole(
      this.selectors.docsAdminLink.role,
      { name: this.selectors.docsAdminLink.name }
    );
    await expect(docsAdminLink).toBeVisible();
    await docsAdminLink.click();
  }
}

module.exports = { LoginPage };
