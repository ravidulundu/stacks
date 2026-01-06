
import React from 'react';
import { Database, Server, Smartphone, Shield, ArrowRight, Layers } from 'lucide-react';

const Node: React.FC<{ icon: React.ReactNode; label: string; desc: string; color: string }> = ({ icon, label, desc, color }) => (
  <div className={`p-4 rounded-xl glass-card border-l-4 ${color} flex flex-col items-center text-center w-full max-w-[180px]`}>
    <div className="mb-2 p-2 bg-white/5 rounded-lg">{icon}</div>
    <span className="font-bold text-sm text-white mb-1">{label}</span>
    <span className="text-[10px] text-gray-500 uppercase font-mono">{desc}</span>
  </div>
);

export const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="glass-card p-10 rounded-2xl overflow-hidden relative">
      {/* Arka plan desenleri */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <Node 
          icon={<Database className="text-emerald-400" />} 
          label="PostgreSQL" 
          desc="Tek Doğru Kaynak" 
          color="border-emerald-500" 
        />
        
        <ArrowRight className="hidden md:block text-gray-700" size={24} />
        <div className="md:hidden flex flex-col items-center gap-1 my-2">
            <div className="w-0.5 h-6 bg-gray-700"></div>
        </div>

        <Node 
          icon={<Layers className="text-blue-400" />} 
          label="Drizzle" 
          desc="Tip Çıkarımı" 
          color="border-blue-500" 
        />

        <ArrowRight className="hidden md:block text-gray-700" size={24} />
        <div className="md:hidden flex flex-col items-center gap-1 my-2">
            <div className="w-0.5 h-6 bg-gray-700"></div>
        </div>

        <Node 
          icon={<Server className="text-violet-400" />} 
          label="Hono RPC" 
          desc="Edge Backend" 
          color="border-violet-500" 
        />

        <ArrowRight className="hidden md:block text-gray-700" size={24} />
        <div className="md:hidden flex flex-col items-center gap-1 my-2">
            <div className="w-0.5 h-6 bg-gray-700"></div>
        </div>

        <Node 
          icon={<Shield className="text-amber-400" />} 
          label="Doğrulama" 
          desc="Zod Gateway" 
          color="border-amber-500" 
        />

        <ArrowRight className="hidden md:block text-gray-700" size={24} />
        <div className="md:hidden flex flex-col items-center gap-1 my-2">
            <div className="w-0.5 h-6 bg-gray-700"></div>
        </div>

        <Node 
          icon={<Smartphone className="text-rose-400" />} 
          label="React 19" 
          desc="Tip Güvenli Görünüm" 
          color="border-rose-500" 
        />
      </div>

      <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/5">
        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
          <Shield className="text-amber-400 w-4 h-4" />
          Multi-Tenant İzolasyon Protokolü
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-400 font-mono">
          <div className="p-3 bg-black/20 rounded-lg">
            <span className="text-violet-300">Aşama 1:</span> <code>X-Tenant-ID</code> başlığına göre Bun:SQL üzerinden dinamik bağlantı havuzu yönetimi.
          </div>
          <div className="p-3 bg-black/20 rounded-lg">
            <span className="text-violet-300">Aşama 2:</span> Drizzle session context'i kullanılarak Postgres seviyesinde RLS (Row Level Security) zorlaması.
          </div>
          <div className="p-3 bg-black/20 rounded-lg">
            <span className="text-violet-300">Aşama 3:</span> Hono middleware'i, işlem yürütülmeden önce kiracı abonelik limitlerini doğrular.
          </div>
          <div className="p-3 bg-black/20 rounded-lg">
            <span className="text-violet-300">Aşama 4:</span> Edge lokasyonlarında Valkey (Redis halefi) aracılığıyla dağıtık önbellekleme.
          </div>
        </div>
      </div>
    </div>
  );
};
