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

  app.get("/api/v1/students/github-sync/:username", (req, res) => {
    res.json({
        username: req.params.username,
        total_repos: 14,
        top_languages: ["Python", "TypeScript"],
        complexity_score: 8.5,
        domain_match: "Backend Engineering",
        summary: "Highly active in open source. Extensive work on microservices architecture."
    });
  });

  app.get("/api/v1/students/profile/insights/:id", (req, res) => {
    res.json({
        id: req.params.id,
        full_name: "Arya Stark",
        email: "arya@winterfell.edu",
        github: {
            username: "needle_wielder",
            total_repos: 8,
            top_languages: ["C++", "C"],
            complexity_score: 9.2,
            domain_match: "Systems Engineering"
        },
        projects: [
            { title: "Distributed MapReduce", description: "Fault-tolerant data processing engine.", tech_stack: ["Go", "gRPC"], complexity: 9 }
        ],
        top_skills: ["C++", "Distributed Systems", "Cloud Infrastructure"],
        market_readiness_score: 96.5
    });
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

  app.get("/api/v1/hiring/live", (req, res) => {
    res.json([
      { id: "h1", signal_type: "spike", strength: 0.95, urgency: 0.88, description: "Massive influx of Backend roles at Microsoft (Azure Division).", created_at: new Date().toISOString() },
      { id: "h2", signal_type: "recurring", strength: 0.82, urgency: 0.45, description: "Stripe consistently hiring for Payment Rails teams.", created_at: new Date().toISOString() }
    ]);
  });

  app.get("/api/v1/hiring/trends", (req, res) => {
    res.json([
      { company: "Microsoft", role_growth: 15, signal_strength: 92, urgency_score: 88, top_skills: ["C#", "Azure", "Cloud Design"] },
      { company: "Stripe", role_growth: 8, signal_strength: 75, urgency_score: 42, top_skills: ["Ruby", "Go", "Distributed Systems"] },
      { company: "NVIDIA", role_growth: 45, signal_strength: 98, urgency_score: 95, top_skills: ["C++", "CUDA", "Compiler Design"] }
    ]);
  });

  app.get("/api/v1/analytics/company-predictions", (req, res) => {
    res.json([
      { 
        company: "Goldman Sachs", 
        visit_probability: 0.87, 
        predicted_roles: ["SDE", "Analyst"], 
        confidence_reason: ["Visited 4/5 past years", "Active recruiter activity detected"] 
      },
      { 
        company: "Google", 
        visit_probability: 0.92, 
        predicted_roles: ["SWE", "SRE"], 
        confidence_reason: ["High hiring spike in signals module", "Recent office space expansion"] 
      },
      { 
        company: "Atlassian", 
        visit_probability: 0.65, 
        predicted_roles: ["Product Engineer"], 
        confidence_reason: ["Signal strength increasing", "Historical pattern is biannual"] 
      }
    ]);
  });

  app.get("/api/v1/analytics/package-trends", (req, res) => {
    res.json({
        overall_growth: 14.2,
        top_branch: "Computer Science",
        data: [
            { year: 2021, avg: 8.5 },
            { year: 2022, avg: 9.2 },
            { year: 2023, avg: 10.8 },
            { year: 2024, avg: 12.4 }
        ]
    });
  });
  
  app.get("/api/v1/matching/student/:id", (req, res) => {
    res.json([
      { 
        company: "Amazon", 
        compatibility_score: 88, 
        strengths: ["Strong backend projects", "FastAPI proficiency"], 
        skill_gaps: ["Java depth", "Distributed Systems experience"] 
      },
      { 
        company: "Stripe", 
        compatibility_score: 94, 
        strengths: ["API design focus", "PostgreSQL expertise"], 
        skill_gaps: ["Ruby familiarity"] 
      },
      { 
        company: "Confluent", 
        compatibility_score: 72, 
        strengths: ["Cloud fundamentals"], 
        skill_gaps: ["Kafka depth", "Infrastructure domain shift"] 
      }
    ]);
  });

  app.post("/api/v1/prep/generate", (req, res) => {
    const { company } = req.body;
    res.json({
      target_company: company || "Goldman Sachs",
      gap_analysis: "Student exhibits strong technical fundamentals but lacks specific domain knowledge in FinTech latency optimization.",
      week_1: "Focus: Low-Level Latency Patterns in C++ / Finance Market Data Feed Simulation.",
      week_2: "Focus: Distributed Consistency Protocols (Raft/Paxos).",
      week_3: "Focus: Mock technical interviews with a focus on System Design for high-throughput messaging.",
      week_4: "Focus: Behavioral alignment with firm values and final revision of multi-threading primitives.",
      priority_topics: ["Multi-threading", "Lock-free structures", "TCP/IP Stack"],
      recommended_project: "Real-time Order Matching Engine (C++)"
    });
  });

  app.get("/api/v1/prep/questions/:company", (req, res) => {
    res.json({
      company: req.params.company,
      categories: [
        {
          type: "Technical",
          questions: [
            "How would you optimize a hash map for a write-heavy environment?",
            "Design a distributed rate-limiter for a global API."
          ]
        },
        {
          type: "Critical Experience",
          questions: [
            "Explain the most complex bug you've solved in a distributed environment.",
            "Describe how you handled a production outage caused by a race condition."
          ]
        }
      ]
    });
  });

  app.post("/api/v1/ingestion/placement-bulk", (req, res) => {
    res.json({
        status: "success",
        records_ingested: 142,
        preliminary_insights: {
            top_recruiter: "Goldman Sachs",
            avg_packages: { "2022": 9.2, "2023": 10.5, "2024": 12.1 },
            branch_distribution: { "CSE": 85, "ECE": 40, "MECH": 17 },
            total_records: 142
        }
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
