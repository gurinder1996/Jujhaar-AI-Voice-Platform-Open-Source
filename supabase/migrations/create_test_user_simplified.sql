-- First check existing users
select id, email from auth.users limit 1;

-- If no results, then run this insert:
insert into auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    aud,
    role
)
values (
    'db4b6d6e-8b7f-4f87-9e46-2c62c6a24a5f',
    'test@example.com',
    crypt('password123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    'authenticated',
    'authenticated'
)
on conflict (id) do nothing
returning id;
