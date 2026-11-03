import React, { useState } from 'react';
import { Course } from '../../types/academy';
import { useAcademy } from '../../context/AcademyContext';
import { IndonesianSlugHeader } from '../common/IndonesianSlugHeader';
import { 
  X, 
  Download
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { SPREADSHEET_DATASETS } from '../../data/spreadsheetDatasets';

interface CourseDetailModalProps {
  course: Course;
  onClose: () => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({ course, onClose }) => {
  const { assignments, submitAssignment, createAssignmentFromCourse, setActiveTab } = useAcademy();

  const existingAssignment = assignments.find(a => a.courseId === course.id);
  const assignment = existingAssignment || createAssignmentFromCourse(course.id);

  const [responseContent, setResponseContent] = useState(
    assignment.submission?.responseContent || ''
  );
  const [attachedFileName, setAttachedFileName] = useState(
    assignment.submission?.attachedFileName || `${course.id.toLowerCase()}_operational_deliverable.docx`
  );
  const [submittedBanner, setSubmittedBanner] = useState(false);

  const handleDownloadDataset = () => {
    const dsKey = course.rawDatasetType === 'general' ? 'customers' : course.rawDatasetType;
    const ds = SPREADSHEET_DATASETS[dsKey] || SPREADSHEET_DATASETS.customers;
    const ws = XLSX.utils.aoa_to_sheet([ds.headers, ...ds.rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DATASET");
    XLSX.writeFile(wb, course.rawDatasetName.replace('.csv', '.xlsx'));
  };

  const handleApplyQuickSolution = (templateType: 'full' | 'spreadsheet' | 'memo') => {
    if (templateType === 'full') {
      setResponseContent(
        `DOKUMEN DELIVERABLE RESMI OPERASIONAL (${course.id})\nTUGAS: ${course.practicalAssignment.taskTitle}\nSTANDAR PROSEDUR: ${course.sopReference}\n\n1. Analisis Skenario & Kepatuhan:\nTelah dilakukan verifikasi menyeluruh terhadap skenario bisnis sesuai instruksi Direktur Sarah Jenkins. Seluruh batasan operasional dan ambang batas wewenang telah ditegakkan tanpa pelanggaran kebijakan.\n\n2. Tindakan Operasional Terlaksana:\n- Melakukan audit data mentah pada berkas ${course.rawDatasetName}.\n- Menerapkan langkah pemecahan masalah sesuai daftar prosedur (Langkah 1 s/d ${course.practicalAssignment.stepByStep.length}).\n- Menghasilkan bukti deliverable: ${course.practicalAssignment.expectedDeliverables.join(', ')}.\n\n3. Ringkasan Hasil & Dampak Kinerja:\nSeluruh kriteria rubrik (Akurasi, Nada Bahasa, Kepatuhan SOP, dan Ketelitian Data) telah terpenuhi 100%. Tidak ditemukan risiko pelanggaran SLA maupun keluhan lanjutan dari pelanggan.`
      );
      setAttachedFileName(`${course.id.toLowerCase()}_deliverable_resmi.pdf`);
    } else if (templateType === 'spreadsheet') {
      setResponseContent(
        `LEMBAR KERJA & PERHITUNGAN EXCEL TUNTAS (${course.id})\nDATASET: ${course.rawDatasetName}\n\n1. Formula Diterapkan:\n- Perhitungan Total Nilai: =SUM(Range)\n- Rata-rata Kinerja: =AVERAGE(Range)\n- Filter Kategori & Kepatuhan SLA: =COUNTIF(Range, Criteria) & =SUMIF(Range, Criteria, SumRange)\n\n2. Hasil Validasi:\nDataset telah disanitasi dari nilai duplikat dan spasi berlebih. Format mata uang dan penomoran telah distandarkan.\n\n3. Dokumen Terlampir:\nSeluruh lembar kerja tersimpan rapi dan dapat diunduh pada lampiran berikut.`
      );
      setAttachedFileName(`${course.id.toLowerCase()}_analisis_data.xlsx`);
    } else {
      setResponseContent(
        `MEMORANDUM INTERNAL OPERASIONAL\nKEPADA: Sarah Jenkins, Direktur Operasional & QA Lead\nDARI: Alex Mercer, Spesialis Operasional Remote (NX-TR-4091)\nTANGGAL: ${new Date().toISOString().split('T')[0]}\nHAL: Penyelesaian Tugas ${course.id} - ${course.title}\n\nDengan ini dilaporkan bahwa instruksi kerja untuk penugasan ${course.practicalAssignment.taskTitle} telah diselesaikan secara tuntas sesuai dengan ${course.sopReference}.\n\nDeliverable siap untuk diaudit dan ditinjau pada antrean manajer.`
      );
      setAttachedFileName(`${course.id.toLowerCase()}_memo_operasional.docx`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!responseContent.trim()) return;

    submitAssignment(assignment.id, {
      responseContent,
      attachedFileName,
      spreadsheetDataSummary: `Delivered for ${course.title}. Adheres to ${course.sopReference}.`
    });

    setSubmittedBanner(true);
    setTimeout(() => {
      setSubmittedBanner(false);
    }, 4000);
  };

  const isApproved = assignment.status === 'Approved' || assignment.status === 'Completed';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
      <div className="bg-white border border-neutral-300 w-full max-w-4xl max-h-[90vh] flex flex-col my-auto overflow-hidden text-black">
        
        {/* Header - clean black background, white text */}
        <div className="px-6 py-4 bg-black text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold border border-neutral-600 px-2 py-0.5 text-white">
              {course.id}
            </span>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                {course.levelTitle}
              </span>
              <h2 className="text-base font-bold text-white line-clamp-1">
                {course.title}
              </h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body - black text only */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-black">
          
          {/* Indonesian Slug & Tips Bar at top of Modal */}
          <IndonesianSlugHeader
            moduleKey="courses"
            onApplyTemplate={(content, fileName) => {
              setResponseContent(content);
              if (fileName) setAttachedFileName(fileName);
            }}
          />

          {submittedBanner && (
            <div className="p-3 bg-neutral-100 border border-neutral-400 text-black text-xs font-medium">
              Deliverable Berhasil Diserahkan. Work Order {assignment.id} saat ini sedang ditinjau oleh Manajer Sarah Jenkins.
            </div>
          )}

          {/* Manager Evaluation Banner (if graded) */}
          {assignment.managerEvaluation && (
            <div className="p-4 border border-neutral-400 bg-neutral-50 text-black space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase tracking-wider text-[11px]">
                  Hasil Evaluasi Manajer: [{assignment.managerEvaluation.decision}]
                </span>
                <span className="text-sm font-bold font-mono px-2 py-0.5 border border-black bg-white">
                  Skor: {assignment.managerEvaluation.overallScore} / 100
                </span>
              </div>
              <p className="font-normal text-neutral-800 italic">
                "{assignment.managerEvaluation.managerFeedback}"
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-neutral-200 text-[11px]">
                {assignment.managerEvaluation.rubricScores.map((s, i) => (
                  <div key={i} className="bg-white p-2 border border-neutral-300">
                    <span className="text-neutral-600 block truncate">{s.name}</span>
                    <span className="font-bold font-mono text-black">{s.score} / {s.maxPoints} pts</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 1: Course Summary & Scenario */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-neutral-200 space-y-1.5">
              <h4 className="font-bold text-black uppercase tracking-wide text-[11px]">
                Pengantar & Tujuan Kursus
              </h4>
              <p className="leading-relaxed text-black font-normal">{course.summary}</p>
            </div>

            <div className="p-4 bg-white border border-neutral-200 space-y-1.5">
              <h4 className="font-bold text-black uppercase tracking-wide text-[11px]">
                Skenario Nyata Tempat Kerja Nexora
              </h4>
              <p className="leading-relaxed text-black font-normal">{course.scenario}</p>
            </div>
          </div>

          {/* Section 2: Manager Instruction & SOP Reference */}
          <div className="p-4 bg-neutral-50 border border-neutral-300 space-y-1.5">
            <h4 className="font-bold text-black uppercase tracking-wide text-[11px]">
              Instruksi Kerja Manajer (Sarah Jenkins, Direktur Operasional)
            </h4>
            <p className="leading-relaxed text-black font-normal">{course.managerInstruction}</p>
            <div className="pt-1 text-[11px] text-black font-semibold">
              Kepatuhan SOP Wajib: {course.sopReference}
            </div>
          </div>

          {/* Section 3: Tools & Downloadable Business Dataset */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-neutral-200 space-y-2">
              <h4 className="font-bold text-black uppercase tracking-wide text-[11px]">
                Perangkat Lunak Operasional Diperlukan
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {course.toolsRequired.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 border border-neutral-300 text-black text-[11px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white border border-neutral-200 space-y-2">
              <h4 className="font-bold text-black uppercase tracking-wide text-[11px]">
                Dataset Bisnis Operasional
              </h4>
              <p className="text-[11px] text-neutral-600 font-mono">{course.rawDatasetName}</p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleDownloadDataset}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-black hover:bg-neutral-800 text-white text-xs font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Unduh Dataset (.XLSX)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setActiveTab('spreadsheet');
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1 border border-neutral-400 hover:bg-neutral-100 text-black text-xs font-medium transition-colors"
                >
                  Buka di Spreadsheet Workspace
                </button>
              </div>
            </div>
          </div>

          {/* Section 4: Practical Assignment & Step-by-Step Task Requirements */}
          <div className="p-4 bg-white border border-neutral-200 space-y-3">
            <h4 className="font-bold text-black uppercase tracking-wide text-xs">
              Penugasan Praktik: {course.practicalAssignment.taskTitle}
            </h4>
            <p className="leading-relaxed text-black font-normal">
              {course.practicalAssignment.description}
            </p>

            <div className="space-y-1.5 pt-1">
              <h5 className="font-bold text-black text-[11px] uppercase tracking-wider">Langkah Pengerjaan Bertahap:</h5>
              <ol className="list-decimal list-inside space-y-1 text-black text-[11px]">
                {course.practicalAssignment.stepByStep.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>

            <div className="pt-2">
              <h5 className="font-bold text-black text-[11px] uppercase tracking-wider mb-1">Deliverable Wajib yang Diharapkan:</h5>
              <div className="flex flex-wrap gap-1.5">
                {course.practicalAssignment.expectedDeliverables.map((deliv, idx) => (
                  <span key={idx} className="px-2 py-0.5 border border-neutral-300 text-black text-[11px]">
                    {deliv}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: Evaluation Rubric */}
          <div className="p-4 bg-white border border-neutral-200 space-y-2">
            <h4 className="font-bold text-black uppercase tracking-wide text-[11px]">
              Rubrik Penilaian Manajer (Total 100 Poin)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              {course.rubric.map((r) => (
                <div key={r.id} className="p-2.5 border border-neutral-200">
                  <div className="flex justify-between font-bold text-black">
                    <span>{r.name}</span>
                    <span className="font-mono text-black">{r.maxPoints} pts</span>
                  </div>
                  <p className="text-neutral-600 mt-0.5 text-[10px]">{r.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Submission Area with 1-Click Auto-Fill */}
          <form onSubmit={handleSubmit} className="p-4 bg-neutral-50 border border-neutral-300 space-y-3 text-black">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-black uppercase tracking-wide text-xs">
                Pengumpulan Deliverable: {assignment.id}
              </h4>
              <span className="px-2 py-0.5 border border-black text-black text-[10px] font-mono font-bold uppercase bg-white">
                Status: {assignment.status}
              </span>
            </div>

            {/* Quick-Click Auto-Fill Bar */}
            <div className="p-2.5 bg-white border border-neutral-300 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-black text-[11px] uppercase tracking-wider">
                  Tips & Trik: Klik untuk Masukkan Solusi Instan (Tanpa Ketik Manual):
                </span>
                <span className="text-[10px] text-neutral-500">Klik tombol di bawah</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handleApplyQuickSolution('full')}
                  className="px-2.5 py-1 border border-black bg-neutral-100 hover:bg-black hover:text-white text-black font-semibold text-[11px] transition-colors"
                >
                  + Muat Laporan Deliverable Lengkap
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyQuickSolution('spreadsheet')}
                  className="px-2.5 py-1 border border-black bg-neutral-100 hover:bg-black hover:text-white text-black font-semibold text-[11px] transition-colors"
                >
                  + Muat Hasil Analisis Spreadsheet (.XLSX)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyQuickSolution('memo')}
                  className="px-2.5 py-1 border border-black bg-neutral-100 hover:bg-black hover:text-white text-black font-semibold text-[11px] transition-colors"
                >
                  + Muat Format Memo Resmi Shift
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-black font-semibold mb-1">
                Teks Respons / Memo / Hasil Perhitungan Trainee:
              </label>
              <textarea
                rows={5}
                required
                value={responseContent}
                onChange={(e) => setResponseContent(e.target.value)}
                placeholder="Tuliskan respons operasional, kutipan SOP, dan ringkasan perhitungan Anda di sini atau gunakan tombol klik instan di atas..."
                className="w-full p-2.5 bg-white border border-neutral-300 text-xs text-black leading-relaxed focus:outline-hidden focus:border-black font-mono"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <label className="text-[11px] text-black font-semibold">Nama File Lampiran:</label>
                <input
                  type="text"
                  value={attachedFileName}
                  onChange={(e) => setAttachedFileName(e.target.value)}
                  className="px-2 py-1 bg-white border border-neutral-300 text-xs text-black font-mono"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-1.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold transition-colors"
              >
                {assignment.status === 'Submitted' ? 'Perbarui Pengumpulan' : 'Serahkan untuk Review Manajer'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export const CourseList: React.FC = () => {
  const { courses, assignments } = useAcademy();
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);

  const filteredCourses = courses.filter(c => {
    if (selectedLevel !== 'all' && c.level !== selectedLevel) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.department.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getCourseStatus = (courseId: string) => {
    const a = assignments.find(item => item.courseId === courseId);
    if (!a) return 'Not Started';
    return a.status;
  };

  return (
    <div className="space-y-5">
      {/* Top Banner with Indonesian Slug in Top Right */}
      <div className="bg-white border border-neutral-200 p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <h1 className="text-lg font-bold text-black uppercase tracking-tight">Nexora 50-Course Curriculum</h1>
            <p className="text-xs text-neutral-600">10 Operations Departments with workplace assignments, real datasets & manager grading</p>
          </div>

          {/* Indonesian Slug in Top Right */}
          <div className="lg:w-96 shrink-0">
            <IndonesianSlugHeader moduleKey="courses" />
          </div>
        </div>

        {/* Search & Level Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedLevel === 'all'
                  ? 'bg-black text-white'
                  : 'text-black hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              All 50 Courses
            </button>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedLevel === lvl
                    ? 'bg-black text-white font-semibold'
                    : 'text-black hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                Level {lvl < 10 ? `0${lvl}` : lvl}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kursus / topik..."
              className="w-full px-3 py-1.5 border border-neutral-300 text-xs text-black focus:outline-hidden focus:border-black"
            />
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map(course => {
          const status = getCourseStatus(course.id);

          return (
            <div
              key={course.id}
              onClick={() => setActiveCourseModal(course)}
              className="bg-white border border-neutral-200 p-4 hover:border-black transition-colors cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-black">
                    {course.id}
                  </span>
                  <span className="text-[10px] font-mono border border-neutral-300 px-1.5 py-0.5 text-black uppercase">
                    {status}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider block">
                    Level {course.level < 10 ? `0${course.level}` : course.level} / {course.department}
                  </span>
                  <h3 className="text-xs font-bold text-black line-clamp-2 mt-0.5">
                    {course.title}
                  </h3>
                </div>

                <p className="text-xs text-neutral-700 line-clamp-3 leading-relaxed font-normal">
                  {course.summary}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="truncate max-w-44 text-[11px] text-neutral-600">
                  {course.practicalAssignment.taskTitle}
                </span>
                <span className="font-bold text-black">
                  Buka Tugas →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {activeCourseModal && (
        <CourseDetailModal
          course={activeCourseModal}
          onClose={() => setActiveCourseModal(null)}
        />
      )}
    </div>
  );
};
