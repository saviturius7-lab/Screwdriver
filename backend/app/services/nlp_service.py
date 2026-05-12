# backend/app/services/nlp_service.py
from typing import Dict, List
import os
import google.generativeai as genai
import json

class NLPService:
    def __init__(self):
        self.model = "models/gemini-3-flash-preview"
        api_key = os.getenv("GEMINI_API_KEY")
        if api_key:
            genai.configure(api_key=api_key)

    async def extract_structured_resume(self, text: str) -> Dict:
        """
        Uses Gemini to convert raw resume text into structured JSON.
        """
        prompt = f"""
        Extract professional entities from this resume text into valid JSON.
        
        TEXT:
        {text}

        SCHEMA:
        {{
            "full_name": "string",
            "email": "string",
            "phone": "string",
            "skills": ["string"],
            "projects": [{{ "title": "string", "description": "string", "stack": ["string"] }}],
            "experience": [{{ "company": "string", "role": "string", "duration": "string" }}],
            "cgpa": "number"
        }}
        """
        try:
            model = genai.GenerativeModel(self.model)
            response = await model.generate_content_async(prompt)
            # Basic cleaning to ensure JSON extraction
            content = response.text
            json_str = content[content.find('{'):content.rfind('}')+1]
            return json.loads(json_str)
        except Exception as e:
            print(f"Extraction error: {e}")
            return {}

    async def score_project_complexity(self, description: str) -> int:
        """
        AI scoring of project difficulty on a scale of 1-10.
        """
        prompt = f"On a scale of 1-10, how complex is a project described as: '{description}'? Return ONLY the number."
        try:
            model = genai.GenerativeModel(self.model)
            response = await model.generate_content_async(prompt)
            return int(response.text.strip())
        except:
            return 5
