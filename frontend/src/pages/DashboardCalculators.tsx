import React from 'react';
import { SIPCalculator } from '../components/SIPCalculator';
import { EMICalculator } from '../components/EMICalculator';

export const DashboardCalculators: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
       <h2 className="text-2xl font-bold text-(--text-primary) mb-4 tracking-wide">Financial Calculators</h2>
       <div className="grid grid-cols-1 gap-4">
         <SIPCalculator />
         <EMICalculator />
       </div>
    </div>
  );
};




