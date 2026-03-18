import { create } from "zustand";

export interface Contract {
  id: string;
  title: string;
  content: string;
  type: string;
  parties: string[];
  status: "draft" | "review" | "approved" | "signed" | "expired";
  risk_level: "low" | "medium" | "high";
  created_at: string;
  updated_at: string;
  clauses: Clause[];
}

export interface Clause {
  id: string;
  title: string;
  content: string;
  type: string;
  risk_level: "low" | "medium" | "high";
  suggestions: string[];
}

export interface LegalResearch {
  id: string;
  query: string;
  results: { title: string; summary: string; relevance: number; source: string }[];
  created_at: string;
}

interface LegalState {
  contracts: Contract[];
  activeContract: Contract | null;
  activeModule: string;
  sidebarOpen: boolean;
  setContracts: (c: Contract[]) => void;
  setActiveContract: (c: Contract | null) => void;
  addContract: (c: Contract) => void;
  setActiveModule: (m: string) => void;
  toggleSidebar: () => void;
}

export const useLegalStore = create<LegalState>((set) => ({
  contracts: [],
  activeContract: null,
  activeModule: "dashboard",
  sidebarOpen: true,
  setContracts: (contracts) => set({ contracts }),
  setActiveContract: (activeContract) => set({ activeContract }),
  addContract: (c) => set((s) => ({ contracts: [...s.contracts, c] })),
  setActiveModule: (activeModule) => set({ activeModule }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}));
