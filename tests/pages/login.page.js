const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;

    this.clickLoginButton = page.getByRole("button", { name: "Login" });
    this.selectInsydeIdpOption = page.getByRole("button", { name: "Insyde-Corp-IDP" });

    this.selectAssistantText = page.getByText("Select an Assistant", { exact: true });
    this.userProfileButton = page.getByRole('button', { name: 'User' })
    this.clickOnDocsAdmin = page.getByRole('link', { name: 'Docs Admin' })
  }

  async clickLogin() {
    await this.clickLoginButton.click();
  }

  async selectInsydeIdp() {
    await this.selectInsydeIdpOption.click();
  }

  async verifyAssistantHomePageLoaded() {
    await expect(this.selectAssistantText).toBeVisible();
    await expect(this.userProfileButton).toBeVisible();
  }

  async goToDocsAdmin() {
    await this.userProfileButton.click();
    await expect(this.clickOnDocsAdmin).toBeVisible();
    await this.clickOnDocsAdmin.click();
  }
}

module.exports = { LoginPage };
