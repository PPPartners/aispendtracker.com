create policy "Allow anon update based on id" on public.waitlist_entries
for update using (true) -- Allows the update operation itself
with check (true); -- Check condition (could be more specific, but using true for simplicity based on current flow)
