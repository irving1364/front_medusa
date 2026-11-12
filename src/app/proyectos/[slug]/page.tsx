import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi"
import Reveal from "@/components/ui/Reveal"
import ProductCard from "@/components/ProductCard"
import ProjectGallery, { type GalleryMedia } from "@/components/ProjectGallery"
import { SITE_URL } from "@/lib/medusa-server"
import { LINE_HANDLE, LINE_LABEL, STATUS_LABEL, embedUrl, paragraphs, serverGetProject, serverGetProjectProducts, type Project } from "@/lib/projects"

export const revalidate = 60

type Params = Promise<{ slug: string }>
type Search = Promise<{ preview?: string }>

const load = async (params: Params, searchParams: Search) => {
  const [{ slug }, { preview }] = await Promise.all([params, searchParams])
  return serverGetProject(slug, preview)
}

export async function generateMetadata({ params, searchParams }: { params: Params; searchParams: Search }): Promise<Metadata> {
  const data = await load(params, searchParams)
  if (!data) return { title: "Proyecto no encontrado" }
  const { project: p, preview } = data
  const title = p.seo_title?.trim() || `${p.title} | Proyectos | KARVEN Medical`
  const description = p.seo_description?.trim() || p.summary?.trim() || `${p.title}: proyecto de ${LINE_LABEL[p.line].toLowerCase()} desarrollado y fabricado en Panamá por KARVEN Medical.`
  const cover = p.cover_url || p.gallery.find((g) => g.type === "image")?.url
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/proyectos/${p.slug}` },
    robots: preview ? { index: false, follow: false } : undefined,
    openGraph: { title, description, url: `/proyectos/${p.slug}`, type: "article", ...(cover ? { images: [{ url: cover, alt: p.cover_alt || p.title }] } : {}) },
  }
}

const media = (p: Project): GalleryMedia[] => {
  const items: GalleryMedia[] = p.gallery.map((g) => ({ type: g.type, url: g.url, alt: g.alt || p.cover_alt || p.title, embed: g.type === "embed" ? embedUrl(g.url) : null, poster: g.poster || null }))
  if (p.cover_url && !items.some((m) => m.url === p.cover_url)) items.unshift({ type: "image", url: p.cover_url, alt: p.cover_alt || p.title, embed: null, poster: null })
  return items.filter((m) => m.type !== "embed" || m.embed)
}

const Block = ({ n, title, text }: { n: string; title: string; text: string | null }) => {
  const ps = paragraphs(text)
  if (!ps.length) return null
  return (
    <Reveal as="section" className="rule pt-6 grid md:grid-cols-12 gap-4 md:gap-8" stagger={0.1}>
      <div className="md:col-span-4 flex items-baseline gap-3">
        <span className="mono text-sm text-teal">{n}</span>
        <h2 className="font-display text-xl text-ink">{title}</h2>
      </div>
      <div className="md:col-span-8 space-y-4 body-lg text-text-2">
        {ps.map((t, i) => <p key={i}>{t}</p>)}
      </div>
    </Reveal>
  )
}

/** Public project page: gallery, ficha técnica, narrative blocks, furniture used and a quote CTA. */
export default async function ProjectPage({ params, searchParams }: { params: Params; searchParams: Search }) {
  const data = await load(params, searchParams)
  if (!data) notFound()
  const { project: p, preview } = data
  const products = await serverGetProjectProducts(p.related_product_ids || [])
  const items = media(p)
  const facts = [
    ["Especialidad", p.specialty],
    ["Tipo de trabajo", p.work_type],
    ["Línea", LINE_LABEL[p.line]],
    ["Cliente", p.client_name],
    ["Ubicación", p.location],
    ["Año", p.year ? String(p.year) : null],
  ].filter((f): f is [string, string] => !!f[1])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.seo_description || p.summary || undefined,
    url: `${SITE_URL}/proyectos/${p.slug}`,
    image: p.cover_url || undefined,
    datePublished: p.published_at || undefined,
    creator: { "@type": "Organization", name: "KARVEN Medical", url: SITE_URL },
  }

  return (
    <div className="bg-paper pt-28 lg:pt-32 pb-20">
      {!preview && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <div className="container-custom">
        {preview && (
          <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl glass px-4 py-3 text-sm text-ink">
            <span className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-teal animate-pulse" /> Vista previa</span>
            <span className="text-text-3">Estado: {STATUS_LABEL[p.status]}. Esta página no es pública ni se indexa.</span>
          </div>
        )}
        <nav aria-label="Ruta" className="text-sm text-text-3">
          <Link href="/proyectos" className="hover:text-ink">Proyectos</Link><span className="mx-2">/</span><span className="text-text-2">{p.title}</span>
        </nav>

        <Reveal as="header" className="rule-strong mt-4 pt-5 grid lg:grid-cols-12 gap-6 items-end" stagger={0.1}>
          <div className="lg:col-span-8">
            <p className="eyebrow text-teal">{[LINE_LABEL[p.line], p.specialty].filter(Boolean).join(" · ")}</p>
            <h1 className="display-lg mt-4 text-ink text-balance">{p.title}</h1>
            {p.summary && <p className="subtitle mt-4 max-w-2xl">{p.summary}</p>}
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link href="/contacto" className="btn btn-teal">Solicitar una solución similar <FiArrowRight className="w-4 h-4" /></Link>
          </div>
        </Reveal>

        {items.length > 0 && (
          <Reveal className="mt-10" distance={28}>
            <ProjectGallery items={items} title={p.title} />
          </Reveal>
        )}

        {facts.length > 0 && (
          <Reveal as="section" className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 rule-strong pt-6" stagger={0.06}>
            {facts.map(([k, v]) => (
              <div key={k}>
                <p className="mono text-[10px] uppercase tracking-[0.14em] text-text-3">{k}</p>
                <p className="mt-1.5 text-ink font-medium">{k === "Línea" ? <Link href={`/${LINE_HANDLE[p.line]}`} className="hover:text-teal">{v}</Link> : v}</p>
              </div>
            ))}
          </Reveal>
        )}

        <div className="mt-14 space-y-10">
          <Block n="01" title="Necesidad del cliente" text={p.client_need} />
          <Block n="02" title="Solución desarrollada" text={p.solution} />
          <Block n="03" title="Fabricación y verificación" text={p.fabrication} />
        </div>

        {products.length > 0 && (
          <section className="mt-20">
            <Reveal className="rule-strong pt-6 grid lg:grid-cols-12 gap-6 items-end" stagger={0.1}>
              <div className="lg:col-span-8">
                <p className="eyebrow text-teal">Mobiliario utilizado</p>
                <h2 className="display-md mt-4 text-ink">Piezas de catálogo en este proyecto</h2>
              </div>
              <div className="lg:col-span-4 lg:text-right"><Link href="/mobiliario" className="link-arrow">Ver todo el catálogo</Link></div>
            </Reveal>
            <Reveal as="ul" className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.1}>
              {products.map((prod) => <li key={prod.id}><ProductCard product={prod} /></li>)}
            </Reveal>
          </section>
        )}

        <Reveal className="mt-20">
          <div className="panel p-8 sm:p-12 grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow text-teal">¿Necesita una solución similar?</p>
              <h2 className="display-md mt-4 text-ink text-balance">Solicite una cotización indicando las características y cantidades necesarias.</h2>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
              <Link href="/contacto" className="btn btn-teal">Solicitar cotización <FiArrowRight className="w-4 h-4" /></Link>
              <Link href="/proyectos" className="inline-flex items-center gap-1.5 text-sm text-text-2 hover:text-ink">Ver más proyectos <FiArrowUpRight className="w-3.5 h-3.5" /></Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
