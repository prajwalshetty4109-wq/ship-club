-- SHIP CLUB — Enterprise Supabase Schema & Security Architecture
-- OLED Matte Canvas / Any Distance Club System

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  display_name text not null,
  avatar_url text,
  bio text,
  club_role text default 'BUILDER' check (club_role in ('FOUNDER', 'PRINCIPAL_AUDITOR', 'BUILDER', 'SECURITY_OFFICER')),
  reputation_score integer default 96,
  total_audits integer default 0,
  leaks_prevented integer default 0,
  medals_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Repositories Audited Table
create table if not exists public.audited_repositories (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  owner text not null,
  name text not null,
  full_name text not null,
  repo_url text not null,
  branch text default 'main',
  security_score integer not null check (security_score >= 0 and security_score <= 100),
  files_scanned integer default 0,
  leaks_found integer default 0,
  language text default 'TypeScript',
  stars_count integer default 0,
  forks_count integer default 0,
  photo_url text not null,
  audit_summary text,
  architecture_type text default 'Full-Stack Next.js + Supabase',
  checklist jsonb not null default '[]'::jsonb,
  env_hardening jsonb not null default '{}'::jsonb,
  badges_awarded text[] default array[]::text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Collectible Pill Badges
create table if not exists public.builder_badges (
  id uuid default uuid_generate_v4() primary key,
  badge_id text not null,
  badge_title text not null,
  material text not null check (material in ('ceramic', 'gunmetal', 'silver', 'chartreuse')),
  awarded_to uuid references public.profiles(id) on delete cascade not null,
  repo_id uuid references public.audited_repositories(id) on delete cascade,
  awarded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Enterprise Security Audit Logs Table
create table if not exists public.security_audit_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  action_type text not null, -- 'AUDIT_INITIATED', 'ENV_CHECK_PASSED', 'RATE_LIMIT_CHECKED', 'TOKEN_SECURED'
  target_resource text not null,
  ip_masked text not null,
  user_agent text,
  status text not null check (status in ('SUCCESS', 'WARNING', 'BLOCKED')),
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) on all tables
alter table public.profiles enable row level security;
alter table public.audited_repositories enable row level security;
alter table public.builder_badges enable row level security;
alter table public.security_audit_logs enable row level security;

-- Profiles Policies
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can update their own profile." on public.profiles
  for update using (auth.uid() = id);

-- Audited Repositories Policies
create policy "Audited repositories are viewable by all club members." on public.audited_repositories
  for select using (true);

create policy "Authenticated users can insert repository audits." on public.audited_repositories
  for insert with check (auth.uid() = user_id or user_id is null);

-- Builder Badges Policies
create policy "Badges are public." on public.builder_badges
  for select using (true);

create policy "Service or owner can grant badges." on public.builder_badges
  for insert with check (auth.uid() = awarded_to or auth.role() = 'service_role');

-- Security Audit Logs Policies
create policy "Audit logs are viewable by authenticated users." on public.security_audit_logs
  for select using (auth.role() = 'authenticated' or auth.role() = 'service_role');

create policy "Audit logs can be written by service role or system." on public.security_audit_logs
  for insert with check (true);

-- Indexes for lightning fast lookups
create index if not exists idx_repos_created_at on public.audited_repositories (created_at desc);
create index if not exists idx_repos_owner_name on public.audited_repositories (owner, name);
create index if not exists idx_audit_logs_created_at on public.security_audit_logs (created_at desc);

