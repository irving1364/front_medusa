// End-to-end check of the "Productos web" backend against the live Medusa (admin login from .env.local).
// Usage: node scripts/test-web-products-api.mjs [--keep]
import { readFileSync } from "node:fs"
import { openAsBlob } from "node:fs"

const env = Object.fromEntries(readFileSync(new URL("../.env.local", import.meta.url), "utf8").split(/\r?\n/).filter((l) => l && !l.startsWith("#") && l.includes("=")).map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] }))
const BACKEND = (env.MEDUSA_BACKEND_URL || env.NEXT_PUBLIC_MEDUSA_BACKEND_URL).replace(/\/$/, "")
const KEY = env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY
const keep = process.argv.includes("--keep")

const login = await fetch(`${BACKEND}/auth/user/emailpass`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: env.ADMIN_EMAIL, password: env.ADMIN_PASSWORD }) })
if (!login.ok) throw new Error(`login ${login.status}`)
const { token } = await login.json()
const admin = async (path, init = {}) => {
  const res = await fetch(`${BACKEND}/admin${path}`, { ...init, headers: { authorization: `Bearer ${token}`, ...(init.body instanceof FormData ? {} : { "content-type": "application/json" }), ...(init.headers || {}) } })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`${init.method || "GET"} ${path} -> ${res.status} ${JSON.stringify(body).slice(0, 300)}`)
  return body
}
const store = async (path) => { const res = await fetch(`${BACKEND}/store${path}`, { headers: { "x-publishable-api-key": KEY } }); return { status: res.status, body: await res.json().catch(() => ({})) } }
const step = (s) => console.log(`\n· ${s}`)

step("materials: seeded list")
const { materials } = await admin("/materials")
console.log(materials.map((m) => `${m.name}${m.active ? "" : " (off)"}`).join(" | "))

step("materials: create, duplicate rejected, rename, disable, delete")
const { material } = await admin("/materials", { method: "POST", body: JSON.stringify({ name: "Prueba API material" }) })
const dup = await fetch(`${BACKEND}/admin/materials`, { method: "POST", headers: { authorization: `Bearer ${token}`, "content-type": "application/json" }, body: JSON.stringify({ name: "prueba api MATERIAL" }) })
console.log("duplicate ->", dup.status, (await dup.json()).message)
const renamed = await admin(`/materials/${material.id}`, { method: "POST", body: JSON.stringify({ name: "Prueba API renombrado", active: false }) })
console.log("renamed:", renamed.material.name, "active:", renamed.material.active)
await admin(`/materials/${material.id}`, { method: "DELETE" })
console.log("deleted; remaining:", (await admin("/materials")).materials.length)

step("web-uploads: PNG product photo -> WebP max 1600")
const fd = new FormData()
fd.append("files", await openAsBlob("C:/dev/medusa/front/public/products/mesa-de-mayo-base-h-movil.jpg", { type: "image/jpeg" }), "Mesa de Mayo base H móvil.jpg")
fd.append("files", await openAsBlob("C:/dev/medusa/front/public/images/og-image.png", { type: "image/png" }), "og-image.png")
const { files } = await admin("/web-uploads", { method: "POST", body: fd })
for (const f of files) console.log(`${f.name} ${f.width}×${f.height} ${(f.size / 1024).toFixed(0)} KB (orig ${(f.original_size / 1024).toFixed(0)} KB) optimized=${f.optimized}`, f.url)
const head = await fetch(files[0].url, { method: "HEAD" })
console.log("served as:", head.headers.get("content-type"), head.status)

step("product: create through the same payload the form sends")
for (const old of (await admin("/products?q=Prueba%20API&fields=id,title")).products.filter((p) => /^Prueba API/.test(p.title))) { await admin(`/products/${old.id}`, { method: "DELETE" }); console.log("removed leftover", old.title) }
const cats = (await admin("/product-categories?limit=200&fields=id,name,handle,parent_category_id")).product_categories
const jaulas = cats.find((c) => c.handle === "jaulas-veterinarias")
const sc = (await admin("/sales-channels")).sales_channels[0]
const body = {
  title: "Prueba API · Jaula de 3 estaciones", subtitle: "Jaula veterinaria en acero inoxidable AISI 304", description: "Producto de prueba creado por el script.",
  handle: "prueba-api-jaula-3-estaciones", status: "published", material: "Acero inoxidable AISI 304", length: 120, width: 70, height: 165,
  images: files.filter((f) => f.optimized).map((f) => ({ url: f.url })), thumbnail: files[0].url,
  categories: jaulas ? [{ id: jaulas.id }] : [], sales_channels: [{ id: sc.id }],
  options: [{ title: "Modelo", values: ["Estándar"] }],
  variants: [{ title: "Estándar", options: { Modelo: "Estándar" }, manage_inventory: false, length: 120, width: 70, height: 165, prices: [] }],
  metadata: { material: "Acero inoxidable AISI 304", dim_length: 120, dim_depth: 70, dim_height: 165, dim_adjustable: false, dimensions: "120 × 70 × 165 cm", features: ["Tres estaciones", "Base con ruedas"], availability: "custom", show_price: false, seo_title: null, seo_title_custom: false, seo_description: null, seo_description_custom: false, handle_custom: false, subtitle_custom: false, image_alts: { [files[0].url]: "Jaula de prueba en acero inoxidable AISI 304" } },
}
const { product } = await admin("/products?fields=id,title,handle,status,thumbnail,material,length,*variants,*categories,*sales_channels,metadata", { method: "POST", body: JSON.stringify(body) })
console.log(product.id, product.handle, product.status, "| variants:", product.variants.length, "| category:", product.categories?.[0]?.handle, "| channel:", product.sales_channels?.[0]?.name, "| material:", product.material)

step("store: visible with the new fields")
const pub = await store(`/products?handle=${product.handle}&fields=id,handle,material,length,metadata,*images`)
console.log("store status:", pub.status, "| found:", pub.body.products?.length, "| availability:", pub.body.products?.[0]?.metadata?.availability, "| alt:", Object.values(pub.body.products?.[0]?.metadata?.image_alts || {})[0])

step("redirect: rename handle of a published product")
const { product: moved } = await admin(`/products/${product.id}`, { method: "POST", body: JSON.stringify({ handle: "prueba-api-jaula-3-estaciones-v2" }) })
await admin("/product-redirects", { method: "POST", body: JSON.stringify({ from_handle: product.handle, to_handle: moved.handle, product_id: product.id }) })
const r1 = await store(`/product-redirects/${product.handle}`)
console.log("old -> new:", r1.status, r1.body.to_handle)
await admin(`/products/${product.id}`, { method: "POST", body: JSON.stringify({ handle: "prueba-api-jaula-3-estaciones-v3" }) })
await admin("/product-redirects", { method: "POST", body: JSON.stringify({ from_handle: moved.handle, to_handle: "prueba-api-jaula-3-estaciones-v3", product_id: product.id }) })
const r2 = await store(`/product-redirects/${product.handle}`)
console.log("chain collapsed (v1 -> v3):", r2.body.to_handle)
console.log("admin list for product:", (await admin(`/product-redirects?product_id=${product.id}`)).redirects.map((r) => `${r.from_handle}->${r.to_handle}`).join(", "))

if (!keep) {
  step("cleanup")
  await admin(`/products/${product.id}`, { method: "DELETE" })
  console.log("test product deleted")
}
console.log("\nOK")
