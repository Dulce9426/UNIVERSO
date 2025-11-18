import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/navbar"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Cosmos Truth - Astronomía y Análisis Científico",
  description: "Plataforma educativa sobre astronomía y teorías de conspiración. Datos científicos y análisis en un entorno visual inmersivo.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-cosmos-deep text-cosmos-starlight-white`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}

