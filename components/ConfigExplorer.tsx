import React, { useState } from 'react';
import { Copy, Check, FileCode, Palette, Scale, FolderTree, Database, Cpu, Terminal, ShieldCheck } from 'lucide-react';

const configs = [
  {
    id: 'structure',
    name: 'Proje Hiyerarşisi',
    icon: <FolderTree size={18} className="text-amber-400" />,
    language: 'markdown',
    type: 'code',
    code: `# TitanStack Atomic Hierarchy (2026)
# ---------------------------------

titan-app/
├── src/
│   ├── app/                # Hono Backend (API & RPC)
│   │   ├── index.ts        # Server Entry (RPC)
│   │   └── routes/         # Type-safe endpoints
│   ├── db/                 # Data Layer (Drizzle)
│   │   ├── schema.ts       # SQL Source of Truth
│   │   └── client.ts       # DB Connection Pool
│   ├── lib/                # Shared Contracts (Zod)
│   └── client/             # React 19 UI
│       ├── components/     # Atomik Bileşenler
│       ├── Showcase.tsx    # Design System Vitrini
│       ├── index.css       # Tailwind entry
│       └── main.tsx        # Hydration point
├── public/                 # Statik Varlıklar
├── tailwind.config.ts      # UI Mühürü (Titan-Scale)
├── tsconfig.json           # Ultra-Strict TS
└── drizzle.config.ts       # DB Migration Meta`
  },
  {
    id: 'tsconfig',
    name: 'tsconfig.json',
    icon: <ShieldCheck size={18} className="text-emerald-400" />,
    language: 'json',
    type: 'code',
    code: `{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`
  },
  {
    id: 'tailwind',
    name: 'tailwind.config.ts',
    icon: <Palette size={18} className="text-violet-400" />,
    language: 'typescript',
    type: 'code',
    code: `import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: { 
        primary: '#8B5CF6',
        surface: '#030712',   
        elevated: '#111827',  
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'titan-xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '-0.01em' }],
        'titan-sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '-0.01em' }],
        'titan-base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '-0.011em' }],
        'titan-lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.02em' }],
        'titan-xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.02em' }],
        'titan-2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.03em' }],
        'titan-huge': ['3.5rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
      },
      animation: { 'spin-slow': 'spin 8s linear infinite' },
      backdropBlur: { 'titan': '12px' }
    },
  },
  plugins: [],
} satisfies Config;`
  },
  {
    id: 'drizzle',
    name: 'drizzle.config.ts',
    icon: <Database size={18} className="text-sky-400" />,
    language: 'typescript',
    type: 'code',
    code: `import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});`
  },
  {
    id: 'hono',
    name: 'src/app/index.ts (RPC)',
    icon: <Cpu size={18} className="text-rose-400" />,
    language: 'typescript',
    type: 'code',
    code: `import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono()
  .use('*', cors())
  .get('/api/health', (c) => c.json({ 
    status: 'healthy', 
    runtime: 'bun',
    version: '2026.1.0' 
  }))
  .get('/api/stats', (c) => {
    return c.json({ throughput: '85k req/s', latency: '12ms' });
  });

export type AppType = typeof app;
export default app;`
  },
  {
    id: 'package',
    name: 'package.json',
    icon: <Terminal size={18} className="text-gray-400" />,
    language: 'json',
    type: 'code',
    code: `{
  "name": "titan-app",
  "module": "src/app/index.ts",
  "type": "module",
  "scripts": {
    "dev": "bun run --hot src/app/index.ts",
    "ui:dev": "bunx vite",
    "db:push": "bunx drizzle-kit push",
    "db:studio": "bunx drizzle-kit studio",
    "test": "bun test"
  },
  "dependencies": {
    "hono": "^4.0.0",
    "drizzle-orm": "^0.30.0",
    "zod": "^3.23.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "typescript": "latest",
    "drizzle-kit": "latest",
    "vite": "latest",
    "tailwindcss": "latest",
    "postcss": "latest",
    "autoprefixer": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest"
  }
}`
  }
];

export const ConfigExplorer: React.FC = () => {
  const [selected, setSelected] = useState(configs[0]); 
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    if (selected.code) {
      navigator.clipboard.writeText(selected.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-auto min-h-[650px]">
      <div className="w-full lg:w-72 space-y-1">
        <div className="px-4 py-2 mb-2 border-b border-white/5">
          <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <Scale size={12} /> Teknik Sicil Kaydı (Registry)
          </h4>
        </div>
        {configs.map((config) => (
          <button
            key={config.id}
            onClick={() => setSelected(config)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all border ${
              selected.id === config.id 
                ? 'bg-violet-600/15 border-violet-500/50 text-white shadow-lg shadow-violet-500/5' 
                : 'bg-white/2 border-transparent text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            {config.icon}
            {config.name}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <div className="bg-white/5 px-6 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-violet-400">
            <FileCode size={16} />
            <span className="text-xs font-mono font-bold tracking-tight">{selected.name}</span>
          </div>
          <button onClick={copyCode} className="flex items-center gap-2 text-[10px] text-gray-400 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            {copied ? 'Mühür Kopyalandı' : 'Kodu Kopyala'}
          </button>
        </div>
        <div className="flex-1 p-6 overflow-auto bg-black/40 font-mono text-[13px] leading-relaxed scrollbar-thin scrollbar-thumb-white/10">
          <pre className="text-gray-300 whitespace-pre-wrap">
            <code>{selected.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
