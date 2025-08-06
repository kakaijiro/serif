-- Migration: Create 'profiles' table for extended user data
-- Purpose: Store first name (optional), avatar_url (optional), and email, associated with auth.users
-- RLS: Only allow users to manage their own profile
-- Trigger: Automatically create a profile when a new user signs up

-- 1. Create the 'profiles' table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  avatar_url text,
  email text not null,
  created_at timestamp with time zone default timezone('utc', now()) not null,
  updated_at timestamp with time zone default timezone('utc', now()) not null
);

comment on table public.profiles is 'Extended user profile data associated with auth.users.';

-- 2. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- 3. Create RLS policies
-- Allow users to select their own profile
create policy "Users can select their own profile" on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id);

-- Allow users to insert their own profile (should only happen via trigger)
create policy "Users can insert their own profile" on public.profiles
  for insert to authenticated
  with check ((select auth.uid()) = id);

-- Allow users to update their own profile
create policy "Users can update their own profile" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Allow users to delete their own profile
create policy "Users can delete their own profile" on public.profiles
  for delete to authenticated
  using ((select auth.uid()) = id);

-- 4. Create a trigger to insert a profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, created_at, updated_at)
  values (new.id, new.email, timezone('utc', now()), timezone('utc', now()));
  return new;
end;
$$;

-- Attach the trigger to auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();