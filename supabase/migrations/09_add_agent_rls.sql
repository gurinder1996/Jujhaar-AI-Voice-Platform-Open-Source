-- Drop existing policies
DROP POLICY IF EXISTS "agents_select_policy" ON agents;
DROP POLICY IF EXISTS "agents_insert_policy" ON agents;
DROP POLICY IF EXISTS "agents_update_policy" ON agents;
DROP POLICY IF EXISTS "agents_delete_policy" ON agents;

-- Create new RLS policies for agents that check organization ownership
CREATE POLICY "agents_select_policy" ON agents 
FOR SELECT USING (
  organization_id IN (
    SELECT id 
    FROM organizations 
    WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "agents_insert_policy" ON agents 
FOR INSERT WITH CHECK (
  organization_id IN (
    SELECT id 
    FROM organizations 
    WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "agents_update_policy" ON agents 
FOR UPDATE USING (
  organization_id IN (
    SELECT id 
    FROM organizations 
    WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "agents_delete_policy" ON agents 
FOR DELETE USING (
  organization_id IN (
    SELECT id 
    FROM organizations 
    WHERE owner_id = auth.uid()
  )
);
