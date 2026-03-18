"use client";

import { useState } from "react";
import { ClipboardCheck, Sparkles, CheckCircle, AlertTriangle, Clock, FileText, Upload } from "lucide-react";
import toast from "react-hot-toast";

interface DiligenceItem {
  id: string;
  category: string;
  item: string;
  status: "complete" | "in-progress" | "pending" | "issue-found";
  findings: string;
  risk_level: "low" | "medium" | "high" | "none";
  documents: string[];
}

const categories = ["Corporate", "Financial", "IP", "Employment", "Litigation", "Regulatory", "Environmental", "Tax"];

const sampleItems: DiligenceItem[] = [
  { id: "1", category: "Corporate", item: "Certificate of Incorporation", status: "complete", findings: "Valid Delaware corporation, incorporated 2019. All amendments properly filed.", risk_level: "none", documents: ["cert_of_inc.pdf"] },
  { id: "2", category: "Corporate", item: "Board Resolutions", status: "complete", findings: "All resolutions properly executed. Recent M&A approval resolution dated Feb 2026.", risk_level: "low", documents: ["board_minutes_2024.pdf", "board_minutes_2025.pdf"] },
  { id: "3", category: "Financial", item: "Audited Financial Statements", status: "in-progress", findings: "FY2025 audit pending completion. FY2024 clean opinion received.", risk_level: "medium", documents: ["fy2024_audit.pdf"] },
  { id: "4", category: "IP", item: "Patent Portfolio", status: "issue-found", findings: "2 of 15 patents have pending maintenance fee payments. Risk of lapse if not addressed within 60 days.", risk_level: "high", documents: ["patent_list.xlsx"] },
  { id: "5", category: "Employment", item: "Key Employee Agreements", status: "complete", findings: "All key employees have valid employment agreements with non-compete and IP assignment clauses.", risk_level: "none", documents: ["employment_agreements.zip"] },
  { id: "6", category: "Litigation", item: "Pending Litigation Review", status: "in-progress", findings: "1 active patent infringement suit (low merit). Insurance coverage confirmed.", risk_level: "medium", documents: ["litigation_summary.pdf"] },
  { id: "7", category: "Regulatory", item: "Data Privacy Compliance", status: "issue-found", findings: "GDPR DPA missing for EU data processor. SOC2 Type II certification expired.", risk_level: "high", documents: ["compliance_report.pdf"] },
  { id: "8", category: "Tax", item: "Tax Returns & Liabilities", status: "pending", findings: "", risk_level: "none", documents: [] },
];

const statusIcons = { complete: CheckCircle, "in-progress": Clock, pending: Clock, "issue-found": AlertTriangle };
const statusColors = { complete: "text-green-600", "in-progress": "text-blue-600", pending: "text-gray-400", "issue-found": "text-red-600" };
const statusBg = { complete: "bg-green-100", "in-progress": "bg-blue-100", pending: "bg-gray-100", "issue-found": "bg-red-100" };

export default function DueDiligence() {
  const [items] = useState<DiligenceItem[]>(sampleItems);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<DiligenceItem | null>(null);

  const filtered = activeCategory === "all" ? items : items.filter((i) => i.category === activeCategory);

  const completionRate = Math.round((items.filter((i) => i.status === "complete").length / items.length) * 100);
  const issueCount = items.filter((i) => i.status === "issue-found").length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Due Diligence</h1>
          <p className="text-gray-500">AI-assisted due diligence review and tracking</p>
        </div>
        <button className="btn-primary flex items-center gap-2"><Upload className="w-4 h-4" /> Upload Documents</button>
      </div>

      {/* Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <p className="text-sm text-gray-500">Completion</p>
          <p className="text-3xl font-bold text-gray-900">{completionRate}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2"><div className="bg-primary-600 h-2 rounded-full" style={{ width: `${completionRate}%` }} /></div>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Issues Found</p>
          <p className="text-3xl font-bold text-red-600">{issueCount}</p>
          <p className="text-xs text-gray-400 mt-1">Require immediate attention</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Documents Reviewed</p>
          <p className="text-3xl font-bold text-gray-900">{items.reduce((a, b) => a + b.documents.length, 0)}</p>
          <p className="text-xs text-gray-400 mt-1">Across {categories.length} categories</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setActiveCategory("all")} className={`px-3 py-1.5 rounded-full text-xs font-medium ${activeCategory === "all" ? "bg-primary-100 text-primary-700" : "bg-gray-100 text-gray-600"}`}>All ({items.length})</button>
        {categories.map((cat) => {
          const count = items.filter((i) => i.category === cat).length;
          if (count === 0) return null;
          return (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-3 py-1.5 rounded-full text-xs font-medium ${activeCategory === cat ? "bg-primary-100 text-primary-700" : "bg-gray-100 text-gray-600"}`}>
              {cat} ({count})
            </button>
          );
        })}
      </div>

      <div className="flex gap-4">
        <div className="flex-1 space-y-3">
          {filtered.map((item) => {
            const StatusIcon = statusIcons[item.status];
            return (
              <div key={item.id} onClick={() => setSelectedItem(item)}
                className={`card cursor-pointer transition-colors ${selectedItem?.id === item.id ? "border-primary-500 bg-primary-50" : "hover:border-gray-300"}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg ${statusBg[item.status]} flex items-center justify-center`}>
                      <StatusIcon className={`w-4 h-4 ${statusColors[item.status]}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.item}</p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.risk_level !== "none" && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${item.risk_level === "high" ? "bg-red-100 text-red-700" : item.risk_level === "medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>{item.risk_level}</span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusBg[item.status]} ${statusColors[item.status]}`}>{item.status}</span>
                  </div>
                </div>
                {item.findings && <p className="text-sm text-gray-600 ml-10">{item.findings}</p>}
              </div>
            );
          })}
        </div>

        {selectedItem && (
          <div className="w-96 card sticky top-0">
            <h3 className="font-semibold text-gray-900 mb-1">{selectedItem.item}</h3>
            <p className="text-xs text-gray-500 mb-4">{selectedItem.category}</p>
            {selectedItem.findings && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Findings</h4>
                <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">{selectedItem.findings}</p>
              </div>
            )}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Documents</h4>
              {selectedItem.documents.length > 0 ? (
                <div className="space-y-1">
                  {selectedItem.documents.map((doc, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{doc}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No documents uploaded yet</p>
              )}
            </div>
            <button className="btn-primary w-full flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> AI Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
