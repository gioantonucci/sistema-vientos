-- Vientos del Sur - esquema inicial Supabase
-- Roles de producto: admin, profesional

create extension if not exists "pgcrypto";

create type app_role as enum ('admin', 'profesional');
create type patient_status as enum ('activo', 'en_evaluacion', 'pausado', 'alta', 'inactivo');
create type professional_status as enum ('activo', 'inactivo', 'externo');
create type appointment_status as enum ('programado', 'confirmado', 'asistio', 'cancelado', 'ausente', 'reprogramado');
create type payment_status as enum ('pendiente', 'pagado', 'bonificado', 'cancelado');
create type payment_method as enum ('efectivo', 'transferencia', 'mercado_pago', 'otro');
create type followup_type as enum ('evolucion', 'evaluacion', 'entrevista', 'reunion_familia', 'reunion_escuela', 'observacion');
create type followup_visibility as enum ('privada', 'equipo', 'administracion');
create type document_type as enum ('informe', 'evaluacion', 'certificado', 'consentimiento', 'autorizacion', 'escolar', 'derivacion', 'otro');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role app_role not null default 'profesional',
  professional_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table professionals (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  discipline text not null,
  license text,
  phone text,
  email text,
  specialties text[] not null default '{}',
  insurances text[] not null default '{}',
  attention_days text,
  attention_hours text,
  status professional_status not null default 'activo',
  notes text,
  color text not null default '#2f6f6a',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table profiles
  add constraint profiles_professional_id_fkey
  foreign key (professional_id) references professionals(id) on delete set null;

create table patients (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  birth_date date,
  dni text,
  phone text,
  email text,
  address text,
  responsible_name text,
  responsible_link text,
  responsible_phone text,
  reason text,
  main_discipline text not null,
  status patient_status not null default 'activo',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table patient_professionals (
  patient_id uuid not null references patients(id) on delete cascade,
  professional_id uuid not null references professionals(id) on delete cascade,
  primary key (patient_id, professional_id)
);

create table appointments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients(id) on delete restrict,
  professional_id uuid not null references professionals(id) on delete restrict,
  appointment_date date not null,
  start_time time not null,
  end_time time not null,
  discipline text not null,
  status appointment_status not null default 'programado',
  payment_status payment_status not null default 'pendiente',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint appointment_time_order check (end_time > start_time)
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients(id) on delete restrict,
  professional_id uuid not null references professionals(id) on delete restrict,
  appointment_id uuid references appointments(id) on delete set null,
  session_date date not null,
  patient_difference numeric(12,2) not null default 0,
  insurance_name text not null default 'Particular',
  insurance_professional_amount numeric(12,2) not null default 0,
  total_amount numeric(12,2) generated always as (patient_difference + insurance_professional_amount) stored,
  professional_share numeric(12,2) generated always as ((patient_difference + insurance_professional_amount) * 0.40) stored,
  center_share numeric(12,2) generated always as ((patient_difference + insurance_professional_amount) * 0.60) stored,
  status payment_status not null default 'pendiente',
  method payment_method not null default 'otro',
  payment_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table followups (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients(id) on delete cascade,
  professional_id uuid not null references professionals(id) on delete restrict,
  record_date date not null,
  type followup_type not null,
  note text not null,
  visibility followup_visibility not null default 'equipo',
  attachments text[] not null default '{}',
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table patient_documents (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients(id) on delete cascade,
  name text not null,
  type document_type not null default 'otro',
  file_path text,
  uploaded_by uuid references profiles(id) on delete set null,
  uploaded_at timestamptz not null default now()
);

create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function current_professional_id()
returns uuid
language sql
security definer
set search_path = public
as $$
  select professional_id from profiles where id = auth.uid();
$$;

create or replace function can_access_patient(patient uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select is_admin()
    or exists (
      select 1
      from patient_professionals pp
      where pp.patient_id = patient
        and pp.professional_id = current_professional_id()
    );
$$;

alter table profiles enable row level security;
alter table professionals enable row level security;
alter table patients enable row level security;
alter table patient_professionals enable row level security;
alter table appointments enable row level security;
alter table payments enable row level security;
alter table followups enable row level security;
alter table patient_documents enable row level security;

create policy "profiles read own or admin"
on profiles for select
using (id = auth.uid() or is_admin());

create policy "profiles admin write"
on profiles for all
using (is_admin())
with check (is_admin());

create policy "professionals read admin or own"
on professionals for select
using (is_admin() or id = current_professional_id());

create policy "professionals admin write"
on professionals for all
using (is_admin())
with check (is_admin());

create policy "patients read assigned or admin"
on patients for select
using (can_access_patient(id));

create policy "patients admin write"
on patients for all
using (is_admin())
with check (is_admin());

create policy "patient_professionals read assigned or admin"
on patient_professionals for select
using (is_admin() or professional_id = current_professional_id());

create policy "patient_professionals admin write"
on patient_professionals for all
using (is_admin())
with check (is_admin());

create policy "appointments read assigned or admin"
on appointments for select
using (is_admin() or professional_id = current_professional_id());

create policy "appointments admin write"
on appointments for all
using (is_admin())
with check (is_admin());

create policy "payments admin only"
on payments for all
using (is_admin())
with check (is_admin());

create policy "followups read assigned or admin"
on followups for select
using (is_admin() or professional_id = current_professional_id() or can_access_patient(patient_id));

create policy "followups professional insert own or admin"
on followups for insert
with check (is_admin() or professional_id = current_professional_id());

create policy "followups update own or admin"
on followups for update
using (is_admin() or professional_id = current_professional_id())
with check (is_admin() or professional_id = current_professional_id());

create policy "documents read assigned or admin"
on patient_documents for select
using (is_admin() or can_access_patient(patient_id));

create policy "documents admin write"
on patient_documents for all
using (is_admin())
with check (is_admin());
