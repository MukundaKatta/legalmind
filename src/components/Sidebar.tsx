"use client";

import { useLegalStore } from "@/lib/store";
import { Scale, LayoutDashboard, FileText, BookOpen, AlertTriangle, Search, FileOutput, GitCompare, ClipboardCheck, ChevronLeft, ChevronRight } from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "contracts", label: "Contract Analyzer", icon: FileText },
  { id: "clauses", label: "Clause Library", icon: BookOpen },
  { id: "risk", label: "Risk Assessment", icon: AlertTriangle },
  { id: "research", label: "Legal Research", icon: Search },
  { id: "generate", label: "Document Generator", icon: FileOutput },
  { id: "redline", label: "Redlining", icon: GitCompare },
  { id: "diligence", label: "Due Diligence", icon: ClipboardCheck },
];

export default function Sidebar() {
  const { activeModule, setActiveModule, sidebarOpen, toggleSidebar } = useLegalStore();

  return (
    <aside className={`${sidebarOpen ? "w-64" : "w-16"} bg-gray-900 h-screen flex flex-col transition-all duration-300`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {sidebarOpen && (
          <div className="flex items-center gap-2">
            <Scale className="w-7 h-7 text-primary-400" />
            <span className="text-lg font-bold text-white">LegalMind</span>
          </div>
        )}
        <button onClick={toggleSidebar} className="p-1 rounded hover:bg-gray-800 text-gray-400">
          {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button key={item.id} onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-primary-700/30 text-primary-300" : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"}`}>
              <Icon className={`w-5 h-5 ${isActive ? "text-primary-400" : "text-gray-500"}`} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>
      {sidebarOpen && (
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center"><span className="text-sm font-medium text-white">LM</span></div>
            <div><p className="text-sm font-medium text-white">Legal Team</p><p className="text-xs text-gray-400">Enterprise Plan</p></div>
          </div>
        </div>
      )}
    </aside>
  );
}
