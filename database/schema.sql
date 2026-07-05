create table if not exists admin_accounts (
  email text primary key,
  password_hash text not null,
  password_set_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists admin_otps (
  id text primary key,
  email text not null,
  purpose text not null check (
    purpose in ('login', 'setup', 'password_reset')
  ),
  code_hash text not null,
  password_hash text,
  attempts integer not null default 0,
  expires_at timestamptz not null,
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists admin_otps_email_purpose_idx
on admin_otps (email, purpose, created_at desc);

create table if not exists blogs (
  id text primary key,
  slug text not null unique,
  title text not null,
  image text,
  display_date text,
  category text not null,
  author text not null,
  read_time text,
  tags jsonb not null default '[]'::jsonb,
  quote text,
  introduction jsonb not null default '[]'::jsonb,
  sections jsonb not null default '[]'::jsonb,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists staff_members (
  id text primary key,
  full_name text not null,
  role text not null,
  email text,
  phone text,
  department text,
  address text,
  bio text,
  image text,
  category text not null default 'management',
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists reports (
  id text primary key,
  title text not null,
  year text not null,
  category text not null,
  description text,
  link text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists events (
  id text primary key,
  title text not null,
  category text not null,
  event_date date,
  location text,
  image text,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id text primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists registrations (
  id text primary key,
  name text not null,
  email text not null,
  phone text,
  location text,
  role text not null,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists admin_notifications (
  id text primary key,
  type text not null,
  title text not null,
  message text not null,
  href text,
  metadata jsonb not null default '{}'::jsonb,
  read boolean not null default false,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists admin_notifications_created_at_idx
on admin_notifications (created_at desc);

create index if not exists admin_notifications_read_idx
on admin_notifications (read, created_at desc);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists blogs_set_updated_at on blogs;
create trigger blogs_set_updated_at
before update on blogs
for each row execute function set_updated_at();

drop trigger if exists staff_members_set_updated_at on staff_members;
create trigger staff_members_set_updated_at
before update on staff_members
for each row execute function set_updated_at();

drop trigger if exists reports_set_updated_at on reports;
create trigger reports_set_updated_at
before update on reports
for each row execute function set_updated_at();

drop trigger if exists events_set_updated_at on events;
create trigger events_set_updated_at
before update on events
for each row execute function set_updated_at();

drop trigger if exists contact_messages_set_updated_at on contact_messages;
create trigger contact_messages_set_updated_at
before update on contact_messages
for each row execute function set_updated_at();

drop trigger if exists registrations_set_updated_at on registrations;
create trigger registrations_set_updated_at
before update on registrations
for each row execute function set_updated_at();

drop trigger if exists admin_accounts_set_updated_at on admin_accounts;
create trigger admin_accounts_set_updated_at
before update on admin_accounts
for each row execute function set_updated_at();

drop trigger if exists admin_notifications_set_updated_at on admin_notifications;
create trigger admin_notifications_set_updated_at
before update on admin_notifications
for each row execute function set_updated_at();
