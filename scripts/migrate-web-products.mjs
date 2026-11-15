// One-off migration of existing products to the "Productos web" schema (2026-11-15).
// Dry run by default; pass --apply to write. Admin login from .env.local (ADMIN_EMAIL / ADMIN_PASSWORD).
import { readFileSync } from "node:fs"

const env = Object.fromEntries(readFileSync(new URL("../.env.local", import.meta.url), "utf8").split(/\r?\n/).filter((l) => l && !l.startsWith("#") && l.includes("=")).map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] }))
const BACKEND = (env.MEDUSA_BACKEND_URL || env.NEXT_PUBLIC_MEDUSA_BACKEND_URL).replace(/\/$/, "")
const APPLY = process.argv.includes("--apply")

const login = await fetch(`${BACKEND}/auth/user/emailpass`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: env.ADMIN_EMAIL, password: env.ADMIN_PASSWORD }) })
if (!login.ok) throw new Error(`login ${login.status}`)
const { token } = await login.json()
const admin = async (path, init = {}) => {
  const res = await fetch(`${BACKEND}/admin${path}`, { ...init, headers: { authorization: `Bearer ${token}`, "content-type": "application/json", ...(init.headers || {}) } })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`${init.method || "GET"} ${path} -> ${res.status} ${JSON.stringify(body).slice(0, 300)}`)
  return body
}

const CANON = [
  [/316/, "Acero inoxidable AISI 316"],
  [/304/, "Acero inoxidable AISI 304"],
  [/galvanizado/i, "Acero galvanizado pintado"],
  [/carbono/i, "Acero al carbono pintado"],
  [/aluminio/i, "Aluminio"],
]
const canonMaterial = (raw) => { if (!raw) return null; for (const [re, name] of CANON) if (re.test(raw)) return name; return raw.trim() }
const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1)
const num = (s) => { const n = Number(String(s).replace(",", ".")); return Number.isFinite(n) && n > 0 ? n : null }
const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1).replace(/\.0$/, ""))

/** Parses the legacy free-text dimension strings used by the seed. */
const parseDims = (text, variants) => {
  const out = { length: null, depth: null, height: null, adjustable: false, heightMax: null, note: null, perVariant: {} }
  if (!text) return out
  const triple = /(\d+(?:[.,]\d+)?)\s*[×x]\s*(\d+(?:[.,]\d+)?)\s*[×x]\s*(\d+(?:[.,]\d+)?)\s*cm/gi
  const triples = [...text.matchAll(triple)].map((m) => [num(m[1]), num(m[2]), num(m[3])])
  if (triples.length) {
    ;[out.length, out.depth, out.height] = triples[0]
    for (const v of variants) {
      const m = (v.title || "").match(/(\d+(?:[.,]\d+)?)\s*[×x]\s*(\d+(?:[.,]\d+)?)\s*[×x]\s*(\d+(?:[.,]\d+)?)/)
      if (m) out.perVariant[v.id] = [num(m[1]), num(m[2]), num(m[3])]
    }
    return out
  }
  const base = text.match(/Base\s+(\d+)\s*[×x]\s*(\d+)/i)
  const tray = text.match(/Bandeja\s+(\d+)\s*[×x]\s*(\d+)\s*cm/i)
  const range = text.match(/Altura[^\d]*(\d+)\s*[–-]\s*(\d+)/i)
  if (base) { out.length = num(base[1]); out.depth = num(base[2]) }
  if (range) { out.height = num(range[1]); out.heightMax = num(range[2]); out.adjustable = true }
  if (tray) out.note = `Bandeja removible ${tray[1]} × ${tray[2]} cm`
  return out
}

const dimsLine = (d) => {
  const parts = [d.length, d.depth, d.height].map((n, i) => (n === null ? null : i === 2 && d.adjustable && d.heightMax ? `${fmt(n)}–${fmt(d.heightMax)}` : fmt(n)))
  return parts.every((p) => p === null) ? null : `${parts.map((p) => p ?? "—").join(" × ")} cm`
}

const { products } = await admin("/products?limit=100&fields=id,title,handle,status,subtitle,material,length,width,height,thumbnail,metadata,*images,*variants,*variants.prices")
console.log(`${products.length} productos · ${APPLY ? "APLICANDO" : "simulación (use --apply para escribir)"}\n`)

let materialsApi = true
const ensureMaterial = async (name) => {
  if (!materialsApi || !name) return
  try {
    const { materials } = await admin("/materials")
    if (materials.some((m) => m.name.toLowerCase() === name.toLowerCase())) return
    if (APPLY) await admin("/materials", { method: "POST", body: JSON.stringify({ name }) })
    console.log(`  + material nuevo en la lista: ${name}`)
  } catch (e) {
    materialsApi = false
    console.log(`  (lista de materiales no disponible todavía: ${String(e.message).slice(0, 80)})`)
  }
}

for (const p of products) {
  const meta = p.metadata || {}
  const material = canonMaterial(p.material || meta.material)
  const legacyDims = typeof meta.dimensions === "string" ? meta.dimensions : null
  const d = parseDims(legacyDims, p.variants || [])
  const hasPrice = (p.variants || []).some((v) => (v.prices || []).some((pr) => pr.amount > 0))
  const altFor = (i) => (i === 0 ? `${p.title}${material ? ` en ${lower(material)}` : ""}` : `Detalle ${i} de ${lower(p.title)}`)
  const image_alts = Object.fromEntries((p.images || []).map((img, i) => [img.url, (meta.image_alts && meta.image_alts[img.url]) || altFor(i)]))
  const features = Array.isArray(meta.features) ? meta.features : typeof meta.features === "string" ? meta.features.split(/[\n;]/).map((s) => s.trim()).filter(Boolean) : []

  const metadata = {
    ...meta,
    material,
    dim_length: d.length, dim_depth: d.depth, dim_height: d.height,
    dim_adjustable: d.adjustable, dim_length_max: null, dim_depth_max: null, dim_height_max: d.heightMax,
    dim_note: d.note,
    dimensions: dimsLine(d) || legacyDims || null,
    features,
    availability: meta.availability || "on_order",
    show_price: typeof meta.show_price === "boolean" ? meta.show_price : hasPrice,
    seo_title: meta.seo_title ?? null, seo_title_custom: meta.seo_title_custom === true,
    seo_description: meta.seo_description ?? null, seo_description_custom: meta.seo_description_custom === true,
    handle_custom: meta.handle_custom === true,
    subtitle_custom: !!p.subtitle,
    image_alts,
    datasheet_url: meta.datasheet_url ?? null, datasheet_name: meta.datasheet_name ?? null,
  }
  const variants = (p.variants || []).map((v) => { const pv = d.perVariant[v.id]; return { id: v.id, length: pv ? pv[0] : d.length, width: pv ? pv[1] : d.depth, height: pv ? pv[2] : d.height } })
  const body = { material, length: d.length, width: d.depth, height: d.height, thumbnail: p.thumbnail || p.images?.[0]?.url || null, metadata, variants }

  console.log(`## ${p.handle}`)
  console.log(`  material: ${material} · dims: ${metadata.dimensions || "—"}${d.note ? ` · nota: ${d.note}` : ""}${d.adjustable ? " · ajustable" : ""}`)
  console.log(`  disponibilidad: ${metadata.availability} · precio visible: ${metadata.show_price} · características: ${features.length} · fotos con ALT: ${Object.keys(image_alts).length}`)
  if (Object.keys(d.perVariant).length) console.log(`  variantes con medidas: ${variants.map((v) => `${v.length}×${v.width}×${v.height}`).join(", ")}`)
  await ensureMaterial(material)
  if (APPLY) {
    await admin(`/products/${p.id}`, { method: "POST", body: JSON.stringify(body) })
    console.log("  ✓ actualizado")
  }
}
console.log(APPLY ? "\nMigración aplicada" : "\nSimulación terminada")
