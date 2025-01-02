-- Drop the existing agents table
drop table if exists agents cascade;

-- Recreate agents table with all voice agent configurations
create table if not exists agents (
    -- Primary fields
    id text primary key,
    organization_id text not null references organizations (id) on delete cascade,
    name text not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone,
    
    -- Basic configuration
    greeting text,
    personality text,
    first_message text,
    first_message_mode text,
    hipaa_enabled boolean default false,
    
    -- Voice configuration
    voice_config jsonb default jsonb_build_object(
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
        'fallbackPlan', jsonb_build_object(
            'voices', jsonb_build_array(
                jsonb_build_object(
                    'provider', 'rime-ai',
                    'voiceId', 'allison'
                )
            )
        )
    ),
    
    -- Model configuration
    model_config jsonb default jsonb_build_object(
        'provider', 'openai',
        'emotionRecognitionEnabled', false,
        'fallbackModels', jsonb_build_array('gpt-4o-mini', 'gpt-4'),
        'maxTokens', 0,
        'temperature', 0,
        'semanticCachingEnabled', false,
        'numFastTurns', 0,
        'messages', jsonb_build_array(),
        'tools', jsonb_build_array(),
        'toolIds', jsonb_build_array(),
        'knowledgeBaseId', '',
        'knowledgeBase', jsonb_build_object(
            'server', jsonb_build_object(
                'url', '',
                'timeoutSeconds', 0,
                'secret', '',
                'headers', jsonb_build_object()
            )
        )
    ),
    
    -- Transcriber configuration
    transcriber_config jsonb default jsonb_build_object(
        'provider', 'deepgram',
        'codeSwitchingEnabled', false,
        'endpointing', 0,
        'keywords', jsonb_build_array(),
        'language', null,
        'model', null,
        'smartFormat', false
    ),
    
    -- Call handling configuration
    call_config jsonb default jsonb_build_object(
        'silenceTimeoutSeconds', 0,
        'maxDurationSeconds', 0,
        'backgroundSound', null,
        'backgroundDenoisingEnabled', false,
        'modelOutputInMessagesEnabled', false,
        'transportConfigurations', jsonb_build_array(),
        'endCallMessage', '',
        'endCallPhrases', jsonb_build_array(),
        'clientMessages', jsonb_build_array(),
        'serverMessages', jsonb_build_array()
    ),
    
    -- Voicemail configuration
    voicemail_config jsonb default jsonb_build_object(
        'detection', jsonb_build_object(
            'provider', 'twilio',
            'enabled', false,
            'voicemailDetectionTypes', jsonb_build_array(),
            'machineDetectionTimeout', 0,
            'machineDetectionSpeechThreshold', 0,
            'machineDetectionSpeechEndThreshold', 0,
            'machineDetectionSilenceTimeout', 0
        ),
        'message', ''
    ),
    
    -- Analysis configuration
    analysis_config jsonb default jsonb_build_object(
        'summaryPlan', jsonb_build_object(
            'messages', jsonb_build_array(),
            'enabled', false,
            'timeoutSeconds', 0
        ),
        'structuredDataPlan', jsonb_build_object(
            'messages', jsonb_build_array(),
            'enabled', false,
            'schema', jsonb_build_object(
                'items', jsonb_build_object(),
                'properties', jsonb_build_object(),
                'description', '',
                'required', jsonb_build_array()
            ),
            'timeoutSeconds', 0
        ),
        'successEvaluationPlan', jsonb_build_object(
            'rubric', null,
            'messages', jsonb_build_array(),
            'enabled', false,
            'timeoutSeconds', 0
        )
    ),
    
    -- Artifact configuration
    artifact_config jsonb default jsonb_build_object(
        'recordingEnabled', false,
        'videoRecordingEnabled', false,
        'transcriptPlan', jsonb_build_object(
            'enabled', false,
            'assistantName', '',
            'userName', ''
        ),
        'recordingPath', ''
    ),
    
    -- Message handling configuration
    message_config jsonb default jsonb_build_object(
        'idleMessages', jsonb_build_array(),
        'idleMessageMaxSpokenCount', 0,
        'idleTimeoutSeconds', 0
    ),
    
    -- Speaking configuration
    speaking_config jsonb default jsonb_build_object(
        'startPlan', jsonb_build_object(
            'waitSeconds', 0,
            'smartEndpointingEnabled', false,
            'customEndpointingRules', jsonb_build_array(),
            'transcriptionEndpointingPlan', jsonb_build_object(
                'onPunctuationSeconds', 0,
                'onNoPunctuationSeconds', 0,
                'onNumberSeconds', 0
            )
        ),
        'stopPlan', jsonb_build_object(
            'numWords', 0,
            'voiceSeconds', 0,
            'backoffSeconds', 0
        )
    ),
    
    -- Monitor configuration
    monitor_config jsonb default jsonb_build_object(
        'listenEnabled', false,
        'controlEnabled', false
    ),
    
    -- Server configuration
    server_config jsonb default jsonb_build_object(
        'url', '',
        'timeoutSeconds', 0,
        'secret', '',
        'headers', jsonb_build_object()
    ),
    
    -- Additional metadata
    metadata jsonb default '{}'::jsonb,
    credential_ids text[] default array[]::text[]
);

-- Create indexes for the new fields
create index if not exists idx_agents_voice_provider on agents ((voice_config->>'provider'));
create index if not exists idx_agents_model_provider on agents ((model_config->>'provider'));
create index if not exists idx_agents_transcriber_provider on agents ((transcriber_config->>'provider'));
create index if not exists idx_agents_hipaa on agents (hipaa_enabled);
create index if not exists idx_agents_metadata_gin on agents using gin (metadata);

-- Update the related tables to use cascade delete
alter table knowledge_base
    drop constraint if exists knowledge_base_agent_id_fkey,
    add constraint knowledge_base_agent_id_fkey 
    foreign key (agent_id) references agents(id) on delete cascade;

alter table workflows
    drop constraint if exists workflows_agent_id_fkey,
    add constraint workflows_agent_id_fkey 
    foreign key (agent_id) references agents(id) on delete cascade;
