import React, { useState } from 'react';
import { INDONESIAN_SLUGS, ModuleSlugInfo } from '../../data/indonesianSlugs';
import { ChevronDown, ChevronUp, Sparkles, Lightbulb } from 'lucide-react';

interface IndonesianSlugHeaderProps {
  moduleKey: string;
  onApplyTemplate?: (content: string, fileName?: string) => void;
}

export const IndonesianSlugHeader: React.FC<IndonesianSlugHeaderProps> = ({ 
  moduleKey, 
  onApplyTemplate 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const info: ModuleSlugInfo = INDONESIAN_SLUGS[moduleKey] || {
    slugTitle: "Modul Operasional Nexora",
    category: "Layanan Operasional",
    summaryId: "Pelaksanaan tugas dan simulasi operasional kerja.",
    tipsAndTricks: ["Patuhi standar SOP dan catat hasil deliverable dengan teliti."],
    instantTemplates: []
  };

  return (
    <div className="relative border border-neutral-200/90 bg-white rounded-xl p-3 sm:p-3.5 text-xs text-neutral-900 shadow-xs mb-4">
      {/* Top Bar Slug Indicator */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 bg-neutral-950 text-white rounded-md tracking-wider">
            SLUG ID
          </span>
          <span className="font-bold text-neutral-900 tracking-tight text-xs sm:text-sm">
            {info.slugTitle}
          </span>
          <span className="text-[11px] text-neutral-500 hidden sm:inline">
            • {info.category}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1.5 font-semibold text-neutral-800 hover:text-black bg-neutral-100 hover:bg-neutral-200/80 px-2.5 py-1 rounded-lg text-xs transition-colors"
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
          <span>{isOpen ? 'Tutup Panduan' : 'Tips & Trik Solusi'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expandable Indonesian Tips & Instant Template Area */}
      {isOpen && (
        <div className="mt-3 pt-3 border-t border-neutral-100 space-y-3 animate-in fade-in duration-150">
          <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200/60">
            <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider block mb-1">
              Ringkasan Modul (Bahasa Indonesia):
            </span>
            <p className="text-neutral-700 leading-relaxed text-xs">
              {info.summaryId}
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider block mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-neutral-700" />
              Tips & Trik Pengerjaan Praktis (Klik & Selesai):
            </span>
            <ul className="space-y-1.5 text-xs text-neutral-700">
              {info.tipsAndTricks.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-neutral-400 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instant Auto-Fill Buttons if available */}
          {info.instantTemplates && info.instantTemplates.length > 0 && onApplyTemplate && (
            <div className="pt-2.5 border-t border-neutral-100 space-y-2">
              <span className="text-[10px] uppercase font-bold text-neutral-900 tracking-wider block">
                1-Klik Solusi Otomatis (Tanpa Perlu Ketik Manual):
              </span>
              <div className="flex flex-wrap gap-2">
                {info.instantTemplates.map((tmpl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onApplyTemplate(tmpl.content, tmpl.fileName)}
                    className="px-3 py-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-900 hover:text-white text-neutral-900 font-semibold text-xs shadow-2xs transition-all hover:border-neutral-900"
                  >
                    + {tmpl.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
