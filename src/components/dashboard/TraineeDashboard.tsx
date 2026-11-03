import React from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { 
  Inbox, 
  ArrowRight,
  ClipboardList
} from 'lucide-react';

import { IndonesianSlugHeader } from '../common/IndonesianSlugHeader';

export const TraineeDashboard: React.FC = () => {
  const { 
    metrics, 
    assignments, 
    tickets, 
    currentUser, 
    setActiveTab, 
    setSelectedTicketId 
  } = useAcademy();

  // Find assignments needing action
  const urgentAssignments = assignments.filter(a => 
    a.status === 'Assigned' || a.status === 'In Progress' || a.status === 'Revision Required'
  ).slice(0, 3);

  // Find at-risk tickets
  const urgentTickets = tickets.filter(t => 
    t.status === 'Open' || t.status === 'Pending'
  ).slice(0, 3);

  return (
    <div className="space-y-5">
      {/* Top Welcome & Shift Status Banner with Indonesian Slug in Top Right */}
      <div className="bg-white border border-neutral-200 p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-black uppercase tracking-tight">{currentUser.name}</h1>
              <span className="text-xs font-mono text-neutral-600">[{currentUser.id}]</span>
            </div>
            <p className="text-xs text-neutral-600 mt-0.5">
              {currentUser.title} / {currentUser.department}
            </p>
          </div>

          {/* Indonesian Slug in Top Right */}
          <div className="lg:w-96 shrink-0">
            <IndonesianSlugHeader moduleKey="dashboard" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs font-medium text-black border border-neutral-300 px-3 py-1.5 bg-neutral-50">
            Status Shift: Aktif pada Queue #3 (Target CSAT ≥ 92%, SLA 100%)
          </div>
          <button
            onClick={() => setActiveTab('internship')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black hover:bg-neutral-800 text-white text-xs font-medium transition-colors"
          >
            5-Day Residency
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Stat Cards Grid - clean flat borders, black numbers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 bg-white border border-neutral-200 space-y-1">
          <span className="text-[11px] font-medium text-neutral-600 uppercase tracking-wider block">
            50-Course Progress
          </span>
          <div className="text-2xl font-bold font-mono text-black">
            {metrics.completedCourses} / 50
          </div>
          <div className="w-full bg-neutral-200 h-1 overflow-hidden">
            <div 
              className="bg-black h-1 transition-all duration-300" 
              style={{ width: `${metrics.courseProgressPercent}%` }}
            />
          </div>
          <span className="text-[10px] text-neutral-500 block pt-0.5">{metrics.courseProgressPercent}% Complete</span>
        </div>

        <div className="p-4 bg-white border border-neutral-200 space-y-1">
          <span className="text-[11px] font-medium text-neutral-600 uppercase tracking-wider block">
            Average QA Score
          </span>
          <div className="text-2xl font-bold font-mono text-black">
            {metrics.qaAverageScore} <span className="text-sm font-normal text-neutral-500">/ 100</span>
          </div>
          <span className="text-[10px] text-neutral-500 font-medium block">Benchmark: 88%</span>
        </div>

        <div className="p-4 bg-white border border-neutral-200 space-y-1">
          <span className="text-[11px] font-medium text-neutral-600 uppercase tracking-wider block">
            SLA Compliance
          </span>
          <div className="text-2xl font-bold font-mono text-black">
            {metrics.slaComplianceRate}%
          </div>
          <span className="text-[10px] text-neutral-500 font-medium block">First Response & Resolution</span>
        </div>

        <div className="p-4 bg-white border border-neutral-200 space-y-1">
          <span className="text-[11px] font-medium text-neutral-600 uppercase tracking-wider block">
            Customer CSAT
          </span>
          <div className="text-2xl font-bold font-mono text-black">
            {metrics.averageCSAT} <span className="text-sm font-normal text-neutral-500">/ 5.0</span>
          </div>
          <span className="text-[10px] text-neutral-500 font-medium block">Customer Sentiment</span>
        </div>

        <div className="p-4 bg-white border border-neutral-200 space-y-1">
          <span className="text-[11px] font-medium text-neutral-600 uppercase tracking-wider block">
            Work Orders
          </span>
          <div className="text-2xl font-bold font-mono text-black">
            {metrics.approvedAssignments} <span className="text-sm font-normal text-neutral-500">/ {metrics.totalAssignments}</span>
          </div>
          <span className="text-[10px] text-neutral-500 font-medium block">{metrics.pendingAssignments} Action Required</span>
        </div>

        <div className="p-4 bg-white border border-neutral-200 space-y-1">
          <span className="text-[11px] font-medium text-neutral-600 uppercase tracking-wider block">
            Tickets Resolved
          </span>
          <div className="text-2xl font-bold font-mono text-black">
            {metrics.ticketsResolved} <span className="text-sm font-normal text-neutral-500">/ {metrics.totalTickets}</span>
          </div>
          <span className="text-[10px] text-neutral-500 font-medium block">{metrics.ticketResolutionRate}% Resolution Rate</span>
        </div>
      </div>

      {/* Main 2-Column Split: Active Tasks & Queued Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Pending Work Orders */}
        <div className="bg-white border border-neutral-200 p-5 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <h3 className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
              <ClipboardList className="w-3.5 h-3.5 text-black" />
              Pending Work Orders
            </h3>
            <button
              onClick={() => setActiveTab('assignments')}
              className="text-xs font-medium text-black hover:underline"
            >
              View All ({assignments.length}) →
            </button>
          </div>

          <div className="space-y-2">
            {urgentAssignments.map(a => (
              <div
                key={a.id}
                onClick={() => setActiveTab('assignments')}
                className="p-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 cursor-pointer transition-colors space-y-1"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-black">{a.id}</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-mono border border-neutral-300 text-black uppercase">
                    {a.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-black line-clamp-1">{a.title}</h4>
                <div className="flex items-center justify-between text-[11px] text-neutral-600 pt-0.5">
                  <span>{a.department}</span>
                  <span className="font-mono">Due: {a.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ingested Customer Queue */}
        <div className="bg-white border border-neutral-200 p-5 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <h3 className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
              <Inbox className="w-3.5 h-3.5 text-black" />
              Incoming Support Queue
            </h3>
            <button
              onClick={() => setActiveTab('tickets')}
              className="text-xs font-medium text-black hover:underline"
            >
              Open Ticket Desk ({tickets.length}) →
            </button>
          </div>

          <div className="space-y-2">
            {urgentTickets.map(t => (
              <div
                key={t.id}
                onClick={() => {
                  setSelectedTicketId(t.id);
                  setActiveTab('tickets');
                }}
                className="p-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 cursor-pointer transition-colors space-y-1"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-black">{t.id}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 text-[10px] font-mono border border-neutral-300 text-black uppercase">
                      {t.priority}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-700 font-semibold">
                      {t.slaRemainingMinutes}m SLA left
                    </span>
                  </div>
                </div>
                <h4 className="text-xs font-bold text-black line-clamp-1">{t.issueCategory}</h4>
                <p className="text-[11px] text-neutral-600 line-clamp-1">
                  Customer: {t.customerName} ({t.customerTier})
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corporate Simulation Notice - clean flat bar, black text */}
      <div className="p-3 bg-white border border-neutral-200 text-black text-xs flex items-center justify-between">
        <span className="text-neutral-700">
          <strong>Notice:</strong> All customer records, tracking IDs, and corporate incidents are simulated for training and job readiness assessment.
        </span>
        <button
          onClick={() => setActiveTab('courses')}
          className="text-xs font-bold text-black hover:underline whitespace-nowrap ml-4"
        >
          View Full 50-Course Curriculum →
        </button>
      </div>
    </div>
  );
};
