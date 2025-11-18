# Configuración de Supabase para Cosmos Truth

## Pasos para Configurar Supabase

### 1. Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Anota tu **Project URL** y **anon/public key**

### 2. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

### 3. Ejecutar Migración SQL

1. Ve al **SQL Editor** en tu dashboard de Supabase
2. Abre el archivo `src/lib/supabase/migrations/001_initial_schema.sql`
3. Copia y pega todo el contenido en el editor SQL
4. Ejecuta la migración

Esto creará:
- Tabla `profiles` (perfiles de usuario)
- Tabla `articles` (artículos de la bitácora)
- Tabla `threads` (hilos del foro)
- Tabla `posts` (comentarios en hilos)
- Políticas RLS (Row Level Security)
- Triggers y funciones automáticas

### 4. Configurar Autenticación

En el dashboard de Supabase:
1. Ve a **Authentication** > **URL Configuration**
2. Agrega `http://localhost:3000` a **Site URL**
3. Agrega `http://localhost:3000/auth/callback` a **Redirect URLs**

### 5. Verificar Configuración

Una vez configurado, deberías poder:
- Registrarte en `/auth`
- Iniciar sesión
- Ver tu perfil en la navbar

## Estructura de la Base de Datos

### Tablas Principales

- **profiles**: Perfiles de usuario extendidos
- **articles**: Artículos educativos y de análisis
- **threads**: Hilos de discusión en la comunidad
- **posts**: Comentarios dentro de los hilos

### Seguridad (RLS)

Todas las tablas tienen Row Level Security habilitado:
- Los usuarios solo pueden modificar sus propios datos
- Los artículos publicados son visibles para todos
- Los hilos y posts son visibles para todos los usuarios autenticados

## Próximos Pasos

Después de configurar Supabase, puedes:
1. Personalizar las políticas RLS según tus necesidades
2. Agregar más campos a las tablas
3. Crear funciones adicionales para consultas complejas

