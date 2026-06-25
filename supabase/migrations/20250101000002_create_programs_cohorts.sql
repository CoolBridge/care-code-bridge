-- SSEBA: Programs and Cohorts
-- Academic programs and their cohort instances

-- ============================================================
-- PROGRAMS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  slug text NOT NULL UNIQUE,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_programs_slug ON public.programs(slug);
CREATE INDEX IF NOT EXISTS idx_programs_is_active ON public.programs(is_active);

-- ============================================================
-- COHORT STATUS ENUM
-- ============================================================
DO $$ BEGIN
  CREATE TYPE public.cohort_status AS ENUM (
    'upcoming',
    'active',
    'completed'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================
-- COHORTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.cohorts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  name text NOT NULL,
  start_date date,
  end_date date,
  status public.cohort_status NOT NULL DEFAULT 'upcoming',
  max_students integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for cohorts
CREATE INDEX IF NOT EXISTS idx_cohorts_program_id ON public.cohorts(program_id);
CREATE INDEX IF NOT EXISTS idx_cohorts_status ON public.cohorts(status);

-- Add foreign key for profiles.current_cohort_id
ALTER TABLE public.profiles
  ADD CONSTRAINT fk_profiles_cohort
  FOREIGN KEY (current_cohort_id) REFERENCES public.cohorts(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_profiles_cohort_id ON public.profiles(current_cohort_id);

-- Apply updated_at trigger to programs and cohorts
DROP TRIGGER IF EXISTS programs_updated_at ON public.programs;
CREATE TRIGGER programs_updated_at
  BEFORE UPDATE ON public.programs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS cohorts_updated_at ON public.cohorts;
CREATE TRIGGER cohorts_updated_at
  BEFORE UPDATE ON public.cohorts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
