'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const planets = [
  { 
    id: 'mercury', 
    name: 'MERCURY', 
    orbitColor: '#a78bfa', // purple
    planetColor: '#c4b5fd', 
    size: 6, 
    orbit: 80, 
    speed: 3, 
    fact: 'Se encoge cada día más.' 
  },
  { 
    id: 'venus', 
    name: 'VENUS', 
    orbitColor: '#fb923c', // orange
    planetColor: '#fdba74', 
    size: 8, 
    orbit: 120, 
    speed: 5, 
    fact: 'Su día es más largo que su año.' 
  },
  { 
    id: 'earth', 
    name: 'EARTH', 
    orbitColor: '#60a5fa', // blue
    planetColor: '#93c5fd', 
    size: 8, 
    orbit: 160, 
    speed: 7, 
    fact: 'El único con agua líquida visible.' 
  },
  { 
    id: 'mars', 
    name: 'MARS', 
    orbitColor: '#fb923c', // light orange
    planetColor: '#fdba74', 
    size: 7, 
    orbit: 200, 
    speed: 9, 
    fact: 'Tiene el volcán más grande del sistema.' 
  },
];

// Generar estrellas de fondo
const generateStars = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.8 + 0.2,
  }));
};

export default function SolarRadar() {
  const [selected, setSelected] = useState(planets[2]); // Empieza en Tierra
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, size: number, opacity: number}>>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setStars(generateStars(200));
    
    // Actualizar hora cada segundo
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    }).toUpperCase();
  };

  return (
    <div className="relative w-full h-[600px] bg-black overflow-hidden rounded-lg border border-white/10 my-8">
      {/* Fondo estrellado */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* Contenedor centrado para el sistema solar */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Órbitas y Planetas */}
        {planets.map((planet) => (
          <div key={planet.id} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Línea orbital */}
            <svg
              className="absolute"
              style={{
                width: `${planet.orbit * 2}px`,
                height: `${planet.orbit * 2}px`,
                left: `-${planet.orbit}px`,
                top: `-${planet.orbit}px`,
              }}
            >
              <circle
                cx={planet.orbit}
                cy={planet.orbit}
                r={planet.orbit}
                fill="none"
                stroke={planet.orbitColor}
                strokeWidth="1"
                opacity="0.6"
              />
            </svg>

            {/* Contenedor del planeta que rota */}
            <motion.div
              className="absolute"
              style={{
                width: `${planet.orbit * 2}px`,
                height: `${planet.orbit * 2}px`,
                left: `-${planet.orbit}px`,
                top: `-${planet.orbit}px`,
              }}
              animate={{ 
                rotate: 360,
              }}
              transition={{ duration: planet.speed, repeat: Infinity, ease: "linear" }}
            >
              {/* Planeta */}
              <div
                className="absolute cursor-pointer group"
                style={{
                  left: `${planet.orbit}px`,
                  top: '0px',
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => setSelected(planet)}
              >
                <div
                  className="rounded-full"
                  style={{
                    width: `${planet.size}px`,
                    height: `${planet.size}px`,
                    backgroundColor: planet.planetColor,
                    boxShadow: `0 0 8px ${planet.planetColor}80`,
                  }}
                />
                
                {/* Etiqueta del planeta */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap"
                  style={{ top: `${planet.size / 2 + 8}px` }}
                >
                  <span className="text-xs font-mono text-white uppercase tracking-wider">
                    {planet.name}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        ))}

        {/* El Sol */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
          <div 
            className="rounded-full bg-yellow-400"
            style={{
              width: '24px',
              height: '24px',
              boxShadow: '0 0 30px rgba(255, 200, 0, 0.8)',
            }}
          />
          <span className="text-xs font-mono text-white uppercase tracking-wider mt-2">
            SUN
          </span>
        </div>
      </div>

      {/* Panel de información inferior */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        <div className="text-xs font-mono text-white uppercase tracking-wider">
          {formatDate(currentTime)} R S
        </div>
        <div className="text-xs font-mono text-green-400 uppercase tracking-wider">
          REAL RATE
        </div>
        <div className="text-xs font-mono text-white uppercase tracking-wider">
          {formatTime(currentTime)}
        </div>
        <div className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
      </div>

      {/* Panel de Datos (Flotante) - Opcional, se puede ocultar */}
      {selected && (
        <div className="absolute top-4 right-4 z-20 w-64 bg-black/90 backdrop-blur-md border border-cyan-500/30 p-4 rounded-lg">
          <h3 className="text-lg font-mono font-bold text-cyan-400 uppercase tracking-wider">
            {selected.name}
          </h3>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">ORBITANDO AL SOL</p>
          <p className="text-sm text-gray-200 mt-3">{selected.fact}</p>
        </div>
      )}
    </div>
  );
}
