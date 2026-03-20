# Test Cases – EMI Calculator

## 1. Functional Testing

| Test Case ID | Test Case | Steps | Expected Result |
|-------------|----------|-------|----------------|
| TC_FUNC_001 | Verify EMI updates when Home Loan Amount changes | - Open EMI Calculator page  
- Move Home Loan Amount slider  
- Observe EMI | EMI updates automatically based on new loan amount |
| TC_FUNC_002 | Verify EMI updates when Interest Rate changes | - Change Interest Rate using slider  
- Observe EMI | EMI updates correctly |
| TC_FUNC_003 | Verify EMI updates when Loan Tenure changes | - Change Loan Tenure using slider  
- Observe EMI | EMI updates correctly |
| TC_FUNC_004 | Validate EMI using formula calculation | - Enter Loan Amount  
- Enter Interest Rate  
- Enter Loan Tenure  
- Calculate EMI manually  
- Compare with UI EMI | UI EMI matches calculated EMI |
| TC_FUNC_005 | Verify Total Interest updates correctly | - Enter valid loan details  
- Observe Total Interest | Total Interest updates correctly |
| TC_FUNC_006 | Verify Total Payment equals Principal + Interest | - Enter valid loan details  
- Observe Total Payment | Total Payment equals Loan Amount + Total Interest |

---

## 2. Input Validation Testing

| Test Case ID | Test Case | Steps | Expected Result |
|-------------|----------|-------|----------------|
| TC_INPUT_001 | Verify minimum loan amount handling | - Enter minimum loan amount  
- Observe EMI | EMI calculates correctly |
| TC_INPUT_002 | Verify maximum loan amount handling | - Enter maximum loan amount  
- Observe EMI | EMI calculates correctly |
| TC_INPUT_003 | Verify invalid interest rate input | - Enter invalid interest rate  
- Observe behavior | Proper validation or error handling |
| TC_INPUT_004 | Verify negative values are not accepted | - Enter negative values  
- Observe system response | System prevents invalid input |
| TC_INPUT_005 | Verify decimal input handling | - Enter decimal values  
- Observe EMI | EMI calculates correctly |

---

## 3. UI Validation Testing

| Test Case ID | Test Case | Steps | Expected Result |
|-------------|----------|-------|----------------|
| TC_UI_001 | Verify EMI display is visible | - Open application  
- Observe EMI section | EMI is displayed properly |
| TC_UI_002 | Verify chart is displayed | - Enter loan details  
- Observe chart | Chart is visible |
| TC_UI_003 | Verify table is displayed | - Enter loan details  
- Observe table | Table is visible |
| TC_UI_004 | Verify sliders are functional | - Move sliders  
- Observe values | Values update correctly |

---

## 4. Chart Validation Testing

| Test Case ID | Test Case | Steps | Expected Result |
|-------------|----------|-------|----------------|
| TC_CHART_001 | Verify chart updates when inputs change | - Change loan amount  
- Observe chart | Chart updates dynamically |
| TC_CHART_002 | Verify chart principal matches table principal | - Enter loan details  
- Compare chart and table | Values match |
| TC_CHART_003 | Verify chart interest matches table interest | - Enter loan details  
- Compare chart and table | Values match |
| TC_CHART_004 | Verify chart balance reduces correctly | - Enter loan details  
- Observe balance line | Balance decreases to zero |

---

## 5. Excel Download Testing

| Test Case ID | Test Case | Steps | Expected Result |
|-------------|----------|-------|----------------|
| TC_EXCEL_001 | Verify Excel file downloads successfully | - Enter loan details  
- Click Download Excel | Excel file downloads successfully |
| TC_EXCEL_002 | Verify loan amount in Excel matches UI | - Open Excel file  
- Check loan amount | Loan amount matches UI |
| TC_EXCEL_003 | Verify interest rate in Excel matches UI | - Open Excel file  
- Check interest rate | Interest rate matches UI |
| TC_EXCEL_004 | Verify loan tenure in Excel matches UI | - Open Excel file  
- Check tenure | Loan tenure matches UI |
| TC_EXCEL_005 | Verify Excel contains payment schedule data | - Open Excel file  
- Check payment table | Excel contains correct yearly payment data |