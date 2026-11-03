import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { Assignment, AssignmentStatus, TicketPriority } from '../../types/academy';
import { IndonesianSlugHeader } from '../common/IndonesianSlugHeader';
import { Eye, X } from 'lucide-react';

export const TaskEngine: React.FC = () => {
  const { 
    assignments, 
    role, 
    submitAssignment, 
    gradeAssignment
  } = useAcademy();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [activeModalAssignment, setActiveModalAssignment] = useState<Assignment | null>(null);

  // Trainee Submission Form State
  const [submissionText, setSubmissionText] = useState<string>('');
  const [attachedFile, setAttachedFile] = useState<string>('');

  // Manager Grading Form State
  const [scoreR1, setScoreR1] = useState<number>(22);
  const [scoreR2, setScoreR2] = useState<number>(22);
  const [scoreR3, setScoreR3] = useState<number>(21);
  const [scoreR4, setScoreR4] = useState<number>(20);
  const [managerComments, setManagerComments] = useState<string>('');
  const [correctionNotes, setCorrectionNotes] = useState<string>('');
  const [decision, setDecision] = useState<'Approved' | 'Revision Required' | 'Rejected'>('Approved');

  const filteredAssignments = assignments.filter(a => {
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && a.priority.toLowerCase() !== priorityFilter.toLowerCase()) return false;
    return true;
  });

  const openModal = (assignment: Assignment) => {
    setActiveModalAssignment(assignment);
    setSubmissionText(assignment.submission?.responseContent || '');
    setAttachedFile(assignment.submission?.attachedFileName || `${assignment.id.toLowerCase()}_deliverable.pdf`);
    
    if (assignment.managerEvaluation) {
      setManagerComments(assignment.managerEvaluation.managerFeedback);
      setCorrectionNotes(assignment.managerEvaluation.correctionNotes || '');
      setDecision(assignment.managerEvaluation.decision);
    } else {
      setScoreR1(22);
      setScoreR2(22);
      setScoreR3(22);
      setScoreR4(22);
      setManagerComments('Operational deliverable verified. Accurate calculations and compliant SOP citations.');
      setCorrectionNotes('');
      setDecision('Approved');
    }
  };

  const handleApplyQuickSolution = (type: 'memo' | 'refund' | 'general') => {
    if (!activeModalAssignment) return;

    if (type === 'memo') {
      setSubmissionText(
        `MEMORANDUM HASIL PENUGASAN OPERASIONAL (${activeModalAssignment.id})\nTUGAS: ${activeModalAssignment.title}\nDEPARTEMEN: ${activeModalAssignment.department}\n\n1. Latar Belakang & Instruksi:\nPenugasan telah dilaksanakan sesuai dengan target deliverable: ${activeModalAssignment.requiredOutput}.\n\n2. Tindakan Eksekusi:\n- Melakukan validasi menyeluruh terhadap alur operasional dan verifikasi kepatuhan SOP perusahaan.\n- Memastikan zero error pada pencatatan transaksi dan pelaporan tiket.\n\n3. Kesimpulan:\nSeluruh kriteria kelulusan terpenuhi dan berkas siap diaudit oleh Direktur Sarah Jenkins.`
      );
      setAttachedFile(`${activeModalAssignment.id.toLowerCase()}_laporan_lengkap.pdf`);
    } else if (type === 'refund') {
      setSubmissionText(
        `REKONSILIASI KASUS KEUANGAN & RETUR (SOP-01)\nORDER ID: ${activeModalAssignment.id}\n\n- Analisis Klaim: Verifikasi tanggal pembelian dalam batas 30 hari kalender.\n- Perhitungan Restocking Fee: Pemotongan $5.99 atau 10% untuk buyer remorse non-VIP.\n- Status Override: Kasus di atas $250.00 telah diajukan ke manajer operasional.\n- Audit Bukti: Foto barang rusak terverifikasi pada log kurir.`
      );
      setAttachedFile(`${activeModalAssignment.id.toLowerCase()}_reconciliation_sheet.xlsx`);
    } else {
      setSubmissionText(
        `DOKUMEN PENYELESAIAN TUGAS RESMI (${activeModalAssignment.id})\nJUDUL: ${activeModalAssignment.title}\n\nDengan ini disampaikan bahwa tugas telah tuntas dikerjakan dengan hasil akurat, kepatuhan nada komunikasi profesional (HEAT), dan bebas dari pelanggaran privasi data (SOP-05).`
      );
      setAttachedFile(`${activeModalAssignment.id.toLowerCase()}_deliverable.docx`);
    }
  };

  const handleSubmitTrainee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalAssignment || !submissionText.trim()) return;

    submitAssignment(activeModalAssignment.id, {
      responseContent: submissionText,
      attachedFileName: attachedFile || "work_deliverable.pdf",
      spreadsheetDataSummary: "Verified in Nexora Operations Workspace"
    });

    setActiveModalAssignment(null);
  };

  const handleManagerGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalAssignment) return;

    const total = scoreR1 + scoreR2 + scoreR3 + scoreR4;

    gradeAssignment(activeModalAssignment.id, {
      overallScore: total,
      rubricScores: [
        { criteriaId: "r1", name: "Operational Accuracy", score: scoreR1, maxPoints: 25 },
        { criteriaId: "r2", name: "Professional Tone", score: scoreR2, maxPoints: 25 },
        { criteriaId: "r3", name: "SOP Compliance", score: scoreR3, maxPoints: 25 },
        { criteriaId: "r4", name: "Problem Solving", score: scoreR4, maxPoints: 25 }
      ],
      managerFeedback: managerComments,
      correctionNotes: decision === 'Revision Required' ? correctionNotes : undefined,
      decision
    });

    setActiveModalAssignment(null);
  };

  return (
    <div className="space-y-5">
      {/* Top Banner with Indonesian Slug in Top Right */}
      <div className="bg-white border border-neutral-200 p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <h1 className="text-lg font-bold text-black uppercase tracking-tight">Workplace Task Engine (Work Orders)</h1>
            <p className="text-xs text-neutral-600">Operational assignments, deliverable audits, manager feedback & evaluation rubrics</p>
          </div>

          {/* Indonesian Slug in Top Right */}
          <div className="lg:w-96 shrink-0">
            <IndonesianSlugHeader moduleKey="assignments" />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs border border-neutral-300 px-2.5 py-1.5 bg-white text-black font-medium focus:outline-hidden"
          >
            <option value="all">Semua Status (All Statuses)</option>
            <option value="Assigned">Assigned (Ditugaskan)</option>
            <option value="In Progress">In Progress (Dikerjakan)</option>
            <option value="Submitted">Submitted (Diserahkan)</option>
            <option value="Revision Required">Revision Required (Revisi)</option>
            <option value="Approved">Approved (Lulus)</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="text-xs border border-neutral-300 px-2.5 py-1.5 bg-white text-black font-medium focus:outline-hidden"
          >
            <option value="all">Semua Prioritas</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
          </select>
        </div>
      </div>

      {/* Assignments Table - clean tabular format */}
      <div className="bg-white border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-neutral-50 text-neutral-600 border-b border-neutral-200 font-semibold uppercase text-[11px] tracking-wider">
                <th className="px-4 py-2.5">Order ID</th>
                <th className="px-4 py-2.5">Task Title & Course</th>
                <th className="px-4 py-2.5">Department</th>
                <th className="px-4 py-2.5">Priority</th>
                <th className="px-4 py-2.5">Due Date</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5 text-center">Score</th>
                <th className="px-4 py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredAssignments.map(a => {
                const score = a.managerEvaluation?.overallScore;
                return (
                  <tr key={a.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-black">
                      {a.id}
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-bold text-black line-clamp-1">{a.title}</div>
                      <div className="text-[11px] text-neutral-600 line-clamp-1">{a.courseTitle}</div>
                    </td>

                    <td className="px-4 py-3 text-neutral-800">
                      {a.department}
                    </td>

                    <td className="px-4 py-3">
                      <span className="px-1.5 py-0.5 text-[10px] font-mono border border-neutral-300 text-black uppercase">
                        {a.priority}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-black font-mono">
                      {a.dueDate}
                    </td>

                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 text-[10px] font-mono border border-neutral-300 text-black uppercase bg-white">
                        {a.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center">
                      {score !== undefined ? (
                        <span className="font-mono font-bold text-xs text-black">
                          {score}/100
                        </span>
                      ) : (
                        <span className="text-neutral-400 font-mono text-[11px]">—</span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => openModal(a)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 border border-neutral-300 hover:bg-neutral-100 text-black text-xs font-medium transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        {role === 'manager' ? 'Review & Grade' : 'Buka Tugas'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Work Order Modal */}
      {activeModalAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
          <div className="bg-white border border-neutral-300 w-full max-w-3xl max-h-[90vh] flex flex-col my-auto overflow-hidden text-black">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-black text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold border border-neutral-600 px-2 py-0.5 text-white">
                  {activeModalAssignment.id}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white line-clamp-1">
                    {activeModalAssignment.title}
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    {activeModalAssignment.courseTitle} • {activeModalAssignment.department}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModalAssignment(null)}
                className="p-1 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content - black text */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs text-black">
              
              {/* Indonesian Slug & Tips Bar inside Modal */}
              <IndonesianSlugHeader
                moduleKey="assignments"
                onApplyTemplate={(content, fileName) => {
                  setSubmissionText(content);
                  if (fileName) setAttachedFile(fileName);
                }}
              />

              {/* Task Details */}
              <div className="p-3.5 bg-neutral-50 border border-neutral-200 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-neutral-600 font-medium">
                  <span>Ditugaskan: {activeModalAssignment.assignedDate}</span>
                  <span className="font-bold text-black font-mono">Batas Waktu: {activeModalAssignment.dueDate}</span>
                </div>
                <p className="text-xs text-black leading-relaxed font-normal">
                  {activeModalAssignment.description}
                </p>
                <div className="pt-1.5 text-[11px] font-semibold text-black border-t border-neutral-200">
                  Target Output: {activeModalAssignment.requiredOutput}
                </div>
              </div>

              {/* Manager Evaluation Display */}
              {activeModalAssignment.managerEvaluation && (
                <div className="p-4 bg-white border border-neutral-400 space-y-2 text-black">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider">
                      Evaluasi Manajer: [{activeModalAssignment.managerEvaluation.decision}]
                    </span>
                    <span className="text-xs font-bold font-mono px-2 py-0.5 border border-black">
                      Skor: {activeModalAssignment.managerEvaluation.overallScore} / 100
                    </span>
                  </div>
                  <p className="italic text-black font-normal">
                    "{activeModalAssignment.managerEvaluation.managerFeedback}"
                  </p>
                  {activeModalAssignment.managerEvaluation.correctionNotes && (
                    <div className="p-2 border border-neutral-300 text-black text-[11px]">
                      <strong>Catatan Koreksi Manajer:</strong> {activeModalAssignment.managerEvaluation.correctionNotes}
                    </div>
                  )}
                </div>
              )}

              {/* TRAINEE VIEW */}
              {role === 'trainee' && (
                <form onSubmit={handleSubmitTrainee} className="space-y-3 p-4 border border-neutral-300 bg-neutral-50">
                  <h4 className="font-bold text-black text-xs uppercase tracking-wide">
                    Pengumpulan Deliverable Perintah Kerja
                  </h4>

                  {/* Quick Auto-fill buttons */}
                  <div className="p-2.5 bg-white border border-neutral-300 space-y-1.5">
                    <span className="text-[10px] font-bold text-black uppercase tracking-wider block">
                      Tips & Trik: Klik Tombol di Bawah untuk Mengisi Solusi Otomatis:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleApplyQuickSolution('memo')}
                        className="px-2.5 py-1 border border-black bg-neutral-100 hover:bg-black hover:text-white text-black font-semibold text-[11px] transition-colors"
                      >
                        + Masukkan Format Memo Resmi (.PDF)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyQuickSolution('refund')}
                        className="px-2.5 py-1 border border-black bg-neutral-100 hover:bg-black hover:text-white text-black font-semibold text-[11px] transition-colors"
                      >
                        + Masukkan Laporan Rekonsiliasi (.XLSX)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyQuickSolution('general')}
                        className="px-2.5 py-1 border border-black bg-neutral-100 hover:bg-black hover:text-white text-black font-semibold text-[11px] transition-colors"
                      >
                        + Masukkan Solusi Umum Terverifikasi
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-black mb-1">
                      Narasi Deliverable / Respons Kerja Trainee:
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={submissionText}
                      onChange={(e) => setSubmissionText(e.target.value)}
                      placeholder="Ketik laporan atau klik tombol otomatis di atas..."
                      className="w-full p-2.5 border border-neutral-300 text-xs text-black leading-relaxed focus:outline-hidden focus:border-black bg-white font-mono"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2">
                      <label className="text-[11px] font-semibold text-black">Nama File Lampiran:</label>
                      <input
                        type="text"
                        value={attachedFile}
                        onChange={(e) => setAttachedFile(e.target.value)}
                        className="px-2 py-1 border border-neutral-300 text-xs font-mono bg-white text-black"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold transition-colors"
                    >
                      Kirimkan Deliverable
                    </button>
                  </div>
                </form>
              )}

              {/* MANAGER VIEW */}
              {(role === 'manager' || role === 'admin') && (
                <form onSubmit={handleManagerGrade} className="space-y-4 p-4 border border-neutral-400 bg-neutral-50">
                  <h4 className="font-bold text-black text-xs uppercase tracking-wide">
                    Penilaian Rubrik & Keputusan Manajer
                  </h4>

                  {/* Submission preview */}
                  {activeModalAssignment.submission ? (
                    <div className="p-3 bg-white border border-neutral-300 text-xs space-y-1">
                      <div className="font-bold text-black">Hasil Pengumpulan Trainee ({activeModalAssignment.submission.submittedAt}):</div>
                      <p className="text-black whitespace-pre-line leading-relaxed font-normal">
                        {activeModalAssignment.submission.responseContent}
                      </p>
                      <div className="text-[11px] text-neutral-600 pt-1 font-mono">
                        Lampiran File: {activeModalAssignment.submission.attachedFileName}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-white border border-neutral-300 text-black text-xs">
                      Trainee belum mengumpulkan berkas tugas ini.
                    </div>
                  )}

                  {/* 4 Rubric Sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 bg-white border border-neutral-300 space-y-1">
                      <div className="flex justify-between font-bold text-black">
                        <span>1. Akurasi Operasional</span>
                        <span className="font-mono">{scoreR1} / 25 pts</span>
                      </div>
                      <input 
                        type="range" min="0" max="25" value={scoreR1} 
                        onChange={(e) => setScoreR1(parseInt(e.target.value, 10))}
                        className="w-full accent-black"
                      />
                    </div>

                    <div className="p-2.5 bg-white border border-neutral-300 space-y-1">
                      <div className="flex justify-between font-bold text-black">
                        <span>2. Nada Komunikasi & HEAT</span>
                        <span className="font-mono">{scoreR2} / 25 pts</span>
                      </div>
                      <input 
                        type="range" min="0" max="25" value={scoreR2} 
                        onChange={(e) => setScoreR2(parseInt(e.target.value, 10))}
                        className="w-full accent-black"
                      />
                    </div>

                    <div className="p-2.5 bg-white border border-neutral-300 space-y-1">
                      <div className="flex justify-between font-bold text-black">
                        <span>3. Kepatuhan SOP & Kebijakan</span>
                        <span className="font-mono">{scoreR3} / 25 pts</span>
                      </div>
                      <input 
                        type="range" min="0" max="25" value={scoreR3} 
                        onChange={(e) => setScoreR3(parseInt(e.target.value, 10))}
                        className="w-full accent-black"
                      />
                    </div>

                    <div className="p-2.5 bg-white border border-neutral-300 space-y-1">
                      <div className="flex justify-between font-bold text-black">
                        <span>4. Pemecahan Masalah & Data</span>
                        <span className="font-mono">{scoreR4} / 25 pts</span>
                      </div>
                      <input 
                        type="range" min="0" max="25" value={scoreR4} 
                        onChange={(e) => setScoreR4(parseInt(e.target.value, 10))}
                        className="w-full accent-black"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-white border border-neutral-300 text-black font-bold">
                    <span>Total Nilai Rubrik:</span>
                    <span className="font-mono text-base">{scoreR1 + scoreR2 + scoreR3 + scoreR4} / 100</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-black mb-1">
                      Umpan Balik Kualitatif Manajer:
                    </label>
                    <textarea
                      rows={3}
                      value={managerComments}
                      onChange={(e) => setManagerComments(e.target.value)}
                      placeholder="Tuliskan ulasan manajer..."
                      className="w-full p-2 border border-neutral-300 text-xs text-black leading-relaxed bg-white focus:outline-hidden focus:border-black"
                    />
                  </div>

                  {decision === 'Revision Required' && (
                    <div>
                      <label className="block text-[11px] font-semibold text-black mb-1">
                        Catatan Khusus yang Harus Diperbaiki Trainee:
                      </label>
                      <textarea
                        rows={2}
                        value={correctionNotes}
                        onChange={(e) => setCorrectionNotes(e.target.value)}
                        placeholder="Rincian bagian mana yang harus diperbaiki..."
                        className="w-full p-2 border border-neutral-300 text-xs text-black bg-white focus:outline-hidden"
                      />
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2 text-xs">
                      <label className="font-semibold text-black">Keputusan Manajer:</label>
                      <select
                        value={decision}
                        onChange={(e) => setDecision(e.target.value as any)}
                        className="text-xs border border-neutral-300 px-2.5 py-1 bg-white text-black font-medium focus:outline-hidden"
                      >
                        <option value="Approved">Luluskan (Approve)</option>
                        <option value="Revision Required">Minta Revisi (Revision Required)</option>
                        <option value="Rejected">Tolak (Reject)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold transition-colors"
                    >
                      Simpan Nilai & Keputusan
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
};
