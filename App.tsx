
import React, { useState, useEffect } from 'react';
import { TechManifesto } from './components/TechManifesto';
import { SetupGuide } from './components/SetupGuide';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { PerformanceDashboard } from './components/PerformanceDashboard';
import { ConfigExplorer } from './components/ConfigExplorer';
import { ArchitectAssistant } from './components/ArchitectAssistant';
import { DesignSystem } from './components/DesignSystem';
import { ArchitecturalContext } from './components/ArchitecturalContext';
import { ShieldCheck, Cpu, Rocket, LayoutDashboard, Terminal, Settings2, Sparkles, Palette, Activity, Globe2, Zap, Gavel } from 'lucide-react';

const EdgePulse = () => {
  const [load, setLoad] = useState(14);
  const [latency, setLatency] = useState(12);
  const [region, setRegion] = useState('DETECTING...');

  useEffect(() => {
    const detectRegion = () => {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz.includes('Bahia') || tz.includes('Sao_Paulo') || tz.includes('South_America')) {
        return 'SA-EAST-1 (SALVADOR, BR)';
      } else if (tz.includes('Europe')) {
        return 'EU-CENTRAL-1 (FRANKFURT)';
      } else if (tz.includes('America')) {
        return 'US-EAST-1 (N. VIRGINIA)';
      } else if (tz.includes('Asia')) {
        return 'AP-NORTHEAST-1 (TOKYO)';
      }
      return 'GLOBAL-EDGE-ANYCAST';
    };

    setRegion(detectRegion());

    const interval = setInterval(() => {
      setLoad(prev => Math.max(8, Math.min(24, prev + (Math.random() * 4 - 2))));
      setLatency(prev => Math.max(8, Math.min(15, prev + (Math.random() * 2 - 1))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-violet-600/5 border-b border-violet-500/10 px-6 py-1.5 flex items-center justify-between text-[10px] font-mono">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Activity size={12} className="text-emerald-500" />
          <span className="text-gray-500 uppercase">System Status:</span>
          <span className="text-emerald-400 font-bold">HEALTHY_NODE_ACTIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe2 size={12} className="text-sky-500" />
          <span className="text-gray-500 uppercase">Global Load:</span>
          <span className="text-sky-400 font-bold">{load.toFixed(1)}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap size={12} className="text-amber-500" />
          <span className="text-gray-500 uppercase">Avg Latency:</span>
          <span className="text-amber-400 font-bold">{latency.toFixed(0)}ms</span>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-2">
        <span className="text-gray-600 uppercase">Edge Node:</span>
        <span className="text-violet-400 font-bold">{region}</span>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'manifesto' | 'diagram' | 'design' | 'performance' | 'configs' | 'setup' | 'assistant' | 'guardrails'>('manifesto');

  return (
    <div className="min-h-screen flex flex-col selection:bg-violet-500/30">
      <EdgePulse />
      
      <header className="sticky top-0 z-50 glass-card border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-violet-600 p-2 rounded-lg neon-glow">
            <Rocket className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">TitanStack <span className="text-violet-400">2026</span></h1>
            <p className="text-xs text-gray-400 font-mono">Principal Architect Blueprint</p>
          </div>
        </div>
        
        <nav className="hidden xl:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
          <button onClick={() => setActiveTab('manifesto')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'manifesto' ? 'bg-violet-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
            <div className="flex items-center gap-2"><ShieldCheck size={16} /> Manifesto</div>
          </button>
          
          <button onClick={() => setActiveTab('diagram')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'diagram' ? 'bg-violet-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
            <div className="flex items-center gap-2"><Cpu size={16} /> Mimari</div>
          </button>

          <button onClick={() => setActiveTab('design')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'design' ? 'bg-violet-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
            <div className="flex items-center gap-2"><Palette size={16} /> Tasarım</div>
          </button>

          <button onClick={() => setActiveTab('performance')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'performance' ? 'bg-violet-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
            <div className="flex items-center gap-2"><LayoutDashboard size={16} /> Metrikler</div>
          </button>

          <button onClick={() => setActiveTab('configs')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'configs' ? 'bg-violet-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
            <div className="flex items-center gap-2"><Settings2 size={16} /> Konfig & Yapı</div>
          </button>

          <button onClick={() => setActiveTab('guardrails')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'guardrails' ? 'bg-amber-600 text-white shadow-lg' : 'text-amber-500 hover:bg-amber-500/10'}`}>
            <div className="flex items-center gap-2"><Gavel size={16} /> Guardrails</div>
          </button>

          <button onClick={() => setActiveTab('setup')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'setup' ? 'bg-violet-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
            <div className="flex items-center gap-2"><Terminal size={16} /> Kurulum</div>
          </button>

          <div className="w-px h-6 bg-white/10 mx-2" />

          <button onClick={() => setActiveTab('assistant')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border border-violet-500/30 group ${activeTab === 'assistant' ? 'bg-violet-600 text-white shadow-lg' : 'text-violet-400 hover:bg-violet-500/10'}`}>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className={activeTab === 'assistant' ? 'text-white' : 'group-hover:animate-pulse'} /> 
              Mimar AI
            </div>
          </button>
        </nav>

        <div className="hidden lg:block">
          <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded">
            READY_TO_SCALE
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-violet-400 text-xs font-mono mb-2 uppercase tracking-tighter">
            <span>TitanStack Phase</span>
            <div className="h-px w-8 bg-violet-400/30" />
            <span>
              {activeTab === 'manifesto' && '01 // Core Philosophy'}
              {activeTab === 'diagram' && '02 // Structural Blueprint'}
              {activeTab === 'design' && '03 // UI/UX Identity'}
              {activeTab === 'performance' && '04 // Runtime Validation'}
              {activeTab === 'configs' && '05 // Technical Registry & Structure'}
              {activeTab === 'guardrails' && '06 // AI Governance'}
              {activeTab === 'setup' && '07 // Action Protocol'}
              {activeTab === 'assistant' && '08 // Intelligent Guardrail'}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {activeTab === 'manifesto' && 'Teknoloji Manifestosu'}
            {activeTab === 'diagram' && 'Sistem Mimari Şeması'}
            {activeTab === 'design' && 'Titan Design System'}
            {activeTab === 'performance' && 'Performans Ölçümleri'}
            {activeTab === 'configs' && 'Sistem Yapılandırma & Klasör Yapısı'}
            {activeTab === 'guardrails' && 'AI Yönetişim Kuralları'}
            {activeTab === 'setup' && 'Hızlı Başlatma Protokolü'}
            {activeTab === 'assistant' && 'Titan AI Architect Asistanı'}
          </h2>
          <p className="text-gray-400 max-w-2xl text-sm md:text-base">
            {activeTab === 'manifesto' && 'Neden hantal yapılardan kaçıp Edge-native bir gelecek seçtik?'}
            {activeTab === 'diagram' && 'Verinin veritabanından kullanıcıya ulaştığı optimize edilmiş yol.'}
            {activeTab === 'design' && 'Performans odaklı tasarım tokenları ve bileşen hiyerarşisi.'}
            {activeTab === 'performance' && 'Gerçek yük altında elde edilen Bun ve Hono karşılaştırmalı verileri.'}
            {activeTab === 'configs' && 'Üretim ortamı dosya şablonları ve atomik klasör hiyerarşisi.'}
            {activeTab === 'guardrails' && 'AI modellerinin mimariyi bozmasını engelleyen güvenlik duvarı.'}
            {activeTab === 'setup' && 'Saniyeler içinde TitanStack projesi başlatma adımları.'}
            {activeTab === 'assistant' && 'Mimari uyumluluk denetimi yapan ve roadmap çizen yapay zeka katmanı.'}
          </p>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'manifesto' && <TechManifesto />}
          {activeTab === 'diagram' && <ArchitectureDiagram />}
          {activeTab === 'design' && <DesignSystem />}
          {activeTab === 'performance' && <PerformanceDashboard />}
          {activeTab === 'configs' && <ConfigExplorer />}
          {activeTab === 'guardrails' && <ArchitecturalContext />}
          {activeTab === 'setup' && <SetupGuide />}
          {activeTab === 'assistant' && <ArchitectAssistant />}
        </div>
      </main>

      <footer className="py-6 border-t border-white/5 text-center text-gray-500 text-sm font-mono flex items-center justify-center gap-6 bg-black/40">
        <span>TITANSTACK 2026</span>
        <div className="w-1.5 h-1.5 bg-emerald-500/40 rounded-full animate-pulse" />
        <span>ARCHITECT_MODE=TRUE</span>
        <div className="w-1.5 h-1.5 bg-violet-500/40 rounded-full" />
        <span>STRICT_TYPES=ON</span>
      </footer>
    </div>
  );
};

export default App;
