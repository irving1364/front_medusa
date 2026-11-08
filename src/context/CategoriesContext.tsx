"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { fetchCategoryTree, flatten, type CategoryNode } from "@/lib/categories"

interface CategoriesValue {
  /** Parent categories ("líneas") with their children, in rank order */
  parents: CategoryNode[]
  /** Parents and children, flat */
  all: CategoryNode[]
  byHandle: Map<string, CategoryNode>
  loading: boolean
  get: (handle: string | null | undefined) => CategoryNode | undefined
  parentOf: (node: CategoryNode | null | undefined) => CategoryNode | undefined
}

const CategoriesContext = createContext<CategoriesValue | null>(null)

/** Loads the category tree once per session and shares it with every component. */
export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [parents, setParents] = useState<CategoryNode[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchCategoryTree()
      .then((tree) => { if (!cancelled) setParents(tree) })
      .catch((error) => console.error("Error loading categories:", error))
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const value = useMemo<CategoriesValue>(() => {
    const all = flatten(parents)
    const byHandle = new Map(all.map((c) => [c.handle, c]))
    return {
      parents,
      all,
      byHandle,
      loading,
      get: (handle) => (handle ? byHandle.get(handle) : undefined),
      parentOf: (node) => (node?.parentHandle ? byHandle.get(node.parentHandle) : undefined),
    }
  }, [parents, loading])

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}

export function useCategories(): CategoriesValue {
  const ctx = useContext(CategoriesContext)
  if (!ctx) throw new Error("useCategories must be used within CategoriesProvider")
  return ctx
}
