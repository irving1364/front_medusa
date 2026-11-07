"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import ProductCard from "./ProductCard"
import Reveal from "@/components/ui/Reveal"
import SectionHeading from "@/components/ui/SectionHeading"
import { getProducts } from "@/lib/medusa"
import type { Product } from "@/types"

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts({ limit: 8 })
      .then((res) => setProducts(res.products))
      .catch((error) => console.error("Error loading featured products:", error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="section bg-paper-2">
      <div className="container-custom">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <SectionHeading
              eyebrow="Selección"
              title={<>Piezas destacadas <span className="text-teal">del catálogo</span></>}
              description="Mobiliario con la mejor relación entre ergonomía, durabilidad y facilidad de limpieza. Agregue a su lista y reciba una cotización formal en 48 horas."
            />
            <Link href="/productos" className="btn btn-outline self-start lg:self-auto">
              Ver catálogo completo <FiArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-line bg-white overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-paper-2" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 w-20 bg-paper-2 rounded" />
                    <div className="h-5 w-3/4 bg-paper-2 rounded" />
                    <div className="h-3 w-1/2 bg-paper-2 rounded" />
                  </div>
                </div>
              ))
            : products.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 0.08}>
                  <ProductCard product={p} priority={i < 4} />
                </Reveal>
              ))}
        </div>

        {!loading && products.length === 0 && (
          <p className="mt-10 text-center text-text-3">El catálogo se está actualizando. Vuelva a intentarlo en unos minutos.</p>
        )}
      </div>
    </section>
  )
}
