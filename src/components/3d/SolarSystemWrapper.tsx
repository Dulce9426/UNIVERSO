'use client'

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Wrapper Client Component para cargar el Sistema Solar dinámicamente
const SolarSystem = dynamic(() => import("./SolarSystem"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-cosmos-deep" />
})

export default function SolarSystemWrapper() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="fixed inset-0 -z-10 bg-cosmos-deep" />
  }

  return <SolarSystem />
}

