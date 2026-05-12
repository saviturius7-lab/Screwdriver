# ScrewDrivr: Database Strategy & Optimization

## 1. Vector Configuration (pgvector)
- **Model**: `text-embedding-3-small` (OpenAI)
- **Dimensions**: 1536
- **Metric**: Cosine Similarity (`vector_cosine_ops`)
- **Storage**: Vectors are stored inline in specific domain tables.

## 2. Indexing Strategy

### Relational Indexes
- **B-Tree**: On `email`, `graduation_year`, and `company_id` for fast filtering.
- **GIN (Trigram)**: On company names and job titles for fuzzy text matching (`ILIKE`).

### Vector Indexes
- **HNSW (Hierarchical Navigable Small Worlds)**:
  - Used for `experience_vector` in `interview_experiences`.
  - **Parameters**: `m=16`, `ef_construction=64`.
  - **Benefit**: Provides high recall with extremely low latency compared to IVFFlat for our predicted dataset size (10k-100k rows).

```sql
CREATE INDEX idx_exp_hnsw ON interview_experiences USING hnsw (experience_vector vector_cosine_ops);
```

## 3. Storage Mixins
- **Soft Deletes**: All high-sensitivity tables (Students, Resumes) use `is_deleted` flag.
- **Audit Logs**: Timestamps on all tables; separate `audit_trail` table for record-level changes.

## 4. Query Patterns

### Hybrid Search
Queries combine metadata filters (e.g., "CGPA > 8.5") with vector similarity.
```sql
SELECT *, 1 - (profile_vector <=> :query) AS sim 
FROM students 
WHERE cgpa > 8.5 AND is_deleted = false 
ORDER BY sim DESC LIMIT 10;
```

## 5. Security
- **Parameterization**: All queries use SQLAlchemy ORM or bind parameters to prevent SQL Injection.
- **Rate Limiting**: Semantic search endpoints restricted to 50 requests/min via Redis to manage OpenAI API costs.
- **Data Isolation**: Multi-tenancy achieved through `college_id` scoping (planned for Alpha v2).
