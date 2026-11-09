import ShowcaseHome from "@/components/showcase/ShowcaseHome"
import { serverGetCategoryTree, serverGetProducts } from "@/lib/medusa-server"

export const revalidate = 300

/** The only home. Lines and featured products are fetched on the server so crawlers see real links and copy. */
export default async function Home() {
  const [lines, products] = await Promise.all([serverGetCategoryTree(), serverGetProducts({ limit: 6 })])
  return <ShowcaseHome lines={lines} products={products.filter((p) => p.thumbnail).slice(0, 3)} />
}
