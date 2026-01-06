
import React, { useState } from 'react';
import { Copy, Terminal, Check, ShieldCheck } from 'lucide-react';

const masterScriptTS = `/**
 * TitanStack 2026 - Official Scaffolder
 * Version: 2.9.8 [STRICT_DESIGN_SEALED]
 */
import { $ } from "bun";
import { write } from "bun";

const projectName = Bun.argv[2] || "titan-app";

const templates = {
  tailwind: \`import type { Config } from 'tailwindcss';

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
} satisfies Config;\`,

  indexCss: \`@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-surface text-white antialiased;
    color-scheme: dark;
  }
}

.glass-card {
  @apply bg-elevated/70 backdrop-blur-titan border border-white/10;
}\`,

  showcase: \`import React from 'react';
import { Palette, Type, ShieldCheck, Moon, Droplets, Zap, Activity } from 'lucide-react';

export default function DesignShowcase() {
  return (
    <div className="min-h-screen bg-surface text-white p-6 md:p-16 font-sans antialiased">
      <div className="flex items-center gap-3 mb-12 p-4 bg-violet-600/10 border border-violet-500/20 rounded-2xl max-w-fit">
        <ShieldCheck className="text-violet-400" size={20} />
        <span className="text-xs font-mono font-bold text-violet-300 uppercase tracking-widest">
          TitanStack Runtime Design Verification: ACTIVE
        </span>
      </div>

      <header className="mb-20 border-b border-white/5 pb-12">
        <h1 className="text-titan-huge font-black tracking-tighter mb-4">Titan<span className="text-primary">Vitrin</span></h1>
        <p className="text-titan-xl text-gray-500 font-medium max-w-2xl">Mühürlenmiş atomik tokenlar ile inşa edilen yüksek performanslı UI.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-24">
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <Palette className="text-violet-400" />
            <h2 className="text-titan-2xl font-bold uppercase tracking-tight">Semantic Registry</h2>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="h-24 bg-primary rounded-2xl shadow-xl shadow-primary/20 ring-1 ring-white/10" />
              <p className="text-xs font-bold font-mono">PRIMARY / #8B5CF6</p>
            </div>
            <div className="space-y-3">
              <div className="h-24 bg-surface rounded-2xl border border-white/20 ring-1 ring-white/5" />
              <p className="text-xs font-bold font-mono text-gray-400">SURFACE / #030712</p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <Type className="text-sky-400" />
            <h2 className="text-titan-2xl font-bold uppercase tracking-tight">Typography Scale</h2>
          </div>
          <div className="space-y-8 bg-elevated/40 p-8 rounded-3xl border border-white/5">
            <div>
              <p className="text-[10px] text-gray-600 font-mono mb-2">.text-titan-huge</p>
              <h3 className="text-titan-huge font-black leading-none tracking-tighter">Architecture</h3>
            </div>
            <div>
              <p className="text-[10px] text-gray-600 font-mono mb-2">.text-titan-base</p>
              <p className="text-titan-base text-gray-400 leading-relaxed">
                Her görsel atom, merkezi bir konfigürasyondan beslenmek zorundadır.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4">
          <Moon className="text-sky-400" />
          <div>
            <h4 className="font-bold text-sm">Forced Dark</h4>
            <p className="text-[10px] text-gray-500 font-mono uppercase">Status: Sealed</p>
          </div>
        </div>
        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4">
          <Activity className="text-emerald-400 animate-pulse" />
          <div>
            <h4 className="font-bold text-sm">Real-time Stats</h4>
            <p className="text-[10px] text-gray-500 font-mono uppercase">Stream: Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}\`,

  main: \`import React from 'react';
import ReactDOM from 'react-dom/client';
import Showcase from './Showcase';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Showcase />
  </React.StrictMode>
);\`,

  tsconfig: {
    compilerOptions: {
      target: "ESNext",
      module: "ESNext",
      moduleResolution: "bundler",
      strict: true,
      skipLibCheck: true,
      allowImportingTsExtensions: true,
      noEmit: true,
      baseUrl: ".",
      paths: { "@/*": ["./src/*"] }
    }
  }
};

async function run() {
  console.log(\`\\n🚀 TITANSTACK | MÜHÜRLENMİŞ TASARIM VE VİTRİN İNŞA EDİLİYOR: \${projectName}\`);
  
  try {
    await $\`mkdir -p \${projectName}/src/{app,db,lib,client/components} \${projectName}/public\`;
    process.chdir(projectName);
    
    await $\`bun init -y\`;
    console.log("📦 Paketler yükleniyor...");
    await $\`bun add hono drizzle-orm zod lucide-react react react-dom\`;
    await $\`bun add -d drizzle-kit typescript @types/react @types/react-dom tailwindcss postcss autoprefixer vite\`;

    console.log("🛠️ Konfigürasyon ve Vitrin (Showcase) mühürleniyor...");
    await write("tailwind.config.ts", templates.tailwind);
    await write("src/client/index.css", templates.indexCss);
    await write("src/client/Showcase.tsx", templates.showcase);
    await write("src/client/main.tsx", templates.main);
    await write("tsconfig.json", JSON.stringify(templates.tsconfig, null, 2));
    
    await write("index.html", \`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" /><title>Titan Vitrin</title>
  </head>
  <body class="bg-[#030712]"><div id="root"></div><script type="module" src="/src/client/main.tsx"></script></body>
</html>\`);

    console.log(\`\\n✅ TASARIM VE MİMARİ MÜHÜRLENDİ!
    
  Çalıştır:
  1. cd \${projectName}
  2. bunx vite\`);
  } catch (e) {
    console.error("\\n❌ KRİTİK HATA:", e.message);
  }
}

run();
`;

export const SetupGuide: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl mb-8">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-emerald-400" size={24} />
          <div>
            <h4 className="font-bold text-emerald-400 text-sm uppercase">Full Design Sealing: ENABLED</h4>
            <p className="text-xs text-emerald-500/70">Script, Tasarım Vitrini sayfasındaki tüm kuralları 'tailwind.config.ts' içine mühürler.</p>
          </div>
        </div>
      </div>

      <section className="glass-card p-8 rounded-2xl border-2 border-violet-500/30 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-violet-600 rounded-lg shadow-lg">
              <Terminal size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-white">Titan Scaffolder (Design Integrated)</h3>
              <p className="text-sm text-gray-400 font-mono">Tipografi, Renk & Vitrin Mühürleme Scripti</p>
            </div>
          </div>

          <div className="bg-black/60 rounded-xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
              <span className="text-xs font-mono text-violet-400">setup.ts</span>
              <button 
                onClick={() => copyToClipboard(masterScriptTS, 'master')}
                className="flex items-center gap-2 text-xs text-white hover:bg-violet-600 transition-all bg-violet-600/80 px-4 py-2 rounded-lg"
              >
                {copied === 'master' ? <Check size={14} /> : <Copy size={14} />}
                {copied === 'master' ? 'Kopyalandı!' : 'Scripti Kopyala'}
              </button>
            </div>
            <pre className="text-[12px] font-mono text-gray-300 overflow-x-auto leading-relaxed max-h-[400px]">
              {masterScriptTS}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};
