// Checks the multi-company setup: companies + sales channels, product scoping per company, project company filter, quote identity.
import { readFileSync } from "node:fs"

const env = Object.fromEntries(readFileSync(new URL("../.env.local", import.meta.url), "utf8").split(/\r?\n/).filter((l) => l && !l.startsWith("#") && l.includes("=")).map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] }))
const BACKEND = (env.MEDUSA_BACKEND_URL || env.NEXT_PUBLIC_MEDUSA_BACKEND_URL).replace(/\/$/, "")
const KEY = env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY
const login = await fetch(`${BACKEND}/auth/user/emailpass`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: env.ADMIN_EMAIL, password: env.ADMIN_PASSWORD }) })
const { token } = await login.json()
const H = { authorization: `Bearer ${token}`, "content-type": "application/json" }
const admin = async (path, init = {}) => { const res = await fetch(`${BACKEND}/admin${path}`, { ...init, headers: H }); const body = await res.json().catch(() => ({})); if (!res.ok) throw new Error(`${init.method || "GET"} ${path} -> ${res.status} ${JSON.stringify(body).slice(0, 300)}`); return body }
const store = async (path) => { const res = await fetch(`${BACKEND}/store${path}`, { headers: { "x-publishable-api-key": KEY } }); return { status: res.status, body: await res.json().catch(() => ({})) } }
const step = (s) => console.log(`\n· ${s}`)

step("companies (seeded + sales channels)")
const { companies } = await admin("/companies")
for (const c of companies) console.log(` ${c.code}: ${c.name} · marca "${c.brand_line}" · canal ${c.sales_channel_id || "—"} · remitente ${c.from_email}`)
const fab = companies.find((c) => c.code === "fabmetal"), kar = companies.find((c) => c.code === "karven")
const channels = (await admin("/sales-channels")).sales_channels
console.log(" canales:", channels.map((s) => `${s.name}${s.id === kar.sales_channel_id ? " (karven)" : s.id === fab.sales_channel_id ? " (fabmetal)" : ""}`).join(" | "))

step("product only on FABMETAL is hidden from the Karven storefront")
for (const old of (await admin("/products?q=Prueba%20empresa&fields=id,title")).products.filter((p) => /^Prueba empresa/.test(p.title))) await admin(`/products/${old.id}`, { method: "DELETE" })
const { product } = await admin("/products?fields=id,handle,*sales_channels", { method: "POST", body: JSON.stringify({ title: "Prueba empresa · Mesa FABMETAL", handle: "prueba-empresa-mesa-fabmetal", status: "published", sales_channels: [{ id: fab.sales_channel_id }], options: [{ title: "Modelo", values: ["Estándar"] }], variants: [{ title: "Estándar", options: { Modelo: "Estándar" }, manage_inventory: false, prices: [] }] }) })
console.log(" canales del producto:", product.sales_channels.map((s) => s.name).join(", "))
console.log(" visible en karvenmedical (store API):", (await store(`/products?handle=${product.handle}`)).body.products?.length ? "SÍ (mal)" : "no (correcto)")
await admin(`/products/${product.id}`, { method: "POST", body: JSON.stringify({ sales_channels: [{ id: fab.sales_channel_id }, { id: kar.sales_channel_id }] }) })
console.log(" tras añadir KARVEN:", (await store(`/products?handle=${product.handle}`)).body.products?.length ? "visible (correcto)" : "oculto (mal)")
console.log(" lista admin filtrada por canal FABMETAL:", (await admin(`/products?sales_channel_id[]=${fab.sales_channel_id}&fields=id,title`)).products.map((p) => p.title).join(" | "))
await admin(`/products/${product.id}`, { method: "DELETE" })

step("projects: company filter")
const { project } = await admin("/projects", { method: "POST", body: JSON.stringify({ title: "Prueba empresa · Proyecto FABMETAL", line: "tecnico", company: "fabmetal" }) })
console.log(` creado ${project.slug} · empresa ${project.company}`)
console.log(" admin company=fabmetal:", (await admin("/projects?company=fabmetal")).projects.map((p) => p.slug).join(", "))
console.log(" admin company=karven incluye los existentes:", (await admin("/projects?company=karven")).count)
console.log(" store company=karven lo excluye:", (await store("/projects?company=karven")).body.projects.some((p) => p.slug === project.slug) ? "NO (mal)" : "sí")
await admin(`/projects/${project.id}`, { method: "DELETE" })

step("quote PDF uses the company identity")
const { quote } = await admin("/quotes", { method: "POST", body: JSON.stringify({ store: "fabmetal", customer_name: "Prueba empresa", lines: [{ id: "l1", title: "Mesa", quantity: 1, unit: "Unidades", unit_price: 100, discount_pct: 0, tax_rate: 7 }] }) })
const pdf = await fetch(`${BACKEND}/admin/quotes/${quote.id}/pdf`, { headers: { authorization: `Bearer ${token}` } })
console.log(` pdf ${pdf.status} ${(await pdf.arrayBuffer()).byteLength} bytes (marca: "${fab.brand_line}")`)
await admin(`/quotes/${quote.id}`, { method: "DELETE" })
console.log("\nOK")
