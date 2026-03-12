import { calculateEMI } from './DebtCalculators';

export interface DebtWealthScenarioInput {
  initialDebt: number;
  initialWealth: number;
  annualDebtRate: number;
  annualWealthReturn: number;
  remainingMonths: number;
  monthlySurplusAllocation: number;
  baseMonthlyInvestment: number;
  debtAllocationRatio?: number;
  horizonMonths?: number;
  startDate?: Date;
}

export interface DebtWealthPoint {
  month: number;
  label: string;
  debt: number;
  wealth: number;
  netWorth: number;
}

export interface DebtWealthScenarioResult {
  points: DebtWealthPoint[];
  monthlyEmi: number;
  monthlyDebtAllocation: number;
  monthlyWealthAllocation: number;
  interestPaid: number;
  totalContributedToWealth: number;
  inversionMonth: number | null;
  inversionLabel: string | null;
  monthsToDebtFree: number | null;
}

const formatMonthLabel = (startDate: Date, monthOffset: number) => {
  const date = new Date(startDate.getFullYear(), startDate.getMonth() + monthOffset, 1);

  return date.toLocaleDateString('en-IN', {
    month: 'short',
    year: '2-digit',
  });
};

export const simulateDebtWealthInversion = (
  input: DebtWealthScenarioInput,
): DebtWealthScenarioResult => {
  const {
    initialDebt,
    initialWealth,
    annualDebtRate,
    annualWealthReturn,
    remainingMonths,
    monthlySurplusAllocation,
    baseMonthlyInvestment,
    debtAllocationRatio = 0.68,
    horizonMonths = 120,
    startDate = new Date(),
  } = input;

  const monthlyDebtRate = annualDebtRate / 12 / 100;
  const monthlyWealthRate = annualWealthReturn / 12 / 100;
  const monthlyEmi = calculateEMI(initialDebt, annualDebtRate, remainingMonths);
  const monthlyDebtAllocation = monthlySurplusAllocation * debtAllocationRatio;
  const monthlyWealthAllocation = monthlySurplusAllocation - monthlyDebtAllocation + baseMonthlyInvestment;

  let debt = initialDebt;
  let wealth = initialWealth;
  let interestPaid = 0;
  let totalContributedToWealth = 0;
  let inversionMonth: number | null = initialWealth >= initialDebt ? 0 : null;
  let monthsToDebtFree: number | null = null;

  const points: DebtWealthPoint[] = [
    {
      month: 0,
      label: formatMonthLabel(startDate, 0),
      debt,
      wealth,
      netWorth: wealth - debt,
    },
  ];

  for (let month = 1; month <= horizonMonths; month++) {
    const scheduledPayment = debt > 0 ? monthlyEmi + monthlyDebtAllocation : 0;
    const monthlyInterest = debt > 0 ? debt * monthlyDebtRate : 0;

    interestPaid += monthlyInterest;

    let debtAfterInterest = debt + monthlyInterest;
    let paymentAppliedToDebt = 0;

    if (debtAfterInterest > 0) {
      paymentAppliedToDebt = Math.min(debtAfterInterest, scheduledPayment);
      debtAfterInterest -= paymentAppliedToDebt;
    }

    if (monthsToDebtFree === null && debtAfterInterest <= 0) {
      monthsToDebtFree = month;
    }

    const freedCashflow = debtAfterInterest <= 0 ? monthlyEmi + monthlyDebtAllocation - paymentAppliedToDebt : 0;
    const wealthContribution = monthlyWealthAllocation + Math.max(0, freedCashflow);

    totalContributedToWealth += wealthContribution;
    wealth = wealth * (1 + monthlyWealthRate) + wealthContribution;
    debt = Math.max(0, debtAfterInterest);

    const netWorth = wealth - debt;

    if (inversionMonth === null && netWorth >= 0) {
      inversionMonth = month;
    }

    points.push({
      month,
      label: formatMonthLabel(startDate, month),
      debt,
      wealth,
      netWorth,
    });
  }

  return {
    points,
    monthlyEmi,
    monthlyDebtAllocation,
    monthlyWealthAllocation,
    interestPaid,
    totalContributedToWealth,
    inversionMonth,
    inversionLabel: inversionMonth === null ? null : formatMonthLabel(startDate, inversionMonth),
    monthsToDebtFree,
  };
};