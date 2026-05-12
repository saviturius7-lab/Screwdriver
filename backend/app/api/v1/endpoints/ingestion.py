# backend/app/api/v1/endpoints/ingestion.py
from fastapi import APIRouter, UploadFile, File, HTTPException
from ...services.placement_data import PlacementDataService
from typing import Dict, Any

router = APIRouter(prefix="/ingestion", tags=["ingestion"])

@router.post("/placement-bulk")
async def ingest_placement_data(file: UploadFile = File(...)):
    """
    Accepts a CSV of placement records and updates the intelligence store.
    """
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are supported currently.")
        
    content = await file.read()
    records = PlacementDataService.process_bulk_csv(content.decode('utf-8'))
    
    if not records:
        raise HTTPException(status_code=400, detail="Invalid data format or empty file.")
        
    insights = PlacementDataService.analyze_historical_trends(records)
    
    return {
        "status": "success",
        "records_ingested": len(records),
        "preliminary_insights": insights
    }
