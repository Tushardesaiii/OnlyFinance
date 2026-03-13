import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PieChart, Activity, Settings, Wallet, CreditCard, ChevronRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { icon: Home, label: 'Overview', to: '/dashboard' },
  { icon: PieChart, label: 'Calculators', to: '/dashboard/calculators' },
  { icon: Wallet, label: 'Portfolios', to: '/dashboard/portfolios' },
  { icon: Activity, label: 'Market Pulse', to: '/dashboard/market' },
  { icon: CreditCard, label: 'UPI & Cards', to: '/dashboard/upi' },
  { icon: Settings, label: 'Settings', to: '/dashboard/settings' },
];

export const GlassSidebar: React.FC = () => {
  return (
    <aside className="h-full w-sidebar bg-panel border-r border-white/[0.05] p-5 flex flex-col justify-between hidden md:flex animate-reveal">
      <div>
        {/* 1. BRANDING: High-Contrast Minimalist */}
       <div className="flex flex-col items-center justify-center gap-8 mb-5 px-1 group">
  {/* The Hero Logo - Massive and Centered */}
  <div className="relative bg-gradient-to-tr from-accent-primary/20 to-accent-secondary/20 rounded-full p-4">
    {/* Subtle Background Glow (The "Aura" effect Apple uses for AI/Siri) */}
   
    
    <img 
      src="/Logo2.png" 
      className="h-12 w-12 md:h-20 md:w-20 object-contain relative z-10 drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02]" 
      alt="OnlyFinance Logo" 
    />
   
  </div>

</div>
        
        {/* 2. NAVIGATION: Active-State Elevation */}
        <nav className="space-y-1">
          <p className="px-3 mb-3 text-[10px] font-bold text-white/15 uppercase tracking-[0.2em]">OnlyFinance Navigation</p>
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={index}
                to={item.to}
                end={item.to === '/dashboard'}
                className={({ isActive }) => `group block w-full transition-all rounded-xl ${
                  isActive 
                    ? 'bg-white/[0.04] border border-white/[0.08] text-accent-primary' 
                    : 'text-white/40 hover:text-white hover:bg-white/[0.02] border border-transparent'
                }`}
              >
                {({ isActive }) => (
                  <div className="flex items-center justify-between px-3 py-2.5">
                    <div className="flex items-center gap-3">
                      <Icon size={18} strokeWidth={isActive ? 2 : 1.5} className={isActive ? 'drop-shadow-[0_0_8px_var(--color-accent-glow)]' : ''} />
                      <span className="font-semibold text-[13px] tracking-tight">{item.label}</span>
                    </div>
                    {isActive && (
                      <motion.div layoutId="activeDot">
                        <ChevronRight size={12} className="opacity-40" />
                      </motion.div>
                    )}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* 3. FOOTER WIDGET: Subsurface Status */}
      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] group hover:border-white/10 transition-colors cursor-pointer">
          <div className="flex items-center justify-between mb-3">
             <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Global Balance</p>
             <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
          </div>
          
          <p className="text-2xl font-bold text-white num-tabular tracking-tighter">
            <span className="text-sm text-white/20 font-sans mr-1">₹</span>42,50,000
          </p>
          
          <div className="flex items-center gap-2 mt-2 py-1 px-2 rounded-lg bg-emerald-500/5 w-fit border border-emerald-500/10">
            <Activity size={10} className="text-accent-primary" />
            <span className="text-[10px] font-bold text-accent-primary">+12.4%</span>
          </div>
        </div>

        {/* User Quick Profile */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-8 h-8 rounded-full bg-card-elevated border border-white/10 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tushar" alt="User" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">Tushar Patil</p>
            <p className="text-[10px] text-white/20 font-medium truncate">Premium Tier</p>
          </div>
          <Settings size={14} className="text-white/10 hover:text-white transition-colors cursor-pointer" />
        </div>
      </div>
    </aside>
  );
};