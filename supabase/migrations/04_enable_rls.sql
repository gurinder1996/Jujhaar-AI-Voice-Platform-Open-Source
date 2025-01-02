-- Enable Row Level Security on all tables
alter table organizations enable row level security;
alter table agents enable row level security;
alter table calls enable row level security;
alter table knowledge_base enable row level security;
alter table workflows enable row level security;
