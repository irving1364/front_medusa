#!/usr/bin/env node
/**
 * Permanently deletes the sample catalogue left in Medusa: every product whose status is `draft`
 * and every legacy collection except "destacados" (only when no products remain in it).
 * Published products and product categories are never touched.
 *
 *   node scripts/cleanup-drafts.mjs --dry-run   # list only
 *   node scripts/cleanup-drafts.mjs             # delete
 */
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const DRY = process.argv.includes("--dry-run")
const KEEP_COLLECTIONS = new Set(["destacados"])

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const env = Object.fromEntries(
  readFileSync(join(root, ".env.local"), "utf8").split(/\r?\n/).filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")] })
)
const BACKEND = (env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "").replace(/\/$/, "")
if (!BACKEND || !env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) throw new Error("Missing NEXT_PUBLIC_MEDUSA_BACKEND_URL / ADMIN_EMAIL / ADMIN_PASSWORD in .env.local")

const login = await fetch(`${BACKEND}/auth/user/emailpass`, {
  method: "POST", headers: { "content-type": "application/json" },
  body: JSON.stringify({ email: env.ADMIN_EMAIL, password: env.ADMIN_PASSWORD }),
})
if (!login.ok) throw new Error(`Admin login failed: ${login.status}`)
const { token } = await login.json()
const api = async (path, method = "GET") => {
  const res = await fetch(`${BACKEND}/admin${path}`, { method, headers: { authorization: `Bearer ${token}` } })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status} ${JSON.stringify(json).slice(0, 300)}`)
  return json
}

const { products } = await api("/products?limit=200&fields=id,title,status,collection_id")
const drafts = products.filter((p) => p.status === "draft")
const published = products.filter((p) => p.status === "published")
console.log(`Products: ${products.length} total, ${published.length} published (kept), ${drafts.length} draft (to delete)`)
for (const p of drafts) console.log(`  - ${p.title}`)
console.log("Kept:")
for (const p of published) console.log(`  + ${p.title}`)

if (!DRY) {
  for (const p of drafts) {
    await api(`/products/${p.id}`, "DELETE")
    console.log(`  deleted product ${p.title}`)
  }
}

const { collections } = await api("/collections?limit=100&fields=id,title,handle,*products")
const stale = collections.filter((c) => !KEEP_COLLECTIONS.has(c.handle))
console.log(`Collections: ${collections.length} total, ${stale.length} legacy (to delete)`)
for (const c of stale) {
  const remaining = (c.products || []).filter((p) => p.status !== "draft").length
  if (remaining > 0) { console.log(`  ! skipped ${c.handle}: still has ${remaining} published product(s)`); continue }
  console.log(`  - ${c.title} (${c.handle})`)
  if (!DRY) { await api(`/collections/${c.id}`, "DELETE"); console.log(`  deleted collection ${c.handle}`) }
}
console.log(DRY ? "Dry run: nothing deleted." : "Done.")
