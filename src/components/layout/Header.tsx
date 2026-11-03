import React from 'react';
import { useAcademy, ROLE_PROFILES } from '../../context/AcademyContext';
import { UserRole } from '../../types/academy';
import { RotateCcw } from 'lucide-react';

export const Header: React.FC = () => {
  const { role, setRole, currentUser, resetAllData } = useAcademy();

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Clean text branding - strictly no logo, no emoji, black text */}
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-sm sm:text-base text-black tracking-tight uppercase">
            Nexora Customer Operations
          </span>
          <span className="text-xs text-neutral-500 font-normal hidden sm:inline">
            / Training & Simulation
          </span>
        </div>

        {/* Right Section: Role Switcher & Controls */}
        <div className="flex items-center gap-4">
          {/* Quick Role Switcher */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-neutral-500 mr-1 hidden md:inline">
              Role:
            </span>
            {(['trainee', 'manager', 'admin'] as UserRole[]).map((r) => {
              const isActive = role === r;
              return (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-2.5 py-1 text-xs capitalize transition-colors ${
                    isActive
                      ? 'bg-black text-white font-semibold'
                      : 'text-black hover:bg-neutral-100 font-normal'
                  }`}
                >
                  {r}
                </button>
              );
            })}
          </div>

          {/* User profile info - clean text, black text */}
          <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-neutral-200 text-xs">
            <span className="font-semibold text-black">{currentUser.name}</span>
            <span className="text-neutral-500 font-mono text-[11px]">({currentUser.id})</span>
          </div>

          {/* Reset Demo Data Button */}
          <button
            onClick={() => {
              if (window.confirm("Reset all training assignments, tickets, and spreadsheets to initial demonstration state?")) {
                resetAllData();
              }
            }}
            title="Reset Workspace State"
            className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
