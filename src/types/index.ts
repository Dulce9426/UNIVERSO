// Tipos globales para Cosmos Truth

export interface User {
  id: string
  email: string
  username?: string
  avatar_url?: string
  created_at: string
}

export interface Article {
  id: string
  title: string
  content: string
  excerpt?: string
  author_id: string
  category: "educativo" | "conspiracion" | "noticia"
  published_at?: string
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  title: string
  content: string
  author_id: string
  thread_id?: string
  created_at: string
  updated_at: string
}

export interface Thread {
  id: string
  title: string
  author_id: string
  post_count: number
  last_post_at?: string
  created_at: string
}

