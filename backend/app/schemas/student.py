# backend/app/schemas/student.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from uuid import UUID
from datetime import datetime

class StudentBase(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = None
    cgpa: Optional[float] = Field(None, ge=0.0, le=10.0)
    graduation_year: Optional[int] = None

class StudentCreate(StudentBase):
    pass

class StudentUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    cgpa: Optional[float] = None

class StudentResponse(StudentBase):
    id: UUID
    created_at: datetime
    
    class Config:
        from_attributes = True

# backend/app/schemas/matching.py
class MatchResult(BaseModel):
    student_id: UUID
    student_name: str
    match_score: float # 0.0 to 1.0 (Cosine Similarity)
    rationale: str
