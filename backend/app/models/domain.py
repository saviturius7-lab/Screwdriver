# backend/app/models/domain.py
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from pgvector.sqlalchemy import Vector
from .base import Base, TimestampMixin, UUIDMixin, SoftDeleteMixin

class Student(Base, UUIDMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "students"

    full_name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    phone = Column(String(20))
    cgpa = Column(Float)
    graduation_year = Column(Integer)
    
    # Vector Embedding of the student profile (skills + bio + projects)
    profile_vector = Column(Vector(1536))
    
    resumes = relationship("Resume", back_populates="student")
    experiences = relationship("InterviewExperience", back_populates="student")

class Company(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "companies"

    name = Column(String(255), nullable=False, index=True)
    website = Column(String(255))
    industry = Column(String(100))
    description = Column(Text)
    
    # Semantic embedding of company culture and requirements
    company_vector = Column(Vector(1536))
    
    roles = relationship("JobRole", back_populates="company")
    drives = relationship("PlacementDrive", back_populates="company")

class InterviewExperience(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "interview_experiences"

    student_id = Column(ForeignKey("students.id"), nullable=False)
    company_id = Column(ForeignKey("companies.id"), nullable=False)
    content = Column(Text, nullable=False)
    difficulty_score = Column(Integer) # 1-5
    
    # NLP generated embedding for RAG search
    experience_vector = Column(Vector(1536))
    
    student = relationship("Student", back_populates="experiences")
    company = relationship("Company")
