import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function ensureOrganization() {
  const supabase = createClientComponentClient()
  
  // Get the current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    console.error('Error getting user:', userError)
    return null
  }

  // Check if user already has an organization
  const { data: existingOrg, error: orgError } = await supabase
    .from('organizations')
    .select('*')
    .eq('owner_id', user.id)
    .single()

  if (orgError && orgError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
    console.error('Error checking for existing organization:', orgError)
    return null
  }

  if (existingOrg) {
    return existingOrg
  }

  // Create new organization if none exists
  const { data: newOrg, error: createError } = await supabase
    .from('organizations')
    .insert([
      {
        name: `${user.email}'s Organization`,
        owner_id: user.id,
      }
    ])
    .select()
    .single()

  if (createError) {
    console.error('Error creating organization:', createError)
    return null
  }

  return newOrg
}
