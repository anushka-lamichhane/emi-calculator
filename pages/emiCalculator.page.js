const { expect } = require("@playwright/test");
const XLSX = require("xlsx");

class Calculator {
  constructor(page) {
    this.page = page;
    this.sliders = page.locator(".ui-slider-handle");
    this.sliderTracks = page.locator(".ui-slider");
    this.monthsToggle = page.locator("#loanmonths");
  }

  async visitURL() {
    await this.page.goto("https://emicalculator.net/", {
      waitUntil: "domcontentloaded",
    });

    await expect(
      this.page.locator(
        'h1:has-text("EMI Calculator for Home Loan, Car Loan & Personal Loan in India")'
      )
    ).toBeVisible();
  }

  async moveSlider(index, percentage) {
    const track = this.sliderTracks.nth(index);
    const handle = this.sliders.nth(index);

    await track.waitFor({ state: "visible" });

    const box = await track.boundingBox();
    if (!box) {
      throw new Error(`Slider track not found for index ${index}`);
    }

    const targetX = box.x + box.width * (percentage / 100);
    const centerY = box.y + box.height / 2;

    await handle.hover();
    await this.page.mouse.down();
    await this.page.mouse.move(targetX, centerY, { steps: 15 });
    await this.page.mouse.up();
  }

  async getCapturedEMI() {
    const capturedEMI = await this.page.locator("#emiamount").textContent();
    console.log("capturedEMI:", capturedEMI);

    if (!capturedEMI) {
      throw new Error("Captured EMI is empty");
    }

    const match = capturedEMI.match(/₹\s?[\d,]+/);
    if (!match) {
      throw new Error(`Unable to extract EMI from text: ${capturedEMI}`);
    }

    return match[0];
  }

  async getLoanAmount() {
    const loanAmount = await this.page.locator("#loanamount").inputValue();
    console.log("loan amount:", loanAmount);
    return loanAmount;
  }

  async getInterestRate() {
    const interestRate = await this.page.locator("#loaninterest").inputValue();
    console.log("loan interest rate:", interestRate);
    return interestRate;
  }

  async getLoanTenure() {
    const loanTenure = await this.page.locator("#loanterm").inputValue();
    console.log("loan tenure:", loanTenure);
    return loanTenure;
  }

  async verifyEMICalculation(
    loanAmount,
    interestRate,
    loanTenure,
    capturedUiEMI
  ) {
    const p = Number(String(loanAmount).replace(/,/g, ""));
    const r = parseFloat(interestRate) / (12 * 100);
    const n = parseFloat(loanTenure) * 12;

    const calculatedEMI =
      (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    const uiEmiValue = Number(String(capturedUiEMI).replace(/[₹,]/g, ""));

    expect(Math.round(calculatedEMI)).toBe(uiEmiValue);
  }

  async getChartData() {
    await this.page.waitForSelector("#emibarchart");

    return await this.page.evaluate(() => {
      const chart =
        window.Highcharts && window.Highcharts.charts
          ? window.Highcharts.charts.find((c) => c)
          : null;

      if (!chart) {
        throw new Error("Highcharts chart not found");
      }

      return {
        interest: chart.series[0]?.data?.map((p) => Math.round(p.y)) || [],
        principal: chart.series[1]?.data?.map((p) => Math.round(p.y)) || [],
        balance: chart.series[2]?.data?.map((p) => Math.round(p.y)) || [],
      };
    });
  }

  async getTableData() {
    await this.page.waitForSelector("table tbody tr");

    return await this.page.$$eval("table tbody tr", (rows) =>
      rows
        .map((row) => {
          const cells = row.querySelectorAll("td");

          if (cells.length < 5) return null;

          const yearText = cells[0].innerText.trim();
          const yearMatch = yearText.match(/\b(20\d{2})\b/);

          if (!yearMatch) return null;

          const extractCurrency = (text) => {
            const match = text.match(/[\d,]+/);
            return match ? Number(match[0].replace(/,/g, "")) : null;
          };

          const principal = extractCurrency(cells[1].innerText);
          const interest = extractCurrency(cells[2].innerText);
          const totalPayment = extractCurrency(cells[3].innerText);
          const balance = extractCurrency(cells[4].innerText);

          if (
            principal === null ||
            interest === null ||
            totalPayment === null ||
            balance === null
          ) {
            return null;
          }

          return {
            year: yearMatch[1],
            principal,
            interest,
            totalPayment,
            balance,
          };
        })
        .filter(Boolean)
    );
  }

  async validateChartAndTableYearWise() {
    const chartData = await this.getChartData();
    const tableData = await this.getTableData();

    if (!tableData.length) {
      throw new Error("Table data not found");
    }

    const length = Math.min(chartData.principal.length, tableData.length);

    for (let i = 0; i < length; i++) {
      expect(chartData.principal[i]).toBe(tableData[i].principal);
      expect(chartData.interest[i]).toBe(tableData[i].interest);
      expect(chartData.balance[i]).toBe(tableData[i].balance);

      expect(
        Math.abs(
          tableData[i].principal +
            tableData[i].interest -
            tableData[i].totalPayment
        )
      ).toBeLessThanOrEqual(1);

      if (i > 0) {
        expect(tableData[i].balance).toBeLessThan(tableData[i - 1].balance);
      }
    }

    expect(tableData[tableData.length - 1].balance).toBeLessThanOrEqual(1);
  }

  async downloadAndValidateExcel(expectedLoan, expectedRate, expectedTenure) {
    const downloadButton = this.page.locator(".ecaldownloadexcel").first();

    await downloadButton.scrollIntoViewIfNeeded();
    await expect(downloadButton).toBeVisible();

    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      downloadButton.click(),
    ]);

    const filePath = await download.path();
    expect(filePath).toBeTruthy();

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const loanAmount = sheet["B2"]?.v;
    const interestRate = sheet["B3"]?.v;
    const loanTenure = sheet["B4"]?.v;

    expect(Number(loanAmount)).toBe(
      Number(String(expectedLoan).replace(/,/g, ""))
    );

    expect(Number(interestRate).toFixed(1)).toBe(
      Number(String(expectedRate).replace(/,/g, "")).toFixed(1)
    );

    expect(Number(loanTenure)).toBe(
      Number(String(expectedTenure).replace(/,/g, "")) * 12
    );
  }
}

module.exports = { Calculator };