
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';

const data = [
  { time: '0ms', titan: 12, node: 120, go: 22 },
  { time: '50ms', titan: 15, node: 145, go: 25 },
  { time: '100ms', titan: 18, node: 210, go: 28 },
  { time: '150ms', titan: 14, node: 190, go: 24 },
  { time: '200ms', titan: 22, node: 320, go: 32 },
  { time: '250ms', titan: 25, node: 280, go: 35 },
  { time: '300ms', titan: 20, node: 410, go: 30 },
];

export const PerformanceDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
          <span className="text-gray-400 text-xs font-mono uppercase">Soğuk Başlatma Gecikmesi</span>
          <div className="flex items-end gap-2 my-4">
            <span className="text-4xl font-bold text-white tracking-tighter">12ms</span>
            <span className="text-emerald-400 text-xs mb-1 font-bold">(Node'a göre -%92)</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[12%]"></div>
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
          <span className="text-gray-400 text-xs font-mono uppercase">Ortalama Verim</span>
          <div className="flex items-end gap-2 my-4">
            <span className="text-4xl font-bold text-white tracking-tighter">85k</span>
            <span className="text-violet-400 text-xs mb-1 font-bold">istek/sn</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-violet-500 w-[85%]"></div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
          <span className="text-gray-400 text-xs font-mono uppercase">Bellek Ayak İzi</span>
          <div className="flex items-end gap-2 my-4">
            <span className="text-4xl font-bold text-white tracking-tighter">42MB</span>
            <span className="text-sky-400 text-xs mb-1 font-bold">Her Örnekte</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-sky-500 w-[30%]"></div>
          </div>
        </div>
      </div>

      <div className="glass-card p-8 rounded-2xl h-[400px]">
        <h3 className="text-lg font-bold mb-6 text-white">Yük Altında Yanıt Gecikmesi (ms)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTitan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="time" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#111827', border: '1px solid #ffffff10', borderRadius: '12px' }}
              itemStyle={{ fontSize: '12px' }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Area type="monotone" dataKey="titan" name="Titan Stack (Bun+Hono)" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorTitan)" strokeWidth={3} />
            <Area type="monotone" dataKey="node" name="Eski Stack (Node+Express)" stroke="#4b5563" fill="transparent" strokeDasharray="5 5" strokeWidth={1} />
            <Area type="monotone" dataKey="go" name="Referans Go Sunucusu" stroke="#0ea5e9" fill="transparent" strokeWidth={1} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 bg-violet-600/10 border border-violet-500/20 rounded-xl text-xs text-violet-300 font-mono">
        <strong>MİMARIN NOTU:</strong> "Titan" stack, Bun'un Zig çekirdeğini kullanarak Go/Rust performansına yaklaşırken, %100 TypeScript verimliliğini korur. Node.js, GC (Garbage Collection) yükü ve yerel asenkron bağlam eksikliği nedeniyle yüksek yoğunluklu B2B işlerinde tercih edilmemiştir.
      </div>
    </div>
  );
};
