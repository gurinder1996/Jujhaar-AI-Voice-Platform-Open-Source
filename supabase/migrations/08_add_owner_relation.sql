-- Add owner_id to agents table to link with auth.users
ALTER TABLE agents 
ADD COLUMN owner_id uuid REFERENCES auth.users(id);

-- Update RLS policies to use the owner relationship
CREATE POLICY "organizations_owner_through_agent_select_policy"
  ON organizations FOR SELECT
  USING (
    id IN (
      SELECT organization_id 
      FROM agents 
      WHERE owner_id = auth.uid()
    )
    OR
    owner_id = auth.uid()
  );

-- Update agents policy to check owner_id
CREATE POLICY "agents_owner_select_policy"
  ON agents FOR SELECT
  USING (
    owner_id = auth.uid()
    OR
    organization_id IN (
      SELECT id 
      FROM organizations 
      WHERE owner_id = auth.uid()
    )
  );

-- Drop the previous more restrictive policies
DROP POLICY IF EXISTS "organizations_select_policy" ON organizations;
DROP POLICY IF EXISTS "organizations_agent_select_policy" ON organizations;
DROP POLICY IF EXISTS "agents_select_policy" ON agents;
