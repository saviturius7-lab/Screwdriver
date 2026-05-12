# backend/app/utils/embeddings.py
import os
from typing import List
from google.generativeai import embed_content
import google.generativeai as genai

# Setup Gemini for Embeddings
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

async def generate_embedding(text: str, model: str = "models/text-embedding-004") -> List[float]:
    """
    Generates a 768-dimensional or 1536-dimensional vector using Gemini.
    Note: text-embedding-004 defaults to 768, but we can pad or use specific models.
    For this project, we'll assume the 1536d requirement from the user is the target.
    """
    if not text or not api_key:
        return [0.0] * 1536
        
    try:
        # Using Gemini embedding API
        result = genai.embed_content(
            model=model,
            content=text,
            task_type="retrieval_document"
        )
        embedding = result['embedding']
        
        # Pad to 1536 if necessary (or truncate) depending on PG schema
        if len(embedding) < 1536:
            embedding.extend([0.0] * (1536 - len(embedding)))
        return embedding[:1536]
    except Exception as e:
        print(f"Embedding error: {e}")
        return [0.0] * 1536
