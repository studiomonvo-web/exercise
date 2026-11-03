import React, { useState } from 'react';
import { INDONESIAN_SLUGS, ModuleSlugInfo } from '../../data/indonesianSlugs';
import { ChevronDown, ChevronUp, HelpCircle, FileText } from 'lucide-react';

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
    <div className="relative border border-neutral-300 bg-neutral-50 p-2.5 text-xs text-black">
      {/* Top Bar Slug Indicator */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase font-bold border border-black px-1.5 py-0.2 bg-black text-white">
            SLUG ID
          </span>
          <span className="font-bold text-black uppercase tracking-tight text-xs">
            {info.slugTitle}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1 font-semibold text-black hover:underline text-[11px]"
        >
          <span>{isOpen ? 'Tutup Panduan' : 'Tips & Cara Pengerjaan'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expandable Indonesian Tips & Instant Template Area */}
      {isOpen && (
        <div className="mt-2.5 pt-2.5 border-t border-neutral-300 space-y-2.5 animate-in fade-in duration-150">
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider block mb-0.5">
              Ringkasan Modul (Bahasa Indonesia):
            </span>
            <p className="text-black font-normal leading-relaxed text-[11px]">
              {info.summaryId}
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider block mb-1">
              Tips & Trik Pengerjaan Praktis (Klik & Selesai):
            </span>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-black">
              {info.tipsAndTricks.map((tip, idx) => (
                <li key={idx} className="leading-relaxed">{tip}</li>
              ))}
            </ul>
          </div>

          {/* Instant Auto-Fill Buttons if available */}
          {info.instantTemplates && info.instantTemplates.length > 0 && onApplyTemplate && (
            <div className="pt-2 border-t border-neutral-200 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-black tracking-wider block">
                Klik untuk Auto-Fill Template Solusi (Tanpa Ketik Manual):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {info.instantTemplates.map((tmpl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onApplyTemplate(tmpl.content, tmpl.fileName)}
                    className="px-2.5 py-1 border border-black bg-white hover:bg-black hover:text-white text-black font-semibold text-[11px] transition-colors"
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
