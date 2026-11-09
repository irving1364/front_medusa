"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { FiArrowLeft, FiCheck, FiMinus, FiPlus, FiShoppingBag, FiArrowUpRight } from "react-icons/fi"
import GlareHover from "@/components/reactbits/GlareHover/GlareHover"
import Reveal from "@/components/ui/Reveal"
import ProductCard from "@/components/ProductCard"
import ProductDatasheet from "@/components/ProductDatasheet"
import { formatPrice } from "@/lib/medusa"
import { useCategories } from "@/context/CategoriesContext"
import { useCart } from "@/context/CartContext"
import type { Product } from "@/types"

interface ProductDetailProps {
  product: Product
  related: Product[]
}

/** Interactive product view. The page shell, metadata and JSON-LD are server-rendered in page.tsx. */
export default function ProductDetail({ product, related }: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [variantId, setVariantId] = useState<string | null>(null)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem, isLoading: cartLoading } = useCart()
  const { get, parentOf } = useCategories()

  const selected = product.variants.find((v) => v.id === variantId) || product.variants[0] || null
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

  const handleAdd = async () => {
    if (!selected) return
    await addItem(selected.id, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  const categoryName = category?.name || product.categories[0]?.name || product.collection?.title
  const categoryHref = category ? `/${line?.handle || "mobiliario"}?categoria=${category.handle}` : "/mobiliario"
  const altText = `${product.title} KARVEN en acero inoxidable`

  return (
    <div className="bg-paper pt-24 lg:pt-28">
      <div className="container-custom">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-text-3 border-b border-line pb-4" aria-label="Ruta">
          <Link href="/mobiliario" className="inline-flex items-center gap-1.5 hover:text-ink"><FiArrowLeft className="w-3.5 h-3.5" /> Mobiliario</Link>
          {line && (<><span>/</span><Link href={`/${line.handle}`} className="hover:text-ink">{line.name}</Link></>)}
          {categoryName && (<><span>/</span><Link href={categoryHref} className="hover:text-ink">{categoryName}</Link></>)}
        </nav>
      </div>

      <div className="container-custom py-10 lg:py-14 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-7 lg:sticky lg:top-24 lg:self-start">
          <Reveal distance={20}>
            <GlareHover width="100%" height="auto" borderRadius="1.5rem" background="transparent" glareOpacity={0.14} glareSize={240} variant="sheen" className="w-full">
              <div className="plate plate-color aspect-[4/3] w-full rounded-3xl border border-line">
                {images[activeImage] ? (
                  <Image src={images[activeImage].url} alt={altText} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
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
            {categoryName && <p className="eyebrow text-teal">{categoryName}</p>}
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
            {categoryName && <Link href={categoryHref} className="text-sm text-text-2 hover:text-ink underline underline-offset-4">Ver {categoryName.toLowerCase()}</Link>}
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((r) => <ProductCard key={r.id} product={r} />)}
          </div>
        </section>
      )}
    </div>
  )
}
