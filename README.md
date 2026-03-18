# LegalMind

> AI-powered legal assistant platform with contract analysis, clause libraries, risk assessment, and document generation.

## Features

- **Dashboard** -- Overview of active contracts, risk levels, pending reviews, and recent activity
- **Contract Analyzer** -- Upload and analyze contracts with AI-powered clause extraction and issue detection
- **Clause Library** -- Searchable library of standard legal clauses with version tracking
- **Risk Assessment** -- AI-driven contract risk scoring with detailed breakdowns and mitigation suggestions
- **Legal Research** -- AI-assisted legal research with case law references and jurisdiction support
- **Document Generator** -- Generate legal documents from templates with AI-powered customization
- **Redlining Assistant** -- AI-assisted contract redlining with change tracking and suggestions
- **Due Diligence** -- Structured due diligence workflow with checklist management and findings tracking

## Tech Stack

| Layer     | Technology                          |
| --------- | ----------------------------------- |
| Framework | Next.js 14 (App Router)             |
| Language  | TypeScript                          |
| AI        | OpenAI API                          |
| UI        | Tailwind CSS, Lucide React          |
| State     | Zustand                             |
| Toasts    | react-hot-toast                     |
| Dates     | date-fns                            |
| Backend   | Supabase (Auth + Database)          |

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add Supabase and OpenAI credentials

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
legalmind/
├── src/
│   ├── app/
│   │   └── page.tsx              # Module router
│   ├── components/
│   │   ├── Sidebar.tsx           # Navigation sidebar
│   │   ├── Dashboard.tsx         # Overview dashboard
│   │   ├── ContractAnalyzer.tsx  # Contract analysis
│   │   ├── ClauseLibrary.tsx     # Clause library
│   │   ├── RiskAssessment.tsx    # Risk scoring
│   │   ├── LegalResearch.tsx     # Research assistant
│   │   ├── DocumentGenerator.tsx # Document generation
│   │   ├── RedliningAssistant.tsx# Redlining tool
│   │   └── DueDiligence.tsx      # Due diligence workflow
│   └── lib/
│       └── store.ts              # Zustand store
└── package.json
```

## License

MIT
