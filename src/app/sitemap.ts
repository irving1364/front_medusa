import type { MetadataRoute } from "next"
import { serverGetCategoryTree, serverGetProducts, SITE_URL } from "@/lib/medusa-server"

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/mobiliario`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/fabricacion`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/proyectos`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/nosotros`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contacto`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ]
  const [tree, products] = await Promise.all([serverGetCategoryTree(), serverGetProducts({ limit: 200 })])
  const lines: MetadataRoute.Sitemap = tree.map((line) => ({ url: `${SITE_URL}/${line.handle}`, lastModified: now, changeFrequency: "weekly", priority: 0.9 }))
  const items: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/mobiliario/${p.handle}`,
    lastModified: p.createdAt ? new Date(p.createdAt) : now,
    changeFrequency: "monthly",
    priority: 0.8,
    ...(p.thumbnail ? { images: [p.thumbnail] } : {}),
  }))
  return [...staticPages, ...lines, ...items]
}
