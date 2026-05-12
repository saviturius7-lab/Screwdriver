# backend/app/services/analytics.py
from typing import List, Dict, Any
import pandas as pd
import numpy as np

class PredictionEngine:
    @staticmethod
    def calculate_visit_probability(company_history: List[int], current_signals: float) -> Dict[str, Any]:
        """
        Historical Recurrence + Signal Strength = Probability
        company_history: List of years the company visited (e.g. [2020, 2021, 2023])
        current_signals: 0.0 to 1.0 based on scraper activity
        """
        if not company_history:
            return {"probability": 0.1, "confidence": "low", "reasoning": ["No historical record found"]}

        # 1. Recurrence Score (Weighted towards recent years)
        latest_year = 2024
        recurrence_count = len(company_history)
        frequency = recurrence_count / 5.0 # normalized over 5 years
        
        # 2. Heuristic Logic
        prob = (frequency * 0.6) + (current_signals * 0.4)
        
        reasons = []
        if frequency > 0.6:
            reasons.append(f"High historical recurrence ({recurrence_count}/5 years)")
        if current_signals > 0.7:
            reasons.append("Intense recruiter activity detected in current cycle")
        
        return {
            "probability": min(0.99, prob),
            "confidence": "high" if prob > 0.75 else "medium",
            "reasoning": reasons if reasons else ["General market trends"]
        }

class AnalyticsService:
    @staticmethod
    def aggregate_branch_demand(placement_data: List[Dict]) -> Dict[str, int]:
        """
        Aggregates hiring volume per branch
        """
        df = pd.DataFrame(placement_data)
        if df.empty:
            return {}
        return df.groupby('branch').size().to_dict()

    @staticmethod
    def detect_package_trends(historical_packages: List[float]) -> Dict[str, float]:
        """
        Calculates YoY growth in average packages
        """
        if len(historical_packages) < 2:
            return {"growth": 0.0}
        
        avg_now = np.mean(historical_packages[-5:])
        avg_prev = np.mean(historical_packages[:-5])
        
        growth = ((avg_now - avg_prev) / avg_prev) * 100 if avg_prev > 0 else 0
        return {"growth_yoy": round(growth, 2)}
