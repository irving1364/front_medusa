import type { Metadata } from "next"
import { Inter, Inter_Tight, Geist_Mono } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CartDrawer from "@/components/CartDrawer"
import Loader from "@/components/Loader"
import { CartProvider } from "@/context/CartContext"
import { CategoriesProvider } from "@/context/CategoriesContext"
import WhatsAppButton from "@/components/WhatsAppButton"
import { THEME_BOOT_SCRIPT, DEFAULT_THEME } from "@/lib/theme"
import { SITE_URL } from "@/lib/medusa-server"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap", weight: ["500", "600", "700"] })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap", weight: ["400", "500"] })


export const metadata: Metadata = {
  title: {
    default: "Mobiliario Médico y Veterinario en Panamá | KARVEN Medical",
    template: "%s | KARVEN Medical",
  },
  applicationName: "Karven Medical",
  description:
    "KARVEN Medical desarrolla y fabrica mobiliario médico, veterinario y técnico en Panamá. Productos propios, soluciones a medida y respaldo local por FABMETAL.",
  alternates: { canonical: "./" },
  icons: {
    icon: [
      { url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/images/favicon-180.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Mobiliario Médico y Veterinario en Panamá | KARVEN Medical",
    description: "Desarrollo y fabricación de mobiliario médico, veterinario y técnico en Panamá. Productos propios y respaldo local.",
    type: "website",
    locale: "es_PA",
    siteName: "KARVEN Medical",
    url: "/",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "KARVEN Medical" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  metadataBase: new URL(SITE_URL),
}

/** Site-wide structured data: WebSite + Organization + LocalBusiness, linked by @id (see HOME SEO brief). */
const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "KARVEN Medical",
      alternateName: "KARVEN",
      url: `${SITE_URL}/`,
      inLanguage: "es-PA",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "KARVEN Medical",
      url: `${SITE_URL}/`,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo-compacta-color.png` },
      image: `${SITE_URL}/images/og-image.png`,
      description: "Desarrollo, fabricación, adaptación y respaldo de mobiliario médico, veterinario y técnico para entornos sanitarios en Panamá.",
      email: "contact@karvenmedical.com",
      telephone: "+50766622199",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Calle Hato Azul, casa N.º 43, La Cabima, Alcalde Díaz",
        addressLocality: "Ciudad de Panamá",
        addressCountry: "PA",
      },
      slogan: "Existimos para sostener a quienes cuidan.",
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "KARVEN Medical",
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      url: `${SITE_URL}/contacto`,
      image: `${SITE_URL}/images/og-image.png`,
      telephone: "+50766622199",
      email: "contact@karvenmedical.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Calle Hato Azul, casa N.º 43, La Cabima, Alcalde Díaz",
        addressLocality: "Ciudad de Panamá",
        addressCountry: "PA",
      },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" },
      ],
      areaServed: { "@type": "Country", name: "Panamá" },
    },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-PA" data-theme={DEFAULT_THEME} data-scroll-behavior="smooth" suppressHydrationWarning className={`${inter.variable} ${interTight.variable} ${geistMono.variable} h-full`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-text antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }} />
        <CartProvider>
        <CategoriesProvider>
          <Loader />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
        </CategoriesProvider>
        </CartProvider>
      </body>
    </html>
  )
}
