import { GoogleGenerativeAI } from "@google/generative-ai";

export const geminiClient = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

  // Gemini is initialized but gated due to API quota limits.
// Current analysis uses deterministic logic for transparency.
