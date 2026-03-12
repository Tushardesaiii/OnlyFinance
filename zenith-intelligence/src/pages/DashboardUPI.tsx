import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, QrCode, Smartphone, ArrowRightLeft, ShieldCheck, Copy } from 'lucide-react';

export const DashboardUPI: React.FC = () => {
  const transactions = [
    { id: 'TXN8932402', name: 'Zomato Ltd', date: 'Today, 2:45 PM', amount: -650, type: 'UPI' },
    { id: 'TXN8932401', name: 'Swiggy Instamart', date: 'Today, 10:15 AM', amount: -240, type: 'Card' },
    { id: 'TXN8932399', name: 'Salary Credit', date: 'Yesterday', amount: 125000, type: 'NEFT' },
    { id: 'TXN8932398', name: 'Netflix Subscription', date: '10 Mar 2026', amount: -649, type: 'Card' },
  ];

  const formatCurrency = (val: number) => `₹${Math.abs(val).toLocaleString('en-IN')}`;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
      <div className="flex justify-between items-end">
         <div>
            <h2 className="text-2xl font-bold text-(--text-primary) tracking-wide">UPI & Cards</h2>
            <p className="text-sm text-(--text-secondary) mt-1">Manage payment rails, credentials, and transaction controls.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="relative p-5 rounded-2xl overflow-hidden isolate h-[220px] flex flex-col justify-between border border-white/10"
        >
           <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 -z-10" />
           <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] -z-10" />
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

           <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                 <ShieldCheck className="text-emerald-300" size={20} strokeWidth={1.75} />
                 <span className="text-emerald-100 font-medium tracking-widest text-xs">ZENITH BLACK</span>
              </div>
              <CreditCard className="text-white/80" size={24} strokeWidth={1.75} />
           </div>

           <div>
              <div className="text-2xl font-mono text-white tracking-[0.16em] mb-4 text-shadow-sm">
                 4532  8910  ****  1024
              </div>
              <div className="flex justify-between items-end text-emerald-100">
                 <div>
                    <p className="text-xs uppercase tracking-widest opacity-80 mb-1">Cardholder Name</p>
                    <p className="font-medium tracking-wide">TUSHAR PATIL</p>
                 </div>
                 <div className="text-right">
                    <p className="text-xs uppercase tracking-widest opacity-80 mb-1">Valid Thru</p>
                    <p className="font-medium tracking-wide font-mono">12/29</p>
                 </div>
                 <div className="w-10 h-6">
                    <div className="relative flex w-full h-full opacity-80">
                       <div className="absolute left-0 w-6 h-6 rounded-full bg-red-500/80 mix-blend-screen mix-blend-lighten" />
                       <div className="absolute right-0 w-6 h-6 rounded-full bg-yellow-500/80 mix-blend-screen mix-blend-lighten" />
                    </div>
                 </div>
              </div>
           </div>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.1 }}
           className="ultra-glass p-5 rounded-2xl flex flex-col justify-between h-[220px]"
        >
           <div>
              <h3 className="text-base font-bold text-(--text-primary) mb-5 flex items-center gap-2">
                 <Smartphone className="text-emerald-400" size={18} strokeWidth={1.75} /> UPI Details
              </h3>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center group cursor-pointer hover:bg-white/10 transition-colors">
                 <div>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Primary VPA</p>
                    <p className="text-base font-medium text-white font-mono">tushar@zenith</p>
                 </div>
                 <button className="text-slate-400 group-hover:text-emerald-400 transition-colors">
                    <Copy size={14} strokeWidth={1.75} />
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4 mt-4">
              <button className="flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 py-2.5 rounded-lg transition-all font-medium text-xs">
                 <QrCode size={14} strokeWidth={1.75} /> Scan & Pay
              </button>
              <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2.5 rounded-lg transition-all font-medium text-xs">
                 <ArrowRightLeft size={14} strokeWidth={1.75} /> Send Money
              </button>
           </div>
        </motion.div>
      </div>

      <div className="ultra-glass p-4 rounded-2xl">
         <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-(--text-primary) tracking-wide">Recent Transactions</h3>
            <button className="text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors">View All</button>
         </div>
         <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full min-w-[680px] text-left">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-(--text-tertiary) border-b border-white/10">
                  <th className="py-2 px-2">Merchant</th>
                  <th className="py-2 px-2">Date</th>
                  <th className="py-2 px-2">Type</th>
                  <th className="py-2 px-2">Txn ID</th>
                  <th className="py-2 px-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-md flex items-center justify-center ${tx.amount > 0 ? 'bg-emerald-900/50 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                          {tx.amount > 0 ? <ArrowRightLeft size={13} strokeWidth={1.75} /> : <CreditCard size={13} strokeWidth={1.75} />}
                        </div>
                        <span className="text-sm font-semibold text-(--text-primary)">{tx.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-xs text-(--text-secondary)">{tx.date}</td>
                    <td className="py-3 px-2 text-xs text-(--text-secondary)">{tx.type}</td>
                    <td className="py-3 px-2 text-xs text-(--text-tertiary) font-mono">{tx.id}</td>
                    <td className={`py-3 px-2 text-right text-sm font-bold font-mono ${tx.amount > 0 ? 'text-emerald-400' : 'text-(--text-primary)'}`}>
                      {tx.amount > 0 ? '+' : '-'}{formatCurrency(tx.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};




