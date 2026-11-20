import type { Metadata } from "next"
import ShowcaseHomeLegacy from "@/components/showcase/legacy/ShowcaseHomeLegacy"
import { serverGetCategoryTree, serverGetFeaturedProducts } from "@/lib/medusa-server"
import { getInstagramPosts } from "@/lib/instagram"
import { projectCard, serverGetProjects } from "@/lib/projects"

export const revalidate = 60

/** Backup of the previous cinematic home (before the client's mockup); not indexed. */
export const metadata: Metadata = {
  title: "Home anterior (respaldo)",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
}

export default async function Home2() {
  const [lines, products, instagram, projects] = await Promise.all([serverGetCategoryTree(), serverGetFeaturedProducts(3), getInstagramPosts(6), serverGetProjects()])
  return <ShowcaseHomeLegacy lines={lines} products={products} instagram={instagram} projects={projects.slice(0, 3).map(projectCard)} />
}
