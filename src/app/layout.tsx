import type { Metadata } from "next"
import { Inter, Fraunces } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CartDrawer from "@/components/CartDrawer"
import Loader from "@/components/Loader"
import { CartProvider } from "@/context/CartContext"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
})

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

export const metadata: Metadata = {
  title: {
    default: "Karven | Mobiliario Médico",
    template: "%s | Karven",
  },
  description:
    "Karven diseña y suministra mobiliario médico y clínico de alto nivel en Panamá: camillas, mesas quirúrgicas, unidades odontológicas, mobiliario de consultorio y laboratorio.",
  keywords: [
    "mobiliario médico", "muebles médicos", "camillas", "mesas quirúrgicas",
    "unidades odontológicas", "equipamiento clínico", "Panamá", "Karven",
  ],
  icons: {
    icon: [
      { url: "/images/logo-isotipo-oscuro.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logo-isotipo-oscuro.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/images/logo-isotipo-oscuro.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Karven | Mobiliario Médico",
    description: "Mobiliario médico y clínico de alto nivel en Panamá. Diseño, suministro e instalación.",
    type: "website",
    locale: "es_PA",
    siteName: "Karven Medical Furniture",
    images: [{ url: "/images/logo-imagotipo-blanco.png", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(SITE_URL),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${inter.variable} ${fraunces.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-paper text-text antialiased">
        <CartProvider>
          <Loader />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
