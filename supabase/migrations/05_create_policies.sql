-- Create policies for organizations
create policy "organizations_select_policy"
  on organizations for select
  using (owner_id = auth.uid());

create policy "organizations_insert_policy"
  on organizations for insert
  with check (owner_id = auth.uid());

create policy "organizations_update_policy"
  on organizations for update
  using (owner_id = auth.uid());

create policy "organizations_delete_policy"
  on organizations for delete
  using (owner_id = auth.uid());

-- Create policies for agents
create policy "agents_select_policy"
  on agents for select
  using (organization_id in (
    select id from organizations where owner_id = auth.uid()
  ));

create policy "agents_insert_policy"
  on agents for insert
  with check (organization_id in (
    select id from organizations where owner_id = auth.uid()
  ));

create policy "agents_update_policy"
  on agents for update
  using (organization_id in (
    select id from organizations where owner_id = auth.uid()
  ));

create policy "agents_delete_policy"
  on agents for delete
  using (organization_id in (
    select id from organizations where owner_id = auth.uid()
  ));

-- Create policies for calls (if RLS not already enabled)
create policy "calls_select_policy"
  on calls for select
  using (orgid in (
    select id from organizations where owner_id = auth.uid()
  ));

create policy "calls_insert_policy"
  on calls for insert
  with check (orgid in (
    select id from organizations where owner_id = auth.uid()
  ));

-- Create policies for knowledge_base
create policy "knowledge_base_select_policy"
  on knowledge_base for select
  using (agent_id in (
    select id from agents where organization_id in (
      select id from organizations where owner_id = auth.uid()
    )
  ));

create policy "knowledge_base_insert_policy"
  on knowledge_base for insert
  with check (agent_id in (
    select id from agents where organization_id in (
      select id from organizations where owner_id = auth.uid()
    )
  ));

-- Create policies for workflows
create policy "workflows_select_policy"
  on workflows for select
  using (agent_id in (
    select id from agents where organization_id in (
      select id from organizations where owner_id = auth.uid()
    )
  ));

create policy "workflows_insert_policy"
  on workflows for insert
  with check (agent_id in (
    select id from agents where organization_id in (
      select id from organizations where owner_id = auth.uid()
    )
  ));
