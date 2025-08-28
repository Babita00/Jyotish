-- Assign role to a user by email, reusable across environments
-- Usage examples:
--   select public.assign_role_by_email('admin@example.com', 'admin');
--   select public.assign_role_by_email('astro@example.com', 'astrologer');
--   select public.make_admin_by_email('admin@example.com');

create or replace function public.assign_role_by_email(
  target_email text,
  target_role text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid;
begin
  -- Validate role against allowed set
  if target_role not in ('client', 'admin', 'astrologer') then
    raise exception 'Invalid role: % (allowed: client, admin, astrologer)', target_role;
  end if;

  -- Fetch user id from auth.users
  select id into uid from auth.users where email ilike target_email;

  if uid is null then
    raise exception 'User not found for email: %', target_email;
  end if;

  -- Upsert into profiles and set role
  insert into profiles (id, full_name, role)
  values (uid, 'User', target_role)
  on conflict (id) do update set role = excluded.role;
end
$$;

comment on function public.assign_role_by_email (text, text) is 'Assigns a role (client/admin/astrologer) to a user identified by email.';

-- Convenience wrapper for admin role
create or replace function public.make_admin_by_email(target_email text)
returns void
language sql
security definer
set search_path = public
as $$
  select public.assign_role_by_email(target_email, 'admin');
$$;

comment on function public.make_admin_by_email (text) is 'Sets the given user (by email) to admin role.';

-- Optional: Restrict or grant execute as desired (keep minimal by default)
-- revoke all on function public.assign_role_by_email(text, text) from public;
-- revoke all on function public.make_admin_by_email(text) from public;
-- grant execute on function public.assign_role_by_email(text, text) to authenticated;
-- grant execute on function public.make_admin_by_email(text) to authenticated;