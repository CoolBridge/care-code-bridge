-- SSEBA: Mentorship, Portfolio, Phase Codes, and Audit Logs
-- Supporting systems for career development and progression

-- ============================================================
-- MENTORSHIP STATUS ENUM
-- ============================================================
DO $$ BEGIN
  CREATE TYPE public.mentorship_status AS ENUM (
    'active',
    'completed',
    'cancelled'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================
-- PORTFOLIO CATEGORY ENUM
-- ============================================================
DO $$ BEGIN
  CREATE TYPE public.portfolio_category AS ENUM (
    'project',
    'certification',
    'badge',
    'capstone'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================
-- MENTORSHIPS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.mentorships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  cohort_id uuid REFERENCES public.cohorts(id) ON DELETE SET NULL,
  status public.mentorship_status NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mentorships_mentor_id ON public.mentorships(mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentorships_student_id ON public.mentorships(student_id);
CREATE INDEX IF NOT EXISTS idx_mentorships_cohort_id ON public.mentorships(cohort_id);
CREATE INDEX IF NOT EXISTS idx_mentorships_status ON public.mentorships(status);

-- ============================================================
-- MENTORSHIP SESSIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.mentorship_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mentorship_id uuid NOT NULL REFERENCES public.mentorships(id) ON DELETE CASCADE,
  meeting_date timestamptz NOT NULL DEFAULT now(),
  notes text,
  feedback text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mentorship_sessions_mentorship_id ON public.mentorship_sessions(mentorship_id);
CREATE INDEX IF NOT EXISTS idx_mentorship_sessions_meeting_date ON public.mentorship_sessions(meeting_date DESC);

-- ============================================================
-- PORTFOLIO ITEMS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  project_url text,
  github_url text,
  skills text[] DEFAULT '{}',
  category public.portfolio_category NOT NULL DEFAULT 'project',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_portfolio_items_user_id ON public.portfolio_items(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_category ON public.portfolio_items(category);

-- ============================================================
-- PHASE COMPLETION CODES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.phase_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  phase integer NOT NULL CHECK (phase BETWEEN 1 AND 3),
  code text NOT NULL UNIQUE,
  is_used boolean NOT NULL DEFAULT false,
  expires_at timestamptz,
  created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_phase_codes_user_id ON public.phase_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_phase_codes_code ON public.phase_codes(code);
CREATE INDEX IF NOT EXISTS idx_phase_codes_phase ON public.phase_codes(phase);

-- ============================================================
-- LOGIN AUDIT LOGS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.login_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  action text NOT NULL,
  ip_address text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_login_audit_logs_user_id ON public.login_audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_login_audit_logs_created_at ON public.login_audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_login_audit_logs_action ON public.login_audit_logs(action);

-- Apply updated_at triggers
DROP TRIGGER IF EXISTS mentorships_updated_at ON public.mentorships;
CREATE TRIGGER mentorships_updated_at
  BEFORE UPDATE ON public.mentorships
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS portfolio_items_updated_at ON public.portfolio_items;
CREATE TRIGGER portfolio_items_updated_at
  BEFORE UPDATE ON public.portfolio_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
