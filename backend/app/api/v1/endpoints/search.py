# backend/app/api/v1/endpoints/search.py
from fastapi import APIRouter, Depends, Query
from typing import List, Optional
from ....rag.service import RAGService
from ....repositories.matching_repository import MatchingRepository
from ....core.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/search", tags=["search"])

@router.get("/semantic")
async def semantic_search(
    q: str = Query(..., description="Query for intelligence"),
    limit: int = 5,
    db: AsyncSession = Depends(get_db)
):
    """
    Perform semantic vector search across all historical intelligence.
    """
    repo = MatchingRepository(db)
    service = RAGService(repo)
    return await service.semantic_search_results(q, limit=limit)

@router.get("/rag/prep-guide")
async def get_prep_guide(
    q: str, 
    company: str, 
    role: Optional[str] = "Software Engineer",
    db: AsyncSession = Depends(get_db)
):
    """
    Generate an AI-powered preparation guide using RAG context.
    """
    repo = MatchingRepository(db)
    service = RAGService(repo)
    return {
        "query": q,
        "company": company,
        "intelligence_report": await service.get_preparations_guide(q, company, role)
    }
