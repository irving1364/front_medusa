import type { Metadata } from "next"
import { Suspense } from "react"
import CatalogView from "./CatalogView"
import { serverGetProducts } from "@/lib/medusa-server"

export const revalidate = 300

export const metadata: Metadata = {
  title: "Mobiliario",
  description:
    "Catálogo de mobiliario médico, veterinario y técnico en acero inoxidable: camillas, mesas, carros, lavamanos, jaulas, mesones y gabinetes. Diseñado y fabricado en Panamá por KARVEN Medical.",
  alternates: { canonical: "/mobiliario" },
}

export default async function CataloguePage() {
  const products = await serverGetProducts({ limit: 200 })
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <CatalogView initialProducts={products} />
    </Suspense>
  )
}
