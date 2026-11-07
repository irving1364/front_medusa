"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { FiArrowLeft, FiCheck, FiMinus, FiPlus, FiShoppingBag, FiShield, FiTruck } from "react-icons/fi"
import GlareHover from "@/components/reactbits/GlareHover/GlareHover"
import Reveal from "@/components/ui/Reveal"
import { getProductByHandle, formatPrice } from "@/lib/medusa"
import { useCart } from "@/context/CartContext"
import type { Product } from "@/types"

export default function ProductDetailPage() {
  const { handle } = useParams<{ handle: string }>()
  const [loaded, setLoaded] = useState<{ handle: string; product: Product | null } | null>(null)
  const [activeImage, setActiveImage] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem, isLoading: cartLoading } = useCart()

  useEffect(() => {
    let cancelled = false
    getProductByHandle(handle)
      .then((p) => { if (!cancelled) setLoaded({ handle, product: p }) })
      .catch((error) => {
        console.error(`Error loading product ${handle}:`, error)
        if (!cancelled) setLoaded({ handle, product: null })
      })
    return () => { cancelled = true }
  }, [handle])

  const loading = loaded?.handle !== handle
  const product = loading ? null : loaded?.product ?? null

  const handleAdd = async () => {
    if (!product?.variantId) return
    await addItem(product.variantId, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  if (loading) {
    return (
      <div className="bg-paper pt-32 pb-24">
        <div className="container-custom grid lg:grid-cols-12 gap-10 animate-pulse">
          <div className="lg:col-span-7 aspect-[4/3] rounded-3xl bg-paper-2" />
          <div className="lg:col-span-5 space-y-4 pt-4">
            <div className="h-3 w-24 bg-paper-2 rounded" />
            <div className="h-10 w-3/4 bg-paper-2 rounded" />
            <div className="h-4 w-1/2 bg-paper-2 rounded" />
            <div className="h-32 w-full bg-paper-2 rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="bg-ink text-paper min-h-screen pt-40 pb-32 text-center">
        <div className="container-custom">
          <h1 className="display-md">Producto no encontrado</h1>
          <p className="mt-4 text-text-on-ink-2">Es posible que la referencia ya no esté disponible.</p>
          <Link href="/productos" className="btn btn-paper mt-8">Volver al catálogo</Link>
        </div>
      </div>
    )
  }

  const images = product.images.length ? product.images : product.thumbnail ? [{ id: "thumb", url: product.thumbnail }] : []
  const specs = [
    ["Material", product.material],
    ["Dimensiones", product.dimensions],
    ["Capacidad", product.capacity],
    ["Color", product.color],
    ["Garantía", product.warranty],
    ["Referencia", product.sku],
  ].filter(([, v]) => v) as [string, string][]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || product.subtitle || product.title,
    image: images.map((i) => i.url),
    sku: product.sku || product.id,
    brand: { "@type": "Brand", name: "Karven" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currencyCode,
      availability: "https://schema.org/InStock",
    },
  }

  return (
    <div className="bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Band with breadcrumb */}
      <div className="bg-ink text-paper pt-28 pb-6">
        <div className="container-custom flex items-center gap-2 text-xs text-text-on-ink-3">
          <Link href="/productos" className="inline-flex items-center gap-1.5 hover:text-paper transition-colors">
            <FiArrowLeft className="w-3.5 h-3.5" /> Catálogo
          </Link>
          {product.collection && (
            <>
              <span>/</span>
              <Link href={`/productos?coleccion=${product.collection.handle}`} className="hover:text-paper transition-colors">{product.collection.title}</Link>
            </>
          )}
        </div>
      </div>

      <div className="container-custom py-10 lg:py-16 grid lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Gallery */}
        <div className="lg:col-span-7 lg:sticky lg:top-28 lg:self-start">
          <Reveal distance={24}>
            <GlareHover width="100%" height="auto" borderRadius="1.5rem" background="transparent" glareOpacity={0.18} glareSize={240} variant="sheen" className="w-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-paper-2 border border-line">
                {images[activeImage] ? (
                  <Image src={images[activeImage].url} alt={product.title} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center font-display text-7xl text-text-3">{product.title.charAt(0)}</div>
                )}
              </div>
            </GlareHover>
          </Reveal>
          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-3">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-square overflow-hidden rounded-xl border transition-all ${i === activeImage ? "border-ink" : "border-line hover:border-line-2"}`}
                  aria-label={`Imagen ${i + 1}`}
                >
                  <Image src={img.url} alt="" fill sizes="120px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lg:col-span-5">
          <Reveal distance={24} delay={0.1}>
            {product.collection && <p className="eyebrow text-teal">{product.collection.title}</p>}
            <h1 className="display-md mt-4 text-ink text-balance">{product.title}</h1>
            {product.subtitle && <p className="mt-3 text-lg text-text-2">{product.subtitle}</p>}

            <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-4xl text-ink whitespace-nowrap">{formatPrice(product.price, product.currencyCode)}</span>
              <span className="text-xs text-text-3">precio de referencia · ITBMS no incluido</span>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <div className="inline-flex items-center justify-between border border-line-2 rounded-full h-12 px-1.5 sm:w-36">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 rounded-full inline-flex items-center justify-center text-text-2 hover:bg-paper-2" aria-label="Restar">
                  <FiMinus className="w-4 h-4" />
                </button>
                <span className="font-medium text-ink w-8 text-center">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(99, q + 1))} className="w-9 h-9 rounded-full inline-flex items-center justify-center text-text-2 hover:bg-paper-2" aria-label="Sumar">
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
              <button onClick={handleAdd} disabled={cartLoading || !product.variantId} className="btn btn-teal flex-1 h-12 disabled:opacity-50">
                {added ? <FiCheck className="w-4 h-4" /> : <FiShoppingBag className="w-4 h-4" />}
                {added ? "Agregado a su cotización" : cartLoading ? "Agregando…" : "Agregar a cotización"}
              </button>
            </div>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-xs text-text-2">
              <li className="flex items-center gap-2"><FiTruck className="w-4 h-4 text-teal" /> Entrega e instalación en Panamá</li>
              <li className="flex items-center gap-2"><FiShield className="w-4 h-4 text-teal" /> {product.warranty ? `Garantía ${product.warranty}` : "Garantía de fábrica"}</li>
            </ul>

            {product.description && (
              <div className="mt-10">
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-text-3">Descripción</h2>
                <p className="mt-3 text-text-2 leading-relaxed whitespace-pre-line">{product.description}</p>
              </div>
            )}

            {specs.length > 0 && (
              <div className="mt-10">
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-text-3">Especificaciones</h2>
                <dl className="mt-3 divide-y divide-line border-y border-line">
                  {specs.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-3 gap-4 py-3 text-sm">
                      <dt className="text-text-3">{k}</dt>
                      <dd className="col-span-2 text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {product.features.length > 0 && (
              <div className="mt-10">
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-text-3">Características</h2>
                <ul className="mt-3 grid sm:grid-cols-2 gap-2.5">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-text-2">
                      <FiCheck className="mt-0.5 w-4 h-4 shrink-0 text-teal" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-12 p-6 rounded-2xl bg-paper-2 border border-line">
              <p className="font-display text-xl text-ink">¿Proyecto completo?</p>
              <p className="mt-2 text-sm text-text-2">Equipamos salas enteras con planos de distribución y precios por volumen.</p>
              <Link href="/contacto" className="btn btn-ink mt-5 text-sm">Hablar con un asesor</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
