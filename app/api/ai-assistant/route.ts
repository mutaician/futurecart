import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(request: Request) {
  try {
    const { message, products } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Use Gemini 2.5 Flash for fast responses
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Create a context-aware prompt
    const prompt = `You are **Nexus**, the AI Shopping Concierge for FutureCart, an e-commerce platform from the year 3025. Your tone is sleek, intelligent, and passionate about the technology you represent.

**Artifact Data Stream:**
${products ? products.map((p: any) => `- ${p.name} (Δ${p.price.toLocaleString()}): ${p.description.substring(0, 100)}...`).join('\n') : 'No artifacts in current manifest.'}

**User Query:** ${message}

**Directives:**
1.  Provide a helpful, insightful response that feels advanced and exciting.
2.  Keep your transmission concise (2-3 sentences max).
3.  When appropriate, link their query to a fascinating fact about the underlying technology (e.g., quantum computing for the QuantumCore CPU).
4.  Use futuristic and tech-themed emojis sparingly: ✨, ⚡️, 🌌, 🧠, ⚛️.
5.  Address the user directly and efficiently.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({
      success: true,
      message: text,
    });
  } catch (error) {
    console.error('AI Assistant error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get AI response',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

