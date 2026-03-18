import { NextRequest, NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { template, data, customPrompt } = await req.json();
    const systemPrompt = `You are an expert legal document generator. Generate a complete, professional legal document based on the template type and provided data. Include all standard clauses and provisions. Use proper legal formatting.`;
    const userMessage = `Template: ${template}\nData: ${JSON.stringify(data)}\nAdditional instructions: ${customPrompt || "None"}`;
    const document = await generateAIResponse(systemPrompt, userMessage);
    return NextResponse.json({ document });
  } catch (error) {
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
