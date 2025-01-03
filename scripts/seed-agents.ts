import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { randomUUID } from 'crypto'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

const EXISTING_USER_ID = '347f42c5-4434-47df-b2bb-283e8ddf2d36'
const ORG_ID = randomUUID()

async function seedData() {
  // Create the organization for the existing user
  const { error: orgError } = await supabase
    .from('organizations')
    .insert({
      id: ORG_ID,
      name: 'Demo Organization',
      owner_id: EXISTING_USER_ID
    })

  if (orgError) {
    console.error('Error creating organization:', orgError)
    return
  }

  console.log('Created organization:', ORG_ID)

  // Create the agents
  const { error: agentsError } = await supabase.from('agents').insert([
    {
      id: randomUUID(),
      organization_id: ORG_ID,
      name: 'Customer Service Bot',
      greeting: 'Hello! How can I assist you today?',
      personality: 'Friendly and professional customer service representative',
      first_message: 'Welcome to our service! How may I help you?',
      first_message_mode: 'immediate',
      hipaa_enabled: false,
      voice_config: {
        provider: '11labs',
        voiceId: 'rachel',
        language: 'en-US',
        stability: 0.5,
        similarityBoost: 0.7,
        style: 0,
        useSpeakerBoost: true,
        optimizeStreamingLatency: 1,
        enableSsmlParsing: true,
        fallbackPlan: {
          voices: [{ provider: 'rime-ai', voiceId: 'allison' }]
        }
      },
      model_config: {
        provider: 'openai',
        emotionRecognitionEnabled: true,
        fallbackModels: ['gpt-4', 'gpt-3.5-turbo'],
        maxTokens: 150,
        temperature: 0.7,
        semanticCachingEnabled: true,
        numFastTurns: 3
      },
      metadata: { tags: ['customer-service', 'general-support'] },
      credential_ids: ['cred_1']
    },
    {
      id: randomUUID(),
      organization_id: ORG_ID, 
      name: 'Sales Assistant',
      greeting: 'Hi there! Looking for great deals?',
      personality: 'Enthusiastic and knowledgeable sales professional',
      first_message: 'Let me show you our latest offers!',
      first_message_mode: 'immediate',
      hipaa_enabled: false,
      voice_config: {
        provider: '11labs',
        voiceId: 'josh',
        language: 'en-US',
        stability: 0.6,
        similarityBoost: 0.8,
        style: 1,
        useSpeakerBoost: true,
        optimizeStreamingLatency: 1,
        enableSsmlParsing: true,
        fallbackPlan: {
          voices: [{ provider: 'rime-ai', voiceId: 'james' }]
        }
      },
      model_config: {
        provider: 'openai',
        emotionRecognitionEnabled: true,
        fallbackModels: ['gpt-4', 'gpt-3.5-turbo'],
        maxTokens: 200,
        temperature: 0.8,
        semanticCachingEnabled: true,
        numFastTurns: 4
      },
      metadata: { tags: ['sales', 'product-specialist'] },
      credential_ids: ['cred_2']
    },
    {
      id: randomUUID(),
      organization_id: ORG_ID,
      name: 'Technical Support',
      greeting: 'Welcome to tech support! How can I assist?',
      personality: 'Patient and detail-oriented technical expert',
      first_message: 'I can help you resolve any technical issues.',
      first_message_mode: 'immediate',
      hipaa_enabled: false,
      voice_config: {
        provider: '11labs',
        voiceId: 'emily',
        language: 'en-US',
        stability: 0.8,
        similarityBoost: 0.6,
        style: 0,
        useSpeakerBoost: true,
        optimizeStreamingLatency: 1,
        enableSsmlParsing: true,
        fallbackPlan: {
          voices: [{ provider: 'rime-ai', voiceId: 'sarah' }]
        }
      },
      model_config: {
        provider: 'openai',
        emotionRecognitionEnabled: false,
        fallbackModels: ['gpt-4', 'gpt-3.5-turbo'],
        maxTokens: 300,
        temperature: 0.5,
        semanticCachingEnabled: true,
        numFastTurns: 5
      },
      metadata: { tags: ['technical-support', 'troubleshooting'] },
      credential_ids: ['cred_3']
    }
  ])

  if (agentsError) {
    console.error('Error seeding agents:', agentsError)
  } else {
    console.log('Successfully seeded agents')
  }
}

seedData()
