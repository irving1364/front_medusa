#!/usr/bin/env node
/**
 * Creates the "Destacados" product collection (handle `destacados`) in Medusa if it does not exist.
 * The home rail ("Piezas de catálogo") shows the products of this collection, ordered by the
 * product metadata `home_order` (1, 2, 3…). Products are assigned from the Medusa admin:
 * Productos → Colecciones → Destacados → Agregar productos.
 *
 *   node scripts/ensure-featured-collection.mjs      # reads front/.env.local
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
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status} ${JSON.stringify(json).slice(0, 300)}`)
  return json
}

const HANDLE = "destacados"
const { collections } = await api(`/collections?handle=${HANDLE}&limit=1`)
if (collections.length) {
  console.log(`Collection "${collections[0].title}" already exists (${collections[0].id}).`)
} else {
  const { collection } = await api("/collections", {
    title: "Destacados",
    handle: HANDLE,
    metadata: { purpose: "Productos que aparecen en la sección Piezas de catálogo del inicio. Orden: metadato home_order en cada producto." },
  })
  console.log(`Created collection "${collection.title}" (${collection.id}).`)
}
console.log(`Assign products in the admin: ${BACKEND}/app/collections`)
