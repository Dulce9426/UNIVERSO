'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';

const planets = [
  { id: 'mercury', name: 'Mercurio', color: 'bg-stone-400', size: 'w-3 h-3', orbit: 140, speed: 4, fact: 'Se encoge cada día más.' },
  { id: 'venus', name: 'Venus', color: 'bg-yellow-200', size: 'w-5 h-5', orbit: 200, speed: 10, fact: 'Su día es más largo que su año.' },
  { id: 'earth', name: 'Tierra', color: 'bg-blue-500', size: 'w-5 h-5', orbit: 280, speed: 15, fact: 'El único con agua líquida visible.' },
  { id: 'mars', name: 'Marte', color: 'bg-red-500', size: 'w-4 h-4', orbit: 360, speed: 20, fact: 'Tiene el volcán más grande del sistema.' },
  { id: 'jupiter', name: 'Júpiter', color: 'bg-orange-400', size: 'w-10 h-10', orbit: 500, speed: 35, fact: 'Protege a la Tierra de asteroides.' },
  { id: 'saturn', name: 'Saturno', color: 'bg-amber-300', size: 'w-8 h-8', orbit: 650, speed: 45, fact: 'Sus anillos son hielo y roca.' }
];

export default function SolarRadar() {
  const [selected, setSelected] = useState(planets[2]); // Empieza en Tierra

  return (
    <div className="relative w-full h-[600px] bg-black overflow-hidden flex items-center justify-center rounded-3xl border border-white/10 my-8 shadow-2xl shadow-cyan-900/20">
      {/* Panel de Datos (Flotante) */}
      <div className="absolute top-4 right-4 z-20 w-64 bg-black/80 backdrop-blur-md border border-cyan-500/30 p-4 rounded-xl">
        <h3 className="text-xl font-bold text-cyan-400">{selected.name}</h3>
        <p className="text-xs text-gray-400 mt-1">ORBITANDO AL SOL</p>
        <p className="text-sm text-gray-200 mt-3">{selected.fact}</p>
      </div>

      {/* Contenedor centrado para el sistema solar */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* El Sol */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-yellow-500 rounded-full shadow-[0_0_50px_orange] z-10" />

        {/* Órbitas y Planetas */}
        {planets.map((planet) => (
          <motion.div
            key={planet.id}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
            style={{ 
              width: `${planet.orbit}px`, 
              height: `${planet.orbit}px`,
            }}
            animate={{ 
              rotate: 360,
            }}
            transition={{ duration: planet.speed, repeat: Infinity, ease: "linear" }}
          >
            <div
              className={`absolute top-0 left-1/2 -translate-x-1/2 ${planet.size} ${planet.color} rounded-full cursor-pointer shadow-[0_0_10px_currentColor] hover:scale-150 transition-transform z-10`}
              onClick={() => setSelected(planet)}
            />
          </motion.div>
        ))}
      </div>
      
      <div className="absolute bottom-4 left-4 text-xs text-white/30">RADAR TÁCTICO V1.0</div>
    </div>
  );
}
