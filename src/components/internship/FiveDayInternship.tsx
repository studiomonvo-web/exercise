import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { InternshipDay } from '../../types/academy';
import { IndonesianSlugHeader } from '../common/IndonesianSlugHeader';

export const FiveDayInternship: React.FC = () => {
  const { 
    internshipDays, 
    toggleInternshipTask, 
    updateInternshipDay, 
    role, 
    currentUser,
    setActiveTab 
  } = useAcademy();

  const [activeDayNumber, setActiveDayNumber] = useState<number>(1);
  const activeDay = internshipDays.find(d => d.dayNumber === activeDayNumber) || internshipDays[0];

  const [handoverNoteInput, setHandoverNoteInput] = useState<string>(activeDay.shiftHandoverNotes || '');
  const [managerScoreInput, setManagerScoreInput] = useState<number>(activeDay.managerScore || 90);
  const [managerFeedbackInput, setManagerFeedbackInput] = useState<string>(activeDay.managerFeedback || '');
  const [savedBanner, setSavedBanner] = useState<boolean>(false);

  const handleDaySelect = (dayNum: number) => {
    setActiveDayNumber(dayNum);
    const day = internshipDays.find(d => d.dayNumber === dayNum) || internshipDays[0];
    setHandoverNoteInput(day.shiftHandoverNotes || '');
    setManagerScoreInput(day.managerScore || 90);
    setManagerFeedbackInput(day.managerFeedback || '');
    setSavedBanner(false);
  };

  const handleSaveHandover = (e: React.FormEvent) => {
    e.preventDefault();
    updateInternshipDay(activeDayNumber, {
      shiftHandoverNotes: handoverNoteInput
    });
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  const handleManagerSignOff = () => {
    updateInternshipDay(activeDayNumber, {
      managerSignOff: true,
      managerScore: managerScoreInput,
      managerFeedback: managerFeedbackInput || "Shift verified. Exemplary adherence and accurate case documentation."
    });
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  const signedOffCount = internshipDays.filter(d => d.managerSignOff).length;

  return (
    <div className="space-y-5">
      {/* Top Banner - clean flat layout, black text */}
      <div className="bg-white border border-neutral-200 p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-black uppercase tracking-tight">5-Day Corporate Residency & Internship Simulation</h1>
            <p className="text-xs text-neutral-600">Operational workweek representing an actual remote customer operations specialist schedule</p>
          </div>

          <div className="lg:w-96 shrink-0">
            <IndonesianSlugHeader 
              moduleKey="internship" 
              onApplyTemplate={(content) => setHandoverNoteInput(content)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="text-xs font-bold text-black uppercase tracking-wide">Manager Sign-offs:</div>
            <div className="text-xs font-bold font-mono text-black">{signedOffCount} of 5 Shifts Certified</div>
          </div>
          <button
            onClick={() => setActiveTab('portfolio')}
            className="px-3.5 py-1.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold transition-colors"
          >
            View Official Credential
          </button>
        </div>
      </div>

      {/* 5-Day Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {internshipDays.map(day => {
          const isSelected = day.dayNumber === activeDayNumber;
          const completedCount = day.targetTasks.filter(t => t.completed).length;

          return (
            <button
              key={day.dayNumber}
              onClick={() => handleDaySelect(day.dayNumber)}
              className={`p-3 border text-left transition-colors ${
                isSelected 
                  ? 'bg-black text-white border-black font-semibold' 
                  : 'bg-white hover:bg-neutral-50 border-neutral-200 text-black'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1 font-mono">
                <span>DAY 0{day.dayNumber}</span>
                {day.managerSignOff && <span>[PASS]</span>}
              </div>
              <h4 className="font-bold text-xs truncate">
                {day.dayTitle.split(': ')[1] || day.dayTitle}
              </h4>
              <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                {completedCount}/{day.targetTasks.length} Tasks
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Day Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Tasks Checklist (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 p-5 space-y-4 text-black text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider block">
                Shift Schedule • Day 0{activeDay.dayNumber}
              </span>
              <h3 className="text-base font-bold text-black">{activeDay.dayTitle}</h3>
              <p className="text-xs text-neutral-600 mt-0.5">{activeDay.focusArea}</p>
            </div>
            {activeDay.managerSignOff && (
              <span className="border border-neutral-400 px-2 py-0.5 font-mono text-[11px] font-bold">
                Certified
              </span>
            )}
          </div>

          {/* Task Items */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-black uppercase tracking-wide text-xs">
              Mandatory Shift Deliverables Checklist
            </h4>
            {activeDay.targetTasks.map(task => (
              <div
                key={task.id}
                onClick={() => toggleInternshipTask(activeDay.dayNumber, task.id)}
                className={`p-3 border cursor-pointer transition-colors flex items-start gap-2.5 ${
                  task.completed 
                    ? 'bg-neutral-100 border-neutral-300' 
                    : 'bg-white border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <div className="pt-0.5">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {}}
                    className="w-3.5 h-3.5 accent-black pointer-events-none"
                  />
                </div>
                <div className="space-y-0.5 flex-1">
                  <div className="font-bold flex items-center justify-between text-black">
                    <span className={task.completed ? 'line-through text-neutral-500' : ''}>
                      {task.title}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono">Evidence Required</span>
                  </div>
                  <p className="text-black font-normal leading-relaxed text-[11px]">
                    {task.description}
                  </p>
                  <div className="text-[10px] text-neutral-600 pt-0.5">
                    Target Proof: {task.evidenceNeeded}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Shift Handover & Evaluation (5 cols) */}
        <div className="lg:col-span-5 space-y-4 text-black text-xs">
          {/* Shift Handover Memo */}
          <div className="bg-white border border-neutral-200 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
              <h4 className="font-bold text-black uppercase tracking-wide">
                End-of-Shift Handover Memo (SOP-06)
              </h4>
              <span className="text-[10px] text-neutral-500">17:00 CST Cutoff</span>
            </div>

            <form onSubmit={handleSaveHandover} className="space-y-2.5">
              {/* 1-Click Handover Templates */}
              <div className="space-y-1.5 pb-2 border-b border-neutral-100">
                <span className="text-[11px] font-semibold text-neutral-600 block">
                  Tips & Template Cepat (Klik untuk Mengisi Otomatis):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setHandoverNoteInput(
                      "RINGKASAN SERAH TERIMA SHIFT OPERASIONAL (HANDOVER MEMO)\n\n" +
                      "1. Ringkasan Shift: 8 jam aktif pada Antrean Operasional. Total 18 tiket terselesaikan, 0 SLA breach, rata-rata respon 8.4 menit.\n" +
                      "2. Kasus Masih Berjalan (In-Flight): Tiket #NX-9011 (Marcus Brody) - Pesanan pengganti prioritas telah dibuat, menunggu nomor AWB dari FedEx Memphis.\n" +
                      "3. Kasus Risiko Tinggi: Akun David K. Vance (#NX-9015) telah dibekukan sementara menunggu verifikasi identitas 3-poin.\n" +
                      "4. Catatan untuk Shift Berikutnya: Stok SKU NX-GEAR-09 di gudang Chicago menipis, prioritaskan gudang Dallas untuk pesanan baru."
                    )}
                    className="text-[10px] bg-neutral-100 hover:bg-neutral-200 text-black border border-neutral-300 px-2 py-1 font-medium transition-colors"
                  >
                    + Format Memo Resmi Shift (SOP-06)
                  </button>
                  <button
                    type="button"
                    onClick={() => setHandoverNoteInput(
                      "LOG ESKALASI & TINDAK LANJUT RESIKO OPERASIONAL\n\n" +
                      "1. Eskalasi Eskalasi Direksi: 2 kasus transaksi berulang telah dialihkan ke Finance Lead (Sarah Jenkins).\n" +
                      "2. Status Investigasi Kurir: Klaim klaim barang rusak $129.99 diajukan ke UPS Express (Claim Ref: #UPS-8849-CL).\n" +
                      "3. Rekomendasi QA: Disarankan untuk memperbarui draft makro refund otomatis karena ada pembaruan biaya retur $4.50."
                    )}
                    className="text-[10px] bg-neutral-100 hover:bg-neutral-200 text-black border border-neutral-300 px-2 py-1 font-medium transition-colors"
                  >
                    + Log Eskalasi & Resiko Kritis
                  </button>
                </div>
              </div>

              <textarea
                rows={4}
                value={handoverNoteInput}
                onChange={(e) => setHandoverNoteInput(e.target.value)}
                placeholder="Log shift summary: Total tickets resolved, pending carrier traces, open high-risk cases..."
                className="w-full p-2.5 border border-neutral-300 text-xs text-black leading-relaxed focus:outline-hidden focus:border-black bg-white"
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-neutral-600">Author: {currentUser.name}</span>
                <button
                  type="submit"
                  className="px-3 py-1 bg-black hover:bg-neutral-800 text-white text-xs font-semibold transition-colors"
                >
                  Save Handover
                </button>
              </div>
            </form>

            {savedBanner && (
              <div className="p-2 bg-neutral-100 border border-neutral-300 text-black text-xs">
                Shift status & notes updated successfully.
              </div>
            )}
          </div>

          {/* Manager Evaluation Card */}
          <div className="bg-neutral-50 border border-neutral-300 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
              <h4 className="font-bold text-black uppercase tracking-wide">
                Executive Shift Certification
              </h4>
              <span className="text-[10px] text-neutral-600">Sarah Jenkins, Director</span>
            </div>

            {role === 'manager' || role === 'admin' ? (
              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-black mb-1">
                    Shift Score (0 - 100):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={managerScoreInput}
                    onChange={(e) => setManagerScoreInput(parseInt(e.target.value, 10))}
                    className="w-full px-2.5 py-1 border border-neutral-300 text-xs font-mono font-bold bg-white text-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-black mb-1">
                    Manager Review Feedback:
                  </label>
                  <textarea
                    rows={3}
                    value={managerFeedbackInput}
                    onChange={(e) => setManagerFeedbackInput(e.target.value)}
                    placeholder="Enter executive feedback for this shift..."
                    className="w-full p-2 border border-neutral-300 text-xs text-black bg-white focus:outline-hidden"
                  />
                </div>

                <button
                  onClick={handleManagerSignOff}
                  className="w-full py-1.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold transition-colors"
                >
                  Sign Off & Certify Shift {activeDay.dayNumber}
                </button>
              </div>
            ) : (
              <div className="space-y-1.5 text-xs text-black">
                {activeDay.managerSignOff ? (
                  <div className="p-2.5 bg-white border border-neutral-300 space-y-1">
                    <div className="flex justify-between font-bold text-black">
                      <span>Certified by Sarah Jenkins</span>
                      <span className="font-mono">{activeDay.managerScore} / 100</span>
                    </div>
                    <p className="italic text-neutral-800 text-[11px]">"{activeDay.managerFeedback}"</p>
                  </div>
                ) : (
                  <p className="text-neutral-600 text-xs">
                    Shift pending supervisor sign-off. Submit the End-of-Shift memo and verify all checklist items.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
