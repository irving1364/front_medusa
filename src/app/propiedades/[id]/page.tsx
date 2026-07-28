"use client"

import { useEffect, useState } from "react"
import { useParams, notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { FiMapPin, FiMaximize2, FiGrid, FiDroplet, FiArrowLeft, FiShare2, FiHeart, FiCheck, FiCalendar, FiTag, FiShoppingBag } from "react-icons/fi"
import { getProductByHandle, mapMedusaProductToProperty, type MedusaProduct as MedusaProductData } from "@/lib/medusa"
import { getFallbackByHandle } from "@/lib/fallback-properties"
import { useCart } from "@/context/CartContext"
import type { Property } from "@/types"

export default function PropertyDetailPage() {
  const params = useParams()
  const handle = params.id as string
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem, isLoading: cartLoading } = useCart()

  const [medusaProduct, setMedusaProduct] = useState<MedusaProductData | null>(null)

  const handleAddToCart = async () => {
    if (!property) return

    // Always fetch the latest variant ID from Medusa to avoid stale state issues
    let variantId = property.variantId
    if (!variantId && medusaProduct) {
      variantId = medusaProduct.variants[0]?.id || null
    }
    if (!variantId) {
      // Try fetching the Medusa product directly
      const freshProduct = await getProductByHandle(handle)
      if (freshProduct) {
        variantId = freshProduct.variants[0]?.id || null
      }
    }

    if (variantId) {
      await addItem(variantId, 1)
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 3000)
    } else {
      // No variant ID available (fallback data) - notify user
      alert("Esta propiedad no está disponible para agregar al carrito. Por favor, solicite información a través del formulario de contacto.")
    }
  }

  useEffect(() => {
    async function fetchProperty() {
      try {
        const product = await getProductByHandle(handle)
        if (product) {
          setMedusaProduct(product)
          setProperty(mapMedusaProductToProperty(product))
        } else {
          setMedusaProduct(null)
          const fallback = getFallbackByHandle(handle)
          setProperty(fallback || null)
        }
      } catch {
        setMedusaProduct(null)
        const fallback = getFallbackByHandle(handle)
        setProperty(fallback || null)
      } finally {
        setLoading(false)
      }
    }
    fetchProperty()
  }, [handle])

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-dark-base">
        <div className="container-custom px-4 sm:px-6 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-dark-border rounded w-48" />
            <div className="aspect-[21/9] bg-dark-border rounded-2xl" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-8 bg-dark-border rounded w-3/4" /><div className="h-4 bg-dark-border rounded w-1/2" /><div className="h-32 bg-dark-border rounded" />
              </div>
              <div className="h-64 bg-dark-border rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!property) notFound()

  const allImages = property.images.length > 0
    ? property.images
    : property.thumbnail
    ? [{ id: "thumb", url: property.thumbnail }]
    : []

  // ── JSON-LD Structured Data for SEO ────────────────────────────
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: property.title,
        description: property.description || property.subtitle || property.title,
        image: allImages.map((img) => img.url),
        sku: property.id,
        brand: {
          "@type": "Brand",
          name: "Karven",
        },
        offers: {
          "@type": "Offer",
          price: property.price,
          priceCurrency: property.currencyCode || "PAB",
          availability: "https://schema.org/InStock",
          url: typeof window !== "undefined" ? window.location.href : "",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: typeof window !== "undefined" ? window.location.origin : "",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Propiedades",
            item:
              typeof window !== "undefined"
                ? `${window.location.origin}/propiedades`
                : "",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: property.title,
          },
        ],
      },
    ],
  }

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <div className="pt-20 min-h-screen bg-dark-base">
        <div className="border-b border-dark-border">
          <div className="container-custom px-4 sm:px-6 py-4">
            <Link href="/propiedades" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-ivory-light transition-colors">
              <FiArrowLeft className="w-4 h-4" /> Volver a propiedades
            </Link>
          </div>
        </div>

      <div className="container-custom px-4 sm:px-6 py-8">
        {/* Gallery */}
        <div className="relative overflow-hidden rounded-2xl bg-dark-elevated border border-dark-border mb-8">
          <div className="aspect-[21/9] relative">
            {allImages[0] ? (
              <Image src={allImages[0].url} alt={property.title} fill className="object-cover" sizes="100vw" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-dark-elevated to-dark-surface flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl font-serif text-ivory/20 mb-4">{property.title.charAt(0)}</div>
                  <p className="text-text-muted text-sm">Imagen no disponible</p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-base/60 via-transparent to-transparent" />
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="p-2.5 rounded-lg bg-dark-base/60 backdrop-blur-sm border border-dark-border text-text-secondary hover:text-ivory-light hover:border-ivory/30 transition-all"><FiShare2 className="w-4 h-4" /></button>
              <button className="p-2.5 rounded-lg bg-dark-base/60 backdrop-blur-sm border border-dark-border text-text-secondary hover:text-error hover:border-error/30 transition-all"><FiHeart className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Details */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider ${
                  property.status === "disponible" ? "bg-success/20 text-success border border-success/30" :
                  property.status === "vendido" ? "bg-error/20 text-error border border-error/30" :
                  "bg-warning/20 text-warning border border-warning/30"
                }`}>{property.status}</span>
                {property.type && <span className="px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider bg-ivory-glow/10 text-ivory-light border border-ivory/20">{property.type}</span>}
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary mb-2">{property.title}</h1>
              {property.subtitle && <p className="text-lg text-text-secondary">{property.subtitle}</p>}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {property.location && <FeatureBox icon={FiMapPin} label="Ubicaci\u00f3n" value={property.location} />}
              {property.area && <FeatureBox icon={FiMaximize2} label="\u00c1rea" value={`${property.area} m\u00b2`} />}
              {property.bedrooms != null && <FeatureBox icon={FiGrid} label="Consultorios" value={String(property.bedrooms)} />}
              {property.bathrooms != null && <FeatureBox icon={FiDroplet} label="Baños" value={String(property.bathrooms)} />}
            </div>

            {property.description && (
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-4">Descripci&oacute;n</h2>
                <p className="text-text-secondary leading-relaxed">{property.description}</p>
              </div>
            )}

            {property.features.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-4">Caracter&iacute;sticas</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {property.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 text-text-secondary">
                      <FiCheck className="w-4 h-4 text-ivory shrink-0" />
                      <span className="text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-dark-border">
              <div className="flex items-center gap-3 text-sm text-text-muted">
                <FiTag className="w-4 h-4 text-ivory" />
                <span>Categor&iacute;a: <span className="text-text-secondary">{property.category || "No especificada"}</span></span>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-muted">
                <FiCalendar className="w-4 h-4 text-ivory" />
                <span>Publicada: <span className="text-text-secondary">{new Date(property.createdAt).toLocaleDateString("es-PA", { year: "numeric", month: "long", day: "numeric" })}</span></span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="p-6 rounded-xl bg-dark-elevated border border-dark-border">
                <div className="text-3xl font-bold text-ivory-light mb-1">
                  {property.currencyCode === "PAB" ? "B/." : "$"}{property.price.toLocaleString("es-PA")}
                </div>
                <p className="text-xs text-text-muted mb-6">Precio de venta</p>

                <div className="space-y-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={cartLoading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-ivory text-dark-base font-semibold rounded-lg hover:bg-ivory-light transition-all duration-300 glow-ivory-subtle hover:glow-ivory disabled:opacity-50"
                  >
                    <FiShoppingBag className={`w-4 h-4 ${cartLoading ? "animate-bounce" : ""}`} />
                    {addedToCart ? "¡Agregado!" : cartLoading ? "Agregando..." : "Agregar al Carrito"}
                  </button>
                  <Link href="/contacto" className="block w-full text-center px-6 py-3.5 border border-dark-border-light text-text-primary font-medium rounded-lg hover:border-ivory/30 hover:text-ivory-light transition-all duration-300">
                    Solicitar Informaci&oacute;n
                  </Link>
                  <a href="tel:+50700000000" className="block w-full text-center px-6 py-3.5 border border-dark-border-light text-text-primary font-medium rounded-lg hover:border-ivory/30 hover:text-ivory-light transition-all duration-300">
                    Llamar ahora
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-dark-border">
                  <h4 className="text-sm font-semibold text-text-primary mb-3">Agente Asignado</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-ivory-glow/20 border border-ivory/20 flex items-center justify-center text-ivory font-semibold text-sm">K</div>
                    <div>
                      <div className="text-sm text-text-primary font-medium">Equipo Karven</div>
                      <div className="text-xs text-text-muted">Asesores Inmobiliarios M&eacute;dicos</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-dark-border">
                  <p className="text-xs text-text-muted leading-relaxed">&iquest;Tiene preguntas sobre esta propiedad? Estamos aqu&iacute; para ayudarle. Cont&aacute;ctenos para agendar una visita.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

function FeatureBox({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="p-4 rounded-xl bg-dark-elevated border border-dark-border">
      <Icon className="w-4 h-4 text-ivory mb-2" />
      <div className="text-xs text-text-muted mb-1">{label}</div>
      <div className="text-sm text-text-primary font-medium">{value}</div>
    </div>
  )
}
