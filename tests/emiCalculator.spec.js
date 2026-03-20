const { test } = require("@playwright/test");
const { Calculator } = require("../pages/emiCalculator.page");

test.describe("EMI Calculator Test", () => {
  test.beforeEach(
    "should update home loan amount, interest rate and loan tenure using slider",
    async ({ page }) => {
      const calculatorPage = new Calculator(page);
      await calculatorPage.visitURL();

      await calculatorPage.moveSlider(0, 50); // Home Loan Amount
      await calculatorPage.moveSlider(1, 50); // Interest Rate
      await calculatorPage.moveSlider(2, 50); // Loan Tenure
    }
  );

  test("should validate EMI using formula-based recalculation", async ({ page }) => {
    const calculatorPage = new Calculator(page);

    const loanAmount = await calculatorPage.getLoanAmount();
    const interestRate = await calculatorPage.getInterestRate();
    const loanTenure = await calculatorPage.getLoanTenure();
    const capturedUiEMI = await calculatorPage.getCapturedEMI();

    await calculatorPage.verifyEMICalculation(
      loanAmount,
      interestRate,
      loanTenure,
      capturedUiEMI
    );
  });

  test("should validate chart and table year-wise consistency", async ({ page }) => {
    const calculatorPage = new Calculator(page);
    await calculatorPage.validateChartAndTableYearWise();
  });

  test("should download excel file and add checks", async ({ page }) => {
    const calculatorPage = new Calculator(page);

    const loanAmount = await calculatorPage.getLoanAmount();
    const interestRate = await calculatorPage.getInterestRate();
    const loanTenure = await calculatorPage.getLoanTenure();

    await calculatorPage.downloadAndValidateExcel(
      loanAmount,
      interestRate,
      loanTenure
    );
  });
});