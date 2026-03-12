import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WealthHero } from '../components/WealthHero';
import { DebtWealthInversionPanel } from '../components/DebtWealthInversionPanel';
import { Sparkles, ArrowRight, Zap, TrendingUp, ShieldCheck } from 'lucide-react';

/**
 * DASHBOARD UPGRADES:
 * 1. Double Distance: Increased neutral contrast between the main area and the side queue.
 * 2. Subtle Semantic Colors: High priority uses emerald-500/10, not heavy glows.
 * 3. Typography Stack: Used 90/60/40 opacity rule for text.
 * 4. Dense Layout: Tightened padding to fit more "intelligence" into the view.
 */

export const DashboardOverview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out p-4 md:p-8">
      {/* 1. HERO SECTION (Assumed professionalized) */}
      <WealthHero />
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-8">
        
        {/* MAIN UTILITY AREA */}
        <div className="xl:col-span-8 space-y-6">
          <DebtWealthInversionPanel />
        </div>

        {/* 2. THE INTELLIGENCE QUEUE (Audit: Removed "ultra-glass" for a solid Anchor) */}
        <aside className="xl:col-span-4 bg-[#0A0A0A] border border-white/8 rounded-2xl p-5 flex flex-col h-fit">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/3 border border-white/10 flex items-center justify-center text-emerald-400">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-white/90 uppercase tracking-tight">Opportunity Queue</h3>
                <p className="text-[11px] text-white/40 font-medium">Ranked by Financial Impact</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {[
              { 
                item: 'Shift idle cash to Arbitrage Fund', 
                impact: '+0.6% annual yield', 
                priority: 'High', 
                icon: TrendingUp,
                color: 'text-emerald-400' 
              },
              { 
                item: 'Increase SIP by INR 2,000', 
                impact: 'Goal ETA -22 months', 
                priority: 'Medium', 
                icon: Zap,
                color: 'text-sky-400' 
              },
              { 
                item: 'Prepay high-rate debt tranche', 
                impact: 'Interest save INR 31,200', 
                priority: 'High', 
                icon: ShieldCheck,
                color: 'text-emerald-400' 
              }
            ].map((action, index) => (
              <div 
                key={index} 
                className="group bg-white/2 hover:bg-white/4 border border-white/5 rounded-xl p-3.5 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div className={`mt-0.5 ${action.color}`}>
                      <action.icon size={14} />
                    </div>
                    <div>
                      <p className="text-[12px] text-white/90 font-semibold leading-snug">{action.item}</p>
                      <p className="text-[11px] text-white/40 mt-1 font-mono tracking-tighter">{action.impact}</p>
                    </div>
                  </div>
                  
                  {/* Action Badge: Subtle and small */}
                  <div className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded border ${
                    action.priority === 'High' 
                    ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5' 
                    : 'border-white/10 text-white/40'
                  }`}>
                    {action.priority}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 3. PRIMARY ACTION: Solid, high-contrast button */}
          <button
            onClick={() => navigate('/dashboard/calculators')}
            className="w-full py-3 bg-white text-black hover:bg-emerald-400 hover:text-black transition-all text-xs font-bold rounded-xl flex items-center justify-center gap-2 group shadow-xl shadow-black/20"
          >
            Run Planning Suite 
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="text-[10px] text-white/20 text-center mt-4 italic font-medium">
            Next intelligence refresh in 4 hours
          </p>
        </aside>
      </div>
    </div>
  );
};