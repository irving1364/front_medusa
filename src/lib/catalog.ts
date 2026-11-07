/**
 * Catalogue taxonomy for Karven Medical Furniture.
 *
 * Medusa keeps a flat list of collections (one per subfamily, matched by handle).
 * The family → subfamily hierarchy and the "entornos" (rooms) live here so the
 * UI can render indexes, filters and room-based browsing without extra API calls.
 * Keep handles in sync with scripts/seed-medusa.mjs.
 *
 * Images are temporary stock photos; they are rendered through a uniform
 * grayscale treatment (see .plate in globals.css) until real product photography exists.
 */
export type FamilyIconName = "fixed" | "mobile" | "surgical" | "hygiene" | "lab" | "pathology" | "architecture"

export interface Subfamily {
  handle: string
  title: string
  description: string
  image: string
}

export interface Family {
  handle: string
  number: string
  title: string
  short: string
  icon: FamilyIconName
  description: string
  image: string
  subfamilies: Subfamily[]
}

export interface Environment {
  handle: string
  title: string
  description: string
  image: string
  subfamilies: string[]
}

export const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

const IMG = {
  bed: unsplash("1512678080530-7760d81faba6"),
  ward: unsplash("1538108149393-fbbd81895907"),
  orTable: unsplash("1516549655169-df83a0774514"),
  orRoom: unsplash("1551076805-e1869033e561"),
  orTeam: unsplash("1504439468489-c8920d796a29"),
  dental: unsplash("1629909613654-28e377c37b09"),
  lab: unsplash("1583912086096-8c60d75a53f9"),
  shelving: unsplash("1579684385127-1ef15d508118"),
  reception: unsplash("1519494026892-80bbd2d6fd0d"),
  consult: unsplash("1666214280557-f1b5022eb634"),
  labBench: unsplash("1581594549595-35f6edc7b762"),
}

export const FAMILIES: Family[] = [
  {
    handle: "clinico-fijo",
    number: "01",
    title: "Clínico fijo",
    short: "Clínico fijo",
    icon: "fixed",
    description: "Mesas, camillas y mobiliario de consulta en acero inoxidable 304. Piezas estáticas para examen, curaciones y atención ambulatoria.",
    image: IMG.bed,
    subfamilies: [
      { handle: "mesas-clinicas", title: "Mesas clínicas", description: "Mesas de examen, curaciones y procedimientos menores.", image: IMG.consult },
      { handle: "camillas-y-camas", title: "Camillas clínicas", description: "Camillas de examen, de traslado y camas de hospitalización.", image: IMG.bed },
      { handle: "consultorio", title: "Mobiliario clínico en acero inoxidable", description: "Vitrinas, escritorios, taburetes y gabinetes para consultorio.", image: IMG.reception },
      { handle: "unidades-odontologicas", title: "Unidades odontológicas", description: "Sillones y unidades dentales integradas con módulo de instrumentos.", image: IMG.dental },
    ],
  },
  {
    handle: "clinico-movil",
    number: "02",
    title: "Clínico móvil",
    short: "Clínico móvil",
    icon: "mobile",
    description: "Carros y soportes rodantes para transporte, procedimientos, hospitalización y aislamiento. Ruedas antiestáticas y freno en todas las referencias.",
    image: IMG.ward,
    subfamilies: [
      { handle: "carros-de-transporte", title: "Carros de transporte clínico", description: "Transporte de ropa, instrumental y material estéril.", image: IMG.ward },
      { handle: "carros-y-estaciones", title: "Carros de procedimientos", description: "Curaciones, medicación y procedimientos al pie de cama.", image: IMG.orRoom },
      { handle: "carros-quirurgicos", title: "Carros quirúrgicos", description: "Carros de anestesia, instrumental y apoyo en quirófano.", image: IMG.orTeam },
      { handle: "carros-de-hospitalizacion", title: "Carros de hospitalización", description: "Carros de enfermería, historias clínicas y paro.", image: IMG.ward },
      { handle: "carros-de-aislamiento", title: "Carros de aislamiento", description: "Equipos de protección y desechos para áreas de aislamiento.", image: IMG.reception },
      { handle: "atriles-y-soportes", title: "Atriles clínicos y soportes móviles", description: "Portasueros, soportes de monitor y bases rodantes.", image: IMG.bed },
    ],
  },
  {
    handle: "quirurgico",
    number: "03",
    title: "Quirúrgico",
    short: "Quirúrgico",
    icon: "surgical",
    description: "Mesas de operaciones y mesas de instrumental para quirófano y cirugía ambulatoria.",
    image: IMG.orTable,
    subfamilies: [
      { handle: "mesas-quirurgicas", title: "Mesas quirúrgicas", description: "Mesas de operaciones hidráulicas y electrohidráulicas.", image: IMG.orTable },
      { handle: "mesas-de-instrumental", title: "Mesas de instrumental", description: "Mesas Mayo, mesas riñón y mesas auxiliares de quirófano.", image: IMG.orRoom },
    ],
  },
  {
    handle: "higiene",
    number: "04",
    title: "Higiene",
    short: "Higiene",
    icon: "hygiene",
    description: "Lavamanos quirúrgicos y estaciones de lavado clínico en acero inoxidable 316, con grifería de accionamiento sin manos.",
    image: IMG.orRoom,
    subfamilies: [
      { handle: "lavamanos-quirurgicos", title: "Lavamanos quirúrgicos", description: "Uno a tres puestos, con sensor o rodilla.", image: IMG.orRoom },
      { handle: "estaciones-de-lavado", title: "Estaciones de lavado clínico", description: "Lavado de instrumental, chatas y material contaminado.", image: IMG.lab },
    ],
  },
  {
    handle: "laboratorio",
    number: "05",
    title: "Laboratorio",
    short: "Laboratorio",
    icon: "lab",
    description: "Mesones, superficies de trabajo y almacenamiento técnico para laboratorio clínico y de investigación.",
    image: IMG.lab,
    subfamilies: [
      { handle: "laboratorio", title: "Mesas y superficies de trabajo", description: "Mesones con cubierta fenólica o inoxidable y lavaderos.", image: IMG.labBench },
      { handle: "almacenamiento-tecnico", title: "Almacenamiento técnico", description: "Estanterías, gabinetes y armarios de reactivos.", image: IMG.shelving },
    ],
  },
  {
    handle: "patologia",
    number: "06",
    title: "Patología",
    short: "Patología",
    icon: "pathology",
    description: "Mesas especiales y superficies sanitarias para anatomía patológica y morgue, en acero inoxidable 316.",
    image: IMG.lab,
    subfamilies: [
      { handle: "mesas-de-patologia", title: "Mesas especiales", description: "Mesas de necropsia y de macroscopía con extracción.", image: IMG.lab },
      { handle: "superficies-sanitarias", title: "Superficies sanitarias especiales", description: "Encimeras, bandejas y lavaderos de alta higiene.", image: IMG.labBench },
    ],
  },
  {
    handle: "arquitectura-clinica",
    number: "07",
    title: "Arquitectura clínica",
    short: "Arquitectura",
    icon: "architecture",
    description: "Elementos fijos integrados a la edificación: protecciones de pared, pasamanos, cabeceros y sistemas de circulación.",
    image: IMG.reception,
    subfamilies: [
      { handle: "elementos-hospitalarios", title: "Elementos hospitalarios", description: "Cabeceros, protectores de pared y esquineros.", image: IMG.reception },
      { handle: "apoyo-y-circulacion", title: "Sistemas de apoyo y circulación", description: "Pasamanos, barras de apoyo y señalética integrada.", image: IMG.consult },
    ],
  },
]

export const ENVIRONMENTS: Environment[] = [
  {
    handle: "quirofano",
    title: "Quirófano",
    description: "Mesa de operaciones, mesas Mayo y riñón, carro de anestesia, lavamanos quirúrgico y atriles.",
    image: IMG.orTable,
    subfamilies: ["mesas-quirurgicas", "mesas-de-instrumental", "carros-quirurgicos", "lavamanos-quirurgicos", "atriles-y-soportes"],
  },
  {
    handle: "hospitalizacion",
    title: "Hospitalización",
    description: "Camas, cabeceros, carros de enfermería y de medicación, portasueros y protecciones de pared.",
    image: IMG.ward,
    subfamilies: ["camillas-y-camas", "carros-de-hospitalizacion", "carros-y-estaciones", "atriles-y-soportes", "elementos-hospitalarios"],
  },
  {
    handle: "consultorio",
    title: "Consultorio",
    description: "Camilla de examen, mesa clínica, vitrina de instrumental, escritorio y taburete.",
    image: IMG.consult,
    subfamilies: ["camillas-y-camas", "mesas-clinicas", "consultorio", "unidades-odontologicas"],
  },
  {
    handle: "laboratorio",
    title: "Laboratorio",
    description: "Mesones de trabajo, lavaderos, estanterías de reactivos y armarios técnicos.",
    image: IMG.lab,
    subfamilies: ["laboratorio", "almacenamiento-tecnico", "estaciones-de-lavado"],
  },
  {
    handle: "patologia",
    title: "Patología",
    description: "Mesa de necropsia, mesa de macroscopía, superficies sanitarias y almacenamiento.",
    image: IMG.labBench,
    subfamilies: ["mesas-de-patologia", "superficies-sanitarias", "almacenamiento-tecnico"],
  },
  {
    handle: "esterilizacion",
    title: "Central de esterilización",
    description: "Estaciones de lavado, mesas de empaque, carros de transporte y estanterías de material estéril.",
    image: IMG.shelving,
    subfamilies: ["estaciones-de-lavado", "carros-de-transporte", "almacenamiento-tecnico", "mesas-clinicas"],
  },
]

export const HERO_PRODUCT = {
  image: IMG.bed,
  handle: "cama-hospitalaria-electrica-k300",
  label: "Cama clínica eléctrica KC-300",
  spec: "Inox 304 · 3 motores · 250 kg",
}

export const ALL_SUBFAMILIES: (Subfamily & { family: Family })[] = FAMILIES.flatMap((f) =>
  f.subfamilies.map((s) => ({ ...s, family: f }))
)

export function getFamily(handle: string | null | undefined): Family | undefined {
  return FAMILIES.find((f) => f.handle === handle)
}

export function getSubfamily(handle: string | null | undefined) {
  return ALL_SUBFAMILIES.find((s) => s.handle === handle)
}

export function getEnvironment(handle: string | null | undefined): Environment | undefined {
  return ENVIRONMENTS.find((e) => e.handle === handle)
}
