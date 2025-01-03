WITH RECURSIVE 
table_info AS (
  SELECT 
    t.table_name,
    c.column_name,
    CASE 
      WHEN c.data_type = 'ARRAY' THEN c.udt_name || '[]'
      WHEN c.data_type = 'USER-DEFINED' THEN c.udt_name
      ELSE c.data_type
    END as data_type,
    c.column_default,
    c.is_nullable,
    col_description((t.table_schema || '.' || t.table_name)::regclass, c.ordinal_position) as description,
    c.ordinal_position
  FROM 
    information_schema.tables t
    JOIN information_schema.columns c ON t.table_name = c.table_name 
    AND t.table_schema = c.table_schema
  WHERE 
    t.table_schema = 'public'
    AND t.table_type = 'BASE TABLE'
)
SELECT 
  format('## %s Table', initcap(table_name)) as table_header,
  format('- `%s` %s%s%s',
    column_name,
    data_type,
    CASE WHEN is_nullable = 'NO' THEN ' NOT NULL' ELSE '' END,
    CASE 
      WHEN column_default IS NOT NULL THEN 
        ' DEFAULT ' || 
        CASE 
          WHEN data_type = 'jsonb' AND column_default NOT LIKE 'nextval%' 
          THEN regexp_replace(column_default, '''(\{.*\})''::jsonb', E'\n  - $1')
          ELSE column_default
        END
      ELSE ''
    END
  ) as column_info
FROM 
  table_info
ORDER BY 
  table_name,
  ordinal_position;
