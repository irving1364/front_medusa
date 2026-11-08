"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/ui/Reveal"
import { getProducts, formatPrice } from "@/lib/medusa"
import type { Product } from "@/types"

/** Catalogue references as plain rows: thumbnail, name, subfamily, price. No cards. */
export default function MinimalReferences() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts({ limit: 6 })
      .then((res) => setProducts(res.products))
      .catch((error) => console.error("Error loading references:", error))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <ul className="mt-10 border-t border-line animate-pulse">
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} className="flex items-center gap-6 py-5 border-b border-line">
            <div className="w-20 h-14 rounded-lg bg-paper-3" />
            <div className="h-4 w-1/3 rounded bg-paper-3" />
          </li>
        ))}
      </ul>
    )
  }

  if (products.length === 0) {
    return <p className="mt-10 text-sm text-text-3">El catálogo se está actualizando.</p>
  }

  return (
    <ul className="mt-10 border-t border-line">
      {products.map((p, i) => (
        <Reveal key={p.id} delay={i * 0.05} distance={12}>
          <li>
            <Link href={`/equipamiento/${p.handle}`} className="group grid grid-cols-[5rem_1fr_auto] sm:grid-cols-[6rem_1fr_1fr_auto] items-center gap-5 sm:gap-8 py-4 border-b border-line">
              <span className="plate relative w-20 sm:w-24 aspect-[4/3] rounded-lg">
                {p.thumbnail && <Image src={p.thumbnail} alt="" fill sizes="96px" className="object-cover" />}
              </span>
              <span className="min-w-0">
                <span className="block body-lg text-ink truncate group-hover:text-teal transition-colors">{p.title}</span>
                <span className="block sm:hidden text-xs text-text-3 mt-0.5">{p.collection?.title}</span>
              </span>
              <span className="hidden sm:block text-sm text-text-3 truncate">{p.collection?.title}</span>
              <span className="text-sm text-ink tnum whitespace-nowrap">{formatPrice(p.price, p.currencyCode)} <span className="text-text-3 ml-2">›</span></span>
            </Link>
          </li>
        </Reveal>
      ))}
    </ul>
  )
}
