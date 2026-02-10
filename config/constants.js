module.exports = {
  urls: {
    baseUrl: "https://demo.insyde.ai/",
    microsoftLogin: /login\.microsoftonline\.com/,
    dashboard: /assistant=asst_/,
  },
  selectors: {
    loginButton: { role: "button", name: "Login" },
    insydeIdpButton: { role: "button", name: "Insyde-Corp-IDP" },
    selectAssistantText: { text: "Select an Assistant", exact: true },
    userProfileButton: { role: "button", name: "User" },
    docsAdminLink: { role: "link", name: "Docs Admin" },
  },
  timeouts: {
    test: 30000,
    microsoftLogin: 120000,
    dashboardLoad: 180000,
    networkIdle: 30000,
  },
  paths: {
    storageState: "storageState.json",
    harFile: "login.har",
  },
  waitOptions: {
    networkIdle: "networkidle",
  },
};
