"use client"

import { useState } from "react"
import { signIn, signUp } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

type AuthMode = "login" | "signup"

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("login")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      const result = mode === "login" 
        ? await signIn(formData)
        : await signUp(formData)

      if (result?.error) {
        setError(result.error)
      } else if (result && 'message' in result) {
        setMessage(result.message)
      }
    } catch (err) {
      setError("Ocurrió un error inesperado")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-strong rounded-lg p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-cosmos-starlight-white mb-2">
            {mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
          </h2>
          <p className="text-sm text-cosmos-starlight-gray">
            {mode === "login"
              ? "Accede a tu cuenta de Cosmos Truth"
              : "Únete a la comunidad de Cosmos Truth"}
          </p>
        </div>

        <form action={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="username">Nombre de usuario</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="astronauta123"
                required={mode === "signup"}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="p-3 rounded-md bg-red-500/20 border border-red-500/50 text-red-400 text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="p-3 rounded-md bg-cosmos-neon-cyan/20 border border-cosmos-neon-cyan/50 text-cosmos-neon-cyan text-sm">
              {message}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === "login" ? "Iniciando sesión..." : "Creando cuenta..."}
              </>
            ) : (
              mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login")
              setError(null)
              setMessage(null)
            }}
            className="text-sm text-cosmos-neon-cyan hover:underline"
          >
            {mode === "login"
              ? "¿No tienes cuenta? Regístrate"
              : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </div>
      </div>
    </div>
  )
}

