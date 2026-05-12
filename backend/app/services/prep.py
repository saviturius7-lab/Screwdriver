# backend/app/services/prep.py
from typing import List, Dict, Any
from ..rag.service import RAGService
import google.generativeai as genai
import os
import json

class PrepService:
    def __init__(self, rag_service: RAGService):
        self.rag_service = rag_service
        self.ai_model = os.getenv("GEMINI_MODEL", "models/gemini-3-flash-preview")

    async def generate_roadmap(self, student_profile: Dict, target_company: str) -> Dict[str, Any]:
        """
        Synthesizes student gaps with RAG company context to produce a roadmap.
        """
        # 1. Get Company Context via RAG
        company_intel = await self.rag_service.get_preparations_guide(
            query=f"Interview patterns and expectations for {target_company}",
            company_name=target_company
        )

        # 2. Build Synthesis Prompt
        prompt = f"""
        You are an AI Career Mentor for CampusLink.
        Generate a strictly structured 4-week preparation roadmap for a student targeting {target_company}.

        STUDENT PROFILE:
        {json.dumps(student_profile)}

        COMPANY INTELLIGENCE:
        {company_intel}

        FORMAT:
        Return valid JSON with keys:
        - target_company: string
        - gap_analysis: string
        - week_1: string (Focus area)
        - week_2: string (Focus area)
        - week_3: string (Mock drills)
        - week_4: string (Final review)
        - priority_topics: list of strings
        - recommended_project: string
        """

        try:
            model = genai.GenerativeModel(self.ai_model)
            response = await model.generate_content_async(prompt)
            content = response.text
            # Simple extraction of JSON from markdown blocks
            json_str = content[content.find('{'):content.rfind('}')+1]
            return json.loads(json_str)
        except Exception as e:
            return {
                "error": str(e),
                "target_company": target_company,
                "gap_analysis": "Error generating AI synthesis. Advise focusing on DSA fundamentals.",
                "priority_topics": ["Data Structures", "Algorithms", "System Design"],
                "recommended_project": "Scalable Portfolio API"
            }
