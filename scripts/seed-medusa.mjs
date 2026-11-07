#!/usr/bin/env node
/**
 * Seeds the Medusa backend with the Karven medical-furniture catalogue:
 * 6 collections + sample products with temporary stock imagery.
 * Idempotent: collections/products are matched by handle and updated.
 *
 *   node scripts/seed-medusa.mjs            # reads front/.env.local
 *   node scripts/seed-medusa.mjs --prune    # also deletes products not in this file
 */
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const env = Object.fromEntries(
  readFileSync(join(root, ".env.local"), "utf8").split(/\r?\n/).filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] })
)
const BACKEND = (env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "").replace(/\/$/, "")
const PRUNE = process.argv.includes("--prune")
if (!BACKEND || !env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) throw new Error("Missing NEXT_PUBLIC_MEDUSA_BACKEND_URL / ADMIN_EMAIL / ADMIN_PASSWORD in .env.local")

const img = (id) => `https://images.unsplash.com/photo-${id}?w=1600&q=80&auto=format&fit=crop`

const COLLECTIONS = [
  { handle: "camillas-y-camas", title: "Camillas y camas hospitalarias" },
  { handle: "mesas-quirurgicas", title: "Mesas quirúrgicas" },
  { handle: "unidades-odontologicas", title: "Unidades odontológicas" },
  { handle: "consultorio", title: "Mobiliario de consultorio" },
  { handle: "laboratorio", title: "Laboratorio" },
  { handle: "carros-y-estaciones", title: "Carros y estaciones de enfermería" },
]

const PRODUCTS = [
  {
    handle: "cama-hospitalaria-electrica-k300", title: "Cama hospitalaria eléctrica K-300", subtitle: "Cinco posiciones, barandas abatibles y colchón de alta densidad",
    collection: "camillas-y-camas", price: 3850, sku: "KV-CM-300", image: img("1512678080530-7760d81faba6"), badge: "Más vendida",
    description: "Cama eléctrica de tres motores con control de paciente y enfermería, posiciones Trendelenburg y Fowler, barandas abatibles en policarbonato y ruedas de 125 mm con freno central. Incluye colchón sanitario de 12 cm.",
    metadata: { material: "Acero al carbono con pintura epóxica, barandas de ABS", dimensions: "218 × 97 × 45–75 cm", capacity: "250 kg", warranty: "3 años", color: "Blanco / gris", features: ["3 motores silenciosos", "Control de enfermería con bloqueo", "Freno central en 4 ruedas", "Colchón antiescaras incluido", "Portasuero y soporte de bolsa"] },
  },
  {
    handle: "camilla-de-traslado-hidraulica", title: "Camilla de traslado hidráulica", subtitle: "Altura variable por pedal, barandas plegables y plataforma radiotransparente",
    collection: "camillas-y-camas", price: 2190, sku: "KV-CT-120", image: img("1538108149393-fbbd81895907"),
    description: "Camilla de urgencias con elevación hidráulica, respaldo neumático hasta 90°, plataforma radiotransparente y ruedas de 200 mm con quinta rueda direccional.",
    metadata: { material: "Acero inoxidable 304", dimensions: "200 × 70 × 55–85 cm", capacity: "220 kg", warranty: "2 años", color: "Inoxidable", features: ["Plataforma radiotransparente", "Quinta rueda direccional", "Barandas plegables", "Portasuero telescópico"] },
  },
  {
    handle: "camilla-de-examen-k100", title: "Camilla de examen K-100", subtitle: "Respaldo reclinable, tapicería sanitaria sin costuras y escalón integrado",
    collection: "consultorio", price: 690, sku: "KV-CE-100", image: img("1666214280557-f1b5022eb634"),
    description: "Camilla de examen para consultorio con respaldo reclinable por cremallera, tapicería de vinil sanitario sin costuras y portarrollo de papel. Disponible en 12 colores.",
    metadata: { material: "Acero con pintura epóxica, tapicería vinil sanitario", dimensions: "185 × 62 × 78 cm", capacity: "180 kg", warranty: "2 años", color: "A elección (12 colores)", features: ["Respaldo reclinable", "Portarrollo de papel", "Escalón de acceso", "Tapicería sin costuras"] },
  },
  {
    handle: "mesa-quirurgica-electrohidraulica-k700", title: "Mesa quirúrgica electrohidráulica K-700", subtitle: "Control por mando, placa radiotransparente y accesorios universales",
    collection: "mesas-quirurgicas", price: 24900, sku: "KV-MQ-700", image: img("1516549655169-df83a0774514"), badge: "Serie quirúrgica",
    description: "Mesa de operaciones de uso general con movimientos electrohidráulicos de altura, Trendelenburg, lateral y secciones de respaldo y piernas. Tablero radiotransparente compatible con arco en C y riel lateral universal para accesorios.",
    metadata: { material: "Acero inoxidable 304, tablero de resina fenólica", dimensions: "208 × 55 × 60–100 cm", capacity: "300 kg", warranty: "5 años", color: "Inoxidable", features: ["Compatible con arco en C", "Mando con cable y respaldo manual", "Batería de respaldo", "Riel lateral universal", "Colchonetas viscoelásticas"] },
  },
  {
    handle: "mesa-quirurgica-manual-k500", title: "Mesa quirúrgica manual K-500", subtitle: "Mecánica hidráulica, cinco secciones y base compacta",
    collection: "mesas-quirurgicas", price: 11800, sku: "KV-MQ-500", image: img("1504439468489-c8920d796a29"),
    description: "Mesa de operaciones hidráulica para cirugía menor y ambulatoria, con cabecera y pierneras desmontables, control por pedales y base compacta de acero inoxidable.",
    metadata: { material: "Acero inoxidable 304", dimensions: "195 × 52 × 72–100 cm", capacity: "250 kg", warranty: "3 años", color: "Inoxidable", features: ["Control por pedales", "Cabecera y pierneras desmontables", "Ruedas con freno central"] },
  },
  {
    handle: "unidad-odontologica-integral-k900", title: "Unidad odontológica integral K-900", subtitle: "Sillón eléctrico, lámpara LED y módulo de cuatro instrumentos",
    collection: "unidades-odontologicas", price: 9450, sku: "KV-UO-900", image: img("1629909613654-28e377c37b09"), badge: "Nuevo",
    description: "Unidad dental completa con sillón de tres motores y memoria de posiciones, lámpara LED sin sombras, escupidera de cerámica giratoria, módulo de instrumentos con 4 salidas y banqueta de operador.",
    metadata: { material: "Aluminio fundido, tapicería PU sin costuras", dimensions: "Área de trabajo 2.1 × 1.6 m", capacity: "200 kg", warranty: "3 años", color: "Blanco / teal", features: ["Lámpara LED 30.000 lux", "Memoria de 3 posiciones", "Escupidera de cerámica", "Banqueta ergonómica incluida", "Sistema de agua independiente"] },
  },
  {
    handle: "escritorio-clinico-k40", title: "Escritorio clínico K-40", subtitle: "Laminado antibacteriano, cajonera con llave y pasacables",
    collection: "consultorio", price: 540, sku: "KV-ES-040", image: img("1519494026892-80bbd2d6fd0d"),
    description: "Escritorio de consultorio en laminado de alta presión con tratamiento antibacteriano, cajonera de tres gavetas con cerradura y canal de cables integrado.",
    metadata: { material: "Laminado HPL antibacteriano, estructura metálica", dimensions: "160 × 70 × 75 cm", warranty: "2 años", color: "Roble claro / blanco", features: ["Superficie antibacteriana", "Cajonera con llave", "Pasacables integrado"] },
  },
  {
    handle: "vitrina-medica-acero-inoxidable", title: "Vitrina médica de acero inoxidable", subtitle: "Dos puertas de vidrio templado y entrepaños regulables",
    collection: "consultorio", price: 880, sku: "KV-VI-200", image: img("1579684385127-1ef15d508118"),
    description: "Vitrina para instrumental y material estéril con estructura de acero inoxidable, puertas de vidrio templado con cerradura y cuatro entrepaños regulables.",
    metadata: { material: "Acero inoxidable 304, vidrio templado 5 mm", dimensions: "90 × 40 × 170 cm", warranty: "3 años", color: "Inoxidable", features: ["Cerradura en puertas", "Entrepaños regulables", "Patas niveladoras"] },
  },
  {
    handle: "meson-de-laboratorio-k60", title: "Mesón de laboratorio K-60", subtitle: "Cubierta de resina fenólica, lavadero integrado y módulos inferiores",
    collection: "laboratorio", price: 2350, sku: "KV-LB-060", image: img("1583912086096-8c60d75a53f9"),
    description: "Mesón técnico para laboratorio clínico con cubierta de resina fenólica resistente a reactivos, lavadero de polipropileno, grifería de laboratorio y módulos inferiores con puertas y gavetas. Fabricado a medida.",
    metadata: { material: "Resina fenólica, acero con pintura epóxica", dimensions: "A medida (módulos de 60 cm)", warranty: "5 años", color: "Negro / gris", features: ["Resistente a reactivos", "Lavadero integrado", "Fabricación a medida", "Canal de servicios"] },
  },
  {
    handle: "estanteria-inoxidable-5-niveles", title: "Estantería de acero inoxidable 5 niveles", subtitle: "Parrillas regulables y capacidad de 150 kg por nivel",
    collection: "laboratorio", price: 460, sku: "KV-LB-005", image: img("1579154204601-01588f351e67"),
    description: "Estantería modular de acero inoxidable para almacén estéril o laboratorio, con cinco parrillas regulables cada 2.5 cm y patas niveladoras.",
    metadata: { material: "Acero inoxidable 304", dimensions: "120 × 50 × 180 cm", capacity: "150 kg por nivel", warranty: "5 años", color: "Inoxidable", features: ["Parrillas regulables", "Montaje sin herramientas", "Patas niveladoras"] },
  },
  {
    handle: "carro-de-curaciones-k20", title: "Carro de curaciones K-20", subtitle: "Dos bandejas de acero inoxidable, cubeta y portabolsa",
    collection: "carros-y-estaciones", price: 390, sku: "KV-CR-020", image: img("1538108149393-fbbd81895907"),
    description: "Carro de curaciones con dos bandejas de acero inoxidable con baranda, cubeta de desechos, portabolsa y ruedas de 75 mm con freno.",
    metadata: { material: "Acero inoxidable 304", dimensions: "75 × 45 × 90 cm", capacity: "40 kg", warranty: "3 años", color: "Inoxidable", features: ["Ruedas con freno", "Cubeta y portabolsa", "Baranda perimetral"] },
  },
  {
    handle: "carro-de-medicacion-k25", title: "Carro de medicación K-25", subtitle: "Cajones modulares con cerradura central y superficie de trabajo",
    collection: "carros-y-estaciones", price: 1290, sku: "KV-CR-025", image: img("1551076805-e1869033e561"), badge: "Nuevo",
    description: "Carro de medicación con seis cajones modulares de ABS, cerradura centralizada, superficie de trabajo en ABS antibacteriano, portasuero y ruedas antiestáticas de 125 mm.",
    metadata: { material: "ABS antibacteriano, estructura de aluminio", dimensions: "68 × 52 × 100 cm", capacity: "60 kg", warranty: "3 años", color: "Blanco / teal", features: ["Cerradura centralizada", "Cajones modulares", "Ruedas antiestáticas", "Portasuero integrado"] },
  },
]

const api = async (path, body, method = body === undefined ? "GET" : "POST") => {
  const res = await fetch(`${BACKEND}${path}`, {
    method,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${api.token}` },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status} ${JSON.stringify(data).slice(0, 300)}`)
  return data
}

const main = async () => {
  const login = await fetch(`${BACKEND}/auth/user/emailpass`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: env.ADMIN_EMAIL, password: env.ADMIN_PASSWORD }) })
  api.token = (await login.json()).token
  if (!api.token) throw new Error("Admin login failed")

  const { regions } = await api("/admin/regions")
  const region = regions.find((r) => r.currency_code === "pab") || regions[0]
  const { sales_channels } = await api("/admin/sales-channels")
  const sc = sales_channels[0]
  const { shipping_profiles } = await api("/admin/shipping-profiles")
  const profile = shipping_profiles[0]
  console.log(`region=${region?.name} (${region?.currency_code}) sales_channel=${sc?.name} shipping_profile=${profile?.name || "none"}`)

  // Collections
  const existing = (await api("/admin/collections?limit=100")).collections
  const colByHandle = {}
  for (const c of COLLECTIONS) {
    const found = existing.find((e) => e.handle === c.handle)
    const saved = found
      ? (await api(`/admin/collections/${found.id}`, { title: c.title })).collection
      : (await api("/admin/collections", c)).collection
    colByHandle[c.handle] = saved
    console.log(`${found ? "updated" : "created"} collection ${c.handle}`)
  }

  // Products
  const current = (await api("/admin/products?limit=200&fields=id,handle,title")).products
  for (const p of PRODUCTS) {
    const payload = {
      title: p.title, subtitle: p.subtitle, handle: p.handle, description: p.description, status: "published",
      collection_id: colByHandle[p.collection].id,
      thumbnail: p.image, images: [{ url: p.image }],
      metadata: { ...p.metadata, ...(p.badge ? { badge: p.badge } : {}) },
      ...(profile ? { shipping_profile_id: profile.id } : {}),
    }
    const found = current.find((c) => c.handle === p.handle)
    if (found) {
      await api(`/admin/products/${found.id}`, payload)
      const full = (await api(`/admin/products/${found.id}?fields=*variants`)).product
      const v = full.variants[0]
      if (v) await api(`/admin/products/${found.id}/variants/${v.id}`, { sku: p.sku, prices: [{ currency_code: region.currency_code, amount: p.price }], manage_inventory: false })
      console.log(`updated product ${p.handle}`)
    } else {
      await api("/admin/products", {
        ...payload,
        sales_channels: [{ id: sc.id }],
        options: [{ title: "Modelo", values: ["Estándar"] }],
        variants: [{ title: "Estándar", sku: p.sku, options: { Modelo: "Estándar" }, manage_inventory: false, prices: [{ currency_code: region.currency_code, amount: p.price }] }],
      })
      console.log(`created product ${p.handle}`)
    }
  }

  if (PRUNE) {
    const keep = new Set(PRODUCTS.map((p) => p.handle))
    for (const c of current) {
      if (!keep.has(c.handle)) {
        await api(`/admin/products/${c.id}`, undefined, "DELETE")
        console.log(`deleted product ${c.handle}`)
      }
    }
    const keepCols = new Set(COLLECTIONS.map((c) => c.handle))
    for (const c of existing) {
      if (!keepCols.has(c.handle)) {
        await api(`/admin/collections/${c.id}`, undefined, "DELETE")
        console.log(`deleted collection ${c.handle}`)
      }
    }
  }
  console.log("done")
}

main().catch((e) => { console.error(e.message); process.exit(1) })
