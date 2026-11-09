"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { FiSearch, FiX } from "react-icons/fi"
import ProductCard from "@/components/ProductCard"
import type { CategoryNode } from "@/lib/categories"
import type { Product } from "@/types"

interface LineCatalogProps {
  line: CategoryNode
  products: Product[]
}

/** Server-rendered product grid for one line, with a client-side category filter (?categoria=). */
export default function LineCatalog({ line, products }: LineCatalogProps) {
  // The category filter lives in ?categoria=, but it is read after hydration on purpose:
  // useSearchParams would turn this static page into client-side rendering and hide the
  // product grid from crawlers. Server HTML always lists the whole line.
  const [categoryHandle, setCategoryHandle] = useState("")
  const [search, setSearch] = useState("")
  useEffect(() => {
    const read = () => setCategoryHandle(new URLSearchParams(window.location.search).get("categoria") || "")
    read()
    window.addEventListener("popstate", read)
    return () => window.removeEventListener("popstate", read)
  }, [])
  const category = line.children.find((c) => c.handle === categoryHandle) || null

  const countFor = (handle: string) => products.filter((p) => p.categories.some((c) => c.handle === handle)).length

  const visible = useMemo(() => {
    let list = products
    if (category) list = list.filter((p) => p.categories.some((c) => c.handle === category.handle))
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((p) => [p.title, p.subtitle, p.sku, p.material].some((v) => v?.toLowerCase().includes(q)))
    }
    return list
  }, [products, category, search])

  const go = (handle: string | null) => {
    window.history.replaceState(null, "", handle ? `/${line.handle}?categoria=${handle}` : `/${line.handle}`)
    setCategoryHandle(handle || "")
  }

  return (
    <div className="container-custom mt-10 grid lg:grid-cols-12 gap-10">
      <aside className="lg:col-span-3">
        <div className="lg:sticky lg:top-24">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-text-3">Categorías</h2>
          <ul className="mt-3 border-t border-line">
            <li>
              <button onClick={() => go(null)} className={`w-full flex justify-between py-2.5 text-sm border-b border-line ${!category ? "text-ink font-medium" : "text-text-2 hover:text-ink"}`}>
                <span>Toda la línea</span><span className="tnum text-text-3">{products.length}</span>
              </button>
            </li>
            {line.children.map((c) => (
              <li key={c.handle}>
                {/* Real link for crawlers; client navigation keeps the scroll position */}
                <Link
                  href={`/${line.handle}?categoria=${c.handle}`}
                  onClick={(e) => { e.preventDefault(); go(c.handle) }}
                  className={`w-full flex justify-between gap-3 py-2.5 text-sm text-left border-b border-line ${category?.handle === c.handle ? "text-ink font-medium" : "text-text-2 hover:text-ink"}`}
                >
                  <span>{c.name}</span><span className="tnum text-text-3">{countFor(c.handle)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-text-3 leading-relaxed">
            ¿No encuentra la pieza? Fabricamos a medida. <Link href="/contacto" className="text-ink underline underline-offset-4">Envíe un boceto</Link>.
          </p>
        </div>
      </aside>

      <section className="lg:col-span-9 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-line pb-4">
          <p className="text-sm text-text-3 tnum sm:flex-1">
            {category ? <><span className="text-ink font-medium">{category.name}</span> · </> : null}
            {visible.length} {visible.length === 1 ? "referencia" : "referencias"}
          </p>
          <label className="relative sm:w-64">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-3" />
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nombre, referencia, material" className="input !py-2 !pl-10 !pr-9 text-sm" aria-label="Buscar" />
            {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-3 hover:text-ink" aria-label="Limpiar"><FiX className="w-4 h-4" /></button>}
          </label>
        </div>
        {category?.items && <p className="mt-4 text-sm text-text-2">{category.items}</p>}

        {visible.length === 0 ? (
          <div className="py-20 text-center">
            <h3 className="font-display text-3xl text-ink">Sin referencias en esta vista</h3>
            <p className="mt-3 text-text-2">Esta categoría se fabrica bajo pedido. Cuéntenos qué necesita y le cotizamos.</p>
            <div className="mt-8 flex justify-center gap-3">
              <Link href="/contacto" className="btn btn-ink">Solicitar cotización</Link>
              <button onClick={() => { setSearch(""); go(null) }} className="btn btn-outline">Ver toda la línea</button>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {visible.map((p, i) => <ProductCard key={p.id} product={p} priority={i < 3} />)}
          </div>
        )}
      </section>
    </div>
  )
}
