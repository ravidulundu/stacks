
import React from 'react';
import { TechCategory } from '../types';
import { CheckCircle2, Zap, Server, Database, Globe, Share2, ShieldCheck, AlertCircle, Laptop, Monitor, Terminal } from 'lucide-react';

interface TechItem {
  id: string;
  category: TechCategory;
  name: string;
  reason: string;
  icon: React.ReactNode;
  tags: string[];
}

const stack: TechItem[] = [
  {
    id: 'runtime',
    category: TechCategory.RUNTIME,
    name: 'Bun 2.x (Zig-native)',
    reason: 'Sıfır yapılandırmalı TS desteği, inanılmaz hızlı açılış (Edge cold-start için kritik) ve entegre test/paketleyici ekosistemi.',
    icon: <Zap className="text-amber-400" />,
    tags: ['En Hızlı Runtime', 'SQLite-native', 'Zig Tabanlı']
  },
  {
    id: 'framework',
    category: TechCategory.FRAMEWORK,
    name: 'Hono v5 (Standart Web API\'ları)',
    reason: 'Fetch API standartlarında. Sıfır bağımlılık ile aşırı hafif. Çoklu kiracılık (multi-tenancy) için middleware odaklı yaklaşım.',
    icon: <Globe className="text-sky-400" />,
    tags: ['Edge-Native', 'RPC Desteği', 'Düşük Gecikme']
  }
];

export const TechManifesto: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stack.map((item) => (
          <div key={item.id} className="glass-card p-6 rounded-2xl border border-white/10 hover:border-violet-500/50 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-white/5 p-3 rounded-xl group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-gray-500 bg-white/5 px-2 py-1 rounded">
                {item.category}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">{item.name}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {item.reason}
            </p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map(tag => (
                <span key={tag} className="text-[10px] font-bold text-violet-300 bg-violet-400/10 px-2 py-0.5 rounded-full border border-violet-400/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Dürüst Platform Derecelendirmesi */}
      <div className="glass-card p-8 rounded-2xl border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Monitor className="text-violet-400" size={24} />
          Cross-Platform Uyumluluk Raporu (Truth Score)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Linux Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-300 flex items-center gap-2">
                <Terminal size={16} className="text-emerald-400" /> Linux (CachyOS/Arch)
              </span>
              <span className="text-emerald-400 font-mono font-bold text-xs px-2 py-1 bg-emerald-400/10 rounded">10/10</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              <strong>Zirve Noktası:</strong> Bun, Linux syscall'larını (io_uring) doğrudan kullanır. CachyOS'un v3/v4 optimizasyonları ve LTO kernel'ı ile gecikme (latency) minimumdadır. Geliştirme için en dürüst ve hızlı ortamdır.
            </p>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[100%]"></div>
            </div>
          </div>

          {/* macOS Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-300 flex items-center gap-2">
                <Laptop size={16} className="text-sky-400" /> macOS (Apple Silicon)
              </span>
              <span className="text-sky-400 font-mono font-bold text-xs px-2 py-1 bg-sky-400/10 rounded">9/10</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              <strong>Durum:</strong> ARM mimarisi üzerinde Bun inanılmaz stabildir. JavaScriptCore (JSC) motoru macOS ile yerel olarak uyumludur. Geliştirici deneyimi mükemmeldir ancak kernel seviyesinde Linux kadar esnek değildir.
            </p>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-sky-500 w-[90%]"></div>
            </div>
          </div>

          {/* Windows Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-300 flex items-center gap-2">
                <Monitor size={16} className="text-amber-400" /> Windows (Native/WSL2)
              </span>
              <span className="text-amber-400 font-mono font-bold text-xs px-2 py-1 bg-amber-400/10 rounded">7/10</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              <strong>Dürüst Eleştiri:</strong> Native Windows desteği hala deneyseldir. Dosya sistemi izleme (fs.watch) bazen kararsızdır. **WSL2** kullanımı zorunludur; aksi halde performans kayıpları ve paket uyumsuzlukları kaçınılmazdır.
            </p>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-[70%]"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="text-emerald-400" size={20} />
            Mimari Avantajlar
          </h3>
          <ul className="text-xs text-gray-300 space-y-2 font-mono">
            <li>• Uçtan uca %100 Tip Güvenliği</li>
            <li>• CachyOS üzerinde v3/v4 Instruction Set desteği</li>
            <li>• POSIX uyumlu hızlı dosya sistem yönetimi</li>
          </ul>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <AlertCircle className="text-amber-400" size={20} />
            Kritik Sınırlar
          </h3>
          <ul className="text-xs text-gray-300 space-y-2 font-mono">
            <li>• Native Windows'ta 'bun install' bazen cache hataları verebilir.</li>
            <li>• Bazı eski Node.js C++ addon'ları Bun ile henüz tam uyumlu değil.</li>
            <li>• Geliştirme ortamı mutlaka Linux veya WSL2 olmalıdır.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
