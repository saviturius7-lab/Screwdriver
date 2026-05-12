# backend/app/rag/service.py
from typing import List, Dict, Any
from ..repositories.matching_repository import MatchingRepository
from ..utils.embeddings import generate_embedding
from .prompts import INTERVIEW_PREP_PROMPT
import google.generativeai as genai
import os

class RAGService:
    def __init__(self, repository: MatchingRepository):
        self.repository = repository
        self.ai_model = os.getenv("GEMINI_MODEL", "models/gemini-3-flash-preview")

    async def get_preparations_guide(self, query: str, company_name: str, role: str = "Software Engineer"):
        """
        Full RAG Pipeline: 
        Detect Intent -> Retrieve Context -> Build Prompt -> Generate Insight
        """
        # 1. Generate Query Embedding
        query_vector = await generate_embedding(query)

        # 2. Retrieve Context (Top 5 similar experiences)
        experiences = await self.repository.get_relevant_interview_intelligence(query_vector, limit=5)
        
        if not experiences:
            return "No specific historical intelligence found for this query. Advise general system design and DSA prep."

        # 3. Assemble Context
        context_str = "\n---\n".join([exp.content for exp in experiences])

        # 4. Prompt Engineering
        prompt = INTERVIEW_PREP_PROMPT.format(
            company=company_name,
            role=role,
            context=context_str,
            query=query
        )

        # 5. Generation (Call Gemini)
        try:
            model = genai.GenerativeModel(self.ai_model)
            response = await model.generate_content_async(prompt)
            return response.text
        except Exception as e:
            return f"Intelligence generation error: {str(e)}"

    async def semantic_search_results(self, query: str, limit: int = 10):
        """
        Returns raw retrieved documents with similarity scores for high-density dashboards.
        """
        query_vector = await generate_embedding(query)
        results = await self.repository.get_relevant_interview_intelligence(query_vector, limit=limit)
        
        return [
            {
                "id": str(r.id),
                "content": r.content[:200] + "...",
                "difficulty": r.difficulty_score,
                "created_at": r.created_at.isoformat()
            } for r in results
        ]
