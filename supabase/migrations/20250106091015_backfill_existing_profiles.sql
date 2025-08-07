-- Migration: Backfill profiles for existing users
-- Purpose: Create profiles for users who were created before the profiles table existed

-- Insert profiles for any existing users who don't have one
insert into public.profiles (id, email, created_at, updated_at)
select 
  au.id,
  au.email,
  au.created_at,
  au.updated_at
from auth.users au
left join public.profiles p on au.id = p.id
where p.id is null
  and au.email is not null;
