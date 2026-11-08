#!/usr/bin/env node
/**
 * Loads the real VET products (source: "VET - PRODUCTOS - PRIMERA PARTE", 23-08-2026) into Medusa.
 * Photos were extracted from that PDF into public/products/<handle>.jpg and are referenced by
 * absolute URL on the storefront domain. Idempotent: products are matched by handle.
 *
 *   node scripts/seed-vet-products.mjs                     # create/update the 9 products
 *   node scripts/seed-vet-products.mjs --unpublish-others  # also set every other product to draft
 *
 * Reads NEXT_PUBLIC_MEDUSA_BACKEND_URL, ADMIN_EMAIL, ADMIN_PASSWORD (and optional NEXT_PUBLIC_SITE_URL)
 * from front/.env.local. Prices are "desde" prices in PAB with ITBMS included, as in the PDF.
 */
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const env = Object.fromEntries(
  readFileSync(join(root, ".env.local"), "utf8").split(/\r?\n/).filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")] })
)
const BACKEND = (env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "").replace(/\/$/, "")
const SITE = (env.NEXT_PUBLIC_SITE_URL || "https://front-medusa-kappa.vercel.app").replace(/\/$/, "")
const UNPUBLISH = process.argv.includes("--unpublish-others")
if (!BACKEND || !env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) throw new Error("Missing NEXT_PUBLIC_MEDUSA_BACKEND_URL / ADMIN_EMAIL / ADMIN_PASSWORD in .env.local")

const img = (handle) => `${SITE}/products/${handle}.jpg`
const INOX = "Acero inoxidable AISI 304 satinado"
const SIZES = ["120 × 60 × 90 cm", "150 × 60 × 90 cm"]
const MAYO_DIMS = "Bandeja 50 × 35 cm · Base 50 × 55 cm · Altura 85–130 cm"

/** Category handle for every product in this file (VET-01 Mesas veterinarias). */
const CATEGORY = "mesas-veterinarias"

const PRODUCTS = [
  {
    handle: "mesa-veterinaria-exploracion-tratamiento", sku: "KM-VET-CT-MET", price: 925,
    title: "Mesa veterinaria de exploración y tratamiento",
    subtitle: "Superficie sanitaria en acero inoxidable, 120 o 150 cm",
    group: "Consulta y tratamiento", sizes: SIZES,
    description: "Mesa clínica diseñada para exploración, consulta, curaciones y procedimientos veterinarios de rutina. Su superficie en acero inoxidable ofrece alta resistencia, higiene y facilidad de desinfección para uso continuo en clínicas y hospitales veterinarios.",
    features: ["Acero inoxidable AISI 304 satinado", "Superficie amplia, lisa y sanitaria", "Bordes seguros y acabado de fácil limpieza", "Estructura estable para exploración y tratamiento", "Diseñada para uso veterinario clínico intensivo"],
    uses: "Exploración · Consulta · Vacunación · Toma de muestras · Curaciones · Tratamientos · Procedimientos menores",
  },
  {
    handle: "mesa-veterinaria-fija-consulta-examen", sku: "KM-VET-CT-MCE", price: 449,
    title: "Mesa veterinaria fija de consulta y examen",
    subtitle: "Estructura tubular abierta con niveladores, 120 o 150 cm",
    group: "Consulta y tratamiento", sizes: SIZES,
    description: "Mesa clínica fija en acero inoxidable AISI 304, diseñada para consulta, exploración y procedimientos veterinarios de rutina. Su estructura abierta ofrece estabilidad, acceso cómodo al paciente y fácil limpieza.",
    features: ["Acero inoxidable AISI 304 satinado", "Superficie lisa con bordes sanitarios seguros", "Estructura tubular fija y reforzada", "4 niveladores regulables", "Diseño abierto de fácil limpieza y desinfección", "Alta resistencia para uso clínico continuo"],
    uses: "Consulta · Exploración · Vacunación · Toma de muestras · Curaciones · Tratamientos · Procedimientos menores",
  },
  {
    handle: "mesa-movil-preparacion-tratamiento", sku: "KM-VET-PP-MPT", price: 535,
    title: "Mesa móvil de preparación y tratamiento",
    subtitle: "Con repisa inferior y ruedas con freno, 120 o 150 cm",
    group: "Preparación y procedimientos", sizes: SIZES, wheels: "4 ruedas giratorias, 2 con freno",
    description: "Mesa clínica móvil diseñada para preparación, curaciones y procedimientos veterinarios. Su construcción en acero inoxidable facilita la limpieza y permite trasladar el área de trabajo según las necesidades del personal clínico.",
    features: ["Acero inoxidable AISI 304 satinado", "Superficie de trabajo sanitaria", "Repisa inferior para instrumental e insumos", "4 ruedas giratorias, 2 con freno", "Diseño abierto de fácil acceso y limpieza"],
    uses: "Preparación · Curaciones · Tratamientos · Procedimientos clínicos",
  },
  {
    handle: "mesa-movil-preparacion-tratamiento-2-gavetas", sku: "KM-VET-PP-MPT-2G", price: 798,
    title: "Mesa móvil veterinaria de preparación y tratamiento con 2 gavetas",
    subtitle: "Estación móvil con gavetas y repisa de almacenamiento, 120 o 150 cm",
    group: "Preparación y procedimientos", sizes: SIZES, wheels: "4 ruedas giratorias, 2 con freno",
    description: "Estación móvil de trabajo veterinario que combina una amplia superficie clínica con almacenamiento inmediato para instrumental e insumos, manteniendo todo organizado y accesible durante los procedimientos.",
    features: ["Acero inoxidable AISI 304 satinado", "2 gavetas integradas para instrumental e insumos", "Repisa inferior de almacenamiento", "4 ruedas giratorias, 2 con freno", "Superficies lisas de fácil limpieza y desinfección"],
    uses: "Preparación · Tratamientos · Curaciones · Apoyo clínico",
  },
  {
    handle: "mesa-humeda-veterinaria-tratamiento-preparacion", sku: "KM-VET-PP-MHP-1P3G", price: 1305,
    title: "Mesa húmeda veterinaria de tratamiento y preparación",
    subtitle: "Tina clínica integrada con drenaje y rejilla removible, 120 o 150 cm",
    group: "Preparación y procedimientos", sizes: SIZES,
    description: "Estación clínica diseñada para preparación, lavado, curaciones y procedimientos veterinarios que requieren manejo de líquidos. Su superficie húmeda en acero inoxidable facilita la higiene, el drenaje y la desinfección entre pacientes. Profundidad de tina aprox. 12.5–15 cm.",
    features: ["Acero inoxidable AISI 304 satinado", "Tina clínica integrada de baja profundidad", "Rejilla o superficie de trabajo removible", "Sistema de drenaje para evacuación de líquidos", "Superficies sanitarias de fácil limpieza y desinfección"],
    uses: "Preparación preoperatoria · Lavado de pacientes · Curaciones · Limpieza de heridas · Procedimientos húmedos · Odontología veterinaria · Tratamientos",
    options: "Grifería · Ducha manual · Filtro atrapapelo/residuos · Gavetas y gabinete inferior",
  },
  {
    handle: "mesa-de-mayo-movil-base-u", sku: "KM-VET-PP-MAY-U-M", price: 145.07,
    title: "Mesa de Mayo móvil base U",
    subtitle: "Bandeja removible 50 × 35 cm, altura regulable 85–130 cm",
    group: "Preparación y procedimientos", dimensions: MAYO_DIMS, wheels: "4 ruedas giratorias de 2\"", finish: "Soldadura TIG y acabado satinado sanitario #4",
    description: "Soporte móvil para instrumental clínico, fabricado en acero inoxidable AISI 304. Su base tipo U facilita el acercamiento al área de trabajo, mientras que el ajuste manual de altura permite adaptarlo cómodamente a diferentes procedimientos.",
    features: ["Acero inoxidable AISI 304", "Bandeja removible de 50 × 35 cm", "Altura regulable de 85 a 130 cm", "Base tubular tipo U de alta estabilidad", "4 ruedas giratorias de 2\"", "Ajuste manual mediante perilla", "Soldadura TIG y acabado satinado sanitario #4", "Superficies resistentes y de fácil limpieza"],
    uses: "Consulta, preparación de procedimientos, curaciones y soporte móvil de instrumental en clínicas, consultorios y hospitales.",
  },
  {
    handle: "mesa-de-mayo-base-u-bajo-perfil", sku: "KM-VET-PP-MAY-U-BP", price: 180.63,
    title: "Mesa de Mayo base U de bajo perfil",
    subtitle: "Base de baja holgura para posicionar bajo camillas y mesas",
    group: "Preparación y procedimientos", dimensions: MAYO_DIMS, wheels: "2 ruedas posteriores de 2\" + patines delanteros", finish: "Soldadura TIG, acabado satinado sanitario #4",
    description: "Soporte de instrumental en acero inoxidable AISI 304, diseñado con base de bajo perfil para facilitar su posicionamiento debajo de camillas y mesas clínicas. Su configuración de ruedas posteriores y patines delanteros proporciona estabilidad durante los procedimientos.",
    features: ["Acero inoxidable AISI 304", "Bandeja removible de 50 × 35 cm", "Altura regulable de 85 a 130 cm", "Base U Low Profile para baja holgura", "2 ruedas posteriores de 2\" + patines delanteros", "Ajuste manual mediante perilla", "Soldadura TIG", "Acabado satinado sanitario #4", "Diseño estable y de fácil limpieza"],
    uses: "Preparación de procedimientos, curaciones y soporte de instrumental en consultorios, clínicas, hospitales y áreas donde se requiere aproximación directa a la camilla.",
  },
  {
    handle: "mesa-de-mayo-base-h-movil", sku: "KM-VET-PP-MAY-H-M", price: 143.34,
    title: "Mesa de Mayo base H móvil",
    subtitle: "Base H de alta estabilidad con desplazamiento multidireccional",
    group: "Preparación y procedimientos", dimensions: MAYO_DIMS, wheels: "4 ruedas giratorias de 2\"", finish: "Soldadura TIG con aporte ER308L, acabado satinado sanitario #4",
    description: "Soporte móvil para instrumental clínico, fabricado en acero inoxidable AISI 304. Su base tipo H proporciona alta estabilidad y desplazamiento multidireccional para acompañar procedimientos médicos con comodidad y seguridad.",
    features: ["Acero inoxidable AISI 304", "Bandeja removible de 50 × 35 cm", "Altura regulable de 85 a 130 cm", "Base tipo H de alta estabilidad", "4 ruedas giratorias de 2\"", "Ajuste manual mediante perilla", "Soldadura TIG con aporte ER308L", "Acabado satinado sanitario #4", "Superficies resistentes y de fácil limpieza"],
    uses: "Soporte de instrumental en procedimientos, curaciones, preparación clínica y áreas que requieren movilidad y estabilidad durante el trabajo.",
  },
  {
    handle: "mesa-de-mayo-quirurgica-elevacion-pedal", sku: "KM-VET-PP-MAY-U-P", price: 260.06,
    title: "Mesa de Mayo quirúrgica con elevación por pedal",
    subtitle: "Doble poste, ajuste de altura sin usar las manos, 90–150 cm",
    group: "Preparación y procedimientos", dimensions: "Bandeja 50 × 35 cm · Base 50 × 55 cm · Altura regulable aprox. 90–150 cm", wheels: "2 ruedas posteriores de 2\" + patines delanteros", finish: "Soldadura TIG con aporte ER308L, acabado satinado sanitario #4",
    description: "Mesa de Mayo de alta estabilidad para quirófano y procedimientos clínicos, con ajuste de altura mediante pedal para facilitar el posicionamiento sin utilizar las manos. Fabricada completamente en acero inoxidable AISI 304.",
    features: ["Acero inoxidable AISI 304", "Bandeja removible de 50 × 35 cm", "Ajuste de altura mediante pedal", "Doble poste para mayor estabilidad", "Poste exterior Ø1 ½\" y telescópico Ø1 ¼\"", "Base U de bajo perfil", "2 ruedas posteriores de 2\" + patines delanteros", "Soldadura TIG con aporte ER308L", "Acabado satinado sanitario #4", "Diseño resistente y de fácil limpieza"],
    uses: "Quirófanos, salas de procedimientos y áreas clínicas donde se requiere mantener el instrumental accesible y ajustar la altura sin interrumpir la técnica de trabajo.",
  },
]

// ─── Admin API ──────────────────────────────────────────────────────
const login = await fetch(`${BACKEND}/auth/user/emailpass`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: env.ADMIN_EMAIL, password: env.ADMIN_PASSWORD }) })
if (!login.ok) throw new Error(`Admin login failed: ${login.status}`)
const { token } = await login.json()
const api = async (path, body, method = body === undefined ? "GET" : "POST") => {
  const res = await fetch(`${BACKEND}/admin${path}`, { method, headers: { authorization: `Bearer ${token}`, "content-type": "application/json" }, body: body === undefined ? undefined : JSON.stringify(body) })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status} ${JSON.stringify(json).slice(0, 300)}`)
  return json
}

const { regions } = await api("/regions")
const region = regions.find((r) => r.currency_code === "pab") || regions[0]
const sc = (await api("/sales-channels")).sales_channels[0]
const profile = (await api("/shipping-profiles")).shipping_profiles[0]
const category = (await api(`/product-categories?handle=${CATEGORY}&fields=id,name`)).product_categories[0]
if (!category) throw new Error(`Category ${CATEGORY} not found; run scripts/seed-categories.mjs first`)
console.log(`region=${region.name} (${region.currency_code}) category=${category.name}`)

const current = (await api("/products?limit=200&fields=id,handle,title,status,*variants")).products

for (const p of PRODUCTS) {
  const sizes = p.sizes || null
  const dimensions = p.dimensions || (sizes ? sizes.join(" · ") : null)
  const payload = {
    title: p.title, subtitle: p.subtitle, handle: p.handle, description: p.description, status: "published",
    thumbnail: img(p.handle), images: [{ url: img(p.handle) }],
    categories: [{ id: category.id }],
    metadata: {
      code: p.sku, group: p.group, material: INOX, finish: p.finish || "Satinado sanitario, soldadura TIG",
      dimensions, wheels: p.wheels || null, options: p.options || null, uses: p.uses, features: p.features,
      price_from: true, tax_included: true, source: "VET - PRODUCTOS - PRIMERA PARTE (23-08-2026)",
    },
    ...(profile ? { shipping_profile_id: profile.id } : {}),
  }
  const variants = sizes
    ? sizes.map((s) => ({ title: s, sku: `${p.sku}-${s.slice(0, 3)}`, options: { Medida: s }, manage_inventory: false, prices: [{ currency_code: region.currency_code, amount: p.price }] }))
    : [{ title: "Estándar", sku: p.sku, options: { Modelo: "Estándar" }, manage_inventory: false, prices: [{ currency_code: region.currency_code, amount: p.price }] }]

  const found = current.find((c) => c.handle === p.handle)
  if (found) {
    await api(`/products/${found.id}`, payload)
    for (const v of variants) {
      const existing = found.variants?.find((x) => x.sku === v.sku)
      if (existing) await api(`/products/${found.id}/variants/${existing.id}`, { title: v.title, prices: v.prices, manage_inventory: false })
      else await api(`/products/${found.id}/variants`, v)
    }
    console.log(`= ${p.sku} ${p.title}`)
  } else {
    await api("/products", {
      ...payload,
      sales_channels: [{ id: sc.id }],
      options: sizes ? [{ title: "Medida", values: sizes }] : [{ title: "Modelo", values: ["Estándar"] }],
      variants,
    })
    console.log(`+ ${p.sku} ${p.title}`)
  }
}

if (UNPUBLISH) {
  const keep = new Set(PRODUCTS.map((p) => p.handle))
  let n = 0
  for (const c of current) {
    if (keep.has(c.handle) || c.status === "draft") continue
    await api(`/products/${c.id}`, { status: "draft" })
    n++
    console.log(`- draft: ${c.title}`)
  }
  console.log(`Unpublished ${n} product(s).`)
}
console.log("Done.")
