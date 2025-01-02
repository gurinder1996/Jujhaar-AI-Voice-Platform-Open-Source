export interface Organization {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
}

export interface VoiceConfig {
  provider: string;
  voiceId: string;
  language?: string;
  stability?: number;
  similarityBoost?: number;
  style?: number;
  useSpeakerBoost?: boolean;
  optimizeStreamingLatency?: number;
  chunkPlan?: Record<string, any>;
  enableSsmlParsing?: boolean;
  fallbackPlan?: {
    voices: Array<{
      provider: string;
      voiceId: string;
      chunkPlan?: Record<string, any>;
      model?: string;
      speed?: number;
    }>;
  };
}

export interface ModelConfig {
  provider: string;
  emotionRecognitionEnabled?: boolean;
  fallbackModels?: string[];
  maxTokens?: number;
  temperature?: number;
  semanticCachingEnabled?: boolean;
  numFastTurns?: number;
  messages?: any[];
  tools?: any[];
  toolIds?: string[];
  knowledgeBaseId?: string;
  knowledgeBase?: {
    server: {
      url: string;
      timeoutSeconds: number;
      secret: string;
      headers: Record<string, string>;
    };
  };
}

export interface TranscriberConfig {
  provider: string;
  codeSwitchingEnabled?: boolean;
  endpointing?: number;
  keywords?: string[];
  language?: string | null;
  model?: string | null;
  smartFormat?: boolean;
}

export interface CallConfig {
  silenceTimeoutSeconds?: number;
  maxDurationSeconds?: number;
  backgroundSound?: string | null;
  backgroundDenoisingEnabled?: boolean;
  modelOutputInMessagesEnabled?: boolean;
  transportConfigurations?: any[];
  endCallMessage?: string;
  endCallPhrases?: string[];
  clientMessages?: any[];
  serverMessages?: any[];
}

export interface VoicemailConfig {
  detection: {
    provider: string;
    enabled: boolean;
    voicemailDetectionTypes: string[];
    machineDetectionTimeout: number;
    machineDetectionSpeechThreshold: number;
    machineDetectionSpeechEndThreshold: number;
    machineDetectionSilenceTimeout: number;
  };
  message: string;
}

export interface AnalysisConfig {
  summaryPlan?: {
    messages: any[];
    enabled: boolean;
    timeoutSeconds: number;
  };
  structuredDataPlan?: {
    messages: any[];
    enabled: boolean;
    schema: {
      items: Record<string, any>;
      properties: Record<string, any>;
      description: string;
      required: string[];
    };
    timeoutSeconds: number;
  };
  successEvaluationPlan?: {
    rubric: any | null;
    messages: any[];
    enabled: boolean;
    timeoutSeconds: number;
  };
}

export interface ArtifactConfig {
  recordingEnabled: boolean;
  videoRecordingEnabled: boolean;
  transcriptPlan: {
    enabled: boolean;
    assistantName: string;
    userName: string;
  };
  recordingPath: string;
}

export interface MessageConfig {
  idleMessages: string[];
  idleMessageMaxSpokenCount: number;
  idleTimeoutSeconds: number;
}

export interface SpeakingConfig {
  startPlan: {
    waitSeconds: number;
    smartEndpointingEnabled: boolean;
    customEndpointingRules: any[];
    transcriptionEndpointingPlan: {
      onPunctuationSeconds: number;
      onNoPunctuationSeconds: number;
      onNumberSeconds: number;
    };
  };
  stopPlan: {
    numWords: number;
    voiceSeconds: number;
    backoffSeconds: number;
  };
}

export interface Agent {
  id: string;
  organization_id: string;
  name: string;
  created_at: string;
  updated_at?: string;
  greeting?: string;
  personality?: string;
  first_message?: string;
  first_message_mode?: string;
  hipaa_enabled?: boolean;
  voice_config?: VoiceConfig;
  model_config?: ModelConfig;
  transcriber_config?: TranscriberConfig;
  call_config?: CallConfig;
  voicemail_config?: VoicemailConfig;
  analysis_config?: AnalysisConfig;
  artifact_config?: ArtifactConfig;
  message_config?: MessageConfig;
  speaking_config?: SpeakingConfig;
  monitor_config?: {
    listenEnabled: boolean;
    controlEnabled: boolean;
  };
  server_config?: {
    url: string;
    timeoutSeconds: number;
    secret: string;
    headers: Record<string, string>;
  };
  metadata?: Record<string, any>;
  credential_ids?: string[];
}

export interface Call {
  id: string;
  assistantid?: string;
  phonenumberid?: string;
  type?: string;
  startedat?: string;
  endedat?: string;
  transcript?: string;
  recordingurl?: string;
  summary?: string;
  createdat?: string;
  updatedat?: string;
  orgid?: string;
  cost?: number;
  assistant?: Record<string, any>;
  customer?: Record<string, any>;
  status?: string;
  endedreason?: string;
  messages?: Record<string, any>;
  stereorecordingurl?: string;
  costbreakdown?: Record<string, any>;
  phonecallprovider?: string;
  phonecallproviderid?: string;
  phonecalltransport?: string;
  analysis?: Record<string, any>;
  artifact?: Record<string, any>;
  costs?: Record<string, any>;
  monitor?: Record<string, any>;
  transport?: Record<string, any>;
  webcallurl?: string;
  assistantoverrides?: Record<string, any>;
}

export interface KnowledgeBase {
  id: string;
  agent_id: string;
  question: string;
  answer: string;
  created_at: string;
}

export interface Workflow {
  id: string;
  agent_id: string;
  title: string;
  definition_json: Record<string, any>;
  created_at: string;
}

export interface Database {
  organizations: Organization;
  agents: Agent;
  calls: Call;
  knowledge_base: KnowledgeBase;
  workflows: Workflow;
}
