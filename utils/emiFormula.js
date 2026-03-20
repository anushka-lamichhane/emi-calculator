function calculateEmi(principal, annualInterestRate, tenureInMonths) {
  const monthlyRate = annualInterestRate / 12 / 100;

  if (tenureInMonths <= 0) {
    throw new Error('Tenure must be greater than 0');
  }

  if (monthlyRate === 0) {
    return principal / tenureInMonths;
  }

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths)) /
    (Math.pow(1 + monthlyRate, tenureInMonths) - 1);

  return emi;
}

module.exports = {
  calculateEmi
};