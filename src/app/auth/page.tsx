import AuthForm from "@/components/features/auth/auth-form"
import { getCurrentUser } from "@/app/actions/auth"
import { redirect } from "next/navigation"

export default async function AuthPage() {
  const user = await getCurrentUser()

  // Si el usuario ya está autenticado, redirigir a home
  if (user) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-cosmos-deep flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold neon-cyan mb-4 text-glow">
            Cosmos Truth
          </h1>
          <p className="text-xl text-cosmos-starlight-gray-light">
            Accede a la plataforma educativa sobre astronomía
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  )
}

