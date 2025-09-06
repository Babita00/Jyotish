-- Function to automatically update updated_at on row update
create or replace function trigger_set_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create table
create table public.daily_horoscopes (
    id uuid primary key default gen_random_uuid (),
    date date not null,
    zodiac_sign text not null,
    content_en text not null,
    content_ne text not null,
    is_published boolean default false,
    author_id uuid references auth.users (id) on delete set null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Trigger to keep updated_at fresh
create trigger set_timestamp
before update on public.daily_horoscopes
for each row
execute procedure trigger_set_timestamp();