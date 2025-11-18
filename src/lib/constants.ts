export const SITE_CONFIG = {
  name: "Cosmos Truth",
  description: "Plataforma educativa sobre astronomía y teorías de conspiración",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const

export const NAV_ROUTES = [
  { href: "/", label: "Inicio" },
  { href: "/radar", label: "Radar" },
  { href: "/bitacora", label: "Bitácora" },
  { href: "/comunidad", label: "Comunidad" },
] as const

