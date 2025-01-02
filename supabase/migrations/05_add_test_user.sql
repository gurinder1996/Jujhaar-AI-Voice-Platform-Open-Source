-- Create a test user using Supabase's auth.users() function
SELECT auth.create_user(
  uid := gen_random_uuid(),
  email := 'test@example.com',
  password := 'password123',
  email_confirmed := true,
  raw_user_meta_data := '{"name":"Test User"}'::jsonb
);
