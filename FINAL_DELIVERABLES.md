# Final Deliverables: CampusLink AI Architecture

This project serves as a comprehensive blueprint and MVP-grade prototype for an AI-powered campus placement platform.

## 🏗️ Core Architecture Components
- **Modular Monolith Backend**: Located in `/backend`, designed for effortless scaling.
- **pgvector Intelligence**: Vector-native schema for RAG and semantic matching.
- **Ingestion Pipeline**: Robust ETL and embedding generators for institutional data.
- **Real-Time UI**: High-density "Bold Typography" dashboard built with Next.js patterns.

## 📁 Key Blueprint Files
1. **System Architecture**: `/ARCHITECTURE.md`
2. **Database SQL & pgvector**: `/backend/schema.sql`
3. **ORM Models**: `/backend/app/models/domain.py`
4. **Ingestion Workflow**: `/INGESTION_GUIDE.md`
5. **ETL Logic**: `/backend/app/ingestion/service.py` & `/backend/app/ingestion/validator.py`
6. **Celery Workers**: `/backend/app/workers/ingestion.py`
7. **Infrastructure Config**: `/docker-compose.yml` & `/.env.example`

## 🚀 Deployment Notes
- **Local**: Run `docker-compose up` to spin up PostgreSQL (pgvector), Redis, FastAPI, and Next.js.
- **AI Integration**: Uses Gemini 3 Flash for semantic searches and embedding generation.
- **Scale Strategy**: Repository patterns and service isolation allow for smooth migration to microservices when traffic exceeds monolith thresholds.

---
*Designed for Rapid Iteration & Institutional Scale.*
