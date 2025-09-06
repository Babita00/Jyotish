-- Password reset tokens table
create table if not exists public.password_resets (
    id uuid primary key default gen_random_uuid (),
    user_id uuid references auth.users (id) on delete cascade,
    email text not null,
    token_hash text not null,
    expires_at timestamptz not null,
    created_at timestamptz default now()
);

-- Index for quick lookup and cleanup
create index if not exists idx_password_resets_email on public.password_resets (email);

create index if not exists idx_password_resets_expires_at on public.password_resets (expires_at);