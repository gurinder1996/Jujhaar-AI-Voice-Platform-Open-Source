import { createClient } from '@supabase/supabase-js'

// Initialize Supabase Admin client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function createOrganizationForUser(userId: string, email: string) {
  try {
    // Check if user already has an organization
    const { data: existingOrg } = await supabaseAdmin
      .from('organizations')
      .select('*')
      .eq('owner_id', userId)
      .single()

    if (existingOrg) {
      return existingOrg
    }

    // Create new organization
    const { data: newOrg, error: createError } = await supabaseAdmin
      .from('organizations')
      .insert([
        {
          id: `org_${userId.substring(0, 8)}`,  // Create a predictable org ID
          name: `${email}'s Organization`,
          owner_id: userId
        }
      ])
      .select()
      .single()

    if (createError) {
      console.error('Error creating organization:', createError)
      return null
    }

    // Create a default agent for the organization
    const { error: agentError } = await supabaseAdmin
      .from('agents')
      .insert([
        {
          id: `agent_${userId.substring(0, 8)}`,
          name: 'My First Agent',
          organization_id: newOrg.id
        }
      ])

    if (agentError) {
      console.error('Error creating default agent:', agentError)
    }

    return newOrg
  } catch (error) {
    console.error('Error in createOrganizationForUser:', error)
    return null
  }
}

export async function getOrCreateOrganization(userId: string, email: string) {
  try {
    // Try to get existing organization
    const { data: org } = await supabaseAdmin
      .from('organizations')
      .select('*')
      .eq('owner_id', userId)
      .single()

    if (org) {
      return org
    }

    // Create new organization if none exists
    return await createOrganizationForUser(userId, email)
  } catch (error) {
    console.error('Error in getOrCreateOrganization:', error)
    return null
  }
}
