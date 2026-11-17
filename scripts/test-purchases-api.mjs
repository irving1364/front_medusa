// End-to-end check of the Compras module against the live backend. Usage: node scripts/test-purchases-api.mjs [--keep]
import { readFileSync, writeFileSync } from "node:fs"

const env = Object.fromEntries(readFileSync(new URL("../.env.local", import.meta.url), "utf8").split(/\r?\n/).filter((l) => l && !l.startsWith("#") && l.includes("=")).map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] }))
const BACKEND = (env.MEDUSA_BACKEND_URL || env.NEXT_PUBLIC_MEDUSA_BACKEND_URL).replace(/\/$/, "")
const keep = process.argv.includes("--keep")
const { token } = await (await fetch(`${BACKEND}/auth/user/emailpass`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: env.ADMIN_EMAIL, password: env.ADMIN_PASSWORD }) })).json()
const H = { authorization: `Bearer ${token}`, "content-type": "application/json" }
const admin = async (path, init = {}) => { const res = await fetch(`${BACKEND}/admin${path}`, { ...init, headers: H }); const body = await res.json().catch(() => ({})); if (!res.ok) throw new Error(`${init.method || "GET"} ${path} -> ${res.status} ${JSON.stringify(body).slice(0, 300)}`); return body }
const step = (s) => console.log(`\n· ${s}`)

step("profiles")
const { profiles } = await admin("/purchase-profiles")
for (const p of profiles) console.log(` ${p.company}: siguiente ${p.number_prefix}${String(p.next_number).padStart(5, "0")} · envío a ${p.ship_to_name}`)

step("supplier + items (cleanup of previous runs first)")
for (const s of (await admin("/suppliers?q=Prueba")).suppliers) await admin(`/suppliers/${s.id}`, { method: "DELETE" })
for (const it of (await admin("/purchase-items?q=Prueba")).items) await admin(`/purchase-items/${it.id}`, { method: "DELETE" })
const { supplier } = await admin("/suppliers", { method: "POST", body: JSON.stringify({ name: "Prueba Hopsa, S.A.", ruc: "20697911751271", phone: "+507 6998-6119", address: "Ave. Transístmica y Calle 64 Oeste, Panamá", payment_terms: "Contado contra entrega" }) })
const { item: it1 } = await admin("/purchase-items", { method: "POST", body: JSON.stringify({ name: "Prueba LAMINA INOX CAL 18 4x8 (AISI304 NO4)", ref: "26451830", unit: "Láminas", category: "Lámina inoxidable", last_price: 99.61 }) })
const { item: it2 } = await admin("/purchase-items", { method: "POST", body: JSON.stringify({ name: "Prueba LAMINA INOX CAL 16 4x8 (AISI304 NO4)", unit: "Láminas", category: "Lámina inoxidable" }) })
console.log(` proveedor ${supplier.name} · materiales ${it1.ref} y sin ref · búsqueda: ${(await admin("/purchase-items?q=26451830")).count}`)

step("order like P00016 (supplier data copied from the supplier)")
const lines = [
  { id: "l1", item_id: it1.id, ref: "26451830", title: it1.name, quantity: 1, unit: "Láminas", unit_price: 99.61, discount_pct: 0, tax_rate: 7 },
  { id: "l2", item_id: it2.id, title: it2.name, quantity: 1, unit: "Láminas", unit_price: 120.08, discount_pct: 0, tax_rate: 7 },
  { id: "l3", title: "LAMINA DE ACERO INOXIDABLE CALIBRE 18 (1.20 MM) 4 X 10 PIES (AISI304 NO4)", quantity: 3, unit: "Láminas", unit_price: 131.33, discount_pct: 0, tax_rate: 7 },
  { id: "l4", title: "LAMINA DE ACERO INOXIDABLE CALIBRE 20 (0.90 MM) 4 X 10 PIES (AISI304 NO4)", quantity: 2, unit: "Láminas", unit_price: 106.98, discount_pct: 0, tax_rate: 7 },
]
let { order } = await admin("/purchase-orders", { method: "POST", body: JSON.stringify({ company: "fabmetal", supplier_id: supplier.id, supplier_name: supplier.name, expected_date: "2026-11-20", lines }) })
console.log(` ${order.number} · ${order.status} · subtotal ${order.subtotal} · ITBMS ${order.tax_total} · total ${order.total} · RUC proveedor ${order.supplier_ruc} · términos "${order.payment_terms}" · envío a ${order.ship_to_name}`)
if (order.subtotal !== 827.64 || order.tax_total !== 57.93 || order.total !== 885.57) throw new Error("totals differ from the Odoo sample")

step("pdf")
const pdfRes = await fetch(`${BACKEND}/admin/purchase-orders/${order.id}/pdf`, { headers: { authorization: `Bearer ${token}` } })
const pdf = Buffer.from(await pdfRes.arrayBuffer())
writeFileSync("C:/Users/irvin/AppData/Local/Temp/claude/033af47aa7d46d6c/e992218e-b493-4215-89b8-66e45bda86de/scratchpad/orden-compra-test.pdf", pdf)
console.log(` ${pdfRes.status} · ${(pdf.length / 1024).toFixed(0)} KB · %PDF: ${pdf.subarray(0, 4).toString() === "%PDF"}`)

step("status: confirm → partial receipt → payment → final receipt → locked")
const rcBlocked = await fetch(`${BACKEND}/admin/purchase-orders/${order.id}/receipts`, { method: "POST", headers: H, body: JSON.stringify({ lines: [{ line_id: "l1", quantity: 1 }] }) })
console.log(` recepción en borrador rechazada: ${rcBlocked.status}`)
;({ order } = await admin(`/purchase-orders/${order.id}/status`, { method: "POST", body: JSON.stringify({ status: "confirmed", note: "Confirmada por teléfono" }) }))
console.log(` ${order.status}`)
;({ order } = await admin(`/purchase-orders/${order.id}/receipts`, { method: "POST", body: JSON.stringify({ reference: "F-1001", lines: [{ line_id: "l1", quantity: 1 }, { line_id: "l3", quantity: 2 }] }) }))
console.log(` tras recepción parcial: ${order.status} · factura ${order.invoice_reference} · l3 recibido ${order.lines.find((l) => l.id === "l3").received_qty}/3`)
const over = await fetch(`${BACKEND}/admin/purchase-orders/${order.id}/receipts`, { method: "POST", headers: H, body: JSON.stringify({ lines: [{ line_id: "l3", quantity: 5 }] }) })
console.log(` recibir de más rechazado: ${over.status}`)
;({ order } = await admin(`/purchase-orders/${order.id}/payments`, { method: "POST", body: JSON.stringify({ amount: 400, method: "Transferencia", reference: "TRF-77" }) }))
console.log(` abono 400 → abonado ${order.paid_total} · saldo ${order.balance}`)
const overpay = await fetch(`${BACKEND}/admin/purchase-orders/${order.id}/payments`, { method: "POST", headers: H, body: JSON.stringify({ amount: 1000 }) })
console.log(` abono mayor al saldo rechazado: ${overpay.status}`)
;({ order } = await admin(`/purchase-orders/${order.id}/receipts`, { method: "POST", body: JSON.stringify({ lines: [{ line_id: "l2", quantity: 1 }, { line_id: "l3", quantity: 1 }, { line_id: "l4", quantity: 2 }] }) }))
console.log(` tras recepción final: ${order.status}`)
const edit = await fetch(`${BACKEND}/admin/purchase-orders/${order.id}`, { method: "POST", headers: H, body: JSON.stringify({ supplier_name: "Otro" }) })
console.log(` editar contenido recibida rechazado: ${edit.status}`)
;({ order } = await admin(`/purchase-orders/${order.id}/payments`, { method: "POST", body: JSON.stringify({ amount: order.balance, method: "ACH" }) }))
console.log(` saldo final ${order.balance}`)

step("last price remembered on items + history + list filters")
const items = (await admin("/purchase-items?q=Prueba")).items
console.log(" últimos precios:", items.map((i) => `${i.name.slice(7, 30)}… ${i.last_price} (${i.last_supplier_name})`).join(" | "))
const full = await admin(`/purchase-orders/${order.id}`)
console.log(" eventos:", full.events.map((e) => e.action).join(", "), "| recepciones:", full.receipts.length, "| abonos:", full.payments.length)
console.log(" lista fabmetal recibidas:", (await admin("/purchase-orders?company=fabmetal&status=received")).count, "| con saldo:", (await admin("/purchase-orders?status=pending_payment")).count)
const { order: copy } = await admin(`/purchase-orders/${order.id}/duplicate`, { method: "POST" })
console.log(` duplicada: ${copy.number} ${copy.status} recibido l1 = ${copy.lines[0].received_qty}`)

if (!keep) {
  step("cleanup")
  await admin(`/purchase-orders/${copy.id}`, { method: "DELETE" })
  const cancelled = await fetch(`${BACKEND}/admin/purchase-orders/${order.id}`, { method: "DELETE", headers: H })
  console.log(` orden de prueba eliminada: ${cancelled.status}`)
  for (const it of items) await admin(`/purchase-items/${it.id}`, { method: "DELETE" })
  await admin(`/suppliers/${supplier.id}`, { method: "DELETE" })
  console.log(" proveedor y materiales de prueba eliminados")
}
console.log("\nOK")
