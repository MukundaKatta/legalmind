"use client";

import { FileText, AlertTriangle, CheckCircle, Clock, TrendingUp, Scale, ArrowRight } from "lucide-react";
import { useLegalStore } from "@/lib/store";

export default function Dashboard() {
  const { setActiveModule } = useLegalStore();

  const stats = [
    { label: "Active Contracts", value: 47, icon: FileText, color: "text-blue-500", bg: "bg-blue-50", trend: "+5 this month" },
    { label: "High Risk Items", value: 8, icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50", trend: "-2 from last week" },
    { label: "Awaiting Review", value: 12, icon: Clock, color: "text-yellow-500", bg: "bg-yellow-50", trend: "3 urgent" },
    { label: "Completed Reviews", value: 156, icon: CheckCircle, color: "text-green-500", bg: "bg-green-50", trend: "+23 this month" },
  ];

  const recentContracts = [
    { title: "Software License Agreement - TechCorp", status: "review", risk: "medium", date: "Mar 17, 2026" },
    { title: "NDA - Partner Inc.", status: "approved", risk: "low", date: "Mar 16, 2026" },
    { title: "Employment Contract - Senior Dev", status: "draft", risk: "low", date: "Mar 16, 2026" },
    { title: "Service Agreement - CloudPro", status: "review", risk: "high", date: "Mar 15, 2026" },
    { title: "Lease Agreement - Office Space", status: "signed", risk: "medium", date: "Mar 14, 2026" },
  ];

  const riskAlerts = [
    { text: "Unlimited liability clause in TechCorp agreement", level: "high" },
    { text: "Missing data protection addendum in CloudPro contract", level: "high" },
    { text: "Auto-renewal clause without termination notice in lease", level: "medium" },
    { text: "Non-standard indemnification in Partner NDA", level: "medium" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Legal Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your legal operations and AI insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card">
            <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Contracts</h2>
            <button onClick={() => setActiveModule("contracts")} className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">View all <ArrowRight className="w-4 h-4" /></button>
          </div>
          <div className="space-y-3">
            {recentContracts.map((contract, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{contract.title}</p>
                    <p className="text-xs text-gray-500">{contract.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    contract.risk === "high" ? "bg-red-100 text-red-700" : contract.risk === "medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                  }`}>{contract.risk} risk</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    contract.status === "approved" ? "bg-green-100 text-green-700" : contract.status === "signed" ? "bg-blue-100 text-blue-700" : contract.status === "review" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"
                  }`}>{contract.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-semibold text-gray-900">Risk Alerts</h2>
          </div>
          <div className="space-y-3">
            {riskAlerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${alert.level === "high" ? "bg-red-500" : "bg-yellow-500"}`} />
                <div>
                  <p className="text-sm text-gray-700">{alert.text}</p>
                  <span className={`text-xs font-medium ${alert.level === "high" ? "text-red-600" : "text-yellow-600"}`}>{alert.level} priority</span>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setActiveModule("risk")} className="btn-secondary w-full mt-4">View Full Risk Report</button>
        </div>
      </div>
    </div>
  );
}
