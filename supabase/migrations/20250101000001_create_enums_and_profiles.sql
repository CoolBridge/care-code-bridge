-- SSEBA: Enums and Profiles
-- Foundation migration: custom types and user profiles linked to auth.users

-- ============================================================
-- CUSTOM ENUM TYPES
-- ============================================================

-- Platform roles
DO $$ BEGIN
  CREATE TYPE public.user_role AS ENUM (
    'super_admin',
    'program_director',
    'instructor',
    'teaching_assistant',
    'mentor',
    'admissions_officer',
    'student',
    'alumni',
    'employer_partner',
    'guest_observer'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Account status (approval workflow)
DO $$ BEGIN
  CREATE TYPE public.account_status AS ENUM (
    'pending',
    'approved',
    'rejected',
    'suspended'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================
-- PROFILES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  role public.user_role NOT NULL DEFAULT 'student',
  status public.account_status NOT NULL DEFAULT 'pending',
  avatar_url text,
  phone text,
  current_phase integer NOT NULL DEFAULT 0,
  current_cohort_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for profiles
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(status);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- ============================================================
-- AUTO-CREATE PROFILE TRIGGER
-- When a new user signs up via auth, automatically create a profile
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, status)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'student'),
    'pending'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists, then create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to profiles
DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
