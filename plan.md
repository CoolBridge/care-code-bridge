# Plan: Spartan Software Engineering Bridge Academy (SSEBA) - Foundation

The goal is to transition the current landing page into a full-scale digital academy platform. This involves implementing a robust backend (Supabase), a multi-role authentication system, a complex admissions pipeline, and the core learning infrastructure (LMS/SIS).

## Scope Summary
- **Supabase Integration:** Set up schema for Users, Profiles, Cohorts, Applications, Courses, and Progress tracking.
- **Multi-Role Auth:** Implement Supabase Auth with custom metadata and a "pending" approval state.
- **Admissions System:** Build the multi-stage application form and the Admin review dashboard.
- **Cohort & Learning Management:** Infrastructure for managing multiple programs/cohorts and gating content by phase/completion codes.
- **AI Integration:** Plan for a private AI tutor aligned with the curriculum.
- **Executive UI:** Maintain the premium, "Stanford/MIT-caliber" dark mode aesthetic.

## Affected Areas
- **Supabase:** Database schema, RLS policies, Edge Functions (for code generation/email).
- **Frontend (App.tsx / Routes):** Implement routing for Student, Instructor, and Admin dashboards.
- **Components:** New dashboard layouts, application forms, and LMS viewer.

## Auth & RLS model
**Auth in scope:** yes
**Model:** supabase_auth
**RLS strategy:**
- `profiles`: Users can read their own; Admins/Admissions can read all.
- `applications`: Students can read/write their own; Admissions can read/update.
- `cohorts`: Public read (basic info); Admins manage.
- `course_content`: Students can read if assigned to the cohort and phase is unlocked.
**Frontend implication:** Toast errors on RLS denial; login required for all dashboard routes.

## Migration baseline
**Local migrations in project:** none
**User confirmed proceed on connected DB:** yes (via prompt context)

## Phases

### Phase 1: Database & Auth Foundation (supabase_engineer)
- Create `profiles` table with `role` enum (Admin, Admissions, Student, etc.) and `status` (pending, approved).
- Set up `cohorts`, `programs`, and `applications` tables.
- Implement RLS policies for role-based access.
- Create an Edge Function for "Phase Completion Code" generation.

### Phase 2: Admissions Pipeline & Auth UI (frontend_engineer)
- Implement Login/Signup with "Pending State" redirect.
- Build the `Multi-Stage Application Form` (Personal, Technical, Motivation).
- Create the `Admissions Dashboard` for reviewing and approving applications.
- **Dependency:** Phase 1 (Schema & RLS).

### Phase 3: Core LMS & Student Dashboard (frontend_engineer)
- Build the `Student Dashboard` displaying phase progress and career readiness index.
- Implement the `LMS Viewer` (Modules -> Lessons -> Topics) with gated phase access.
- Build the "Phase Gating" UI (Code entry to unlock Phase 2/3).
- **Dependency:** Phase 1 (Schema).

### Phase 4: Instructor & Admin Dashboards (frontend_engineer)
- Build `Instructor Dashboard` (Student progress tracking, risk alerts).
- Build `Admin Command Center` (User/Cohort management).
- Integrate basic `AI Tutor` sidebar (mocked or simple OpenAI integration).

### Phase 5: Refinement & "Elite" Polishing (quick_fix_engineer)
- Apply the "Stanford/MIT-caliber" styling to all new dashboards.
- Ensure responsive scaling for complex data tables.
- Final copy and accessibility checks.

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. supabase_engineer — Set up the foundation for roles, auth, and admissions.
2. frontend_engineer — Build the application pipeline and student dashboard.
3. quick_fix_engineer — Polish UI consistency and responsiveness.

**Per-agent instructions:**

### 1. supabase_engineer
- **Phases:** Phase 1
- **Scope:** 
  - Schema: `profiles` (id, email, full_name, role, status), `cohorts`, `programs`, `applications`, `courses`, `modules`, `lessons`.
  - Auth: Enable email verification; set default profile status to 'pending'.
  - RLS: Restrict student access to courses based on cohort/phase.
- **Files:** `supabase/migrations/*.sql`
- **Depends on:** none
- **Acceptance criteria:** Migration runs; `auth.users` triggers profile creation; RLS prevents 'pending' users from reading content.

### 2. frontend_engineer
- **Phases:** Phase 2, Phase 3
- **Scope:** 
  - Install `@supabase/supabase-js`.
  - Create `src/integrations/supabase/client.ts`.
  - Build `src/pages/Auth.tsx`, `src/pages/Application.tsx`, `src/pages/Dashboard.tsx`.
  - Implement gating logic: Check `profile.status` and `profile.current_phase`.
- **Files:** `src/App.tsx`, `package.json`, `src/components/` (new files)
- **Depends on:** Phase 1
- **Acceptance criteria:** Users can apply; Admins can approve; Approved students can see the dashboard.

### 3. quick_fix_engineer
- **Phases:** Phase 5
- **Scope:** 
  - Ensure all new pages follow the `index.css` fluid typography and "Nike/Reebok" aesthetic.
  - Fix any layout issues on the Admissions dashboard table.
- **Files:** `src/index.css`, `src/components/`
- **Depends on:** Phase 4
- **Acceptance criteria:** UI is consistent across all new dashboards.

**Do not dispatch:** (None)

IS_SUPABASE_REQUIRED: true
