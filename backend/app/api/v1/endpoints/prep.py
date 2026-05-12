# backend/app/api/v1/endpoints/prep.py
from fastapi import APIRouter, Depends
from typing import Dict, Any
from ....services.prep import PrepService
from ....rag.service import RAGService
from ....repositories.matching_repository import MatchingRepository
from ....core.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID

router = APIRouter(prefix="/prep", tags=["preparation"])

@router.post("/generate")
async def generate_prep_roadmap(student_id: UUID, company: str, db: AsyncSession = Depends(get_db)):
    """
    Triggers AI roadmap generation for a specific student and company.
    """
    repo = MatchingRepository(db)
    rag = RAGService(repo)
    service = PrepService(rag)
    
    # Mock profile fetch (In real app, query database)
    student_profile = {
        "full_name": "Arya Stark",
        "top_skills": ["C++", "Distributed Systems"],
        "github_score": 9.2,
        "recent_projects": ["Distributed MapReduce"]
    }
    
    return await service.generate_roadmap(student_profile, company)

@router.get("/questions/{company}")
async def get_curated_questions(company: str):
    """
    Returns high-frequency questions for a company stored in pgvector.
    """
    return {
        "company": company,
        "categories": [
            {
                "type": "Technical",
                "questions": [
                    "Implement a thread-safe LRU cache.",
                    "Explain the CAP theorem in the context of DynamoDB."
                ]
            },
            {
                "type": "Behavioral",
                "questions": [
                    "Tell me about a time you had to pivot your technical strategy mid-project.",
                    "How do you handle conflict in a high-stakes engineering environment?"
                ]
            }
        ]
    }
