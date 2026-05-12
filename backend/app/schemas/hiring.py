# backend/app/schemas/hiring.py
from pydantic import BaseModel, HttpUrl
from typing import Optional, List
from uuid import UUID
from datetime import datetime

class HiringSignalBase(BaseModel):
    company_id: UUID
    signal_type: str
    strength: float
    urgency: float
    description: str

class HiringSignalResponse(HiringSignalBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

class JobPostingCreate(BaseModel):
    company_id: UUID
    role_title: str
    role_type: str
    location: Optional[str] = None
    source_url: HttpUrl
    raw_content: str

class HiringTrendResponse(BaseModel):
    company: str
    role_growth: float
    signal_strength: float
    urgency_score: float
    top_skills: List[str]
