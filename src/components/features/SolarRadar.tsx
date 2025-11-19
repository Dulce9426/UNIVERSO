'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Compass } from 'lucide-react';

// Datos con texturas planas para simular 3D
const planets = [
  { 
    id: 'mercury', 
    name: 'Mercurio', 
    color: '#A5A5A5', 
    size: 'w-4 h-4', 
    orbit: 140, 
    speed: 4, 
    desc: 'El planeta más pequeño y cercano al Sol. Se está encogiendo lentamente debido al enfriamiento de su núcleo.',
    stats: { temp: '430°C', day: '59 días terrestres' },
    texture: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Mercury_colorenhanced.png'
  },
  { 
    id: 'venus', 
    name: 'Venus', 
    color: '#E1C699', 
    size: 'w-6 h-6', 
    orbit: 200, 
    speed: 10, 
    desc: 'Un mundo infernal con efecto invernadero descontrolado. Su rotación es retrógrada (gira al revés).',
    stats: { temp: '462°C', day: '243 días terrestres' },
    texture: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Solar_System_Portal_Venus_Globe.jpg'
  },
  { 
    id: 'earth', 
    name: 'Tierra', 
    color: '#2B32B2', 
    size: 'w-6 h-6', 
    orbit: 280, 
    speed: 15, 
    desc: 'Nuestro hogar. El único lugar conocido con vida y agua líquida estable en la superficie.',
    stats: { temp: '15°C', day: '24 horas' },
    texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Solarsystemscope_texture_8k_earth_daymap.jpg/1200px-Solarsystemscope_texture_8k_earth_daymap.jpg'
  },
  { 
    id: 'mars', 
    name: 'Marte', 
    color: '#C1440E', 
    size: 'w-5 h-5', 
    orbit: 360, 
    speed: 20, 
    desc: 'El planeta rojo. Tiene el volcán más grande del sistema solar (Monte Olimpo). Objetivo principal de colonización.',
    stats: { temp: '-60°C', day: '24h 37m' },
    texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1200px-OSIRIS_Mars_true_color.jpg'
  },
  { 
    id: 'jupiter', 
    name: 'Júpiter', 
    color: '#D8CA9D', 
    size: 'w-12 h-12', 
    orbit: 500, 
    speed: 35, 
    desc: 'El gigante gaseoso. Su masa es 2.5 veces la de todos los demás planetas juntos. Escudo de asteroides de la Tierra.',
    stats: { temp: '-145°C', day: '9h 56m' },
    texture: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg'
  },
  { 
    id: 'saturn', 
    name: 'Saturno', 
    color: '#E4D5B6', 
    size: 'w-10 h-10', 
    orbit: 650, 
    speed: 45, 
    desc: 'Famoso por su complejo sistema de anillos hechos de hielo y roca. Podría flotar en una piscina gigante de agua.',
    stats: { temp: '-178°C', day: '10h 42m' },
    texture: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg'
  }
];

export default function SolarRadar() {
  const [selected, setSelected] = useState<any>(null);

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
    <div className="relative w-full h-[700px] bg-[#050505] overflow-hidden flex items-center justify-center rounded-3xl border border-white/10 my-8 shadow-2xl shadow-cyan-900/20 group">
      
      {/* Fondo decorativo estático */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black -z-10" />

      {/* === VISTA RADAR (Cuando no hay selección) === */}
      <div className={`transition-all duration-700 ${selected ? 'scale-50 opacity-0 pointer-events-none blur-sm' : 'scale-100 opacity-100'}`}>
        {/* Sol Central */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-yellow-500 rounded-full shadow-[0_0_60px_orange] z-20 animate-pulse" />

        {/* Órbitas y Planetas */}
        {planets.map((planet) => {
          const planetSize = planet.size.split(' ')[0] === 'w-4' ? 16 : planet.size.split(' ')[0] === 'w-5' ? 20 : planet.size.split(' ')[0] === 'w-6' ? 24 : planet.size.split(' ')[0] === 'w-10' ? 40 : 48;
          
          return (
            <motion.div
              key={planet.id}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
              style={{ 
                width: planet.orbit, 
                height: planet.orbit 
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: planet.speed, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="absolute rounded-full cursor-pointer shadow-[0_0_15px_currentColor] hover:scale-150 transition-transform z-30"
                style={{ 
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: planet.color, 
                  width: planetSize, 
                  height: planetSize 
                }}
                onClick={() => setSelected(planet)}
              >
                {/* Tooltip pequeño al pasar mouse */}
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] text-white bg-black/50 px-2 py-1 rounded border border-white/20 pointer-events-none whitespace-nowrap">
                  {planet.name}
                </div>
              </div>
            </motion.div>
          );
        })}
        <div className="absolute bottom-6 left-6 text-xs text-cyan-500/50 font-mono tracking-widest">
          SISTEMA DE RASTREO ACTIVO /// SELECCIONE UN OBJETIVO
        </div>
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
                  backgroundColor: selected.color,
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
                  {selected.name}
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
