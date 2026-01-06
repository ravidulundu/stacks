import React, { useState } from "react";
import {
  Copy,
  Check,
  FileCode,
  Palette,
  Scale,
  FolderTree,
  Database,
  Cpu,
  Terminal,
  ShieldCheck,
  Settings,
} from "lucide-react";

const configs = [
  {
    id: "structure",
    name: "Proje Hiyerarşisi",
    icon: <FolderTree size={18} className="text-amber-400" />,
    language: "markdown",
    type: "code",
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
│   ├── lib/                # Shared Utilities
│   │   ├── rpc.ts          # 🔗 Type-Safe Client
│   │   └── logger.ts       # 📋 System Logger (no-console safe)
│   └── client/             # React 19 UI
│       ├── components/     # Atomik Bileşenler
│       │   └── atoms/      # 🧬 Genetik Yapı Taşları
│       │       ├── Button.tsx
│       │       ├── Input.tsx
│       │       ├── Card.tsx
│       │       └── Badge.tsx
│       ├── Showcase.tsx    # Design System Vitrini
│       ├── index.css       # Tailwind entry
│       └── main.tsx        # Hydration point
├── public/                 # Statik Varlıklar
├── tailwind.config.ts      # UI Mühürü (Titan-Scale)
├── tsconfig.json           # Ultra-Strict TS
└── drizzle.config.ts       # DB Migration Meta`,
  },
  {
    id: "atom-button",
    name: "atoms/Button.tsx",
    icon: <Cpu size={18} className="text-orange-400" />,
    language: "typescript",
    type: "code",
    code: `import React from 'react';

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
      className={\`\${base} \${variants[variant]} \${sizes[size]} \${className}\`}
      {...props}
    >
      {children}
    </button>
  );
};`,
  },
  {
    id: "atom-input",
    name: "atoms/Input.tsx",
    icon: <Cpu size={18} className="text-orange-400" />,
    language: "typescript",
    type: "code",
    code: `import React from 'react';

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
          className={\`w-full bg-elevated/50 border border-white/10 rounded-lg px-4 py-2 text-titan-base text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-600 disabled:opacity-50 \${error ? 'border-error ring-error/20' : ''} \${className}\`}
          {...props}
        />
        {error && <p className="text-titan-xs text-error">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';`,
  },
  {
    id: "bunfig",
    name: "bunfig.toml",
    icon: <ShieldCheck size={18} className="text-red-400" />,
    language: "toml",
    type: "code",
    code: `[install]
# Dependency Hell Prevention Protocol (TitanStack)
# Her zaman tam sürümü kaydet (örn: "^1.0.0" yerine "1.2.3")
save-exact = true

[run]
# Performanslı runtime (Zig-native)
bun = true`,
  },
  {
    id: "atom-card",
    name: "atoms/Card.tsx",
    icon: <Cpu size={18} className="text-orange-400" />,
    language: "typescript",
    type: "code",
    code: `import React from 'react';

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
    <div className={\`rounded-xl p-6 \${variants[variant]} \${className}\`}>
      {children}
    </div>
  );
};`,
  },
  {
    id: "atom-badge",
    name: "atoms/Badge.tsx",
    icon: <Cpu size={18} className="text-orange-400" />,
    language: "typescript",
    type: "code",
    code: `import React from 'react';

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
    <span className={\`inline-flex items-center px-2 py-0.5 rounded text-titan-xs font-bold border \${variants[variant]}\`}>
      {children}
    </span>
  );
};`,
  },
  {
    id: "tsconfig",
    name: "tsconfig.json",
    icon: <ShieldCheck size={18} className="text-emerald-400" />,
    language: "json",
    type: "code",
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
}`,
  },
  {
    id: "tailwind",
    name: "tailwind.config.ts",
    icon: <Palette size={18} className="text-violet-400" />,
    language: "typescript",
    type: "code",
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
} satisfies Config;`,
  },
  {
    id: "vite",
    name: "vite.config.ts",
    icon: <Settings size={18} className="text-blue-400" />,
    language: "typescript",
    type: "code",
    code: `import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
  };
});`,
  },
  {
    id: "drizzle",
    name: "drizzle.config.ts",
    icon: <Database size={18} className="text-sky-400" />,
    language: "typescript",
    type: "code",
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
  });`,
  },
  {
    id: "eslint",
    name: "eslint.config.js",
    icon: <ShieldCheck size={18} className="text-indigo-400" />,
    language: "javascript",
    type: "code",
    code: `import js from '@eslint/js';
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
      'complexity': ['error', { max: 10 }],
      'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['warn', { max: 150, skipBlankLines: true, skipComments: true }],
      'max-depth': ['error', { max: 3 }],
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
);`,
  },
  {
    id: "prettier",
    name: ".prettierrc",
    icon: <FileCode size={18} className="text-pink-400" />,
    language: "json",
    type: "code",
    code: `{
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "all",
  "jsxSingleQuote": true,
  "bracketSpacing": true
}`,
  },
  {
    id: "rpc-client",
    name: "src/lib/rpc.ts (HC)",
    icon: <Cpu size={18} className="text-pink-500" />,
    language: "typescript",
    type: "code",
    code: `import { hc } from 'hono/client';
import type { AppType } from '../app/index';

// 🔗 End-to-End Type Safety (Backend -> Frontend)
// Backend'deki tip değişiklikleri anında burada hata verir.
export const client = hc<AppType>('http://localhost:3000');`,
  },
  {
    id: "hono",
    name: "src/app/index.ts (RPC)",
    icon: <Cpu size={18} className="text-rose-400" />,
    language: "typescript",
    type: "code",
    code: `import { Hono } from 'hono';
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
    // await valkey.get(\`limit:\${tenantId}\`);

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
export default app;`,
  },
  {
    id: "package",
    name: "package.json",
    icon: <Terminal size={18} className="text-gray-400" />,
    language: "json",
    type: "code",
    code: `{
  "name": "titan-app",
  "module": "src/app/index.ts",
  "type": "module",
  "scripts": {
    "dev": "bun run dev:api & bun run dev:ui",
    "dev:api": "bun run --hot src/app/index.ts",
    "dev:ui": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "db:push": "bunx drizzle-kit push",
    "db:studio": "bunx drizzle-kit studio",
    "test": "bun test"
  },
  "dependencies": {
    "hono": "^4.0.0",
    "drizzle-orm": "^0.39.0",
    "zod": "^3.23.0",
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "lucide-react": "^0.469.0",
    "@hono/zod-validator": "latest"
  },
  "devDependencies": {
    "typescript": "^5.7.0",
    "drizzle-kit": "^0.30.0",
    "vite": "^6.0.0",
    "tailwindcss": "^3.4.17",
    "postcss": "latest",
    "autoprefixer": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest"
  }
}`,
  },
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
                ? "bg-violet-600/15 border-violet-500/50 text-white shadow-lg shadow-violet-500/5"
                : "bg-white/2 border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
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
            <span className="text-xs font-mono font-bold tracking-tight">
              {selected.name}
            </span>
          </div>
          <button
            onClick={copyCode}
            className="flex items-center gap-2 text-[10px] text-gray-400 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/10"
          >
            {copied ? (
              <Check size={12} className="text-emerald-400" />
            ) : (
              <Copy size={12} />
            )}
            {copied ? "Mühür Kopyalandı" : "Kodu Kopyala"}
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
