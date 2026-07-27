import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
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

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Karven | Inmobiliaria Médica Premium",
    template: "%s | Karven",
  },
  description:
    "Descubra propiedades médicas premium. Karven es líder en bienes raíces para el sector salud en Panamá, ofreciendo consultorios, clínicas y espacios médicos de primer nivel.",
  keywords: [
    "inmobiliaria médica", "bienes raíces médicos", "consultorios médicos",
    "Panamá", "espacios clínicos", "propiedades médicas",
  ],
  icons: {
    icon: [
      { url: "/images/logo-isotipo-blanco.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logo-isotipo-blanco.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/images/logo-isotipo-blanco.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Karven | Inmobiliaria Médica Premium",
    description: "Descubra propiedades médicas premium en Panamá. Espacios diseñados para el sector salud.",
    type: "website",
    locale: "es_PA",
    siteName: "Karven",
    images: [{ url: "/images/logo-imagotipo-blanco.png", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-dark-base text-text-primary antialiased">
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
