-- Supabase / Postgres schema for Aaj Ka Rate (deployable version).
-- Run in Supabase SQL Editor. No default credentials are created here.
create table if not exists rates (
  id text primary key, name text not null, category text not null,
  unit text not null, price numeric, source text, is_sample boolean default true,
  history numeric[] default '{}', updated_at timestamptz default now()
);
create table if not exists ads (
  id text primary key, type text not null, placement text not null,
  enabled boolean default true, title text, image text, link text, cta text,
  publisher_id text, slot_id text, html text, clicks integer default 0,
  start_date date, end_date date, created_at timestamptz default now()
);
create table if not exists ad_settings (id int primary key, publisher_id text, created_at timestamptz default now());
create table if not exists admin_credentials (
  id int primary key, username text unique not null, password_hash text not null,
  created_at timestamptz default now()
);
create table if not exists admin_security_questions (
  id int primary key, question text not null, answer_hash text not null
);
create table if not exists admin_sessions (
  token text primary key, username text not null, expires_at timestamptz not null
);
create table if not exists refresh_log (
  id bigint generated always as identity primary key, at timestamptz default now(), note text
);
-- Production note: wire the API routes in app/api/* to these tables
-- when DATABASE_URL is set. The shipped routes use an in-memory
-- fallback so `npm run build` and local dev work without a database.
