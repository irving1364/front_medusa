// Checks the quote customer portal and conversion to order against production.
// Sends 2 internal notification emails (labelled PRUEBA). Restores the KARVEN quote numbering and cancels the test order.
import { readFileSync, writeFileSync } from "node:fs"

const env = Object.fromEntries(readFileSync(new URL("../.env.local", import.meta.url), "utf8").split(/\r?\n/).filter((l) => l && !l.startsWith("#") && l.includes("=")).map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] }))
const B = (env.MEDUSA_BACKEND_URL || env.NEXT_PUBLIC_MEDUSA_BACKEND_URL).replace(/\/$/, "")
const K = env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY
const { token } = await (await fetch(`${B}/auth/user/emailpass`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: env.ADMIN_EMAIL, password: env.ADMIN_PASSWORD }) })).json()
const H = { authorization: `Bearer ${token}`, "content-type": "application/json" }
const admin = async (p, i = {}) => { const r = await fetch(`${B}/admin${p}`, { ...i, headers: H }); const b = await r.json().catch(() => ({})); if (!r.ok) throw new Error(`${p} ${r.status} ${JSON.stringify(b).slice(0, 300)}`); return b }
const store = (p, i = {}) => fetch(`${B}/store${p}`, { ...i, headers: { "x-publishable-api-key": K, "content-type": "application/json" } })
const step = (s) => console.log(`\n· ${s}`)

const before = (await admin("/quote-profiles")).profiles.find((p) => p.store === "karven").next_number

step("create quote (draft) — no link yet, portal hides drafts")
let { quote } = await admin("/quotes", { method: "POST", body: JSON.stringify({ store: "karven", customer_name: "PRUEBA PORTAL (ignorar)", contact_name: "Dra. Prueba", lines: [{ id: "l1", ref: "KM-VET-CT-MET-120", title: "Mesa veterinaria de exploración y tratamiento", quantity: 2, unit: "Unidades", unit_price: 925, discount_pct: 10, tax_rate: 7 }] }) })
console.log(` ${quote.number} portal_url: ${quote.portal_url}`)
const linkDraft = await fetch(`${B}/admin/quotes/${quote.id}/link`, { method: "POST", headers: H })
console.log(` enlace en borrador rechazado: ${linkDraft.status}`)

step("mark as sent → link created")
;({ quote } = await admin(`/quotes/${quote.id}/status`, { method: "POST", body: JSON.stringify({ status: "sent" }) }))
const tokenP = quote.portal_url.split("/").pop()
console.log(` ${quote.portal_url}`)

step("customer view (store API), PDF and storefront page")
let r = await store(`/quotes/${tokenP}?track=0`); let b = await r.json()
console.log(` vista ${r.status} · ${b.quote.number} · total ${b.quote.totals.total} · puede responder ${b.quote.can_respond} · notas internas expuestas: ${"notes_internal" in b.quote}`)
r = await store(`/quotes/${tokenP}`); console.log(` vista contada ${r.status}`)
const pdf = await store(`/quotes/${tokenP}/pdf`); console.log(` pdf ${pdf.status} ${pdf.headers.get("content-type")}`)
console.log(` token inválido: ${(await store("/quotes/xxxxxxxxxxxxxxxxxxxxxxxx")).status}`)
const page = await fetch(`https://karvenmedical.com/cotizacion/${tokenP}`); const html = await page.text()
console.log(` página web ${page.status} · número visible: ${html.includes(quote.number)} · noindex: ${/noindex/.test(html)}`)
writeFileSync("C:/Users/irvin/AppData/Local/Temp/claude/033af47aa7d46d6c/e992218e-b493-4215-89b8-66e45bda86de/scratchpad/portal-token.txt", tokenP)

step("customer requests changes, then approves")
r = await store(`/quotes/${tokenP}/respond`, { method: "POST", body: JSON.stringify({ action: "changes", name: "Dra. Prueba", comment: "PRUEBA: cambiar a 3 unidades" }) }); b = await r.json()
console.log(` cambios ${r.status} · estado ${b.quote.status}`)
r = await store(`/quotes/${tokenP}/respond`, { method: "POST", body: JSON.stringify({ action: "accept", name: "Dra. Prueba", comment: "PRUEBA" }) }); b = await r.json()
console.log(` aprobación ${r.status} · estado ${b.quote.status}`)
r = await store(`/quotes/${tokenP}/respond`, { method: "POST", body: JSON.stringify({ action: "reject", name: "Dra. Prueba" }) })
console.log(` responder de nuevo rechazado: ${r.status}`)
const full = (await admin(`/quotes/${quote.id}`)).quote
console.log(` panel: estado ${full.status} · vistas ${full.view_count} · respondió ${full.response_name}`)
console.log(" historial:", (await admin(`/quotes/${quote.id}/revisions`)).revisions.map((x) => x.action).join(", "))

step("convert to order")
const conv = await admin(`/quotes/${quote.id}/convert`, { method: "POST" })
console.log(` pedido #${conv.order.display_id} · total ${conv.order.total} (cotización ${full.total})`)
const again = await fetch(`${B}/admin/quotes/${quote.id}/convert`, { method: "POST", headers: H })
console.log(` convertir dos veces rechazado: ${again.status}`)
const order = (await admin(`/orders/${conv.order.id}?fields=id,display_id,status,total,email,metadata,*items,*sales_channel`)).order
console.log(` pedido: estado ${order.status} · canal ${order.sales_channel?.name} · líneas ${order.items.map((i) => `${i.quantity}× ${i.title} @ ${i.unit_price}`).join(" | ")} · meta ${order.metadata.quote_number}`)

step("cleanup")
await admin(`/orders/${conv.order.id}/cancel`, { method: "POST" }).then(() => console.log(" pedido cancelado")).catch((e) => console.log(" no se pudo cancelar el pedido:", e.message))
await admin(`/quotes/${quote.id}`, { method: "DELETE" })
await admin("/quote-profiles/karven", { method: "POST", body: JSON.stringify({ next_number: before }) })
console.log(` cotización eliminada · numeración KARVEN restaurada a ${before}`)
console.log("\nOK")
