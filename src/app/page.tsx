import Link from "next/link"
import { NAV_ROUTES } from "@/lib/constants"
import { Telescope, BookOpen, Users, Radio } from "lucide-react"
import SolarSystemCSS from '@/components/3d/SolarSystemCSS'

export default function HomePage() {
  const features = [
    {
      title: "Radar",
      description: "Noticias en tiempo real sobre astronomía y exploración espacial",
      icon: Radio,
      href: "/radar",
      color: "text-cosmos-neon-cyan",
    },
    {
      title: "Bitácora",
      description: "Artículos educativos y análisis sobre conspiraciones",
      icon: BookOpen,
      href: "/bitacora",
      color: "text-cosmos-neon-blue",
    },
    {
      title: "Comunidad",
      description: "Foro de discusión sobre astronomía y teorías",
      icon: Users,
      href: "/comunidad",
      color: "text-cosmos-neon-purple",
    },
  ]

  return (
    <main className="min-h-screen bg-cosmos-deep relative">
      {/* Sistema Solar 3D de fondo (CSS) */}
      <SolarSystemCSS />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center z-10">
        <div className="container mx-auto px-4 py-16 relative z-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold neon-cyan mb-6 text-glow">
              Cosmos Truth
            </h1>
            <p className="text-xl md:text-2xl text-cosmos-starlight-gray-light mb-4">
              Plataforma educativa sobre astronomía y análisis científico
            </p>
            <p className="text-lg text-cosmos-starlight-gray mb-12 max-w-2xl mx-auto">
              Explora el universo, descubre la verdad detrás de los fenómenos cósmicos y 
              calma tu ansiedad con datos científicos verificados.
            </p>

            {/* Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Link
                    key={feature.href}
                    href={feature.href}
                    className="glass-strong rounded-lg p-6 hover:bg-white/15 transition-all duration-300 group"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={48} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-semibold text-cosmos-starlight-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-cosmos-starlight-gray">
                        {feature.description}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* CTA Section */}
            <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/radar"
                className="px-8 py-3 bg-cosmos-neon-cyan/20 border border-cosmos-neon-cyan text-cosmos-neon-cyan rounded-lg font-semibold hover:bg-cosmos-neon-cyan/30 transition-all duration-300"
              >
                Explorar Radar
              </Link>
              <Link
                href="/bitacora"
                className="px-8 py-3 glass border border-white/20 text-cosmos-starlight-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Leer Bitácora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="relative py-20 border-t border-white/10 z-20 bg-cosmos-deep/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Telescope className="w-16 h-16 text-cosmos-neon-cyan mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-cosmos-starlight-white mb-4">
              Misión
            </h2>
            <p className="text-lg text-cosmos-starlight-gray-light leading-relaxed">
              En Cosmos Truth, nuestro objetivo es educar y tranquilizar mediante datos científicos 
              verificados. Cuando surgen fenómenos cósmicos que generan ansiedad o teorías de 
              conspiración, proporcionamos análisis claros y fundamentados para ayudarte a 
              comprender la realidad del universo.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

