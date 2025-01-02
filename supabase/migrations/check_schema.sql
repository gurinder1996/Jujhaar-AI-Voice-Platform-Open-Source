-- Get detailed schema information for all tables
SELECT 
    t.table_name,
    c.column_name,
    c.data_type,
    c.column_default,
    c.is_nullable,
    c.character_maximum_length,
    pg_catalog.col_description(format('%s.%s', t.table_schema, t.table_name)::regclass::oid, c.ordinal_position) as column_description,
    CASE 
        WHEN pk.constraint_type = 'PRIMARY KEY' THEN 'PK'
        WHEN fk.constraint_type = 'FOREIGN KEY' THEN 'FK'
        ELSE NULL 
    END as key_type,
    fk.foreign_table_name,
    fk.foreign_column_name
FROM information_schema.tables t
LEFT JOIN information_schema.columns c 
    ON t.table_name = c.table_name 
    AND t.table_schema = c.table_schema
LEFT JOIN (
    SELECT 
        tc.table_schema, 
        tc.table_name, 
        kcu.column_name,
        tc.constraint_type
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu 
        ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
    WHERE tc.constraint_type = 'PRIMARY KEY'
) pk 
    ON t.table_schema = pk.table_schema 
    AND t.table_name = pk.table_name 
    AND c.column_name = pk.column_name
LEFT JOIN (
    SELECT 
        tc.table_schema, 
        tc.table_name, 
        kcu.column_name,
        tc.constraint_type,
        ccu.table_name AS foreign_table_name,
        ccu.column_name AS foreign_column_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage ccu
        ON ccu.constraint_name = tc.constraint_name
        AND ccu.table_schema = tc.table_schema
    WHERE tc.constraint_type = 'FOREIGN KEY'
) fk
    ON t.table_schema = fk.table_schema 
    AND t.table_name = fk.table_name 
    AND c.column_name = fk.column_name
WHERE 
    t.table_schema = 'public'
    AND t.table_type = 'BASE TABLE'
    AND t.table_name IN ('agents', 'organizations', 'calls', 'knowledge_base', 'workflows')
ORDER BY 
    t.table_name,
    c.ordinal_position;

-- Get indexes
SELECT
    tablename,
    indexname,
    indexdef
FROM
    pg_indexes
WHERE
    schemaname = 'public'
    AND tablename IN ('agents', 'organizations', 'calls', 'knowledge_base', 'workflows')
ORDER BY
    tablename,
    indexname;
