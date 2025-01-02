export interface VoiceConfig {
  provider: string;
  voiceId: string;
  language: string;
  stability: number;
  similarityBoost: number;
  style: number;
  useSpeakerBoost: boolean;
  optimizeStreamingLatency: number;
  chunkPlan: Record<string, any>;
  enableSsmlParsing: boolean;
  humanizeConversation: boolean;
  fallbackPlan: {
    voices: Array<{
      provider: string;
      voiceId: string;
      chunkPlan?: {
        enabled: boolean;
        minCharacters: number;
        punctuationBoundaries: string[];
        formatPlan?: {
          enabled: boolean;
          numberToDigitsCutoff: number;
          replacements: Array<{
            from: string;
            to: string;
          }>;
        };
      };
      model?: string;
      speed?: number;
    }>;
  };
}
