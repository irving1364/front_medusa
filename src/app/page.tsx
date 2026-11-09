import ShowcaseHome from "@/components/showcase/ShowcaseHome"
import { serverGetCategoryTree, serverGetFeaturedProducts } from "@/lib/medusa-server"

export const revalidate = 300

/** The only home. Lines and the curated "Destacados" products are fetched on the server so crawlers see real links and copy. */
export default async function Home() {
  const [lines, products] = await Promise.all([serverGetCategoryTree(), serverGetFeaturedProducts(3)])
  return <ShowcaseHome lines={lines} products={products} />
}
