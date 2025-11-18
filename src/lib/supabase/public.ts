import { createClient } from "@supabase/supabase-js"

// Cliente público de Supabase para consultas que no requieren autenticación
export const createPublicClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

