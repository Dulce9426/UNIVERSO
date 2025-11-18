"use server"

import { createClient } from "@/lib/supabase/server"

export interface RadarNewsItem {
  id: string
  title: string
  summary: string
  content: string | null
  date: string
  source: string
  image_url: string
  video_url: string | null
  is_live: boolean
  is_breaking: boolean
  published: boolean
}

export async function getRadarNews(): Promise<RadarNewsItem[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("radar_news")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false })

  if (error) {
    console.error("Error fetching radar news:", error)
    return []
  }

  return data || []
}

export async function getRadarNewsById(id: string): Promise<RadarNewsItem | null> {
  try {
    // Validar que el ID sea un UUID válido
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(id)) {
      return null
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("radar_news")
      .select("*")
      .eq("id", id)
      .eq("published", true)
      .single()

    if (error) {
      // PGRST116 = no rows returned (registro no encontrado)
      // Esto es normal, no es un error crítico
      if (error.code === 'PGRST116' || error.message?.includes('No rows')) {
        return null
      }
      // Solo loguear errores reales, no los de "no encontrado"
      if (error.code && error.code !== 'PGRST116') {
        console.error("Error fetching radar news by id:", {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        })
      }
      return null
    }

    return data || null
  } catch (err) {
    // Solo loguear si es un error inesperado
    if (err instanceof Error) {
      console.error("Unexpected error fetching radar news by id:", err.message)
    }
    return null
  }
}

