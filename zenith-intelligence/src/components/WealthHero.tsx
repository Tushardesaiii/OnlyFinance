import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';

export const WealthHero: React.FC = () => {
  const [wealthSummary, setWealthSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data instead of fetching from backend
    setTimeout(() => {
      setWealthSummary({
        netWorth: 4250000,
        trend: 12.4,
        assets: {
          equity: 2500000,
          fixedDeposits: 1000000,
          activeDebt: 750000
        }
      });
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return <div className="w-full h-44 animate-pulse bg-white/5 rounded-2xl" />;

  const formatCurrency = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-5">
        <div>
          <h2 className="text-xs font-semibold text-(--text-tertiary) uppercase tracking-[0.2em] mb-2">Total Wealth</h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-baseline gap-3"
          >
            <span className="text-4xl md:text-5xl font-extrabold text-(--text-primary) tracking-tight" style={{ fontFamily: 'var(--font-mono)' }}>
              {formatCurrency(wealthSummary.netWorth)}
            </span>
            <span className="flex items-center text-emerald-400 text-xs font-medium px-2 py-1 rounded bg-emerald-900/30 border border-emerald-500/25">
              <TrendingUp size={13} strokeWidth={1.75} className="mr-1" /> +{wealthSummary.trend}% (7d)
            </span>
          </motion.div>
        </div>
        
        <div className="flex gap-2.5">
          <button className="ultra-glass px-4 py-2.5 rounded-lg text-xs font-semibold text-(--text-primary) flex items-center gap-2 hover:bg-white/10 transition-colors">
            <Zap size={14} strokeWidth={1.75} className="text-yellow-400" /> Auto-SIP
          </button>
          <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors">
            Add Funds
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { label: 'Equity (Mutual Funds)', value: formatCurrency(wealthSummary.assets.equity), trend: 'up', pct: '+12.4%' },
          { label: 'Fixed Deposits (FD)', value: formatCurrency(wealthSummary.assets.fixedDeposits), trend: 'up', pct: '+6.8%' },
          { label: 'Active Debt (EMI)', value: formatCurrency(wealthSummary.assets.activeDebt), trend: 'down', pct: '-2.1%' },
        ].map((card, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="ultra-glass p-4 rounded-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
            <p className="text-xs font-medium text-(--text-tertiary) mb-2">{card.label}</p>
            <p className="text-xl font-bold text-(--text-primary) mb-3" style={{ fontFamily: 'var(--font-mono)' }}>{card.value}</p>
            
            <div className={`flex items-center text-xs font-medium ${card.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
              {card.trend === 'up' ? <ArrowUpRight size={13} strokeWidth={1.75} className="mr-1"/> : <ArrowDownRight size={13} strokeWidth={1.75} className="mr-1"/>}
              {card.pct} vs last month
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};




