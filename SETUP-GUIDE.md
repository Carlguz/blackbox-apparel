# Guía de Setup — BLACKBOX APPAREL

Tienda online completa con panel admin, gestión de pedidos, stock, métricas y más.

---

## ✅ Estado actual (sin configurar nada)

La tienda **ya funciona** con:
- Base de datos local (SQLite) — cambios se guardan pero se pierden al redeployar
- Imágenes en `/public/uploads/` local
- Panel admin completo (botón engrane abajo-izquierda)
- Contraseña: `blackbox2026`
- Páginas individuales por producto en `/producto/[id]`
- Sistema de pedidos automático (al clic en WhatsApp)
- Dashboard con métricas en tiempo real
- Captura de leads (newsletter)
- SEO automático + sitemap.xml + robots.txt

**Problema:** si despliegas la app en otro servidor, los cambios se pierden. Para persistencia real, configura Supabase.

---

## 🚀 Configurar Supabase (recomendado, gratis)

### Paso 1 — Crear cuenta
1. Ve a https://supabase.com → regístrate
2. Click "New project"
3. Nombre: `blackbox-apparel`
4. Region: South America (São Paulo) — más cercana a Perú
5. Click "Create new project" (espera 2 minutos)

### Paso 2 — Crear tablas
1. Ve a **SQL Editor** (sidebar izquierdo)
2. Click "New query"
3. Pega TODO el contenido de `supabase-schema.sql` (en la raíz)
4. Click **Run**

### Paso 3 — Crear bucket de imágenes
1. Ve a **Storage**
2. Click "New bucket"
3. Name: `blackbox-uploads` (exactamente así)
4. Public bucket: ✅ marcado
5. Click "Create bucket"

### Paso 4 — Obtener credenciales
1. Ve a **Project Settings** (engrane abajo-izquierda)
2. Click **API**
3. Copia:
   - **Project URL** → `https://xxxxx.supabase.co`
   - **service_role** secret → (larga, NO la anon)

### Paso 5 — Configurar `.env`
Edita el archivo `.env` en la raíz:

```bash
DATABASE_URL=file:/home/z/my-project/db/custom.db

NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...tu-clave-larga...

ADMIN_PASSWORD=tu-clave-segura
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

Reinicia el servidor: `bun run dev`

### Paso 6 — Verificar
1. Abre la landing → click botón engrase → contraseña
2. Edita cualquier cosa → Guardar
3. Ve a Supabase → Table Editor → `site_content` → deberías ver tu registro ✅

---

## 🎛️ Panel Admin — botón engrase (abajo-izquierda)

### Acceso
- Botón negro flotante abajo-izquierda
- Contraseña: configurable en `.env` con `ADMIN_PASSWORD=...`

### 14 tabs disponibles

#### 📊 Métricas y operaciones
1. **Dashboard** — KPIs en tiempo real: pedidos totales, ingresos, conversión, top productos, pedidos últimos 7 días (gráfico de barras), pedidos recientes
2. **Pedidos** — lista completa con filtros por estado, cambio de estado (5 estados), eliminar
3. **Stock** — control de inventario por talla (XS-XXL) por producto

#### ✏️ Edición de contenido
4. **General** — WhatsApp, Instagram, TikTok URLs
5. **Hero** — títulos, subtítulo, botón, imagen fondo
6. **Filosofía** — etiqueta y cita
7. **Colección** — título y subtítulo
8. **Productos** — CRUD completo: nombre, precio, etiqueta, descripción, historia, material, cuidados, tallas disponibles, imagen frontal + espalda
9. **Beneficios** — CRUD + selector de icono Material Symbol
10. **Galería** — 3 imágenes (calle, cuello, espalda)
11. **CTA Final** — título, subtítulo, botón
12. **Footer** — copyright
13. **Tema** — editor de colores (fondo, texto, primario, WhatsApp)
14. **Newsletter** — textos + lista de suscriptores

---

## 🛒 Sistema de Pedidos automático

Cuando un visitante hace clic en "Pedir por WhatsApp":
1. Se abre WhatsApp con mensaje pre-armado
2. En background se crea un pedido `pending` en la DB con: producto, precio, talla, fuente (landing/página producto/CTA)
3. En el panel → Pedidos → lo verás con todos los datos
4. Cambia el estado: Pendiente → Confirmado → Enviado → Entregado / Cancelado

---

## 📄 Páginas individuales de producto

Cada producto tiene su propia página en `/producto/[id]` con:
- Galería de imágenes (frontal + espalda)
- Descripción, historia, material, cuidados
- Selector de talla con disponibilidad visual
- Selector de cantidad
- Indicador de stock (disponible / bajo / agotado)
- Guía de tallas colapsable (tabla de medidas)
- Botón WhatsApp con tracking
- Trust badges (envío, garantía, pago contra entrega)
- Productos relacionados
- SEO automático (OpenGraph + Twitter cards)

---

## 📈 Dashboard de métricas

En el panel admin → tab Dashboard:
- **KPIs:** pedidos totales, ingresos entregados, ingresos potenciales, conversión, clientes únicos, pedidos por estado
- **Gráfico:** pedidos últimos 7 días (barras)
- **Top productos:** más pedidos con conteo y revenue
- **Pedidos recientes:** últimos 5 con estado coloreado

---

## 📧 Newsletter / Captura de leads

- Sección newsletter en la landing con captura de email
- Los suscriptores se guardan en tabla `leads`
- Visibles en panel admin → tab Newsletter
- Cada lead se asocia a un Customer (upsert por teléfono/email)

---

## 🎨 Personalización visual

Tab **Tema** en el admin permite cambiar:
- Color de fondo
- Color de texto principal
- Color primario (negro por defecto)
- Color del botón de WhatsApp

Los cambios se aplican al guardar.

---

## 🔍 SEO

- **Metadata dinámica** por producto (title, description, OpenGraph, Twitter)
- **sitemap.xml** automático en `/sitemap.xml` (incluye home + todos los productos)
- **robots.txt** en `/robots.txt`
- Configura `NEXT_PUBLIC_SITE_URL` en `.env` con tu dominio real

---

## 🛡️ Seguridad

- La contraseña del admin es simple por defecto (`blackbox2026`). **Cámbiala**.
- La `service_role` key de Supabase es sensible — no la subas a Git público
- `.env` está en `.gitignore`

---

## ❓ FAQ

**¿Puedo editar la DB directamente tipo Excel?**
Sí. Supabase → Table Editor → click celda → edita → Save.

**¿Las imágenes se optimizan?**
Se suben tal cual. Pendiente agregar compresión automática.

**¿Qué pasa si Supabase se cae?**
La app sigue funcionando con SQLite local (fallback automático).

**¿Cómo cambio el número de WhatsApp?**
Panel admin → General → escribe el número con código país.

**¿Cómo agrego un producto nuevo?**
Panel admin → Productos → "+ Agregar producto" → completa los campos → Guardar.

**¿Cómo controlo el stock?**
Panel admin → Stock → edita cantidades por talla → Guardar.
