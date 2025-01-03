import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getOrCreateOrganization } from '@/lib/supabase-admin'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get or create organization
    const org = await getOrCreateOrganization(user.id, user.email!)
    if (!org) {
      return NextResponse.json(
        { error: 'Failed to get or create organization' }, 
        { status: 500 }
      )
    }

    return NextResponse.json({ organization: org })
  } catch (error) {
    console.error('Error in organization route:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
