"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { FiSearch, FiX } from "react-icons/fi"
import ProductCard from "@/components/ProductCard"
import Reveal from "@/components/ui/Reveal"
import { getProducts, getCollections } from "@/lib/medusa"
import { CATEGORIES, getCategory } from "@/lib/catalog"
import type { Product, Collection } from "@/types"

const SORT_OPTIONS = [
  { value: "newest", label: "Más recientes" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
] as const

type Sort = (typeof SORT_OPTIONS)[number]["value"]

export default function CatalogView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeHandle = searchParams.get("coleccion") || ""

  const [products, setProducts] = useState<Product[]>([])
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState<Sort>("newest")

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      const cols = collections.length ? collections : await getCollections()
      if (cancelled) return
      if (!collections.length) setCollections(cols)
      const active = cols.find((c) => c.handle === activeHandle)
      const res = await getProducts({ limit: 100, ...(active ? { collection_id: [active.id] } : {}) })
      if (cancelled) return
      setProducts(res.products)
      setLoading(false)
    }
    load()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeHandle])

  const visible = useMemo(() => {
    let list = [...products]
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle?.toLowerCase().includes(q) ||
        p.collection?.title.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q)
      )
    }
    list.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price
      if (sort === "price-desc") return b.price - a.price
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    return list
  }, [products, search, sort])

  const setCollection = (handle: string) => {
    router.replace(handle ? `/productos?coleccion=${handle}` : "/productos", { scroll: false })
  }

  const category = getCategory(activeHandle)

  return (
    <div className="bg-paper">
      {/* Page band */}
      <section className="bg-ink text-paper pt-36 pb-16 lg:pt-44 lg:pb-20 grain">
        <div className="container-custom">
          <p className="eyebrow text-teal-3">Catálogo</p>
          <h1 className="display-lg mt-5 max-w-4xl text-balance">
            {category ? category.title : "Mobiliario médico y clínico"}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-text-on-ink-2">
            {category
              ? category.description
              : "Seis familias de producto para hospitales, clínicas, consultorios y laboratorios. Agregue piezas a su lista y reciba una cotización formal en 48 horas."}
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-[76px] z-30 bg-paper/90 backdrop-blur-xl border-b border-line">
        <div className="container-custom py-3 flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="flex gap-2 overflow-x-auto -mx-5 px-5 lg:mx-0 lg:px-0 pb-1 lg:pb-0 lg:flex-1 lg:min-w-0 [scrollbar-width:none]">
            <FilterChip active={!activeHandle} onClick={() => setCollection("")}>Todo</FilterChip>
            {CATEGORIES.map((c) => (
              <FilterChip key={c.handle} active={activeHandle === c.handle} onClick={() => setCollection(c.handle)}>
                {c.short}
              </FilterChip>
            ))}
          </div>
          <div className="flex items-center gap-2 lg:shrink-0">
            <label className="relative flex-1 lg:flex-none lg:w-72">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-3" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre o referencia"
                className="input !py-2.5 !pl-10 !pr-9 !rounded-full text-sm"
                aria-label="Buscar productos"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-3 hover:text-ink" aria-label="Limpiar búsqueda">
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="input !py-2.5 !pr-9 !rounded-full text-sm !w-auto shrink-0"
              aria-label="Ordenar"
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="container-custom py-12 lg:py-16 min-h-[60vh]">
        <p className="text-sm text-text-3 mb-8">
          {loading ? "Cargando catálogo…" : `${visible.length} ${visible.length === 1 ? "producto" : "productos"}`}
        </p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-line bg-white overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-paper-2" />
                <div className="p-5 space-y-3"><div className="h-3 w-20 bg-paper-2 rounded" /><div className="h-5 w-3/4 bg-paper-2 rounded" /></div>
              </div>
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="py-24 text-center">
            <h2 className="font-display text-3xl text-ink">Sin resultados</h2>
            <p className="mt-3 text-text-2">Pruebe con otra búsqueda o explore todo el catálogo.</p>
            <div className="mt-8 flex justify-center gap-3">
              {search && <button onClick={() => setSearch("")} className="btn btn-outline">Limpiar búsqueda</button>}
              <Link href="/productos" className="btn btn-ink">Ver todo el catálogo</Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {visible.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 0.06} distance={24}>
                <ProductCard product={p} priority={i < 4} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
        active ? "bg-ink text-paper border-ink" : "bg-transparent text-text-2 border-line hover:border-ink hover:text-ink"
      }`}
      aria-pressed={active}
    >
      {children}
    </button>
  )
}
