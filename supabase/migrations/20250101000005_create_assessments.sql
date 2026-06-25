-- SSEBA: Assessments and Submissions
-- Quiz engine, assignments, and grading workflows

-- ============================================================
-- ASSESSMENT TYPE ENUM
-- ============================================================
DO $$ BEGIN
  CREATE TYPE public.assessment_type AS ENUM (
    'quiz',
    'assignment',
    'project',
    'exam'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================
-- SUBMISSION STATUS ENUM
-- ============================================================
DO $$ BEGIN
  CREATE TYPE public.submission_status AS ENUM (
    'draft',
    'submitted',
    'graded'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================
-- ASSESSMENTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  type public.assessment_type NOT NULL DEFAULT 'quiz',
  max_score integer NOT NULL DEFAULT 100,
  passing_score integer NOT NULL DEFAULT 70,
  due_date timestamptz,
  is_required boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_assessments_course_id ON public.assessments(course_id);
CREATE INDEX IF NOT EXISTS idx_assessments_type ON public.assessments(type);
CREATE INDEX IF NOT EXISTS idx_assessments_due_date ON public.assessments(due_date);

-- ============================================================
-- QUESTIONS TABLE (Question bank)
-- ============================================================
DO $$ BEGIN
  CREATE TYPE public.question_type AS ENUM (
    'multiple_choice',
    'multi_select',
    'true_false',
    'fill_in_blank',
    'essay',
    'coding'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS public.questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  question_type public.question_type NOT NULL DEFAULT 'multiple_choice',
  options jsonb, -- For MCQ/multi-select: [{"label": "A", "text": "...", "is_correct": true}]
  correct_answer text, -- For fill-in-blank, true/false
  points integer NOT NULL DEFAULT 1,
  order_index integer NOT NULL DEFAULT 0,
  explanation text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_questions_assessment_id ON public.questions(assessment_id);
CREATE INDEX IF NOT EXISTS idx_questions_order ON public.questions(assessment_id, order_index);

-- ============================================================
-- ASSESSMENT SUBMISSIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.assessment_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  submission_data jsonb DEFAULT '{}'::jsonb, -- Answers stored as JSON
  score integer,
  feedback text,
  status public.submission_status NOT NULL DEFAULT 'draft',
  submitted_at timestamptz,
  graded_at timestamptz,
  graded_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_submissions_assessment_id ON public.assessment_submissions(assessment_id);
CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON public.assessment_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON public.assessment_submissions(status);
CREATE UNIQUE INDEX IF NOT EXISTS idx_submissions_user_assessment 
  ON public.assessment_submissions(user_id, assessment_id);

-- Apply updated_at triggers
DROP TRIGGER IF EXISTS assessments_updated_at ON public.assessments;
CREATE TRIGGER assessments_updated_at
  BEFORE UPDATE ON public.assessments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS questions_updated_at ON public.questions;
CREATE TRIGGER questions_updated_at
  BEFORE UPDATE ON public.questions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS assessment_submissions_updated_at ON public.assessment_submissions;
CREATE TRIGGER assessment_submissions_updated_at
  BEFORE UPDATE ON public.assessment_submissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
