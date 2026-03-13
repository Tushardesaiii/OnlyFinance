/**
 * Calculates the Equated Monthly Installment (EMI) for a given loan.
 * EMI = [P x R x (1+R)^N] / [(1+R)^N-1]
 * P = Principal loan amount
 * R = Monthly interest rate (Annual Rate / 12 / 100)
 * N = Loan tenure in months
 */
export const calculateEMI = (principal: number, annualRate: number, months: number): number => {
  if (principal <= 0 || annualRate <= 0 || months <= 0) return 0;
  
  const monthlyRate = annualRate / 12 / 100;
  const factor = Math.pow(1 + monthlyRate, months);
  
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  return emi;
};

/**
 * Simulates a debt snowball payoff over time given a monthly extra payment.
 * Returns an array of remaining balances per month.
 */
export const simulateDebtSnowball = (
  principal: number,
  annualRate: number,
  minimumPayment: number,
  extraPayment: number
): { month: number; balance: number }[] => {
  if (principal <= 0) return [];

  const monthlyRate = annualRate / 12 / 100;
  let balance = principal;
  let month = 0;
  const data = [{ month, balance }];

  const totalMonthlyPayment = minimumPayment + extraPayment;

  // Safeguard against infinite loops (if payment is less than interest)
  if (totalMonthlyPayment <= balance * monthlyRate) {
    // Cannot pay off debt
    return [{ month: 0, balance: principal }];
  }

  while (balance > 0 && month < 360) { // Max 30 years
    month++;
    const interest = balance * monthlyRate;
    balance += interest;
    balance -= totalMonthlyPayment;
    
    if (balance < 0) balance = 0;
    
    data.push({ month, balance });
  }

  return data;
};
