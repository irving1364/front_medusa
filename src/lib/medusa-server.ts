import "server-only"
import { mapMedusaProduct, PRODUCT_FIELDS, type MedusaProduct, type MedusaRegion } from "@/lib/medusa"
import { toNode, type CategoryNode } from "@/lib/categories"
import type { Product } from "@/types"

/**
 * Server-side Medusa Store API access for SSR and metadata (SEO): product pages,
 * line pages, sitemap. Mirrors the client helpers in medusa.ts but uses plain fetch
 * with ISR caching so crawlers get complete HTML.
 */
const BACKEND = (process.env.MEDUSA_BACKEND_URL || process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000").trim().replace(/\/$/, "")
const KEY = (process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY || "").trim()
const REVALIDATE = 300

async function storeGet<T>(path: string, params: Record<string, string | number | undefined> = {}): Promise<T | null> {
  const qs = Object.entries(params).filter(([, v]) => v !== undefined && v !== "").map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`).join("&")
  try {
    const res = await fetch(`${BACKEND}/store${path}${qs ? `?${qs}` : ""}`, {
      headers: { "x-publishable-api-key": KEY },
      next: { revalidate: REVALIDATE },
    })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch (error) {
    console.error(`Medusa server fetch failed: ${path}`, error)
    return null
  }
}

export async function serverGetRegion(): Promise<MedusaRegion | null> {
  const data = await storeGet<{ regions: MedusaRegion[] }>("/regions")
  const regions = data?.regions || []
  return regions.find((r) => r.currency_code === "pab") || regions[0] || null
}

export async function serverGetProducts(params: { limit?: number; handle?: string; category_id?: string; collection_id?: string } = {}): Promise<Product[]> {
  const region = await serverGetRegion()
  const data = await storeGet<{ products: MedusaProduct[] }>("/products", {
    limit: params.limit ?? 100,
    handle: params.handle,
    category_id: params.category_id,
    collection_id: params.collection_id,
    region_id: region?.id,
    fields: PRODUCT_FIELDS,
  })
  const products = data?.products || []
  // Optional manual order: product metadata `home_order` (1, 2, 3…) set in the Medusa admin.
  const order = (p: MedusaProduct) => Number((p.metadata as Record<string, unknown> | null)?.home_order ?? Number.POSITIVE_INFINITY)
  products.sort((a, b) => order(a) - order(b))
  return products.map(mapMedusaProduct)
}

/** Handle of the Medusa collection whose products appear in the home rail ("Piezas de catálogo"). */
export const FEATURED_COLLECTION_HANDLE = "destacados"

/**
 * Products for the home rail: the "Destacados" collection curated in the Medusa admin,
 * ordered by metadata `home_order`; falls back to the newest products with a photo.
 */
export async function serverGetFeaturedProducts(limit = 3): Promise<Product[]> {
  const col = await storeGet<{ collections: { id: string }[] }>("/collections", { handle: FEATURED_COLLECTION_HANDLE, limit: 1 })
  const id = col?.collections?.[0]?.id
  const featured = id ? (await serverGetProducts({ collection_id: id, limit: 12 })).filter((p) => p.thumbnail) : []
  if (featured.length >= limit) return featured.slice(0, limit)
  const rest = (await serverGetProducts({ limit: 12 })).filter((p) => p.thumbnail && !featured.some((f) => f.id === p.id))
  return [...featured, ...rest].slice(0, limit)
}

export async function serverGetProductByHandle(handle: string): Promise<Product | null> {
  const products = await serverGetProducts({ handle, limit: 1 })
  return products[0] || null
}

interface ServerCategory {
  id: string
  name: string
  handle: string
  description: string | null
  rank: number | null
  parent_category_id: string | null
  metadata: Record<string, unknown> | null
  category_children?: ServerCategory[]
}

export async function serverGetCategoryTree(): Promise<CategoryNode[]> {
  const data = await storeGet<{ product_categories: ServerCategory[] }>("/product-categories", {
    include_descendants_tree: "true",
    parent_category_id: "null",
    limit: 50,
    fields: "id,name,handle,description,rank,parent_category_id,metadata,*category_children",
  })
  return (data?.product_categories || [])
    .filter((c) => !c.parent_category_id)
    .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0))
    .map((c) => toNode(c, null))
}

/** Public site origin for canonical URLs, sitemap and JSON-LD. Set NEXT_PUBLIC_SITE_URL in the host. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
).replace(/\/$/, "")
