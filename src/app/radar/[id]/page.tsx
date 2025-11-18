import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getRadarNewsById } from "@/app/actions/radar"

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const article = await getRadarNewsById(resolvedParams.id)

  if (!article) {
    return (
      <div className="min-h-screen bg-cosmos-deep flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-cosmos-starlight-white mb-4">
            Artículo no encontrado
          </h1>
          <Link href="/radar">
            <Button variant="outline">Volver al Radar</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cosmos-deep">
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
        {/* Back Button */}
        <Link href="/radar">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft size={16} className="mr-2" />
            Volver al Radar
          </Button>
        </Link>

        {/* Article */}
        <Card className="overflow-hidden">
          <div className="relative h-64 md:h-96 w-full">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              {article.is_live && (
                <Badge variant="live" className="animate-pulse">
                  LIVE
                </Badge>
              )}
              {article.is_breaking && !article.is_live && (
                <Badge variant="destructive">
                  Última Hora
                </Badge>
              )}
              {article.video_url && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Play size={12} />
                  Video
                </Badge>
              )}
            </div>
          </div>

          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl mb-4">
              {article.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{formatDate(article.date)}</span>
              </div>
              <span className="mx-2">•</span>
              <span className="text-cosmos-neon-cyan font-semibold">
                {article.source}
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-cosmos-starlight-gray-light mb-6 leading-relaxed">
                {article.summary}
              </p>
              
              {article.video_url && (
                <div className="mb-8 rounded-lg overflow-hidden border border-white/10">
                  <div className="bg-cosmos-space/50 p-4 border-b border-white/10">
                    <h3 className="text-lg font-semibold text-cosmos-starlight-white mb-2 flex items-center gap-2">
                      <Play size={20} className="text-cosmos-neon-cyan" />
                      Video Relacionado
                    </h3>
                    <p className="text-sm text-cosmos-starlight-gray">
                      Contenido multimedia complementario sobre esta noticia
                    </p>
                  </div>
                  <iframe
                    src={article.video_url}
                    className="w-full aspect-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={article.title}
                  />
                </div>
              )}

              {article.content && (
                <div className="text-cosmos-starlight-gray whitespace-pre-line leading-relaxed space-y-4">
                  {article.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <Link href="/radar">
                <Button variant="outline" className="w-full md:w-auto">
                  <ArrowLeft size={16} className="mr-2" />
                  Ver más noticias
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
