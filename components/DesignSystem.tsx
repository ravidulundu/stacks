
import React from 'react';
import { Palette, Type, Layers, Zap, Sun, Moon, Eye, RefreshCw, ShieldCheck, Maximize2, Droplets } from 'lucide-react';

export const DesignSystem: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Sync Status Banner */}
      <div className="flex items-center justify-between p-4 bg-violet-500/10 border border-violet-500/20 rounded-2xl mb-8">
        <div className="flex items-center gap-3">
          <RefreshCw className="text-violet-400 animate-spin-slow" size={20} />
          <div>
            <h4 className="font-bold text-violet-400 text-sm uppercase tracking-tighter">Mühürleme Durumu: AKTİF</h4>
            <p className="text-[10px] text-violet-500/70 font-mono uppercase">Tüm görsel atomlar tailwind.config.ts dosyasına mühürlenmiştir.</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-violet-600/20 rounded-full border border-violet-500/30">
          <ShieldCheck size={12} className="text-violet-400" />
          <span className="text-[10px] text-violet-300 font-bold uppercase tracking-widest">Sistem Anayasası v1.2</span>
        </div>
      </div>

      {/* 1. Renk Paleti Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Palette className="text-violet-400" />
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Anlamsal Renk Kaydı</h3>
          </div>
          <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">config.theme.extend.colors</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <ColorSwatch name="Primary" hex="#8B5CF6" label="Marka / Aksiyon" className="bg-violet-500" />
          <ColorSwatch name="Surface" hex="#030712" label="Ana Arkaplan" className="bg-gray-950 border border-white/10" />
          <ColorSwatch name="Elevated" hex="#111827" label="Kartlar / Katman" className="bg-gray-900 border border-white/10" />
          <ColorSwatch name="Success" hex="#10B981" label="Performans" className="bg-emerald-500" />
          <ColorSwatch name="Warning" hex="#F59E0B" label="Kısıtlamalar" className="bg-amber-500" />
          <ColorSwatch name="Error" hex="#EF4444" label="Kritik Durum" className="bg-rose-500" />
        </div>
      </section>

      {/* 2. Tipografi Section - TITAN SCALE */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Type className="text-sky-400" />
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Tipografi: Titan-Scale</h3>
          </div>
          <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">config.theme.extend.fontSize</span>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="glass-card p-8 rounded-2xl border border-white/10">
            <div className="space-y-8">
              <TypeRow label="titan-huge" size="3.5rem" leading="1" tracking="-0.05em" weight="900" preview="TitanStack" className="text-5xl md:text-[3.5rem] font-black leading-none tracking-tighter" />
              <TypeRow label="titan-2xl" size="1.5rem" leading="2rem" tracking="-0.03em" weight="700" preview="B2B SaaS Infrastructure" className="text-2xl font-bold tracking-tight" />
              <TypeRow label="titan-base" size="1rem" leading="1.5rem" tracking="-0.01em" weight="400" preview="Geleceğin uçtan uca tip güvenli yazılım mimarisi." className="text-base text-gray-400" />
              <TypeRow label="titan-mono" size="0.875rem" leading="tight" tracking="normal" weight="500" preview="SYSTEM_LOCK=TRUE" className="font-mono text-sm text-emerald-400" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Tasarım İlkeleri Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Layers className="text-rose-400" />
          <h3 className="text-xl font-bold text-white uppercase tracking-tight">Sistem Prensipleri</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PrincipleCard 
            icon={<Moon className="text-sky-400" />}
            title="Dark-First"
            desc="Sistem varsayılan olarak karanlıktır. Göz yorgunluğunu azaltmak ve OLED verimliliği için surface rengi #030712'ye mühürlenmiştir."
          />
          <PrincipleCard 
            icon={<Droplets className="text-violet-400" />}
            title="Glassmorphism"
            desc="Derinlik efekti sadece mühürlü 'backdrop-blur-titan' (12px) ve düşük opaklıklı 'elevated' katmanları ile sağlanır."
          />
          <PrincipleCard 
            icon={<Maximize2 className="text-emerald-400" />}
            title="Atomik Ölçek"
            desc="Rastgele değer kullanımı yasaktır. Her ölçü (spacing/font) 'titan-' ön ekli konfigürasyon ölçeklerine uymak zorundadır."
          />
        </div>
      </section>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

const ColorSwatch: React.FC<{ name: string; hex: string; label: string; className: string }> = ({ name, hex, label, className }) => (
  <div className="space-y-2 group">
    <div className={`h-20 w-full rounded-xl ${className} transition-all group-hover:ring-2 group-hover:ring-violet-500 ring-offset-4 ring-offset-surface shadow-lg relative overflow-hidden`}>
    </div>
    <div className="px-1">
      <p className="text-xs font-bold text-white">{name}</p>
      <p className="text-[9px] text-gray-500 font-mono uppercase">{hex}</p>
      <p className="text-[9px] text-violet-400 font-bold uppercase tracking-tighter">{label}</p>
    </div>
  </div>
);

const TypeRow: React.FC<{ label: string; size: string; leading: string; tracking: string; weight: string; preview: string; className?: string }> = ({ label, size, leading, tracking, weight, preview, className }) => (
  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-4 border-b border-white/5 last:border-0">
    <div className="w-32 shrink-0">
      <p className="text-[10px] font-mono text-violet-400 font-bold uppercase tracking-widest">{label}</p>
      <p className="text-[9px] text-gray-600 font-mono mt-1">{size} / {leading}</p>
    </div>
    <div className={`flex-1 overflow-hidden truncate ${className}`}>
      {preview}
    </div>
  </div>
);

const PrincipleCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-violet-500/30 transition-all group">
    <div className="mb-4 group-hover:scale-110 transition-transform">{icon}</div>
    <h4 className="text-md font-bold text-white mb-2 uppercase tracking-tight">{title}</h4>
    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
  </div>
);
