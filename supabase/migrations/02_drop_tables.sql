-- Drop existing tables if they exist (in reverse order of dependencies)
drop table if exists workflows;
drop table if exists knowledge_base;
-- Preserve calls table
drop table if exists agents;
drop table if exists organizations;
