import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
const envResult = dotenv.config({ path: resolve(__dirname, '../.env.local') })

if (envResult.error) {
  throw new Error('Could not load .env.local file')
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing required environment variables')
}

console.log('Creating Supabase client with:', { supabaseUrl, supabaseServiceKey })

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createTestUser() {
  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'test@example.com',
      password: 'password123',
      email_confirm: true,
      user_metadata: { name: 'Test User' }
    })

    if (error) {
      console.error('Error creating test user:', error.message)
      return
    }

    console.log('Test user created successfully:', data.user)
  } catch (err) {
    console.error('Error:', err)
  }
}

createTestUser()
