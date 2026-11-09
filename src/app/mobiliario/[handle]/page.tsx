import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import ProductDetail from "@/components/ProductDetail"
import { serverGetProductByHandle, serverGetProducts, serverGetCategoryTree, SITE_URL } from "@/lib/medusa-server"
import { flatten } from "@/lib/categories"

export const revalidate = 300

type Params = Promise<{ handle: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { handle } = await params
  const product = await serverGetProductByHandle(handle)
  if (!product) return { title: "Referencia no encontrada", robots: { index: false } }
  const title = product.title
  const description = (product.description || product.subtitle || `${product.title}, mobiliario en acero inoxidable fabricado en Panamá por KARVEN Medical.`).slice(0, 155)
  const image = product.thumbnail || product.images[0]?.url
  return {
    title,
    description,
    alternates: { canonical: `/mobiliario/${product.handle}` },
    openGraph: {
      title: `${title} | KARVEN Medical`,
      description,
      type: "website",
      url: `/mobiliario/${product.handle}`,
      ...(image ? { images: [{ url: image, alt: `${product.title} KARVEN en acero inoxidable` }] } : {}),
    },
    twitter: { card: "summary_large_image", title: `${title} | KARVEN Medical`, description, ...(image ? { images: [image] } : {}) },
  }
}

export default async function ProductPage({ params }: { params: Params }) {
  const { handle } = await params
  const [product, tree] = await Promise.all([serverGetProductByHandle(handle), serverGetCategoryTree()])
  if (!product) notFound()

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
        offers: product.variants.length > 1
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
            },
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
