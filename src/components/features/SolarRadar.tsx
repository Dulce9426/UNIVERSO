'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Compass, ChevronRight } from 'lucide-react';

const planets = [
  { 
    id: 'mercury', 
    name: 'Mercurio', 
    color: '#A5A5A5', 
    size: 'w-4 h-4', 
    orbit: 140, 
    speed: 30, 
    desc: 'El planeta más pequeño. Se encoge lentamente debido al enfriamiento de su núcleo.',
    stats: { temp: '430°C', day: '59 días' },
    texture: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Mercury_colorenhanced.png'
  },
  { 
    id: 'venus', 
    name: 'Venus', 
    color: '#E1C699', 
    size: 'w-6 h-6', 
    orbit: 200, 
    speed: 50, 
    desc: 'Un mundo infernal. Su atmósfera atrapa el calor haciéndolo más caliente que Mercurio.',
    stats: { temp: '462°C', day: '243 días' },
    texture: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Solar_System_Portal_Venus_Globe.jpg'
  },
  { 
    id: 'earth', 
    name: 'Tierra', 
    color: '#2B32B2', 
    size: 'w-6 h-6', 
    orbit: 280, 
    speed: 70, 
    desc: 'Nuestro hogar. El único lugar conocido con vida y océanos de agua líquida.',
    stats: { temp: '15°C', day: '24 horas' },
    texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Solarsystemscope_texture_8k_earth_daymap.jpg/1200px-Solarsystemscope_texture_8k_earth_daymap.jpg'
  },
  { 
    id: 'mars', 
    name: 'Marte', 
    color: '#C1440E', 
    size: 'w-5 h-5', 
    orbit: 360, 
    speed: 90, 
    desc: 'El planeta rojo. Objetivo principal de la humanidad para futuras colonias.',
    stats: { temp: '-60°C', day: '24h 37m' },
    texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1200px-OSIRIS_Mars_true_color.jpg'
  },
  { 
    id: 'jupiter', 
    name: 'Júpiter', 
    color: '#D8CA9D', 
    size: 'w-12 h-12', 
    orbit: 500, 
    speed: 150, 
    desc: 'El gigante gaseoso. Una estrella fallida que protege a la Tierra desviando asteroides.',
    stats: { temp: '-145°C', day: '9h 56m' },
    texture: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg'
  },
  { 
    id: 'saturn', 
    name: 'Saturno', 
    color: '#E4D5B6', 
    size: 'w-10 h-10', 
    orbit: 650, 
    speed: 200, 
    desc: 'La joya del sistema solar. Sus anillos son tan anchos como la distancia Tierra-Luna.',
    stats: { temp: '-178°C', day: '10h 42m' },
    texture: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg'
  }
];

export default function SolarRadar() {
  const [selected, setSelected] = useState<typeof planets[0] | null>(null);
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <div className="relative w-full h-[700px] bg-[#050505] overflow-hidden rounded-3xl border border-white/10 my-8 shadow-2xl shadow-cyan-900/20 flex">
      
      {/* === 1. MENÚ LATERAL (Control Seguro) === */}
      <div className="absolute left-0 top-0 bottom-0 w-64 bg-black/40 backdrop-blur-sm border-r border-white/10 z-40 p-6 flex flex-col gap-2">
        <h3 className="text-cyan-400 font-bold mb-4 tracking-widest text-sm uppercase">DATOS DE ORBITA</h3>
        {planets.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className={`text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-cyan-500/20 hover:text-white transition-all flex items-center justify-between group border ${
              selected?.id === p.id ? 'bg-cyan-500/20 text-white border-cyan-500/50' : 'border-transparent hover:border-cyan-500/50'
            }`}
          >
            <span className="font-medium">{p.name}</span>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      {/* === 2. RADAR CENTRAL === */}
      <div 
        className="flex-1 relative flex items-center justify-center ml-64"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Fondo Estrellado */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black -z-10" />
        
        {/* Sol */}
        <div className="absolute w-16 h-16 bg-yellow-500 rounded-full shadow-[0_0_80px_orange] z-10 animate-pulse" />

        {/* Órbitas y Planetas */}
        {planets.map((planet) => {
          const planetSize = planet.size.split(' ')[0] === 'w-4' ? 16 : planet.size.split(' ')[0] === 'w-5' ? 20 : planet.size.split(' ')[0] === 'w-6' ? 24 : planet.size.split(' ')[0] === 'w-10' ? 40 : 48;
          
          return (
            <div 
              key={planet.id} 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 flex items-center justify-center pointer-events-none"
              style={{ width: planet.orbit, height: planet.orbit }}
            >
              <motion.div
                className={`absolute rounded-full cursor-pointer shadow-[0_0_15px_currentColor] z-30 pointer-events-auto hover:scale-150 transition-transform`}
                style={{ 
                  backgroundColor: planet.color, 
                  width: planetSize, 
                  height: planetSize,
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
                animate={{ 
                  rotate: 360,
                }}
                transition={{ 
                  duration: isHovered ? planet.speed * 2 : planet.speed, // Ralentiza al pasar el mouse
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                onClick={() => setSelected(planet)}
              />
            </div>
          );
        })}
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

            {/* Planeta Giratorio Falso 3D */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 flex-shrink-0 rounded-full shadow-[inset_-30px_-20px_60px_rgba(0,0,0,0.9)] overflow-hidden border border-white/10">
              <div 
                className="w-full h-full rounded-full"
                style={{
                  backgroundImage: `url(${selected.texture})`,
                  backgroundSize: 'cover',
                  backgroundColor: selected.color,
                  animation: 'spin-planet 30s linear infinite',
                }}
              />
              {/* Sombra interna extra para realismo */}
              <div className="absolute inset-0 rounded-full shadow-[inset_10px_10px_40px_rgba(255,255,255,0.1)] pointer-events-none" />
            </div>

            {/* Panel de Texto */}
            <div className="max-w-md text-white">
              <h2 className="text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                {selected.name}
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
