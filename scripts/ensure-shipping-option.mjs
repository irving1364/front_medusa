#!/usr/bin/env node
/**
 * Makes cart completion possible for quote requests: Medusa refuses to complete a cart whose
 * items require shipping unless a shipping method is selected. This creates, once, a zero-cost
 * shipping option "Entrega e instalación (se cotiza)" on the Karven Panamá stock location:
 *   stock location -> fulfillment set (shipping) -> service zone (Panamá) -> shipping option (flat, 0 PAB)
 * The storefront picks that option automatically in /api/checkout.
 *
 *   node scripts/ensure-shipping-option.mjs      # reads front/.env.local
 */
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const env = Object.fromEntries(
  readFileSync(join(root, ".env.local"), "utf8").split(/\r?\n/).filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")] })
)
const BACKEND = (env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "").replace(/\/$/, "")
if (!BACKEND || !env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) throw new Error("Missing NEXT_PUBLIC_MEDUSA_BACKEND_URL / ADMIN_EMAIL / ADMIN_PASSWORD in .env.local")

const OPTION_NAME = "Entrega e instalación (se cotiza)"
const PROVIDER = "manual_manual"

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
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status} ${JSON.stringify(json).slice(0, 400)}`)
  return json
}

// 1. Stock location (first one) with its fulfillment sets and providers
const { stock_locations } = await api("/stock-locations?limit=5&fields=id,name,*fulfillment_sets,*fulfillment_sets.service_zones,*fulfillment_providers")
let location = stock_locations[0]
if (!location) throw new Error("No stock location found; create one in the admin first")
console.log(`Location: ${location.name} (${location.id})`)

// 2. Fulfillment provider linked to the location
const providers = (location.fulfillment_providers || []).map((p) => p.id)
if (!providers.includes(PROVIDER)) {
  await api(`/stock-locations/${location.id}/fulfillment-providers`, { add: [PROVIDER] })
  console.log(`Linked provider ${PROVIDER}`)
}

// 3. Fulfillment set of type shipping
let fset = (location.fulfillment_sets || []).find((f) => f.type === "shipping")
if (!fset) {
  await api(`/stock-locations/${location.id}/fulfillment-sets`, { name: `${location.name} · Envíos`, type: "shipping" })
  location = (await api(`/stock-locations/${location.id}?fields=id,name,*fulfillment_sets,*fulfillment_sets.service_zones`)).stock_location
  fset = (location.fulfillment_sets || []).find((f) => f.type === "shipping")
  console.log(`Created fulfillment set ${fset.id}`)
}

// 4. Service zone covering Panamá
// (there is no GET /admin/fulfillment-sets/:id; zones come expanded on the stock location)
let zone = (fset.service_zones || [])[0]
if (!zone) {
  const res = await api(`/fulfillment-sets/${fset.id}/service-zones`, { name: "Panamá", geo_zones: [{ type: "country", country_code: "pa" }] })
  zone = res.fulfillment_set.service_zones[0]
  console.log(`Created service zone ${zone.id}`)
}

// 5. Shipping option, flat 0 PAB
const { shipping_profiles } = await api("/shipping-profiles?limit=1")
const { regions } = await api("/regions?limit=5")
const region = regions.find((r) => r.currency_code === "pab") || regions[0]
const { shipping_options } = await api(`/shipping-options?service_zone_id=${zone.id}&limit=20`)
let option = shipping_options.find((o) => o.name === OPTION_NAME)
if (!option) {
  const res = await api("/shipping-options", {
    name: OPTION_NAME,
    service_zone_id: zone.id,
    shipping_profile_id: shipping_profiles[0].id,
    provider_id: PROVIDER,
    price_type: "flat",
    type: { label: "Cotización", description: "El costo de entrega e instalación se incluye en la cotización formal.", code: "quote" },
    prices: [{ currency_code: "pab", amount: 0 }, { region_id: region.id, amount: 0 }],
    rules: [{ attribute: "enabled_in_store", value: "true", operator: "eq" }, { attribute: "is_return", value: "false", operator: "eq" }],
  })
  option = res.shipping_option
  console.log(`Created shipping option ${option.id}`)
} else {
  console.log(`Shipping option already exists (${option.id})`)
}
console.log("Done.")
