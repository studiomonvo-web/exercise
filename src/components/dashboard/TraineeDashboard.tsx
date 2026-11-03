import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { 
  Inbox, 
  ArrowRight,
  ClipboardList,
  Sparkles,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

import { IndonesianSlugHeader } from '../common/IndonesianSlugHeader';
import { UserProfileModal } from '../common/UserProfileModal';

export const TraineeDashboard: React.FC = () => {
  const { 
    metrics, 
    assignments, 
    tickets, 
    currentUser, 
    setActiveTab, 
    setSelectedTicketId 
  } = useAcademy();

  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Find assignments needing action
  const urgentAssignments = assignments.filter(a => 
    a.status === 'Assigned' || a.status === 'In Progress' || a.status === 'Revision Required'
  ).slice(0, 3);

  // Find at-risk tickets
  const urgentTickets = tickets.filter(t => 
    t.status === 'Open' || t.status === 'Pending'
  ).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Top Welcome & Shift Status Banner with Indonesian Slug in Top Right */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 pb-5 border-b border-neutral-100">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight">
                {currentUser.name}
              </h1>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 font-semibold">
                {currentUser.id}
              </span>
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-neutral-200 hover:border-neutral-950 bg-white hover:bg-neutral-950 hover:text-white text-neutral-900 transition-all shadow-2xs"
              >
                Kustomisasi Profil
              </button>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1.5 font-medium">
              {currentUser.title} • {currentUser.department} • {currentUser.cohort}
            </p>
          </div>

          {/* Indonesian Slug in Top Right */}
          <div className="lg:w-96 shrink-0">
            <IndonesianSlugHeader moduleKey="dashboard" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs font-medium text-neutral-800 rounded-xl px-3.5 py-2 bg-neutral-50 border border-neutral-200/70 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            <span>Status Shift: Aktif pada Queue #3 (Target CSAT ≥ 92%, SLA 100%)</span>
          </div>
          <button
            onClick={() => setActiveTab('internship')}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-neutral-950 hover:bg-black text-white text-xs font-semibold rounded-xl transition-all shadow-xs hover:shadow-sm"
          >
            5-Day Residency
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Stat Cards Grid - refined rounded cards with modern typography */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="p-4 bg-white rounded-xl border border-neutral-200/80 shadow-xs space-y-2">
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
            Curriculum
          </span>
          <div className="text-2xl font-extrabold font-mono text-neutral-950">
            {metrics.completedCourses}<span className="text-sm font-normal text-neutral-400">/50</span>
          </div>
          <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-neutral-950 h-1.5 rounded-full transition-all duration-300" 
              style={{ width: `${metrics.courseProgressPercent}%` }}
            />
          </div>
          <span className="text-[10px] text-neutral-500 font-medium block">{metrics.courseProgressPercent}% Selesai</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-neutral-200/80 shadow-xs space-y-2">
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
            Average QA
          </span>
          <div className="text-2xl font-extrabold font-mono text-neutral-950">
            {metrics.qaAverageScore} <span className="text-sm font-normal text-neutral-400">/100</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
            <TrendingUp className="w-3 h-3" />
            <span>Benchmark: 88%</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-neutral-200/80 shadow-xs space-y-2">
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
            SLA Compliance
          </span>
          <div className="text-2xl font-extrabold font-mono text-neutral-950">
            {metrics.slaComplianceRate}%
          </div>
          <div className="flex items-center gap-1 text-[10px] text-neutral-500 font-medium">
            <Clock className="w-3 h-3" />
            <span>Resolution Rate</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-neutral-200/80 shadow-xs space-y-2">
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
            Customer CSAT
          </span>
          <div className="text-2xl font-extrabold font-mono text-neutral-950">
            {metrics.averageCSAT} <span className="text-sm font-normal text-neutral-400">/5.0</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
            <ShieldCheck className="w-3 h-3" />
            <span>High Satisfaction</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-neutral-200/80 shadow-xs space-y-2">
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
            Work Orders
          </span>
          <div className="text-2xl font-extrabold font-mono text-neutral-950">
            {metrics.approvedAssignments} <span className="text-sm font-normal text-neutral-400">/{metrics.totalAssignments}</span>
          </div>
          <span className="text-[10px] text-amber-700 font-medium block">{metrics.pendingAssignments} Action Required</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-neutral-200/80 shadow-xs space-y-2">
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
            Tickets Resolved
          </span>
          <div className="text-2xl font-extrabold font-mono text-neutral-950">
            {metrics.ticketsResolved} <span className="text-sm font-normal text-neutral-400">/{metrics.totalTickets}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-neutral-500 font-medium">
            <CheckCircle2 className="w-3 h-3 text-neutral-600" />
            <span>{metrics.ticketResolutionRate}% Rate</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Active Tasks & Queued Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Pending Work Orders */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-neutral-800" />
              Pending Work Orders
            </h3>
            <button
              onClick={() => setActiveTab('assignments')}
              className="text-xs font-semibold text-neutral-950 hover:underline inline-flex items-center gap-1"
            >
              Lihat Semua ({assignments.length}) →
            </button>
          </div>

          <div className="space-y-2.5">
            {urgentAssignments.map(a => (
              <div
                key={a.id}
                onClick={() => setActiveTab('assignments')}
                className="p-3.5 bg-neutral-50 hover:bg-neutral-100/90 rounded-xl border border-neutral-200/70 cursor-pointer transition-all space-y-1.5 hover:shadow-2xs"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-neutral-950">{a.id}</span>
                  <span className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-white border border-neutral-200 text-neutral-800 font-semibold uppercase">
                    {a.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">{a.title}</h4>
                <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-0.5 font-medium">
                  <span>{a.department}</span>
                  <span className="font-mono">Due: {a.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ingested Customer Queue */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
              <Inbox className="w-4 h-4 text-neutral-800" />
              Incoming Support Queue
            </h3>
            <button
              onClick={() => setActiveTab('tickets')}
              className="text-xs font-semibold text-neutral-950 hover:underline inline-flex items-center gap-1"
            >
              Buka Ticket Desk ({tickets.length}) →
            </button>
          </div>

          <div className="space-y-2.5">
            {urgentTickets.map(t => (
              <div
                key={t.id}
                onClick={() => {
                  setSelectedTicketId(t.id);
                  setActiveTab('tickets');
                }}
                className="p-3.5 bg-neutral-50 hover:bg-neutral-100/90 rounded-xl border border-neutral-200/70 cursor-pointer transition-all space-y-1.5 hover:shadow-2xs"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-neutral-950">{t.id}</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-white border border-neutral-200 text-neutral-800 font-semibold uppercase">
                      {t.priority}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-700 font-semibold">
                      {t.slaRemainingMinutes}m left
                    </span>
                  </div>
                </div>
                <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">{t.issueCategory}</h4>
                <p className="text-[11px] text-neutral-500 line-clamp-1 font-medium">
                  Customer: {t.customerName} ({t.customerTier})
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corporate Simulation Notice */}
      <div className="p-4 bg-white rounded-xl border border-neutral-200/80 text-neutral-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <span className="text-neutral-600 font-medium">
          <strong className="text-neutral-950">Notice:</strong> Semua data pelanggan, order tracking, dan skenario insiden merupakan simulasi resmi untuk evaluasi kesiapan kerja remote operations.
        </span>
        <button
          onClick={() => setActiveTab('courses')}
          className="text-xs font-bold text-neutral-950 hover:underline whitespace-nowrap"
        >
          Lihat Kurikulum 50 Kursus →
        </button>
      </div>

      {/* Profile Edit Modal */}
      <UserProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
    </div>
  );
};
