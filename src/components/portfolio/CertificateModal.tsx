import React, { useRef } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { IndonesianSlugHeader } from '../common/IndonesianSlugHeader';
import { 
  Printer, 
  FileSpreadsheet, 
  Inbox, 
  FileText
} from 'lucide-react';

export const CertificateModal: React.FC = () => {
  const { metrics, currentUser } = useAcademy();
  const certRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const completedCount = metrics.completedCourses;
  const avgScore = metrics.averageScore || 94;

  return (
    <div className="space-y-5">
      {/* Top Banner - clean flat layout, black text */}
      <div className="bg-white border border-neutral-200 p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-black uppercase tracking-tight">Professional Operational Certification & Portfolio</h1>
            <p className="text-xs text-neutral-600">Verifiable corporate credential and portfolio evidence for remote customer operations roles</p>
          </div>

          <div className="lg:w-96 shrink-0">
            <IndonesianSlugHeader moduleKey="portfolio" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
          <div className="text-xs text-neutral-600">
            Status Kredensial: <span className="font-bold text-black">Terakreditasi Nexora QA Matrix</span>
          </div>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Save Certificate PDF
          </button>
        </div>
      </div>

      {/* Official Certificate Card - clean, high-contrast, black text */}
      <div 
        ref={certRef}
        className="bg-white border-2 border-black p-8 sm:p-12 text-center space-y-6 text-black"
      >
        {/* Certificate Header */}
        <div className="space-y-1.5">
          <div className="text-black font-bold uppercase tracking-widest text-xs">
            Nexora Customer Operations Academy • Global Remote Residency
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-black font-serif tracking-tight">
            Certificate of Operational Competence
          </h2>
          <p className="text-xs uppercase tracking-wider text-neutral-600 font-mono">
            Credential ID: NX-CERT-2026-8849-AUTH • Issued {new Date().toISOString().split('T')[0]}
          </p>
        </div>

        {/* Recipient */}
        <div className="py-3 space-y-1.5">
          <p className="text-xs text-neutral-600 italic">This is officially presented to attest that</p>
          <div className="text-2xl sm:text-3xl font-bold text-black font-serif border-b border-black pb-2 inline-block px-8">
            {currentUser.name}
          </div>
          <p className="text-xs text-neutral-700 font-mono pt-1">
            Trainee ID: {currentUser.id} • {currentUser.cohort || 'Cohort 14 (Americas Remote Operations)'}
          </p>
        </div>

        {/* Statement of Achievement */}
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-black leading-relaxed font-normal">
          has successfully fulfilled the 50-course curriculum and 5-Day Workplace Simulation. Demonstrating verified mastery in omnichannel ticket desk resolution, advanced Excel & Google Sheets operations, the HEAT de-escalation framework, GDPR/PCI-DSS privacy compliance, e-commerce order management, and operational KPI reporting.
        </p>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2 text-xs">
          <div className="p-3 bg-neutral-50 border border-neutral-300">
            <span className="text-[10px] text-neutral-500 block uppercase font-bold">Residency Score</span>
            <span className="text-base font-bold font-mono text-black">{avgScore} / 100 pts</span>
          </div>
          <div className="p-3 bg-neutral-50 border border-neutral-300">
            <span className="text-[10px] text-neutral-500 block uppercase font-bold">SLA Adherence</span>
            <span className="text-base font-bold font-mono text-black">{metrics.slaComplianceRate}% Verified</span>
          </div>
          <div className="p-3 bg-neutral-50 border border-neutral-300">
            <span className="text-[10px] text-neutral-500 block uppercase font-bold">CSAT Average</span>
            <span className="text-base font-bold font-mono text-black">{metrics.averageCSAT} / 5.0</span>
          </div>
          <div className="p-3 bg-neutral-50 border border-neutral-300">
            <span className="text-[10px] text-neutral-500 block uppercase font-bold">Courses Completed</span>
            <span className="text-base font-bold font-mono text-black">{completedCount} of 50</span>
          </div>
        </div>

        {/* Signatures */}
        <div className="pt-8 grid grid-cols-2 gap-8 max-w-xl mx-auto border-t border-neutral-300 text-xs text-black">
          <div className="space-y-0.5">
            <div className="font-serif italic text-base text-black">Sarah Jenkins</div>
            <div className="font-bold text-black text-[11px]">Sarah Jenkins</div>
            <div className="text-[10px] text-neutral-600">Senior Director of Operations & QA Lead</div>
          </div>

          <div className="space-y-0.5">
            <div className="font-serif italic text-base text-black">Marcus Vance</div>
            <div className="font-bold text-black text-[11px]">Marcus Vance</div>
            <div className="text-[10px] text-neutral-600">Vice President of Operations & Academy Dean</div>
          </div>
        </div>
      </div>

      {/* Trainee Work Portfolio Dossier */}
      <div className="bg-white border border-neutral-200 p-5 space-y-4 text-black text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
          <div>
            <h3 className="text-sm font-bold text-black uppercase tracking-wide">Trainee Professional Work Portfolio</h3>
            <p className="text-xs text-neutral-600">Documented workplace deliverables for employment verification</p>
          </div>
          <span className="border border-neutral-300 px-2 py-0.5 font-mono text-[11px] font-bold">
            Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-neutral-50 border border-neutral-200 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-black">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Customer Cleansing & KPI Workbook</span>
            </div>
            <p className="text-black text-[11px] leading-relaxed font-normal">
              Applied SUM, COUNTA, and AVERAGE across 25 accounts. Standardized customer contact records and computed VIP revenue metrics.
            </p>
            <div className="text-[10px] font-mono text-neutral-500">nexora_customer_database_cleansed_master.xlsx</div>
          </div>

          <div className="p-3.5 bg-neutral-50 border border-neutral-200 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-black">
              <Inbox className="w-3.5 h-3.5" />
              <span>HEAT De-escalation Case File #NX-9011</span>
            </div>
            <p className="text-black text-[11px] leading-relaxed font-normal">
              Calmed agitated VIP customer Marcus Brody facing delayed $899 monitor. Defused chargeback threat with priority replacement.
            </p>
            <div className="text-[10px] font-mono text-neutral-500">heat_resolution_case_marcus_brody.docx</div>
          </div>

          <div className="p-3.5 bg-neutral-50 border border-neutral-200 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-black">
              <FileText className="w-3.5 h-3.5" />
              <span>PII Security Audit & Refusal Script</span>
            </div>
            <p className="text-black text-[11px] leading-relaxed font-normal">
              Audited 5 customer transcripts under SOP-05. Flagged CVV violations and drafted approved third-party verification refusal standard.
            </p>
            <div className="text-[10px] font-mono text-neutral-500">pii_transcript_audit_matrix_v1.xlsx</div>
          </div>
        </div>
      </div>
    </div>
  );
};
