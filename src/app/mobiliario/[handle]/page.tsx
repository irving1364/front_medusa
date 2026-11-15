import type { Metadata } from "next"
import Link from "next/link"
import { notFound, permanentRedirect } from "next/navigation"
import ProductDetail from "@/components/ProductDetail"
import { serverGetProductByHandle, serverGetProductRedirect, serverGetProducts, serverGetCategoryTree, SITE_URL } from "@/lib/medusa-server"
import { flatten } from "@/lib/categories"
import { ogImage } from "@/lib/og-image"

// One minute: a product published in the admin (or a 404 cached before it was published) refreshes quickly,
// which matters when a link is shared on WhatsApp right after publishing.
export const revalidate = 60

type Params = Promise<{ handle: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { handle } = await params
  const product = await serverGetProductByHandle(handle)
  if (!product) return { title: "Referencia no encontrada", robots: { index: false } }
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

export default async function ProductPage({ params }: { params: Params }) {
  const { handle } = await params
  const [product, tree] = await Promise.all([serverGetProductByHandle(handle), serverGetCategoryTree()])
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetail product={product} related={related} />
      {/* Crawlable fallback link in case the client bundle fails */}
      <noscript><p className="container-custom py-6 text-sm"><Link href="/mobiliario">Volver al mobiliario</Link></p></noscript>
    </>
  )
}
