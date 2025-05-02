alter table public.waitlist_entries
add column confirmation_token text unique,
add column confirmed_at timestamp with time zone;

-- Add index for faster token lookup
create index idx_waitlist_confirmation_token on public.waitlist_entries (confirmation_token);

-- Optional: Update policies if needed, though existing public insert/read should be okay.
-- Consider if confirmed users should have different read access.
