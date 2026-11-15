// Checks the exact create/update payloads the "Productos web" form sends for variants, options, featured collection and delete.
import { readFileSync } from "node:fs"

const env = Object.fromEntries(readFileSync(new URL("../.env.local", import.meta.url), "utf8").split(/\r?\n/).filter((l) => l && !l.startsWith("#") && l.includes("=")).map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] }))
const BACKEND = (env.MEDUSA_BACKEND_URL || env.NEXT_PUBLIC_MEDUSA_BACKEND_URL).replace(/\/$/, "")
const KEY = env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY
const login = await fetch(`${BACKEND}/auth/user/emailpass`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: env.ADMIN_EMAIL, password: env.ADMIN_PASSWORD }) })
const { token } = await login.json()
const admin = async (path, init = {}) => {
  const res = await fetch(`${BACKEND}/admin${path}`, { ...init, headers: { authorization: `Bearer ${token}`, "content-type": "application/json" } })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`${init.method || "GET"} ${path} -> ${res.status} ${JSON.stringify(body).slice(0, 400)}`)
  return body
}
const F = "id,title,handle,status,collection_id,*collection,*options,*options.values,*variants,*variants.prices,*variants.options"
const show = (p) => console.log(`  option: ${p.options.map((o) => `${o.title}=[${o.values.map((v) => v.value).join(", ")}]`).join(" ")} | variants: ${p.variants.map((v) => `${v.title} (${v.sku || "-"}) B/.${v.prices.find((x) => x.currency_code === "pab")?.amount ?? "-"} ${v.length ?? "-"}x${v.width ?? "-"}x${v.height ?? "-"}`).join("; ")} | collection: ${p.collection?.handle || "-"}`)
const step = (s) => console.log(`\n· ${s}`)

for (const old of (await admin("/products?q=Prueba%20variantes&fields=id,title")).products.filter((p) => /^Prueba variantes/.test(p.title))) await admin(`/products/${old.id}`, { method: "DELETE" })
const sc = (await admin("/sales-channels")).sales_channels[0]
const col = (await admin("/collections?handle=destacados")).collections[0]
const variant = (title, sku, price, L, W, H, id) => ({ ...(id ? { id } : {}), title, sku, manage_inventory: false, options: { Medida: title }, length: L, width: W, height: H, prices: price ? [{ currency_code: "pab", amount: price }] : [] })

step("create with two sizes (form payload)")
let { product: p } = await admin(`/products?fields=${F}`, { method: "POST", body: JSON.stringify({
  title: "Prueba variantes · Mesa", handle: "prueba-variantes-mesa", status: "draft", sales_channels: [{ id: sc.id }],
  options: [{ title: "Medida", values: ["120 × 60 × 90 cm", "150 × 60 × 90 cm"] }],
  variants: [variant("120 × 60 × 90 cm", "PV-120", 925, 120, 60, 90), variant("150 × 60 × 90 cm", "PV-150", 990, 150, 60, 90)],
  collection_id: col?.id || null, metadata: { home_order: 3 },
}) })
show(p)

step("update: rename option, change a price, remove one variant (deleteVariant), add a third")
const removed = p.variants.find((v) => v.title.startsWith("150"))
await admin(`/products/${p.id}/variants/${removed.id}`, { method: "DELETE" })
const keep = p.variants.find((v) => v.title.startsWith("120"))
;({ product: p } = await admin(`/products/${p.id}?fields=${F}`, { method: "POST", body: JSON.stringify({
  options: [{ id: p.options[0].id, title: "Medida", values: ["120 × 60 × 90 cm", "180 × 70 × 90 cm"] }],
  variants: [variant("120 × 60 × 90 cm", "PV-120", 950, 120, 60, 90, keep.id), variant("180 × 70 × 90 cm", "PV-180", 1200, 180, 70, 90)],
  collection_id: null, metadata: { home_order: null },
}) }))
show(p)

step("update: back to a single 'Estándar' variant with option renamed to Modelo")
const first = p.variants[0]
for (const v of p.variants.slice(1)) await admin(`/products/${p.id}/variants/${v.id}`, { method: "DELETE" })
;({ product: p } = await admin(`/products/${p.id}?fields=${F}`, { method: "POST", body: JSON.stringify({
  options: [{ id: p.options[0].id, title: "Modelo", values: ["Estándar"] }],
  variants: [{ id: first.id, title: "Estándar", sku: "PV-STD", manage_inventory: false, options: { Modelo: "Estándar" }, length: 120, width: 60, height: 90, prices: [{ currency_code: "pab", amount: 777 }] }],
}) }))
show(p)

step("store sees the single variant with its price")
const reg = (await (await fetch(`${BACKEND}/store/regions`, { headers: { "x-publishable-api-key": KEY } })).json()).regions[0]
await admin(`/products/${p.id}`, { method: "POST", body: JSON.stringify({ status: "published" }) })
const st = await (await fetch(`${BACKEND}/store/products?handle=${p.handle}&region_id=${reg.id}&fields=*variants,*variants.calculated_price`, { headers: { "x-publishable-api-key": KEY } })).json()
console.log("  store:", st.products[0]?.variants.map((v) => `${v.title} ${v.calculated_price?.calculated_amount}`).join("; "))

step("delete product")
await admin(`/products/${p.id}`, { method: "DELETE" })
console.log("  deleted:", (await admin(`/products?handle=${p.handle}&fields=id`)).products.length === 0)
console.log("\nOK")
