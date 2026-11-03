import React, { useState } from 'react';
import { COMPANY_SOPS, COMPANY_PROFILE } from '../../data/sopsData';
import { IndonesianSlugHeader } from '../common/IndonesianSlugHeader';
import { 
  FileText, 
  Search, 
  Building
} from 'lucide-react';

export const KnowledgeBase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSopId, setSelectedSopId] = useState<string>(COMPANY_SOPS[0].id);
  const [activeTab, setActiveTab] = useState<'sops' | 'company'>('sops');

  const selectedSop = COMPANY_SOPS.find(s => s.id === selectedSopId) || COMPANY_SOPS[0];

  const filteredSops = COMPANY_SOPS.filter(s => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q) ||
      s.department.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-5">
      {/* Top Banner - clean flat layout, black text */}
      <div className="bg-white border border-neutral-200 p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-black uppercase tracking-tight">Nexora Internal Knowledge Base & SOP Manual</h1>
            <p className="text-xs text-neutral-600">Corporate policies, standard operating procedures, escalation matrices & company guidelines</p>
          </div>

          <div className="lg:w-96 shrink-0">
            <IndonesianSlugHeader moduleKey="sops" />
          </div>
        </div>

        <div className="flex items-center gap-1.5 pt-2 border-t border-neutral-100">
          <button
            onClick={() => setActiveTab('sops')}
            className={`px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'sops'
                ? 'bg-black text-white'
                : 'text-black hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            SOPs (8 Documents)
          </button>
          <button
            onClick={() => setActiveTab('company')}
            className={`px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'company'
                ? 'bg-black text-white'
                : 'text-black hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            Company Profile & Structure
          </button>
        </div>
      </div>

      {activeTab === 'sops' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* SOP List (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-neutral-200 overflow-hidden">
            <div className="p-2.5 bg-neutral-50 border-b border-neutral-200">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search procedures..."
                className="w-full px-2.5 py-1 border border-neutral-300 text-xs bg-white text-black focus:outline-hidden focus:border-black"
              />
            </div>

            <div className="divide-y divide-neutral-200 max-h-[620px] overflow-y-auto">
              {filteredSops.map(sop => {
                const isSelected = sop.id === selectedSop?.id;
                return (
                  <div
                    key={sop.id}
                    onClick={() => setSelectedSopId(sop.id)}
                    className={`p-3 cursor-pointer transition-colors ${
                      isSelected ? 'bg-neutral-100 border-l-2 border-black' : 'hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-0.5">
                      <span className="font-mono font-bold text-black">{sop.code}</span>
                      <span className="text-neutral-500">Ver. {sop.version}</span>
                    </div>
                    <h4 className="text-xs font-bold text-black line-clamp-1 mb-0.5">{sop.title}</h4>
                    <p className="text-[11px] text-neutral-600 line-clamp-2">{sop.summary}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SOP Document Viewer (8 cols) */}
          {selectedSop && (
            <div className="lg:col-span-8 bg-white border border-neutral-200 p-5 space-y-5 text-black">
              {/* Header Strip */}
              <div className="pb-3 border-b border-neutral-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-1.5 py-0.5 bg-black text-white font-mono font-bold text-xs">
                    {selectedSop.id}
                  </span>
                  <span className="text-xs font-mono text-neutral-600 font-semibold">{selectedSop.code}</span>
                </div>
                <h2 className="text-base font-bold text-black">{selectedSop.title}</h2>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Department: {selectedSop.department} • Last Updated: {selectedSop.lastUpdated}
                </p>
              </div>

              {/* Scope & Summary */}
              <div className="p-3.5 bg-neutral-50 border border-neutral-200 space-y-1.5 text-xs text-black">
                <h4 className="font-bold text-black uppercase tracking-wide text-[11px]">Purpose & Scope</h4>
                <p className="text-black leading-relaxed font-normal">{selectedSop.summary}</p>
                <p className="text-neutral-600 text-[11px] pt-1">
                  <strong>Audience:</strong> {selectedSop.scope}
                </p>
              </div>

              {/* Procedure Steps */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-black uppercase tracking-wider">
                  Mandatory Execution Steps
                </h4>

                <div className="space-y-2.5">
                  {selectedSop.procedureSteps.map(step => (
                    <div key={step.stepNumber} className="p-3.5 border border-neutral-200 bg-white space-y-1.5 text-xs text-black">
                      <div className="flex items-center gap-2 font-bold text-black">
                        <span className="w-4 h-4 border border-black flex items-center justify-center font-mono text-[10px]">
                          {step.stepNumber}
                        </span>
                        <span>{step.title}</span>
                      </div>
                      <p className="text-black leading-relaxed pl-6 font-normal">{step.action}</p>
                      <div className="pl-6 pt-1 space-y-0.5">
                        <span className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider block">
                          Strict Compliance Rules:
                        </span>
                        <ul className="list-disc list-inside text-[11px] text-black space-y-0.5 font-normal">
                          {step.rules.map((rule, idx) => (
                            <li key={idx}>{rule}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Escalations & Exemptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-black">
                <div className="p-3 bg-neutral-50 border border-neutral-200 space-y-1.5">
                  <h4 className="font-bold uppercase tracking-wide text-[11px] text-black">
                    Escalation Triggers
                  </h4>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] font-normal">
                    {selectedSop.escalationRules.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-neutral-50 border border-neutral-200 space-y-1.5">
                  <h4 className="font-bold uppercase tracking-wide text-[11px] text-black">
                    Allowable Exemptions
                  </h4>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] font-normal">
                    {selectedSop.exemptions.map((ex, i) => (
                      <li key={i}>{ex}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Company Profile & Organization Tab */
        <div className="space-y-4 text-black text-xs">
          <div className="bg-white border border-neutral-200 p-5 space-y-5">
            <div className="pb-3 border-b border-neutral-200">
              <h2 className="text-base font-bold text-black uppercase">{COMPANY_PROFILE.name}</h2>
              <p className="text-xs text-neutral-600">{COMPANY_PROFILE.tagline}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-neutral-50 border border-neutral-200">
                <span className="text-neutral-500 block text-[10px] uppercase font-bold">Industry</span>
                <span className="font-semibold text-black">{COMPANY_PROFILE.industry}</span>
              </div>
              <div className="p-3 bg-neutral-50 border border-neutral-200">
                <span className="text-neutral-500 block text-[10px] uppercase font-bold">Workforce</span>
                <span className="font-semibold text-black">{COMPANY_PROFILE.workforceCount}</span>
              </div>
              <div className="p-3 bg-neutral-50 border border-neutral-200">
                <span className="text-neutral-500 block text-[10px] uppercase font-bold">Headquarters</span>
                <span className="font-semibold text-black">{COMPANY_PROFILE.headquarters}</span>
              </div>
              <div className="p-3 bg-neutral-50 border border-neutral-200">
                <span className="text-neutral-500 block text-[10px] uppercase font-bold">Core SLA Standard</span>
                <span className="font-semibold text-black">{COMPANY_PROFILE.slaStandard}</span>
              </div>
            </div>

            {/* Leadership */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-black uppercase tracking-wide">
                Executive Leadership & Operational Directors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {COMPANY_PROFILE.leadership.map((l, i) => (
                  <div key={i} className="p-3 bg-neutral-50 border border-neutral-200 space-y-0.5">
                    <div className="font-bold text-black">{l.name}</div>
                    <div className="text-[11px] text-black font-medium">{l.title}</div>
                    <div className="text-[10px] text-neutral-500 font-mono">{l.email}</div>
                    <div className="text-[10px] text-neutral-600 pt-0.5">{l.role}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Departments */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-black uppercase tracking-wide">
                Operational Departments
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COMPANY_PROFILE.departments.map((dept, i) => (
                  <div key={i} className="p-3 bg-neutral-50 border border-neutral-200 space-y-1">
                    <div className="flex justify-between font-bold text-black">
                      <span>{dept.name}</span>
                      <span className="text-neutral-500 text-[11px]">Lead: {dept.head}</span>
                    </div>
                    <p className="text-black text-[11px] leading-relaxed font-normal">{dept.scope}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
