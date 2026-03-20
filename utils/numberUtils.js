function parseIndianCurrency(value) {
  if (!value) {
    throw new Error(`Invalid currency value received: ${value}`);
  }

  const cleaned = String(value).replace(/[₹,\s]/g, '').trim();
  const parsed = Number(cleaned);

  if (Number.isNaN(parsed)) {
    throw new Error(`Unable to parse currency value: ${value}`);
  }

  return parsed;
}

module.exports = {
  parseIndianCurrency
};