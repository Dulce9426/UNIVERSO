'use client'

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

// Componente del Sol
function Sun() {
  return (
    <mesh>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color="#ffaa00"
        emissive="#ff6600"
        emissiveIntensity={0.5}
      />
      <pointLight intensity={2} distance={50} decay={2} />
    </mesh>
  )
}

// Componente de un planeta
interface PlanetProps {
  distance: number
  speed: number
  color: string
  size: number
  name: string
}

function Planet({ distance, speed, color, size }: PlanetProps) {
  const planetRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (planetRef.current) {
      const time = clock.getElapsedTime() * speed
      planetRef.current.position.x = Math.cos(time) * distance
      planetRef.current.position.z = Math.sin(time) * distance
    }
  })

  return (
    <mesh ref={planetRef} position={[distance, 0, 0]}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
      {/* Órbita visual */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance - 0.1, distance + 0.1, 64]} />
        <meshBasicMaterial
          color={color}
          opacity={0.1}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </mesh>
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
        camera={{ position: [0, 15, 25], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: false,
          powerPreference: "high-performance"
        }}
        style={{ 
          width: '100%', 
          height: '100%',
          display: 'block'
        }}
        dpr={[1, 2]}
      >
        {/* Fondo estrellado */}
        <Stars
          radius={300}
          depth={60}
          count={2000}
          factor={7}
          saturation={0.5}
          fade
        />

        {/* Iluminación */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />

        {/* Sol */}
        <Sun />

        {/* Planetas orbitando */}
        <Planet
          distance={8}
          speed={0.5}
          color="#4a90e2"
          size={0.8}
          name="Tierra"
        />
        <Planet
          distance={12}
          speed={0.3}
          color="#ff6b6b"
          size={0.6}
          name="Marte"
        />
        <Planet
          distance={16}
          speed={0.2}
          color="#9b59b6"
          size={1.2}
          name="Júpiter"
        />

        {/* Controles de órbita */}
        <OrbitControls
          enableZoom={true}
          minDistance={15}
          maxDistance={50}
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  )
}

