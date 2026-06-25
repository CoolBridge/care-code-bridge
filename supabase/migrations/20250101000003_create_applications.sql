-- SSEBA: Applications
-- Multi-stage admissions pipeline

-- ============================================================
-- APPLICATION STATUS ENUM
-- ============================================================
DO $$ BEGIN
  CREATE TYPE public.application_status AS ENUM (
    'draft',
    'submitted',
    'under_review',
    'interview',
    'approved',
    'rejected',
    'waitlisted'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================
-- APPLICATIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  cohort_id uuid NOT NULL REFERENCES public.cohorts(id) ON DELETE CASCADE,
  status public.application_status NOT NULL DEFAULT 'draft',
  
  -- Personal information (structured JSON)
  personal_info jsonb DEFAULT '{}'::jsonb,
  
  -- Assessment scores
  technical_readiness_score integer,
  learning_readiness_score integer,
  communication_score integer,
  leadership_score integer,
  overall_score integer,
  
  -- Motivation and placement
  motivation_statement text,
  placement_recommendation text,
  
  -- Review workflow
  reviewer_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  review_notes text,
  reviewed_at timestamptz,
  submitted_at timestamptz,
  
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for applications
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON public.applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_cohort_id ON public.applications(cohort_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_reviewer_id ON public.applications(reviewer_id);
CREATE INDEX IF NOT EXISTS idx_applications_overall_score ON public.applications(overall_score DESC);

-- Unique constraint: one application per user per cohort
CREATE UNIQUE INDEX IF NOT EXISTS idx_applications_user_cohort_unique 
  ON public.applications(user_id, cohort_id);

-- Apply updated_at trigger
DROP TRIGGER IF EXISTS applications_updated_at ON public.applications;
CREATE TRIGGER applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
