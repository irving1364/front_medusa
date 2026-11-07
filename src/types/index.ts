export interface Product {
  id: string
  title: string
  subtitle: string | null
  description: string | null
  handle: string
  thumbnail: string | null
  images: { id: string; url: string }[]
  price: number
  currencyCode: string
  variantId: string | null
  sku: string | null
  collection: { title: string; handle: string } | null
  /** Specs read from Medusa product metadata */
  material: string | null
  dimensions: string | null
  capacity: string | null
  warranty: string | null
  color: string | null
  features: string[]
  badge: string | null
  createdAt: string
}

export interface Collection {
  id: string
  title: string
  handle: string
}

export interface ProductFilters {
  collection?: string
  search?: string
  sort?: "newest" | "price-asc" | "price-desc"
}
