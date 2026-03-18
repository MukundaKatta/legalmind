"use client";

import { useState } from "react";
import { GitCompare, Sparkles, ArrowLeftRight, Plus, Minus, Check, X } from "lucide-react";
import toast from "react-hot-toast";

interface Change {
  id: string;
  type: "addition" | "deletion" | "modification";
  original: string;
  proposed: string;
  section: string;
  aiSuggestion: string;
  status: "pending" | "accepted" | "rejected";
}

const sampleChanges: Change[] = [
  { id: "1", type: "modification", original: "Licensor's total liability shall not exceed $100,000", proposed: "Licensor's total liability shall not exceed fees paid in the preceding 12 months", section: "Section 4 - Liability", aiSuggestion: "The proposed change ties liability to actual fees paid, which is more favorable. Recommend accepting.", status: "pending" },
  { id: "2", type: "addition", original: "", proposed: "Licensor shall maintain cyber liability insurance of no less than $5,000,000 per occurrence.", section: "Section 9 - Insurance (NEW)", aiSuggestion: "This is a standard insurance requirement for enterprise software contracts. Recommend accepting.", status: "pending" },
  { id: "3", type: "deletion", original: "Licensee agrees to a non-compete restriction for 24 months following termination.", proposed: "", section: "Section 11 - Non-Compete", aiSuggestion: "Non-compete clauses in software licenses are unusual and may not be enforceable. Recommend accepting the deletion.", status: "pending" },
  { id: "4", type: "modification", original: "Payment terms: Net 30", proposed: "Payment terms: Net 60", section: "Section 3 - Payment", aiSuggestion: "Net 60 is more favorable for licensee but may cause cash flow concerns for licensor. Consider negotiating Net 45 as compromise.", status: "pending" },
  { id: "5", type: "modification", original: "Governing law: State of New York", proposed: "Governing law: State of California", section: "Section 14 - Governing Law", aiSuggestion: "California has more licensee-friendly laws. If your operations are in CA, recommend accepting.", status: "pending" },
];

export default function RedliningAssistant() {
  const [changes, setChanges] = useState<Change[]>(sampleChanges);

  const updateStatus = (id: string, status: "accepted" | "rejected") => {
    setChanges((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    toast.success(`Change ${status}`);
  };

  const pendingCount = changes.filter((c) => c.status === "pending").length;
  const acceptedCount = changes.filter((c) => c.status === "accepted").length;
  const rejectedCount = changes.filter((c) => c.status === "rejected").length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Redlining Assistant</h1>
          <p className="text-gray-500">AI-powered contract comparison and change review</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm">{pendingCount} pending</span>
          <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm">{acceptedCount} accepted</span>
          <span className="px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm">{rejectedCount} rejected</span>
        </div>
      </div>

      <div className="card bg-primary-50/50 border-primary-200">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-primary-600" />
          <h3 className="font-semibold text-primary-900">AI Summary</h3>
        </div>
        <p className="text-sm text-gray-700">Found {changes.length} changes between original and proposed versions. {changes.filter((c) => c.type === "modification").length} modifications, {changes.filter((c) => c.type === "addition").length} additions, {changes.filter((c) => c.type === "deletion").length} deletions. Overall, the proposed changes favor the licensee. AI recommends accepting {changes.filter((c) => c.aiSuggestion.includes("Recommend accepting")).length} out of {changes.length} changes.</p>
      </div>

      <div className="space-y-4">
        {changes.map((change) => (
          <div key={change.id} className={`card ${change.status === "accepted" ? "border-green-200 bg-green-50/30" : change.status === "rejected" ? "border-red-200 bg-red-50/30" : ""}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {change.type === "addition" ? <Plus className="w-4 h-4 text-green-600" /> : change.type === "deletion" ? <Minus className="w-4 h-4 text-red-600" /> : <ArrowLeftRight className="w-4 h-4 text-yellow-600" />}
                <span className="text-sm font-semibold text-gray-900">{change.section}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${change.type === "addition" ? "bg-green-100 text-green-700" : change.type === "deletion" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{change.type}</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${change.status === "accepted" ? "bg-green-100 text-green-700" : change.status === "rejected" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"}`}>{change.status}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              {change.original && (
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-xs font-medium text-red-600 mb-1">Original</p>
                  <p className="text-sm text-gray-800 line-through">{change.original}</p>
                </div>
              )}
              {change.proposed && (
                <div className={`p-3 bg-green-50 rounded-lg border border-green-200 ${!change.original ? "col-span-2" : ""}`}>
                  <p className="text-xs font-medium text-green-600 mb-1">Proposed</p>
                  <p className="text-sm text-gray-800">{change.proposed}</p>
                </div>
              )}
              {!change.proposed && (
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs font-medium text-gray-500 mb-1">Proposed: Deletion</p>
                  <p className="text-sm text-gray-400 italic">Clause removed</p>
                </div>
              )}
            </div>

            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 mb-3">
              <div className="flex items-center gap-1 mb-1"><Sparkles className="w-3 h-3 text-blue-600" /><span className="text-xs font-medium text-blue-700">AI Analysis</span></div>
              <p className="text-sm text-gray-700">{change.aiSuggestion}</p>
            </div>

            {change.status === "pending" && (
              <div className="flex gap-2">
                <button onClick={() => updateStatus(change.id, "accepted")} className="btn-primary text-xs flex items-center gap-1"><Check className="w-3 h-3" /> Accept</button>
                <button onClick={() => updateStatus(change.id, "rejected")} className="btn-danger text-xs flex items-center gap-1"><X className="w-3 h-3" /> Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
