import React from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  ClipboardList, 
  Inbox, 
  FileSpreadsheet, 
  MessageSquare, 
  Users, 
  FileText, 
  ShieldCheck, 
  Briefcase, 
  Award
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, metrics, tickets } = useAcademy();

  const navItems = [
    { id: 'dashboard', label: 'Employee Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'courses', label: '50-Course Curriculum', icon: BookOpen, badge: '50' },
    { id: 'assignments', label: 'Workplace Task Engine', icon: ClipboardList, badge: metrics.pendingAssignments > 0 ? String(metrics.pendingAssignments) : null },
    { id: 'tickets', label: 'Support Ticket Desk', icon: Inbox, badge: String(tickets.filter(t => t.status === 'Open').length) },
    { id: 'spreadsheet', label: 'Spreadsheet Workspace', icon: FileSpreadsheet, badge: 'XLSX' },
    { id: 'chat', label: 'Live Chat Simulator', icon: MessageSquare, badge: null },
    { id: 'crm', label: 'Customer 360 CRM', icon: Users, badge: null },
    { id: 'sops', label: 'Knowledge Base & SOPs', icon: FileText, badge: '8 SOPs' },
    { id: 'manager', label: 'Manager Review Console', icon: ShieldCheck, badge: null },
    { id: 'internship', label: '5-Day Residency', icon: Briefcase, badge: '5 Days' },
    { id: 'portfolio', label: 'Certification & Portfolio', icon: Award, badge: null }
  ];

  return (
    <aside className="w-full lg:w-60 bg-white border-b lg:border-b-0 lg:border-r border-neutral-200 shrink-0">
      <div className="p-3 space-y-0.5 overflow-x-auto lg:overflow-x-visible flex lg:flex-col gap-1 lg:gap-0.5">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors text-left ${
                isActive
                  ? 'bg-neutral-900 text-white font-semibold'
                  : 'text-black hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-3.5 h-3.5 shrink-0 opacity-70" />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] font-mono ml-2 ${
                  isActive ? 'text-neutral-300' : 'text-neutral-500'
                }`}>
                  [{item.badge}]
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
