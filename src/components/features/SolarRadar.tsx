'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Compass } from 'lucide-react';

// Datos con texturas planas para simular 3D
const planets = [
  { 
    id: 'mercury', 
    name: 'MERCURY',
    displayName: 'Mercurio',
    orbitColor: '#a78bfa', // purple
    planetColor: '#c4b5fd', 
    size: 6, 
    orbit: 80, 
    speed: 30, // Más lento (era 4)
    desc: 'El planeta más pequeño y cercano al Sol. Se está encogiendo lentamente debido al enfriamiento de su núcleo.',
    stats: { temp: '430°C', day: '59 días terrestres' },
    texture: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Mercury_colorenhanced.png',
    fact: 'Se encoge cada día más.'
  },
  { 
    id: 'venus', 
    name: 'VENUS',
    displayName: 'Venus',
    orbitColor: '#fb923c', // orange
    planetColor: '#fdba74', 
    size: 8, 
    orbit: 120, 
    speed: 50, // Más lento (era 10)
    desc: 'Un mundo infernal con efecto invernadero descontrolado. Su rotación es retrógrada (gira al revés).',
    stats: { temp: '462°C', day: '243 días terrestres' },
    texture: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Solar_System_Portal_Venus_Globe.jpg',
    fact: 'Su día es más largo que su año.'
  },
  { 
    id: 'earth', 
    name: 'EARTH',
    displayName: 'Tierra',
    orbitColor: '#60a5fa', // blue
    planetColor: '#93c5fd', 
    size: 8, 
    orbit: 160, 
    speed: 70, // Más lento (era 15)
    desc: 'Nuestro hogar. El único lugar conocido con vida y agua líquida estable en la superficie.',
    stats: { temp: '15°C', day: '24 horas' },
    texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Solarsystemscope_texture_8k_earth_daymap.jpg/1200px-Solarsystemscope_texture_8k_earth_daymap.jpg',
    fact: 'El único con agua líquida visible.'
  },
  { 
    id: 'mars', 
    name: 'MARS',
    displayName: 'Marte',
    orbitColor: '#fb923c', // light orange
    planetColor: '#fdba74', 
    size: 7, 
    orbit: 200, 
    speed: 90, // Más lento (era 20)
    desc: 'El planeta rojo. Tiene el volcán más grande del sistema solar (Monte Olimpo). Objetivo principal de colonización.',
    stats: { temp: '-60°C', day: '24h 37m' },
    texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1200px-OSIRIS_Mars_true_color.jpg',
    fact: 'Tiene el volcán más grande del sistema.'
  },
  { 
    id: 'jupiter', 
    name: 'JUPITER',
    displayName: 'Júpiter',
    orbitColor: '#2dd4bf', // teal
    planetColor: '#d8ca9d', 
    size: 24, 
    orbit: 280, 
    speed: 150, // Más lento (era 35)
    desc: 'El gigante gaseoso. Su masa es 2.5 veces la de todos los demás planetas juntos. Escudo de asteroides de la Tierra.',
    stats: { temp: '-145°C', day: '9h 56m' },
    texture: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg',
    fact: 'Protege a la Tierra de asteroides.'
  },
  { 
    id: 'saturn', 
    name: 'SATURN',
    displayName: 'Saturno',
    orbitColor: '#38bdf8', // cyan
    planetColor: '#fad5a5', 
    size: 20, 
    orbit: 340, 
    speed: 200, // Más lento (era 45)
    desc: 'Famoso por su complejo sistema de anillos hechos de hielo y roca. Podría flotar en una piscina gigante de agua.',
    stats: { temp: '-178°C', day: '10h 42m' },
    texture: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg',
    fact: 'Sus anillos son hielo y roca.'
  }
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
  const [selected, setSelected] = useState<typeof planets[0] | null>(null);
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

  // Inyectar animación CSS para la rotación del planeta
  useEffect(() => {
    const styleId = 'planet-spin-animation';
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes spin-planet {
        from { background-position: 0% center; }
        to { background-position: 200% center; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      const styleToRemove = document.getElementById(styleId);
      if (styleToRemove) {
        styleToRemove.remove();
      }
    };
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

      {/* Panel de información superior derecha */}
      {selected && (
        <div className="absolute top-4 right-4 z-20 w-64 bg-black/80 backdrop-blur-md border border-cyan-500/30 p-4 rounded-xl">
          <h3 className="text-xl font-bold text-cyan-400 font-mono uppercase">{selected.name}</h3>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">ORBITANDO AL SOL</p>
          <p className="text-sm text-gray-200 mt-3">{selected.fact}</p>
        </div>
      )}

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

      {/* === VISTA DE DETALLE (ZOOM) === */}
      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col md:flex-row items-center justify-center gap-8 p-8"
          >
            {/* Botón Cerrar */}
            <button 
              onClick={() => setSelected(null)} 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* PLANETA 3D FALSO (CSS TEXTURE SCROLL) */}
            <div className="relative w-64 h-64 md:w-96 md:h-96 flex-shrink-0">
              <div 
                className="w-full h-full rounded-full shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.9)]"
                style={{
                  background: `url(${selected.texture || ''}) repeat-x`,
                  backgroundSize: 'cover',
                  backgroundColor: selected.planetColor,
                  animation: 'spin-planet 20s linear infinite',
                }}
              />
              {/* Brillo atmosférico */}
              <div className="absolute inset-0 rounded-full shadow-[0_0_50px_rgba(0,150,255,0.2)] pointer-events-none" />
            </div>

            {/* INFO DEL PLANETA */}
            <div className="max-w-md text-left space-y-6">
              <div>
                <h2 className="text-5xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  {selected.displayName}
                </h2>
                <div className="h-1 w-20 bg-cyan-500 rounded-full" />
              </div>
              
              <p className="text-lg text-gray-300 leading-relaxed border-l-2 border-cyan-500/30 pl-4">
                {selected.desc}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 text-cyan-400 mb-1">
                    <Info className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider">Temperatura</span>
                  </div>
                  <span className="text-xl font-mono text-white">{selected.stats.temp}</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 text-purple-400 mb-1">
                    <Compass className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider">Duración Día</span>
                  </div>
                  <span className="text-xl font-mono text-white">{selected.stats.day}</span>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
