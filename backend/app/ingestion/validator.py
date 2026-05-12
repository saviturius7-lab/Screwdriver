# backend/app/ingestion/validator.py
from typing import List, Dict, Any, Tuple
import pandas as pd
from pydantic import ValidationError
from ..schemas.student import StudentCreate

class IngestionValidator:
    REQUIRED_COLUMNS = {
        "placement_records": ["student_email", "company_name", "package_lpa", "year"],
        "interview_experiences": ["student_email", "company_name", "content"],
    }

    @classmethod
    def validate_csv_structure(cls, df: pd.DataFrame, dataset_type: str) -> Tuple[bool, List[str]]:
        errors = []
        required = cls.REQUIRED_COLUMNS.get(dataset_type, [])
        
        missing = [col for col in required if col not in df.columns]
        if missing:
            errors.append(f"Missing required columns: {', '.join(missing)}")
            return False, errors
            
        return True, errors

    @classmethod
    def clean_placement_data(cls, df: pd.DataFrame) -> pd.DataFrame:
        """
        Normalization and Type Conversion
        """
        # 1. Normalize Company Names (Trim and Uppercase)
        if "company_name" in df.columns:
            df["company_name"] = df["company_name"].str.strip().str.upper()

        # 2. Convert Packages to Float
        if "package_lpa" in df.columns:
            df["package_lpa"] = pd.to_numeric(df["package_lpa"], errors="coerce")

        # 3. Handle Nulls
        df = df.dropna(subset=["student_email", "company_name"])
        
        return df
