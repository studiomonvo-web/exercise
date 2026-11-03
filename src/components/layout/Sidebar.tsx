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
    <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-neutral-200/80 shrink-0">
      <div className="p-3 lg:p-4 space-y-1 overflow-x-auto lg:overflow-x-visible flex lg:flex-col gap-1.5 lg:gap-1">
        <div className="hidden lg:block px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
          Navigation Menu
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 text-left ${
                isActive
                  ? 'bg-neutral-900 text-white font-semibold shadow-xs'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-white' : 'text-neutral-500'
                }`} />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ml-2 ${
                  isActive ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
