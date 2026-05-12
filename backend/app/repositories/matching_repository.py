# backend/app/repositories/matching_repository.py
from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from ..models.domain import Student, Company, InterviewExperience
from pgvector.sqlalchemy import Vector

class MatchingRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def find_top_students_for_company(self, company_id: str, limit: int = 5):
        """
        Calculates cosine similarity between company requirement vector 
        and student profile vectors.
        """
        # 1. Get the company vector
        company_q = select(Company.company_vector).where(Company.id == company_id)
        result = await self.session.execute(company_q)
        company_vec = result.scalar_one_or_none()
        
        if not company_vec:
            return []

        # 2. Perform Cosine Similarity Search using the vector operator <=>
        # Note: 1 - (student_vector <=> company_vec) = Cosine Similarity
        stmt = (
            select(
                Student, 
                (1 - Student.profile_vector.cosine_distance(company_vec)).label("similarity")
            )
            .order_by(text("similarity DESC"))
            .limit(limit)
        )
        
        results = await self.session.execute(stmt)
        return results.all()

    async def get_relevant_interview_intelligence(self, query_vector: List[float], limit: int = 3):
        """
        RAG: Retrieves most semantically relevant interview experiences for a query.
        """
        stmt = (
            select(InterviewExperience)
            .order_by(InterviewExperience.experience_vector.cosine_distance(query_vector))
            .limit(limit)
        )
        results = await self.session.execute(stmt)
        return results.scalars().all()
