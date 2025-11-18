'use client'

import dynamic from 'next/dynamic'

const SolarSystemWrapper = dynamic(() => import('./SolarSystemWrapper'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-[#0a0a0a]" />
})

export default function SceneLoader() {
  return <SolarSystemWrapper />
}

