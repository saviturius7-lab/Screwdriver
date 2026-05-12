-- seed_data.sql
-- 1. Insert Sample Company
INSERT INTO companies (id, name, website, industry, description)
VALUES (
    '550e8400-e29b-41d4-a716-446655440000', 
    'Stripe', 
    'https://stripe.com', 
    'Fintech', 
    'Global payment infrastructure for the internet.'
);

-- 2. Insert Sample Student
INSERT INTO students (id, full_name, email, cgpa, graduation_year)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Arya Stark',
    'arya@winterfell.edu',
    9.5,
    2024
);

-- 3. Insert Interview Experience
INSERT INTO interview_experiences (student_id, company_id, content)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    '550e8400-e29b-41d4-a716-446655440000',
    'The interview was highly technical, focused on system design and concurrency in distributed systems. Round 1 was a coding challenge...'
);

-- Note: In production, 'experience_vector' would be updated via a Celery worker 
-- calling the OpenAI or Gemini embedding API.
