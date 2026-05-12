# backend/app/api/v1/endpoints/ingestion.py
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from typing import List, Dict
import pandas as pd
import io
from ....workers.ingestion import process_experience_ingestion

router = APIRouter(prefix="/ingestion", tags=["ingestion"])

@router.post("/upload/experiences")
async def upload_experiences(file: UploadFile = File(...)):
    """
    Upload CSV of interview experiences for RAG processing.
    """
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are supported.")
    
    content = await file.read()
    
    # Trigger background processing
    task = process_experience_ingestion.delay(content, file.filename)
    
    return {
        "message": "File uploaded successfully. Processing started in background.",
        "task_id": task.id,
        "filename": file.filename
    }

@router.get("/status/{task_id}")
async def get_ingestion_status(task_id: str):
    """
    Check the status of a background ingestion task.
    """
    from ....workers.ingestion import celery_app
    task = celery_app.AsyncResult(task_id)
    
    return {
        "task_id": task_id,
        "status": task.status,
        "result": task.result if task.ready() else None
    }
