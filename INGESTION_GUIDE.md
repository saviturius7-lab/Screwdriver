# INGESTION_GUIDE.md

## Data Ingestion Pipeline

### 1. Upload API
- **Endpoint**: `POST /api/v1/ingestion/upload/experiences`
- **Format**: Multipart Form Data (`file: .csv`)
- **Validation**: Headers must include `student_email`, `company_name`, and `content`.

### 2. Normalization Rules
- **Company Names**: Trimmed and converted to uppercase.
- **Salaries**: Normalized to LPA (Lakhs Per Annum).
- **Embeddings**: Automatically generated for `content` column using Gemini text-embedding models.

### 3. Monitoring
- Each upload returns a `task_id`.
- Poll `GET /api/v1/ingestion/status/{task_id}` for completion results.

### 4. Sample Dataset
A sample file is located at `/backend/sample_intelligence.csv`. Use this for testing the ETL flow.
