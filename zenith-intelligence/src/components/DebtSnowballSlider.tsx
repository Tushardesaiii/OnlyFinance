import React, { useState, useMemo, useEffect } from 'react';
import { simulateDebtSnowball, calculateEMI } from '../utils/DebtCalculators';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const DebtSnowballSlider: React.FC = () => {
  const [extraPayment, setExtraPayment] = useState(5000);
  const [liabilities, setLiabilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for liabilities
    setTimeout(() => {
      setLiabilities([
        { principal: 750000, annualRate: 10.5, remainingMonths: 60 }
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Example Debt Profile: Active EMIs
  const principal = liabilities.length > 0 ? liabilities[0].principal : 0;
  const annualRate = liabilities.length > 0 ? liabilities[0].annualRate : 0;
  const minimumEmi = liabilities.length > 0 ? calculateEMI(principal, annualRate, liabilities[0].remainingMonths) : 0;
  
  const simulationData = useMemo(() => {
    if (loading) return [];
    return simulateDebtSnowball(principal, annualRate, minimumEmi, extraPayment);
  }, [principal, annualRate, minimumEmi, extraPayment, loading]);

  const monthsSaved = useMemo(() => {
    if (loading) return 0;
    const baseData = simulateDebtSnowball(principal, annualRate, minimumEmi, 0);
    return baseData.length - simulationData.length;
  }, [principal, annualRate, minimumEmi, simulationData.length, loading]);

  if (loading) return <div className="ultra-glass p-4 rounded-2xl mt-4 h-80 animate-pulse bg-white/5" />;

  return (
    <div className="ultra-glass p-4 rounded-2xl mt-4">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-base font-bold text-(--text-primary) mb-1 tracking-wide">Debt Snowball Optimizer</h3>
          <p className="text-xs text-(--text-tertiary)">See how extra EMI payments reduce your tenure.</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-emerald-400 uppercase tracking-wider mb-1 font-bold">Time Saved</p>
          <p className="text-2xl font-bold text-(--text-primary) emerald-glow-text" style={{ fontFamily: 'var(--font-mono)' }}>
            {monthsSaved} <span className="text-sm font-sans text-(--text-tertiary) font-normal">months</span>
          </p>
        </div>
      </div>

      <div className="mb-8">
        <label className="flex justify-between text-xs text-(--text-secondary) mb-2">
          <span>Extra Monthly Payment (₹)</span>
          <span className="font-mono font-bold text-emerald-400">₹{extraPayment.toLocaleString()}</span>
        </label>
        <input 
          type="range" 
          min="0" 
          max="50000" 
          step="500"
          value={extraPayment}
          onChange={(e) => setExtraPayment(Number(e.target.value))}
          className="w-full accent-emerald-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between mt-2 text-xs text-(--text-tertiary)">
          <span>₹0</span>
          <span>₹50,000</span>
        </div>
      </div>

      <div className="h-48 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={simulationData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={10} tickFormatter={(val) => `M${val}`} />
            <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} tickFormatter={(val) => `₹${(val/100000).toFixed(1)}L`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#151b23', borderRadius: '8px', border: '1px solid #2a3442' }}
              itemStyle={{ fontFamily: 'var(--font-mono)', color: '#10B981' }}
              labelStyle={{ color: '#94a3b8' }}
              formatter={(value: any) => `₹${Math.round(Number(value)).toLocaleString('en-IN')}`}
              labelFormatter={(label) => `Month ${label}`}
            />
            <Area type="monotone" dataKey="balance" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};




