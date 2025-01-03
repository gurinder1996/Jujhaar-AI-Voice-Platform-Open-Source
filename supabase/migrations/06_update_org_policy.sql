-- Drop the old policy
drop policy if exists "organizations_select_policy" on organizations;

-- Create new policy that allows both owners and agents to view the organization
create policy "organizations_select_policy"
  on organizations for select
  using (
    owner_id = auth.uid() OR  -- Owner can access
    id IN (  -- Agent can access their organization
      select organization_id 
      from agents 
      where id = auth.uid()
    )
  );
