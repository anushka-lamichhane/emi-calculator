const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/login.page.js");

test.describe("Authenticated User Tests", () => {
  let login;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);

    // Go to app (already authenticated via storageState)
    await page.goto("/");

    // Make sure we are not redirected to Microsoft login
    await expect(page).not.toHaveURL(/login\.microsoftonline\.com/);

    // Confirm dashboard loaded
    await expect(page).toHaveURL(/assistant=asst_/);
  });

  test("Verify main dashboard UI elements", async () => {
    await login.verifyAssistantHomePageLoaded();
  });

  test("User can navigate to Doc Admin section", async ({ page }) => {
    await login.goToDocsAdmin();
  });
});
