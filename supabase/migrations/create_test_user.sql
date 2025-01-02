-- Create a test user if none exists
insert into auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
)
values (
    '00000000-0000-0000-0000-000000000000',
    'db4b6d6e-8b7f-4f87-9e46-2c62c6a24a5f',  -- This will be our test user ID
    'authenticated',
    'authenticated',
    'test@example.com',
    crypt('password123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '',
    '',
    '',
    ''
)
on conflict (id) do nothing;
