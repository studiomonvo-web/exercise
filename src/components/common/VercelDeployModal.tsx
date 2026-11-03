import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, Terminal, Globe, CloudUpload, ArrowRight, ShieldCheck } from 'lucide-react';

interface VercelDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VercelDeployModal: React.FC<VercelDeployModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: "Opsi 1: Deploy Otomatis via Vercel CLI (Super Cepat 30 Detik)",
      description: "Jalankan perintah ini langsung di terminal proyek Anda. Vercel akan otomatis mendeteksi konfigurasi vercel.json & Vite kami:",
      command: "npx vercel",
      prodCommand: "npx vercel --prod",
    },
    {
      title: "Opsi 2: Integrasi Git / GitHub Auto-Deploy (Recommended for Production)",
      description: "Push repository ini ke GitHub / GitLab, lalu import di dashboard Vercel. Setiap git push akan otomatis build & deploy:",
      command: "git add . && git commit -m \"Ready for Vercel deploy\" && git push",
      prodCommand: null,
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-neutral-200 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-200 bg-neutral-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black">
              {/* Vercel Triangle Logo */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 1155 1000">
                <path d="M577.346 0L1154.69 1000H0L577.346 0Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-base text-white tracking-tight flex items-center gap-2">
                Integrasi Otomatis Vercel
                <span className="px-2 py-0.5 text-[11px] font-mono font-medium rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Ready & Configured
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                File vercel.json telah disiapkan lengkap dengan SPA rewrites, cache headers, dan build script
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Status banner */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-neutral-900 mt-0.5 shrink-0" />
            <div className="text-xs space-y-1">
              <span className="font-semibold text-neutral-900 block">
                Konfigurasi Vercel Siap Pakai (Zero Configuration Required)
              </span>
              <p className="text-neutral-600 leading-relaxed">
                Aplikasi telah dilengkapi dengan file <code className="font-mono bg-neutral-200 px-1 py-0.5 rounded text-neutral-900 font-semibold">vercel.json</code> yang menangani SPA client-side routing, Vite static asset optimization, dan script build <code className="font-mono bg-neutral-200 px-1 py-0.5 rounded text-neutral-900 font-semibold">npm run build</code>.
              </p>
            </div>
          </div>

          {/* Direct deploy link button */}
          <div className="p-4 rounded-xl border border-neutral-200 bg-white shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-semibold text-sm text-neutral-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-neutral-700" />
                Vercel Dashboard Import
              </h4>
              <p className="text-xs text-neutral-500">
                Buka Vercel untuk menghubungkan repository git Anda atau import langsung.
              </p>
            </div>
            <a
              href="https://vercel.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shrink-0 shadow-sm"
            >
              Buka Vercel.com
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Deployment Methods */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-500">
              Langkah Deploy Cepat
            </h4>

            {/* Option 1: CLI */}
            <div className="border border-neutral-200 rounded-xl p-4 bg-white shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-neutral-900 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-neutral-700" />
                  Metode 1: Deploy dengan Vercel CLI
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">Terminal Shell</span>
              </div>
              <p className="text-xs text-neutral-600">
                Cukup jalankan satu perintah berikut di folder proyek Anda:
              </p>

              {/* Code snippet 1 */}
              <div className="bg-neutral-950 text-neutral-100 rounded-lg p-3 text-xs font-mono flex items-center justify-between gap-3">
                <span className="truncate">$ npx vercel</span>
                <button
                  onClick={() => copyToClipboard('npx vercel', 1)}
                  className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] flex items-center gap-1 transition-colors shrink-0"
                >
                  {copiedIndex === 1 ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedIndex === 1 ? 'Tersalin' : 'Salin'}
                </button>
              </div>

              <p className="text-[11px] text-neutral-500">
                Untuk deploy langsung ke URL domain produksi (Production):
              </p>
              <div className="bg-neutral-950 text-neutral-100 rounded-lg p-3 text-xs font-mono flex items-center justify-between gap-3">
                <span className="truncate">$ npx vercel --prod</span>
                <button
                  onClick={() => copyToClipboard('npx vercel --prod', 2)}
                  className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] flex items-center gap-1 transition-colors shrink-0"
                >
                  {copiedIndex === 2 ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedIndex === 2 ? 'Tersalin' : 'Salin'}
                </button>
              </div>
            </div>

            {/* Option 2: Git */}
            <div className="border border-neutral-200 rounded-xl p-4 bg-white shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-neutral-900 flex items-center gap-2">
                  <CloudUpload className="w-4 h-4 text-neutral-700" />
                  Metode 2: Push ke GitHub & Auto Deploy
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">Continuous Deployment</span>
              </div>
              <p className="text-xs text-neutral-600">
                Jika sudah terhubung ke GitHub / GitLab:
              </p>

              <div className="bg-neutral-950 text-neutral-100 rounded-lg p-3 text-xs font-mono flex items-center justify-between gap-3">
                <span className="truncate">git add . && git commit -m "Deploy to Vercel" && git push</span>
                <button
                  onClick={() => copyToClipboard('git add . && git commit -m "Deploy to Vercel" && git push', 3)}
                  className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] flex items-center gap-1 transition-colors shrink-0"
                >
                  {copiedIndex === 3 ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedIndex === 3 ? 'Tersalin' : 'Salin'}
                </button>
              </div>
              <p className="text-[11px] text-neutral-500">
                Vercel akan otomatis mendeteksi branch main dan melakukan build Vite serta menerbitkan website live dengan SSL gratis.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            vercel.json: configured
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-black text-white text-xs font-medium transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
