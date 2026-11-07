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
  /** Technical specs read from Medusa product metadata */
  material: string | null
  gauge: string | null
  finish: string | null
  dimensions: string | null
  capacity: string | null
  wheels: string | null
  options: string | null
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
