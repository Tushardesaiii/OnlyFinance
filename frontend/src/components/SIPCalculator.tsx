import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const SIPCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  const calculateSIP = () => {
    const data = [];
    const monthlyRate = expectedReturn / 12 / 100;
    const months = timePeriod * 12;
    let investedValue = 0;
    let totalValue = 0;

    for (let i = 1; i <= months; i++) {
      investedValue += monthlyInvestment;
      totalValue = (totalValue + monthlyInvestment) * (1 + monthlyRate);
      
      // Keep data manageable for the chart (yearly or every 6 months depending on duration)
      if (i % 12 === 0) {
        data.push({
          year: i / 12,
          invested: Math.round(investedValue),
          wealth: Math.round(totalValue)
        });
      }
    }
    return { data, totalWealth: totalValue, totalInvested: investedValue };
  };

  const { data, totalWealth, totalInvested } = calculateSIP();
  const estimatedReturns = totalWealth - totalInvested;

  const formatCurrency = (val: number) => `₹${Math.round(val).toLocaleString('en-IN')}`;

  return (
    <div className="ultra-glass p-4 rounded-2xl mt-4">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-base font-bold text-(--text-primary) mb-1 tracking-wide">SIP Growth Estimator</h3>
          <p className="text-xs text-(--text-tertiary)">Project your wealth over time with systematic investments.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div>
            <label className="flex justify-between text-xs text-(--text-secondary) mb-2">
              <span>Monthly Investment</span>
              <span className="font-mono font-bold text-emerald-400">{formatCurrency(monthlyInvestment)}</span>
            </label>
            <input 
              type="range" 
              min="500" 
              max="100000" 
              step="500"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="flex justify-between text-xs text-(--text-secondary) mb-2">
              <span>Expected Return Rate (p.a)</span>
              <span className="font-mono font-bold text-emerald-400">{expectedReturn}%</span>
            </label>
            <input 
              type="range" 
              min="1" 
              max="30" 
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="flex justify-between text-xs text-(--text-secondary) mb-2">
              <span>Time Period (Years)</span>
              <span className="font-mono font-bold text-emerald-400">{timePeriod} Yr</span>
            </label>
            <input 
              type="range" 
              min="1" 
              max="40" 
              step="1"
              value={timePeriod}
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-xs text-(--text-tertiary) uppercase tracking-wider mb-1">Total Invested</p>
              <p className="text-lg font-bold text-(--text-primary) font-mono">{formatCurrency(totalInvested)}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-xs text-emerald-400 uppercase tracking-wider mb-1">Est. Returns</p>
              <p className="text-lg font-bold text-emerald-400 font-mono">{formatCurrency(estimatedReturns)}</p>
            </div>
          </div>
          <div className="bg-emerald-900/30 p-5 rounded-2xl border border-emerald-500/30">
             <p className="text-xs text-emerald-200 uppercase tracking-wider mb-1">Total Value</p>
             <p className="text-3xl font-bold text-(--text-primary) emerald-glow-text font-mono">
               {formatCurrency(totalWealth)}
             </p>
          </div>
        </div>
      </div>

      <div className="h-48 w-full mt-8">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="year" stroke="rgba(255,255,255,0.2)" fontSize={10} tickFormatter={(val) => `Y${val}`} />
            <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} tickFormatter={(val) => `₹${(val/100000).toFixed(1)}L`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#151b23', borderRadius: '8px', border: '1px solid #2a3442' }}
              itemStyle={{ fontFamily: 'var(--font-mono)' }}
              labelStyle={{ color: '#94a3b8' }}
              formatter={(value: any, name: any) => [`₹${Math.round(value as number).toLocaleString('en-IN')}`, name === 'wealth' ? 'Total Value' : 'Invested']}
              labelFormatter={(label) => `Year ${label}`}
            />
            <Area type="monotone" dataKey="invested" stroke="#94a3b8" strokeWidth={2} fillOpacity={1} fill="url(#colorInvested)" />
            <Area type="monotone" dataKey="wealth" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorWealth)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};




