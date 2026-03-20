# Test Plan

**Project:** EMI Calculator Web Application

---

## 1. Introduction

This document outlines the test strategy for the EMI Calculator web application.

The application allows users to calculate Equated Monthly Installments (EMI) by entering:
- Loan Amount
- Interest Rate
- Loan Tenure

It also provides:
- EMI breakdown (Principal, Interest, Balance)
- Graphical chart representation
- Year-wise amortization table
- Excel download of payment schedule

The purpose of this test plan is to ensure that the application functions correctly, provides accurate calculations, and delivers consistent data across UI components.

---

## 2. Objective

- Validate EMI calculation accuracy using formula-based verification
- Ensure UI elements (inputs, sliders, charts, tables) function correctly
- Verify consistency between chart data and table data
- Validate Excel download functionality and data correctness
- Ensure application handles valid and invalid inputs properly

---

## 3. Scope of Testing

### In Scope
- Functional testing of EMI calculation
- Slider and input field validation
- Chart and table data consistency
- Excel download and validation
- UI visibility and interaction checks

### Out of Scope
- Performance testing
- Security testing
- Cross-browser testing beyond Playwright default configuration

---

## 4. Test Approach

Testing is performed using:
- **Automation Testing** with Playwright (JavaScript)
- Basic **manual validation** for UI behavior

### Key Validations:
- EMI calculation using standard formula
- Principal + Interest = Total Payment validation
- Balance reduces to zero over tenure
- Chart data matches table data
- Excel file data matches UI values

---

## 5. Test Environment

- Tool: Playwright
- Language: JavaScript
- Runtime: Node.js
- OS: macOS / Windows
- Browser: Chromium

---

## 6. Test Data

| Parameter       | Sample Value |
|----------------|-------------|
| Loan Amount    | 10,00,000   |
| Interest Rate  | 12.5%       |
| Loan Tenure    | 15 years    |

---

## 7. Test Deliverables

- Test Plan document
- Test Cases document
- Automated test scripts
- Test Summary Report
- Playwright HTML report

---

## 8. Risks & Assumptions

### Risks
- UI structure changes may break locators
- Chart data depends on external library (Highcharts)

### Assumptions
- Application is stable and accessible
- Excel download functionality is enabled