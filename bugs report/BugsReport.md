# Bug Reports – EMI Calculator

## BUG_001 – Home Loan Amount slider includes 0 as a selectable value

**Severity:** Medium  
**Priority:** Medium  

**Description:**  
The Home Loan Amount slider shows 0 as a selectable value. A loan amount of 0 is not a meaningful business input for EMI calculation.

**Steps to Reproduce:**  
1. Open the EMI Calculator page  
2. Observe the Home Loan Amount slider scale  
3. Check the minimum displayed value  

**Actual Result:**  
Slider scale includes 0.

**Expected Result:**  
Minimum loan amount should start from a valid supported value greater than 0.

---

## BUG_002 – Loan Tenure slider includes 0 as a selectable value

**Severity:** Medium  
**Priority:** Medium  

**Description:**  
The Loan Tenure slider shows 0 as a selectable value. A loan tenure of 0 is not a valid business scenario for EMI calculation.

**Steps to Reproduce:**  
1. Open the EMI Calculator page  
2. Observe the Loan Tenure slider scale  
3. Check the minimum displayed value  

**Actual Result:**  
Slider scale includes 0.

**Expected Result:**  
Minimum tenure should start from a valid supported value greater than 0.

---

## BUG_003 – Footer copyright year appears outdated

**Severity:** Low  
**Priority:** Low  

**Description:**  
The footer copyright year is outdated compared to the current year/content on the page.

**Steps to Reproduce:**  
1. Open the EMI Calculator page  
2. Scroll to the footer  
3. Observe the copyright year  

**Actual Result:**  
Footer shows an outdated year.

**Expected Result:**  
Footer should show the current year.