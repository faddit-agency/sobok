-- SOBOK platform schema (apply in Supabase SQL editor)
-- Do not expose service role keys to the browser.

create table if not exists public.admin_memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'admin',
  status text not null default 'active' check (status in ('active', 'invited', 'disabled')),
  created_at timestamptz not null default now(),
  unique (user_id)
);

alter table public.admin_memberships enable row level security;

create policy "admins can read own membership"
  on public.admin_memberships for select
  to authenticated
  using (auth.uid() = user_id);

-- Existing inquiries table may already exist. Extend carefully.
-- Example columns for new inquiry fields (run only if missing):
-- alter table public.inquiries add column if not exists schema_version int default 1;
-- alter table public.inquiries add column if not exists idempotency_key text unique;

-- Private storage bucket for inquiry files should be created in dashboard:
-- bucket: inquiry-files (private)
-- only service role / admin signed URL access
