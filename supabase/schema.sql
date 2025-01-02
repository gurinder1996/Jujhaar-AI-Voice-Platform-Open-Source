-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Drop existing tables if they exist (in reverse order of dependencies)
drop table if exists workflows;
drop table if exists knowledge_base;
drop table if exists calls;
drop table if exists agents;
drop table if exists organizations;

-- Create organizations table
create table if not exists organizations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  owner_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamp with time zone default now()
);

-- Create agents table
create table if not exists agents (
  id uuid default gen_random_uuid() primary key,
  organization_id uuid not null references organizations (id) on delete cascade,
  agent_name text not null,
  greeting text,
  personality text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone
);

-- Create calls table
create table if not exists calls (
  id uuid default gen_random_uuid() primary key,
  agent_id uuid not null references agents (id) on delete cascade,
  started_at timestamp with time zone,
  ended_at timestamp with time zone,
  duration integer,
  phone_number text,
  outcome text,
  sentiment text,
  recording_url text,
  transcript text,
  created_at timestamp with time zone default now()
);

-- Create knowledge_base table
create table if not exists knowledge_base (
  id uuid default gen_random_uuid() primary key,
  agent_id uuid not null references agents (id) on delete cascade,
  question text not null,
  answer text not null,
  created_at timestamp with time zone default now()
);

-- Create workflows table
create table if not exists workflows (
  id uuid default gen_random_uuid() primary key,
  agent_id uuid not null references agents (id) on delete cascade,
  title text not null,
  definition_json jsonb not null,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security on all tables
alter table organizations enable row level security;
alter table agents enable row level security;
alter table calls enable row level security;
alter table knowledge_base enable row level security;
alter table workflows enable row level security;

-- Create policies for organizations
create policy "organizations_select_policy"
  on organizations for select
  using (owner_id = auth.uid());

create policy "organizations_insert_policy"
  on organizations for insert
  with check (owner_id = auth.uid());

create policy "organizations_update_policy"
  on organizations for update
  using (owner_id = auth.uid());

create policy "organizations_delete_policy"
  on organizations for delete
  using (owner_id = auth.uid());

-- Create policies for agents
create policy "agents_select_policy"
  on agents for select
  using (organization_id in (
    select id from organizations where owner_id = auth.uid()
  ));

create policy "agents_insert_policy"
  on agents for insert
  with check (organization_id in (
    select id from organizations where owner_id = auth.uid()
  ));

create policy "agents_update_policy"
  on agents for update
  using (organization_id in (
    select id from organizations where owner_id = auth.uid()
  ));

create policy "agents_delete_policy"
  on agents for delete
  using (organization_id in (
    select id from organizations where owner_id = auth.uid()
  ));

-- Create policies for calls
create policy "calls_select_policy"
  on calls for select
  using (agent_id in (
    select id from agents where organization_id in (
      select id from organizations where owner_id = auth.uid()
    )
  ));

create policy "calls_insert_policy"
  on calls for insert
  with check (agent_id in (
    select id from agents where organization_id in (
      select id from organizations where owner_id = auth.uid()
    )
  ));

-- Create policies for knowledge_base
create policy "knowledge_base_select_policy"
  on knowledge_base for select
  using (agent_id in (
    select id from agents where organization_id in (
      select id from organizations where owner_id = auth.uid()
    )
  ));

create policy "knowledge_base_insert_policy"
  on knowledge_base for insert
  with check (agent_id in (
    select id from agents where organization_id in (
      select id from organizations where owner_id = auth.uid()
    )
  ));

-- Create policies for workflows
create policy "workflows_select_policy"
  on workflows for select
  using (agent_id in (
    select id from agents where organization_id in (
      select id from organizations where owner_id = auth.uid()
    )
  ));

create policy "workflows_insert_policy"
  on workflows for insert
  with check (agent_id in (
    select id from agents where organization_id in (
      select id from organizations where owner_id = auth.uid()
    )
  ));
