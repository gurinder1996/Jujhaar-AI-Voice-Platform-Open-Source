-- Get columns for each table
SELECT 
    table_name,
    column_name,
    data_type,
    column_default,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
    AND table_name IN ('agents', 'organizations', 'calls', 'knowledge_base', 'workflows')
ORDER BY 
    table_name,
    ordinal_position;
