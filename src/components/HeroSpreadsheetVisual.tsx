import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2, FileSpreadsheet, TrendingUp } from "lucide-react";

type SheetTab = "summary" | "cleaned" | "checks";

interface SheetRow {
  colA: string;
  colB: string;
  colC: string;
  colD: string;
  status?: "verified" | "standardized";
}

const TAB_DATA: Record<
  SheetTab,
  {
    label: string;
    formula: string;
    headers: [string, string, string, string];
    rows: SheetRow[];
    kpis: { label: string; value: string; note: string }[];
  }
> = {
  summary: {
    label: "Summary",
    formula: '=SUMIFS(Sales_Records!$D$2:$D$120, Sales_Records!$B$2:$B$120, A2)',
    headers: ["Region", "Orders", "Revenue", "Share"],
    rows: [
      { colA: "North District", colB: "412", colC: "$48,600", colD: "36.2%", status: "verified" },
      { colA: "Central Hub", colB: "358", colC: "$41,920", colD: "31.2%", status: "verified" },
      { colA: "West Corridor", colB: "249", colC: "$27,140", colD: "20.2%", status: "verified" },
      { colA: "Coastal Zone", colB: "146", colC: "$16,580", colD: "12.4%", status: "verified" },
    ],
    kpis: [
      { label: "Total Revenue (Demo)", value: "$134,240", note: "Q1–Q4 Consolidated" },
      { label: "Records Organized", value: "1,165", note: "Zero duplicate IDs" },
      { label: "Sheet Integrity", value: "100%", note: "Formula checks passed" },
    ],
  },
  cleaned: {
    label: "Cleaned Data",
    formula: '=TRIM(PROPER(Raw_Import!B2)) & " · " & TEXT(Raw_Import!A2,"yyyy-mm-dd")',
    headers: ["Record ID", "Normalized Date", "Category", "Amount"],
    rows: [
      { colA: "REC-1041", colB: "2026-02-14", colC: "Operations", colD: "$1,420.00", status: "standardized" },
      { colA: "REC-1042", colB: "2026-02-15", colC: "Logistics", colD: "$890.50", status: "standardized" },
      { colA: "REC-1043", colB: "2026-02-16", colC: "Equipment", colD: "$2,310.00", status: "standardized" },
      { colA: "REC-1044", colB: "2026-02-17", colC: "Operations", colD: "$645.25", status: "standardized" },
    ],
    kpis: [
      { label: "Date Format", value: "ISO-8601", note: "YYYY-MM-DD uniform" },
      { label: "Whitespace Trimmed", value: "148 rows", note: "Trailing spaces cleared" },
      { label: "Missing Values", value: "0", note: "Flagged & resolved" },
    ],
  },
  checks: {
    label: "Audit Log",
    formula: '=IF(COUNTIF($A$2:$A$500, A2)>1, "Duplicate", "Pass")',
    headers: ["Check Name", "Rule Scope", "Rows Checked", "Result"],
    rows: [
      { colA: "Duplicate ID Scan", colB: "Column A", colC: "1,165", colD: "Passed", status: "verified" },
      { colA: "Currency Alignment", colB: "Column D", colC: "1,165", colD: "Passed", status: "verified" },
      { colA: "Date Range Guard", colB: "Column B", colC: "1,165", colD: "Passed", status: "verified" },
      { colA: "Summary Cross-Foot", colB: "Pivot vs Raw", colC: "4 Regions", colD: "Matched", status: "verified" },
    ],
    kpis: [
      { label: "Validation Rules", value: "12 Active", note: "Data validation set" },
      { label: "Cross-Foot Delta", value: "$0.00", note: "Exact reconciliation" },
      { label: "Audit Status", value: "Verified", note: "Ready for review" },
    ],
  },
};

const MONTHLY_BARS = [
  { month: "Jul", value: 52 },
  { month: "Aug", value: 64 },
  { month: "Sep", value: 59 },
  { month: "Oct", value: 78 },
  { month: "Nov", value: 86 },
  { month: "Dec", value: 94 },
];

export function HeroSpreadsheetVisual() {
  const [activeTab, setActiveTab] = useState<SheetTab>("summary");
  const shouldReduceMotion = useReducedMotion();
  const current = TAB_DATA[activeTab];

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="relative w-full"
    >
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_20px_50px_rgba(24,54,36,0.08)] transition-transform duration-300 hover:-translate-y-1">
        {/* Spreadsheet Workbook Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--muted)] px-4 py-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[var(--primary)] text-white">
              <FileSpreadsheet className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-[var(--foreground)]">
                Operations_Reporting_Demo.xlsx
              </p>
              <p className="text-[11px] text-[var(--muted-foreground)]">
                Demonstration Workbook · Synthetic Dataset
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-[11px] font-medium text-[var(--primary)] whitespace-nowrap">
            Structured View
          </span>
        </div>

        {/* Formula Bar */}
        <div className="flex items-center gap-2 border-b border-[var(--border)] bg-white px-4 py-2 text-xs">
          <span className="rounded border border-[var(--border)] bg-[var(--muted)] px-2 py-0.5 font-mono text-[11px] font-medium text-[var(--muted-foreground)]">
            fx
          </span>
          <code className="truncate font-mono text-[11px] text-[var(--foreground)]">
            {current.formula}
          </code>
        </div>

        {/* Interactive Body */}
        <div className="p-4 sm:p-5 space-y-4">
          {/* KPI Summary Strip */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {current.kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-xl border border-[var(--border)] bg-[var(--soft-green)]/45 p-3"
              >
                <p className="text-[11px] font-medium text-[var(--muted-foreground)]">
                  {kpi.label}
                </p>
                <p className="mt-0.5 text-base font-bold text-[var(--foreground)] tabular-nums">
                  {kpi.value}
                </p>
                <p className="mt-0.5 text-[11px] text-[var(--primary)]">
                  {kpi.note}
                </p>
              </div>
            ))}
          </div>

          {/* Mini Chart + Spreadsheet Grid Table */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-stretch">
            {/* Compact Trend Chart */}
            <div className="sm:col-span-4 rounded-xl border border-[var(--border)] bg-white p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[var(--foreground)]">
                  6-Month Output
                </span>
                <TrendingUp className="h-3.5 w-3.5 text-[var(--primary)]" aria-hidden="true" />
              </div>
              <div
                className="mt-3 flex items-end justify-between gap-1.5 h-24 pt-2"
                role="img"
                aria-label="Demonstration bar chart showing steady monthly growth from July to December"
              >
                {MONTHLY_BARS.map((bar, idx) => (
                  <div key={bar.month} className="flex flex-1 flex-col items-center gap-1 h-full justify-end">
                    <div
                      className={`w-full rounded-t-sm transition-all duration-300 ${
                        idx >= 4 ? "bg-[var(--primary)]" : "bg-[var(--accent)]"
                      }`}
                      style={{ height: `${bar.value}%` }}
                    />
                    <span className="text-[10px] text-[var(--muted-foreground)] tabular-nums">
                      {bar.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clean Spreadsheet Table */}
            <div className="sm:col-span-8 overflow-hidden rounded-xl border border-[var(--border)] bg-white">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--muted)] text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                    <th className="w-7 border-r border-[var(--border)] px-1.5 py-1.5 text-center">#</th>
                    {current.headers.map((header) => (
                      <th key={header} className="px-2.5 py-1.5 font-semibold text-[var(--foreground)]">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {current.rows.map((row, index) => (
                    <tr key={row.colA} className="hover:bg-[var(--soft-green)]/35 transition-colors">
                      <td className="border-r border-[var(--border)] bg-[var(--muted)]/50 px-1.5 py-2 text-center font-mono text-[10px] text-[var(--muted-foreground)] tabular-nums">
                        {index + 1}
                      </td>
                      <td className="px-2.5 py-2 font-medium text-[var(--foreground)] truncate max-w-[110px]">
                        {row.colA}
                      </td>
                      <td className="px-2.5 py-2 text-[var(--muted-foreground)] tabular-nums">
                        {row.colB}
                      </td>
                      <td className="px-2.5 py-2 font-medium text-[var(--foreground)] tabular-nums">
                        {row.colC}
                      </td>
                      <td className="px-2.5 py-2 text-[var(--primary)] font-medium tabular-nums">
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 shrink-0" aria-hidden="true" />
                          <span>{row.colD}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom Worksheet Tabs */}
        <div
          role="tablist"
          aria-label="Demonstration workbook sheets"
          className="flex items-center gap-1 border-t border-[var(--border)] bg-[var(--muted)] px-3 py-2"
        >
          {(Object.keys(TAB_DATA) as SheetTab[]).map((tabKey) => {
            const isActive = activeTab === tabKey;
            return (
              <button
                key={tabKey}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tabKey)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${
                  isActive
                    ? "bg-white text-[var(--primary)] shadow-xs border border-[var(--border)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-white/60"
                }`}
              >
                {TAB_DATA[tabKey].label}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
