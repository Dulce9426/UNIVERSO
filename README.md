# Cosmos Truth 🌌

Plataforma web educativa y de análisis sobre astronomía y teorías de conspiración. El objetivo es educar y calmar la ansiedad mediante datos científicos y un entorno visual inmersivo.

## 🚀 Características

- **Radar Espacial**: Noticias en tiempo real sobre astronomía y exploración espacial
- **Bitácora**: Artículos educativos y análisis sobre conspiraciones
- **Comunidad**: Foro de discusión sobre astronomía y teorías
- **Sistema Solar 3D**: Animación interactiva del sistema solar en la página de inicio
- **Autenticación**: Sistema de login y registro con Supabase

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Estilos**: Tailwind CSS + clsx + tailwind-merge
- **Componentes UI**: shadcn/ui (Radix primitives)
- **Iconos**: Lucide React
- **3D**: CSS Animations (Sistema Solar)
- **Base de Datos/Auth**: Supabase (Client & Server Actions)
- **Estado**: React Context + TanStack Query

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar en producción
npm start
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ejecuta las migraciones SQL en `src/lib/supabase/migrations/`
3. Configura las variables de entorno

## 🌐 Despliegue en Vercel

1. Conecta tu repositorio de GitHub a Vercel
2. Agrega las variables de entorno en la configuración de Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (URL de tu proyecto en Vercel)
3. Vercel detectará automáticamente Next.js y desplegará el proyecto

## 📁 Estructura del Proyecto

```
src/
├── app/              # Rutas y layouts (App Router)
├── components/       # Componentes React
│   ├── 3d/          # Componentes 3D (Sistema Solar)
│   ├── features/    # Componentes de funcionalidades
│   ├── layout/      # Componentes de layout
│   └── ui/          # Componentes UI (shadcn/ui)
├── lib/             # Utilidades y configuraciones
│   └── supabase/    # Clientes de Supabase
└── types/           # Definiciones de TypeScript
```

## 🎨 Tema de Diseño

- **Tema**: "Deep Space" (Fondos oscuros #0a0a0a, textos blancos/grises, acentos Cyan/Neon)
- **Efectos**: Glassmorphism para tarjetas y paneles
- **Tipografía**: Inter (sans-serif moderna)
- **Modo**: Oscuro forzado (no toggle)

## 📝 Licencia

Este proyecto es privado.

## 👤 Autor

Dulce9426
