"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FiArrowRight, FiHome } from "react-icons/fi"
import PropertyCard from "./PropertyCard"
import { getProducts, mapMedusaProductToProperty } from "@/lib/medusa"
import { FALLBACK_PROPERTIES } from "@/lib/fallback-properties"
import type { Property } from "@/types"

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await getProducts({ limit: 4 })
        if (response.products.length > 0) {
          setProperties(response.products.map(mapMedusaProductToProperty))
        } else {
          setProperties(FALLBACK_PROPERTIES.slice(0, 4))
        }
      } catch {
        setProperties(FALLBACK_PROPERTIES.slice(0, 4))
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])

  return (
    <section className="section-padding bg-dark-surface">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ivory/20 bg-ivory-glow/10 mb-4">
              <FiHome className="w-3 h-3 text-ivory" />
              <span className="text-[11px] uppercase tracking-[0.15em] text-ivory-light font-medium">Propiedades Destacadas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary">
              Propiedades <span className="text-gradient-ivory">Premium</span>
            </h2>
            <p className="mt-4 text-text-secondary max-w-xl">Espacios m&eacute;dicos dise&ntilde;ados para profesionales que buscan excelencia.</p>
          </div>
          <Link href="/propiedades" className="group inline-flex items-center gap-2 text-sm text-ivory hover:text-ivory-light transition-colors shrink-0">
            Ver todas las propiedades
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl bg-dark-elevated border border-dark-border overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-dark-border" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-dark-border rounded w-3/4" />
                  <div className="h-3 bg-dark-border rounded w-1/2" />
                  <div className="h-3 bg-dark-border rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        )}
      </div>
    </section>
  )
}
