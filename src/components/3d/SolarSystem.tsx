'use client'

import { useRef, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars, Html, useCursor } from "@react-three/drei"
import * as THREE from "three"

// Datos de los planetas
const PLANETS = [
  { name: "Mercurio", color: "#8c7853", distance: 5, size: 0.35, speed: 1.6 },
  { name: "Venus", color: "#ffc649", distance: 7, size: 0.6, speed: 1.2 },
  { name: "Tierra", color: "#4a90e2", distance: 9, size: 0.65, speed: 1.0 },
  { name: "Marte", color: "#ff6b6b", distance: 11, size: 0.45, speed: 0.8 },
  { name: "Júpiter", color: "#d8ca9d", distance: 14, size: 1.2, speed: 0.4 },
  { name: "Saturno", color: "#fad5a5", distance: 17, size: 1.0, speed: 0.35 },
  { name: "Urano", color: "#4fd0e7", distance: 20, size: 0.8, speed: 0.25 },
  { name: "Neptuno", color: "#4166f5", distance: 23, size: 0.75, speed: 0.2 },
]

// Componente del Sol
function Sun() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial color="#ffb347" />
      </mesh>
      <pointLight intensity={4} distance={120} decay={2} color="#ffd966" />
    </group>
  )
}

// Componente de órbita (Ecliptic) - línea circular delgada
interface EclipticProps {
  radius: number
}

function Ecliptic({ radius }: EclipticProps) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const segments = 128
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius))
    }
    return pts
  }, [radius])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    return geo
  }, [points])

  return (
    <lineLoop rotation={[Math.PI / 2, 0, 0]}>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial color="#22d3ee" transparent opacity={0.3} />
    </lineLoop>
  )
}

// Componente de Planeta
interface PlanetProps {
  name: string
  color: string
  distance: number
  size: number
  speed: number
}

function Planet({ name, color, distance, size, speed }: PlanetProps) {
  const planetRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  // Cambiar cursor a pointer en hover
  useCursor(hovered, "pointer")

  // Animación suave de órbita usando useFrame
  useFrame(({ clock }) => {
    if (planetRef.current) {
      const time = clock.getElapsedTime() * speed
      planetRef.current.position.x = Math.cos(time) * distance
      planetRef.current.position.z = Math.sin(time) * distance
    }
  })

  return (
    <group>
      <mesh
        ref={planetRef}
        position={[distance, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.4} />

        {/* Anillo para Saturno */}
        {name === "Saturno" && (
          <mesh rotation={[Math.PI / 2.8, 0, 0]}>
            <ringGeometry args={[size * 1.4, size * 2, 64]} />
            <meshBasicMaterial 
              color="#fad5a5" 
              opacity={0.6} 
              transparent 
              side={THREE.DoubleSide} 
            />
          </mesh>
        )}

        {/* Etiqueta flotante con Html */}
        <Html
          position={[0, size + 0.6, 0]}
          center
          style={{
            color: "#d1d5db",
            fontSize: "0.75rem",
            fontFamily: "Inter, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            pointerEvents: "none",
          }}
        >
          {name}
        </Html>
      </mesh>
    </group>
  )
}

// Componente principal del Sistema Solar
export default function SolarSystem() {
  return (
    <div 
      className="fixed inset-0 -z-10" 
      style={{ 
        width: '100vw', 
        height: '100vh',
        top: 0,
        left: 0,
        position: 'fixed'
      }}
    >
      <Canvas
        camera={{ position: [0, 20, 32], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: false,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        {/* Fondo negro profundo */}
        <color attach="background" args={["#030712"]} />
        
        {/* Estrellas de fondo */}
        <Stars
          radius={400}
          depth={80}
          count={3000}
          factor={8}
          saturation={0}
          fade
          speed={1}
        />

        {/* Iluminación ambiente mínima */}
        <ambientLight intensity={0.1} />

        {/* Sol en el centro */}
        <Sun />

        {/* Planetas con sus órbitas */}
        {PLANETS.map((planet) => (
          <group key={planet.name}>
            {/* Órbita (Ecliptic) - línea circular neón */}
            <Ecliptic radius={planet.distance} />
            {/* Planeta */}
            <Planet {...planet} />
          </group>
        ))}

        {/* Controles de órbita - zoom y rotación habilitados */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={10}
          maxDistance={60}
        />
      </Canvas>
    </div>
  )
}
