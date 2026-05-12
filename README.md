# ScrewDrivr

ScrewDrivr is an AI-assisted placement intelligence platform prototype. It combines a React frontend with a TypeScript/Express API layer to simulate workflows such as semantic search, hiring-signal analysis, student profiling, matching, and preparation planning.

## Architecture Overview

### Runtime Topology
- **Single Node.js process** runs both the API server and frontend delivery.
- **Express server (`server.ts`)** hosts versioned REST endpoints under `/api/v1/*`.
- **Vite middleware (development)** serves the SPA with hot reload.
- **Static bundle serving (production)** delivers `dist/` assets from Express.

### Request Flow
1. User opens the web app in the browser.
2. Frontend (React + Vite) issues HTTP requests to `/api/v1/*`.
3. Express routes return structured JSON responses.
4. UI renders analytics, matching, intelligence, and prep views based on API payloads.

### Core System Layers
- **Presentation Layer (`src/`)**: React UI, charts, interaction flows.
- **Application/API Layer (`server.ts`)**: Endpoint routing and response orchestration.
- **Data & Intelligence Layer (`backend/`)**: SQL schema, seed datasets, ingestion references, and architecture documentation for scaling to a persistent data/AI stack.

## Key API Domains
The API is organized by functional modules:
- **Health & Platform Status**: `/api/v1/health`
- **Semantic Search & RAG Prep**: `/api/v1/search/semantic`, `/api/v1/rag/prep-guide`
- **Student Intelligence**: GitHub sync, profile insights, student-company matching
- **Hiring Signals & Trends**: live signals, trend summaries, company predictions
- **Preparation Planning**: question generation and prep roadmap endpoints
- **Data Ingestion**: placement bulk ingestion simulation

## Project Structure
```text
.
├── src/                    # React frontend
├── backend/                # SQL schema, seed data, ingestion assets
├── server.ts               # Express API + Vite/static hosting
├── ARCHITECTURE.md         # Target architecture blueprint
├── DATABASE_STRATEGY.md    # Data strategy notes
├── INGESTION_GUIDE.md      # Ingestion workflow notes
└── docker-compose.yml      # Local container orchestration
```

## Local Development

### Prerequisites
- Node.js 18+
- npm

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment template:
   ```bash
   cp .env.example .env.local
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000`.

## Build and Run (Production Mode)
1. Build frontend assets:
   ```bash
   npm run build
   ```
2. Start server:
   ```bash
   npm start
   ```

## Notes
- Current API responses are mock/simulated for prototype validation.
- The repository includes architecture and database strategy documents to guide migration to a full production stack.
