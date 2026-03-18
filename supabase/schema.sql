-- LegalMind Database Schema
CREATE TABLE IF NOT EXISTS profiles (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email TEXT UNIQUE NOT NULL, full_name TEXT, role TEXT DEFAULT 'attorney', firm TEXT, created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS contracts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL, content TEXT DEFAULT '', type TEXT, parties TEXT[] DEFAULT '{}', status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'approved', 'signed', 'expired')), risk_level TEXT DEFAULT 'low', user_id UUID REFERENCES profiles(id) ON DELETE CASCADE, metadata JSONB DEFAULT '{}', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS clauses (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL, content TEXT NOT NULL, category TEXT, tags TEXT[] DEFAULT '{}', risk_level TEXT DEFAULT 'low', usage_count INTEGER DEFAULT 0, created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS contract_analyses (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE, summary TEXT, parties JSONB, key_terms JSONB, risks JSONB, obligations JSONB, created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS legal_research (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), query TEXT NOT NULL, results JSONB DEFAULT '[]', ai_summary TEXT, user_id UUID REFERENCES profiles(id) ON DELETE CASCADE, created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS due_diligence_items (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), project_id UUID, category TEXT, item TEXT NOT NULL, status TEXT DEFAULT 'pending', findings TEXT, risk_level TEXT DEFAULT 'none', documents TEXT[] DEFAULT '{}', user_id UUID REFERENCES profiles(id) ON DELETE CASCADE, created_at TIMESTAMPTZ DEFAULT NOW());

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE clauses ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_research ENABLE ROW LEVEL SECURITY;
ALTER TABLE due_diligence_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own data" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users manage own contracts" ON contracts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "All users can read clauses" ON clauses FOR SELECT USING (true);
CREATE POLICY "Users view own analyses" ON contract_analyses FOR ALL USING (contract_id IN (SELECT id FROM contracts WHERE user_id = auth.uid()));
CREATE POLICY "Users manage own research" ON legal_research FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own dd items" ON due_diligence_items FOR ALL USING (auth.uid() = user_id);
