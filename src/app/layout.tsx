import type { Metadata } from "next"
import { Inter, Inter_Tight, Geist_Mono } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CartDrawer from "@/components/CartDrawer"
import Loader from "@/components/Loader"
import { CartProvider } from "@/context/CartContext"
import { CategoriesProvider } from "@/context/CategoriesContext"
import { THEME_BOOT_SCRIPT, DEFAULT_THEME } from "@/lib/theme"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap", weight: ["500", "600", "700"] })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap", weight: ["400", "500"] })

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

export const metadata: Metadata = {
  title: {
    default: "Karven | Mobiliario Médico",
    template: "%s | Karven",
  },
  description:
    "Karven fabrica mobiliario médico y clínico en acero inoxidable en Panamá: camillas, mesas quirúrgicas, carros clínicos, lavamanos quirúrgicos, mobiliario de consultorio y laboratorio.",
  keywords: [
    "mobiliario médico", "muebles médicos", "camillas", "mesas quirúrgicas",
    "acero inoxidable", "equipamiento clínico", "Panamá", "Karven",
  ],
  icons: {
    icon: [
      { url: "/images/logo-isotipo-blanco.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logo-isotipo-blanco.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/images/logo-isotipo-blanco.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Karven | Mobiliario Médico",
    description: "Mobiliario clínico en acero inoxidable, fabricado en Panamá. Diseño, fabricación e instalación.",
    type: "website",
    locale: "es_PA",
    siteName: "Karven Medical Furniture",
    images: [{ url: "/images/logo-imagotipo-blanco.png", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(SITE_URL),
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-theme={DEFAULT_THEME} data-scroll-behavior="smooth" suppressHydrationWarning className={`${inter.variable} ${interTight.variable} ${geistMono.variable} h-full`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-text antialiased">
        <CartProvider>
        <CategoriesProvider>
          <Loader />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CategoriesProvider>
        </CartProvider>
      </body>
    </html>
  )
}
