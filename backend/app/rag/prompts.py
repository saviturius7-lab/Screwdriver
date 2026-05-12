# backend/app/rag/prompts.py

INTERVIEW_PREP_PROMPT = """
You are a CampusLink AI Career Coach. 
Based on the following historical interview experiences for {company} and the job role {role}, 
provide a strategic preparation guide for the student.

CONTEXT:
{context}

QUERY:
{query}

GOAL:
1. Identify high-frequency technical topics.
2. Highlight specific 'Leadership Principles' or 'Cultural' questions mentioned.
3. Suggest 3 specific mock interview questions.
4. Estimate difficulty level (1-5).

FORMAT:
Return a well-structured summary.
"""

QA_ANALYSIS_PROMPT = """
Analyze the following Question Bank entries for {company}.
Provide a deep dive into:
1. Recurring data structures.
2. Time complexity expectations.
3. Edge cases frequently tested.

ENTRIES:
{context}
"""
