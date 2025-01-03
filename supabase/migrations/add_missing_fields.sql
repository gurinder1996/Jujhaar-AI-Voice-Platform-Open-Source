-- Add status column to agents table
ALTER TABLE agents
ADD COLUMN status text DEFAULT 'active';

-- Add new fields to voice_config JSONB
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
    'chunkPlan', '{}',
    'enableSsmlParsing', false,
    'fallbackPlan', jsonb_build_object('voices', array[jsonb_build_object('provider', 'rime-ai', 'voiceId', 'allison')]),
    -- New fields
    'speechNormalization', false,
    'boostedKeywords', '[]'::jsonb,
    'backchanneling', false,
    'interruptionSensitivity', 0.5,
    'responsiveness', 0.5
);

-- Update existing rows with new voice_config fields
UPDATE agents
SET voice_config = voice_config || jsonb_build_object(
    'speechNormalization', false,
    'boostedKeywords', '[]'::jsonb,
    'backchanneling', false,
    'interruptionSensitivity', 0.5,
    'responsiveness', 0.5
)
WHERE voice_config IS NOT NULL;

-- Add custom functions to model_config JSONB
ALTER TABLE agents
ALTER COLUMN model_config SET DEFAULT jsonb_build_object(
    'provider', 'openai',
    'emotionRecognitionEnabled', false,
    'fallbackModels', array['gpt-4o-mini', 'gpt-4'],
    'maxTokens', 0,
    'temperature', 0,
    'semanticCachingEnabled', false,
    'numFastTurns', 0,
    'messages', '[]'::jsonb,
    'tools', '[]'::jsonb,
    'toolIds', '[]'::jsonb,
    'knowledgeBaseId', '',
    'knowledgeBase', jsonb_build_object('server', jsonb_build_object('url', '', 'timeoutSeconds', 0, 'secret', '', 'headers', '{}')),
    -- New fields
    'customFunctions', '[]'::jsonb
);

-- Update existing rows with new model_config fields
UPDATE agents
SET model_config = model_config || jsonb_build_object(
    'customFunctions', '[]'::jsonb
)
WHERE model_config IS NOT NULL;

-- Add notification_config JSONB column
ALTER TABLE agents
ADD COLUMN notification_config jsonb DEFAULT jsonb_build_object(
    'emailSummary', 'never',
    'contactInfo', jsonb_build_object(
        'email', '',
        'phoneNumber', ''
    ),
    'notificationEvents', jsonb_build_object(
        'everyCall', false,
        'liveActionError', false,
        'unhappyCustomer', false,
        'requiredInformation', false,
        'humanFollowUp', false
    )
);

-- Add comment to explain the schema
COMMENT ON COLUMN agents.status IS 'Agent status: active, inactive, archived';
COMMENT ON COLUMN agents.notification_config IS 'Configuration for agent notifications and alerts';
COMMENT ON COLUMN agents.voice_config IS 'Voice configuration including speech settings and behavior';
COMMENT ON COLUMN agents.model_config IS 'Model configuration including custom functions and tools';
