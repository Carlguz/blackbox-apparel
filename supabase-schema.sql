-- ============================================================
-- BLACKBOX APPAREL — Supabase Schema (completo)
-- ============================================================
-- Ejecuta este script en: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1) Tabla de contenido del sitio (singleton JSON, incluye theme colors)
create table if not exists public.site_content (
  id text primary key default 'singleton',
  data jsonb not null,
  updated_at timestamptz default now()
);

-- 2) Tabla de clientes
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text unique not null,
  email text,
  city text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3) Tabla de pedidos
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id),
  product_id text not null,
  product_name text not null,
  product_price text not null,
  size text,
  quantity int default 1,
  status text default 'pending',
  total text,
  notes text,
  source text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4) Tabla de leads (newsletter, capturas)
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id),
  email text not null,
  source text default 'newsletter',
  created_at timestamptz default now()
);

-- 5) Tabla de page views (analytics)
create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  referrer text,
  country text,
  device text,
  created_at timestamptz default now()
);

-- 6) Índices
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_orders_created on public.orders(created_at desc);
create index if not exists idx_orders_source on public.orders(source);
create index if not exists idx_customers_phone on public.customers(phone);
create index if not exists idx_customers_email on public.customers(email);
create index if not exists idx_leads_email on public.leads(email);
create index if not exists idx_pageviews_path on public.page_views(path);
create index if not exists idx_pageviews_created on public.page_views(created_at desc);

-- 7) Políticas RLS — service_role tiene acceso total
alter table public.site_content enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.leads enable row level security;
alter table public.page_views enable row level security;

create policy "allow_all_site_content" on public.site_content for all using (true) with check (true);
create policy "allow_all_customers" on public.customers for all using (true) with check (true);
create policy "allow_all_orders" on public.orders for all using (true) with check (true);
create policy "allow_all_leads" on public.leads for all using (true) with check (true);
create policy "allow_all_page_views" on public.page_views for all using (true) with check (true);

-- ============================================================
-- 8) Storage bucket para imágenes
-- Ve a Supabase Dashboard → Storage → New bucket
-- Nombre: blackbox-uploads
-- Público: SÍ
-- ============================================================

-- ============================================================
-- ✅ Listo. Copia esto a tu .env:
-- NEXT_PUBLIC_SUPABASE_URL = https://tu-proyecto.supabase.co
-- SUPABASE_SERVICE_ROLE_KEY = tu-service-role-key (NO la anon key)
-- ============================================================
