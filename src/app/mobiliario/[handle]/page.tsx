import type { Metadata } from "next"
import Link from "next/link"
import { notFound, permanentRedirect } from "next/navigation"
import ProductDetail from "@/components/ProductDetail"
import { serverGetProductByHandle, serverGetProductPreview, serverGetProductRedirect, serverGetProducts, serverGetCategoryTree, SITE_URL } from "@/lib/medusa-server"
import { AVAILABILITY_LABEL } from "@/types"
import { flatten } from "@/lib/categories"
import { ogImage } from "@/lib/og-image"

// One minute: a product published in the admin (or a 404 cached before it was published) refreshes quickly,
// which matters when a link is shared on WhatsApp right after publishing.
export const revalidate = 60

type Params = Promise<{ handle: string }>
type Search = Promise<{ preview?: string }>

/** Published product, or (with the shared secret) a draft for the admin preview. */
const load = async (params: Params, searchParams: Search) => {
  const [{ handle }, { preview }] = await Promise.all([params, searchParams])
  const product = await serverGetProductByHandle(handle)
  if (product) return { product, preview: false }
  const draft = preview ? await serverGetProductPreview(handle, preview) : null
  return { product: draft, preview: !!draft }
}

export async function generateMetadata({ params, searchParams }: { params: Params; searchParams: Search }): Promise<Metadata> {
  const { product, preview } = await load(params, searchParams)
  if (!product) return { title: "Referencia no encontrada", robots: { index: false } }
  if (preview) return { title: { absolute: `Vista previa · ${product.title}` }, robots: { index: false, follow: false } }
  const title = product.title
  const seoTitle = product.seoTitle?.trim() || `${title} | KARVEN Medical`
  const description = (product.seoDescription?.trim() || product.description || product.subtitle || `${product.title}, mobiliario en acero inoxidable fabricado en Panamá por KARVEN Medical.`).slice(0, 160)
  const imageUrl = product.thumbnail || product.images[0]?.url
  const image = imageUrl ? await ogImage(imageUrl, `${product.title} KARVEN en acero inoxidable`) : null
  return {
    title: { absolute: seoTitle },
    description,
    alternates: { canonical: `/mobiliario/${product.handle}` },
    openGraph: {
      title: seoTitle,
      description,
      type: "website",
      url: `/mobiliario/${product.handle}`,
      ...(image ? { images: [image] } : {}),
    },
    twitter: { card: "summary_large_image", title: seoTitle, description, ...(image ? { images: [image.url] } : {}) },
  }
}

export default async function ProductPage({ params, searchParams }: { params: Params; searchParams: Search }) {
  const { handle } = await params
  const [{ product, preview }, tree] = await Promise.all([load(params, searchParams), serverGetCategoryTree()])
  if (!product) {
    // The admin may have renamed the URL of a published product: follow the stored redirect
    const target = await serverGetProductRedirect(handle)
    if (target && target !== handle) permanentRedirect(`/mobiliario/${target}`)
    notFound()
  }

  const categoryHandle = product.categories[0]?.handle
  const all = flatten(tree)
  const category = all.find((c) => c.handle === categoryHandle)
  const line = category?.parentHandle ? all.find((c) => c.handle === category.parentHandle) : undefined
  const related = categoryHandle
    ? (await serverGetProducts({ limit: 60 })).filter((r) => r.id !== product.id && r.categories.some((c) => c.handle === categoryHandle)).slice(0, 3)
    : []

  const images = product.images.length ? product.images.map((i) => i.url) : product.thumbnail ? [product.thumbnail] : []
  const url = `${SITE_URL}/mobiliario/${product.handle}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${url}#product`,
        name: product.title,
        description: product.description || product.subtitle || product.title,
        image: images,
        sku: product.sku || product.id,
        brand: { "@type": "Brand", name: "KARVEN Medical" },
        manufacturer: { "@type": "Organization", name: "FABMETAL" },
        ...(product.material ? { material: product.material } : {}),
        ...(category ? { category: category.name } : {}),
        url,
        ...(product.showPrice && product.price > 0 && product.availability !== "unavailable" ? { offers: product.variants.length > 1
          ? {
              "@type": "AggregateOffer",
              priceCurrency: product.currencyCode,
              lowPrice: Math.min(...product.variants.map((v) => v.price)),
              highPrice: Math.max(...product.variants.map((v) => v.price)),
              offerCount: product.variants.length,
              availability: "https://schema.org/MadeToOrder",
              url,
            }
          : {
              "@type": "Offer",
              price: product.price,
              priceCurrency: product.currencyCode,
              availability: "https://schema.org/MadeToOrder",
              url,
            } } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Mobiliario", item: `${SITE_URL}/mobiliario` },
          ...(line ? [{ "@type": "ListItem", position: 2, name: line.name, item: `${SITE_URL}/${line.handle}` }] : []),
          { "@type": "ListItem", position: line ? 3 : 2, name: product.title, item: url },
        ],
      },
    ],
  }

  return (
    <>
      {!preview && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      {preview && (
        <div className="container-custom pt-24 lg:pt-28 -mb-20 lg:-mb-24 relative z-10">
          <div className="flex flex-wrap items-center gap-3 rounded-xl glass px-4 py-3 text-sm text-ink">
            <span className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-teal animate-pulse" /> Vista previa</span>
            <span className="text-text-3">Borrador · {AVAILABILITY_LABEL[product.availability]}. Esta página no es pública ni se indexa.</span>
          </div>
        </div>
      )}
      <ProductDetail product={product} related={related} />
      {/* Crawlable fallback link in case the client bundle fails */}
      <noscript><p className="container-custom py-6 text-sm"><Link href="/mobiliario">Volver al mobiliario</Link></p></noscript>
    </>
  )
}
