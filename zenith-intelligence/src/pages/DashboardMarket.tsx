import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Globe, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export const DashboardMarket: React.FC = () => {
  const indexData = Array.from({ length: 20 }, (_, i) => ({
    time: `${9 + Math.floor(i / 4)}:${(i % 4) * 15 || '00'}`,
    nifty: 22000 + Math.random() * 500 - 250,
    sensex: 72000 + Math.random() * 1500 - 750
  }));

  const globalIndices = [
    { name: 'S&P 500', value: '5,088.80', change: '+1.2%', up: true },
    { name: 'NASDAQ', value: '15,996.82', change: '+1.5%', up: true },
    { name: 'FTSE 100', value: '7,727.42', change: '-0.3%', up: false },
    { name: 'Nikkei 225', value: '39,098.68', change: '+2.1%', up: true },
  ];

  const marketNews = [
    { source: 'Reuters', time: '10m ago', title: 'RBI maintains status quo on repo rate at 6.5%, maintains withdrawal of accommodation stance.', sentiment: 'neutral' },
    { source: 'Bloomberg', time: '1h ago', title: 'Indian IT sector expects a bounce back in second half of the fiscal amid global tech spending revival.', sentiment: 'positive' },
    { source: 'Mint', time: '2h ago', title: 'FIIs turn net buyers after 3 days of heavy selling in the cash market segment.', sentiment: 'positive' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
       <div className="flex justify-between items-end">
         <div>
            <h2 className="text-2xl font-bold text-(--text-primary) tracking-wide">Market Pulse</h2>
            <p className="text-sm text-(--text-secondary) mt-1">Real-time domestic and global market intelligence.</p>
         </div>
         <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-900/30 text-emerald-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Market Open
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
           <motion.div className="ultra-glass p-4 rounded-2xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                 <div>
                    <h3 className="text-base font-bold text-(--text-primary) flex items-center gap-2">
                       <TrendingUp className="text-emerald-400" size={16} strokeWidth={1.75} /> NIFTY 50
                    </h3>
                    <div className="flex items-baseline gap-3 mt-1">
                       <span className="text-2xl font-mono font-bold text-(--text-primary)">{Math.round(indexData[19].nifty).toLocaleString('en-IN')}</span>
                       <span className="text-emerald-400 text-sm font-medium flex items-center">
                          <TrendingUp size={13} strokeWidth={1.75} className="mr-1" /> +142.50 (0.65%)
                       </span>
                    </div>
                 </div>
                 <div className="flex bg-white/5 rounded-md p-1">
                    {['1D', '1W', '1M', '1Y'].map(t => (
                       <button key={t} className={`px-3 py-1 text-xs rounded-md ${t === '1D' ? 'bg-white/10 text-(--text-primary) font-medium shadow' : 'text-(--text-tertiary) hover:text-(--text-primary)'}`}>
                          {t}
                       </button>
                    ))}
                 </div>
              </div>

              <div className="h-64 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={indexData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                       <defs>
                          <linearGradient id="colorNifty" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="time" stroke="rgba(255,255,255,0.1)" fontSize={10} tickLine={false} axisLine={false} />
                       <YAxis domain={['dataMin - 100', 'dataMax + 100']} hide />
                       <Tooltip 
                          contentStyle={{ backgroundColor: '#151b23', borderRadius: '8px', border: '1px solid #2a3442' }}
                          itemStyle={{ fontFamily: 'var(--font-mono)', color: '#10B981' }}
                          formatter={(value: any) => [`₹${Math.round(value as number).toLocaleString('en-IN')}`, 'Index']}
                          labelStyle={{ color: 'rgba(220,228,236,0.7)' }}
                       />
                       <Area type="monotone" dataKey="nifty" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorNifty)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </motion.div>

           <h3 className="text-base font-bold text-(--text-primary) tracking-wide mt-2 border-b border-white/10 pb-2">Latest Intelligence</h3>
           <div className="space-y-3">
              {marketNews.map((news, idx) => (
                 <div key={idx} className="ultra-glass p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group flex gap-3 items-start">
                    <div className={`p-2 rounded-md shrink-0 mt-1 ${news.sentiment === 'positive' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                       <Zap size={14} strokeWidth={1.75} />
                    </div>
                    <div>
                       <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-(--text-secondary)">{news.source}</span>
                          <span className="text-xs text-(--text-tertiary)">{news.time}</span>
                       </div>
                       <p className="text-sm text-(--text-secondary) leading-relaxed group-hover:text-(--text-primary) transition-colors">{news.title}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        <div className="space-y-4">
           <div className="ultra-glass p-4 rounded-2xl">
              <h3 className="text-xs font-bold text-(--text-tertiary) uppercase tracking-widest mb-4 flex items-center gap-2">
                 <Globe size={14} strokeWidth={1.75} /> Global Markets
              </h3>
              <div className="space-y-3">
                 {globalIndices.map((idx, i) => (
                    <div key={i} className="flex flex-col p-3 rounded-lg bg-white/5 border border-white/5">
                       <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-sm text-(--text-primary)">{idx.name}</span>
                          <span className={`${idx.up ? 'text-emerald-400' : 'text-red-400'} text-xs font-bold flex items-center`}>
                             {idx.up ? <ArrowUpRight size={12} strokeWidth={1.75} className="mr-0.5"/> : <ArrowDownRight size={12} strokeWidth={1.75} className="mr-0.5"/>} {idx.change}
                          </span>
                       </div>
                       <span className="font-mono text-(--text-tertiary) text-xs">{idx.value}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};




