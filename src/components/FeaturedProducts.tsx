"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import ProductCard from "./ProductCard"
import Reveal from "@/components/ui/Reveal"
import { getProducts } from "@/lib/medusa"
import type { Product } from "@/types"

/** Two feature slots on top, three standard cards below (reads like a magazine spread, not a shop grid). */
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
    <section className="section bg-paper">
      <div className="container-custom">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="eyebrow text-teal">Referencias</p>
              <h2 className="display-md mt-4 text-ink">Piezas de catálogo</h2>
            </div>
            <Link href="/equipamiento" className="btn btn-outline self-start md:self-auto">Todo el equipamiento <FiArrowUpRight className="w-4 h-4" /></Link>
          </div>
        </Reveal>

        {loading ? (
          <div className="mt-10 grid md:grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-line bg-paper-2 overflow-hidden animate-pulse">
                <div className="aspect-[16/10] bg-paper-3" />
                <div className="p-5 space-y-3"><div className="h-3 w-20 bg-paper-3 rounded" /><div className="h-5 w-3/4 bg-paper-3 rounded" /></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="mt-10 grid md:grid-cols-2 gap-4">
              {wide.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.08} distance={24}>
                  <ProductCard product={p} priority size="wide" />
                </Reveal>
              ))}
            </div>
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rest.map((p, i) => (
                <Reveal key={p.id} delay={0.1 + i * 0.07} distance={24}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </>
        )}
        {!loading && products.length === 0 && (
          <p className="mt-10 text-sm text-text-3">El catálogo se está actualizando. Vuelva a intentarlo en unos minutos.</p>
        )}
      </div>
    </section>
  )
}
