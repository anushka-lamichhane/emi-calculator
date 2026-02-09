const { chromium } = require("@playwright/test");

module.exports = async () => {
  const browser = await chromium.launch({ headless: false });

  // IMPORTANT: allow cross-domain cookies
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    recordHar: { path: "login.har" }, // optional but helps diagnostics
  });

  const page = await context.newPage();

  console.log("🔐 Opening site...");
  await page.goto("https://demo.insyde.ai/", { waitUntil: "networkidle" });

  console.log("➡️ Clicking Login...");
  await page.getByRole("button", { name: "Login" }).click();

  console.log("🏢 Selecting Corporate IDP...");
  await page.getByRole("button", { name: "Insyde-Corp-IDP" }).click();

  // Wait for Microsoft login
  await page.waitForURL(/login\.microsoftonline\.com/, { timeout: 120000 });
  console.log("✍️ Complete login + MFA manually");

  // Wait until user completes everything and reaches dashboard
  await page.waitForURL(/assistant=asst_/, { timeout: 180000 });
  console.log("🎉 Back to dashboard");

  // CRITICAL — wait for background SSO token exchanges to complete
  await page.waitForLoadState("networkidle");

  console.log("💾 Saving storageState...");
  await context.storageState({ path: "storageState.json" });

  await browser.close();
};
