# backend/app/api/v1/endpoints/matching.py
from fastapi import APIRouter, Depends
from typing import List, Dict, Any
from ....services.matching import MatchingEngine
from uuid import UUID

router = APIRouter(prefix="/matching", tags=["matching"])

@router.get("/student/{student_id}")
async def get_student_company_matches(student_id: UUID):
    """
    Returns compatibility scores for a student across target companies.
    """
    # Mock student context (In real app, fetch from DB)
    student = {
        "id": student_id,
        "top_skills": ["FastAPI", "React", "PostgreSQL", "Docker"],
        "domain": "Backend Engineering",
        "market_readiness_score": 92.0
    }
    
    companies = [
        {"name": "Amazon", "domain": "Backend Engineering", "required_skills": ["Java", "Distributed Systems", "AWS"]},
        {"name": "Stripe", "domain": "Backend Engineering", "required_skills": ["Ruby", "Go", "API Design"]},
        {"name": "Confluent", "domain": "Infrastructure", "required_skills": ["Java", "Kafka", "Cloud"]}
    ]
    
    matches = []
    for comp in companies:
        result = await MatchingEngine.compute_compatibility(student, comp)
        matches.append({
            "company": comp['name'],
            "compatibility_score": result['score'],
            "strengths": result['strengths'],
            "skill_gaps": result['skill_gaps']
        })
        
    return sorted(matches, key=lambda x: x['compatibility_score'], reverse=True)

@router.get("/recommendations")
async def get_general_recommendations():
    return {
        "top_picks": [
            {"student_name": "Arya Stark", "company": "Palantir", "match": 0.98},
            {"student_name": "Jon Snow", "company": "Vercel", "match": 0.94}
        ]
    }
