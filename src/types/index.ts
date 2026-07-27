export interface Property {
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
  location: string | null
  area: string | null
  bedrooms: number | null
  bathrooms: number | null
  type: string | null
  status: "disponible" | "vendido" | "rentado"
  features: string[]
  category: string | null
  createdAt: string
}

export interface PropertyFilters {
  category?: string
  type?: string
  minPrice?: number
  maxPrice?: number
  location?: string
  status?: string
  search?: string
}
