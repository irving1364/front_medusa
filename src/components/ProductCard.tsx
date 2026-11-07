"use client"

import Link from "next/link"
import Image from "next/image"
import { FiPlus, FiCheck } from "react-icons/fi"
import { useState } from "react"
import SpotlightCard from "@/components/reactbits/SpotlightCard/SpotlightCard"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/lib/medusa"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem, isLoading } = useCart()
  const [added, setAdded] = useState(false)

  const quickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!product.variantId) return
    await addItem(product.variantId, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <SpotlightCard
      theme="light"
      spotlightColor="rgba(20, 138, 154, 0.35)"
      intensity={0.22}
      spotlightSize={320}
      borderGlow={0.8}
      className="group h-full rounded-2xl border border-line bg-white"
    >
      <Link href={`/productos/${product.handle}`} className="flex h-full flex-col">
        <div className="img-frame aspect-[4/3] rounded-b-none rounded-t-2xl">
          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-display text-5xl text-text-3">{product.title.charAt(0)}</div>
          )}
          {product.badge && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-paper/90 backdrop-blur text-[10px] font-semibold uppercase tracking-[0.15em] text-ink">
              {product.badge}
            </span>
          )}
          <button
            onClick={quickAdd}
            disabled={isLoading || !product.variantId}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 pl-3 pr-3.5 py-2 rounded-full bg-ink text-paper text-xs font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 focus-visible:opacity-100 transition-all duration-400 disabled:opacity-40"
            aria-label={`Agregar ${product.title} a la cotización`}
          >
            {added ? <FiCheck className="w-3.5 h-3.5" /> : <FiPlus className="w-3.5 h-3.5" />}
            {added ? "Agregado" : "Cotizar"}
          </button>
        </div>

        <div className="flex flex-1 flex-col p-5">
          {product.collection && (
            <p className="text-[11px] uppercase tracking-[0.18em] text-teal">{product.collection.title}</p>
          )}
          <h3 className="mt-2 font-display text-xl leading-snug text-ink group-hover:text-teal transition-colors">{product.title}</h3>
          {product.subtitle && <p className="mt-1 text-sm text-text-3 line-clamp-2">{product.subtitle}</p>}
          <div className="mt-auto pt-5 flex items-center justify-between">
            <span className="text-sm font-medium text-ink">{formatPrice(product.price, product.currencyCode)}</span>
            {product.sku && <span className="text-[11px] text-text-3 tracking-wider">{product.sku}</span>}
          </div>
        </div>
      </Link>
    </SpotlightCard>
  )
}
