"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { FiPlus, FiCheck, FiArrowUpRight } from "react-icons/fi"
import SpotlightCard from "@/components/reactbits/SpotlightCard/SpotlightCard"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/lib/medusa"
import { useTheme } from "@/lib/theme"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
  priority?: boolean
  /** "wide" renders a larger plate for feature slots. */
  size?: "default" | "wide"
}

export default function ProductCard({ product, priority = false, size = "default" }: ProductCardProps) {
  const { addItem, isLoading } = useCart()
  const theme = useTheme()
  const [added, setAdded] = useState(false)

  const quickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!product.variantId) return
    await addItem(product.variantId, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const materialShort = product.material?.replace("Acero inoxidable ", "Inox ") || null

  return (
    <SpotlightCard
      theme={theme}
      spotlightColor="rgba(47, 177, 194, 0.22)"
      intensity={0.14}
      spotlightSize={320}
      borderGlow={0.7}
      className="group h-full rounded-[18px] border border-line bg-paper-2 shadow-card"
    >
      <Link href={`/equipamiento/${product.handle}`} className="flex h-full flex-col">
        <div className={`plate rounded-t-[18px] ${size === "wide" ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
          {product.thumbnail ? (
            <Image src={product.thumbnail} alt={product.title} fill priority={priority} sizes={size === "wide" ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"} className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-display text-5xl text-text-3">{product.title.charAt(0)}</div>
          )}
          <span className="absolute top-3 left-3 px-2 py-1 rounded-md glass mono text-[10px] text-ink">{product.sku || "—"}</span>
          {product.badge && (
            <span className="absolute top-3 right-3 px-2 py-1 rounded-md bg-teal text-paper text-[10px] font-semibold uppercase tracking-[0.12em]">{product.badge}</span>
          )}
          <button
            onClick={quickAdd}
            disabled={isLoading || !product.variantId}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 pl-3 pr-3.5 py-2 rounded-lg bg-ink text-paper text-xs font-semibold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 focus-visible:opacity-100 transition-all duration-400 disabled:opacity-40"
            aria-label={`Agregar ${product.title} a la cotización`}
          >
            {added ? <FiCheck className="w-3.5 h-3.5" /> : <FiPlus className="w-3.5 h-3.5" />}
            {added ? "Agregado" : "Cotizar"}
          </button>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {(product.categories[0] || product.collection) && <p className="mono text-[10px] uppercase tracking-[0.14em] text-teal">{product.categories[0]?.name || product.collection?.title}</p>}
              <h3 className={`mt-1.5 font-display leading-snug text-ink group-hover:text-teal-3 transition-colors ${size === "wide" ? "text-2xl" : "text-lg"}`}>{product.title}</h3>
            </div>
            <FiArrowUpRight className="w-4 h-4 mt-1 shrink-0 text-text-3 group-hover:text-ink transition-colors" />
          </div>
          {product.subtitle && <p className="mt-1.5 text-sm text-text-2 line-clamp-2">{product.subtitle}</p>}
          <div className="mt-auto pt-4 flex items-end justify-between gap-3 border-t border-line">
            <div className="mono text-[11px] text-text-3 leading-snug min-w-0 [&>span]:truncate">
              {materialShort && <span className="block">{materialShort}</span>}
              {product.dimensions && <span className="block">{product.dimensions}</span>}
            </div>
            <span className="text-sm font-medium text-ink tnum whitespace-nowrap">{formatPrice(product.price, product.currencyCode)}</span>
          </div>
        </div>
      </Link>
    </SpotlightCard>
  )
}
