import type { Metadata } from "next"
import { Suspense } from "react"
import CatalogView from "./CatalogView"

export const metadata: Metadata = {
  title: "Catálogo de mobiliario médico",
  description:
    "Camillas, mesas quirúrgicas, unidades odontológicas, mobiliario de consultorio, laboratorio y carros de enfermería. Cotización formal en 48 horas.",
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <CatalogView />
    </Suspense>
  )
}
