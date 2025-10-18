create table if not exists profiles (user_id uuid primary key, subscription_status text not null default 'free', daily_messages_used int not null default 0, daily_reset_at date);
create table if not exists agents (id uuid primary key default gen_random_uuid(), user_id uuid not null, name text not null, persona text not null, tools jsonb default '{}'::jsonb, created_at timestamptz default now());
create index if not exists agents_user_id_idx on agents(user_id);
