
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, User, Sparkles, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

const SYSTEM_INSTRUCTION = `Sen TitanStack AI Architect asistanısın. Bu projenin Principal Architect'isin.
RESMİ ANAYASA (.ai-context.md) VE HİYERARŞİ:
1. /src/app: Hono Backend
2. /src/db: Drizzle Schema
3. /src/lib: Shared Zod Logic
4. /src/client: React UI

TEKNİK KISITLAMALAR:
- Node.js API'ları YASAK (fs, path vb.). Sadece Web API'ları.
- Prisma/Axios/Redux YASAK. Sadece Hono RPC + Drizzle.
- RLS (Row Level Security) her DB sorgusunda şart.

GÖREVİN: 
Geliştiriciden gelen özellik taleplerini bu kısıtlamalara göre analiz et.
Yanıtında mutlaka FEASIBILITY skoru ver (HIGH/MEDIUM/LOW/NOT RECOMMENDED).
Eğer uygun değilse, anayasanın hangi maddesini ihlal ettiğini belirt.`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isAnalysis?: boolean;
}

export const ArchitectAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Mimar asistanı aktif. TitanStack Anayasası'na göre yeni özellik taleplerini analiz etmeye hazırım." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: input,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const aiResponse: Message = { 
        role: 'assistant', 
        content: response.text || "Mimari analiz sırasında bir hata oluştu.",
        isAnalysis: true 
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Bağlantı hatası: Gemini API'ye ulaşılamadı. Mimar şu an meşgul." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[700px] glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      <div className="bg-white/5 p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-violet-600/20 p-2 rounded-lg border border-violet-500/30">
            <Bot className="text-violet-400" size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Mimari Denetçi</h3>
            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-tighter">Guardrail v1.5 [STRICT_MODE]</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest">Logic Stream Active</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-black/20">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`mt-1 p-2 rounded-lg shrink-0 h-fit ${msg.role === 'user' ? 'bg-violet-600' : 'bg-white/10'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} className="text-violet-400" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-violet-600/10 border border-violet-500/30 text-white' 
                  : 'bg-white/5 border border-white/10 text-gray-300'
              }`}>
                {msg.isAnalysis && (
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10 text-[10px] font-bold text-violet-400">
                    <ShieldAlert size={12} />
                    TITANSTACK_ANALYSIS_REPORT_092
                  </div>
                )}
                <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap font-sans">
                  {msg.content}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-3">
              <div className="flex gap-1">
                <span className="w-1 h-1 bg-violet-400 rounded-full animate-bounce"></span>
                <span className="w-1 h-1 bg-violet-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1 h-1 bg-violet-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
              <span className="text-[10px] text-gray-500 font-mono uppercase">Analyzing Feasibility...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white/5 border-t border-white/10">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Mimar, yeni bir modül için hiyerarşiyi kontrol et..."
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:border-violet-500/50 transition-all outline-none"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-all active:scale-90"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
