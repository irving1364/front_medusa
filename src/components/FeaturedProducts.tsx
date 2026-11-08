"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import ProductCard from "./ProductCard"
import Reveal from "@/components/ui/Reveal"
import { getProducts } from "@/lib/medusa"
import type { Product } from "@/types"

/** Product grid: two feature slots, then three standard cards. Centered opener in the Apple manner. */
export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts({ limit: 5 })
      .then((res) => setProducts(res.products))
      .catch((error) => console.error("Error loading featured products:", error))
      .finally(() => setLoading(false))
  }, [])

  const wide = products.slice(0, 2)
  const rest = products.slice(2, 5)

  return (
    <section className="section bg-paper-2">
      <div className="container-custom">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow text-teal justify-center">Referencias</p>
            <h2 className="display-md mt-4 text-ink">Piezas de catálogo.</h2>
            <p className="subtitle">Referencias listas para cotizar. Todo se fabrica bajo pedido y a medida.</p>
            <Link href="/equipamiento" className="link-arrow">Todo el equipamiento</Link>
          </div>
        </Reveal>

        {loading ? (
          <div className="mt-14 grid md:grid-cols-2 gap-5">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="rounded-[18px] border border-line bg-paper-2 overflow-hidden animate-pulse">
                <div className="aspect-[16/10] bg-paper-3" />
                <div className="p-5 space-y-3"><div className="h-3 w-20 bg-paper-3 rounded" /><div className="h-5 w-3/4 bg-paper-3 rounded" /></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="mt-14 lg:mt-16 grid md:grid-cols-2 gap-5">
              {wide.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.08} distance={24}>
                  <ProductCard product={p} priority size="wide" />
                </Reveal>
              ))}
            </div>
            <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((p, i) => (
                <Reveal key={p.id} delay={0.1 + i * 0.07} distance={24}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </>
        )}
        {!loading && products.length === 0 && (
          <p className="mt-10 text-sm text-text-3 text-center">El catálogo se está actualizando. Vuelva a intentarlo en unos minutos.</p>
        )}
      </div>
    </section>
  )
}
