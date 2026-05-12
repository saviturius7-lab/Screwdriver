# backend/app/api/v1/endpoints/hiring.py
from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from ....core.database import get_db
from ....models.hiring import HiringSignal, JobPosting
from ....schemas.hiring import HiringSignalResponse, HiringTrendResponse
from sqlalchemy import select, desc

router = APIRouter(prefix="/hiring", tags=["hiring"])

@router.get("/live", response_model=List[HiringSignalResponse])
async def get_live_signals(limit: int = 10, db: AsyncSession = Depends(get_db)):
    """
    Retrieves the most recent high-strength hiring signals.
    """
    stmt = (
        select(HiringSignal)
        .order_by(desc(HiringSignal.strength))
        .limit(limit)
    )
    result = await db.execute(stmt)
    return result.scalars().all()

@router.get("/trends", response_model=List[HiringTrendResponse])
async def get_hiring_trends():
    """
    Returns summarized hiring trends based on volume and velocity.
    """
    # Mock data for architecture preview
    return [
        {
            "company": "Microsoft",
            "role_growth": 0.15,
            "signal_strength": 0.92,
            "urgency_score": 0.88,
            "top_skills": ["C#", "Azure", "Distributed Systems"]
        },
        {
            "company": "Nvidia",
            "role_growth": 0.42,
            "signal_strength": 0.88,
            "urgency_score": 0.95,
            "top_skills": ["CUDA", "C++", "PyTorch"]
        }
    ]

@router.get("/alerts")
async def get_hiring_alerts():
    """
    Critical alerts for sudden spikes in hiring or new internship rounds.
    """
    return {
        "alerts": [
            {
                "id": "1",
                "severity": "high",
                "type": "SPIKE_DETECTED",
                "message": "Uber just posted 15+ Graduate Engineer roles in the last 2 hours.",
                "timestamp": "2026-05-12T11:40:00Z"
            }
        ]
    }
