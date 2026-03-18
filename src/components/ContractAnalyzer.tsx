"use client";

import { useState } from "react";
import { FileText, Upload, Sparkles, AlertTriangle, CheckCircle, Eye, Download } from "lucide-react";
import toast from "react-hot-toast";

interface AnalysisResult {
  summary: string;
  parties: string[];
  keyTerms: { term: string; value: string }[];
  risks: { description: string; severity: "high" | "medium" | "low"; recommendation: string }[];
  obligations: { party: string; obligation: string }[];
}

export default function ContractAnalyzer() {
  const [contractText, setContractText] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const sampleContract = `SOFTWARE LICENSE AGREEMENT

This Software License Agreement ("Agreement") is entered into as of March 17, 2026, by and between TechCorp Inc., a Delaware corporation ("Licensor"), and Acme Solutions LLC, a California limited liability company ("Licensee").

1. GRANT OF LICENSE
Licensor hereby grants to Licensee a non-exclusive, non-transferable license to use the Software for internal business purposes only. The license is limited to 100 user seats.

2. TERM AND TERMINATION
This Agreement shall be effective for a period of 36 months from the Effective Date. Either party may terminate this Agreement with 90 days written notice. Upon termination, Licensee shall cease all use of the Software and destroy all copies.

3. FEES AND PAYMENT
Licensee shall pay Licensor an annual license fee of $250,000, payable in quarterly installments. Late payments shall accrue interest at 1.5% per month. Licensor reserves the right to increase fees by up to 15% upon renewal.

4. LIMITATION OF LIABILITY
IN NO EVENT SHALL LICENSOR'S TOTAL LIABILITY EXCEED THE FEES PAID BY LICENSEE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM. LICENSOR SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES.

5. INDEMNIFICATION
Licensee shall indemnify, defend, and hold harmless Licensor from any claims arising from Licensee's use of the Software. Licensor shall indemnify Licensee against third-party IP infringement claims.

6. CONFIDENTIALITY
Both parties agree to maintain the confidentiality of proprietary information for a period of 5 years following termination.

7. GOVERNING LAW
This Agreement shall be governed by the laws of the State of Delaware.`;

  const analyzeContract = async () => {
    if (!contractText.trim()) {
      setContractText(sampleContract);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/ai/analyze-contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contract: contractText }),
      });
      const data = await res.json();
      setAnalysis(data);
      toast.success("Contract analyzed successfully");
    } catch {
      // Fallback demo
      setAnalysis({
        summary: "36-month software license agreement between TechCorp Inc. (Licensor) and Acme Solutions LLC (Licensee) for 100 user seats at $250,000/year.",
        parties: ["TechCorp Inc. (Licensor)", "Acme Solutions LLC (Licensee)"],
        keyTerms: [
          { term: "License Type", value: "Non-exclusive, non-transferable" },
          { term: "Duration", value: "36 months" },
          { term: "User Seats", value: "100" },
          { term: "Annual Fee", value: "$250,000" },
          { term: "Payment", value: "Quarterly installments" },
          { term: "Termination Notice", value: "90 days written notice" },
          { term: "Governing Law", value: "Delaware" },
        ],
        risks: [
          { description: "Fee increase cap of 15% upon renewal allows significant cost escalation", severity: "high", recommendation: "Negotiate a lower cap (e.g., 5%) or tie increases to CPI" },
          { description: "Late payment interest rate of 1.5% per month (18% annually) is above market rate", severity: "medium", recommendation: "Negotiate to 1% per month or prime rate + 2%" },
          { description: "Broad indemnification obligation on Licensee side", severity: "medium", recommendation: "Limit indemnification to claims arising from Licensee's negligence or breach" },
          { description: "5-year post-termination confidentiality period is lengthy", severity: "low", recommendation: "Consider reducing to 3 years or making mutual" },
        ],
        obligations: [
          { party: "Licensee", obligation: "Pay $250K annual license fee quarterly" },
          { party: "Licensee", obligation: "Limit usage to 100 user seats" },
          { party: "Licensee", obligation: "Destroy all copies upon termination" },
          { party: "Licensor", obligation: "Provide software license for 36 months" },
          { party: "Licensor", obligation: "Indemnify against IP infringement claims" },
        ],
      });
      toast.success("Contract analyzed (demo mode)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contract Analyzer</h1>
          <p className="text-gray-500">AI-powered contract review and risk identification</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-2"><Upload className="w-4 h-4" /> Upload PDF</button>
          <button onClick={analyzeContract} disabled={loading} className="btn-primary flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        {/* Contract Input */}
        <div className="flex-1 card">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><FileText className="w-4 h-4" /> Contract Text</h3>
          <textarea
            value={contractText}
            onChange={(e) => setContractText(e.target.value)}
            className="input min-h-[500px] font-mono text-sm resize-none"
            placeholder="Paste your contract text here or click Analyze to load a sample..."
          />
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="w-[480px] space-y-4 overflow-y-auto max-h-[calc(100vh-10rem)]">
            {/* Summary */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-2">Summary</h3>
              <p className="text-sm text-gray-700">{analysis.summary}</p>
            </div>

            {/* Parties */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-2">Parties</h3>
              <div className="space-y-1">{analysis.parties.map((p, i) => (
                <p key={i} className="text-sm text-gray-700 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary-500" />{p}</p>
              ))}</div>
            </div>

            {/* Key Terms */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-2">Key Terms</h3>
              <div className="space-y-2">{analysis.keyTerms.map((kt, i) => (
                <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">{kt.term}</span>
                  <span className="text-sm font-medium text-gray-900">{kt.value}</span>
                </div>
              ))}</div>
            </div>

            {/* Risks */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-500" /> Identified Risks</h3>
              <div className="space-y-3">{analysis.risks.map((risk, i) => (
                <div key={i} className={`p-3 rounded-lg border-l-4 ${
                  risk.severity === "high" ? "bg-red-50 border-red-500" : risk.severity === "medium" ? "bg-yellow-50 border-yellow-500" : "bg-green-50 border-green-500"
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold uppercase ${risk.severity === "high" ? "text-red-600" : risk.severity === "medium" ? "text-yellow-600" : "text-green-600"}`}>{risk.severity}</span>
                  </div>
                  <p className="text-sm text-gray-800">{risk.description}</p>
                  <p className="text-xs text-gray-600 mt-1"><strong>Recommendation:</strong> {risk.recommendation}</p>
                </div>
              ))}</div>
            </div>

            {/* Obligations */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Obligations</h3>
              <div className="space-y-2">{analysis.obligations.map((ob, i) => (
                <div key={i} className="p-2 bg-gray-50 rounded-lg">
                  <span className="text-xs font-medium text-primary-600">{ob.party}</span>
                  <p className="text-sm text-gray-700">{ob.obligation}</p>
                </div>
              ))}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
