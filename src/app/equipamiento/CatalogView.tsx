"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { FiSearch, FiX } from "react-icons/fi"
import ProductCard from "@/components/ProductCard"
import Reveal from "@/components/ui/Reveal"
import FamilyIcon from "@/components/ui/FamilyIcon"
import { getProducts } from "@/lib/medusa"
import { useCategories } from "@/context/CategoriesContext"
import type { Product } from "@/types"

const SORT_OPTIONS = [
  { value: "newest", label: "Más recientes" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "sku", label: "Referencia" },
] as const
type Sort = (typeof SORT_OPTIONS)[number]["value"]

/** Catalogue browser: three product lines (parents) and their categories (children) from Medusa. */
export default function CatalogView() {
  const router = useRouter()
  const params = useSearchParams()
  const { parents, get, parentOf, loading: loadingCategories } = useCategories()
  // `linea` = parent handle, `categoria` = child handle (legacy `familia` / `coleccion` still accepted)
  const lineHandle = params.get("linea") || params.get("familia") || ""
  const categoryHandle = params.get("categoria") || params.get("coleccion") || ""

  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState<Sort>("newest")

  // Load the full catalogue once; filtering by line/category is done client-side.
  useEffect(() => {
    let cancelled = false
    getProducts({ limit: 200 })
      .then((res) => { if (!cancelled) setAllProducts(res.products) })
      .catch((error) => console.error("Error loading catalogue:", error))
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const category = get(categoryHandle)
  const line = get(lineHandle) || parentOf(category) || null
  const activeLine = line && !line.parentHandle ? line : null

  const inCategory = (p: Product, handle: string) => p.categories.some((c) => c.handle === handle)
  const countFor = (handle: string) => allProducts.filter((p) => inCategory(p, handle)).length
  const countForLine = (handles: string[]) => allProducts.filter((p) => p.categories.some((c) => handles.includes(c.handle))).length

  const visible = useMemo(() => {
    let list = [...allProducts]
    if (category) list = list.filter((p) => inCategory(p, category.handle))
    else if (activeLine) {
      const handles = new Set(activeLine.children.map((c) => c.handle))
      list = list.filter((p) => p.categories.some((c) => handles.has(c.handle)))
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((p) =>
        [p.title, p.subtitle, p.sku, p.categories.map((c) => c.name).join(" "), p.material].some((v) => v?.toLowerCase().includes(q))
      )
    }
    list.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price
      if (sort === "price-desc") return b.price - a.price
      if (sort === "sku") return (a.sku || "").localeCompare(b.sku || "")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    return list
  }, [allProducts, activeLine, category, search, sort])

  const go = (query: string) => router.replace(`/equipamiento${query}`, { scroll: false })

  const heading = category ? category.name : activeLine ? activeLine.name : "Equipamiento"
  const intro = category ? category.items || category.description : activeLine ? activeLine.description
    : "Mobiliario médico, veterinario y técnico en acero inoxidable 304 y 316, fabricado en Ciudad de Panamá. Agregue piezas a su lista y envíela para recibir una cotización formal."

  return (
    <div className="bg-paper pt-28 lg:pt-32">
      <div className="container-custom">
        {/* Heading */}
        <div className="rule-strong pt-5 grid lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow text-teal">
              {category ? <><span className="mono">{category.code}</span> · {activeLine?.name}</> : activeLine ? <><span className="mono">{activeLine.code}</span> · Línea</> : "Catálogo"}
            </p>
            <h1 className="display-lg mt-4 text-ink text-balance">{heading}</h1>
          </div>
          <p className="lg:col-span-4 text-base leading-relaxed text-text-2">{intro}</p>
        </div>

        {/* Line tabs */}
        <nav className="mt-10 flex gap-1.5 overflow-x-auto -mx-5 px-5 lg:mx-0 lg:px-0 pb-1 [scrollbar-width:none]" aria-label="Líneas de producto">
          <Chip active={!activeLine} onClick={() => go("")}>Todo</Chip>
          {parents.map((p) => (
            <Chip key={p.handle} active={activeLine?.handle === p.handle} onClick={() => go(`?linea=${p.handle}`)}>
              <span className="mono mr-1.5 opacity-60">{p.number}</span>{p.name.replace("Mobiliario ", "")}
            </Chip>
          ))}
        </nav>
      </div>

      <div className="container-custom mt-8 grid lg:grid-cols-12 gap-10">
        {/* Sidebar: categories of the active line (or all lines) */}
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-24">
            {activeLine ? (
              <>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-3">
                  <FamilyIcon name={activeLine.line} className="w-4 h-4 text-teal" /> Categorías
                </p>
                <ul className="mt-3 border-t border-line">
                  <li>
                    <button onClick={() => go(`?linea=${activeLine.handle}`)} className={`w-full flex justify-between py-2.5 text-sm border-b border-line ${!category ? "text-ink font-medium" : "text-text-2 hover:text-ink"}`}>
                      <span>Toda la línea</span>
                    </button>
                  </li>
                  {activeLine.children.map((c) => (
                    <li key={c.handle}>
                      <button onClick={() => go(`?categoria=${c.handle}`)} className={`w-full flex justify-between gap-3 py-2.5 text-sm text-left border-b border-line ${category?.handle === c.handle ? "text-ink font-medium" : "text-text-2 hover:text-ink"}`}>
                        <span><span className="mono text-text-3 mr-2">{c.number}</span>{c.name}</span><span className="tnum text-text-3">{countFor(c.handle)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-3">Líneas</p>
                <ol className="mt-3 border-t border-line">
                  {loadingCategories && parents.length === 0 && <li className="py-2.5 text-sm text-text-3">Cargando…</li>}
                  {parents.map((p) => (
                    <li key={p.handle}>
                      <button onClick={() => go(`?linea=${p.handle}`)} className="w-full flex items-center gap-3 py-2.5 text-sm text-left text-text-2 hover:text-ink border-b border-line">
                        <span className="mono text-text-3 w-5">{p.number}</span><span className="flex-1">{p.name}</span>
                        <span className="tnum text-text-3">{countForLine(p.children.map((c) => c.handle))}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </>
            )}
            <p className="mt-6 text-xs text-text-3 leading-relaxed">
              ¿No encuentra la pieza? Fabricamos a medida. <Link href="/contacto" className="text-ink underline underline-offset-4">Envíe un boceto</Link>.
            </p>
          </div>
        </aside>

        {/* Results */}
        <section className="lg:col-span-9 pb-20">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-line pb-4">
            <p className="text-sm text-text-3 tnum sm:flex-1">
              {loading ? "Cargando catálogo…" : `${visible.length} ${visible.length === 1 ? "referencia" : "referencias"}`}
            </p>
            <label className="relative sm:w-64">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-3" />
              <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nombre, referencia, material" className="input !py-2 !pl-10 !pr-9 text-sm" aria-label="Buscar" />
              {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-3 hover:text-ink" aria-label="Limpiar"><FiX className="w-4 h-4" /></button>}
            </label>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="input !py-2 !w-auto text-sm" aria-label="Ordenar">
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {loading ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-line bg-paper-2 overflow-hidden animate-pulse"><div className="aspect-[4/3] bg-paper-3" /><div className="p-5 space-y-3"><div className="h-3 w-20 bg-paper-3 rounded" /><div className="h-5 w-3/4 bg-paper-3 rounded" /></div></div>
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="py-20 text-center">
              <h2 className="font-display text-3xl text-ink">Sin referencias en esta vista</h2>
              <p className="mt-3 text-text-2">Esta categoría se fabrica bajo pedido. Cuéntenos qué necesita y le cotizamos.</p>
              <div className="mt-8 flex justify-center gap-3">
                <Link href="/contacto" className="btn btn-ink">Solicitar cotización</Link>
                <button onClick={() => { setSearch(""); go("") }} className="btn btn-outline">Ver todo</button>
              </div>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {visible.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 0.06} distance={20}>
                  <ProductCard product={p} priority={i < 3} />
                </Reveal>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 px-3.5 py-2 rounded-full text-[13px] font-medium border transition-all duration-300 ${
        active ? "bg-ink text-paper border-ink" : "bg-transparent text-text-2 border-line hover:border-ink hover:text-ink"
      }`}
    >
      {children}
    </button>
  )
}
