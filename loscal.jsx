export function calculateEMI(principal, annualRate, tenureMonths) {
  if (!principal || !annualRate || !tenureMonths) return 0;
  const monthlyRate = annualRate / 12 / 100;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return Math.round(emi);
}
export function calculateLoanCharges(principal, feePercent = 2) {
  const processingFee = Math.round((principal * feePercent) / 100);
  const gstOnFee = Math.round(processingFee * 0.18); // 18% GST in force
  const totalDeductions = processingFee + gstOnFee;
  const netDisbursal = principal - totalDeductions;

  return {
    processingFee,
    gstOnFee,
    totalDeductions,
    netDisbursal,
  };
}

export function formatINR(val) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val || 0);
}

export function calculateRatios(grossIncome, netIncome, existingEMI, newEMI) {
  const totalObligations = (existingEMI || 0) + (newEMI || 0);
  const foir = netIncome > 0 ? ((totalObligations / netIncome) * 100).toFixed(1) : 0;
  const dti = grossIncome > 0 ? ((totalObligations / grossIncome) * 100).toFixed(1) : 0;

  return {
    foir: parseFloat(foir),
    dti: parseFloat(dti),
    isFoirEligible: parseFloat(foir) <= 50, // 50% benchmark
  };
}