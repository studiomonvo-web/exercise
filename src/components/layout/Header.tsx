import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { UserRole } from '../../types/academy';
import { RotateCcw, User, CloudUpload } from 'lucide-react';
import { UserProfileModal } from '../common/UserProfileModal';
import { VercelDeployModal } from '../common/VercelDeployModal';

export const Header: React.FC = () => {
  const { role, setRole, currentUser, resetAllData } = useAcademy();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isVercelModalOpen, setIsVercelModalOpen] = useState<boolean>(false);

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md border-b border-neutral-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Clean text branding - strictly no logo, no emoji, black text */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base text-neutral-950 tracking-tight uppercase">
                Nexora Customer Operations
              </span>
              <span className="text-[11px] text-neutral-500 font-medium">
                Workplace Academy & Job Simulation
              </span>
            </div>
          </div>

          {/* Right Section: Vercel Deploy, Role Switcher & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Deploy to Vercel Action */}
            <button
              onClick={() => setIsVercelModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-black text-white text-xs font-semibold shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
              title="Integrasi & Panduan Deploy ke Vercel"
            >
              {/* Vercel icon */}
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 1155 1000">
                <path d="M577.346 0L1154.69 1000H0L577.346 0Z" />
              </svg>
              <span className="hidden sm:inline">Deploy Vercel</span>
              <span className="sm:hidden">Vercel</span>
            </button>

            {/* Modern Segmented Role Switcher */}
            <div className="flex items-center bg-neutral-100 p-1 rounded-xl border border-neutral-200/60 text-xs">
              {(['trainee', 'manager', 'admin'] as UserRole[]).map((r) => {
                const isActive = role === r;
                return (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`px-3 py-1 rounded-lg text-xs capitalize transition-all duration-150 ${
                      isActive
                        ? 'bg-white text-neutral-950 font-bold shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-950 font-medium'
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>

            {/* User profile info & Customization Trigger */}
            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-neutral-200">
              <div className="text-right hidden md:block">
                <span className="font-bold text-xs text-neutral-950 block leading-tight">{currentUser.name}</span>
                <span className="text-neutral-500 font-mono text-[10px] block">[{currentUser.id}]</span>
              </div>
              <button
                onClick={() => setIsProfileModalOpen(true)}
                title="Kustomisasi Profil Pengguna"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs border border-neutral-200 hover:border-neutral-400 bg-white hover:bg-neutral-50 text-neutral-800 font-medium transition-colors shadow-2xs"
              >
                <User className="w-3.5 h-3.5 text-neutral-500" />
                <span className="hidden sm:inline">Profil</span>
              </button>
            </div>

            {/* Reset Demo Data Button */}
            <button
              onClick={() => {
                if (window.confirm("Reset all training assignments, tickets, and spreadsheets to initial demonstration state?")) {
                  resetAllData();
                }
              }}
              title="Reset Workspace State"
              className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Profile Edit Modal */}
      <UserProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />

      {/* Vercel Deploy Modal */}
      <VercelDeployModal
        isOpen={isVercelModalOpen}
        onClose={() => setIsVercelModalOpen(false)}
      />
    </>
  );
};
