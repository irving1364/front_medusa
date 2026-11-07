/**
 * Static catalogue structure used by the UI (category tiles, filters, footer).
 * Handles must match the Medusa collections created by scripts/seed-medusa.mjs.
 * Images are temporary stock photos until real product photography is uploaded.
 */
export interface CatalogCategory {
  handle: string
  title: string
  short: string
  description: string
  image: string
}

export const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

export const CATEGORIES: CatalogCategory[] = [
  {
    handle: "camillas-y-camas",
    title: "Camillas y camas hospitalarias",
    short: "Camillas y camas",
    description: "Eléctricas, hidráulicas y manuales. Posiciones clínicas, barandas y colchón de alta densidad.",
    image: unsplash("1512678080530-7760d81faba6"),
  },
  {
    handle: "mesas-quirurgicas",
    title: "Mesas quirúrgicas",
    short: "Mesas quirúrgicas",
    description: "Mesas de operaciones con control electrohidráulico, accesorios y compatibilidad radiológica.",
    image: unsplash("1516549655169-df83a0774514"),
  },
  {
    handle: "unidades-odontologicas",
    title: "Unidades odontológicas",
    short: "Odontología",
    description: "Sillones y unidades dentales integradas, lámparas LED y módulos de instrumentos.",
    image: unsplash("1629909613654-28e377c37b09"),
  },
  {
    handle: "consultorio",
    title: "Mobiliario de consultorio",
    short: "Consultorio",
    description: "Escritorios, camillas de examen, vitrinas, taburetes y recepción para la práctica privada.",
    image: unsplash("1666214280557-f1b5022eb634"),
  },
  {
    handle: "laboratorio",
    title: "Laboratorio",
    short: "Laboratorio",
    description: "Mesones técnicos, estanterías de acero inoxidable y estaciones de trabajo para laboratorio clínico.",
    image: unsplash("1583912086096-8c60d75a53f9"),
  },
  {
    handle: "carros-y-estaciones",
    title: "Carros y estaciones de enfermería",
    short: "Enfermería",
    description: "Carros de curaciones, de medicación y de paro, con cajones modulares y ruedas antiestáticas.",
    image: unsplash("1538108149393-fbbd81895907"),
  },
]

export const HERO_IMAGE = unsplash("1551076805-e1869033e561", 1800)
export const ABOUT_IMAGE = unsplash("1504439468489-c8920d796a29", 1800)
export const CTA_IMAGE = unsplash("1519494026892-80bbd2d6fd0d", 1800)

export function getCategory(handle: string | null | undefined): CatalogCategory | undefined {
  return CATEGORIES.find((c) => c.handle === handle)
}
