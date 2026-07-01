-- ============================================================
-- BLACKBOX APPAREL — Supabase Schema
-- ============================================================
-- Ejecuta este script en: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1) Tabla de contenido del sitio (singleton JSON)
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
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4) Índices útiles
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_orders_created on public.orders(created_at desc);
create index if not exists idx_customers_phone on public.customers(phone);

-- 5) Políticas RLS (público puede leer/escribir — ajusta según tu seguridad)
alter table public.site_content enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;

-- Permitir todo con service_role (la API usa service_role key, así que esto es seguro)
-- Si quieres restringir más, agrega políticas específicas.
create policy "allow_all_site_content" on public.site_content for all using (true) with check (true);
create policy "allow_all_customers" on public.customers for all using (true) with check (true);
create policy "allow_all_orders" on public.orders for all using (true) with check (true);

-- ============================================================
-- 6) Storage bucket para imágenes subidas
-- Ve a Supabase Dashboard → Storage → New bucket
-- Nombre: blackbox-uploads
-- Público: SÍ
-- ============================================================

-- Insertar contenido inicial (opcional — se crea solo al primer save)
-- El contenido por defecto está en src/components/blackbox/content.ts

-- ============================================================
-- ✅ Listo. Ahora copia estos valores a tu archivo .env:
-- NEXT_PUBLIC_SUPABASE_URL = https://tu-proyecto.supabase.co
-- SUPABASE_SERVICE_ROLE_KEY = tu-service-role-key (NO la anon key)
-- ============================================================
