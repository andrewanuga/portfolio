-- ============================================================
-- Schema for personal-portfolio (Supabase SQL Editor)
-- ============================================================

-- 1. Create client_requests table
CREATE TABLE IF NOT EXISTS public.client_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    project_type TEXT,
    priority_level TEXT DEFAULT 'NORMAL_DEPLOYMENT',
    budget NUMERIC DEFAULT 0,
    requirements TEXT NOT NULL
);

-- 2. Create index for performance on chronological sorting
CREATE INDEX IF NOT EXISTS idx_client_requests_created_at 
ON public.client_requests (created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.client_requests ENABLE ROW LEVEL SECURITY;

-- 4. Set RLS Policies
-- Allow anyone (public/anon or authenticated) to submit a contact/hire request
CREATE POLICY "Allow public insert to client_requests"
ON public.client_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow service_role to manage all records (Supabase service role bypasses RLS by default,
-- but this explicit policy ensures full access)
CREATE POLICY "Allow service_role full access"
ON public.client_requests
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
