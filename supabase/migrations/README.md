# Supabase Database Migrations

This directory contains the SQL migration files for setting up the Phonely.ai clone database in Supabase.

## Migration Files

1. `01_init.sql`: Initialize extensions
2. `02_drop_tables.sql`: Drop existing tables (if any)
3. `03_create_tables.sql`: Create all required tables
4. `04_enable_rls.sql`: Enable Row Level Security
5. `05_create_policies.sql`: Create RLS policies

## How to Run

Run these files in order in your Supabase SQL editor:

1. First, run `01_init.sql` to enable required extensions
2. Then run `02_drop_tables.sql` to clean up any existing tables
3. Next, run `03_create_tables.sql` to create all the tables
4. Run `04_enable_rls.sql` to enable Row Level Security
5. Finally, run `05_create_policies.sql` to set up all security policies

## Tables Created

- `organizations`: Store organization information
- `agents`: Store AI agent configurations
- `calls`: Store call records and transcripts
- `knowledge_base`: Store agent knowledge base
- `workflows`: Store agent workflow definitions

## Security

All tables have Row Level Security (RLS) enabled with policies that ensure:
- Users can only access their own organization's data
- Organization access controls cascade to agents, calls, knowledge base, and workflows
- All operations (select, insert, update, delete) are properly secured
