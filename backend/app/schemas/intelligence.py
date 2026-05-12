# backend/app/schemas/intelligence.py
from pydantic import BaseModel, HttpUrl
from typing import Optional, List, Dict
from uuid import UUID
from datetime import datetime

class GithubAnalysisResponse(BaseModel):
    username: str
    total_repos: int
    top_languages: List[str]
    complexity_score: float
    domain_match: str # e.g., "Web3", "Frontend", "AI"

class StudentProjectResponse(BaseModel):
    title: str
    description: str
    tech_stack: List[str]
    complexity: int

class StudentRichProfile(BaseModel):
    id: UUID
    full_name: str
    email: str
    github: Optional[GithubAnalysisResponse] = None
    projects: List[StudentProjectResponse] = []
    top_skills: List[str]
    market_readiness_score: float # 0-100
