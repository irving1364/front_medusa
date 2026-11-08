#!/usr/bin/env node
/**
 * Creates/updates the Karven product category tree in Medusa (3 parents, 16 children),
 * matching "Karven Web - Categorías.pdf", and re-assigns existing products from the old
 * collection taxonomy to the new categories. Idempotent (matched by handle).
 *
 *   node scripts/seed-categories.mjs            # reads front/.env.local
 *   node scripts/seed-categories.mjs --no-assign # only categories, leave products untouched
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
const ASSIGN = !process.argv.includes("--no-assign")
if (!BACKEND || !env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) throw new Error("Missing NEXT_PUBLIC_MEDUSA_BACKEND_URL / ADMIN_EMAIL / ADMIN_PASSWORD in .env.local")

const img = (id) => `https://images.unsplash.com/photo-${id}?w=1600&q=80&auto=format&fit=crop`
// Provisional stock imagery until real photography exists (same ids used elsewhere in the front).
const IMG = {
  bed: img("1512678080530-7760d81faba6"), ward: img("1538108149393-fbbd81895907"), orTable: img("1516549655169-df83a0774514"),
  orRoom: img("1551076805-e1869033e561"), orTeam: img("1504439468489-c8920d796a29"), dental: img("1629909613654-28e377c37b09"),
  lab: img("1583912086096-8c60d75a53f9"), shelving: img("1579684385127-1ef15d508118"), reception: img("1519494026892-80bbd2d6fd0d"),
  consult: img("1666214280557-f1b5022eb634"), labBench: img("1581594549595-35f6edc7b762"), room: img("1519494080410-f9aa76cb4283"),
}
// Real Karven photography committed to front/public/products (served by Vercel)
const isPublic = (u) => /^https:\/\//.test(u || "")
const SITE = (isPublic(env.PUBLIC_ASSET_URL) ? env.PUBLIC_ASSET_URL : isPublic(env.NEXT_PUBLIC_SITE_URL) ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(/\/$/, "")
IMG.vetTable = `${SITE}/products/mesa-veterinaria-exploracion-tratamiento.jpg`
IMG.vetWet = `${SITE}/products/mesa-humeda-veterinaria-tratamiento-preparacion.jpg`

/** Parent categories ("categorías madres"). */
const PARENTS = [
  { handle: "mobiliario-medico", code: "MED", number: "01", name: "Mobiliario médico", image: IMG.room,
    description: "Atención humana, exploración, procedimientos, higiene clínica y apoyo al paciente." },
  { handle: "mobiliario-veterinario", code: "VET", number: "02", name: "Mobiliario veterinario", image: IMG.vetTable,
    description: "Exploración, tratamiento, hospitalización, preparación y apoyo veterinario." },
  { handle: "mobiliario-tecnico", code: "TEC", number: "03", name: "Mobiliario técnico", image: IMG.labBench,
    description: "Muebles fijos, mesones, estaciones de trabajo, almacenamiento y lavado especializado. Trabajos especializados para hospitales, farmacias, laboratorios y morgues." },
]

/** Child categories ("categorías hijas"); `items` = "productos incluidos". */
const CHILDREN = [
  { parent: "mobiliario-medico", code: "MED-01", handle: "camillas-clinicas", name: "Camillas clínicas", image: IMG.bed,
    items: "Camillas de examen, exploración, inyectables y camillas ginecológicas" },
  { parent: "mobiliario-medico", code: "MED-02", handle: "sillas-y-sillones-clinicos", name: "Sillas y sillones clínicos", image: IMG.dental,
    items: "Sillas de flebotomía, de toma de muestras y sillones de procedimientos" },
  { parent: "mobiliario-medico", code: "MED-03", handle: "mesas-clinicas-y-de-instrumental", name: "Mesas clínicas y de instrumental", image: IMG.orTable,
    items: "Mesas Mayo, instrumentación, anestesia, mesas puente y mesas auxiliares clínicas" },
  { parent: "mobiliario-medico", code: "MED-04", handle: "carros-hospitalarios", name: "Carros hospitalarios", image: IMG.ward,
    items: "Carros de curaciones, procedimientos, medicamentos, instrumental, suministros y ropa" },
  { parent: "mobiliario-medico", code: "MED-05", handle: "lavamanos-clinicos", name: "Lavamanos clínicos", image: IMG.orRoom,
    items: "Lavamanos quirúrgicos, de consulta, odontológicos y de higiene de manos" },
  { parent: "mobiliario-medico", code: "MED-06", handle: "atriles-y-soportes", name: "Atriles y soportes", image: IMG.bed,
    items: "Porta sueros, soportes de bombas, porta platones y soportes clínicos" },
  { parent: "mobiliario-medico", code: "MED-07", handle: "auxiliares-clinicos", name: "Auxiliares clínicos", image: IMG.reception,
    items: "Escabeles, banquillos, taburetes, biombos, porta guantes y contenedores auxiliares" },
  { parent: "mobiliario-medico", code: "MED-08", handle: "cunas-neonatales", name: "Cunas neonatales", image: IMG.room,
    items: "Bassinets, cunas hospitalarias neonatales y sus configuraciones" },

  { parent: "mobiliario-veterinario", code: "VET-01", handle: "mesas-veterinarias", name: "Mesas veterinarias", image: IMG.vetWet,
    items: "Exploración, tratamiento, preparación móvil, mesas húmedas y mesas Mayo veterinarias" },
  { parent: "mobiliario-veterinario", code: "VET-02", handle: "jaulas-veterinarias", name: "Jaulas veterinarias", image: IMG.shelving,
    items: "Individuales, modulares, felinas, caninas y estaciones múltiples" },
  { parent: "mobiliario-veterinario", code: "VET-03", handle: "higiene-y-lavado-veterinario", name: "Higiene y lavado veterinario", image: IMG.orRoom,
    items: "Bañeras clínicas, lavamanos y estaciones destinadas principalmente al lavado" },
  { parent: "mobiliario-veterinario", code: "VET-04", handle: "auxiliares-y-accesorios-veterinarios", name: "Auxiliares y accesorios veterinarios", image: IMG.reception,
    items: "Carros, repisas, gabinetes auxiliares, porta platones y accesorios de jaulas" },

  { parent: "mobiliario-tecnico", code: "TEC-01", handle: "muebles-base-y-aereos", name: "Muebles base y aéreos", image: IMG.labBench,
    items: "Mobiliario fijo, módulos inferiores, superiores y conjuntos de muebles instalados" },
  { parent: "mobiliario-tecnico", code: "TEC-02", handle: "mesas-y-estaciones-de-trabajo", name: "Mesas y estaciones de trabajo", image: IMG.lab,
    items: "Mesones técnicos, mesas de preparación, bancos de trabajo y mesas especializadas" },
  { parent: "mobiliario-tecnico", code: "TEC-03", handle: "fregadores-y-tinas", name: "Fregadores y tinas", image: IMG.orRoom,
    items: "Fregadores técnicos, estaciones de lavado, tinas y muebles cuya función principal es lavar" },
  { parent: "mobiliario-tecnico", code: "TEC-04", handle: "gabinetes-y-almacenamiento", name: "Gabinetes y almacenamiento", image: IMG.shelving,
    items: "Anaqueles, estanterías, armarios, archivadores y gabinetes independientes" },
]

/** Old collection handle (previous taxonomy) -> new category handle, for the sample products. */
const COLLECTION_TO_CATEGORY = {
  "camillas-y-camas": "camillas-clinicas",
  "mesas-clinicas": "mesas-clinicas-y-de-instrumental",
  "consultorio": "gabinetes-y-almacenamiento",
  "unidades-odontologicas": "sillas-y-sillones-clinicos",
  "carros-de-transporte": "carros-hospitalarios",
  "carros-y-estaciones": "carros-hospitalarios",
  "carros-quirurgicos": "carros-hospitalarios",
  "carros-de-hospitalizacion": "carros-hospitalarios",
  "carros-de-aislamiento": "carros-hospitalarios",
  "atriles-y-soportes": "atriles-y-soportes",
  "mesas-quirurgicas": "mesas-clinicas-y-de-instrumental",
  "mesas-de-instrumental": "mesas-clinicas-y-de-instrumental",
  "lavamanos-quirurgicos": "lavamanos-clinicos",
  "estaciones-de-lavado": "fregadores-y-tinas",
  "laboratorio": "mesas-y-estaciones-de-trabajo",
  "almacenamiento-tecnico": "gabinetes-y-almacenamiento",
  "mesas-de-patologia": "mesas-y-estaciones-de-trabajo",
  "superficies-sanitarias": "muebles-base-y-aereos",
  "elementos-hospitalarios": "auxiliares-clinicos",
  "apoyo-y-circulacion": "auxiliares-clinicos",
}
// A few sample products fit better elsewhere than their old collection suggests.
const PRODUCT_TO_CATEGORY = { "escritorio-clinico-k40": "mesas-y-estaciones-de-trabajo" }

// ─── Admin API ──────────────────────────────────────────────────────
const login = await fetch(`${BACKEND}/auth/user/emailpass`, {
  method: "POST", headers: { "content-type": "application/json" },
  body: JSON.stringify({ email: env.ADMIN_EMAIL, password: env.ADMIN_PASSWORD }),
})
if (!login.ok) throw new Error(`Admin login failed: ${login.status}`)
const { token } = await login.json()
const api = async (path, body, method = body === undefined ? "GET" : "POST") => {
  const res = await fetch(`${BACKEND}/admin${path}`, {
    method, headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status} ${JSON.stringify(json).slice(0, 300)}`)
  return json
}

const existing = (await api(`/product-categories?limit=200&fields=id,name,handle,parent_category_id`)).product_categories
const byHandle = new Map(existing.map((c) => [c.handle, c]))

async function upsertCategory(def, parentId, rank) {
  const payload = {
    name: def.name, handle: def.handle, description: def.description || def.items, is_active: true, is_internal: false,
    rank, parent_category_id: parentId ?? null,
    metadata: { code: def.code, number: def.number || def.code.split("-")[1], image: def.image, items: def.items || null },
  }
  const found = byHandle.get(def.handle)
  if (found) {
    const res = await api(`/product-categories/${found.id}`, payload)
    console.log(`= ${def.code} ${def.name}`)
    return res.product_category
  }
  const res = await api(`/product-categories`, payload)
  byHandle.set(def.handle, res.product_category)
  console.log(`+ ${def.code} ${def.name}`)
  return res.product_category
}

const parentIds = {}
for (const [i, p] of PARENTS.entries()) parentIds[p.handle] = (await upsertCategory(p, null, i)).id
const childIds = {}
for (const [i, c] of CHILDREN.entries()) childIds[c.handle] = (await upsertCategory(c, parentIds[c.parent], i)).id

if (ASSIGN) {
  const { products } = await api(`/products?limit=200&fields=id,handle,title,*collection,*categories`)
  let n = 0
  for (const p of products) {
    const target = PRODUCT_TO_CATEGORY[p.handle] || COLLECTION_TO_CATEGORY[p.collection?.handle]
    if (!target) { console.log(`? ${p.handle}: no mapping (collection ${p.collection?.handle || "none"})`); continue }
    const already = (p.categories || []).some((c) => c.id === childIds[target])
    if (already) continue
    await api(`/products/${p.id}`, { categories: [{ id: childIds[target] }] })
    n++
    console.log(`→ ${p.title} -> ${target}`)
  }
  console.log(`Assigned ${n} product(s).`)
}
console.log("Done.")
