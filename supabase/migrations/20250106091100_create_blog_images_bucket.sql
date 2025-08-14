-- Create public bucket for blog post images
-- This bucket will store images used in blog posts with public read access

-- Create the blog-images bucket
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-images',
  'blog-images',
  true,
  10485760, -- 10MB limit per file
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']::text[]
);

-- RLS Policies for the blog-images bucket

-- Policy: Anyone can view/download images (public read)
create policy "Public read access for blog images"
on storage.objects for select
using (bucket_id = 'blog-images');

-- Policy: Authenticated users can upload images
create policy "Authenticated users can upload blog images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'blog-images' 
  and auth.uid() is not null
);

-- Policy: Authenticated users can update their own uploads
create policy "Authenticated users can update blog images"
on storage.objects for update
to authenticated
using (
  bucket_id = 'blog-images' 
  and auth.uid() is not null
)
with check (
  bucket_id = 'blog-images' 
  and auth.uid() is not null
);

-- Policy: Authenticated users can delete images
create policy "Authenticated users can delete blog images"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'blog-images' 
  and auth.uid() is not null
);

-- Create a helpful function to generate organized file paths
-- This function creates paths like: blog-images/2025/01/06/unique-filename.ext
create or replace function public.generate_blog_image_path(filename text)
returns text
language plpgsql
as $$
declare
  file_ext text;
  clean_name text;
  date_path text;
  unique_id text;
begin
  -- Extract file extension
  file_ext := lower(substring(filename from '\.([^.]+)$'));
  if file_ext is null then
    file_ext := 'jpg'; -- default extension
  end if;
  
  -- Clean the filename (remove extension and special chars)
  clean_name := regexp_replace(filename, '\.[^.]+$', ''); -- remove extension
  clean_name := regexp_replace(clean_name, '[^a-zA-Z0-9-_]', '-', 'g'); -- replace special chars
  clean_name := regexp_replace(clean_name, '-+', '-', 'g'); -- collapse multiple dashes
  clean_name := trim(both '-' from clean_name); -- trim leading/trailing dashes
  
  -- Limit length and ensure not empty
  clean_name := substring(clean_name for 50);
  if length(clean_name) = 0 then
    clean_name := 'image';
  end if;
  
  -- Generate date-based path (YYYY/MM/DD)
  date_path := to_char(now(), 'YYYY/MM/DD');
  
  -- Generate unique identifier to prevent conflicts
  unique_id := substring(md5(random()::text || now()::text) for 8);
  
  -- Return the complete path
  return date_path || '/' || clean_name || '-' || unique_id || '.' || file_ext;
end;
$$;

-- Add helpful comment
comment on function public.generate_blog_image_path(text) is 
'Generates organized file paths for blog images with date-based structure and unique identifiers';
