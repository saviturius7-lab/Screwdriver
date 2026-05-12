-- initialization.sql
CREATE EXTENSION IF NOT EXISTS vector;

-- Enums for Type Safety
DO $$ BEGIN
    CREATE TYPE drive_status AS ENUM ('upcoming', 'ongoing', 'completed', 'cancelled');
    CREATE TYPE round_type AS ENUM ('online_test', 'technical_interview', 'hr_interview', 'gd');
    CREATE TYPE student_role AS ENUM ('admin', 'student', 'recruiter');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. Students Table
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    cgpa NUMERIC(4,2),
    graduation_year INTEGER,
    student_vector vector(1536), -- Semantic profile for matching
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_deleted BOOLEAN DEFAULT FALSE
);

-- 2. Companies Table
CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    website TEXT,
    industry TEXT,
    summary TEXT,
    summary_vector vector(1536), -- For job-company compatibility search
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Interview Experiences (RAG Optimized)
CREATE TABLE IF NOT EXISTS interview_experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id),
    company_id UUID REFERENCES companies(id),
    content TEXT NOT NULL,
    difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 5),
    experience_vector vector(1536), -- Used for RAG intelligence
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_student_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_experience_vector ON interview_experiences USING hnsw (experience_vector vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_company_name ON companies(name);
