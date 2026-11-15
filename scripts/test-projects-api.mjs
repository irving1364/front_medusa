// End-to-end check of the Projects module against the live backend (admin login from .env.local).
// Usage: node scripts/test-projects-api.mjs [--keep]
import { readFileSync } from "node:fs"

const env = Object.fromEntries(readFileSync(new URL("../.env.local", import.meta.url), "utf8").split(/\r?\n/).filter((l) => l && !l.startsWith("#") && l.includes("=")).map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] }))
const BACKEND = (env.MEDUSA_BACKEND_URL || env.NEXT_PUBLIC_MEDUSA_BACKEND_URL).replace(/\/$/, "")
const KEY = env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY
const keep = process.argv.includes("--keep")

const login = await fetch(`${BACKEND}/auth/user/emailpass`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: env.ADMIN_EMAIL, password: env.ADMIN_PASSWORD }) })
if (!login.ok) throw new Error(`login ${login.status}`)
const { token } = await login.json()
const admin = async (path, init = {}) => {
  const res = await fetch(`${BACKEND}/admin${path}`, { ...init, headers: { authorization: `Bearer ${token}`, "content-type": "application/json", ...(init.headers || {}) } })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`${init.method || "GET"} ${path} -> ${res.status} ${JSON.stringify(body).slice(0, 300)}`)
  return body
}
const store = async (path) => { const res = await fetch(`${BACKEND}/store${path}`, { headers: { "x-publishable-api-key": KEY } }); return { status: res.status, body: await res.json().catch(() => ({})) } }
const step = (s) => console.log(`\n· ${s}`)

step("create draft")
const { project: created } = await admin("/projects", { method: "POST", body: JSON.stringify({ title: "Prueba API · Jaula veterinaria de 5 estaciones", line: "veterinario", specialty: "Veterinaria", work_type: "Fabricación de módulo", summary: "Proyecto de prueba creado por el script.", client_need: "Línea 1\n\nLínea 2", year: 2026 }) })
console.log(created.id, created.slug, created.status, created.public_url, created.preview_url ? "preview-url ok" : "NO preview url")

step("slug collision")
const { project: twin } = await admin("/projects", { method: "POST", body: JSON.stringify({ title: created.title, line: "medico" }) })
console.log("twin slug:", twin.slug)

step("store hides drafts")
console.log("list:", (await store("/projects")).body.projects?.map((p) => p.slug), "detail:", (await store(`/projects/${created.slug}`)).status)

step("preview")
const pv = await store(`/projects/${created.slug}?preview=${encodeURIComponent(env.PROJECT_PREVIEW_SECRET || "")}`)
console.log("preview status:", pv.status, "flag:", pv.body.preview)

step("update + history")
await admin(`/projects/${created.id}`, { method: "POST", body: JSON.stringify({ solution: "Cinco estaciones en acero 304.", slug: "prueba-api-personalizada", gallery: [{ type: "image", url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800", alt: "Prueba" }], cover_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800" }) })
const { revisions } = await admin(`/projects/${created.id}/revisions`)
console.log("revisions:", revisions.map((r) => `${r.action}${r.changes ? ":" + Object.keys(r.changes).join(",") : ""}`))

step("workflow")
const bad = await fetch(`${BACKEND}/admin/projects/${created.id}/status`, { method: "POST", headers: { authorization: `Bearer ${token}`, "content-type": "application/json" }, body: JSON.stringify({ status: "published" }) })
console.log("draft -> published rejected:", bad.status)
for (const s of ["review", "approved", "published"]) { const { project } = await admin(`/projects/${created.id}/status`, { method: "POST", body: JSON.stringify({ status: s, note: `paso ${s}` }) }); console.log("->", project.status, project.published_at ? "published_at set" : "") }

step("store shows published")
const pub = await store(`/projects/prueba-api-personalizada`)
console.log("detail:", pub.status, pub.body.project?.title, "| list:", (await store("/projects?line=veterinario")).body.projects?.map((p) => p.slug))

step("archive + restore")
await admin(`/projects/${twin.id}`, { method: "DELETE" })
console.log("archived list:", (await admin("/projects?deleted=1")).projects.map((p) => p.slug))
const { project: restored } = await admin(`/projects/${twin.id}/restore`, { method: "POST" })
console.log("restored:", restored.slug, restored.status)

if (!keep) {
  step("cleanup")
  await admin(`/projects/${created.id}`, { method: "DELETE" })
  await admin(`/projects/${twin.id}`, { method: "DELETE" })
  console.log("test projects archived")
}
console.log("\nOK")
