Here are comprehensive queries to inspect your Supabase database:

List all tables and their columns:
Code
CopyInsert
SELECT 
    t.table_schema,
    t.table_name,
    c.column_name,
    c.data_type,
    c.column_default,
    c.is_nullable
FROM information_schema.tables t
JOIN information_schema.columns c 
    ON t.table_schema = c.table_schema 
    AND t.table_name = c.table_name
WHERE t.table_schema IN ('public', 'auth')
ORDER BY t.table_schema, t.table_name, c.ordinal_position;
List all foreign key relationships:
Code
CopyInsert
SELECT
    tc.table_schema, 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name,
    ccu.table_schema AS foreign_table_schema,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
AND tc.table_schema IN ('public', 'auth');
List all RLS policies:
Code
CopyInsert
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
List all users (from auth.users):
Code
CopyInsert
SELECT 
    id,
    email,
    role,
    created_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data
FROM auth.users;
Check table permissions:
Code
CopyInsert
SELECT
    table_schema,
    table_name,
    grantee,
    privilege_type
FROM information_schema.table_privileges 
WHERE table_schema IN ('public', 'auth')
ORDER BY table_schema, table_name, grantee, privilege_type;
List all indexes:
Code
CopyInsert
SELECT
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname IN ('public', 'auth')
ORDER BY schemaname, tablename, indexname;
Check Row Level Security status for tables:
Code
CopyInsert
SELECT 
    schemaname,
    tablename,
    hasrules,
    hasoids,
    relhaspkey as has_primary_key,
    relrowsecurity as row_level_security_enabled
FROM pg_tables t
JOIN pg_class c ON t.tablename = c.relname
WHERE schemaname = 'public';
View all triggers:
Code
CopyInsert
SELECT 
    event_object_schema as table_schema,
    event_object_table as table_name,
    trigger_schema,
    trigger_name,
    string_agg(event_manipulation, ', ') as events,
    action_timing as timing,
    action_statement as definition
FROM information_schema.triggers
WHERE event_object_schema IN ('public', 'auth')
GROUP BY 1,2,3,4,6,7
ORDER BY table_schema, table_name;
Database size and table sizes:
Code
CopyInsert
SELECT
    schema_name,
    relname as table_name,
    pg_size_pretty(pg_total_relation_size(relid)) as total_size,
    pg_size_pretty(pg_relation_size(relid)) as data_size,
    pg_size_pretty(pg_total_relation_size(relid) - pg_relation_size(relid)) as external_size
FROM (
    SELECT 
        pg_catalog.pg_namespace.nspname as schema_name,
        relname,
        relid
    FROM pg_catalog.pg_statio_user_tables
    JOIN pg_catalog.pg_namespace 
        ON pg_catalog.pg_statio_user_tables.schemaname = pg_catalog.pg_namespace.nspname
) as tables
WHERE schema_name IN ('public', 'auth')
ORDER BY pg_total_relation_size(relid) DESC;
Current active connections:
Code
CopyInsert
SELECT 
    datname as database,
    usename as username,
    application_name,
    client_addr,
    backend_start,
    state,
    state_change
FROM pg_stat_activity
WHERE datname IS NOT NULL;