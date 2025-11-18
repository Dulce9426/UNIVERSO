import { Badge } from "@/components/ui/badge"
import { getRadarNews } from "@/app/actions/radar"
import NewsCard from "@/components/features/radar/news-card"

const news = await getRadarNews()

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) {
    return "Hace menos de una hora"
  } else if (diffInHours < 24) {
    return `Hace ${diffInHours} ${diffInHours === 1 ? "hora" : "horas"}`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `Hace ${diffInDays} ${diffInDays === 1 ? "día" : "días"}`
  }
}

export default function RadarPage() {
  return (
    <div className="min-h-screen bg-cosmos-deep pb-16">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl md:text-6xl font-bold neon-cyan text-glow">
              Radar Espacial
            </h1>
            <Badge variant="live" className="animate-pulse">
              LIVE
            </Badge>
          </div>
          <p className="text-lg md:text-xl text-cosmos-starlight-gray-light max-w-3xl">
            Noticias en tiempo real sobre astronomía y exploración espacial. 
            Mantente informado sobre los últimos descubrimientos y misiones espaciales.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 auto-rows-fr">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-cosmos-starlight-gray">
            Actualizado en tiempo real • Fuentes: NASA, ESA, SpaceX, y otras agencias espaciales
          </p>
        </div>
      </div>
    </div>
  )
}

