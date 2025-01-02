-- Add guidelines column to agents table
ALTER TABLE agents ADD COLUMN IF NOT EXISTS guidelines text;

-- Add humanize_conversation to voice_config default
ALTER TABLE agents 
ALTER COLUMN voice_config SET DEFAULT jsonb_build_object(
    'provider', '11labs',
    'voiceId', 'joseph',
    'language', '',
    'stability', 0,
    'similarityBoost', 0,
    'style', 0,
    'useSpeakerBoost', false,
    'optimizeStreamingLatency', 0,
    'chunkPlan', jsonb_build_object(),
    'enableSsmlParsing', false,
    'humanizeConversation', false,
    'fallbackPlan', jsonb_build_object(
        'voices', jsonb_build_array(
            jsonb_build_object(
                'provider', 'rime-ai',
                'voiceId', 'allison'
            )
        )
    )
);

-- Update existing rows to include humanizeConversation if it doesn't exist
UPDATE agents 
SET voice_config = voice_config || '{"humanizeConversation": false}'::jsonb 
WHERE voice_config -> 'humanizeConversation' IS NULL;

-- Add indexes for frequently accessed fields
CREATE INDEX IF NOT EXISTS idx_agents_personality ON agents (personality);
CREATE INDEX IF NOT EXISTS idx_agents_guidelines ON agents (guidelines);
CREATE INDEX IF NOT EXISTS idx_agents_greeting ON agents (greeting);
CREATE INDEX IF NOT EXISTS idx_agents_first_message ON agents (first_message);
CREATE INDEX IF NOT EXISTS idx_agents_voice_humanize ON agents ((voice_config->>'humanizeConversation'));

-- Enable pg_trgm extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Add indexes for knowledge base searches
CREATE INDEX IF NOT EXISTS idx_knowledge_base_question_gin ON knowledge_base USING gin (question gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_answer_gin ON knowledge_base USING gin (answer gin_trgm_ops);

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own organization's agent guidelines" ON agents;
DROP POLICY IF EXISTS "Users can update their own organization's agent guidelines" ON agents;

-- Add RLS policies for new columns
CREATE POLICY "Users can view their own organization's agent guidelines" 
    ON agents FOR SELECT 
    USING (organization_id IN (
        SELECT id FROM organizations WHERE owner_id = auth.uid()
    ));

CREATE POLICY "Users can update their own organization's agent guidelines" 
    ON agents FOR UPDATE 
    USING (organization_id IN (
        SELECT id FROM organizations WHERE owner_id = auth.uid()
    ));

-- Add comments for better documentation
COMMENT ON COLUMN agents.guidelines IS 'General guidelines for how the agent should behave across all workflows';
COMMENT ON COLUMN agents.voice_config IS 'Voice configuration including humanization settings';
