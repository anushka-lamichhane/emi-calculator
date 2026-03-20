# EMI Calculator Automation (Playwright)

This project contains end-to-end test automation for the **EMI Calculator web application** using **Playwright (JavaScript)**.

The automation validates EMI calculations, UI elements, chart and table data consistency, and Excel download functionality.

---

## 🚀 Tech Stack

- Playwright
- Node.js
- JavaScript
- XLSX (for Excel validation)

---

## 📋 Prerequisites

- Node.js (v18 or above)
- npm (comes with Node.js)

---

## ⚙️ Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Install Playwright browsers

```bash
npx playwright install
```

---

## 🧪 Running Tests

### Run all tests (headless)

```bash
npx playwright test
```

### Run in headed mode (see browser)

```bash
npx playwright test --headed
```

### Run a specific test file

```bash
npx playwright test tests/emiCalculator.spec.js
```

### View HTML report

```bash
npx playwright show-report
```

---

## 📁 Project Structure

```
├── tests/
│   └── emiCalculator.spec.js     # Test cases
├── pages/
│   └── emiCalculator.page.js     # Page Object Model
├── utils/                        # Utility functions
├── playwright.config.js          # Playwright configuration
├── package.json
```

---

## ✅ Test Coverage

### 1. EMI Calculation Validation
- Captures loan amount, interest rate, and tenure from UI
- Recalculates EMI using formula
- Compares UI EMI with calculated EMI

### 2. Slider Functionality
- Updates loan values using sliders
- Verifies updated values reflect correctly

### 3. Chart and Table Validation
- Extracts data from Highcharts
- Extracts yearly data from amortization table
- Validates:
  - Principal values
  - Interest values
  - Balance values
  - Total payment consistency
  - Decreasing loan balance over time

### 4. Excel Download Validation
- Downloads amortization schedule Excel file
- Reads file using XLSX library
- Validates:
  - Loan amount
  - Interest rate
  - Loan tenure

---

## 📊 EMI Formula Used

```
EMI = (P × r × (1 + r)^n) / ((1 + r)^n - 1)
```

Where:
- P = Loan amount  
- r = Monthly interest rate  
- n = Number of months  

---

## 🧾 Notes

- Currency values are parsed by removing ₹ and commas
- Minor rounding differences are handled using tolerance
- Table validation filters only yearly rows

---

## 🐛 Troubleshooting

If tests fail:

1. Check site availability:
   https://emicalculator.net/

2. Reinstall browsers:
```bash
npx playwright install
```

3. Run in headed mode:
```bash
npx playwright test --headed
```

---

## 📌 Submission Highlights

This project demonstrates:

- End-to-end automation using Playwright
- Page Object Model (POM)
- UI and data validation
- Chart and table consistency checks
- Excel file validation
- Real-world QA automation scenarios

---

## 📚 References

- https://playwright.dev/
- https://emicalculator.net/