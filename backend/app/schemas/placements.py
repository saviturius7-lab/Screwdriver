# backend/app/schemas/placements.py
from pydantic import BaseModel, conint, confloat
from typing import Optional, List
from uuid import UUID
from datetime import datetime
from enum import Enum

class DriveStatus(str, Enum):
    UPCOMING = "upcoming"
    ONGOING = "ongoing"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class PlacementDriveBase(BaseModel):
    company_id: UUID
    batch_year: int
    status: DriveStatus = DriveStatus.UPCOMING
    base_salary: float
    job_description: str

class PlacementDriveCreate(PlacementDriveBase):
    pass

class PlacementDriveResponse(PlacementDriveBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

# backend/app/schemas/intelligence.py
class InterviewExperienceCreate(BaseModel):
    company_id: UUID
    content: str
    difficulty: conint(ge=1, le=5)

class IntelligenceQuery(BaseModel):
    query: str
    limit: Optional[int] = 5
