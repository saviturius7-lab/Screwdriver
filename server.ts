import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Mock API routes for the Architecture Blueprint
  app.get("/api/v1/health", (req, res) => {
    res.json({ 
      status: "operational",
      version: "1.2.0-Alpha",
      latency: "0.04s",
      services: {
        vector_db: "connected",
        redis: "active",
        celery_workers: 4
      }
    });
  });

  app.get("/api/v1/search/semantic", (req, res) => {
    const q = req.query.q as string;
    // Simulate vector search results
    const mockResults = [
      { id: "1", content: `Technical questions frequency for ${q || 'Generic'} roles...`, difficulty: 4, company: "Google" },
      { id: "2", content: `System design patterns preferred by ${q || 'top'} firms...`, difficulty: 5, company: "Stripe" },
      { id: "3", content: `HR behavioral questions at ${q || 'leading'} startups...`, difficulty: 2, company: "Postmark" }
    ];
    res.json(mockResults);
  });

  app.get("/api/v1/rag/prep-guide", async (req, res) => {
    const q = req.query.q as string;
    const company = req.query.company as string;
    
    // In a real app, this would call Gemini with retrieved context.
    // For the preview, we return a structured simulation.
    res.json({
      query: q,
      company: company,
      intelligence_report: `# Strategic Preparation Guide for ${company}\n\n## High-Frequency Topics\n- Disributed Systems\n- LLD (Low Level Design)\n- Culture Fit (Leadership Principles)\n\n## Mock Interview Questions\n1. Design a rate-limiter for a multi-tenant API.\n2. How do you handle database consistency in a write-heavy environment?\n\n## Difficulty Index: 4.5/5\n*Recommended prep time: 3 weeks.*`
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CampusLink AI Platform running on http://localhost:${PORT}`);
  });
}

startServer();
