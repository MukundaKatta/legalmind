import { NextRequest, NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { contract } = await req.json();
    const systemPrompt = `You are an expert legal AI assistant. Analyze the following contract and return a JSON object with: summary (string), parties (array of strings), keyTerms (array of {term, value}), risks (array of {description, severity: "high"|"medium"|"low", recommendation}), obligations (array of {party, obligation}). Be thorough and identify all risks.`;
    const result = await generateAIResponse(systemPrompt, contract);
    try {
      return NextResponse.json(JSON.parse(result));
    } catch {
      return NextResponse.json({ summary: result, parties: [], keyTerms: [], risks: [], obligations: [] });
    }
  } catch (error) {
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
