import React, { useState } from "react";
import {
  ShieldCheck,
  Copy,
  Check,
  AlertOctagon,
  Scale,
  CheckCircle2,
} from "lucide-react";

const AI_CONTEXT_CONTENT = `# TITANSTACK ARCHITECTURAL CONSTITUTION (2026)
# Version: 1.1.0-DESIGN_STRICT

## 1. TASARIM VE VİTRİN (Showcase)
- Proje her zaman /src/client/Showcase.tsx dosyası ile açılmalıdır.
- Yeni bir UI bileşeni eklendiğinde önce Vitrin sayfasında doğrulanmalıdır.
- Tipografi: Sadece tailwind.config.ts içindeki 'titan-' ön ekli ölçekler kullanılabilir.

## 2. YASAKLI TEKNOLOJİLER
- Node.js < 22, Prisma, Axios, Redux, Express.

## 3. FİZİKSEL DOSYA HİYERARŞİSİ
- /src/app: Hono Backend
- /src/db: Drizzle Schema
- /src/lib: Shared Validations
- /src/client: React Core (Showcase, Main)

## 4. KESİN KURALLAR
- Tip Güvenliği: "any" yasaktır.
- Tipografi: Harf boşluğu (letter-spacing) ve satır yüksekliği (line-height) tailwind config dışına çıkamaz.

## 5. ANTI-SPAGHETTI YÖNETMELİĞİ
- Döngüsel Karmaşıklık (Cyclomatic Complexity): Fonksiyon başına max 10.
- Dosya Boyutu: 300 satırı geçen dosyalar derhal parçalanmalıdır (Atomic Decomposition).
- Fonksiyon Boyutu: 150 satırı geçen fonksiyonlar küçültülmelidir (JSX render için esnek).
- Derinlik: 3 seviyeden fazla iç içe (nested) blok yasaktır.

## 6. GELİŞTİRİCİ DENEYİMİ (DX) KURALLARI
- Console Yasağı: Raw \`console.log\` kullanımı yasaktır. Sadece \`src/lib/logger.ts\` içindeki \`Logger\` utility'si kullanılabilir.
- Strict Typing: \`any\` tipi kesinlikle yasaktır. \`unknown\` veya spesifik tipler kullanılmalıdır.
- API Durumu: Frontend'de \`ApiConnectionStatus\` bileşeni ile Backend bağlantı durumu görselleştirilmelidir.`;

export const ArchitecturalContext: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(AI_CONTEXT_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-start gap-4">
        <AlertOctagon className="text-amber-400 shrink-0 mt-1" size={20} />
        <div>
          <h4 className="text-amber-400 font-bold text-sm uppercase">
            Mimari Anayasa Koruyucusu (v1.1)
          </h4>
          <p className="text-[11px] text-amber-500/80 leading-relaxed font-mono mt-1">
            Yeni kural: Tipografi ayarları artık matematiksel bir zorunluluktur.
            Showcase sayfası projenin "Entry Point"i olarak tescillenmiştir.
          </p>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-emerald-400" size={18} />
            <span className="text-xs font-bold text-white uppercase tracking-widest font-mono">
              .ai-context.md
            </span>
          </div>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 text-xs bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg transition-all shadow-lg active:scale-95"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Anayasa Kopyalandı" : "Kuralları Dışa Aktar"}
          </button>
        </div>
        <div className="p-6 bg-black/60 font-mono text-[12px] leading-relaxed max-h-[450px] overflow-y-auto">
          <pre className="text-gray-400 whitespace-pre-wrap">
            <code>{AI_CONTEXT_CONTENT}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
