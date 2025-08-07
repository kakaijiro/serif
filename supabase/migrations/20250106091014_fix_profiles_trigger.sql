-- Migration: Fix profiles trigger RLS issue
-- Purpose: Allow the trigger to create profiles during user signup without RLS conflicts

-- 1. Drop the existing trigger and function
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

-- 2. Create a new trigger function with security definer (elevated privileges)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, created_at, updated_at)
  values (new.id, new.email, timezone('utc', now()), timezone('utc', now()));
  return new;
end;
$$;

-- 3. Add a policy that allows the trigger function to insert profiles
create policy "Trigger can insert profiles" on public.profiles
  for insert
  with check (true);

-- 4. Recreate the trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
