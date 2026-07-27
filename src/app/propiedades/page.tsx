"use client"

import { useEffect, useState, useCallback } from "react"
import { FiSearch, FiSliders, FiX } from "react-icons/fi"
import PropertyCard from "@/components/PropertyCard"
import { getProducts, mapMedusaProductToProperty } from "@/lib/medusa"
import { FALLBACK_PROPERTIES } from "@/lib/fallback-properties"
import type { Property } from "@/types"

const PROPERTY_TYPES = ["consultorio", "clinica", "centro-medico"]
const STATUS_OPTIONS = ["disponible", "vendido", "rentado"]
const SORT_OPTIONS = [
  { value: "newest", label: "M\u00e1s recientes" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
]

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [filtered, setFiltered] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [type, setType] = useState("")
  const [status, setStatus] = useState("")
  const [sort, setSort] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    async function fetch() {
      try {
        const res = await getProducts({ limit: 50 })
        if (res.products.length > 0) {
          setProperties(res.products.map(mapMedusaProductToProperty))
        } else {
          setProperties(FALLBACK_PROPERTIES)
        }
      } catch {
        setProperties(FALLBACK_PROPERTIES)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const apply = useCallback(() => {
    let r = [...properties]
    if (search) {
      const q = search.toLowerCase()
      r = r.filter((p) => p.title.toLowerCase().includes(q) || p.location?.toLowerCase().includes(q) || p.subtitle?.toLowerCase().includes(q))
    }
    if (type) r = r.filter((p) => p.type === type)
    if (status) r = r.filter((p) => p.status === status)
    r.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price
      if (sort === "price-desc") return b.price - a.price
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    setFiltered(r)
  }, [properties, search, type, status, sort])

  useEffect(() => { apply() }, [apply])

  const btnClass = (active: boolean) =>
    `px-4 py-2 rounded-lg text-sm transition-all ${
      active ? "bg-ivory text-dark-base font-medium" : "bg-dark-elevated border border-dark-border text-text-secondary hover:border-ivory/30"
    }`

  return (
    <div className="pt-20 min-h-screen bg-dark-base">
      {/* Header */}
      <div className="border-b border-dark-border">
        <div className="container-custom px-4 sm:px-6 py-12 sm:py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ivory/20 bg-ivory-glow/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-ivory animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.15em] text-ivory-light font-medium">Cat&aacute;logo de Propiedades</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary mb-4">
            Propiedades <span className="text-gradient-ivory">M&eacute;dicas</span>
          </h1>
          <p className="text-text-secondary max-w-xl">Explore nuestra selecci&oacute;n exclusiva de espacios m&eacute;dicos premium en las mejores ubicaciones de Panam&aacute;.</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="border-b border-dark-border bg-dark-surface">
        <div className="container-custom px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input type="text" placeholder="Buscar por nombre, ubicaci&oacute;n..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-dark-elevated border border-dark-border rounded-lg text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-ivory/50 focus:ring-1 focus:ring-ivory/20 transition-all" />
              {search && <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"><FiX className="w-4 h-4" /></button>}
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="sm:hidden flex items-center justify-center gap-2 px-4 py-3 bg-dark-elevated border border-dark-border rounded-lg text-text-secondary hover:text-ivory-light transition-colors">
              <FiSliders className="w-4 h-4" /> Filtros
            </button>
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              className="px-4 py-3 bg-dark-elevated border border-dark-border rounded-lg text-text-primary focus:outline-none focus:border-ivory/50 transition-all cursor-pointer">
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div className={`${showFilters ? "block" : "hidden"} sm:block mt-4`}>
            <div className="flex flex-wrap gap-3">
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setType("")} className={btnClass(!type)}>Todas</button>
                {PROPERTY_TYPES.map((t) => (
                  <button key={t} onClick={() => setType(type === t ? "" : t)} className={btnClass(type === t)}>
                    {t === "centro-medico" ? "Centros M\u00e9dicos" : `${t}s`}
                  </button>
                ))}
              </div>
              <div className="w-px bg-dark-border self-stretch hidden sm:block" />
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((s) => (
                  <button key={s} onClick={() => setStatus(status === s ? "" : s)} className={btnClass(status === s)}>
                    {s === "disponible" ? "Disponibles" : s === "vendido" ? "Vendidos" : "Rentados"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-dark-border bg-dark-base">
        <div className="container-custom px-4 sm:px-6 py-3">
          <p className="text-sm text-text-muted">{loading ? "Cargando..." : `${filtered.length} propiedades encontradas`}</p>
        </div>
      </div>

      <div className="container-custom px-4 sm:px-6 py-12">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="rounded-xl bg-dark-elevated border border-dark-border overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-dark-border" /><div className="p-5 space-y-3">
                  <div className="h-4 bg-dark-border rounded w-3/4" /><div className="h-3 bg-dark-border rounded w-1/2" /><div className="h-3 bg-dark-border rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">No se encontraron propiedades</h3>
            <p className="text-text-muted">Intente ajustar los filtros o realizar una b&uacute;squeda diferente.</p>
          </div>
        )}
      </div>
    </div>
  )
}
