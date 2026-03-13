import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bot, ChevronRight, Activity, Shield, Sparkles, Lock, ArrowUpRight } from 'lucide-react';

/**
 * IMPROVEMENTS MADE:
 * 1. Text Stack: Used specific opacities (Primary: 90%, Secondary: 60%, Tertiary: 40%)
 * 2. Layout: Left-aligned for high readability; reduced redundant KPI noise.
 * 3. Product Graphics: Added "Skewed" UI cards to simulate a real app interface.
 * 4. Interaction: Replaced generic buttons with high-contrast primary actions.
 */

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white/90 selection:bg-emerald-500/30 w-full flex flex-col font-sans">
      {/* 1. PROFESSIONAL NAV: Reduced height, tightened spacing */}
      <nav className="fixed top-0 w-full h-14 bg-[#050505]/80 backdrop-blur-md border-b border-white/[0.05] flex items-center justify-between px-6 md:px-12 z-50">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center">
            <div className="w-2 h-2 bg-black rounded-full" />
          </div>
          <span className="text-sm font-bold tracking-[0.2em] uppercase">OnlyFinance</span>
        </div>
        
        <div className="hidden md:flex gap-8 text-[13px] font-medium text-white/40">
          <a href="#features" className="hover:text-white transition-colors">Platform</a>
          <a href="#product" className="hover:text-white transition-colors">Governance</a>
          <a href="#security" className="hover:text-white transition-colors">Security</a>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="bg-white text-black hover:bg-white/90 px-4 py-1.5 rounded-full text-xs font-bold transition-all"
        >
          Enter OnlyFinance
        </button>
      </nav>

      <main className="flex-1 px-6 md:px-12 pt-32 pb-20 z-10 max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 items-start">
          
          {/* LEFT: CONTENT STRATEGY */}
          <section className="xl:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[11px] font-semibold mb-8 tracking-wide uppercase">
                <Sparkles size={12} />
                OnlyFinance Intelligence 2.0
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[0.95]">
                The Operating System <br />
                <span className="text-white/40">for Private Wealth.</span>
              </h1>
              
              <p className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed">
                Move beyond spreadsheets. A unified intelligence layer for debt optimization, 
                cashflow governance, and automated portfolio stress-testing.
              </p>

              <div className="flex flex-wrap gap-4 mb-16">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="group bg-emerald-500 text-black hover:bg-emerald-400 px-7 py-3 rounded-lg text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/10"
                >
                  Get Started <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button className="bg-white/5 border border-white/10 px-7 py-3 rounded-lg text-sm font-bold text-white hover:bg-white/10 transition-all">
                  View Documentation
                </button>
              </div>

              {/* FEATURES: Grid of 3, tightened typography */}
              <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/5">
                {[
                  { icon: Bot, title: 'AI Co-pilot', desc: 'Context-aware guidance on debt and allocation.' },
                  { icon: Activity, title: 'Scenario Engine', desc: 'Stress-test portfolios against market volatility.' },
                  { icon: Shield, title: 'Audit Logic', desc: 'Immutable logs for every financial adjustment.' }
                ].map((f, i) => (
                  <div key={i}>
                    <f.icon size={20} className="text-emerald-500 mb-4" />
                    <h3 className="text-[13px] font-bold text-white mb-2">{f.title}</h3>
                    <p className="text-[12px] text-white/40 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* RIGHT: SKEWED PRODUCT GRAPHICS (The "Pro" Look) */}
          <section className="xl:col-span-5 relative perspective-1000">
            <motion.div 
              initial={{ opacity: 0, rotateY: -10, rotateX: 5 }}
              animate={{ opacity: 1, rotateY: -15, rotateX: 10 }}
              transition={{ duration: 1 }}
              className="relative z-20"
            >
              {/* Main Card */}
              <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-tighter text-white/40 mb-1">Portfolio Value</p>
                    <p className="text-2xl font-mono font-bold">₹42,50,000</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <ArrowUpRight size={18} className="text-emerald-500" />
                  </div>
                </div>
                
                {/* Simulated Chart */}
                <div className="space-y-3 mb-6">
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[70%] bg-emerald-500" />
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[40%] bg-sky-500" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/[0.03] border border-white/5 p-3 rounded-xl">
                    <p className="text-[10px] text-white/40">Risk Band</p>
                    <p className="text-xs font-bold text-emerald-400">Balanced</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/5 p-3 rounded-xl">
                    <p className="text-[10px] text-white/40">Debt Ratio</p>
                    <p className="text-xs font-bold text-sky-400">0.29</p>
                  </div>
                </div>
              </div>

              {/* Floating Overlay Card 1: Security */}
              <div className="absolute -bottom-10 -left-10 bg-[#151515] border border-white/10 p-4 rounded-xl shadow-2xl w-56 transform translate-z-10 translate-x-4">
                <div className="flex items-center gap-3 mb-3">
                  <Lock size={14} className="text-emerald-500" />
                  <span className="text-[11px] font-bold">AES-256 Enabled</span>
                </div>
                <div className="h-1 w-full bg-emerald-500/20 rounded-full overflow-hidden">
                   <div className="h-full w-[100%] bg-emerald-500" />
                </div>
              </div>

              {/* Floating Overlay Card 2: Activity */}
              <div className="absolute -top-6 -right-6 bg-emerald-600 p-4 rounded-xl shadow-2xl w-40 text-black transform -rotate-6">
                <p className="text-[10px] font-bold uppercase opacity-70">Efficiency</p>
                <p className="text-lg font-bold">+12.4%</p>
              </div>
            </motion.div>

            {/* Background Glows (Subtle) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/5 blur-[120px] rounded-full -z-10" />
          </section>

        </div>
      </main>
      
      {/* 2% ANCHOR FOOTER */}
      <footer className="w-full py-10 px-6 md:px-12 border-t border-white/5 text-white/20 text-[11px] flex justify-between items-center">
        <p>© 2026 ONLYFINANCE OPERATING SYSTEMS. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </footer>
    </div>
  );
};