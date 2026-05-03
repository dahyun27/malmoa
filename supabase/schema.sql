create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  academy_name text not null default '',
  owner_name text not null default '',
  default_tone text not null default '부드럽게',
  message_signature text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  grade text not null default '',
  school text not null default '',
  subject text not null default '',
  parent_title text not null default '어머니',
  memo text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.message_generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  student_id uuid references public.students(id) on delete set null,
  student_name text not null default '',
  student_grade text not null default '',
  parent_title text not null default '어머니',
  situation_type text not null,
  tone_type text not null,
  input_memo text not null,
  short_message text not null default '',
  soft_message text not null default '',
  firm_message text not null default '',
  summary text not null default '',
  caution text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.templates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  situation_type text not null default '',
  tone_type text not null default '',
  template_text text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  plan text not null default 'free',
  status text not null default 'active',
  monthly_limit integer not null default 10,
  used_count integer not null default 0,
  period_start date not null default date_trunc('month', now())::date,
  period_end date not null default (date_trunc('month', now()) + interval '1 month')::date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists students_set_updated_at on public.students;
create trigger students_set_updated_at
before update on public.students
for each row execute function public.set_updated_at();

drop trigger if exists templates_set_updated_at on public.templates;
create trigger templates_set_updated_at
before update on public.templates
for each row execute function public.set_updated_at();

drop trigger if exists subscriptions_set_updated_at on public.subscriptions;
create trigger subscriptions_set_updated_at
before update on public.subscriptions
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.students enable row level security;
alter table public.message_generations enable row level security;
alter table public.templates enable row level security;
alter table public.subscriptions enable row level security;

create policy "Users can view own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users can insert own profile"
on public.profiles for insert
with check (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Users can view own students"
on public.students for select
using (auth.uid() = user_id);

create policy "Users can insert own students"
on public.students for insert
with check (auth.uid() = user_id);

create policy "Users can update own students"
on public.students for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own students"
on public.students for delete
using (auth.uid() = user_id);

create policy "Users can view own message generations"
on public.message_generations for select
using (auth.uid() = user_id);

create policy "Users can insert own message generations"
on public.message_generations for insert
with check (auth.uid() = user_id);

create policy "Users can delete own message generations"
on public.message_generations for delete
using (auth.uid() = user_id);

create policy "Users can view own templates"
on public.templates for select
using (auth.uid() = user_id);

create policy "Users can insert own templates"
on public.templates for insert
with check (auth.uid() = user_id);

create policy "Users can update own templates"
on public.templates for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own templates"
on public.templates for delete
using (auth.uid() = user_id);

create policy "Users can view own subscription"
on public.subscriptions for select
using (auth.uid() = user_id);

create policy "Users can insert own subscription"
on public.subscriptions for insert
with check (auth.uid() = user_id);

create policy "Users can update own subscription"
on public.subscriptions for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
