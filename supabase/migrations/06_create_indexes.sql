-- Organizations indexes
create index if not exists idx_organizations_owner_id on organizations(owner_id);
create index if not exists idx_organizations_created_at on organizations(created_at);

-- Agents indexes
create index if not exists idx_agents_organization_id on agents(organization_id);
create index if not exists idx_agents_created_at on agents(created_at);
create index if not exists idx_agents_name on agents(name);

-- Calls indexes (for existing table)
create index if not exists idx_calls_assistantid on calls(assistantid);
create index if not exists idx_calls_orgid on calls(orgid);
create index if not exists idx_calls_startedat on calls(startedat);
create index if not exists idx_calls_status on calls(status);
create index if not exists idx_calls_type on calls(type);

-- Knowledge base indexes
create index if not exists idx_knowledge_base_agent_id on knowledge_base(agent_id);
create index if not exists idx_knowledge_base_created_at on knowledge_base(created_at);
create index if not exists idx_knowledge_base_question_text on knowledge_base using gin(to_tsvector('english', question));
create index if not exists idx_knowledge_base_answer_text on knowledge_base using gin(to_tsvector('english', answer));

-- Workflows indexes
create index if not exists idx_workflows_agent_id on workflows(agent_id);
create index if not exists idx_workflows_created_at on workflows(created_at);
create index if not exists idx_workflows_title on workflows(title);
