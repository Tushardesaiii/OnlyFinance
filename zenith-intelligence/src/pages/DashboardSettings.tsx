import React from 'react';
import { User, Shield, ChevronRight, LogOut, Save, Smartphone, Mail, Key } from 'lucide-react';

/**
 * SETTINGS UPGRADES:
 * 1. Two-Column Layout: Categories on the left, fields on the right.
 * 2. Field Anatomy: Labels at 40% opacity, Values at 90% for instant scannability.
 * 3. Ghost Inputs: Replaced "list items" with structured interaction blocks.
 * 4. Dangerous Actions: Separated "Sign Out" to prevent accidental clicks.
 */

export const DashboardSettings: React.FC = () => {
  const settingsSections = [
    {
      title: 'Profile',
      icon: User,
      id: 'profile',
      items: [
        { label: 'Display Name', value: 'Tushar Patil', icon: User },
        { label: 'Email Address', value: 'tushar@example.com', icon: Mail },
        { label: 'Phone Number', value: '+91 98765 43210', icon: Smartphone },
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      id: 'security',
      items: [
        { label: 'Password', value: 'Updated 3 months ago', icon: Key },
        { label: 'Two-Factor', value: 'Enabled (Authenticator)', icon: Shield },
      ]
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 p-4 md:p-8 max-w-6xl mx-auto">
      {/* 1. HEADER & VERSIONING */}
      <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/[0.05]">
        <div>
          <h2 className="text-3xl font-bold text-white/90 tracking-tight">System Settings</h2>
          <p className="text-sm text-white/40 mt-1">Configure your financial baseline and security protocols.</p>
        </div>
        <div className="hidden sm:block px-3 py-1 bg-white/[0.03] border border-white/10 rounded-full text-[10px] font-bold text-white/40 tracking-widest uppercase">
          Build 2.0.4 — Stable
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* 2. NAVIGATION ANCHOR (Left Sidebar) */}
        <aside className="lg:col-span-3 space-y-1">
          {['Profile', 'Security', 'Notifications', 'Billing', 'API Access'].map((item) => (
            <button 
              key={item}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                item === 'Profile' ? 'bg-white/5 text-emerald-400 border border-white/5' : 'text-white/40 hover:text-white/60'
              }`}
            >
              {item}
            </button>
          ))}
          <div className="pt-8">
            <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-500/60 hover:text-red-500 transition-colors">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </aside>

        {/* 3. SETTINGS CONTENT (Right Area) */}
        <div className="lg:col-span-9 space-y-10">
          {settingsSections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <section.icon size={16} className="text-white/20" />
                <h3 className="text-xs font-bold text-white/20 uppercase tracking-[0.2em]">{section.title}</h3>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {section.items.map((item, i) => (
                  <div 
                    key={i} 
                    className="group bg-[#0A0A0A] border border-white/[0.05] hover:border-white/10 p-4 rounded-2xl flex items-center justify-between transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-white/20 group-hover:text-emerald-400 transition-colors">
                        <item.icon size={18} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-wider mb-0.5">{item.label}</p>
                        <p className="text-[14px] font-medium text-white/90">{item.value}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="text-[11px] font-bold text-white/40 hover:text-white transition-colors opacity-0 group-hover:opacity-100 uppercase tracking-tighter">Edit</button>
                      <ChevronRight size={16} className="text-white/10 group-hover:text-white/40 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* 4. PERSISTENT ACTION BAR */}
          <div className="pt-6 flex items-center justify-between border-t border-white/[0.05]">
            <p className="text-[11px] text-white/20">Last synced: Today at 09:41 AM</p>
            <div className="flex gap-3">
              <button className="px-6 py-2.5 rounded-xl bg-white text-black hover:bg-emerald-400 transition-all text-xs font-bold flex items-center gap-2">
                <Save size={14} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};