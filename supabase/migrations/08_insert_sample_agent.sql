-- First, insert a sample organization if not exists
insert into organizations (id, name, owner_id)
select 
    'org_sample123',
    'Sample Organization',
    'db4b6d6e-8b7f-4f87-9e46-2c62c6a24a5f'::uuid  -- Using our test user ID
where not exists (
    select 1 from organizations where id = 'org_sample123'
);

-- Insert a sample agent with all configurations
insert into agents (
    id,
    organization_id,
    name,
    greeting,
    personality,
    first_message,
    first_message_mode,
    hipaa_enabled,
    voice_config,
    model_config,
    transcriber_config,
    call_config,
    voicemail_config,
    analysis_config,
    artifact_config,
    message_config,
    speaking_config,
    monitor_config,
    server_config,
    metadata,
    credential_ids
) values (
    'agent_sample123',
    'org_sample123',
    'Customer Service Agent',
    'Hello! I''m your AI assistant. How can I help you today?',
    'Professional, friendly, and helpful',
    'Welcome to our customer service line. How may I assist you?',
    'greeting',
    false,
    jsonb_build_object(
        'provider', '11labs',
        'voiceId', 'joseph',
        'language', 'en',
        'stability', 0.5,
        'similarityBoost', 0.75,
        'style', 0,
        'useSpeakerBoost', true,
        'optimizeStreamingLatency', 1,
        'enableSsmlParsing', true,
        'fallbackPlan', jsonb_build_object(
            'voices', jsonb_build_array(
                jsonb_build_object(
                    'provider', 'rime-ai',
                    'voiceId', 'allison',
                    'speed', 1.0
                )
            )
        )
    ),
    jsonb_build_object(
        'provider', 'openai',
        'emotionRecognitionEnabled', true,
        'fallbackModels', jsonb_build_array('gpt-4o-mini', 'gpt-4'),
        'maxTokens', 150,
        'temperature', 0.7,
        'semanticCachingEnabled', true,
        'numFastTurns', 3,
        'messages', jsonb_build_array(
            jsonb_build_object(
                'role', 'system',
                'content', 'You are a helpful customer service agent.'
            )
        )
    ),
    jsonb_build_object(
        'provider', 'deepgram',
        'codeSwitchingEnabled', true,
        'endpointing', 500,
        'keywords', jsonb_build_array('support', 'help', 'issue'),
        'language', 'en-US',
        'smartFormat', true
    ),
    jsonb_build_object(
        'silenceTimeoutSeconds', 30,
        'maxDurationSeconds', 1800,
        'backgroundDenoisingEnabled', true,
        'modelOutputInMessagesEnabled', true,
        'endCallMessage', 'Thank you for calling. Have a great day!',
        'endCallPhrases', jsonb_build_array('goodbye', 'bye', 'thank you')
    ),
    jsonb_build_object(
        'detection', jsonb_build_object(
            'provider', 'twilio',
            'enabled', true,
            'voicemailDetectionTypes', jsonb_build_array('answering_machine', 'fax'),
            'machineDetectionTimeout', 5000,
            'machineDetectionSpeechThreshold', 2500,
            'machineDetectionSpeechEndThreshold', 1000,
            'machineDetectionSilenceTimeout', 3000
        ),
        'message', 'Please leave a message after the tone.'
    ),
    jsonb_build_object(
        'summaryPlan', jsonb_build_object(
            'enabled', true,
            'timeoutSeconds', 30,
            'messages', jsonb_build_array(
                'Please summarize this conversation'
            )
        ),
        'structuredDataPlan', jsonb_build_object(
            'enabled', true,
            'timeoutSeconds', 30,
            'schema', jsonb_build_object(
                'description', 'Customer interaction data',
                'required', jsonb_build_array('issue', 'resolution')
            )
        )
    ),
    jsonb_build_object(
        'recordingEnabled', true,
        'videoRecordingEnabled', false,
        'transcriptPlan', jsonb_build_object(
            'enabled', true,
            'assistantName', 'AI Agent',
            'userName', 'Customer'
        ),
        'recordingPath', '/recordings/agent_sample123/'
    ),
    jsonb_build_object(
        'idleMessages', jsonb_build_array(
            'Are you still there?',
            'Would you like me to help you with anything else?'
        ),
        'idleMessageMaxSpokenCount', 2,
        'idleTimeoutSeconds', 60
    ),
    jsonb_build_object(
        'startPlan', jsonb_build_object(
            'waitSeconds', 1,
            'smartEndpointingEnabled', true,
            'transcriptionEndpointingPlan', jsonb_build_object(
                'onPunctuationSeconds', 0.8,
                'onNoPunctuationSeconds', 1.2,
                'onNumberSeconds', 1.5
            )
        ),
        'stopPlan', jsonb_build_object(
            'numWords', 50,
            'voiceSeconds', 30,
            'backoffSeconds', 2
        )
    ),
    jsonb_build_object(
        'listenEnabled', true,
        'controlEnabled', true
    ),
    jsonb_build_object(
        'url', 'https://api.example.com/webhook',
        'timeoutSeconds', 30,
        'secret', 'sample_secret',
        'headers', jsonb_build_object(
            'Authorization', 'Bearer sample_token'
        )
    ),
    jsonb_build_object(
        'industry', 'Customer Service',
        'department', 'Support',
        'version', '1.0'
    ),
    array['cred_11labs123', 'cred_openai456']
);
