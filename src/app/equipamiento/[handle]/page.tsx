"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { FiArrowLeft, FiCheck, FiMinus, FiPlus, FiShoppingBag, FiArrowUpRight } from "react-icons/fi"
import GlareHover from "@/components/reactbits/GlareHover/GlareHover"
import Reveal from "@/components/ui/Reveal"
import ProductCard from "@/components/ProductCard"
import ProductDatasheet from "@/components/ProductDatasheet"
import { getProductByHandle, getProducts, formatPrice } from "@/lib/medusa"
import { useCategories } from "@/context/CategoriesContext"
import { useCart } from "@/context/CartContext"
import type { Product } from "@/types"

export default function ProductDetailPage() {
  const { handle } = useParams<{ handle: string }>()
  const [loaded, setLoaded] = useState<{ handle: string; product: Product | null; related: Product[] } | null>(null)
  const [activeImage, setActiveImage] = useState(0)
  const [variantId, setVariantId] = useState<string | null>(null)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem, isLoading: cartLoading } = useCart()
  const { get, parentOf } = useCategories()

  useEffect(() => {
    let cancelled = false
    getProductByHandle(handle)
      .then(async (p) => {
        let related: Product[] = []
        if (p?.categories.length) {
          const res = await getProducts({ limit: 60 })
          const key = p.categories[0]?.handle
          related = res.products.filter((r) => key && r.categories.some((c) => c.handle === key) && r.id !== p.id).slice(0, 3)
        }
        if (!cancelled) setLoaded({ handle, product: p, related })
      })
      .catch((error) => {
        console.error(`Error loading product ${handle}:`, error)
        if (!cancelled) setLoaded({ handle, product: null, related: [] })
      })
    return () => { cancelled = true }
  }, [handle])

  const loading = loaded?.handle !== handle
  const product = loading ? null : loaded?.product ?? null
  const related = loading ? [] : loaded?.related ?? []
  // Selected size/variant (cheapest by default)
  const selected = product ? product.variants.find((v) => v.id === variantId) || product.variants[0] || null : null

  const handleAdd = async () => {
    if (!selected) return
    await addItem(selected.id, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  if (loading) {
    return (
      <div className="bg-paper pt-32 pb-24">
        <div className="container-custom grid lg:grid-cols-12 gap-10 animate-pulse">
          <div className="lg:col-span-7 aspect-[4/3] rounded-3xl bg-paper-2" />
          <div className="lg:col-span-5 space-y-4 pt-4"><div className="h-3 w-24 bg-paper-2 rounded" /><div className="h-10 w-3/4 bg-paper-2 rounded" /><div className="h-32 w-full bg-paper-2 rounded" /></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="bg-paper min-h-screen pt-40 pb-32 text-center">
        <div className="container-custom">
          <h1 className="display-md text-ink">Referencia no encontrada</h1>
          <p className="mt-4 text-text-2">Es posible que la pieza haya cambiado de código o se fabrique bajo pedido.</p>
          <Link href="/equipamiento" className="btn btn-ink mt-8">Volver al equipamiento</Link>
        </div>
      </div>
    )
  }

  const category = get(product.categories[0]?.handle)
  const line = parentOf(category)
  const images = product.images.length ? product.images : product.thumbnail ? [{ id: "thumb", url: product.thumbnail }] : []
  const specs = [
    ["Referencia", product.sku],
    ["Material", product.material],
    ["Calibre / tubo", product.gauge],
    ["Acabado", product.finish],
    ["Dimensiones", product.dimensions],
    ["Carga", product.capacity],
    ["Ruedas", product.wheels],
    ["Color", product.color],
    ["Opciones", product.options],
    ["Garantía", product.warranty],
  ].filter(([, v]) => v) as [string, string][]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || product.subtitle || product.title,
    image: images.map((i) => i.url),
    sku: product.sku || product.id,
    brand: { "@type": "Brand", name: "Karven" },
    material: product.material || undefined,
    offers: { "@type": "Offer", price: product.price, priceCurrency: product.currencyCode, availability: "https://schema.org/InStock" },
  }

  return (
    <div className="bg-paper pt-24 lg:pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container-custom">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-text-3 border-b border-line pb-4" aria-label="Ruta">
          <Link href="/equipamiento" className="inline-flex items-center gap-1.5 hover:text-ink"><FiArrowLeft className="w-3.5 h-3.5" /> Equipamiento</Link>
          {line && (<><span>/</span><Link href={`/equipamiento?linea=${line.handle}`} className="hover:text-ink">{line.name}</Link></>)}
          {category && (<><span>/</span><Link href={`/equipamiento?categoria=${category.handle}`} className="hover:text-ink"><span className="mono">{category.code}</span> {category.name}</Link></>)}
        </nav>
      </div>

      <div className="container-custom py-10 lg:py-14 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-7 lg:sticky lg:top-24 lg:self-start">
          <Reveal distance={20}>
            <GlareHover width="100%" height="auto" borderRadius="1.5rem" background="transparent" glareOpacity={0.14} glareSize={240} variant="sheen" className="w-full">
              <div className="plate plate-color aspect-[4/3] w-full rounded-3xl border border-line">
                {images[activeImage] ? (
                  <Image src={images[activeImage].url} alt={product.title} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center font-display text-7xl text-text-3">{product.title.charAt(0)}</div>
                )}
                <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md glass mono text-[11px] text-ink">{product.sku}</span>
              </div>
            </GlareHover>
          </Reveal>
          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-3">
              {images.map((img, i) => (
                <button key={img.id} onClick={() => setActiveImage(i)} className={`plate plate-color aspect-square rounded-xl border ${i === activeImage ? "border-ink" : "border-line"}`} aria-label={`Imagen ${i + 1}`}>
                  <Image src={img.url} alt="" fill sizes="120px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
          <p className="mt-4 text-[11px] text-text-3">Imagen de referencia. Las piezas se fabrican bajo pedido según la especificación acordada.</p>
        </div>

        <div className="lg:col-span-5">
          <Reveal distance={20} delay={0.08}>
            {(category || product.collection) && <p className="eyebrow text-teal">{category ? ` · ` : product.collection?.title}</p>}
            <h1 className="display-md mt-4 text-ink text-balance">{product.title}</h1>
            {product.subtitle && <p className="mt-3 text-lg text-text-2">{product.subtitle}</p>}

            <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-4xl text-ink tnum whitespace-nowrap">
                {product.priceFrom && selected?.id === product.variants[0]?.id && <span className="text-xl text-text-3 font-normal mr-1">Desde</span>}
                {formatPrice(selected?.price ?? product.price, product.currencyCode)}
              </span>
              <span className="text-xs text-text-3">{product.taxIncluded ? "ITBMS incluido" : "precio de referencia · ITBMS no incluido"}</span>
            </div>

            {product.variants.length > 1 && (
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-3">Medida</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setVariantId(v.id)}
                      aria-pressed={selected?.id === v.id}
                      className={`px-3.5 py-2 rounded-full text-sm border transition-colors tnum ${selected?.id === v.id ? "bg-ink text-paper border-ink" : "border-line-2 text-text-2 hover:border-ink hover:text-ink"}`}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <div className="inline-flex items-center justify-between border border-line-2 rounded-full h-12 px-1.5 sm:w-36">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 rounded-full inline-flex items-center justify-center text-text-2 hover:bg-paper-2" aria-label="Restar"><FiMinus className="w-4 h-4" /></button>
                <span className="font-medium text-ink w-8 text-center tnum">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(99, q + 1))} className="w-9 h-9 rounded-full inline-flex items-center justify-center text-text-2 hover:bg-paper-2" aria-label="Sumar"><FiPlus className="w-4 h-4" /></button>
              </div>
              <button onClick={handleAdd} disabled={cartLoading || !selected} className="btn btn-ink flex-1 h-12 disabled:opacity-50">
                {added ? <FiCheck className="w-4 h-4" /> : <FiShoppingBag className="w-4 h-4" />}
                {added ? "Agregado a su cotización" : cartLoading ? "Agregando…" : "Agregar a cotización"}
              </button>
            </div>

            {product.description && <p className="mt-8 text-text-2 leading-relaxed whitespace-pre-line">{product.description}</p>}

            {specs.length > 0 && (
              <div className="mt-10">
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-text-3">Especificación</h2>
                <table className="spec-table mt-3">
                  <tbody>
                    {specs.map(([k, v]) => (<tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>))}
                  </tbody>
                </table>
              </div>
            )}

            {product.datasheetUrl && <ProductDatasheet url={product.datasheetUrl} name={product.datasheetName} productTitle={product.title} />}

            {product.uses && (
              <div className="mt-10">
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-text-3">Uso recomendado</h2>
                <p className="mt-3 text-sm text-text-2 leading-relaxed">{product.uses}</p>
              </div>
            )}

            {product.features.length > 0 && (
              <div className="mt-10">
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-text-3">Detalles</h2>
                <ul className="mt-3 space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-text-2"><FiCheck className="mt-0.5 w-4 h-4 shrink-0 text-teal" /> {f}</li>
                  ))}
                </ul>
              </div>
            )}


            <div className="mt-12 border-t border-line-2 pt-6">
              <p className="font-display text-xl text-ink">¿Medidas distintas o varias unidades?</p>
              <p className="mt-2 text-sm text-text-2">Fabricamos a medida y cotizamos por volumen con planos de distribución.</p>
              <Link href="/contacto" className="btn btn-outline mt-5 text-sm">Hablar con fabricación <FiArrowUpRight className="w-4 h-4" /></Link>
            </div>
          </Reveal>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container-custom pb-20">
          <div className="rule-strong pt-5 flex items-end justify-between gap-4">
            <h2 className="display-md text-ink">Misma categoría</h2>
            {category && <Link href={`/equipamiento?categoria=${category.handle}`} className="text-sm text-text-2 hover:text-ink underline underline-offset-4">Ver {category.name.toLowerCase()}</Link>}
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((r) => <ProductCard key={r.id} product={r} />)}
          </div>
        </section>
      )}
    </div>
  )
}
