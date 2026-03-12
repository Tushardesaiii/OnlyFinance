import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, Command, Info } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  isActionable?: boolean;
}

export const AICoPilotChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Analysis complete. I noticed ₹2,00,000 idle in your savings. Moving this to an Arbitrage Fund could capture ~7% yield.',
      time: '09:41 AM',
      isActionable: true
    }
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsTyping(false);
    // ... logic for AI response
  };

  return (
    <aside className="w-full h-full bg-panel border-l border-white/[0.05] hidden xl:flex flex-col animate-reveal">
      {/* 1. HEADER: Integrated & Subtle */}
      <div className="p-4 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Sparkles size={14} />
          </div>
          <div>
            <h3 className="text-[11px] font-bold text-white/90 uppercase tracking-widest">Zenith IQ</h3>
            <p className="text-[10px] text-emerald-500/80 font-medium">Neural Engine Active</p>
          </div>
        </div>
        <div className="px-2 py-1 rounded bg-white/[0.05] border border-white/10 text-[9px] font-bold text-white/40 uppercase tracking-tighter">
          v4.2-Pro
        </div>
      </div>

      {/* 2. CHAT AREA: Professional Density */}
      <div ref={scrollRef} className="flex-1 p-4 space-y-6 overflow-y-auto scrollbar-hide">
        {messages.map(msg => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === 'ai' ? 'items-start' : 'items-end'} gap-2`}>
            {/* AI Avatar Indicator */}
            {msg.sender === 'ai' && (
               <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest ml-1">Assistant</span>
            )}
            
            <div className={`group relative max-w-[90%] p-3.5 text-[12px] leading-[1.6] transition-all ${
              msg.sender === 'ai' 
                ? 'bg-white/[0.03] border border-white/[0.08] rounded-2xl rounded-tl-none text-white/80' 
                : 'bg-emerald-500 text-black font-semibold rounded-2xl rounded-tr-none shadow-lg shadow-emerald-500/10'
            }`}>
              {msg.text}
              
              {/* Contextual Action (Embedded) */}
              {msg.isActionable && (
                <button className="mt-3 w-full py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-emerald-400 hover:bg-emerald-400/10 transition-colors flex items-center justify-center gap-2">
                   Execute Optimization <Command size={10} />
                </button>
              )}
            </div>
            <p className="text-[9px] text-white/20 font-mono">{msg.time}</p>
          </div>
        ))}
        
        {isTyping && (
           <div className="flex gap-1.5 p-3 bg-white/[0.03] w-12 rounded-full border border-white/[0.05] items-center justify-center">
             <div className="w-1 h-1 bg-emerald-500/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
             <div className="w-1 h-1 bg-emerald-500/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
             <div className="w-1 h-1 bg-emerald-500/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
           </div>
        )}
      </div>

      {/* 3. INPUT AREA: High-Density Commands */}
      <div className="p-4 bg-white/[0.01] border-t border-white/[0.05]">
        <div className="relative group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Search commands or ask IQ..."
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-3 pl-4 pr-12 text-[12px] text-white/90 placeholder-white/20 focus:outline-none focus:border-emerald-500/30 focus:ring-1 focus:ring-emerald-500/10 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <kbd className="hidden group-focus-within:block text-[9px] font-mono text-white/20 border border-white/10 px-1.5 py-0.5 rounded">Enter</kbd>
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="text-white/20 hover:text-emerald-400 transition-colors disabled:opacity-0"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-center gap-1.5 opacity-40">
           <Info size={10} />
           <span className="text-[10px] font-medium tracking-tight">System uses Llama-3-Zenith-Financial</span>
        </div>
      </div>
    </aside>
  );
};