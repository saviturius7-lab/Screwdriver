# backend/app/models/hiring.py
from sqlalchemy import Column, String, Float, ForeignKey, Text, JSON, DateTime
from sqlalchemy.orm import relationship
from pgvector.sqlalchemy import Vector
from .base import Base, TimestampMixin, UUIDMixin
from datetime import datetime

class HiringSignal(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "hiring_signals"

    company_id = Column(ForeignKey("companies.id"), nullable=False)
    signal_type = Column(String(50)) # e.g., 'spike', 'recurring', 'new_internship'
    strength = Column(Float) # 0.0 to 1.0
    urgency = Column(Float) # 0.0 to 1.0
    description = Column(Text)
    
    # Semantic embedding of the signal context
    signal_vector = Column(Vector(1536))
    
    company = relationship("Company")

class JobPosting(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "job_postings"

    company_id = Column(ForeignKey("companies.id"), nullable=False)
    role_title = Column(String(255), nullable=False)
    role_type = Column(String(50)) # 'full-time', 'internship'
    location = Column(String(255))
    salary_range = Column(String(100))
    raw_content = Column(Text)
    source_url = Column(String(512))
    posted_at = Column(DateTime, default=datetime.utcnow)
    
    content_vector = Column(Vector(1536))
    
    company = relationship("Company")

class RecruiterActivity(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "recruiter_activities"

    company_id = Column(ForeignKey("companies.id"), nullable=False)
    recruiter_name = Column(String(255))
    activity_text = Column(Text)
    platform = Column(String(50)) # 'LinkedIn', 'X', etc.
    
    company = relationship("Company")
