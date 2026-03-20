# Test Cases – EMI Calculator

## 1. Functional Testing

### TC_FUNC_001 – Verify EMI updates when Home Loan Amount changes
**Steps:**
1. Open EMI Calculator page.
2. Move Home Loan Amount slider.
3. Observe EMI.

**Expected Result:**
EMI updates automatically based on the new loan amount.

---

### TC_FUNC_002 – Verify EMI updates when Interest Rate changes
**Steps:**
1. Change Interest Rate using slider.
2. Observe EMI.

**Expected Result:**
EMI updates correctly.

---

### TC_FUNC_003 – Verify EMI updates when Loan Tenure changes
**Steps:**
1. Change Loan Tenure using slider.
2. Observe EMI.

**Expected Result:**
EMI updates correctly.

---

### TC_FUNC_004 – Validate EMI using formula calculation
**Steps:**
1. Enter Loan Amount.
2. Enter Interest Rate.
3. Enter Loan Tenure.
4. Calculate EMI manually.
5. Compare with UI EMI.

**Expected Result:**
UI EMI matches the calculated EMI.

---

### TC_FUNC_005 – Verify Total Interest updates correctly
**Steps:**
1. Enter valid loan details.
2. Observe Total Interest.

**Expected Result:**
Total Interest updates correctly.

---

### TC_FUNC_006 – Verify Total Payment equals Principal + Interest
**Steps:**
1. Enter valid loan details.
2. Observe Total Payment.

**Expected Result:**
Total Payment equals Loan Amount + Total Interest.

---

## 2. Input Validation Testing

### TC_INPUT_001 – Verify minimum loan amount handling
**Steps:**
1. Enter minimum loan amount.
2. Observe EMI.

**Expected Result:**
EMI calculates correctly.

---

### TC_INPUT_002 – Verify maximum loan amount handling
**Steps:**
1. Enter maximum loan amount.
2. Observe EMI.

**Expected Result:**
EMI calculates correctly.

---

### TC_INPUT_003 – Verify invalid interest rate input
**Steps:**
1. Enter invalid interest rate.
2. Observe behavior.

**Expected Result:**
Proper validation or error handling is shown.

---

### TC_INPUT_004 – Verify negative values are not accepted
**Steps:**
1. Enter negative values.
2. Observe system response.

**Expected Result:**
System prevents invalid input.

---

### TC_INPUT_005 – Verify decimal input handling
**Steps:**
1. Enter decimal values.
2. Observe EMI.

**Expected Result:**
EMI calculates correctly.

---

## 3. UI Validation Testing

### TC_UI_001 – Verify EMI display is visible
**Steps:**
1. Open application.
2. Observe EMI section.

**Expected Result:**
EMI is displayed properly.

---

### TC_UI_002 – Verify chart is displayed
**Steps:**
1. Enter loan details.
2. Observe chart.

**Expected Result:**
Chart is visible.

---

### TC_UI_003 – Verify table is displayed
**Steps:**
1. Enter loan details.
2. Observe table.

**Expected Result:**
Table is visible.

---

### TC_UI_004 – Verify sliders are functional
**Steps:**
1. Move sliders.
2. Observe values.

**Expected Result:**
Values update correctly.

---

## 4. Chart Validation Testing

### TC_CHART_001 – Verify chart updates when inputs change
**Steps:**
1. Change loan amount.
2. Observe chart.

**Expected Result:**
Chart updates dynamically.

---

### TC_CHART_002 – Verify chart principal matches table principal
**Steps:**
1. Enter loan details.
2. Compare chart and table.

**Expected Result:**
Values match.

---

### TC_CHART_003 – Verify chart interest matches table interest
**Steps:**
1. Enter loan details.
2. Compare chart and table.

**Expected Result:**
Values match.

---

### TC_CHART_004 – Verify chart balance reduces correctly
**Steps:**
1. Enter loan details.
2. Observe balance line.

**Expected Result:**
Balance decreases to zero.

---

## 5. Excel Download Testing

### TC_EXCEL_001 – Verify Excel file downloads successfully
**Steps:**
1. Enter loan details.
2. Click Download Excel.

**Expected Result:**
Excel file downloads successfully.

---

### TC_EXCEL_002 – Verify loan amount in Excel matches UI
**Steps:**
1. Open Excel file.
2. Check loan amount.

**Expected Result:**
Loan amount matches UI.

---

### TC_EXCEL_003 – Verify interest rate in Excel matches UI
**Steps:**
1. Open Excel file.
2. Check interest rate.

**Expected Result:**
Interest rate matches UI.

---

### TC_EXCEL_004 – Verify loan tenure in Excel matches UI
**Steps:**
1. Open Excel file.
2. Check tenure.

**Expected Result:**
Loan tenure matches UI.

---

### TC_EXCEL_005 – Verify Excel contains payment schedule data
**Steps:**
1. Open Excel file.
2. Check payment table.

**Expected Result:**
Excel contains correct yearly payment data.