# backend/app/models/intelligence.py
from sqlalchemy import Column, String, Float, ForeignKey, Text, JSON, Integer
from sqlalchemy.orm import relationship
from pgvector.sqlalchemy import Vector
from .base import Base, TimestampMixin, UUIDMixin

class GithubProfile(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "github_profiles"

    student_id = Column(ForeignKey("students.id"), nullable=False, unique=True)
    username = Column(String(100), nullable=False)
    total_repos = Column(Integer)
    top_languages = Column(JSON) # e.g., ["Python", "TypeScript"]
    commit_activity_score = Column(Float)
    complexity_score = Column(Float) # Calculated via AI analysis
    raw_data = Column(JSON)
    
    student = relationship("Student")

class StudentProject(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "student_projects"

    student_id = Column(ForeignKey("students.id"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    tech_stack = Column(JSON)
    complexity_score = Column(Integer) # 1-10
    
    project_vector = Column(Vector(1536))
    
    student = relationship("Student")
