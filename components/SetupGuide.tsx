import React, { useState } from "react";
import { Copy, Terminal, Check, ShieldCheck } from "lucide-react";

const masterScriptTS = `/**
 * TitanStack 2026 - Official Scaffolder
 * Version: 2.9.9 [STRICT_DESIGN_SEALED]
 * Sync Status: VERIFIED
 */
import { $ } from "bun";
import { write } from "bun";

// 🛡️ TITAN ARCHITECTURAL GUARDIAN
// Manifesto Madde 3.A: "Geliştirme ortamı Linux veya WSL2 olmalıdır."
if (process.platform === "win32") {
  console.error("\\n❌ KRİTİK MİMARİ İHLALİ [Madde 3.A]");
  console.error("   TitanStack, Native Windows dosya sistemi (NTFS) ile uyumsuzdur.");
  console.error("   Performans ve I/O güvenliği için lütfen WSL2 veya Linux kullanın.");
  console.error("\\n   Gerekçe: Bun io_uring optimizasyonları.\\n");
  process.exit(1);
}

// Manifesto Madde 2.A: "Bun Zig-native Runtime zorunludur."
if (!Bun.version.startsWith("1") && !Bun.version.startsWith("2")) {
  console.error("\\n❌ KRİTİK MİMARİ İHLALİ [Madde 2.A]");
  console.error(\`   Tespit Edilen Runtime: Bun v\${Bun.version}\`);
  console.error("   Gereken Runtime: Bun v1.x+ (Zig-native)");
  console.error("   Edge cold-start performansı için Zig çekirdeği zorunludur.");
  process.exit(1);
}

const projectName = Bun.argv[2] || "titan-app";

const templates = {
  eslintConfig: \`import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'drizzle'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // 🛡️ TITAN ANTI-SPAGHETTI REGULATIONS
      'complexity': ['error', { max: 10 }], // Fonksiyon başına maksimum 10 dal (if/else)
      'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }], // Dosya başına max 300 satır (React Best Practice)
      'max-lines-per-function': ['warn', { max: 150, skipBlankLines: true, skipComments: true }], // Fonksiyon başına max 150 satır (JSX components)
      'max-depth': ['error', { max: 3 }], // Maksimum 3 seviye iç içe blok
      'no-console': 'warn', // Production temizliği
      '@typescript-eslint/no-explicit-any': 'error', // Tip güvenliği (Kesin Yasak)
    },
  },
);\`,

  postcssConfig: \`module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};\`,

  prettierConfig: \`{
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "all",
  "jsxSingleQuote": true,
  "bracketSpacing": true
}\`,

  packageJson: (name: string) => JSON.stringify({
    name: name,
    module: "src/app/index.ts",
    type: "module",
    scripts: {
      "dev": "bun run dev:api & bun run dev:ui",
      "dev:api": "bun run --hot src/app/index.ts",
      "dev:ui": "vite",
      "build": "vite build",
      "preview": "vite preview",
      "db:push": "bunx drizzle-kit push",
      "db:studio": "bunx drizzle-kit studio",
      "lint": "eslint .",
      "format": "prettier --write .",
      "test": "bun test"
    },
    dependencies: {
      "hono": "^4.0.0",
      "drizzle-orm": "^0.39.0",
      "zod": "^3.23.0",
      "react": "^19.2.3",
      "react-dom": "^19.2.3",
      "lucide-react": "^0.469.0",
      "@hono/zod-validator": "latest"
    },
    devDependencies: {
      "typescript": "^5.7.0",
      "drizzle-kit": "^0.30.0",
      "vite": "^6.0.0",
      "tailwindcss": "^3.4.17",
      "postcss": "latest",
      "autoprefixer": "latest",
      "eslint": "^9.17.0",
      "prettier": "^3.0.0",
      "eslint-plugin-react-hooks": "latest",
      "eslint-plugin-react-refresh": "latest",
      "typescript-eslint": "latest",
      "@vitejs/plugin-react": "latest",
      "@types/react": "latest",
      "@types/react-dom": "latest"
    }
  }, null, 2),

  bunfig: \`[install]
# Dependency Hell Prevention Protocol (TitanStack)
# Her zaman tam sürümü kaydet (örn: "^1.0.0" yerine "1.2.3")
save-exact = true

[run]
# Performanslı runtime (Zig-native)
bun = true\`,

  rpcClient: \`import { hc } from 'hono/client';
import type { AppType } from '../app/index';

// 🔗 End-to-End Type Safety (Backend -> Frontend)
// Backend'deki tip değişiklikleri anında burada hata verir.
export const client = hc<AppType>('http://localhost:3000');\`,

  logger: \`/* eslint-disable no-console */
/**
 * TitanStack System Logger
 * Centralized logging utility to comply with no-console rules.
 */
export const Logger = {
  info: (message: string, ...args: unknown[]) => {
    console.log(\\\`[INFO] \\\${message}\\\`, ...args);
  },
  error: (message: string, ...args: unknown[]) => {
    console.error(\\\`[ERROR] \\\${message}\\\`, ...args);
  },
  warn: (message: string, ...args: unknown[]) => {
    console.warn(\\\`[WARN] \\\${message}\\\`, ...args);
  },
  startup: (serviceName: string, port: number | string, docs?: string) => {
    console.log(\\\`
--------------------------------------------------
🚀 \\\${serviceName} RUNNING
   Port: \\\${port}
   Link: http://localhost:\\\${port}
   Docs: \\\${docs || 'N/A'}
--------------------------------------------------
\\\`);
  }
};
/* eslint-enable no-console */\`,

  buttonAtom: \`import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const base = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed border";

  const variants = {
    primary: "bg-primary hover:bg-violet-500 text-white border-transparent shadow-lg shadow-primary/20",
    secondary: "bg-elevated hover:bg-white/10 text-white border-white/10",
    outline: "bg-transparent border-white/20 text-white hover:border-white/40",
    ghost: "bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-titan-sm",
    md: "px-4 py-2 text-titan-base",
    lg: "px-6 py-3 text-titan-lg",
  };

  return (
    <button
      className={[base, variants[variant], sizes[size], className].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
};\`,

  inputAtom: \`import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && <label className="text-titan-sm font-medium text-gray-300">{label}</label>}
        <input
          ref={ref}
          className={[
            "w-full bg-elevated/50 border border-white/10 rounded-lg px-4 py-2 text-titan-base text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-600 disabled:opacity-50",
            error ? "border-error ring-error/20" : "",
            className
          ].join(" ")}
          {...props}
        />
        {error && <p className="text-titan-xs text-error">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';\`,

  cardAtom: \`import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'outline';
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: "bg-elevated border border-white/10",
    glass: "glass-card",
    outline: "bg-transparent border border-white/20"
  };

  return (
    <div className={[
      "rounded-xl p-6",
      variants[variant],
      className
    ].join(" ")}>
      {children}
    </div>
  );
};\`,

  badgeAtom: \`import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary' }) => {
  const variants = {
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    error: "bg-error/10 text-error border-error/20",
    neutral: "bg-white/5 text-gray-400 border-white/10",
  };

  return (
    <span className={[
      "inline-flex items-center px-2 py-0.5 rounded text-titan-xs font-bold border",
      variants[variant]
    ].join(" ")}>
      {children}
    </span>
  );
};\`,

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

  viteConfig: \`import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
        },
      },
    },
  };
});\`,

  drizzleConfig: \`import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});\`,

  honoIndex: \`import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { Logger } from '../lib/logger';

// 🛡️ TIP GÜVENLİ RPC TANIMI (ÖNEMLİ: Frontend bu tipleri kullanır)
Logger.startup('TITAN API', 3000, 'http://localhost:3000/api/health');

const app = new Hono<{ Variables: { tenantId: string } }>()
  .use('*', cors())

  // 1. AŞAMA: TENANT İZOLASYON KATMANI
  .use('*', async (c, next) => {
    const tenantId = c.req.header('X-Tenant-ID');

    // Portfolio/Demo modunda izin verilebilir ama Production'da yasak
    if (!tenantId) {
      return c.json({ error: 'MIMARI IHLAL: X-Tenant-ID basligi zorunludur.' }, 401);
    }

    // TODO: Valkey (Redis) üzerinden Tenant Limit kontrolü burada yapılacak (Aşama 3)
    // await valkey.get(\\\`limit:\\\${tenantId}\\\`);

    c.set('tenantId', tenantId);
    await next();
  })

  // BASE ROTASI
  .get('/api/health', (c) => c.json({
    status: 'healthy',
    runtime: 'bun',
    version: '2.x',
    topology: 'edge-native'
  }))

  // 2. AŞAMA: ZOD GATEWAY & RPC
  .post(
    '/api/users',
    zValidator('json', z.object({
      email: z.string().email(),
      name: z.string().min(2)
    })),
    async (c) => {
      const data = c.req.valid('json');
      const tenantId = c.get('tenantId');

      // TODO: Drizzle RLS (Row Level Security) Enjeksiyonu (Aşama 2)
      // const db = drizzle(client, { schema, rls: { tenantId } });

      return c.json({
        result: 'created',
        user: data,
        meta: {
          tenant: tenantId,
          isolation: 'active'
        }
      });
    }
  );

export type AppType = typeof app;
export default app;\`,

  dbSchema: \`import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});\`,

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
import { Palette, Type, Layers, Zap, Sun, Moon, Eye, RefreshCw, ShieldCheck, Maximize2, Droplets } from 'lucide-react';

const ColorSwatch: React.FC<{ name: string; hex: string; label: string; className: string }> = ({ name, hex, label, className }) => (
  <div className="space-y-2 group">
    <div className={\\\`h-20 w-full rounded-xl \\\${className} transition-all group-hover:ring-2 group-hover:ring-violet-500 ring-offset-4 ring-offset-surface shadow-lg relative overflow-hidden\\\`}>
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
    <div className={\\\`flex-1 overflow-hidden truncate \\\${className}\\\`}>
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

export default function DesignShowcase() {
  return (
    <div className="min-h-screen bg-surface text-white p-6 md:p-16 font-sans antialiased animate-in fade-in duration-700">
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

      <header className="mb-20 border-b border-white/5 pb-12">
        <h1 className="text-titan-huge font-black tracking-tighter mb-4">Titan<span className="text-primary">Vitrin</span></h1>
        <p className="text-titan-xl text-gray-500 font-medium max-w-2xl">Mühürlenmiş atomik tokenlar ile inşa edilen yüksek performanslı UI.</p>
      </header>

      {/* 1. Renk Paleti Section */}
      <section className="mb-24">
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
      <section className="mb-24">
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

      <style>{\\\`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      \\\`}</style>
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
      jsx: "react-jsx",
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
  console.log(\`\\n🚀 TITANSTACK | MIMARI VİZYON İNŞA EDİLİYOR: \${projectName}\`);

  try {
    // 1. Klasör Yapısı (Atomic Hierarchy - 2026 Standardı)
    // - Client: Atomic Design (Atoms, Molecules, Organisms)
    // - Shared: Zod Schemas (Type Contract)
    // - App: Edge Backend
    await $\`mkdir -p \${projectName}/src/{app,db,lib,shared,client/components/{atoms,molecules,organisms,templates},client/features,client/hooks} \${projectName}/public\`;
    process.chdir(projectName);

    // 2. Bun ile Başlatma
    await $\`bun init -y\`;

    // 3. Konfigürasyon Dosyaları (Mühürlenmiş/Sealed)
    console.log("�️ Konfigürasyonlar Mühürleniyor (Strict Mode)...");

    // Package.json'ı tamamen eziyoruz (Sealed Dependencies)
    await write("package.json", templates.packageJson(projectName));

    await write("vite.config.ts", templates.viteConfig);
    await write("drizzle.config.ts", templates.drizzleConfig);
    await write("tailwind.config.ts", templates.tailwind);
    await write("tsconfig.json", JSON.stringify(templates.tsconfig, null, 2));
    await write("eslint.config.js", templates.eslintConfig);
    await write("postcss.config.cjs", templates.postcssConfig);
    await write(".prettierrc", templates.prettierConfig);
    await write("bunfig.toml", templates.bunfig); // 🛡️ Sürüm Mühürleme Protokolü

    // 4. Bağlılıkları Yükle (Install)
    console.log("📦 TitanStack Çekirdeği İnşa Ediliyor...");
    await $\\\`bun install\\\`;

    // 5. Kaynak Kodları (Source Code)
    await write("src/app/index.ts", templates.honoIndex);
    await write("src/lib/rpc.ts", templates.rpcClient); // 🔗 Type-Safe Bağlantı
    await write("src/db/schema.ts", templates.dbSchema);

    // 4. Utility & Atoms (Strict Design System)
    await write("src/lib/logger.ts", templates.logger);
    await write("src/client/components/atoms/Button.tsx", templates.buttonAtom); // 🧬 Genetik Atom
    await write("src/client/components/atoms/Input.tsx", templates.inputAtom);
    await write("src/client/components/atoms/Card.tsx", templates.cardAtom);
    await write("src/client/components/atoms/Badge.tsx", templates.badgeAtom);
    await write("src/client/index.css", templates.indexCss);
    await write("src/client/Showcase.tsx", templates.showcase);
    await write("src/client/main.tsx", templates.main);

    // 6. Entry Point
    await write("index.html", \`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" /><title>Titan App</title>
  </head>
  <body class="bg-[#030712]"><div id="root"></div><script type="module" src="/src/client/main.tsx"></script></body>
</html>\`);

    console.log(\`\\n✅ TITAN PROJESİ HAZIR!

  Başlat:
  1. cd \${projectName}
  2. bun install
  3. bun run dev (Backend + Frontend Parallel)\`);
  } catch (e) {
    console.error("\\n❌ İNŞA HATASI:", e.message);
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
            <h4 className="font-bold text-emerald-400 text-sm uppercase">
              Full Design Sealing: ENABLED
            </h4>
            <p className="text-xs text-emerald-500/70">
              Script, Tasarım Vitrini sayfasındaki tüm kuralları
              'tailwind.config.ts' içine mühürler.
            </p>
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
              <h3 className="font-bold text-xl text-white">
                Titan Scaffolder (Design Integrated)
              </h3>
              <p className="text-sm text-gray-400 font-mono">
                Tipografi, Renk & Vitrin Mühürleme Scripti
              </p>
            </div>
          </div>

          <div className="bg-black/60 rounded-xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
              <span className="text-xs font-mono text-violet-400">
                setup.ts
              </span>
              <button
                onClick={() => copyToClipboard(masterScriptTS, "master")}
                className="flex items-center gap-2 text-xs text-white hover:bg-violet-600 transition-all bg-violet-600/80 px-4 py-2 rounded-lg"
              >
                {copied === "master" ? <Check size={14} /> : <Copy size={14} />}
                {copied === "master" ? "Kopyalandı!" : "Scripti Kopyala"}
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
