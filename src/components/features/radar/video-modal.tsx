"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Play } from "lucide-react"

interface VideoModalProps {
  videoUrl: string | null
  title: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function VideoModal({
  videoUrl,
  title,
  isOpen,
  onOpenChange,
}: VideoModalProps) {
  if (!videoUrl) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0">
        <div className="relative w-full aspect-video bg-cosmos-space">
          <iframe
            src={videoUrl}
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        </div>
        <DialogHeader className="px-6 pb-6">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Video relacionado con esta noticia
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

