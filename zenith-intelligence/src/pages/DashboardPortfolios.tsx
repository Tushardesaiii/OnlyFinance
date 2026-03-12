import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Wallet, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

export const DashboardPortfolios: React.FC = () => {
  const assetAllocation = [
    { name: 'Equity MFs', value: 2500000, color: 'oklch(0.7 0.14 155)' },
    { name: 'Fixed Deposits', value: 1000000, color: 'oklch(0.7 0.12 230)' },
    { name: 'Sovereign Gold', value: 300000, color: 'oklch(0.69 0.13 90)' },
    { name: 'Stocks', value: 450000, color: 'oklch(0.7 0.11 300)' },
  ];

  const monthlyPerformance = [
    { month: 'Jan', return: 2.1 },
    { month: 'Feb', return: 1.5 },
    { month: 'Mar', return: -0.8 },
    { month: 'Apr', return: 3.2 },
    { month: 'May', return: 2.8 },
    { month: 'Jun', return: 4.1 },
  ];

  const formatCurrency = (val: number) => `₹${(val / 100000).toFixed(1)}L`;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
      <div className="flex justify-between items-end">
         <div>
            <h2 className="text-2xl font-bold text-(--text-primary) tracking-wide">Investment Portfolios</h2>
            <p className="text-sm text-(--text-secondary) mt-1">Track allocation, performance, and position-level concentration risk.</p>
         </div>
         <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-lg text-xs font-bold transition-colors">
            + New Investment
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="ultra-glass p-4 rounded-2xl lg:col-span-1 flex flex-col justify-between relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-emerald-500/20 transition-colors" />
          <div>
            <div className="flex items-center gap-2 text-emerald-400 mb-4">
               <Wallet size={18} strokeWidth={1.75} /> <span className="text-xs font-bold tracking-wider">TOTAL AUM</span>
            </div>
            <h3 className="text-3xl font-extrabold text-(--text-primary) font-mono mb-2">₹42.50L</h3>
            <div className="inline-flex items-center text-xs font-medium text-emerald-400 bg-emerald-900/35 px-2 py-1 rounded border border-emerald-500/25">
               <ArrowUpRight size={13} strokeWidth={1.75} className="mr-1"/> +12.4% XIRR
            </div>
          </div>
          
          <div className="mt-5">
            <p className="text-xs text-(--text-tertiary) mb-3 font-mono">ASSET ALLOCATION</p>
            <div className="h-36 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={assetAllocation} cx="50%" cy="50%" innerRadius={36} outerRadius={56} paddingAngle={4} dataKey="value" stroke="none">
                    {assetAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                     contentStyle={{ backgroundColor: '#151b23', borderRadius: '8px', border: '1px solid #2a3442' }}
                     itemStyle={{ fontFamily: 'var(--font-mono)' }}
                     formatter={(value: any) => formatCurrency(value)}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-xs text-(--text-tertiary)">Equity Weight</span>
                 <span className="text-sm font-bold text-(--text-primary)">68%</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="ultra-glass p-4 rounded-2xl lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-(--text-primary) tracking-wide">Performance History</h3>
            <div className="flex gap-2">
               {['1M', '6M', '1Y', 'ALL'].map(t => (
                 <button key={t} className={`text-xs px-2.5 py-1 rounded-md ${t === '6M' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-(--text-tertiary) hover:text-(--text-primary)'}`}>
                   {t}
                 </button>
               ))}
            </div>
          </div>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" vertical={false} />
                <XAxis dataKey="month" stroke="rgba(220,228,236,0.55)" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="rgba(220,228,236,0.55)" fontSize={10} tickFormatter={(val) => `${val}%`} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#151b23', borderRadius: '8px', border: '1px solid #2a3442' }}
                  itemStyle={{ fontFamily: 'var(--font-mono)', color: '#10B981' }}
                  formatter={(value: any) => [`${value}%`, 'Return']}
                />
                <Bar dataKey="return" radius={[4, 4, 4, 4]}>
                  {monthlyPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.return > 0 ? '#34d399' : '#ef4444'} fillOpacity={0.82} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="ultra-glass p-4 rounded-2xl">
         <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-(--text-primary) tracking-wide">Top Holdings</h3>
            <button className="text-xs text-emerald-300 hover:text-emerald-200">Export</button>
         </div>
         <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left min-w-[40rem]">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-(--text-tertiary) border-b border-white/10">
                  <th className="py-2 px-2">Instrument</th>
                  <th className="py-2 px-2">Class</th>
                  <th className="py-2 px-2">Value</th>
                  <th className="py-2 px-2">1M Return</th>
                  <th className="py-2 px-2">Weight</th>
                  <th className="py-2 px-2">Signal</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Parag Parikh Flexi Cap Fund', type: 'Equity MF', value: 850000, ret: 24.5, weight: '20.0%', signal: 'Accumulate' },
                  { name: 'Nippon India Small Cap', type: 'Equity MF', value: 420000, ret: 38.2, weight: '9.9%', signal: 'Watch Volatility' },
                  { name: 'HDFC Bank Ltd.', type: 'Stock', value: 150000, ret: -4.1, weight: '3.5%', signal: 'Review' },
                ].map((holding, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={14} strokeWidth={1.75} className={holding.ret > 0 ? 'text-emerald-400' : 'text-red-400'} />
                        <span className="text-sm font-semibold text-(--text-primary)">{holding.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-xs text-(--text-secondary)">{holding.type}</td>
                    <td className="py-3 px-2 text-sm font-mono text-(--text-primary)">₹{(holding.value / 100000).toFixed(2)}L</td>
                    <td className={`py-3 px-2 text-xs font-medium ${holding.ret > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      <span className="inline-flex items-center gap-1">
                        {holding.ret > 0 ? <ArrowUpRight size={12} strokeWidth={1.75} /> : <ArrowDownRight size={12} strokeWidth={1.75} />}
                        {Math.abs(holding.ret)}%
                      </span>
                    </td>
                    <td className="py-3 px-2 text-xs text-(--text-secondary)">{holding.weight}</td>
                    <td className="py-3 px-2 text-xs text-(--text-tertiary)">{holding.signal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};




