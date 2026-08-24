create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'planned' check (status in ('planned','active','completed','archived')),
  target_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  goal_id uuid references public.goals(id) on delete set null,
  title text not null,
  description text,
  status text not null default 'todo' check (status in ('todo','in_progress','completed','cancelled')),
  priority text not null default 'medium' check (priority in ('low','medium','high')),
  due_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index goals_user_id_idx on public.goals(user_id);
create index goals_user_status_idx on public.goals(user_id, status);
create index tasks_user_id_idx on public.tasks(user_id);
create index tasks_user_status_idx on public.tasks(user_id, status);
create index tasks_user_due_at_idx on public.tasks(user_id, due_at);
create index tasks_goal_id_idx on public.tasks(goal_id);
create index notes_user_updated_at_idx on public.notes(user_id, updated_at);

alter table public.profiles enable row level security;
alter table public.goals enable row level security;
alter table public.tasks enable row level security;
alter table public.notes enable row level security;

create policy "profiles_select_own" on public.profiles for select to authenticated using (id = auth.uid());
create policy "profiles_insert_own" on public.profiles for insert to authenticated with check (id = auth.uid());
create policy "profiles_update_own" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "profiles_delete_own" on public.profiles for delete to authenticated using (id = auth.uid());

create policy "goals_select_own" on public.goals for select to authenticated using (user_id = auth.uid());
create policy "goals_insert_own" on public.goals for insert to authenticated with check (user_id = auth.uid());
create policy "goals_update_own" on public.goals for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "goals_delete_own" on public.goals for delete to authenticated using (user_id = auth.uid());

create policy "tasks_select_own" on public.tasks for select to authenticated using (user_id = auth.uid());
create policy "tasks_insert_own" on public.tasks for insert to authenticated with check (user_id = auth.uid() and (goal_id is null or exists (select 1 from public.goals g where g.id = goal_id and g.user_id = auth.uid())));
create policy "tasks_update_own" on public.tasks for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid() and (goal_id is null or exists (select 1 from public.goals g where g.id = goal_id and g.user_id = auth.uid())));
create policy "tasks_delete_own" on public.tasks for delete to authenticated using (user_id = auth.uid());

create policy "notes_select_own" on public.notes for select to authenticated using (user_id = auth.uid());
create policy "notes_insert_own" on public.notes for insert to authenticated with check (user_id = auth.uid());
create policy "notes_update_own" on public.notes for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "notes_delete_own" on public.notes for delete to authenticated using (user_id = auth.uid());
