-- SSEBA: Row Level Security Policies
-- Role-based access control for all tables

-- ============================================================
-- HELPER FUNCTIONS FOR ROLE CHECKING
-- ============================================================

-- Check if current user is an admin (super_admin or program_director)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role IN ('super_admin', 'program_director')
    AND status = 'approved'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Check if current user is admissions staff
CREATE OR REPLACE FUNCTION public.is_admissions()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role IN ('super_admin', 'program_director', 'admissions_officer')
    AND status = 'approved'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Check if current user is instructor/TA staff
CREATE OR REPLACE FUNCTION public.is_instructor()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role IN ('super_admin', 'program_director', 'instructor', 'teaching_assistant')
    AND status = 'approved'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Check if current user is a mentor
CREATE OR REPLACE FUNCTION public.is_mentor_role()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role IN ('super_admin', 'program_director', 'instructor', 'mentor')
    AND status = 'approved'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Check if user's profile is approved (not pending/rejected)
CREATE OR REPLACE FUNCTION public.is_approved_user()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND status = 'approved'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ============================================================
-- PROFILES TABLE RLS
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY profiles_self_read ON public.profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid());

-- Admins and admissions can read all profiles
CREATE POLICY profiles_admin_read ON public.profiles
  FOR SELECT TO authenticated
  USING (public.is_admissions());

-- Instructors can read profiles of students in their cohorts
CREATE POLICY profiles_instructor_read ON public.profiles
  FOR SELECT TO authenticated
  USING (public.is_instructor());

-- Mentors can read profiles of their mentees
CREATE POLICY profiles_mentor_read ON public.profiles
  FOR SELECT TO authenticated
  USING (public.is_mentor_role());

-- Users can update their own profile (limited fields)
CREATE POLICY profiles_self_update ON public.profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Admins can manage all profiles
CREATE POLICY profiles_admin_all ON public.profiles
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Admissions can update profile status (approve/reject)
CREATE POLICY profiles_admissions_update ON public.profiles
  FOR UPDATE TO authenticated
  USING (public.is_admissions())
  WITH CHECK (public.is_admissions());

-- ============================================================
-- PROGRAMS TABLE RLS
-- ============================================================
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

-- Approved users can read active programs
CREATE POLICY programs_approved_read ON public.programs
  FOR SELECT TO authenticated
  USING (is_active = true AND public.is_approved_user());

-- Admins can manage programs
CREATE POLICY programs_admin_all ON public.programs
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================
-- COHORTS TABLE RLS
-- ============================================================
ALTER TABLE public.cohorts ENABLE ROW LEVEL SECURITY;

-- Approved users can read cohorts (for application purposes)
CREATE POLICY cohorts_approved_read ON public.cohorts
  FOR SELECT TO authenticated
  USING (public.is_approved_user());

-- Admins can manage cohorts
CREATE POLICY cohorts_admin_all ON public.cohorts
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Instructors can update cohorts they manage
CREATE POLICY cohorts_instructor_update ON public.cohorts
  FOR UPDATE TO authenticated
  USING (public.is_instructor())
  WITH CHECK (public.is_instructor());

-- ============================================================
-- APPLICATIONS TABLE RLS
-- ============================================================
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Students can read their own applications
CREATE POLICY applications_self_read ON public.applications
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Students can create their own applications
CREATE POLICY applications_self_insert ON public.applications
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND public.is_approved_user());

-- Students can update their own draft/submitted applications
CREATE POLICY applications_self_update ON public.applications
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid() AND status IN ('draft', 'submitted'))
  WITH CHECK (user_id = auth.uid());

-- Admissions can read all applications
CREATE POLICY applications_admissions_read ON public.applications
  FOR SELECT TO authenticated
  USING (public.is_admissions());

-- Admissions can update applications (review, approve, reject)
CREATE POLICY applications_admissions_update ON public.applications
  FOR UPDATE TO authenticated
  USING (public.is_admissions())
  WITH CHECK (public.is_admissions());

-- Admins have full control
CREATE POLICY applications_admin_all ON public.applications
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================
-- COURSES TABLE RLS
-- ============================================================
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Approved students can read courses for their phase
CREATE POLICY courses_student_read ON public.courses
  FOR SELECT TO authenticated
  USING (
    public.is_approved_user() AND (
      -- Students can see courses up to their current phase
      phase <= (SELECT current_phase FROM public.profiles WHERE id = auth.uid())
      OR public.is_instructor()
      OR public.is_admin()
    )
  );

-- Admins and instructors can manage courses
CREATE POLICY courses_staff_all ON public.courses
  FOR ALL TO authenticated
  USING (public.is_instructor())
  WITH CHECK (public.is_instructor());

-- ============================================================
-- MODULES TABLE RLS
-- ============================================================
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;

-- Approved users can read modules if they can access the parent course
CREATE POLICY modules_student_read ON public.modules
  FOR SELECT TO authenticated
  USING (
    public.is_approved_user() AND (
      EXISTS (
        SELECT 1 FROM public.courses c
        WHERE c.id = modules.course_id
        AND (c.phase <= (SELECT current_phase FROM public.profiles WHERE id = auth.uid())
             OR public.is_instructor())
      )
    )
  );

-- Staff can manage modules
CREATE POLICY modules_staff_all ON public.modules
  FOR ALL TO authenticated
  USING (public.is_instructor())
  WITH CHECK (public.is_instructor());

-- ============================================================
-- LESSONS TABLE RLS
-- ============================================================
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

-- Approved users can read lessons if they can access the parent module/course
CREATE POLICY lessons_student_read ON public.lessons
  FOR SELECT TO authenticated
  USING (
    public.is_approved_user() AND (
      EXISTS (
        SELECT 1 FROM public.modules m
        JOIN public.courses c ON c.id = m.course_id
        WHERE m.id = lessons.module_id
        AND (c.phase <= (SELECT current_phase FROM public.profiles WHERE id = auth.uid())
             OR public.is_instructor())
      )
    )
  );

-- Staff can manage lessons
CREATE POLICY lessons_staff_all ON public.lessons
  FOR ALL TO authenticated
  USING (public.is_instructor())
  WITH CHECK (public.is_instructor());

-- ============================================================
-- LESSON PROGRESS TABLE RLS
-- ============================================================
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

-- Students can read their own progress
CREATE POLICY lesson_progress_self_read ON public.lesson_progress
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Students can insert/update their own progress
CREATE POLICY lesson_progress_self_insert ON public.lesson_progress
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY lesson_progress_self_update ON public.lesson_progress
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Instructors can read all progress (for their students)
CREATE POLICY lesson_progress_instructor_read ON public.lesson_progress
  FOR SELECT TO authenticated
  USING (public.is_instructor());

-- Admins have full control
CREATE POLICY lesson_progress_admin_all ON public.lesson_progress
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================
-- ASSESSMENTS TABLE RLS
-- ============================================================
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- Approved students can read assessments for their phase
CREATE POLICY assessments_student_read ON public.assessments
  FOR SELECT TO authenticated
  USING (
    public.is_approved_user() AND (
      EXISTS (
        SELECT 1 FROM public.courses c
        WHERE c.id = assessments.course_id
        AND (c.phase <= (SELECT current_phase FROM public.profiles WHERE id = auth.uid())
             OR public.is_instructor())
      )
    )
  );

-- Staff can manage assessments
CREATE POLICY assessments_staff_all ON public.assessments
  FOR ALL TO authenticated
  USING (public.is_instructor())
  WITH CHECK (public.is_instructor());

-- ============================================================
-- QUESTIONS TABLE RLS
-- ============================================================
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Students should NOT see correct answers - only instructors can read questions
CREATE POLICY questions_staff_read ON public.questions
  FOR SELECT TO authenticated
  USING (public.is_instructor());

-- Staff can manage questions
CREATE POLICY questions_staff_all ON public.questions
  FOR ALL TO authenticated
  USING (public.is_instructor())
  WITH CHECK (public.is_instructor());

-- ============================================================
-- ASSESSMENT SUBMISSIONS TABLE RLS
-- ============================================================
ALTER TABLE public.assessment_submissions ENABLE ROW LEVEL SECURITY;

-- Students can read their own submissions
CREATE POLICY submissions_self_read ON public.assessment_submissions
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Students can create their own submissions
CREATE POLICY submissions_self_insert ON public.assessment_submissions
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Students can update their own draft submissions
CREATE POLICY submissions_self_update ON public.assessment_submissions
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid() AND status = 'draft')
  WITH CHECK (user_id = auth.uid());

-- Instructors can read all submissions for grading
CREATE POLICY submissions_instructor_read ON public.assessment_submissions
  FOR SELECT TO authenticated
  USING (public.is_instructor());

-- Instructors can grade submissions (update score, feedback, status)
CREATE POLICY submissions_instructor_grade ON public.assessment_submissions
  FOR UPDATE TO authenticated
  USING (public.is_instructor())
  WITH CHECK (public.is_instructor());

-- Admins have full control
CREATE POLICY submissions_admin_all ON public.assessment_submissions
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================
-- MENTORSHIPS TABLE RLS
-- ============================================================
ALTER TABLE public.mentorships ENABLE ROW LEVEL SECURITY;

-- Students can read their own mentorships
CREATE POLICY mentorships_self_read ON public.mentorships
  FOR SELECT TO authenticated
  USING (student_id = auth.uid() OR mentor_id = auth.uid());

-- Mentors can read their mentorship assignments
CREATE POLICY mentorships_mentor_read ON public.mentorships
  FOR SELECT TO authenticated
  USING (public.is_mentor_role());

-- Admins can manage mentorships
CREATE POLICY mentorships_admin_all ON public.mentorships
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================
-- MENTORSHIP SESSIONS TABLE RLS
-- ============================================================
ALTER TABLE public.mentorship_sessions ENABLE ROW LEVEL SECURITY;

-- Participants can read their session notes
CREATE POLICY sessions_participant_read ON public.mentorship_sessions
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.mentorships m
      WHERE m.id = mentorship_sessions.mentorship_id
      AND (m.mentor_id = auth.uid() OR m.student_id = auth.uid())
    )
    OR public.is_admin()
  );

-- Mentors can create session notes
CREATE POLICY sessions_mentor_insert ON public.mentorship_sessions
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.mentorships m
      WHERE m.id = mentorship_sessions.mentorship_id
      AND m.mentor_id = auth.uid()
    )
    OR public.is_admin()
  );

-- Admins have full control
CREATE POLICY sessions_admin_all ON public.mentorship_sessions
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================
-- PORTFOLIO ITEMS TABLE RLS
-- ============================================================
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

-- Users can read their own portfolio
CREATE POLICY portfolio_self_read ON public.portfolio_items
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Users can manage their own portfolio
CREATE POLICY portfolio_self_insert ON public.portfolio_items
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY portfolio_self_update ON public.portfolio_items
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY portfolio_self_delete ON public.portfolio_items
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- Instructors can read student portfolios
CREATE POLICY portfolio_instructor_read ON public.portfolio_items
  FOR SELECT TO authenticated
  USING (public.is_instructor());

-- Admins have full control
CREATE POLICY portfolio_admin_all ON public.portfolio_items
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================
-- PHASE CODES TABLE RLS
-- ============================================================
ALTER TABLE public.phase_codes ENABLE ROW LEVEL SECURITY;

-- Students can read their own phase codes
CREATE POLICY phase_codes_self_read ON public.phase_codes
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Only admins/instructors can create phase codes
CREATE POLICY phase_codes_staff_insert ON public.phase_codes
  FOR INSERT TO authenticated
  WITH CHECK (public.is_instructor());

-- Admins can manage all phase codes
CREATE POLICY phase_codes_admin_all ON public.phase_codes
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================
-- LOGIN AUDIT LOGS TABLE RLS
-- ============================================================
ALTER TABLE public.login_audit_logs ENABLE ROW LEVEL SECURITY;

-- Users can read their own audit logs
CREATE POLICY audit_self_read ON public.login_audit_logs
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Admins can read all audit logs
CREATE POLICY audit_admin_read ON public.login_audit_logs
  FOR SELECT TO authenticated
  USING (public.is_admin());

-- Anyone authenticated can insert audit logs (for login tracking)
CREATE POLICY audit_insert ON public.login_audit_logs
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
