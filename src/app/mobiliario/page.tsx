import type { Metadata } from "next"
import { Suspense } from "react"
import CatalogView from "./CatalogView"

export const metadata: Metadata = {
  title: "Mobiliario",
  description:
    "Catálogo de mobiliario clínico en acero inoxidable: clínico fijo y móvil, quirúrgico, higiene, laboratorio, patología y arquitectura clínica. Fabricado en Panamá.",
}

export default function EquipmentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <CatalogView />
    </Suspense>
  )
}
