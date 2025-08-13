-- Complete Blog Schema Migration
-- Purpose: Create all necessary tables for the blogy application with proper RLS policies and admin functionality
-- Tables: blogs (posts), projects, publications, app_config
-- Includes: RLS policies, indexes, triggers, and admin configuration

-- =============================================================================
-- EXTENSIONS
-- =============================================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- =============================================================================
-- ENUMS
-- =============================================================================

-- Project status enumeration
create type public.project_status as enum (
  'draft',
  'published', 
  'archived'
);

-- Publication type enumeration  
create type public.publication_type as enum (
  'article',
  'paper', 
  'conference',
  'book'
);

-- Goal category enumeration
create type public.goal_category as enum (
  'goal',
  'aim',
  'note'
);

-- =============================================================================
-- TABLES
-- =============================================================================

-- Blogs table (for posts/articles)
create table public.blogs (
  id bigint generated always as identity primary key,
  title text not null,
  content text not null,
  subtitle text,
  slug text unique,
  cover_image text,
  published boolean not null default false,
  date text not null,
  tags text[] default '{}',
  read_time integer,
  user_id uuid references auth.users(id) on delete cascade,
  updated_at timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

comment on table public.blogs is 'Blog posts and articles for the website';

-- Projects table
create table public.projects (
  id bigint generated always as identity primary key,
  title text not null,
  description text not null,
  content text,
  image_url text,
  cover_image text,
  demo text,
  github text,
  slug text unique,
  technologies text[] not null default '{}',
  tags text[] default '{}',
  status project_status default 'published',
  start_date text,
  end_date text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

comment on table public.projects is 'Portfolio projects and work samples';

-- Publications table
create table public.publications (
  id bigint generated always as identity primary key,
  title text not null,
  authors text not null,
  description text not null,
  content text,
  date text not null,
  doi text,
  pdf text,
  journal text[],
  slug text unique,
  citation text,
  institution text,
  keywords text[],
  cover_image text,
  page_count integer,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

comment on table public.publications is 'Academic and professional publications';

-- App configuration table for admin settings
create table public.app_config (
  admin_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

comment on table public.app_config is 'Application configuration including admin user designation';

-- =============================================================================
-- INDEXES
-- =============================================================================

-- Blogs indexes
create index idx_blogs_published_date on public.blogs using btree (published, date desc);
create index idx_blogs_slug on public.blogs using btree (slug);
create index idx_blogs_user_id on public.blogs using btree (user_id);
create index idx_blogs_tags on public.blogs using gin (tags);

-- Projects indexes  
create index idx_projects_status on public.projects using btree (status);
create index idx_projects_slug on public.projects using btree (slug);
create index idx_projects_technologies on public.projects using gin (technologies);
create index idx_projects_tags on public.projects using gin (tags);

-- Publications indexes
create index idx_publications_date on public.publications using btree (date desc);
create index idx_publications_slug on public.publications using btree (slug);
create index idx_publications_keywords on public.publications using gin (keywords);

-- App config indexes
create unique index idx_app_config_admin_id on public.app_config using btree (admin_id);

-- =============================================================================
-- TRIGGERS
-- =============================================================================

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Add updated_at triggers
create trigger handle_blogs_updated_at
  before update on public.blogs
  for each row execute procedure public.handle_updated_at();

create trigger handle_projects_updated_at
  before update on public.projects
  for each row execute procedure public.handle_updated_at();

create trigger handle_publications_updated_at
  before update on public.publications
  for each row execute procedure public.handle_updated_at();

create trigger handle_app_config_updated_at
  before update on public.app_config
  for each row execute procedure public.handle_updated_at();

-- =============================================================================
-- HELPER FUNCTIONS
-- =============================================================================

-- Function to check if user is admin
create or replace function public.is_admin(user_id uuid)
returns boolean as $$
begin
  return exists (
    select 1 
    from public.app_config 
    where admin_id = user_id
  );
end;
$$ language plpgsql security definer;

-- Function to get current user ID safely
create or replace function public.current_user_id()
returns uuid as $$
begin
  return (select auth.uid());
end;
$$ language plpgsql security definer;

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Enable RLS on all tables
alter table public.blogs enable row level security;
alter table public.projects enable row level security;
alter table public.publications enable row level security;
alter table public.app_config enable row level security;

-- =============================================================================
-- RLS POLICIES - BLOGS
-- =============================================================================

-- Blogs: Public read access for published posts
create policy "Anyone can view published blogs"
  on public.blogs
  for select
  to anon, authenticated
  using (published = true);

-- Blogs: Admin can view all posts
create policy "Admin can view all blogs"
  on public.blogs
  for select
  to authenticated
  using (public.is_admin((select auth.uid())));

-- Blogs: Admin can insert posts
create policy "Admin can create blogs"
  on public.blogs
  for insert
  to authenticated
  with check (public.is_admin((select auth.uid())));

-- Blogs: Admin can update posts
create policy "Admin can update blogs"
  on public.blogs
  for update
  to authenticated
  using (public.is_admin((select auth.uid())))
  with check (public.is_admin((select auth.uid())));

-- Blogs: Admin can delete posts
create policy "Admin can delete blogs"
  on public.blogs
  for delete
  to authenticated
  using (public.is_admin((select auth.uid())));

-- =============================================================================
-- RLS POLICIES - PROJECTS
-- =============================================================================

-- Projects: Public read access for published projects
create policy "Anyone can view published projects"
  on public.projects
  for select
  to anon, authenticated
  using (status = 'published');

-- Projects: Admin can view all projects
create policy "Admin can view all projects"
  on public.projects
  for select
  to authenticated
  using (public.is_admin((select auth.uid())));

-- Projects: Admin can insert projects
create policy "Admin can create projects"
  on public.projects
  for insert
  to authenticated
  with check (public.is_admin((select auth.uid())));

-- Projects: Admin can update projects
create policy "Admin can update projects"
  on public.projects
  for update
  to authenticated
  using (public.is_admin((select auth.uid())))
  with check (public.is_admin((select auth.uid())));

-- Projects: Admin can delete projects
create policy "Admin can delete projects"
  on public.projects
  for delete
  to authenticated
  using (public.is_admin((select auth.uid())));

-- =============================================================================
-- RLS POLICIES - PUBLICATIONS
-- =============================================================================

-- Publications: Public read access
create policy "Anyone can view publications"
  on public.publications
  for select
  to anon, authenticated
  using (true);

-- Publications: Admin can insert publications
create policy "Admin can create publications"
  on public.publications
  for insert
  to authenticated
  with check (public.is_admin((select auth.uid())));

-- Publications: Admin can update publications
create policy "Admin can update publications"
  on public.publications
  for update
  to authenticated
  using (public.is_admin((select auth.uid())))
  with check (public.is_admin((select auth.uid())));

-- Publications: Admin can delete publications
create policy "Admin can delete publications"
  on public.publications
  for delete
  to authenticated
  using (public.is_admin((select auth.uid())));

-- =============================================================================
-- RLS POLICIES - APP_CONFIG
-- =============================================================================

-- App config: Only admin can view config
create policy "Admin can view app config"
  on public.app_config
  for select
  to authenticated
  using (public.is_admin((select auth.uid())));

-- App config: Only admin can insert config
create policy "Admin can create app config"
  on public.app_config
  for insert
  to authenticated
  with check (public.is_admin((select auth.uid())));

-- App config: Only admin can update config
create policy "Admin can update app config"
  on public.app_config
  for update
  to authenticated
  using (public.is_admin((select auth.uid())))
  with check (public.is_admin((select auth.uid())));

-- App config: Only admin can delete config
create policy "Admin can delete app config"
  on public.app_config
  for delete
  to authenticated
  using (public.is_admin((select auth.uid())));

-- =============================================================================
-- INITIAL DATA
-- =============================================================================

-- Note: Admin user should be created manually via Supabase Auth
-- Then insert their UUID into app_config table to grant admin access 