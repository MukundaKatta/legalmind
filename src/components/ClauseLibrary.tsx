"use client";

import { useState } from "react";
import { BookOpen, Search, Plus, Copy, Tag, Filter } from "lucide-react";
import toast from "react-hot-toast";

interface ClauseItem {
  id: string;
  title: string;
  category: string;
  content: string;
  tags: string[];
  usage_count: number;
  risk_level: "low" | "medium" | "high";
}

const sampleClauses: ClauseItem[] = [
  { id: "1", title: "Standard Confidentiality", category: "Confidentiality", content: "Each party agrees to maintain the confidentiality of all Confidential Information received from the other party and shall not disclose such information to any third party without prior written consent, except as required by law.", tags: ["NDA", "mutual", "standard"], usage_count: 45, risk_level: "low" },
  { id: "2", title: "Limitation of Liability", category: "Liability", content: "IN NO EVENT SHALL EITHER PARTY'S TOTAL AGGREGATE LIABILITY EXCEED THE AMOUNTS PAID OR PAYABLE UNDER THIS AGREEMENT DURING THE TWELVE (12) MONTH PERIOD PRECEDING THE EVENT GIVING RISE TO THE CLAIM.", tags: ["liability", "cap", "standard"], usage_count: 38, risk_level: "medium" },
  { id: "3", title: "Force Majeure", category: "General", content: "Neither party shall be liable for any failure or delay in performing its obligations under this Agreement due to circumstances beyond its reasonable control, including but not limited to acts of God, natural disasters, pandemic, war, terrorism, labor disputes, or government actions.", tags: ["force-majeure", "standard"], usage_count: 32, risk_level: "low" },
  { id: "4", title: "IP Assignment", category: "Intellectual Property", content: "All intellectual property rights in any work product created by the Service Provider in connection with this Agreement shall be assigned to and owned by the Client. Service Provider hereby irrevocably assigns all rights, title, and interest.", tags: ["IP", "assignment", "work-for-hire"], usage_count: 28, risk_level: "medium" },
  { id: "5", title: "Non-Compete Clause", category: "Restrictive Covenants", content: "During the term of this Agreement and for a period of twelve (12) months following termination, the Receiving Party shall not directly or indirectly engage in any business that competes with the Disclosing Party's business within the Territory.", tags: ["non-compete", "restrictive"], usage_count: 15, risk_level: "high" },
  { id: "6", title: "Termination for Convenience", category: "Termination", content: "Either party may terminate this Agreement for any reason upon sixty (60) days' prior written notice to the other party. Upon termination, all obligations under this Agreement shall cease except those which by their nature survive termination.", tags: ["termination", "convenience"], usage_count: 42, risk_level: "low" },
  { id: "7", title: "Data Protection Clause", category: "Privacy", content: "The Processor shall process Personal Data only on documented instructions from the Controller, including with regard to transfers of personal data to a third country, in compliance with applicable Data Protection Laws including GDPR and CCPA.", tags: ["GDPR", "CCPA", "privacy", "data-protection"], usage_count: 35, risk_level: "medium" },
];

const categories = ["All", "Confidentiality", "Liability", "General", "Intellectual Property", "Restrictive Covenants", "Termination", "Privacy"];

export default function ClauseLibrary() {
  const [clauses] = useState<ClauseItem[]>(sampleClauses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedClause, setSelectedClause] = useState<ClauseItem | null>(null);

  const filteredClauses = clauses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyClause = (clause: ClauseItem) => {
    navigator.clipboard.writeText(clause.content);
    toast.success("Clause copied to clipboard");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clause Library</h1>
          <p className="text-gray-500">{clauses.length} clauses across {categories.length - 1} categories</p>
        </div>
        <button className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Add Clause</button>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input pl-9" placeholder="Search clauses..." />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat ? "bg-primary-100 text-primary-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <div className="flex-1 space-y-3">
          {filteredClauses.map((clause) => (
            <div key={clause.id} onClick={() => setSelectedClause(clause)}
              className={`card cursor-pointer transition-colors ${selectedClause?.id === clause.id ? "border-primary-500 bg-primary-50" : "hover:border-gray-300"}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{clause.title}</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${clause.risk_level === "high" ? "bg-red-100 text-red-700" : clause.risk_level === "medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>{clause.risk_level}</span>
                  <button onClick={(e) => { e.stopPropagation(); copyClause(clause); }} className="p-1 rounded hover:bg-gray-100"><Copy className="w-4 h-4 text-gray-400" /></button>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{clause.content}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-1">{clause.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full text-gray-500 flex items-center gap-0.5"><Tag className="w-2.5 h-2.5" />{tag}</span>
                ))}</div>
                <span className="text-xs text-gray-400">Used {clause.usage_count} times</span>
              </div>
            </div>
          ))}
        </div>

        {selectedClause && (
          <div className="w-96 card sticky top-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{selectedClause.title}</h3>
              <span className="text-xs font-medium text-gray-500">{selectedClause.category}</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg mb-4">
              <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{selectedClause.content}</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Risk Level</span>
                <span className={`font-medium ${selectedClause.risk_level === "high" ? "text-red-600" : selectedClause.risk_level === "medium" ? "text-yellow-600" : "text-green-600"}`}>{selectedClause.risk_level}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Usage Count</span>
                <span className="font-medium text-gray-900">{selectedClause.usage_count}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => copyClause(selectedClause)} className="btn-primary flex-1 flex items-center justify-center gap-2"><Copy className="w-4 h-4" /> Copy</button>
              <button className="btn-secondary flex-1">Edit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
