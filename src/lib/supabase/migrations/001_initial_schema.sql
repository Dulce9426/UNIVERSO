-- Cosmos Truth - Esquema Inicial de Base de Datos
-- Ejecuta este SQL en el editor SQL de Supabase

-- Extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de perfiles de usuario (extiende auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Los usuarios pueden ver todos los perfiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Los usuarios pueden actualizar su propio perfil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Los usuarios pueden insertar su propio perfil"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Tabla de artículos (Bitácora)
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('educativo', 'conspiracion', 'noticia')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos pueden ver artículos publicados"
  ON public.articles FOR SELECT
  USING (published_at IS NOT NULL);

CREATE POLICY "Los autores pueden ver sus propios artículos"
  ON public.articles FOR SELECT
  USING (auth.uid() = author_id);

CREATE POLICY "Los usuarios autenticados pueden crear artículos"
  ON public.articles FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Los autores pueden actualizar sus propios artículos"
  ON public.articles FOR UPDATE
  USING (auth.uid() = author_id);

CREATE POLICY "Los autores pueden eliminar sus propios artículos"
  ON public.articles FOR DELETE
  USING (auth.uid() = author_id);

-- Tabla de hilos (Comunidad)
CREATE TABLE IF NOT EXISTS public.threads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  post_count INTEGER DEFAULT 0,
  last_post_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.threads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos pueden ver hilos"
  ON public.threads FOR SELECT
  USING (true);

CREATE POLICY "Los usuarios autenticados pueden crear hilos"
  ON public.threads FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Los autores pueden actualizar sus propios hilos"
  ON public.threads FOR UPDATE
  USING (auth.uid() = author_id);

-- Tabla de posts (Comentarios en hilos)
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  thread_id UUID REFERENCES public.threads(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos pueden ver posts"
  ON public.posts FOR SELECT
  USING (true);

CREATE POLICY "Los usuarios autenticados pueden crear posts"
  ON public.posts FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Los autores pueden actualizar sus propios posts"
  ON public.posts FOR UPDATE
  USING (auth.uid() = author_id);

CREATE POLICY "Los autores pueden eliminar sus propios posts"
  ON public.posts FOR DELETE
  USING (auth.uid() = author_id);

-- Función para crear perfil automáticamente cuando se crea un usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil automáticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Función para actualizar post_count y last_post_at en threads
CREATE OR REPLACE FUNCTION public.update_thread_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.threads
  SET 
    post_count = (SELECT COUNT(*) FROM public.posts WHERE thread_id = NEW.thread_id),
    last_post_at = NEW.created_at,
    updated_at = NOW()
  WHERE id = NEW.thread_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar estadísticas del hilo
DROP TRIGGER IF EXISTS on_post_created ON public.posts;
CREATE TRIGGER on_post_created
  AFTER INSERT ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.update_thread_stats();

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_articles_author_id ON public.articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON public.articles(published_at);
CREATE INDEX IF NOT EXISTS idx_threads_author_id ON public.threads(author_id);
CREATE INDEX IF NOT EXISTS idx_threads_last_post_at ON public.threads(last_post_at);
CREATE INDEX IF NOT EXISTS idx_posts_thread_id ON public.posts(thread_id);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON public.posts(author_id);

