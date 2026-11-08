#!/usr/bin/env node
/**
 * Upload a technical datasheet PDF to a Medusa product and link it in metadata.
 *
 *   node scripts/upload-datasheet.mjs <product-handle> <path/to/file.pdf>
 *   node scripts/upload-datasheet.mjs --remove <product-handle>
 *
 * Reads NEXT_PUBLIC_MEDUSA_BACKEND_URL, ADMIN_EMAIL and ADMIN_PASSWORD from .env.local (run from front/).
 * Same effect as the "Ficha técnica (PDF)" panel in the Medusa admin; handy for bulk loads.
 */
import { readFileSync } from "node:fs"
import { basename, resolve } from "node:path"

const env = Object.fromEntries(
  readFileSync(resolve(process.cwd(), ".env.local"), "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")] })
)
const BACKEND = (env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "").replace(/\/$/, "")
if (!BACKEND || !env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) {
  console.error("Missing NEXT_PUBLIC_MEDUSA_BACKEND_URL, ADMIN_EMAIL or ADMIN_PASSWORD in .env.local")
  process.exit(1)
}

const args = process.argv.slice(2)
const remove = args[0] === "--remove"
const handle = remove ? args[1] : args[0]
const file = remove ? null : args[1]
if (!handle || (!remove && !file)) {
  console.error("Usage: node scripts/upload-datasheet.mjs <handle> <file.pdf> | --remove <handle>")
  process.exit(1)
}

const login = await fetch(`${BACKEND}/auth/user/emailpass`, {
  method: "POST", headers: { "content-type": "application/json" },
  body: JSON.stringify({ email: env.ADMIN_EMAIL, password: env.ADMIN_PASSWORD }),
})
if (!login.ok) { console.error("Login failed:", login.status); process.exit(1) }
const { token } = await login.json()
const auth = { authorization: `Bearer ${token}` }

const found = await fetch(`${BACKEND}/admin/products?handle=${encodeURIComponent(handle)}&fields=id,title,metadata`, { headers: auth })
const { products } = await found.json()
const product = products?.[0]
if (!product) { console.error(`Product not found: ${handle}`); process.exit(1) }

let patch
if (remove) {
  patch = { datasheet_url: null, datasheet_name: null }
} else {
  const path = resolve(process.cwd(), file)
  const form = new FormData()
  form.append("files", new Blob([readFileSync(path)], { type: "application/pdf" }), basename(path))
  const up = await fetch(`${BACKEND}/admin/uploads`, { method: "POST", headers: auth, body: form })
  if (!up.ok) { console.error("Upload failed:", up.status, await up.text()); process.exit(1) }
  const { files } = await up.json()
  patch = { datasheet_url: files[0].url, datasheet_name: basename(path) }
  console.log("Uploaded:", files[0].url)
}

const upd = await fetch(`${BACKEND}/admin/products/${product.id}`, {
  method: "POST", headers: { ...auth, "content-type": "application/json" },
  body: JSON.stringify({ metadata: { ...(product.metadata || {}), ...patch } }),
})
if (!upd.ok) { console.error("Update failed:", upd.status, await upd.text()); process.exit(1) }
console.log(`${remove ? "Removed datasheet from" : "Linked datasheet to"} ${product.title} (${handle})`)
