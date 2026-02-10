# Insyde QA Automation

Playwright test automation project for testing the Insyde AI demo application.

## 📋 Prerequisites

- **Node.js**: 18 or higher (recommended: 20)
- **npm**: Comes with Node.js
- **System Dependencies**: Required for Playwright browsers (see below)

### Install System Dependencies (Linux)

On Ubuntu/Debian systems, install the required system libraries:

```bash
sudo npx playwright install-deps
```

Or manually install:

```bash
sudo apt-get update
sudo apt-get install -y \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libdbus-1-3 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpango-1.0-0 \
    libcairo2 \
    libatspi2.0-0 \
    libxshmfence1 \
    libgstcodecparsers-1.0-0 \
    libflite1 \
    libavif13 \
    libx264-163
```

**Note**: If you see missing library errors, run `sudo npx playwright install-deps` which will install all required dependencies automatically.

## 🚀 Quick Start

### 1. Install Node.js Dependencies

```bash
npm install
```

### 2. Install System Dependencies (Linux only)

```bash
sudo npx playwright install-deps
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

Or install only Chromium:

```bash
npx playwright install chromium
```

### 4. Set Up Authentication

The authentication setup runs automatically before tests. However, you can run it manually:

```bash
npm run auth:setup
```

**Note**: This will open a browser window where you need to:

1. Complete Microsoft SSO login
2. Complete MFA (Multi-Factor Authentication)
3. Wait for the dashboard to load

The authentication state will be saved to `storageState.json` for reuse in subsequent test runs.

## 🧪 Running Tests

### Run All Tests (Headless)

```bash
npm test
```

### Run Tests with UI Mode

```bash
npm run test:ui
```

### Run Tests in Headed Mode (See Browser)

```bash
npm run test:headed
```

### Run Tests in Debug Mode

```bash
npm run test:debug
```

### Run Specific Test Suite

```bash
npm run test:auth
```

### Run a Specific Test File

```bash
npx playwright test tests/auth/Login.spec.js
```

### Run Tests Matching a Pattern

```bash
npx playwright test -g "Verify main dashboard"
```

### View Test Report

```bash
npm run report
```

## 📁 Project Structure

```
├── auth.setup.js          # Global authentication setup
├── playwright.config.js   # Playwright configuration
├── storageState.json      # Saved authentication state (auto-generated)
├── tests/
│   ├── auth/
│   │   └── Login.spec.js  # Test suite
│   ├── data/
│   │   └── loginData.js   # Test data
│   └── pages/
│       └── login.page.js  # Page Object Model
└── package.json
```

## 🔧 Configuration

### Base URL

The base URL is configured in `playwright.config.js`:

- Default: `https://demo.insyde.ai/`

### Timeouts

- Test timeout: 30 seconds (configurable in `playwright.config.js`)
- Authentication setup timeouts: 120s (Microsoft login), 180s (dashboard)

### Test Artifacts

On test failure, the following are automatically captured:

- Screenshots: Saved to `test-results/`
- Videos: Saved to `test-results/`
- Traces: Saved to `test-results/`

## 🔐 Authentication

This project uses Microsoft SSO with MFA. The authentication flow:

1. Navigate to the application
2. Click "Login" button
3. Select "Insyde-Corp-IDP"
4. Complete Microsoft login (manual)
5. Complete MFA (manual)
6. Wait for dashboard to load
7. Save authentication state to `storageState.json`

The saved authentication state is reused for all subsequent test runs, avoiding repeated logins.

**Note**: The `storageState.json` file contains sensitive cookies and is automatically ignored by git (see `.gitignore`).

## 🐛 Troubleshooting

### Authentication Fails

- Delete `storageState.json` and run `npm run auth:setup` again
- Ensure you have valid Microsoft credentials
- Check network connectivity

### Tests Timeout

- Increase timeout in `playwright.config.js`
- Check if the application is accessible
- Verify network connectivity

### Browsers Not Found

```bash
npx playwright install
```

### Missing System Dependencies (Linux)

If you see errors about missing `.so` libraries (e.g., `libgstcodecparsers-1.0.so.0`, `libflite.so.1`, etc.):

```bash
sudo npx playwright install-deps
```

This will install all required system dependencies for Playwright browsers.

### View Test Report

```bash
npm run report
```

## 📝 Available Scripts

- `npm test` - Run all tests (headless)
- `npm run test:ui` - Run tests with UI mode
- `npm run test:headed` - Run tests with visible browser
- `npm run test:debug` - Run tests in debug mode
- `npm run test:auth` - Run authentication tests only
- `npm run report` - View test report
- `npm run auth:setup` - Manually run authentication setup
- `npm run prettier` - Format code with Prettier

## 🔍 Test Reports

After running tests, view the HTML report:

```bash
npm run report
```

The report includes:

- Test results and status
- Screenshots on failure
- Videos on failure
- Traces for debugging

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)

## 🤝 Contributing

1. Follow the existing Page Object Model pattern
2. Add new page objects in `tests/pages/`
3. Add test data in `tests/data/`
4. Run `npm run prettier` before committing

## ⚠️ Important Notes

- `storageState.json` contains sensitive authentication data - never commit it
- Authentication state expires after some time - regenerate if tests fail with auth errors
- The `login.har` file (if generated) may contain sensitive data - it's ignored by git
