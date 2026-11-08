import type { Metadata } from "next"
import ShowcaseHome from "@/components/showcase/ShowcaseHome"

export const metadata: Metadata = {
  title: "Inicio (showcase)",
  description: "Versión cinematográfica del inicio de Karven: mobiliario clínico en acero inoxidable, fabricado en Panamá.",
  robots: { index: false, follow: true },
}

export default function ShowcasePage() {
  return <ShowcaseHome />
}
