"use client";

import { useLegalStore } from "@/lib/store";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import ContractAnalyzer from "@/components/ContractAnalyzer";
import ClauseLibrary from "@/components/ClauseLibrary";
import RiskAssessment from "@/components/RiskAssessment";
import LegalResearch from "@/components/LegalResearch";
import DocumentGenerator from "@/components/DocumentGenerator";
import RedliningAssistant from "@/components/RedliningAssistant";
import DueDiligence from "@/components/DueDiligence";

const modules: Record<string, React.ComponentType> = {
  dashboard: Dashboard,
  contracts: ContractAnalyzer,
  clauses: ClauseLibrary,
  risk: RiskAssessment,
  research: LegalResearch,
  generate: DocumentGenerator,
  redline: RedliningAssistant,
  diligence: DueDiligence,
};

export default function Home() {
  const { activeModule } = useLegalStore();
  const ActiveComponent = modules[activeModule] || Dashboard;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6"><ActiveComponent /></main>
    </div>
  );
}
