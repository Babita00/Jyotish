-- Remove the problematic trigger that's causing infinite recursion
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

DROP FUNCTION IF EXISTS public.handle_new_user ();

-- Add a policy to allow users to insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles FOR
INSERT
    TO authenticated
WITH
    CHECK (auth.uid () = id);

-- Create profiles for existing users who don't have them
-- This runs with superuser privileges during migration
INSERT INTO
    public.profiles (id, full_name, phone, role)
SELECT u.id, COALESCE(
        u.raw_user_meta_data ->> 'full_name', 'User'
    ), u.raw_user_meta_data ->> 'phone', 'client'
FROM auth.users u
    LEFT JOIN public.profiles p ON u.id = p.id
WHERE
    p.id IS NULL ON CONFLICT (id) DO NOTHING;