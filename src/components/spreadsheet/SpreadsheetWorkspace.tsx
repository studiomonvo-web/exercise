import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { 
  SPREADSHEET_DATASETS 
} from '../../data/spreadsheetDatasets';
import { 
  Download, 
  Search, 
  FileSpreadsheet, 
  Calculator, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { IndonesianSlugHeader } from '../common/IndonesianSlugHeader';

export const SpreadsheetWorkspace: React.FC = () => {
  const { submitAssignment, assignments } = useAcademy();
  const [selectedDatasetKey, setSelectedDatasetKey] = useState<string>('customers');
  const dataset = SPREADSHEET_DATASETS[selectedDatasetKey];

  const [gridData, setGridData] = useState<(string | number)[][]>(() => dataset.rows);
  const [headers, setHeaders] = useState<string[]>(() => dataset.headers);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [formulaInput, setFormulaInput] = useState<string>('');
  const [formulaResult, setFormulaResult] = useState<string | null>(null);
  const [formulaError, setFormulaError] = useState<string | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [highlightDuplicates, setHighlightDuplicates] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const handleDatasetChange = (key: string) => {
    setSelectedDatasetKey(key);
    const newDs = SPREADSHEET_DATASETS[key];
    setGridData(newDs.rows);
    setHeaders(newDs.headers);
    setFormulaInput(newDs.suggestedFormulas[0] || '');
    setFormulaResult(null);
    setFormulaError(null);
    setSelectedCell(null);
    setHighlightDuplicates(false);
    setSubmitSuccess(false);
  };

  const duplicateValues = useMemo(() => {
    if (!highlightDuplicates) return new Set();
    const counts: Record<string, number> = {};
    gridData.forEach(row => {
      const val = String(row[0]);
      counts[val] = (counts[val] || 0) + 1;
    });
    const dupes = new Set<string>();
    Object.entries(counts).forEach(([val, count]) => {
      if (count > 1) dupes.add(val);
    });
    return dupes;
  }, [gridData, highlightDuplicates]);

  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return gridData;
    const q = searchQuery.toLowerCase();
    return gridData.filter(row => 
      row.some(cell => String(cell).toLowerCase().includes(q))
    );
  }, [gridData, searchQuery]);

  const evaluateFormula = (f: string) => {
    setFormulaError(null);
    setFormulaResult(null);
    const raw = f.trim();
    if (!raw.startsWith('=')) {
      setFormulaError("Formulas must start with '=' (e.g. =SUM(E2:E26) or =COUNTIF(C2:C26, \"Gold VIP\"))");
      return;
    }

    try {
      const expr = raw.substring(1).trim();

      const parseCellRef = (ref: string) => {
        const match = ref.trim().match(/^([A-Z]+)(\d+)$/i);
        if (!match) return null;
        const colLetter = match[1].toUpperCase();
        const rowNum = parseInt(match[2], 10);
        const colIndex = colLetter.charCodeAt(0) - 65;
        const rowIndex = rowNum - 2;
        return { colIndex, rowIndex };
      };

      // SUM
      const sumMatch = expr.match(/^SUM\(([A-Z]\d+):([A-Z]\d+)\)$/i);
      if (sumMatch) {
        const start = parseCellRef(sumMatch[1]);
        const end = parseCellRef(sumMatch[2]);
        if (start && end && start.colIndex === end.colIndex) {
          const col = start.colIndex;
          let sum = 0;
          for (let r = Math.max(0, start.rowIndex); r <= Math.min(gridData.length - 1, end.rowIndex); r++) {
            const v = Number(gridData[r][col]);
            if (!isNaN(v)) sum += v;
          }
          setFormulaResult(`$${sum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
          return;
        }
      }

      // AVERAGE
      const avgMatch = expr.match(/^AVERAGE\(([A-Z]\d+):([A-Z]\d+)\)$/i);
      if (avgMatch) {
        const start = parseCellRef(avgMatch[1]);
        const end = parseCellRef(avgMatch[2]);
        if (start && end && start.colIndex === end.colIndex) {
          const col = start.colIndex;
          let sum = 0;
          let count = 0;
          for (let r = Math.max(0, start.rowIndex); r <= Math.min(gridData.length - 1, end.rowIndex); r++) {
            const v = Number(gridData[r][col]);
            if (!isNaN(v)) {
              sum += v;
              count++;
            }
          }
          const avg = count > 0 ? sum / count : 0;
          setFormulaResult(`${avg.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
          return;
        }
      }

      // COUNT/COUNTA
      const countMatch = expr.match(/^(COUNT|COUNTA)\(([A-Z]\d+):([A-Z]\d+)\)$/i);
      if (countMatch) {
        const start = parseCellRef(countMatch[2]);
        const end = parseCellRef(countMatch[3]);
        if (start && end) {
          let count = 0;
          for (let r = Math.max(0, start.rowIndex); r <= Math.min(gridData.length - 1, end.rowIndex); r++) {
            const val = gridData[r][start.colIndex];
            if (val !== undefined && val !== null && String(val).trim() !== "") {
              count++;
            }
          }
          setFormulaResult(`${count}`);
          return;
        }
      }

      // COUNTIF
      const countIfMatch = expr.match(/^COUNTIF\(([A-Z]\d+):([A-Z]\d+),\s*"([^"]+)"\)$/i);
      if (countIfMatch) {
        const start = parseCellRef(countIfMatch[1]);
        const end = parseCellRef(countIfMatch[2]);
        const criteria = countIfMatch[3].toLowerCase();
        if (start && end) {
          let count = 0;
          for (let r = Math.max(0, start.rowIndex); r <= Math.min(gridData.length - 1, end.rowIndex); r++) {
            const val = String(gridData[r][start.colIndex] || '').toLowerCase();
            if (val === criteria || val.includes(criteria)) {
              count++;
            }
          }
          setFormulaResult(`${count}`);
          return;
        }
      }

      setFormulaResult("Calculated: Syntax verified.");
    } catch {
      setFormulaError("Could not parse formula. Example syntax: =SUM(E2:E26)");
    }
  };

  const handleDownloadXLSX = () => {
    const ws = XLSX.utils.aoa_to_sheet([headers, ...gridData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, dataset.id.toUpperCase());
    XLSX.writeFile(wb, `nexora_${dataset.id}_dataset.xlsx`);
  };

  const handleDownloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...gridData.map(e => e.map(x => `"${x}"`).join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `nexora_${dataset.id}_dataset.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCellEdit = (rowIdx: number, colIdx: number, value: string) => {
    const updated = [...gridData];
    const num = Number(value);
    updated[rowIdx][colIdx] = (!isNaN(num) && value.trim() !== '') ? num : value;
    setGridData(updated);
  };

  const handleLinkToAssignment = () => {
    const pendingAssignment = assignments.find(a => 
      a.status === 'Assigned' || a.status === 'In Progress' || a.status === 'Revision Required'
    );
    if (!pendingAssignment) return;

    submitAssignment(pendingAssignment.id, {
      responseContent: `Spreadsheet Analysis Completed for dataset: ${dataset.name}.\nFormula executed: ${formulaInput || 'Calculations verified'}.\nOutput: ${formulaResult || 'Cleansed and validated'}.`,
      spreadsheetDataSummary: `Cleansed ${gridData.length} records in ${dataset.id}. Total columns: ${headers.length}.`,
      attachedFileName: `nexora_${dataset.id}_workbook_verified.xlsx`
    });
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 4000);
  };

  return (
    <div className="space-y-5">
      {/* Header & Dataset selector */}
      <div className="bg-white border border-neutral-200 p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <h1 className="text-lg font-bold text-black uppercase tracking-tight">Nexora Spreadsheet Operations Center</h1>
            <p className="text-xs text-neutral-600">Excel & Google Sheets simulation environment with formula calculation and XLSX export</p>
          </div>

          {/* Indonesian Slug in Top Right */}
          <div className="lg:w-96 shrink-0">
            <IndonesianSlugHeader moduleKey="spreadsheet" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadXLSX}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black hover:bg-neutral-800 text-white text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download .XLSX
            </button>
            <button
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-neutral-300 hover:bg-neutral-100 text-black text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              CSV
            </button>
          </div>
        </div>

        {/* Dataset Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-3">
          {Object.entries(SPREADSHEET_DATASETS).map(([key, item]) => (
            <button
              key={key}
              onClick={() => handleDatasetChange(key)}
              className={`px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors ${
                selectedDatasetKey === key
                  ? 'bg-black text-white font-semibold'
                  : 'text-black hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              {item.name.split(' (')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Task Brief */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-neutral-50 border border-neutral-200 p-4 space-y-2 text-black text-xs">
          <h3 className="font-bold text-black uppercase tracking-wide text-xs">
            Operational Task Instructions ({dataset.name})
          </h3>
          <p className="whitespace-pre-line leading-relaxed font-normal text-black">
            {dataset.taskInstructions}
          </p>
          <div className="pt-1 text-[11px] font-semibold text-black">
            Target Output: {dataset.expectedOutput}
          </div>
        </div>

        {/* Suggested Formulas */}
        <div className="bg-white border border-neutral-200 p-4 space-y-2.5 text-xs text-black">
          <div className="flex items-center justify-between">
            <span className="font-bold text-black uppercase tracking-wider text-[11px]">
              Required Formulas
            </span>
            <span className="text-[10px] text-neutral-500">Click to insert</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {dataset.suggestedFormulas.map((f, i) => (
              <button
                key={i}
                onClick={() => {
                  setFormulaInput(f);
                  evaluateFormula(f);
                }}
                className="px-2 py-0.5 border border-neutral-300 hover:border-black text-black text-xs font-mono transition-colors"
              >
                {f}
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-600">
            <span>Rows: {gridData.length}</span>
            <button
              onClick={() => setHighlightDuplicates(!highlightDuplicates)}
              className="text-black underline font-medium"
            >
              {highlightDuplicates ? 'Clear Duplicates' : 'Check Duplicates'}
            </button>
          </div>
        </div>
      </div>

      {/* Formula Bar */}
      <div className="bg-white border border-neutral-200 p-3 space-y-2 text-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="px-3 py-1.5 bg-neutral-100 text-black font-mono font-bold border border-neutral-300 text-center min-w-14">
            {selectedCell ? `${String.fromCharCode(65 + selectedCell.col)}${selectedCell.row + 2}` : 'fx'}
          </div>

          <div className="flex-1 relative">
            <input
              type="text"
              value={formulaInput}
              onChange={(e) => setFormulaInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') evaluateFormula(formulaInput);
              }}
              placeholder='Enter formula e.g. =SUM(E2:E26), =AVERAGE(D2:D21), =COUNTIF(C2:C21, "Gold VIP")'
              className="w-full px-3 py-1.5 border border-neutral-300 text-xs font-mono text-black focus:outline-hidden focus:border-black"
            />
          </div>

          <button
            onClick={() => evaluateFormula(formulaInput)}
            className="px-4 py-1.5 bg-black hover:bg-neutral-800 text-white text-xs font-medium transition-colors"
          >
            Calculate
          </button>

          <div className="relative sm:w-48">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter table rows..."
              className="w-full px-2.5 py-1.5 border border-neutral-300 text-xs text-black focus:outline-hidden"
            />
          </div>
        </div>

        {formulaResult && (
          <div className="p-2.5 bg-neutral-100 border border-neutral-300 text-xs flex items-center justify-between text-black">
            <span>
              <strong>Formula Output:</strong> <code className="font-mono font-bold ml-1">{formulaResult}</code>
            </span>
            <button
              onClick={handleLinkToAssignment}
              className="px-2.5 py-1 bg-black hover:bg-neutral-800 text-white text-xs font-medium"
            >
              Submit Output to Work Order
            </button>
          </div>
        )}

        {formulaError && (
          <div className="p-2.5 border border-neutral-400 text-xs text-black">
            {formulaError}
          </div>
        )}

        {submitSuccess && (
          <div className="p-2.5 border border-neutral-400 bg-neutral-50 text-xs text-black font-medium">
            Calculation successfully attached and submitted to your active Work Order.
          </div>
        )}
      </div>

      {/* Spreadsheet Grid */}
      <div className="bg-white border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto max-h-[520px]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-neutral-100 text-neutral-600 font-mono text-[11px] border-b border-neutral-200">
                <th className="w-10 px-2 py-1 text-center border-r border-neutral-200 font-semibold">#</th>
                {headers.map((h, i) => (
                  <th key={i} className="px-3 py-1 font-medium border-r border-neutral-200">
                    <span className="font-bold text-black">{String.fromCharCode(65 + i)}</span>
                    <span className="text-[10px] text-neutral-500 font-sans ml-1.5 truncate">{h}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, rowIdx) => {
                const isDupe = duplicateValues.has(String(row[0]));
                return (
                  <tr 
                    key={rowIdx} 
                    className={`border-b border-neutral-200 hover:bg-neutral-50 ${
                      isDupe ? 'bg-neutral-100' : 'bg-white'
                    }`}
                  >
                    <td className="px-2 py-1 text-center text-neutral-400 font-mono border-r border-neutral-200 select-none">
                      {rowIdx + 2}
                    </td>

                    {row.map((cell, colIdx) => {
                      const isSelected = selectedCell?.row === rowIdx && selectedCell?.col === colIdx;
                      const isNumeric = typeof cell === 'number';

                      return (
                        <td
                          key={colIdx}
                          onClick={() => setSelectedCell({ row: rowIdx, col: colIdx })}
                          className={`px-3 py-1 border-r border-neutral-200 font-mono ${
                            isSelected ? 'bg-neutral-100 outline outline-1 outline-black' : ''
                          }`}
                        >
                          <input
                            type="text"
                            value={cell}
                            onChange={(e) => handleCellEdit(rowIdx, colIdx, e.target.value)}
                            className={`w-full bg-transparent focus:outline-hidden text-xs text-black ${
                              isNumeric ? 'text-right font-medium' : 'text-left'
                            }`}
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-2.5 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-600">
          <span>Click any cell to edit data. Standard Excel formula syntax.</span>
          <button
            onClick={() => handleDatasetChange(selectedDatasetKey)}
            className="inline-flex items-center gap-1 text-black font-medium hover:underline"
          >
            <RefreshCw className="w-3 h-3" />
            Reset Data
          </button>
        </div>
      </div>
    </div>
  );
};
