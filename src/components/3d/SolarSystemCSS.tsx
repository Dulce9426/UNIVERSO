'use client'

import { useEffect, useState } from 'react'

export default function SolarSystemCSS() {
  const [stars, setStars] = useState<Array<{
    left: number
    top: number
    size: number
    opacity: number
    duration: number
    delay: number
  }>>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // Generar estrellas solo en el cliente
    const generatedStars = Array.from({ length: 200 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }))
    setStars(generatedStars)

    // Inyectar estilos CSS globales para las animaciones
    const style = document.createElement('style')
    style.textContent = `
      @keyframes solar-rotate {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
      }
      @keyframes orbit-tierra {
        from { transform: translateX(-50%) rotate(0deg) translateX(100px) rotate(0deg); }
        to { transform: translateX(-50%) rotate(360deg) translateX(100px) rotate(-360deg); }
      }
      @keyframes orbit-marte {
        from { transform: translateX(-50%) rotate(0deg) translateX(150px) rotate(0deg); }
        to { transform: translateX(-50%) rotate(360deg) translateX(150px) rotate(-360deg); }
      }
      @keyframes orbit-jupiter {
        from { transform: translateX(-50%) rotate(0deg) translateX(225px) rotate(0deg); }
        to { transform: translateX(-50%) rotate(360deg) translateX(225px) rotate(-360deg); }
      }
      @keyframes twinkle {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 1; }
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  if (!isMounted) {
    return <div className="fixed inset-0 -z-10 bg-cosmos-deep" />
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Fondo estrellado con CSS */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Contenedor del Sistema Solar */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: '600px', height: '600px' }}>
        <div className="relative w-full h-full">
          {/* Sol */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: '80px',
              height: '80px',
              background: 'radial-gradient(circle, #fbbf24 0%, #f97316 50%, #dc2626 100%)',
              boxShadow: '0 0 60px rgba(255, 165, 0, 0.8)',
              animation: 'solar-rotate 20s linear infinite',
            }}
          />

          {/* Órbita Tierra */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/20"
            style={{
              width: '200px',
              height: '200px',
              animation: 'solar-rotate 15s linear infinite',
            }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full bg-blue-500"
              style={{
                width: '24px',
                height: '24px',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
                animation: 'orbit-tierra 8s linear infinite',
              }}
            />
          </div>

          {/* Órbita Marte */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/20"
            style={{
              width: '300px',
              height: '300px',
              animation: 'solar-rotate 20s linear infinite reverse',
            }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full bg-red-500"
              style={{
                width: '18px',
                height: '18px',
                boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)',
                animation: 'orbit-marte 12s linear infinite',
              }}
            />
          </div>

          {/* Órbita Júpiter */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/20"
            style={{
              width: '450px',
              height: '450px',
              animation: 'solar-rotate 25s linear infinite',
            }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full bg-purple-500"
              style={{
                width: '36px',
                height: '36px',
                boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)',
                animation: 'orbit-jupiter 18s linear infinite',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

