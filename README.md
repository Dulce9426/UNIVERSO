# Cosmos Truth

Plataforma web educativa y de análisis sobre astronomía y teorías de conspiración.

## Stack Tecnológico

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Estilos**: Tailwind CSS + clsx + tailwind-merge
- **Componentes UI**: shadcn/ui (Radix primitives)
- **Iconos**: Lucide React
- **3D**: React Three Fiber (@react-three/fiber, @react-three/drei)
- **Base de Datos/Auth**: Supabase (Client & Server Actions)
- **Estado**: React Context + TanStack Query

## Instalación

```bash
npm install
```

## Variables de Entorno

Crea un archivo `.env.local` con:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
src/
├── app/              # Rutas y layouts (App Router)
├── components/       # Componentes React
│   ├── layout/      # Componentes de layout
│   ├── ui/          # Componentes UI base (shadcn)
│   ├── features/    # Componentes de funcionalidades
│   └── 3d/          # Componentes 3D (React Three Fiber)
├── lib/             # Utilidades y configuraciones
│   ├── supabase/    # Clientes de Supabase
│   ├── utils/       # Funciones auxiliares
│   └── constants/   # Constantes del proyecto
└── types/           # Definiciones de TypeScript
```

