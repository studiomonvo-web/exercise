import React from 'react';
import { AcademyProvider, useAcademy } from './context/AcademyContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { TraineeDashboard } from './components/dashboard/TraineeDashboard';
import { CourseList } from './components/courses/CourseList';
import { TaskEngine } from './components/assignments/TaskEngine';
import { TicketDesk } from './components/tickets/TicketDesk';
import { SpreadsheetWorkspace } from './components/spreadsheet/SpreadsheetWorkspace';
import { LiveChatSimulator } from './components/chat/LiveChatSimulator';
import { CustomerDirectory } from './components/crm/CustomerDirectory';
import { KnowledgeBase } from './components/sop/KnowledgeBase';
import { ManagerPortal } from './components/manager/ManagerPortal';
import { FiveDayInternship } from './components/internship/FiveDayInternship';
import { CertificateModal } from './components/portfolio/CertificateModal';

const AcademyContent: React.FC = () => {
  const { activeTab } = useAcademy();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <TraineeDashboard />;
      case 'courses':
        return <CourseList />;
      case 'assignments':
        return <TaskEngine />;
      case 'tickets':
        return <TicketDesk />;
      case 'spreadsheet':
        return <SpreadsheetWorkspace />;
      case 'chat':
        return <LiveChatSimulator />;
      case 'crm':
        return <CustomerDirectory />;
      case 'sops':
        return <KnowledgeBase />;
      case 'manager':
        return <ManagerPortal />;
      case 'internship':
        return <FiveDayInternship />;
      case 'portfolio':
        return <CertificateModal />;
      default:
        return <TraineeDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans text-black">
      <Header />
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AcademyProvider>
      <AcademyContent />
    </AcademyProvider>
  );
}
