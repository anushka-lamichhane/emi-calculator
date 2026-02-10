const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/login.page");
const constants = require("../../config/constants");

test.describe("Authenticated User Tests", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/");
    await expect(page).not.toHaveURL(constants.urls.microsoftLogin);
    await expect(page).toHaveURL(constants.urls.dashboard);
  });

  test("Verify main dashboard UI elements", async () => {
    await loginPage.verifyAssistantHomePageLoaded();
  });

  test("User can navigate to Doc Admin section", async () => {
    await loginPage.goToDocsAdmin();
  });
});
