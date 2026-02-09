const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({

  // Runs ONCE → creates MFA session
  globalSetup: require.resolve('./auth.setup.js'),

  testDir: './tests',

  timeout: 30 * 1000,

  use: {
    baseURL: 'https://demo.insyde.ai/',

    // ✔ Reuse saved MFA session
    storageState: 'storageState.json',

    // ✔ Needed for Microsoft redirects
    ignoreHTTPSErrors: true,

    headless: false,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  reporter: [
    ['html', { open: 'never' }]
  ],
});
