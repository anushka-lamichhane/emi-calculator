const { defineConfig } = require("@playwright/test");
const constants = require("./config/constants");

module.exports = defineConfig({
  globalSetup: require.resolve("./auth.setup.js"),
  testDir: "./tests",
  timeout: constants.timeouts.test,
  use: {
    baseURL: constants.urls.baseUrl,
    storageState: constants.paths.storageState,
    ignoreHTTPSErrors: true,
    headless: process.env.HEADLESS !== "false",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",
  },
  reporter: [["html", { open: "never" }]],
  projects: [
    {
      name: "chromium",
      use: { ...require("@playwright/test").devices["Desktop Chrome"] },
    },
  ],
});
