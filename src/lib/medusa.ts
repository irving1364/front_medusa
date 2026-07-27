import Medusa from "@medusajs/js-sdk"
import type { Property } from "@/types"

const BACKEND_URL = (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000").trim()
const PUBLISHABLE_API_KEY = (process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY || "").trim()

let medusaClient: Medusa | null = null

export function getMedusaClient(): Medusa {
  if (!medusaClient) {
    // In the browser, use the Next.js proxy (/api/medusa) to avoid CORS.
    // IMPORTANT: Must be an absolute URL because Medusa SDK uses `new URL()` internally.
    const baseUrl = typeof window !== "undefined"
      ? window.location.origin + "/api/medusa"
      : BACKEND_URL

    medusaClient = new Medusa({
      baseUrl,
      debug: process.env.NODE_ENV === "development",
      publishableKey: PUBLISHABLE_API_KEY,
    })
  }
  return medusaClient
}

export interface MedusaProduct {
  id: string
  title: string
  subtitle: string | null
  description: string | null
  handle: string
  status: string
  thumbnail: string | null
  images: { id: string; url: string }[]
  variants: {
    id: string
    title: string
    prices: { amount: number; currency_code: string }[]
  }[]
  collection: { title: string; handle: string } | null
  categories: { id: string; name: string }[]
  metadata: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

export interface MedusaCollection {
  id: string
  title: string
  handle: string
  products: MedusaProduct[]
}

export interface MedusaCart {
  id: string
  items: MedusaLineItem[]
  total: number
  subtotal: number
  currency_code: string
}

export interface MedusaLineItem {
  id: string
  title: string
  thumbnail: string | null
  quantity: number
  unit_price: number
  product_id: string
  variant_id: string
  product_handle: string
}

// ─── Mapping ────────────────────────────────────────────────────────

export function mapMedusaProductToProperty(product: MedusaProduct): Property {
  return {
    id: product.id,
    title: product.title,
    subtitle: product.subtitle,
    description: product.description,
    handle: product.handle,
    thumbnail: product.thumbnail,
    images: product.images,
    price: product.variants[0]?.prices[0]?.amount || 0,
    currencyCode: product.variants[0]?.prices[0]?.currency_code || "PAB",
    variantId: product.variants[0]?.id || null,
    location: (product.metadata?.location as string) || null,
    area: (product.metadata?.area as string) || null,
    bedrooms: (product.metadata?.bedrooms as number) || null,
    bathrooms: (product.metadata?.bathrooms as number) || null,
    type: (product.metadata?.type as string) || null,
    status: "disponible",
    features: [],
    category: product.collection?.title || null,
    createdAt: product.created_at,
  }
}

// ─── Products ───────────────────────────────────────────────────────

export async function getProducts(params?: {
  limit?: number
  offset?: number
  collection_id?: string[]
  category_id?: string[]
  order?: string
  q?: string
}): Promise<{ products: MedusaProduct[]; count: number; offset: number; limit: number }> {
  const client = getMedusaClient()
  try {
    const response = await client.store.product.list({
      limit: params?.limit || 12,
      offset: params?.offset || 0,
      ...(params?.collection_id?.length ? { collection_id: params.collection_id } : {}),
      ...(params?.category_id?.length ? { category_id: params.category_id } : {}),
      ...(params?.q ? { q: params.q } : {}),
      fields: "*variants,*images,*categories,*collection",
    })
    return response as unknown as { products: MedusaProduct[]; count: number; offset: number; limit: number }
  } catch (error) {
    console.error("Error fetching products:", error)
    return { products: [], count: 0, offset: 0, limit: params?.limit || 12 }
  }
}

export async function getProductByHandle(handle: string): Promise<MedusaProduct | null> {
  const client = getMedusaClient()
  try {
    // Medusa v2 doesn't support retrieving by handle via GET /store/products/:id.
    // Instead, use the list endpoint with a handle filter.
    const response = await client.store.product.list({
      handle,
      limit: 1,
      fields: "*variants,*images,*categories,*collection",
    })
    return (response.products?.[0] as unknown as MedusaProduct) || null
  } catch (error) {
    console.error(`Error fetching product ${handle}:`, error)
    return null
  }
}

export async function getCollections(): Promise<MedusaCollection[]> {
  const client = getMedusaClient()
  try {
    const response = await client.store.collection.list({ fields: "*products" })
    return response.collections as unknown as MedusaCollection[]
  } catch (error) {
    console.error("Error fetching collections:", error)
    return []
  }
}

// ─── Cart ───────────────────────────────────────────────────────────

const CART_STORAGE_KEY = "karven_cart_id"

export function getStoredCartId(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(CART_STORAGE_KEY)
}

export function storeCartId(cartId: string): void {
  if (typeof window === "undefined") return
  localStorage.setItem(CART_STORAGE_KEY, cartId)
}

export function removeStoredCartId(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(CART_STORAGE_KEY)
}

export async function createCart(): Promise<MedusaCart | null> {
  const client = getMedusaClient()
  try {
    const response = await client.store.cart.create({
      currency_code: "pab",
    })
    const cart = response.cart as unknown as MedusaCart
    storeCartId(cart.id)
    return cart
  } catch (error) {
    console.error("Error creating cart:", error)
    return null
  }
}

export async function getOrCreateCart(): Promise<MedusaCart | null> {
  const existingId = getStoredCartId()
  if (existingId) {
    const cart = await retrieveCart(existingId)
    if (cart) return cart
    // Cart expired or invalid, create new one
    removeStoredCartId()
  }
  return createCart()
}

export async function retrieveCart(cartId: string): Promise<MedusaCart | null> {
  const client = getMedusaClient()
  try {
    const response = await client.store.cart.retrieve(cartId, {
      fields: "*items,*items.variant,*items.product",
    })
    return response.cart as unknown as MedusaCart
  } catch {
    return null
  }
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number = 1
): Promise<MedusaCart | null> {
  const client = getMedusaClient()
  try {
    const response = await client.store.cart.createLineItem(cartId, {
      variant_id: variantId,
      quantity,
    })
    return response.cart as unknown as MedusaCart
  } catch (error) {
    console.error("Error adding to cart:", error)
    return null
  }
}

export async function updateCartItem(
  cartId: string,
  lineItemId: string,
  quantity: number
): Promise<MedusaCart | null> {
  const client = getMedusaClient()
  try {
    const response = await client.store.cart.updateLineItem(cartId, lineItemId, {
      quantity,
    })
    return response.cart as unknown as MedusaCart
  } catch (error) {
    console.error("Error updating cart item:", error)
    return null
  }
}

export async function removeFromCart(
  cartId: string,
  lineItemId: string
): Promise<MedusaCart | null> {
  const client = getMedusaClient()
  try {
    const response = await client.store.cart.deleteLineItem(cartId, lineItemId)
    return response.cart as unknown as MedusaCart
  } catch (error) {
    console.error("Error removing from cart:", error)
    return null
  }
}

// ─── Formatting ─────────────────────────────────────────────────────

export function formatPrice(amount: number, currencyCode: string = "usd"): string {
  const symbols: Record<string, string> = { USD: "$", PAB: "B/.", MXN: "MX$", EUR: "\u20ac" }
  const code = currencyCode.toUpperCase()
  const sym = symbols[code] || "$"
  return `${sym}${amount.toLocaleString("es-PA", { minimumFractionDigits: 0 })}`
}
