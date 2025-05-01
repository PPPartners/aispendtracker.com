-- Enable RLS for all relevant tables
alter table public.users enable row level security;
alter table public.vendors enable row level security;
alter table public.charges enable row level security;
alter table public.projects enable row level security;
alter table public.budgets enable row level security;
alter table public.charge_tags enable row level security;

-- Policies for users table
-- Allow users to select their own user record
drop policy if exists "Allow individual user select access" on public.users;
create policy "Allow individual user select access"
  on public.users for select
  using (auth.uid() = id);

-- Policies for vendors table
-- Allow authenticated users to select all vendors (can be refined later)
drop policy if exists "Allow authenticated select access for vendors" on public.vendors;
create policy "Allow authenticated select access for vendors"
  on public.vendors for select
  using (auth.role() = 'authenticated');
-- NOTE: Decide later how vendors should be managed (e.g., admin role only for insert/update/delete)

-- Policies for charges table
-- Allow users full access to their own charges
drop policy if exists "Allow full access to own charges" on public.charges;
create policy "Allow full access to own charges"
  on public.charges for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Policies for projects table
-- Allow users full access to their own projects
drop policy if exists "Allow full access to own projects" on public.projects;
create policy "Allow full access to own projects"
  on public.projects for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Policies for budgets table
-- Allow users full access to their own budgets
drop policy if exists "Allow full access to own budgets" on public.budgets;
create policy "Allow full access to own budgets"
  on public.budgets for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Policies for charge_tags table
-- Allow users to manage tags only for charges they own
drop policy if exists "Allow full access to own charge_tags" on public.charge_tags;
create policy "Allow full access to own charge_tags"
  on public.charge_tags for all
  using (auth.uid() = (select user_id from public.charges where id = charge_id))
  with check (auth.uid() = (select user_id from public.charges where id = charge_id));
