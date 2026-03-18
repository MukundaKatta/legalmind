"use client";

import { useState } from "react";
import { Search, Sparkles, BookOpen, ExternalLink, Clock, Filter } from "lucide-react";
import toast from "react-hot-toast";

interface ResearchResult {
  id: string;
  title: string;
  source: string;
  summary: string;
  relevance: number;
  year: string;
  jurisdiction: string;
  type: "case_law" | "statute" | "regulation" | "article";
}

const sampleResults: ResearchResult[] = [
  { id: "1", title: "Smith v. Tech Solutions Inc. (2025)", source: "9th Circuit Court of Appeals", summary: "Court held that software license limitations must be clearly communicated to be enforceable. Ambiguous terms resolved in favor of the licensee.", relevance: 0.95, year: "2025", jurisdiction: "Federal - 9th Circuit", type: "case_law" },
  { id: "2", title: "California Business & Professions Code Section 16600", source: "California Legislature", summary: "Non-compete agreements are generally void in California except in limited circumstances involving the sale of a business.", relevance: 0.88, year: "2024", jurisdiction: "California", type: "statute" },
  { id: "3", title: "GDPR Article 28 - Processor Requirements", source: "European Commission", summary: "Detailed requirements for data processing agreements including mandatory clauses for data processor contracts.", relevance: 0.82, year: "2018", jurisdiction: "EU", type: "regulation" },
  { id: "4", title: "Limitations of Liability in SaaS Contracts", source: "Harvard Law Review", summary: "Analysis of enforceability trends in liability caps, finding courts increasingly scrutinize one-sided limitation clauses.", relevance: 0.78, year: "2025", jurisdiction: "US - Federal", type: "article" },
  { id: "5", title: "DataCorp v. CloudServices LLC (2024)", source: "Delaware Chancery Court", summary: "Court enforced liability cap despite alleged gross negligence, distinguishing between contract and tort claims.", relevance: 0.75, year: "2024", jurisdiction: "Delaware", type: "case_law" },
];

const typeLabels = { case_law: "Case Law", statute: "Statute", regulation: "Regulation", article: "Article" };
const typeColors = { case_law: "bg-blue-100 text-blue-700", statute: "bg-green-100 text-green-700", regulation: "bg-purple-100 text-purple-700", article: "bg-orange-100 text-orange-700" };

export default function LegalResearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResearchResult[]>([]);
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResults(sampleResults);
      setAiSummary(`Based on your research query "${query}", here are the key findings:\n\n1. Non-compete clauses face significant enforceability challenges, particularly in California (Cal. B&P Code Section 16600).\n2. Recent case law (Smith v. Tech Solutions) supports narrow interpretation of license restrictions.\n3. GDPR Article 28 mandates specific clauses in data processing agreements.\n4. Liability caps in SaaS contracts remain generally enforceable but face increasing judicial scrutiny.\n\nRecommendation: Review your contract clauses against these recent legal developments to ensure enforceability and compliance.`);
      setLoading(false);
    }, 1000);
  };

  const filteredResults = filterType === "all" ? results : results.filter((r) => r.type === filterType);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Legal Research</h1>
        <p className="text-gray-500">AI-powered legal research across case law, statutes, and regulations</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full pl-12 pr-32 py-4 text-lg rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" placeholder="Research legal topics, case law, statutes..." />
        <button onClick={handleSearch} disabled={loading} className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary">
          {loading ? "Researching..." : "Research"}
        </button>
      </div>

      {results.length === 0 && (
        <div className="card text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Start Your Legal Research</h3>
          <p className="text-gray-500 mb-4">Try searching for topics like:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["non-compete enforceability", "GDPR data processing", "SaaS liability caps", "IP assignment best practices"].map((q) => (
              <button key={q} onClick={() => setQuery(q)} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-gray-200">{q}</button>
            ))}
          </div>
        </div>
      )}

      {aiSummary && (
        <div className="card border-primary-200 bg-primary-50/50">
          <div className="flex items-center gap-2 mb-3"><Sparkles className="w-5 h-5 text-primary-600" /><h3 className="font-semibold text-primary-900">AI Research Summary</h3></div>
          <p className="text-sm text-gray-800 whitespace-pre-wrap">{aiSummary}</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="flex gap-2">
          {["all", "case_law", "statute", "regulation", "article"].map((t) => (
            <button key={t} onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${filterType === t ? "bg-primary-100 text-primary-700" : "bg-gray-100 text-gray-600"}`}>
              {t === "all" ? "All" : typeLabels[t as keyof typeof typeLabels]}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {filteredResults.map((result) => (
          <div key={result.id} className="card hover:border-gray-300 cursor-pointer transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[result.type]}`}>{typeLabels[result.type]}</span>
                <span className="text-xs text-gray-400">{result.jurisdiction}</span>
              </div>
              <span className="text-xs font-medium text-primary-600">{Math.round(result.relevance * 100)}% relevant</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{result.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{result.source} ({result.year})</p>
            <p className="text-sm text-gray-700">{result.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
