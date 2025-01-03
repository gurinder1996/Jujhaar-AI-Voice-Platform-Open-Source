-- Add policy to allow agents to access their own organization
create policy "organizations_agent_select_policy"
  on organizations for select
  using (id in (
    select organization_id from agents where organization_id = id
  ));
