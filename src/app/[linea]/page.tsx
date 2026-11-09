import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FiArrowLeft } from "react-icons/fi"
import FamilyIcon from "@/components/ui/FamilyIcon"
import LineCatalog from "./LineCatalog"
import { serverGetCategoryTree, serverGetProducts, SITE_URL } from "@/lib/medusa-server"

export const revalidate = 300
/** Only the three product lines resolve here; anything else is a 404. */
export const dynamicParams = false

type Params = Promise<{ linea: string }>

const SEO_TITLE: Record<string, string> = {
  "mobiliario-medico": "Mobiliario médico en Panamá",
  "mobiliario-veterinario": "Mobiliario veterinario en Panamá",
  "mobiliario-tecnico": "Mobiliario técnico en Panamá",
}

export async function generateStaticParams() {
  const tree = await serverGetCategoryTree()
  return tree.map((line) => ({ linea: line.handle }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { linea } = await params
  const line = (await serverGetCategoryTree()).find((l) => l.handle === linea)
  if (!line) return { title: "Línea no encontrada", robots: { index: false } }
  const title = SEO_TITLE[line.handle] || `${line.name} en Panamá`
  const description = `${line.name}: ${line.children.map((c) => c.name.toLowerCase()).join(", ")}. Diseñado y fabricado en Panamá por KARVEN Medical con respaldo de FABMETAL.`.slice(0, 158)
  return {
    title,
    description,
    alternates: { canonical: `/${line.handle}` },
    openGraph: { title: `${title} | KARVEN Medical`, description, type: "website", url: `/${line.handle}`, images: [{ url: line.image, alt: line.name }] },
  }
}

export default async function LinePage({ params }: { params: Params }) {
  const { linea } = await params
  const [tree, allProducts] = await Promise.all([serverGetCategoryTree(), serverGetProducts({ limit: 200 })])
  const line = tree.find((l) => l.handle === linea)
  if (!line) notFound()
  const handles = new Set(line.children.map((c) => c.handle))
  const products = allProducts.filter((p) => p.categories.some((c) => handles.has(c.handle)))
  const url = `${SITE_URL}/${line.handle}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        name: SEO_TITLE[line.handle] || line.name,
        description: line.description,
        url,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: products.length,
          itemListElement: products.slice(0, 50).map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.title, url: `${SITE_URL}/mobiliario/${p.handle}` })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Mobiliario", item: `${SITE_URL}/mobiliario` },
          { "@type": "ListItem", position: 2, name: line.name, item: url },
        ],
      },
    ],
  }

  return (
    <div className="bg-paper pt-28 lg:pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-custom">
        <nav className="flex items-center gap-2 text-xs text-text-3" aria-label="Ruta">
          <Link href="/mobiliario" className="inline-flex items-center gap-1.5 hover:text-ink"><FiArrowLeft className="w-3.5 h-3.5" /> Mobiliario</Link>
          <span>/</span><span className="text-ink">{line.name}</span>
        </nav>
        <div className="rule-strong mt-4 pt-5 grid lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow text-teal">Línea de mobiliario</p>
            <h1 className="display-lg mt-4 text-ink text-balance flex items-center gap-4">
              <span className="hidden sm:inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-soft text-teal shrink-0"><FamilyIcon name={line.line} className="w-7 h-7" /></span>
              {line.name}
            </h1>
          </div>
          <p className="lg:col-span-4 text-base leading-relaxed text-text-2">{line.description}</p>
        </div>

        {/* Line switcher: real links */}
        <nav className="mt-10 flex gap-1.5 overflow-x-auto -mx-5 px-5 lg:mx-0 lg:px-0 pb-1 [scrollbar-width:none]" aria-label="Líneas de mobiliario">
          <Link href="/mobiliario" className="shrink-0 px-3.5 py-2 rounded-full text-[13px] font-medium border border-line text-text-2 hover:border-ink hover:text-ink transition-colors">Todo</Link>
          {tree.map((l) => (
            <Link key={l.handle} href={`/${l.handle}`} aria-current={l.handle === line.handle ? "page" : undefined} className={`shrink-0 px-3.5 py-2 rounded-full text-[13px] font-medium border transition-colors ${l.handle === line.handle ? "bg-ink text-paper border-ink" : "border-line text-text-2 hover:border-ink hover:text-ink"}`}>
              {l.name.replace("Mobiliario ", "")}
            </Link>
          ))}
        </nav>
      </div>

      <LineCatalog line={line} products={products} />
    </div>
  )
}
