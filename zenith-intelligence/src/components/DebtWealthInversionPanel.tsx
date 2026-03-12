import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ArrowRight,
  BadgeIndianRupee,
  BrainCircuit,
  CalendarClock,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { simulateDebtWealthInversion } from '../utils/debtWealthInversion';

const currencyCompact = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 1,
  notation: 'compact',
});

const currencyFull = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0,
});

const formatCurrencyCompact = (value: number) => `₹${currencyCompact.format(value)}`;
const formatCurrencyFull = (value: number) => `₹${currencyFull.format(Math.round(value))}`;

export const DebtWealthInversionPanel: React.FC = () => {
  const [monthlySurplusAllocation, setMonthlySurplusAllocation] = useState(12000);

  const scenario = useMemo(
    () =>
      simulateDebtWealthInversion({
        initialDebt: 1350000,
        initialWealth: 340000,
        annualDebtRate: 10.2,
        annualWealthReturn: 11.5,
        remainingMonths: 72,
        monthlySurplusAllocation,
        baseMonthlyInvestment: 6500,
      }),
    [monthlySurplusAllocation],
  );

  const acceleratedScenario = useMemo(
    () =>
      simulateDebtWealthInversion({
        initialDebt: 1350000,
        initialWealth: 340000,
        annualDebtRate: 10.2,
        annualWealthReturn: 11.5,
        remainingMonths: 72,
        monthlySurplusAllocation: monthlySurplusAllocation + 5000,
        baseMonthlyInvestment: 6500,
      }),
    [monthlySurplusAllocation],
  );

  const inversionPoint = useMemo(() => {
    if (scenario.inversionMonth === null) {
      return null;
    }

    return scenario.points.find((point) => point.month === scenario.inversionMonth) ?? null;
  }, [scenario.inversionMonth, scenario.points]);

  const interestSavedWithExtra = Math.max(0, scenario.interestPaid - acceleratedScenario.interestPaid);
  const monthsFasterWithExtra = Math.max(
    0,
    (scenario.inversionMonth ?? acceleratedScenario.points.length - 1) -
      (acceleratedScenario.inversionMonth ?? acceleratedScenario.points.length - 1),
  );

  const currentNetWorth = scenario.points[0]?.netWorth ?? 0;
  const latestNetWorth = scenario.points[scenario.points.length - 1]?.netWorth ?? 0;

  return (
    <section className="grid grid-cols-1 2xl:grid-cols-[minmax(0,1.7fr)_20rem] gap-(--space-5)">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="zenith-glass animate-reveal rounded-[1.75rem] p-(--space-6)"
      >
        <div className="flex flex-col gap-(--space-5)">
          <div className="flex flex-col gap-(--space-4) lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="mb-(--space-3) inline-flex items-center gap-2 rounded-full border border-stroke-medium bg-white/3 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--text-tertiary)">
                <CalendarClock size={12} strokeWidth={1.75} className="text-emerald-400" />
                Debt-to-Wealth Inversion Point
              </div>
              <h3 className="text-2xl text-(--text-primary)">Track the exact month your net worth turns positive.</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-(--text-secondary)">
                Zenith OS models the crossover between liability decay and compounding wealth, then surfaces the first month your balance sheet flips from constrained to free.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-(--space-3) lg:min-w-[18rem]">
              <div className="zenith-glass animate-reveal rounded-2xl p-(--space-4)" style={{ animationDelay: '80ms' }}>
                <p className="text-[11px] uppercase tracking-[0.16em] text-(--text-tertiary)">Current Net Worth</p>
                <p className="mt-2 num-tabular text-lg font-bold text-(--text-primary)">{formatCurrencyFull(currentNetWorth)}</p>
              </div>
              <div className="zenith-glass animate-reveal rounded-2xl p-(--space-4)" style={{ animationDelay: '120ms' }}>
                <p className="text-[11px] uppercase tracking-[0.16em] text-(--text-tertiary)">Freedom Month</p>
                <p className="mt-2 text-lg font-bold text-emerald-300 text-glow-accent">{scenario.inversionLabel ?? 'Beyond Horizon'}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-(--space-5) xl:grid-cols-[minmax(0,1fr)_17rem]">
            <div className="rounded-3xl border border-stroke-subtle bg-card/50 p-(--space-5) shadow-[inset_0_1px_0_oklch(100%_0_0/5%)]">
              <div className="mb-(--space-5) flex flex-col gap-(--space-3) lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-(--text-tertiary)">Monthly Surplus Allocation</p>
                  <p className="mt-2 num-tabular text-3xl font-bold text-(--text-primary)">{formatCurrencyFull(monthlySurplusAllocation)}</p>
                </div>
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/8 px-4 py-3 text-right">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-emerald-200/80">Debt Slice</p>
                  <p className="mt-1 num-tabular text-base font-semibold text-emerald-300">
                    {formatCurrencyFull(scenario.monthlyDebtAllocation)} / mo
                  </p>
                </div>
              </div>

              <input
                type="range"
                min="2000"
                max="30000"
                step="500"
                value={monthlySurplusAllocation}
                onChange={(event) => setMonthlySurplusAllocation(Number(event.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-emerald-400"
              />
              <div className="mt-2 flex justify-between text-[11px] text-(--text-tertiary)">
                <span className="num-tabular">₹2,000</span>
                <span className="num-tabular">₹30,000</span>
              </div>

              <div className="mt-(--space-6) h-88 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={scenario.points} margin={{ top: 16, right: 18, left: -10, bottom: 6 }}>
                    <defs>
                      <linearGradient id="debtDecayFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(65% 0.16 22)" stopOpacity={0.22} />
                        <stop offset="95%" stopColor="oklch(65% 0.16 22)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="wealthGrowthFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(72% 0.16 155)" stopOpacity={0.28} />
                        <stop offset="95%" stopColor="oklch(72% 0.16 155)" stopOpacity={0} />
                      </linearGradient>
                    </defs>

                    <CartesianGrid vertical={false} stroke="oklch(100% 0 0 / 6%)" strokeDasharray="4 6" />
                    <XAxis
                      dataKey="label"
                      minTickGap={28}
                      tick={{ fill: 'var(--text-tertiary)', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tickFormatter={(value) => formatCurrencyCompact(Number(value))}
                      tick={{ fill: 'var(--text-tertiary)', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      width={72}
                    />
                    <Tooltip
                      cursor={{ stroke: 'oklch(100% 0 0 / 8%)', strokeWidth: 1 }}
                      contentStyle={{
                        backgroundColor: 'oklch(18% 0.01 220 / 92%)',
                        borderRadius: '18px',
                        border: '1px solid oklch(100% 0 0 / 8%)',
                        boxShadow: 'inset 0 1px 0 oklch(100% 0 0 / 5%)',
                      }}
                      labelStyle={{ color: 'var(--text-primary)', fontSize: 12 }}
                      itemStyle={{ color: 'var(--text-secondary)', fontSize: 12 }}
                      formatter={(value: unknown, name: string) => [formatCurrencyFull(Number(value)), name === 'debt' ? 'Debt Decay' : 'Wealth Growth']}
                    />
                    {inversionPoint && (
                      <>
                        <ReferenceLine x={inversionPoint.label} stroke="oklch(72% 0.16 155 / 22%)" strokeWidth={10} ifOverflow="extendDomain" />
                        <ReferenceLine x={inversionPoint.label} stroke="oklch(72% 0.16 155)" strokeWidth={2} ifOverflow="extendDomain" />
                        <ReferenceDot
                          x={inversionPoint.label}
                          y={inversionPoint.wealth}
                          r={6}
                          fill="oklch(72% 0.16 155)"
                          stroke="oklch(98% 0 0)"
                          strokeWidth={2}
                        />
                      </>
                    )}
                    <Area
                      type="monotone"
                      dataKey="debt"
                      name="debt"
                      stroke="oklch(66% 0.15 24)"
                      strokeWidth={2.2}
                      fill="url(#debtDecayFill)"
                    />
                    <Area
                      type="monotone"
                      dataKey="wealth"
                      name="wealth"
                      stroke="oklch(72% 0.16 155)"
                      strokeWidth={2.2}
                      fill="url(#wealthGrowthFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
                className="zenith-glass animate-reveal rounded-2xl p-(--space-5)"
              >
                <div className="flex items-center gap-2 text-emerald-300">
                  <Sparkles size={14} strokeWidth={1.75} />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">AI Insight</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-(--text-secondary)">
                  Adding an extra <span className="num-tabular text-(--text-primary)">₹5,000</span> to surplus allocation saves approximately{' '}
                  <span className="num-tabular text-emerald-300">{formatCurrencyFull(interestSavedWithExtra)}</span> in lifetime interest and brings freedom forward by{' '}
                  <span className="num-tabular text-emerald-300">{monthsFasterWithExtra} months</span>.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.12, ease: 'easeOut' }}
                className="zenith-glass animate-reveal rounded-2xl p-(--space-5)"
              >
                <div className="grid grid-cols-2 gap-(--space-3)">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-(--text-tertiary)">Debt-Free</p>
                    <p className="mt-2 text-lg font-bold text-(--text-primary)">
                      {scenario.monthsToDebtFree === null ? 'TBD' : `${scenario.monthsToDebtFree} mo`}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-(--text-tertiary)">120M Net Worth</p>
                    <p className="mt-2 num-tabular text-lg font-bold text-(--text-primary)">{formatCurrencyCompact(latestNetWorth)}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-(--text-tertiary)">Wealth Engine</p>
                    <p className="mt-2 num-tabular text-sm font-semibold text-emerald-300">
                      {formatCurrencyFull(scenario.monthlyWealthAllocation)} / mo
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-(--text-tertiary)">EMI Base</p>
                    <p className="mt-2 num-tabular text-sm font-semibold text-(--text-primary)">{formatCurrencyFull(scenario.monthlyEmi)}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.16, ease: 'easeOut' }}
                className="zenith-glass animate-reveal rounded-2xl p-(--space-5)"
              >
                <div className="mb-(--space-4) flex items-center gap-2">
                  <BadgeIndianRupee size={16} strokeWidth={1.75} className="text-emerald-300" />
                  <div>
                    <p className="text-sm font-semibold text-(--text-primary)">Action Hub</p>
                    <p className="text-xs text-(--text-tertiary)">Convert lower-rate debt faster and free monthly cashflow.</p>
                  </div>
                </div>

                <button className="group w-full rounded-2xl bg-linear-to-tr from-emerald-400 via-emerald-500 to-teal-300 px-4 py-3 text-sm font-bold text-slate-950 shadow-[0_0_30px_oklch(72%_0.16_155/18%)] transition-transform duration-300 hover:-translate-y-0.5">
                  <span className="inline-flex items-center justify-center gap-2 text-glow-accent">
                    One-Tap Refinance
                    <ArrowRight size={15} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </button>

                <div className="mt-(--space-4) space-y-2 text-xs text-(--text-secondary)">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5"><TrendingDown size={13} strokeWidth={1.75} className="text-rose-300" /> Refinancing target</span>
                    <span className="num-tabular text-(--text-primary)">8.3% APR</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5"><TrendingUp size={13} strokeWidth={1.75} className="text-emerald-300" /> Monthly uplift</span>
                    <span className="num-tabular text-emerald-300">+₹4,200</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5"><BrainCircuit size={13} strokeWidth={1.75} className="text-sky-300" /> Reinvestment route</span>
                    <span className="text-(--text-primary)">Hybrid growth sleeve</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};