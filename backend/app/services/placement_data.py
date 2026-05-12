# backend/app/services/placement_data.py
import pandas as pd
from typing import List, Dict, Any
import io

class PlacementDataService:
    @staticmethod
    def process_bulk_csv(content: str) -> List[Dict[str, Any]]:
        """
        Parses a CSV string of placement records.
        Expected columns: year, company, student_name, branch, lpa
        """
        try:
            df = pd.read_csv(io.StringIO(content))
            # Basic validation
            required = ['year', 'company', 'student_name', 'branch', 'lpa']
            for col in required:
                if col not in df.columns:
                    raise ValueError(f"Missing required column: {col}")
            
            return df.to_dict('records')
        except Exception as e:
            print(f"CSV Parsing Error: {e}")
            return []

    @staticmethod
    def analyze_historical_trends(data: List[Dict]) -> Dict[str, Any]:
        """
        Generates insights from a list of records.
        """
        if not data:
            return {}
        
        df = pd.DataFrame(data)
        
        # 1. Top Recruiter
        top_recruiter = df['company'].value_counts().idxmax()
        
        # 2. Avg Package Growth
        avg_by_year = df.groupby('year')['lpa'].mean().to_dict()
        
        # 3. Branch Performance
        branch_success = df.groupby('branch').size().to_dict()
        
        return {
            "top_recruiter": top_recruiter,
            "avg_packages": avg_by_year,
            "branch_distribution": branch_success,
            "total_records": len(df)
        }
