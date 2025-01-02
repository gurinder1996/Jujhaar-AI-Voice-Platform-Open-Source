-- Create organizations table
create table if not exists organizations (
  id text primary key,
  name text not null,
  owner_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamp with time zone default now()
);

-- Create agents table
create table if not exists agents (
  id text primary key,
  organization_id text not null references organizations (id) on delete cascade,
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
  id text primary key,
  agent_id text not null references agents (id) on delete cascade,
  question text not null,
  answer text not null,
  created_at timestamp with time zone default now()
);

-- Create workflows table
create table if not exists workflows (
  id text primary key,
  agent_id text not null references agents (id) on delete cascade,
  title text not null,
  definition_json jsonb not null,
  created_at timestamp with time zone default now()
);
