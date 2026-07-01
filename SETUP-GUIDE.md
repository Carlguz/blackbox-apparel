# Guía de Setup — BLACKBOX APPAREL

Esta guía te lleva desde cero hasta tener la tienda online con base de datos en la nube.

---

## ✅ Estado actual (sin configurar nada)

La tienda **ya funciona** con:
- Base de datos local (SQLite)
- Imágenes guardadas localmente en `/public/uploads/`
- Panel admin completo (botón engrane abajo-izquierda)
- Contraseña: `blackbox2026`

**Problema:** si despliegas la app en otro servidor (Vercel, etc.), los cambios se pierden.

---

## 🚀 Configurar Supabase (recomendado, gratis)

### Paso 1 — Crear cuenta
1. Ve a https://supabase.com
2. Click "Start your project" → regístrate con GitHub o email
3. Click "New project"
4. Nombre: `blackbox-apparel`
5. Database password: genera una fuerte y guárdala
6. Region: South America (São Paulo) — la más cercana a Perú
7. Click "Create new project" (espera 2 minutos)

### Paso 2 — Crear tablas
1. En el dashboard, ve a **SQL Editor** (sidebar izquierdo)
2. Click "New query"
3. Pega TODO el contenido del archivo `supabase-schema.sql` (en la raíz del proyecto)
4. Click **Run** (botón verde)
5. Verás "Success. No rows returned" — listo

### Paso 3 — Crear bucket de imágenes
1. Ve a **Storage** (sidebar izquierdo)
2. Click "New bucket"
3. Name: `blackbox-uploads` (exactamente así)
4. Public bucket: ✅ marcado
5. Click "Create bucket"

### Paso 4 — Obtener credenciales
1. Ve a **Project Settings** (icono de engrane abajo-izquierda)
2. Click **API**
3. Copia estos dos valores:
   - **Project URL** → `https://xxxxx.supabase.co`
   - **service_role** secret → (la larga, NO la anon)

### Paso 5 — Configurar variables de entorno
Edita el archivo `.env` en la raíz del proyecto:

```bash
DATABASE_URL=file:/home/z/my-project/db/custom.db

NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...tu-clave-larga...

ADMIN_PASSWORD=blackbox2026
```

Reinicia el servidor: `bun run dev`

### Paso 6 — Verificar
1. Abre la landing
2. Click botón engrase (abajo-izquierda) → contraseña `blackbox2026`
3. Edita cualquier cosa → Guardar
4. Ve a Supabase → Table Editor → `site_content`
5. Deberías ver tu registro ahí ✅

---

## 📦 ¿Qué pasa ahora?

- **Imágenes que subas** → van a Supabase Storage (URL pública permanente)
- **Cambios en el panel admin** → se guardan en Supabase (persistentes)
- **Pedidos** → cuando alguien hace clic en WhatsApp desde un producto, se crea un pedido pendiente
- **Tab Pedidos** → ve al panel admin → tab "Pedidos" para gestionar

---

## 🎛️ Panel Admin — botón engrane

### Acceso
- Botón negro flotante abajo-izquierda
- Contraseña: `blackbox2026` (cámbiala en `.env` con `ADMIN_PASSWORD=tu-nueva-clave`)

### 10 tabs disponibles
1. **General** — número de WhatsApp
2. **Hero** — títulos, subtítulo, imagen de fondo
3. **Filosofía** — cita centrada
4. **Colección** — título y subtítulo de sección
5. **Productos** — CRUD completo + subida de imagen
6. **Beneficios** — CRUD + selector de icono
7. **Galería** — 3 imágenes (sube archivos)
8. **CTA Final** — textos del call-to-action
9. **Footer** — copyright
10. **Pedidos** — lista de pedidos con estados

### Sistema de pedidos
Cuando un visitante hace clic en "Pedir por WhatsApp" desde un producto:
1. Se abre WhatsApp con mensaje pre-armado
2. En background, se crea un pedido con estado `pending` en la DB
3. En el panel → tab "Pedidos" lo verás con:
   - Cliente (inicialmente "pending" hasta que confirmes)
   - Producto y talla
   - Total
   - Botones de estado: Pendiente / Confirmado / Enviado / Entregado / Cancelado
   - Botón eliminar

---

## 🔒 Seguridad

- La contraseña del admin es simple por ahora (`blackbox2026`). Cámbiala.
- La `service_role` key de Supabase **es sensible** — no la subas a Git público
- El archivo `.env` está en `.gitignore` por defecto

---

## ❓ Preguntas frecuentes

**¿Puedo editar la DB directamente tipo Excel?**
Sí. En Supabase → Table Editor → click cualquier celda → edita → Save.

**¿Las imágenes que subo pesan mucho?**
Se suben tal cual. Si quieres optimización, podemos agregar compresión automática luego.

**¿Qué pasa si Supabase se cae?**
La app sigue funcionando con SQLite local (fallback automático), pero los cambios no se sincronizan hasta que vuelva.

**¿Puedo agregar más productos?**
Sí, sin límite. En el panel → Productos → "+ Agregar producto".

**¿Cómo cambio el número de WhatsApp?**
Panel admin → General → escribe el número con código país (51 + 999888777).
