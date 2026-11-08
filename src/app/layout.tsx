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
    default: "Mobiliario Médico y Veterinario en Panamá | KARVEN Medical",
    template: "%s | Karven Medical",
  },
  applicationName: "Karven Medical",
  description:
    "Karven Medical fabrica mobiliario médico, veterinario y técnico en acero inoxidable en Panamá: camillas, sillones, mesas, carros hospitalarios, lavamanos, mesas y jaulas veterinarias, mesones y gabinetes a medida.",
  keywords: [
    "mobiliario médico", "mobiliario veterinario", "mobiliario técnico", "muebles médicos", "camillas",
    "acero inoxidable", "equipamiento clínico", "fabricación a medida", "Panamá", "Karven Medical",
  ],
  icons: {
    icon: [
      { url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/images/favicon-180.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Mobiliario Médico y Veterinario en Panamá | KARVEN Medical",
    description: "Mobiliario médico, veterinario y técnico en acero inoxidable, fabricado en Panamá. Diseño, fabricación a medida e instalación.",
    type: "website",
    locale: "es_PA",
    siteName: "Karven Medical",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Karven Medical" }],
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
