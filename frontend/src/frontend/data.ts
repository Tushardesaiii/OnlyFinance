export type OpportunityPriority = 'High' | 'Medium' | 'Low';
export type OpportunityIcon = 'trending-up' | 'zap' | 'shield-check';

export interface OpportunityAction {
  item: string;
  impact: string;
  priority: OpportunityPriority;
  icon: OpportunityIcon;
  color: string;
}

export interface WealthSummary {
  netWorth: number;
  trend: number;
  assets: {
    equity: number;
    fixedDeposits: number;
    activeDebt: number;
  };
}

export interface Liability {
  principal: number;
  annualRate: number;
  remainingMonths: number;
}

export interface MarketIndexPoint {
  time: string;
  nifty: number;
  sensex: number;
}

export interface GlobalIndex {
  name: string;
  value: string;
  change: string;
  up: boolean;
}

export interface MarketNewsItem {
  source: string;
  time: string;
  title: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export const opportunityQueue: OpportunityAction[] = [
  {
    item: 'Shift idle cash to Arbitrage Fund',
    impact: '+0.6% annual yield',
    priority: 'High',
    icon: 'trending-up',
    color: 'text-emerald-400',
  },
  {
    item: 'Increase SIP by INR 2,000',
    impact: 'Goal ETA -22 months',
    priority: 'Medium',
    icon: 'zap',
    color: 'text-sky-400',
  },
  {
    item: 'Prepay high-rate debt tranche',
    impact: 'Interest save INR 31,200',
    priority: 'High',
    icon: 'shield-check',
    color: 'text-emerald-400',
  },
];

export const wealthSummaryData: WealthSummary = {
  netWorth: 4250000,
  trend: 12.4,
  assets: {
    equity: 2500000,
    fixedDeposits: 1000000,
    activeDebt: 750000,
  },
};

export const debtLiabilitiesData: Liability[] = [
  { principal: 750000, annualRate: 10.5, remainingMonths: 60 },
];

export const marketIndexData: MarketIndexPoint[] = [
  { time: '9:00', nifty: 22005, sensex: 71980 },
  { time: '9:15', nifty: 22042, sensex: 72090 },
  { time: '9:30', nifty: 22010, sensex: 72010 },
  { time: '9:45', nifty: 22055, sensex: 72120 },
  { time: '10:00', nifty: 22096, sensex: 72210 },
  { time: '10:15', nifty: 22125, sensex: 72295 },
  { time: '10:30', nifty: 22110, sensex: 72240 },
  { time: '10:45', nifty: 22134, sensex: 72310 },
  { time: '11:00', nifty: 22180, sensex: 72420 },
  { time: '11:15', nifty: 22163, sensex: 72380 },
  { time: '11:30', nifty: 22195, sensex: 72455 },
  { time: '11:45', nifty: 22220, sensex: 72505 },
  { time: '12:00', nifty: 22205, sensex: 72470 },
  { time: '12:15', nifty: 22232, sensex: 72560 },
  { time: '12:30', nifty: 22210, sensex: 72520 },
  { time: '12:45', nifty: 22228, sensex: 72595 },
  { time: '13:00', nifty: 22240, sensex: 72630 },
  { time: '13:15', nifty: 22218, sensex: 72580 },
  { time: '13:30', nifty: 22246, sensex: 72655 },
  { time: '13:45', nifty: 22268, sensex: 72710 },
];

export const globalIndicesData: GlobalIndex[] = [
  { name: 'S&P 500', value: '5,088.80', change: '+1.2%', up: true },
  { name: 'NASDAQ', value: '15,996.82', change: '+1.5%', up: true },
  { name: 'FTSE 100', value: '7,727.42', change: '-0.3%', up: false },
  { name: 'Nikkei 225', value: '39,098.68', change: '+2.1%', up: true },
];

export const marketNewsData: MarketNewsItem[] = [
  {
    source: 'Reuters',
    time: '10m ago',
    title: 'RBI maintains status quo on repo rate at 6.5%, maintains withdrawal of accommodation stance.',
    sentiment: 'neutral',
  },
  {
    source: 'Bloomberg',
    time: '1h ago',
    title: 'Indian IT sector expects a bounce back in second half of the fiscal amid global tech spending revival.',
    sentiment: 'positive',
  },
  {
    source: 'Mint',
    time: '2h ago',
    title: 'FIIs turn net buyers after 3 days of heavy selling in the cash market segment.',
    sentiment: 'positive',
  },
];
