# backend/app/services/github_analyzer.py
import requests
from typing import Dict, Any, List
import os

class GithubAnalyzer:
    def __init__(self, token: str = None):
        self.token = token or os.getenv("GITHUB_TOKEN")
        self.base_url = "https://api.github.com"
        self.headers = {"Authorization": f"token {self.token}"} if self.token else {}

    async def analyze_user(self, username: str) -> Dict[str, Any]:
        """
        Fetches repositories and calculates intelligence scores.
        """
        try:
            # 1. Fetch repos
            repos_url = f"{self.base_url}/users/{username}/repos"
            response = requests.get(repos_url, headers=self.headers)
            repos = response.json() if response.status_code == 200 else []

            if not repos:
                return self._empty_response(username)

            # 2. Extract Data
            languages = {}
            total_stars = 0
            
            for repo in repos:
                lang = repo.get("language")
                if lang:
                    languages[lang] = languages.get(lang, 0) + 1
                total_stars += repo.get("stargazers_count", 0)

            top_langs = sorted(languages, key=languages.get, reverse=True)[:3]
            
            # 3. Heuristic Scoring
            complexity = min(10.0, (len(repos) * 0.2) + (total_stars * 0.5))

            return {
                "username": username,
                "total_repos": len(repos),
                "top_languages": top_langs,
                "complexity_score": round(complexity, 2),
                "stars": total_stars,
                "domain_match": self._detect_domain(top_langs)
            }
        except Exception as e:
            return self._empty_response(username)

    def _detect_domain(self, langs: List[str]) -> str:
        mapping = {
            "TypeScript": "Frontend/Web",
            "Python": "Data Science/AI",
            "Go": "Infrastructure",
            "C++": "Systems Engineering"
        }
        for l in langs:
            if l in mapping: return mapping[l]
        return "Generalist"

    def _empty_response(self, username: str):
        return {
            "username": username,
            "total_repos": 0,
            "top_languages": [],
            "complexity_score": 0.0,
            "domain_match": "Unknown"
        }
