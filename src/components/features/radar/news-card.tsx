"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ExternalLink, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import VideoModal from "./video-modal"
import type { RadarNewsItem } from "@/app/actions/radar"

interface NewsCardProps {
  item: RadarNewsItem
}

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

export default function NewsCard({ item }: NewsCardProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const handleVideoClick = (e: React.MouseEvent) => {
    if (item.video_url) {
      e.preventDefault()
      e.stopPropagation()
      setIsVideoOpen(true)
    }
  }

  return (
    <>
      <div className="relative h-full">
        <Card className="hover:bg-white/10 transition-all duration-300 group overflow-hidden h-full flex flex-col min-h-[400px]">
          <div className="relative h-48 w-full overflow-hidden bg-cosmos-space">
            <Link href={`/radar/${item.id}`} className="block w-full h-full">
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </Link>
            
            {/* Botón de video independiente (no bloquea la navegación) */}
            {item.video_url && (
              <button
                onClick={handleVideoClick}
                className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 bg-cosmos-neon-cyan/90 hover:bg-cosmos-neon-cyan text-cosmos-deep rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-cosmos-neon-cyan/50 z-10"
                aria-label="Ver video"
              >
                <Play size={16} fill="currentColor" />
                Ver Video
              </button>
            )}
            
            <div className="absolute top-4 right-4 flex gap-2">
              {item.is_live && (
                <Badge variant="live" className="animate-pulse">
                  LIVE
                </Badge>
              )}
              {item.is_breaking && !item.is_live && (
                <Badge variant="destructive">
                  Última Hora
                </Badge>
              )}
              {item.video_url && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Play size={12} />
                  Video
                </Badge>
              )}
            </div>
          </div>
          
          <Link href={`/radar/${item.id}`} className="flex-grow flex flex-col">
            <CardHeader className="flex-grow">
              <div className="flex items-start justify-between gap-2 mb-2">
                <CardTitle className="text-xl line-clamp-2 group-hover:text-cosmos-neon-cyan transition-colors">
                  {item.title}
                </CardTitle>
              </div>
              <CardDescription className="flex items-center gap-2 text-xs">
                <Clock size={14} />
                <span>{formatDate(item.date)}</span>
                <span className="mx-2">•</span>
                <span className="text-cosmos-neon-cyan">{item.source}</span>
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-cosmos-starlight-gray line-clamp-3 mb-4">
                {item.summary}
              </p>
              <div className="flex items-center gap-2 text-sm text-cosmos-neon-cyan group-hover:text-cosmos-neon-blue transition-colors">
                Leer más
                <ExternalLink size={14} />
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>

      {item.video_url && (
        <VideoModal
          videoUrl={item.video_url}
          title={item.title}
          isOpen={isVideoOpen}
          onOpenChange={setIsVideoOpen}
        />
      )}
    </>
  )
}

