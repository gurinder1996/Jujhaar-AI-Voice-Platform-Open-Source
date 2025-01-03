import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { z } from 'zod'

// Validation schemas for different field types
const validationSchemas = {
  name: z.string().min(1, "Name is required").max(100),
  organization_id: z.string().uuid("Invalid organization ID"),
  greeting: z.string().max(1000).nullable().transform(val => val || ''),
  personality: z.string().max(1000).nullable().transform(val => val || ''),
  guidelines: z.string().max(5000).nullable().transform(val => val || ''),
  status: z.enum(["active", "inactive", "draft"]),
  voice_config: z.object({
    provider: z.string(),
    voiceId: z.string(),
    language: z.string(),
    stability: z.number().min(0).max(1),
    similarityBoost: z.number().min(0).max(1),
    style: z.number().min(0).max(1),
    useSpeakerBoost: z.boolean(),
    optimizeStreamingLatency: z.number().min(0),
    enableSsmlParsing: z.boolean(),
    speechNormalization: z.boolean(),
    boostedKeywords: z.array(z.string()),
    backchanneling: z.boolean(),
    interruptionSensitivity: z.number().min(0).max(1),
    responsiveness: z.number().min(0).max(1)
  }).partial(),
  transcriber_config: z.object({
    provider: z.string(),
    codeSwitchingEnabled: z.boolean(),
    endpointing: z.number().min(0),
    keywords: z.array(z.string()),
    language: z.string().nullable(),
    smartFormat: z.boolean()
  }).partial()
}

type FieldPath = string[]
type ValidationSchema = keyof typeof validationSchemas

export async function updateAgentField(
  agentId: string,
  fieldPath: FieldPath,
  value: any,
  schemaKey: ValidationSchema
) {
  const supabase = createClientComponentClient()
  
  try {
    // Validate the value using the appropriate schema
    const schema = validationSchemas[schemaKey]
    const validatedValue = await schema.parseAsync(value)

    // Convert field path to Supabase update format
    let updateData = {}
    if (fieldPath.length === 1) {
      updateData = { [fieldPath[0]]: validatedValue }
    } else {
      // Handle nested paths (e.g., ['voice_config', 'provider'])
      updateData = fieldPath.reduceRight((value, key, index) => ({
        [key]: index === fieldPath.length - 1 ? validatedValue : value
      }), {})
    }

    console.log('Updating agent:', agentId, 'with data:', updateData)

    // Update the field in Supabase
    const { data, error } = await supabase
      .from('agents')
      .update(updateData)
      .eq('id', agentId)
      .select()

    if (error) {
      console.error('Supabase update error:', error)
      throw error
    }

    console.log('Update successful:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Error updating agent field:', error)
    return { 
      success: false, 
      error: error instanceof z.ZodError ? error.errors : error.message 
    }
  }
}
