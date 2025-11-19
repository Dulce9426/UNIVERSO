'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Compass, ChevronRight } from 'lucide-react';

const planets = [
  { 
    id: 'mercury', 
    name: 'MERCURY',
    displayName: 'Mercurio', 
    orbitColor: '#a78bfa', // purple
    planetColor: '#c4b5fd', 
    size: 6, 
    orbit: 80, 
    speed: 30, 
    desc: 'El planeta más pequeño y cercano al Sol. Se encoge lentamente debido al enfriamiento de su núcleo, generando "arrugas" en su superficie.',
    stats: { temp: '430°C', day: '59 días' },
    texture: 'https://www.solarsystemscope.com/textures/download/8k_mercury.jpg',
    fact: 'Se encoge cada día más.'
  },
  { 
    id: 'venus', 
    name: 'VENUS',
    displayName: 'Venus', 
    orbitColor: '#60a5fa', // blue
    planetColor: '#fdba74', 
    size: 8, 
    orbit: 120, 
    speed: 50, 
    desc: 'Un mundo infernal con un efecto invernadero descontrolado. Su densa atmósfera de dióxido de carbono oculta su superficie volcánica.',
    stats: { temp: '462°C', day: '243 días' },
    texture: 'https://www.solarsystemscope.com/textures/download/8k_venus_surface.jpg',
    fact: 'Su día es más largo que su año.'
  },
  { 
    id: 'earth', 
    name: 'EARTH',
    displayName: 'Tierra', 
    orbitColor: '#60a5fa', // light blue
    planetColor: '#93c5fd', 
    size: 8, 
    orbit: 160, 
    speed: 70, 
    desc: 'Nuestro hogar. El único lugar conocido con vida y océanos de agua líquida estables en la superficie.',
    stats: { temp: '15°C', day: '24 horas' },
    texture: 'https://www.solarsystemscope.com/textures/download/8k_earth_daymap.jpg',
    fact: 'El único con agua líquida visible.'
  },
  { 
    id: 'mars', 
    name: 'MARS',
    displayName: 'Marte', 
    orbitColor: '#fb923c', // orange
    planetColor: '#fdba74', 
    size: 7, 
    orbit: 200, 
    speed: 90, 
    desc: 'El planeta rojo. Tiene el volcán más grande del sistema solar (Monte Olimpo) y vastos cañones. Objetivo principal para futuras colonias.',
    stats: { temp: '-60°C', day: '24h 37m' },
    texture: 'https://www.solarsystemscope.com/textures/download/8k_mars.jpg',
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
    speed: 150, 
    desc: 'El gigante gaseoso. Su masa es 2.5 veces la de todos los demás planetas juntos. Actúa como un "escudo" para la Tierra desviando asteroides.',
    stats: { temp: '-145°C', day: '9h 56m' },
    texture: 'https://www.solarsystemscope.com/textures/download/8k_jupiter.jpg',
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
    speed: 200, 
    desc: 'La joya del sistema solar, famoso por su complejo sistema de anillos hechos de hielo y roca. Podría flotar en una piscina gigante de agua.',
    stats: { temp: '-178°C', day: '10h 42m' },
    texture: 'https://www.solarsystemscope.com/textures/download/8k_saturn.jpg',
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
  const [isHovered, setIsHovered] = useState(false);
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

  // Inyectar animación CSS mejorada para la rotación del planeta
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
        to { background-position: 100% center; }
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
    <div className="relative w-full h-[600px] bg-black overflow-hidden rounded-lg border border-white/10 my-8 flex">
      
      {/* === 1. MENÚ LATERAL (Control Seguro) === */}
      <div className="absolute left-0 top-0 bottom-0 w-64 bg-black/40 backdrop-blur-sm border-r border-white/10 z-40 p-6 flex flex-col gap-2">
        <h3 className="text-cyan-400 font-bold mb-4 tracking-widest text-sm uppercase font-mono">DATOS DE ORBITA</h3>
        {planets.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className={`text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-cyan-500/20 hover:text-white transition-all flex items-center justify-between group border ${
              selected?.id === p.id ? 'bg-cyan-500/20 text-white border-cyan-500/50' : 'border-transparent hover:border-cyan-500/50'
            }`}
          >
            <span className="font-medium">{p.displayName}</span>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      {/* === 2. RADAR CENTRAL (Estilo NASA Eyes) === */}
      <div 
        className="flex-1 relative flex items-center justify-center ml-64"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
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
                transition={{ 
                  duration: isHovered ? planet.speed * 2 : planet.speed,
                  repeat: Infinity, 
                  ease: "linear" 
                }}
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
                    className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap pointer-events-none"
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
      </div>

      {/* Panel de información superior derecha (Estilo NASA Eyes) */}
      {selected && (
        <div className="absolute top-4 right-4 z-20 w-64 bg-black/80 backdrop-blur-md border border-cyan-500/30 p-4 rounded-xl">
          <h3 className="text-xl font-bold text-cyan-400 font-mono uppercase">{selected.name}</h3>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">ORBITANDO AL SOL</p>
          <p className="text-sm text-gray-200 mt-3">{selected.fact}</p>
        </div>
      )}

      {/* Panel de información inferior (Estilo NASA Eyes) */}
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

      {/* === 3. MODAL DE INFORMACIÓN (ZOOM) === */}
      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col md:flex-row items-center justify-center gap-12 p-8"
          >
            <button 
              onClick={() => setSelected(null)} 
              className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Planeta Giratorio Falso 3D Mejorado */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 flex-shrink-0">
              {/* Efecto especial para Tierra: Atmósfera/Halo */}
              {selected.id === 'earth' && (
                <div 
                  className="absolute inset-0 rounded-full blur-3xl scale-125 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)',
                  }}
                />
              )}
              
              {/* Contenedor del planeta */}
              <div className="relative w-full h-full rounded-full shadow-[inset_-30px_-20px_60px_rgba(0,0,0,0.9)] overflow-hidden border border-white/10">
                <div 
                  className="w-full h-full rounded-full"
                  style={{
                    backgroundImage: `url(${selected.texture})`,
                    backgroundSize: '200% auto',
                    backgroundPosition: '0% center',
                    backgroundColor: selected.planetColor,
                    animation: 'spin-planet 30s linear infinite',
                  }}
                />
                {/* Sombra interna mejorada para realismo */}
                <div className="absolute inset-0 rounded-full shadow-[inset_10px_10px_40px_rgba(0,0,0,0.4),_0_0_40px_rgba(0,150,255,0.1)] pointer-events-none" />
              </div>

              {/* Efecto de anillo atmosférico para Tierra (similar a Saturno) */}
              {selected.id === 'earth' && (
                <div className="absolute inset-0 rounded-full pointer-events-none" style={{ transform: 'scale(1.15)' }}>
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-400/40"
                    style={{
                      width: '100%',
                      height: '60%',
                      boxShadow: '0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.2)',
                    }}
                  />
                </div>
              )}

              {/* Brillo atmosférico adicional para Tierra */}
              {selected.id === 'earth' && (
                <div className="absolute inset-0 rounded-full pointer-events-none">
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      width: '110%',
                      height: '110%',
                      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                    }}
                  />
                </div>
              )}
            </div>

            {/* Panel de Texto */}
            <div className="max-w-md text-white">
              <h2 className="text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                {selected.displayName}
              </h2>
              <div className="h-1 w-24 bg-cyan-500 mb-6 rounded-full" />
              
              <p className="text-xl text-gray-300 leading-relaxed mb-8 font-light border-l-4 border-cyan-900 pl-4">
                {selected.desc}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-widest text-cyan-400 mb-1">Temperatura</div>
                  <div className="text-2xl font-mono">{selected.stats.temp}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-widest text-purple-400 mb-1">Rotación</div>
                  <div className="text-2xl font-mono">{selected.stats.day}</div>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
