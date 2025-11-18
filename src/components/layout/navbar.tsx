import Link from "next/link"
import { NAV_ROUTES } from "@/lib/constants"
import { getCurrentUser } from "@/app/actions/auth"
import { signOut } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"

export default async function Navbar() {
  const user = await getCurrentUser()

  return (
    <nav className="border-b border-white/10 bg-cosmos-deep/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold neon-cyan">
            Cosmos Truth
          </Link>

          <div className="flex items-center gap-6">
            {NAV_ROUTES.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="text-cosmos-starlight-gray-light hover:text-cosmos-neon-cyan transition-colors"
              >
                {route.label}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-cosmos-starlight-gray-light hover:text-cosmos-neon-cyan transition-colors"
                >
                  <User size={20} />
                  <span className="hidden sm:inline">Perfil</span>
                </Link>
                <form action={async () => {
                  await signOut()
                }}>
                  <Button
                    type="submit"
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    <span className="hidden sm:inline">Salir</span>
                  </Button>
                </form>
              </div>
            ) : (
              <Link href="/auth">
                <Button variant="outline" size="sm">
                  Iniciar Sesión
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

