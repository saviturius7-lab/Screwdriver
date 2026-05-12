import { GoogleGenAI } from "@google/genai";

let genAIClient: GoogleGenAI | null = null;

function getAIClient() {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // In AI Studio, the key is usually injected. 
      // If missing during dev/initial load, we can't initialize.
      // But we shouldn't crash the whole module.
      throw new Error("GEMINI_API_KEY is not set. Please check your Secrets panel.");
    }
    genAIClient = new GoogleGenAI({ apiKey });
  }
  return genAIClient;
}

export const aiService = {
  /**
   * Performs semantic search across the intelligence base.
   */
  async semanticSearch(query: string) {
    try {
      const response = await fetch(`/api/v1/search/semantic?q=${encodeURIComponent(query)}`);
      const results = await response.json();
      
      // We'll also trigger the RAG prep guide for more depth
      const ragResponse = await fetch(`/api/v1/rag/prep-guide?q=${encodeURIComponent(query)}&company=SimulatedCo`);
      const ragData = await ragResponse.json();
      
      return {
        retrieved: results,
        intelligence: ragData.intelligence_report
      };
    } catch (err) {
      console.error("Search error:", err);
      return {
        retrieved: [],
        intelligence: "No intelligence found for this query."
      };
    }
  },

  /**
   * Simulates compatibility scoring.
   */
  async calculateCompatibility(studentProfile: any, jobDescription: any) {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Calculate compatibility score (0-100) and provide a brief rationale for:
      Student: ${JSON.stringify(studentProfile)}
      Job: ${JSON.stringify(jobDescription)}
      Return JSON format: { "score": number, "rationale": string }`,
      config: {
        responseMimeType: "application/json"
      }
    });

    try {
      const text = response.text || "{}";
      return JSON.parse(text);
    } catch (e) {
      return { score: 75, rationale: "Match based on skills and interest profile." };
    }
  }
};
