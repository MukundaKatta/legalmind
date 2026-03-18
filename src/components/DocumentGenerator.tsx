"use client";

import { useState } from "react";
import { FileOutput, Sparkles, Download, Copy } from "lucide-react";
import toast from "react-hot-toast";

const templates = [
  { id: "nda", name: "Non-Disclosure Agreement", description: "Standard mutual NDA for business discussions" },
  { id: "sla", name: "Service Level Agreement", description: "SLA for software/service contracts" },
  { id: "employment", name: "Employment Contract", description: "Standard employment agreement" },
  { id: "saas", name: "SaaS License Agreement", description: "Software-as-a-Service license terms" },
  { id: "consulting", name: "Consulting Agreement", description: "Independent contractor consulting terms" },
  { id: "ip-assignment", name: "IP Assignment Agreement", description: "Intellectual property rights transfer" },
  { id: "partnership", name: "Partnership Agreement", description: "Business partnership formation terms" },
  { id: "privacy", name: "Privacy Policy", description: "Website/app privacy policy document" },
];

export default function DocumentGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedDoc, setGeneratedDoc] = useState("");
  const [loading, setLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/generate-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template: selectedTemplate, data: formData, customPrompt }),
      });
      const data = await res.json();
      setGeneratedDoc(data.document);
      toast.success("Document generated!");
    } catch {
      setGeneratedDoc(`NON-DISCLOSURE AGREEMENT\n\nThis Non-Disclosure Agreement ("Agreement") is entered into as of ${new Date().toLocaleDateString()} by and between:\n\nParty A: ${formData.party_a || "[Company Name]"} ("Disclosing Party")\nParty B: ${formData.party_b || "[Recipient Name]"} ("Receiving Party")\n\n1. DEFINITION OF CONFIDENTIAL INFORMATION\n"Confidential Information" means any non-public information disclosed by either party to the other, whether orally, in writing, or by any other means.\n\n2. OBLIGATIONS\nThe Receiving Party shall: (a) maintain all Confidential Information in strict confidence; (b) not disclose any Confidential Information to third parties without prior written consent; (c) use Confidential Information solely for the Purpose.\n\n3. TERM\nThis Agreement shall remain in effect for a period of ${formData.term || "2"} years from the date of execution.\n\n4. RETURN OF MATERIALS\nUpon termination, the Receiving Party shall return or destroy all Confidential Information.\n\n5. GOVERNING LAW\nThis Agreement shall be governed by the laws of ${formData.jurisdiction || "the State of Delaware"}.\n\nIN WITNESS WHEREOF, the parties have executed this Agreement.\n\n_____________________\n${formData.party_a || "[Company Name]"}\n\n_____________________\n${formData.party_b || "[Recipient Name]"}`);
      toast.success("Document generated (demo mode)");
    } finally {
      setLoading(false);
    }
  };

  const templateFields: Record<string, { label: string; key: string }[]> = {
    nda: [
      { label: "Disclosing Party", key: "party_a" },
      { label: "Receiving Party", key: "party_b" },
      { label: "Term (years)", key: "term" },
      { label: "Jurisdiction", key: "jurisdiction" },
      { label: "Purpose", key: "purpose" },
    ],
    sla: [
      { label: "Provider Name", key: "provider" },
      { label: "Client Name", key: "client" },
      { label: "Uptime Guarantee (%)", key: "uptime" },
      { label: "Response Time (hours)", key: "response_time" },
    ],
    employment: [
      { label: "Company Name", key: "company" },
      { label: "Employee Name", key: "employee" },
      { label: "Job Title", key: "title" },
      { label: "Annual Salary", key: "salary" },
      { label: "Start Date", key: "start_date" },
    ],
  };

  const fields = selectedTemplate ? (templateFields[selectedTemplate] || [
    { label: "Party A", key: "party_a" },
    { label: "Party B", key: "party_b" },
    { label: "Jurisdiction", key: "jurisdiction" },
  ]) : [];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Document Generator</h1>
        <p className="text-gray-500">Generate legal documents from templates with AI assistance</p>
      </div>

      {!generatedDoc ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Select Template</h3>
            <div className="grid grid-cols-2 gap-3">
              {templates.map((t) => (
                <button key={t.id} onClick={() => setSelectedTemplate(t.id)}
                  className={`text-left p-4 rounded-lg border-2 transition-colors ${selectedTemplate === t.id ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-gray-300"}`}>
                  <FileOutput className="w-5 h-5 text-primary-600 mb-2" />
                  <p className="text-sm font-medium text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{t.description}</p>
                </button>
              ))}
            </div>
          </div>

          {selectedTemplate && (
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Document Details</h3>
              <div className="space-y-3">
                {fields.map((field) => (
                  <div key={field.key}>
                    <label className="text-xs font-medium text-gray-500">{field.label}</label>
                    <input value={formData[field.key] || ""} onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })} className="input" />
                  </div>
                ))}
                <div>
                  <label className="text-xs font-medium text-gray-500">Additional Instructions (optional)</label>
                  <textarea value={customPrompt} onChange={(e) => setCustomPrompt(e.target.value)} className="input min-h-[80px]" placeholder="Any special terms or requirements..." />
                </div>
                <button onClick={generate} disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" /> {loading ? "Generating..." : "Generate Document"}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setGeneratedDoc("")} className="btn-secondary">Back to Templates</button>
            <div className="flex gap-2">
              <button onClick={() => { navigator.clipboard.writeText(generatedDoc); toast.success("Copied!"); }} className="btn-secondary flex items-center gap-2"><Copy className="w-4 h-4" /> Copy</button>
              <button className="btn-primary flex items-center gap-2"><Download className="w-4 h-4" /> Download</button>
            </div>
          </div>
          <div className="card">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">{generatedDoc}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
