// End-to-end check of the Cotizaciones module against the live backend (admin login from .env.local).
// Usage: node scripts/test-quotes-api.mjs [--send you@mail.com] [--keep]
import { readFileSync, writeFileSync } from "node:fs"

const env = Object.fromEntries(readFileSync(new URL("../.env.local", import.meta.url), "utf8").split(/\r?\n/).filter((l) => l && !l.startsWith("#") && l.includes("=")).map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] }))
const BACKEND = (env.MEDUSA_BACKEND_URL || env.NEXT_PUBLIC_MEDUSA_BACKEND_URL).replace(/\/$/, "")
const args = process.argv.slice(2)
const sendTo = args.includes("--send") ? args[args.indexOf("--send") + 1] : null
const keep = args.includes("--keep")

const login = await fetch(`${BACKEND}/auth/user/emailpass`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: env.ADMIN_EMAIL, password: env.ADMIN_PASSWORD }) })
if (!login.ok) throw new Error(`login ${login.status}`)
const { token } = await login.json()
const H = { authorization: `Bearer ${token}`, "content-type": "application/json" }
const admin = async (path, init = {}) => {
  const res = await fetch(`${BACKEND}/admin${path}`, { ...init, headers: H })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`${init.method || "GET"} ${path} -> ${res.status} ${JSON.stringify(body).slice(0, 300)}`)
  return body
}
const step = (s) => console.log(`\n· ${s}`)

step("profiles (seeded on first use)")
const { profiles } = await admin("/quote-profiles")
for (const p of profiles) console.log(` ${p.store}: ${p.brand_line} · next ${p.number_prefix}${String(p.next_number).padStart(5, "0")} · validez ${p.validity_days} d · ITBMS ${p.tax_rate}%`)

step("create draft (FABMETAL) with two lines like the Odoo sample")
const lines = [
  { id: "l1", ref: "FM-MES-TR-001", title: "Mesa de Trabajo Inoxidable", description: "Mesa de Trabajo de Dos Niveles en Acero Inoxidable AISI 304\n\nFabricada con cubierta superior y repisa inferior en lámina calibre 18, estructura de cuatro patas cuadradas de 1½”, refuerzos tipo omega y niveladores ajustables. Uniones mediante soldadura TIG, acabado satinado y bordes debidamente terminados.\n\nMedidas: 150 × 60 × 80 cm.", quantity: 7, unit: "Unidades", unit_price: 500, discount_pct: 0, tax_rate: 7 },
  { id: "l2", ref: null, title: "Mesa de trabajo con un fregadero de acero inoxidable", description: "Mesa de Trabajo con Tina Derecha en Acero Inoxidable AISI 304\n\nMedidas: 120 × 60 × 80 cm.\nTina: 50 × 40 × 25 cm, aproximadamente.\n\nNo incluye: instalación de plomería, conexiones hidráulicas en el establecimiento.", quantity: 2, unit: "Unidades", unit_price: 710, discount_pct: 0, tax_rate: 7 },
]
let { quote } = await admin("/quotes", { method: "POST", body: JSON.stringify({ store: "fabmetal", customer_name: "Cliente Regular", customer_email: sendTo || "cliente@example.com", contact_name: "Prueba API", lines }) })
console.log(` ${quote.number} · ${quote.status} · subtotal ${quote.subtotal} · ITBMS ${quote.tax_total} · total ${quote.total} · vence ${quote.valid_until?.slice(0, 10)}`)
if (quote.subtotal !== 4920 || quote.tax_total !== 344.4 || quote.total !== 5264.4) throw new Error("totals differ from the Odoo sample")

step("pdf")
const pdfRes = await fetch(`${BACKEND}/admin/quotes/${quote.id}/pdf`, { headers: { authorization: `Bearer ${token}` } })
const pdf = Buffer.from(await pdfRes.arrayBuffer())
console.log(` status ${pdfRes.status} · ${pdfRes.headers.get("content-type")} · ${(pdf.length / 1024).toFixed(0)} KB · starts with %PDF: ${pdf.subarray(0, 4).toString() === "%PDF"}`)
writeFileSync("C:/Users/irvin/AppData/Local/Temp/claude/033af47aa7d46d6c/e992218e-b493-4215-89b8-66e45bda86de/scratchpad/cotizacion-test.pdf", pdf)

step("update: discount on line 2 → totals recomputed")
;({ quote } = await admin(`/quotes/${quote.id}`, { method: "POST", body: JSON.stringify({ lines: lines.map((l) => (l.id === "l2" ? { ...l, discount_pct: 10 } : l)) }) }))
console.log(` subtotal ${quote.subtotal} · descuento ${quote.discount_total} · total ${quote.total}`)

step("status: draft → sent (manual) → edit → back to draft v2 → approved → locked → reopened")
;({ quote } = await admin(`/quotes/${quote.id}/status`, { method: "POST", body: JSON.stringify({ status: "sent", note: "Enviada por WhatsApp" }) }))
console.log(` ${quote.status} v${quote.version}`)
;({ quote } = await admin(`/quotes/${quote.id}`, { method: "POST", body: JSON.stringify({ intro_text: "Propuesta revisada." }) }))
console.log(` after edit: ${quote.status} v${quote.version}`)
;({ quote } = await admin(`/quotes/${quote.id}/status`, { method: "POST", body: JSON.stringify({ status: "approved" }) }))
console.log(` ${quote.status} v${quote.version}`)
const locked = await fetch(`${BACKEND}/admin/quotes/${quote.id}`, { method: "POST", headers: H, body: JSON.stringify({ customer_name: "Otro" }) })
console.log(` edit while approved rejected: ${locked.status}`)
;({ quote } = await admin(`/quotes/${quote.id}/status`, { method: "POST", body: JSON.stringify({ status: "draft" }) }))
console.log(` ${quote.status} v${quote.version}`)

if (sendTo) {
  step(`send by email to ${sendTo}`)
  const sent = await admin(`/quotes/${quote.id}/send`, { method: "POST", body: JSON.stringify({ to: [sendTo], subject: `Prueba cotización ${quote.number}`, message: "Mensaje de prueba del módulo de cotizaciones.\n\nSaludos." }) })
  console.log(` ${sent.quote.status} · pdf ${sent.pdf_url} · email ${sent.email_id}`)
  quote = sent.quote
}

step("duplicate + revisions + list filters")
const { quote: copy } = await admin(`/quotes/${quote.id}/duplicate`, { method: "POST" })
console.log(` copy ${copy.number} · ${copy.status} · lines ${copy.lines.length}`)
const { revisions } = await admin(`/quotes/${quote.id}/revisions`)
console.log(` revisions: ${revisions.map((r) => `${r.action}(v${r.version})`).join(", ")}`)
console.log(` list fabmetal drafts: ${(await admin("/quotes?store=fabmetal&status=draft&limit=5")).count} · search "Regular": ${(await admin("/quotes?q=Regular")).count}`)

if (!keep) {
  step("cleanup")
  await admin(`/quotes/${quote.id}`, { method: "DELETE" })
  await admin(`/quotes/${copy.id}`, { method: "DELETE" })
  console.log(" test quotes deleted (numbers are not reused)")
}
console.log("\nOK")
