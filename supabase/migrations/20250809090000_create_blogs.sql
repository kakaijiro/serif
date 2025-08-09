-- Create blogs table with slug-based routing and audit columns
-- RLS enabled with public read, authenticated write

-- Helper: slugify text (ASCII-ish, lowercase, dash-separated)
create or replace function public.slugify(input text)
returns text
language plpgsql
as $$
declare
  s text;
begin
  s := lower(input);
  -- replace non-alphanumeric with dash
  s := regexp_replace(s, '[^a-z0-9]+', '-', 'g');
  -- trim leading/trailing dashes
  s := regexp_replace(s, '(^-+|-+$)', '', 'g');
  if s is null or length(s) = 0 then
    s := 'post';
  end if;
  return s;
end;
$$;

-- Helper: ensure unique slug by appending short hash on collision
create or replace function public.ensure_unique_slug(base_title text)
returns text
language plpgsql
as $$
declare
  candidate text := public.slugify(base_title);
  suffix text;
  tries int := 0;
begin
  loop
    exit when not exists (
      select 1 from public.blogs where slug = candidate
    );
    tries := tries + 1;
    suffix := '-' || substring(md5(random()::text) for 6);
    candidate := public.slugify(base_title) || suffix;
    if tries > 10 then
      -- extremely unlikely; add timestamp fallback
      candidate := public.slugify(base_title) || '-' || extract(epoch from now())::bigint::text;
      exit;
    end if;
  end loop;
  return candidate;
end;
$$;

-- Table
create table if not exists public.blogs (
  slug text primary key,
  title text not null,
  subtitle text,
  image text,
  content text not null,
  author text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Trigger: set slug on insert and when title changes
create or replace function public.blogs_set_slug()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' then
    if new.slug is null or length(new.slug) = 0 then
      new.slug := public.ensure_unique_slug(new.title);
    else
      new.slug := public.slugify(new.slug);
    end if;
  elsif tg_op = 'UPDATE' then
    if new.title is distinct from old.title then
      new.slug := public.ensure_unique_slug(new.title);
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_blogs_set_slug on public.blogs;
create trigger trg_blogs_set_slug
before insert or update of title on public.blogs
for each row execute function public.blogs_set_slug();

-- Trigger: updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists trg_blogs_updated_at on public.blogs;
create trigger trg_blogs_updated_at
before update on public.blogs
for each row execute function public.set_updated_at();

-- Index to speed up ordering by created_at
create index if not exists blogs_created_at_idx on public.blogs (created_at desc);

-- RLS
alter table public.blogs enable row level security;

-- Policy: public can read
drop policy if exists blogs_select_public on public.blogs;
create policy blogs_select_public on public.blogs
  for select
  using (true);

-- Policy: only authenticated users can insert/update/delete
drop policy if exists blogs_iud_auth on public.blogs;
create policy blogs_iud_auth on public.blogs
  for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);


