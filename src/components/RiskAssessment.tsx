"use client";

import { useState } from "react";
import { AlertTriangle, Shield, TrendingDown, BarChart3, FileText, CheckCircle } from "lucide-react";

interface RiskItem {
  id: string;
  contract: string;
  clause: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  category: string;
  recommendation: string;
  status: "open" | "mitigated" | "accepted";
}

const risks: RiskItem[] = [
  { id: "1", contract: "TechCorp License Agreement", clause: "Section 3 - Fees", description: "Fee increase cap of 15% annually allows significant cost escalation over the 3-year term", severity: "critical", category: "Financial", recommendation: "Negotiate cap to 5% or tie to CPI index", status: "open" },
  { id: "2", contract: "TechCorp License Agreement", clause: "Section 4 - Liability", description: "Liability cap limited to 12 months of fees, which may be insufficient for major data breaches", severity: "high", category: "Liability", recommendation: "Negotiate 24-month cap or carve-out for data breach scenarios", status: "open" },
  { id: "3", contract: "CloudPro Service Agreement", clause: "Section 8 - Data", description: "Missing data processing addendum required under GDPR compliance", severity: "critical", category: "Compliance", recommendation: "Require DPA before execution; include standard contractual clauses", status: "open" },
  { id: "4", contract: "Partner NDA", clause: "Section 5 - Non-compete", description: "Overly broad non-compete may not be enforceable in California", severity: "medium", category: "Enforceability", recommendation: "Narrow geographic and temporal scope", status: "mitigated" },
  { id: "5", contract: "Lease Agreement", clause: "Section 12 - Renewal", description: "Auto-renewal with only 30-day notice window creates risk of unintended extension", severity: "medium", category: "Operational", recommendation: "Extend notice window to 90 days", status: "accepted" },
  { id: "6", contract: "Employment Contract", clause: "Section 7 - IP", description: "IP assignment clause may not cover pre-existing IP properly", severity: "low", category: "IP", recommendation: "Add exhibit listing pre-existing IP exclusions", status: "open" },
];

export default function RiskAssessment() {
  const [riskItems] = useState<RiskItem[]>(risks);
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filtered = riskItems.filter((r) => {
    return (filterSeverity === "all" || r.severity === filterSeverity) && (filterStatus === "all" || r.status === filterStatus);
  });

  const stats = {
    critical: riskItems.filter((r) => r.severity === "critical").length,
    high: riskItems.filter((r) => r.severity === "high").length,
    medium: riskItems.filter((r) => r.severity === "medium").length,
    low: riskItems.filter((r) => r.severity === "low").length,
    open: riskItems.filter((r) => r.status === "open").length,
    mitigated: riskItems.filter((r) => r.status === "mitigated").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Risk Assessment</h1>
        <p className="text-gray-500">AI-identified legal risks across your contracts</p>
      </div>

      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Critical", value: stats.critical, color: "bg-red-500", textColor: "text-red-700", bg: "bg-red-50" },
          { label: "High", value: stats.high, color: "bg-orange-500", textColor: "text-orange-700", bg: "bg-orange-50" },
          { label: "Medium", value: stats.medium, color: "bg-yellow-500", textColor: "text-yellow-700", bg: "bg-yellow-50" },
          { label: "Low", value: stats.low, color: "bg-green-500", textColor: "text-green-700", bg: "bg-green-50" },
        ].map((s) => (
          <div key={s.label} className={`card ${s.bg}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${s.color}`} />
              <span className={`text-sm font-medium ${s.textColor}`}>{s.label}</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Risk Score */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Overall Risk Score</h2>
          <span className="text-3xl font-bold text-yellow-600">6.4 / 10</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-4 rounded-full" style={{ width: "64%" }} />
        </div>
        <p className="text-sm text-gray-500 mt-2">Your portfolio has moderate risk. 2 critical items require immediate attention.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex gap-2">
          <span className="text-sm text-gray-500 py-1.5">Severity:</span>
          {["all", "critical", "high", "medium", "low"].map((s) => (
            <button key={s} onClick={() => setFilterSeverity(s)} className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${filterSeverity === s ? "bg-primary-100 text-primary-700" : "bg-gray-100 text-gray-600"}`}>{s}</button>
          ))}
        </div>
        <div className="flex gap-2">
          <span className="text-sm text-gray-500 py-1.5">Status:</span>
          {["all", "open", "mitigated", "accepted"].map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${filterStatus === s ? "bg-primary-100 text-primary-700" : "bg-gray-100 text-gray-600"}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Risk List */}
      <div className="space-y-3">
        {filtered.map((risk) => (
          <div key={risk.id} className={`card border-l-4 ${
            risk.severity === "critical" ? "border-l-red-500" : risk.severity === "high" ? "border-l-orange-500" : risk.severity === "medium" ? "border-l-yellow-500" : "border-l-green-500"
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${
                    risk.severity === "critical" ? "bg-red-100 text-red-700" : risk.severity === "high" ? "bg-orange-100 text-orange-700" : risk.severity === "medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                  }`}>{risk.severity}</span>
                  <span className="text-xs text-gray-400">{risk.category}</span>
                </div>
                <h3 className="font-semibold text-gray-900">{risk.description}</h3>
                <p className="text-sm text-gray-500 mt-1"><FileText className="w-3 h-3 inline mr-1" />{risk.contract} - {risk.clause}</p>
                <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800"><Shield className="w-3 h-3 inline mr-1" /><strong>Recommendation:</strong> {risk.recommendation}</p>
                </div>
              </div>
              <span className={`ml-4 text-xs px-2 py-0.5 rounded-full ${
                risk.status === "open" ? "bg-red-100 text-red-700" : risk.status === "mitigated" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
              }`}>{risk.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
