# Séptimo Xielo — Rooftop GastroBar

> Sitio web completo con sistema de reservaciones y panel de administración para el restaurante Séptimo Xielo, Bogotá, Colombia.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat&logo=supabase)
![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=flat&logo=netlify)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat)
 
---

## 🌐 Demo en producción

**Sitio público:** [https://septimo-xielo.netlify.app](https://septimo-xielo.netlify.app)  
**Panel admin:** [https://septimo-xielo.netlify.app/login](https://septimo-xielo.netlify.app/login)
 
---

## 📋 Descripción

Séptimo Xielo es una aplicación web SPA (Single Page Application) desarrollada en React 18 que incluye:

- **Sitio público** — presentación del restaurante con menú filtrable, galería, formulario de reservaciones y contacto
- **Panel de administración** — gestión completa de reservaciones, menú, categorías y contenido del sitio
- **Tiempo real** — notificaciones instantáneas de nuevas reservaciones via Supabase Realtime
- **Base de datos** — PostgreSQL en Supabase con 5 tablas relacionales
---

## 🚀 Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| React | 18 | Framework frontend con Hooks y Context API |
| Vite | 8 | Bundler y servidor de desarrollo (HMR) |
| React Router | v6 | Enrutamiento del lado cliente |
| Supabase | 2.x | PostgreSQL + Realtime WebSockets |
| Netlify | — | Hosting estático con CI/CD automático |
| CSS Variables | — | Design system con tema dark luxury |
 
---

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── admin/          # AdminLayout, Dashboard, MenuManager, ReservationsManager,
│   │                   # CategoryManager, ContactManager, SettingsManager, RealtimeNotification
│   ├── auth/           # ProtectedRoute
│   ├── layout/         # Header, Footer
│   ├── sections/       # Hero, Menu, Reservations, Gallery, Contact
│   └── ui/             # Button, Modal, Toast, StatusBadge
├── context/
│   └── AppContext.jsx  # Estado global + Supabase Realtime
├── data/
│   └── initialData.js  # Datos semilla / fallback
├── hooks/
│   ├── useScrollSpy.js # Detecta sección activa con IntersectionObserver
│   └── useLocalStorage.js
├── lib/
│   ├── supabase.js     # Cliente Supabase (lee variables de entorno)
│   ├── dataService.js  # Abstracción de todas las llamadas a BD
│   └── authService.js  # Login, logout, gestión de sesión
├── pages/
│   ├── PublicPage.jsx  # Ruta /
│   ├── LoginPage.jsx   # Ruta /login
│   └── AdminPage.jsx   # Ruta /admin (protegida)
├── index.css           # Design system completo
└── main.jsx            # Entry point, Router, AppProvider
```
 
---

## ⚙️ Instalación y configuración

### Prerrequisitos

- Node.js v18 o superior
- npm v9 o superior
- Cuenta en [Supabase](https://supabase.com) con proyecto configurado
### 1. Clonar el repositorio

```bash
git clone https://github.com/filipghs/Pagina_Web_Septimo_Xielo.git
cd Pagina_Web_Septimo_Xielo
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=https://[tu-proyecto].supabase.co
VITE_SUPABASE_KEY=eyJhbGci...[tu-clave-anon]
```

> ⚠️ **Nunca subas el archivo `.env` a Git.** Ya está en `.gitignore`.

### 4. Configurar la base de datos

Ejecutar el siguiente SQL en el **SQL Editor de Supabase**:

```sql
-- Crear tablas
CREATE TABLE menu_items (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  nombre TEXT NOT NULL, precio INTEGER NOT NULL,
  cat TEXT NOT NULL, descripcion TEXT NOT NULL,
  disponible BOOLEAN DEFAULT true, created_at TIMESTAMPTZ DEFAULT now()
);
 
CREATE TABLE reservations (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  nombre TEXT NOT NULL, email TEXT NOT NULL, telefono TEXT NOT NULL,
  fecha TEXT NOT NULL, hora TEXT NOT NULL, personas INTEGER NOT NULL,
  ocasion TEXT DEFAULT '', notas TEXT DEFAULT '',
  status TEXT DEFAULT 'pendiente', created_at TIMESTAMPTZ DEFAULT now()
);
 
CREATE TABLE categories (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  nombre TEXT NOT NULL UNIQUE, orden INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
 
CREATE TABLE contact_info (
  id INTEGER PRIMARY KEY DEFAULT 1,
  telefono TEXT NOT NULL, email TEXT NOT NULL, direccion TEXT NOT NULL,
  horario JSONB NOT NULL, redes JSONB NOT NULL, menu_pdf TEXT DEFAULT '/menu.pdf'
);
 
CREATE TABLE dashboard_config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  ciclo TEXT DEFAULT 'mensual', fecha_inicio TEXT,
  auto_archivar BOOLEAN DEFAULT false, dias_archivar INTEGER DEFAULT 30
);
 
-- Permisos
ALTER TABLE menu_items    DISABLE ROW LEVEL SECURITY;
ALTER TABLE reservations  DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories    DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info  DISABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_config DISABLE ROW LEVEL SECURITY;
 
GRANT ALL ON public.menu_items, public.reservations, public.categories,
             public.contact_info, public.dashboard_config TO anon;
```

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
# → http://localhost:5173
```
 
---

## 📦 Scripts disponibles

```bash
npm run dev       # Servidor de desarrollo con HMR
npm run build     # Build de producción (genera /dist)
npm run preview   # Preview local del build de producción
```
 
---

## 🗂️ Base de datos

| Tabla | Descripción |
|---|---|
| `menu_items` | Platos del menú con nombre, precio, categoría y disponibilidad |
| `reservations` | Reservaciones con datos del cliente, fecha, hora y estado |
| `categories` | Categorías dinámicas del menú ordenadas por campo `orden` |
| `contact_info` | Fila única con datos de contacto, horario y redes sociales (JSONB) |
| `dashboard_config` | Configuración del ciclo de facturación del dashboard admin |
 
---

## 🔐 Panel de administración

Acceso en `/login` desde el enlace **Administración** en el footer del sitio.

| Credencial | Valor por defecto |
|---|---|
| Usuario | `admin` |
| Contraseña | `septimoxielo2026` |

> Las credenciales se pueden cambiar desde **Admin → ⚙️ Configuración** sin necesidad de modificar el código.

### Funcionalidades del admin

- **📊 Dashboard** — estadísticas de reservaciones y platos en tiempo real
- **📅 Reservaciones** — ver, filtrar, confirmar y cancelar reservaciones
- **🍽️ Menú** — CRUD completo de platos con activación/desactivación
- **🏷️ Categorías** — crear, editar y eliminar categorías dinámicas
- **📞 Contacto** — editar toda la información pública del restaurante
- **⚙️ Configuración** — cambiar usuario y contraseña de acceso
---

## 🏗️ Arquitectura y principios SOLID

El sistema sigue una arquitectura de capas con flujo de datos unidireccional:

```
Componentes React → AppContext (useApp) → dataService.js → Supabase
```

| Principio | Aplicación |
|---|---|
| **S** — Single Responsibility | Cada componente tiene una única responsabilidad |
| **O** — Open/Closed | Agregar pestaña al admin = 1 objeto en TABS + 1 case en renderTab() |
| **L** — Liskov Substitution | Componentes comparten interfaces de props consistentes |
| **I** — Interface Segregation | Cada componente recibe solo las props que necesita |
| **D** — Dependency Inversion | Componentes dependen de `useApp()`, nunca de Supabase directamente |
 
---

## 🚀 Despliegue en Netlify

El proyecto usa CI/CD automático. Cada push a `main` despliega automáticamente.

### Configuración requerida en Netlify

| Campo | Valor |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Environment variables | `VITE_SUPABASE_URL` y `VITE_SUPABASE_KEY` |

El archivo `public/_redirects` es **obligatorio** para que React Router funcione:

```
/*    /index.html   200
```
 
---

## 👥 Autores

| Nombre | Código |
|---|---|
| Felipe Jose Garzon Herrera | 20251020132 |
| Ferney Buitrago | 20251020171 |

**Asignatura:** Programación Avanzada  
**Docente:** Nancy Yaneth Gelvez  
**Institución:** Universidad Distrital Francisco José de Caldas — 2026
 
---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.
