const { chromium } = require("@playwright/test");
const fs = require("fs");
const constants = require("./config/constants");

function isStorageStateValid() {
  const storageStatePath = constants.paths.storageState;

  if (!fs.existsSync(storageStatePath)) {
    return false;
  }

  try {
    const storageState = JSON.parse(fs.readFileSync(storageStatePath, "utf8"));

    if (!storageState.cookies || storageState.cookies.length === 0) {
      return false;
    }

    const now = Math.floor(Date.now() / 1000);
    const hasValidSessionCookie = storageState.cookies.some((cookie) => {
      if (
        cookie.name === "next-auth.session-token.0" ||
        cookie.name === "next-auth.session-token.1"
      ) {
        if (cookie.expires === -1) {
          return true;
        }
        return cookie.expires > now;
      }
      return false;
    });

    return hasValidSessionCookie;
  } catch (error) {
    return false;
  }
}

async function validateExistingSession() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    storageState: constants.paths.storageState,
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();

  try {
    await page.goto(constants.urls.baseUrl, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    await page.waitForTimeout(2000);

    const currentUrl = page.url();
    const isAuthenticated =
      constants.urls.dashboard.test(currentUrl) ||
      !constants.urls.microsoftLogin.test(currentUrl);

    await browser.close();
    return isAuthenticated;
  } catch (error) {
    await browser.close();
    return false;
  }
}

async function performLogin() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    recordHar: { path: constants.paths.harFile },
  });
  const page = await context.newPage();

  try {
    console.log("Opening site...");
    await page.goto(constants.urls.baseUrl, {
      waitUntil: constants.waitOptions.networkIdle,
    });

    console.log("Clicking Login...");
    await page
      .getByRole(constants.selectors.loginButton.role, {
        name: constants.selectors.loginButton.name,
      })
      .click();

    console.log("Selecting Corporate IDP...");
    await page
      .getByRole(constants.selectors.insydeIdpButton.role, {
        name: constants.selectors.insydeIdpButton.name,
      })
      .click();

    await page.waitForURL(constants.urls.microsoftLogin, {
      timeout: constants.timeouts.microsoftLogin,
    });
    console.log("Complete login + MFA manually");

    await page.waitForURL(constants.urls.dashboard, {
      timeout: constants.timeouts.dashboardLoad,
    });
    console.log("Back to dashboard");

    await page.waitForLoadState(constants.waitOptions.networkIdle);

    console.log("Saving storageState...");
    await context.storageState({ path: constants.paths.storageState });
    console.log("Authentication state saved successfully");
  } catch (error) {
    console.error("Authentication setup failed:", error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

const authSetup = async (forceReauth = false) => {
  if (forceReauth) {
    console.log("Force re-authentication requested, performing login...");
    await performLogin();
    return;
  }

  if (isStorageStateValid()) {
    console.log("Found existing storageState.json, validating session...");
    const isValid = await validateExistingSession();

    if (isValid) {
      console.log("Existing session is valid, skipping login");
      return;
    } else {
      console.log("Existing session is invalid, performing new login...");
    }
  } else {
    console.log("No valid storageState.json found, performing login...");
  }

  await performLogin();
};

if (require.main === module) {
  authSetup(true).catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
}

module.exports = authSetup;
