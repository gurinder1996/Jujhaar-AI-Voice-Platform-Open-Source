-- First, enable RLS on all tables if not already enabled
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "agents_select_policy" ON agents;
DROP POLICY IF EXISTS "agents_insert_policy" ON agents;
DROP POLICY IF EXISTS "agents_update_policy" ON agents;
DROP POLICY IF EXISTS "agents_delete_policy" ON agents;
DROP POLICY IF EXISTS "organization_access_policy" ON organizations;
DROP POLICY IF EXISTS "organization_insert_policy" ON organizations;
DROP POLICY IF EXISTS "organization_update_policy" ON organizations;
DROP POLICY IF EXISTS "organization_delete_policy" ON organizations;

-- Organizations policies
-- Users can only see organizations they own
CREATE POLICY "organizations_select_policy" ON organizations
FOR SELECT USING (owner_id = auth.uid());

CREATE POLICY "organizations_insert_policy" ON organizations
FOR INSERT WITH CHECK (owner_id = auth.uid());

CREATE POLICY "organizations_update_policy" ON organizations
FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "organizations_delete_policy" ON organizations
FOR DELETE USING (owner_id = auth.uid());

-- Agents policies
-- Users can only see/modify agents in organizations they own
CREATE POLICY "agents_select_policy" ON agents
FOR SELECT USING (
  organization_id IN (
    SELECT id FROM organizations WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "agents_insert_policy" ON agents
FOR INSERT WITH CHECK (
  organization_id IN (
    SELECT id FROM organizations WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "agents_update_policy" ON agents
FOR UPDATE USING (
  organization_id IN (
    SELECT id FROM organizations WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "agents_delete_policy" ON agents
FOR DELETE USING (
  organization_id IN (
    SELECT id FROM organizations WHERE owner_id = auth.uid()
  )
);

-- Knowledge base policies
CREATE POLICY "knowledge_base_select_policy" ON knowledge_base
FOR SELECT USING (
  agent_id IN (
    SELECT id FROM agents WHERE organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  )
);

CREATE POLICY "knowledge_base_insert_policy" ON knowledge_base
FOR INSERT WITH CHECK (
  agent_id IN (
    SELECT id FROM agents WHERE organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  )
);

CREATE POLICY "knowledge_base_update_policy" ON knowledge_base
FOR UPDATE USING (
  agent_id IN (
    SELECT id FROM agents WHERE organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  )
);

CREATE POLICY "knowledge_base_delete_policy" ON knowledge_base
FOR DELETE USING (
  agent_id IN (
    SELECT id FROM agents WHERE organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  )
);

-- Workflows policies
CREATE POLICY "workflows_select_policy" ON workflows
FOR SELECT USING (
  agent_id IN (
    SELECT id FROM agents WHERE organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  )
);

CREATE POLICY "workflows_insert_policy" ON workflows
FOR INSERT WITH CHECK (
  agent_id IN (
    SELECT id FROM agents WHERE organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  )
);

CREATE POLICY "workflows_update_policy" ON workflows
FOR UPDATE USING (
  agent_id IN (
    SELECT id FROM agents WHERE organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  )
);

CREATE POLICY "workflows_delete_policy" ON workflows
FOR DELETE USING (
  agent_id IN (
    SELECT id FROM agents WHERE organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  )
);
