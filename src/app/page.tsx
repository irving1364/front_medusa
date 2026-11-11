import ShowcaseHome from "@/components/showcase/ShowcaseHome"
import { serverGetCategoryTree, serverGetFeaturedProducts } from "@/lib/medusa-server"
import { getInstagramPosts } from "@/lib/instagram"

// Home refreshes every minute so curated products (Destacados) show up quickly after a change in the admin.
export const revalidate = 60

/** The only home. Lines and the curated "Destacados" products are fetched on the server so crawlers see real links and copy. */
export default async function Home() {
  const [lines, products, instagram] = await Promise.all([serverGetCategoryTree(), serverGetFeaturedProducts(3), getInstagramPosts(6)])
  return <ShowcaseHome lines={lines} products={products} instagram={instagram} />
}
