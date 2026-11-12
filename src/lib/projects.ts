import "server-only"
import type { ProjectCardData } from "@/components/ProjectCard"
import { mapMedusaProduct, PRODUCT_FIELDS, type MedusaProduct } from "@/lib/medusa"
import { serverGetRegion } from "@/lib/medusa-server"
import type { Product } from "@/types"

export type ProjectLine = "medico" | "veterinario" | "tecnico"
export type ProjectStatus = "draft" | "review" | "approved" | "published"
export interface ProjectMedia { type: "image" | "video" | "embed"; url: string; alt?: string | null; poster?: string | null }

export interface Project {
  id: string
  title: string
  slug: string
  line: ProjectLine
  specialty: string | null
  work_type: string | null
  client_name: string | null
  location: string | null
  year: number | null
  summary: string | null
  client_need: string | null
  solution: string | null
  fabrication: string | null
  cover_url: string | null
  cover_alt: string | null
  gallery: ProjectMedia[]
  related_product_ids: string[]
  seo_title: string | null
  seo_description: string | null
  status: ProjectStatus
  published_at: string | null
  sort_order: number
  updated_at: string
}

export const LINE_LABEL: Record<ProjectLine, string> = { medico: "Mobiliario médico", veterinario: "Mobiliario veterinario", tecnico: "Mobiliario técnico" }
export const LINE_SHORT: Record<ProjectLine, string> = { medico: "Médico", veterinario: "Veterinario", tecnico: "Técnico" }
export const LINE_HANDLE: Record<ProjectLine, string> = { medico: "mobiliario-medico", veterinario: "mobiliario-veterinario", tecnico: "mobiliario-tecnico" }
export const STATUS_LABEL: Record<ProjectStatus, string> = { draft: "Borrador", review: "En revisión", approved: "Aprobado", published: "Publicado" }

const BACKEND = (process.env.MEDUSA_BACKEND_URL || process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000").trim().replace(/\/$/, "")
const KEY = (process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY || "").trim()
const PREVIEW_SECRET = (process.env.PROJECT_PREVIEW_SECRET || "").trim()

async function get<T>(path: string, revalidate: number): Promise<T | null> {
  try {
    const res = await fetch(`${BACKEND}/store${path}`, { headers: { "x-publishable-api-key": KEY }, next: { revalidate } })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch (error) {
    console.error(`Projects fetch failed: ${path}`, error)
    return null
  }
}

/** Published projects, admin order first then newest. Cached one minute. */
export async function serverGetProjects(line?: ProjectLine): Promise<Project[]> {
  const data = await get<{ projects: Project[] }>(`/projects?limit=100${line ? `&line=${line}` : ""}`, 60)
  return data?.projects || []
}

/** One project by slug. With a valid preview token, unpublished projects are returned uncached. */
export async function serverGetProject(slug: string, previewToken?: string): Promise<{ project: Project; preview: boolean } | null> {
  const preview = !!PREVIEW_SECRET && previewToken === PREVIEW_SECRET
  const qs = preview ? `?preview=${encodeURIComponent(PREVIEW_SECRET)}` : ""
  const data = await get<{ project: Project; preview: boolean }>(`/projects/${encodeURIComponent(slug)}${qs}`, preview ? 0 : 60)
  return data?.project ? { project: data.project, preview: !!data.preview } : null
}

/** Catalogue products linked from a project ("Mobiliario utilizado"), in the admin's order. */
export async function serverGetProjectProducts(ids: string[]): Promise<Product[]> {
  if (!ids.length) return []
  const region = await serverGetRegion()
  const qs = ids.map((id) => `id[]=${encodeURIComponent(id)}`).join("&")
  const data = await get<{ products: MedusaProduct[] }>(`/products?${qs}&limit=${ids.length}${region ? `&region_id=${region.id}` : ""}&fields=${encodeURIComponent(PRODUCT_FIELDS)}`, 300)
  const products = (data?.products || []).map(mapMedusaProduct)
  return ids.map((id) => products.find((p) => p.id === id)).filter((p): p is Product => !!p)
}

/** Split admin textareas into paragraphs. */
export const paragraphs = (text?: string | null) => (text || "").split(/\n\s*\n|\r\n\s*\r\n/).map((p) => p.trim()).filter(Boolean)

/** Embed URL for YouTube, Vimeo and Instagram links; null when the URL is not embeddable. */
export function embedUrl(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/)
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0`
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`
  const ig = url.match(/instagram\.com\/(?:p|reel)\/([\w-]+)/)
  if (ig) return `https://www.instagram.com/p/${ig[1]}/embed/`
  return null
}

/** Flat card data for ProjectCard / ProjectsGrid (cover falls back to the first gallery image). */
export const projectCard = (p: Project): ProjectCardData => ({
  slug: p.slug,
  title: p.title,
  line: p.line,
  lineLabel: LINE_SHORT[p.line],
  specialty: p.specialty,
  summary: p.summary,
  cover: p.cover_url || p.gallery.find((g) => g.type === "image")?.url || null,
  coverAlt: p.cover_alt || p.title,
  year: p.year,
})
