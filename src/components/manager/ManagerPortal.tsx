import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { IndonesianSlugHeader } from '../common/IndonesianSlugHeader';

export const ManagerPortal: React.FC = () => {
  const { assignments, gradeAssignment, currentUser, metrics } = useAcademy();
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>(
    assignments.find(a => a.status === 'Submitted')?.id || assignments[0]?.id || ''
  );

  const selectedAssignment = assignments.find(a => a.id === selectedAssignmentId) || assignments[0];

  const [scoreR1, setScoreR1] = useState<number>(23);
  const [scoreR2, setScoreR2] = useState<number>(23);
  const [scoreR3, setScoreR3] = useState<number>(22);
  const [scoreR4, setScoreR4] = useState<number>(22);
  const [managerComments, setManagerComments] = useState<string>('Operational deliverable verified. Good compliance with Nexora standards.');
  const [correctionNotes, setCorrectionNotes] = useState<string>('');
  const [decision, setDecision] = useState<'Approved' | 'Revision Required' | 'Rejected'>('Approved');
  const [gradedSuccess, setGradedSuccess] = useState<boolean>(false);

  const pendingSubmissions = assignments.filter(a => a.status === 'Submitted' || a.status === 'Under Review');

  const handleCommitGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment) return;

    const total = scoreR1 + scoreR2 + scoreR3 + scoreR4;

    gradeAssignment(selectedAssignment.id, {
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

    setGradedSuccess(true);
    setTimeout(() => setGradedSuccess(false), 3000);
  };

  return (
    <div className="space-y-5">
      {/* Top Banner - clean flat layout, black text */}
      <div className="bg-white border border-neutral-200 p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-black uppercase tracking-tight">Operations Director & QA Review Console</h1>
            <p className="text-xs text-neutral-600">Supervise trainee cohorts, audit operational submissions, conduct QA grading & issue certifications</p>
          </div>

          <div className="lg:w-96 shrink-0">
            <IndonesianSlugHeader moduleKey="manager" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs text-black">
          <div className="flex items-center gap-2">
            <span className="text-neutral-500">Evaluator:</span>
            <span className="font-bold">{currentUser.name}</span>
            <span className="font-mono text-neutral-600">[{currentUser.id}]</span>
          </div>
          <span className="text-neutral-600 font-mono text-[11px]">Department: Operations Quality & Compliance</span>
        </div>
      </div>

      {/* Cohort QA Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-black">
        <div className="p-3.5 bg-white border border-neutral-200 space-y-0.5">
          <span className="text-[11px] font-medium text-neutral-600 uppercase tracking-wider block">Submissions In Queue</span>
          <div className="text-2xl font-bold font-mono text-black">{pendingSubmissions.length}</div>
          <span className="text-[10px] text-neutral-500">Awaiting Review</span>
        </div>

        <div className="p-3.5 bg-white border border-neutral-200 space-y-0.5">
          <span className="text-[11px] font-medium text-neutral-600 uppercase tracking-wider block">Approved Ratio</span>
          <div className="text-2xl font-bold font-mono text-black">
            {metrics.approvedAssignments} <span className="text-sm font-normal text-neutral-500">/ {metrics.totalAssignments}</span>
          </div>
          <span className="text-[10px] text-neutral-500">Quality Verified</span>
        </div>

        <div className="p-3.5 bg-white border border-neutral-200 space-y-0.5">
          <span className="text-[11px] font-medium text-neutral-600 uppercase tracking-wider block">Cohort Average Score</span>
          <div className="text-2xl font-bold font-mono text-black">
            {metrics.averageScore} <span className="text-sm font-normal text-neutral-500">/ 100</span>
          </div>
          <span className="text-[10px] text-neutral-500">Benchmark: 85 pts</span>
        </div>

        <div className="p-3.5 bg-white border border-neutral-200 space-y-0.5">
          <span className="text-[11px] font-medium text-neutral-600 uppercase tracking-wider block">Program Health</span>
          <div className="text-2xl font-bold font-mono text-black">98.2%</div>
          <span className="text-[10px] text-neutral-500">SLA Adherence Verified</span>
        </div>
      </div>

      {/* Manager Grading Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Pending Submissions Queue (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-neutral-200 overflow-hidden">
          <div className="p-3 bg-neutral-50 border-b border-neutral-200 text-xs font-bold text-black uppercase tracking-wide">
            Submissions Queue ({assignments.length})
          </div>

          <div className="divide-y divide-neutral-200 max-h-[620px] overflow-y-auto">
            {assignments.map(a => {
              const isSelected = a.id === selectedAssignment?.id;

              return (
                <div
                  key={a.id}
                  onClick={() => setSelectedAssignmentId(a.id)}
                  className={`p-3.5 cursor-pointer transition-colors ${
                    isSelected ? 'bg-neutral-100 border-l-2 border-black' : 'hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-bold text-black">{a.id}</span>
                    <span className="px-1.5 py-0.2 border border-neutral-300 text-[10px] font-mono text-black uppercase">
                      {a.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-black truncate mb-1">{a.title}</h4>
                  <p className="text-[11px] text-neutral-600 line-clamp-1">{a.department}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Rubric Grading Pane (8 cols) */}
        {selectedAssignment && (
          <div className="lg:col-span-8 bg-white border border-neutral-200 p-5 space-y-4 text-black text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                  Reviewing Order: {selectedAssignment.id}
                </span>
                <h3 className="text-sm font-bold text-black">{selectedAssignment.title}</h3>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Trainee: {currentUser.name} ({currentUser.id}) • {selectedAssignment.courseTitle}
                </p>
              </div>

              {selectedAssignment.managerEvaluation && (
                <span className="border border-neutral-300 px-2 py-0.5 font-mono text-black font-bold">
                  Score: {selectedAssignment.managerEvaluation.overallScore}/100
                </span>
              )}
            </div>

            {/* Trainee Submitted Content Box */}
            <div className="p-3.5 bg-neutral-50 border border-neutral-200 space-y-1.5 text-xs text-black">
              <div className="flex items-center justify-between text-[11px] text-neutral-600 pb-1 border-b border-neutral-200 font-semibold">
                <span>Submitted Work Deliverable:</span>
                <span className="font-mono">{selectedAssignment.submission?.submittedAt || 'In Progress'}</span>
              </div>
              <p className="whitespace-pre-line leading-relaxed text-black font-normal">
                {selectedAssignment.submission?.responseContent || 'Trainee has not submitted written deliverable yet.'}
              </p>
              {selectedAssignment.submission?.attachedFileName && (
                <div className="pt-1 text-[11px] text-neutral-600 font-mono">
                  Attachment: {selectedAssignment.submission.attachedFileName}
                </div>
              )}
            </div>

            {/* Scoring Form */}
            <form onSubmit={handleCommitGrade} className="space-y-4 p-4 border border-neutral-300 bg-neutral-50 text-black">
              <h4 className="text-xs font-bold text-black uppercase tracking-wide">
                100-Point Operational Rubric Evaluation
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-white border border-neutral-300 space-y-1">
                  <div className="flex justify-between font-bold text-black">
                    <span>1. Operational Accuracy</span>
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
                    <span>2. Professional Tone & HEAT</span>
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
                    <span>3. SOP & Policy Compliance</span>
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
                    <span>4. Spreadsheet & Data Rigor</span>
                    <span className="font-mono">{scoreR4} / 25 pts</span>
                  </div>
                  <input
                    type="range" min="0" max="25" value={scoreR4}
                    onChange={(e) => setScoreR4(parseInt(e.target.value, 10))}
                    className="w-full accent-black"
                  />
                </div>
              </div>

              <div className="p-2.5 bg-white border border-neutral-300 flex items-center justify-between text-xs font-bold text-black">
                <span>Calculated Overall Score:</span>
                <span className="font-mono text-base">{scoreR1 + scoreR2 + scoreR3 + scoreR4} / 100</span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-black mb-1">
                  Manager Feedback & Coaching Commentary:
                </label>
                <textarea
                  rows={3}
                  value={managerComments}
                  onChange={(e) => setManagerComments(e.target.value)}
                  placeholder="Provide operational feedback..."
                  className="w-full p-2 border border-neutral-300 text-xs text-black leading-relaxed bg-white focus:outline-hidden focus:border-black"
                />
              </div>

              {decision === 'Revision Required' && (
                <div>
                  <label className="block text-[11px] font-semibold text-black mb-1">
                    Specific Correction Instructions:
                  </label>
                  <textarea
                    rows={2}
                    value={correctionNotes}
                    onChange={(e) => setCorrectionNotes(e.target.value)}
                    placeholder="Specify formula corrections or policy adjustments needed..."
                    className="w-full p-2 border border-neutral-300 text-xs text-black bg-white focus:outline-hidden"
                  />
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2 text-xs">
                  <label className="font-semibold text-black">Official Decision:</label>
                  <select
                    value={decision}
                    onChange={(e) => setDecision(e.target.value as any)}
                    className="border border-neutral-300 px-2.5 py-1 bg-white text-black font-medium focus:outline-hidden"
                  >
                    <option value="Approved">Approve (Certified)</option>
                    <option value="Revision Required">Request Revision</option>
                    <option value="Rejected">Reject</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="px-4 py-1.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold transition-colors"
                >
                  Commit Score & Send Feedback
                </button>
              </div>

              {gradedSuccess && (
                <div className="p-2.5 bg-white border border-neutral-400 text-black text-xs font-semibold">
                  Evaluation committed successfully. Trainee scorecard updated.
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
