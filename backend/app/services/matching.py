# backend/app/services/matching.py
from typing import List, Dict, Any
import numpy as np
from ..utils.embeddings import generate_embedding

class MatchingEngine:
    @staticmethod
    async def compute_compatibility(student_profile: Dict, company_requirements: Dict) -> Dict[str, Any]:
        """
        Calculates a compatibility score based on skills, domain, and projects.
        """
        # 1. Skill Overlap (Heuristic)
        student_skills = set([s.lower() for s in student_profile.get('top_skills', [])])
        required_skills = set([s.lower() for s in company_requirements.get('required_skills', [])])
        
        intersection = student_skills.intersection(required_skills)
        skill_score = len(intersection) / len(required_skills) if required_skills else 0.5
        
        # 2. Domain Match
        domain_match = 1.0 if student_profile.get('domain') == company_requirements.get('domain') else 0.3
        
        # 3. Overall Weighted Score
        raw_score = (skill_score * 0.6) + (domain_match * 0.4)
        final_score = min(100, int(raw_score * 100))
        
        # 4. Explainability
        strengths = []
        gaps = []
        
        if len(intersection) > 2:
            strengths.append(f"Strong overlap in core technologies: {', '.join(list(intersection)[:3])}")
        
        missing = required_skills - student_skills
        if missing:
            gaps.append(f"Missing depth in: {', '.join(list(missing)[:2])}")
            
        if domain_match > 0.8:
            strengths.append(f"Perfect domain alignment with {student_profile.get('domain')}")
        else:
            gaps.append(f"Domain pivot required (targeting {company_requirements.get('domain')})")

        return {
            "score": final_score,
            "strengths": strengths,
            "skill_gaps": gaps,
            "readiness_index": round(final_score * 0.95, 1)
        }

    @staticmethod
    def rank_students(students: List[Dict], company_req: Dict) -> List[Dict]:
        """
        Ranks a list of students for a specific role.
        In production, this would use pgvector's cosine similarity.
        """
        # Simplified ranking for blueprint
        ranked = sorted(students, key=lambda x: x.get('market_readiness_score', 0), reverse=True)
        return ranked
