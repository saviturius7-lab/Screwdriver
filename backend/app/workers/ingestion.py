# backend/app/workers/ingestion.py
from celery import Celery
import pandas as pd
import io
import os
import asyncio
from ..core.database import SessionLocal
from ..models.domain import InterviewExperience, Company, Student
from ..utils.embeddings import generate_embedding
from ..ingestion.validator import IngestionValidator

celery_app = Celery(
    "ingestion_workers",
    broker=os.getenv("REDIS_URL", "redis://localhost:6379/0"),
    backend=os.getenv("REDIS_URL", "redis://localhost:6379/0")
)

@celery_app.task(name="process_experience_ingestion")
def process_experience_ingestion(file_content: bytes, filename: str):
    """
    Background worker to process CSV uploads and generate embeddings.
    """
    loop = asyncio.get_event_loop()
    df = pd.read_csv(io.BytesIO(file_content))
    
    # 1. Validate
    is_valid, errors = IngestionValidator.validate_csv_structure(df, "interview_experiences")
    if not is_valid:
        return {"status": "failed", "errors": errors}

    # 2. Process chunks
    stats = {"processed": 0, "failed": 0}
    db = SessionLocal()
    
    try:
        for _, row in df.iterrows():
            try:
                # Generate Embedding Asynchronously
                embedding = loop.run_until_complete(
                    generate_embedding(row['content'])
                )
                
                # Mock resolution of Student/Company IDs for MVP
                # In production, we'd lookup or create
                exp = InterviewExperience(
                    content=row['content'],
                    experience_vector=embedding,
                    difficulty_score=row.get('difficulty', 3)
                )
                db.add(exp)
                stats["processed"] += 1
            except Exception:
                stats["failed"] += 1
                
        db.commit()
    finally:
        db.close()
        
    return {"status": "completed", "stats": stats}
