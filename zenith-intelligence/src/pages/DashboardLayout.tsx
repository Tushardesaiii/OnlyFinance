import React from 'react';
import { Outlet } from 'react-router-dom';
import { GlassSidebar } from '../components/GlassSidebar';
import { AICoPilotChat } from '../components/AICoPilotChat';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen text-(--text-primary) overflow-hidden relative selection:bg-emerald-500/30">
      <div className="financial-aurora" />
      
      <div className="max-w-[100rem] mx-auto h-screen px-4 md:px-6 py-4 grid grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_320px] gap-4">
        <GlassSidebar />

        <main className="flex flex-col h-full overflow-y-auto pr-1 pb-4 custom-scrollbar relative z-10 animate-in fade-in duration-500">
           <Outlet />
        </main>

        <AICoPilotChat />
      </div>
    </div>
  );
};




