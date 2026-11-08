// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")#!/usr/bin/env node
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")/**
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "") * Creates/updates the Karven product category tree in Medusa (3 parents, 16 children),
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "") * matching "Karven Web - Categorías.pdf", and re-assigns existing products from the old
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "") * collection taxonomy to the new categories. Idempotent (matched by handle).
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "") *
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "") *   node scripts/seed-categories.mjs            # reads front/.env.local
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "") *   node scripts/seed-categories.mjs --no-assign # only categories, leave products untouched
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "") */
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")import { readFileSync } from "node:fs"
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")import { fileURLToPath } from "node:url"
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")import { dirname, join } from "node:path"
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const root = join(dirname(fileURLToPath(import.meta.url)), "..")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const env = Object.fromEntries(
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  readFileSync(join(root, ".env.local"), "utf8").split(/\r?\n/).filter((l) => l.includes("=") && !l.startsWith("#"))
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] })
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, ""))
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const BACKEND = (env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "").replace(/\/$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const ASSIGN = !process.argv.includes("--no-assign")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")if (!BACKEND || !env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) throw new Error("Missing NEXT_PUBLIC_MEDUSA_BACKEND_URL / ADMIN_EMAIL / ADMIN_PASSWORD in .env.local")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const img = (id) => `https://images.unsplash.com/photo-${id}?w=1600&q=80&auto=format&fit=crop`
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")// Provisional stock imagery until real photography exists (same ids used elsewhere in the front).
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const IMG = {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  bed: img("1512678080530-7760d81faba6"), ward: img("1538108149393-fbbd81895907"), orTable: img("1516549655169-df83a0774514"),
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  orRoom: img("1551076805-e1869033e561"), orTeam: img("1504439468489-c8920d796a29"), dental: img("1629909613654-28e377c37b09"),
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  lab: img("1583912086096-8c60d75a53f9"), shelving: img("1579684385127-1ef15d508118"), reception: img("1519494026892-80bbd2d6fd0d"),
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  consult: img("1666214280557-f1b5022eb634"), labBench: img("1581594549595-35f6edc7b762"), room: img("1519494080410-f9aa76cb4283"),
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")}
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")// Real Karven photography committed to front/public/products (served by Vercel)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")|| "https://front-medusa-kappa.vercel.app").replace(/\/$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")IMG.vetTable = `${SITE}/products/mesa-veterinaria-exploracion-tratamiento.jpg`
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")IMG.vetWet = `${SITE}/products/mesa-humeda-veterinaria-tratamiento-preparacion.jpg`
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")/** Parent categories ("categorías madres"). */
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const PARENTS = [
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  { handle: "mobiliario-medico", code: "MED", number: "01", name: "Mobiliario médico", image: IMG.room,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    description: "Atención humana, exploración, procedimientos, higiene clínica y apoyo al paciente." },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  { handle: "mobiliario-veterinario", code: "VET", number: "02", name: "Mobiliario veterinario", image: IMG.vetTable,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    description: "Exploración, tratamiento, hospitalización, preparación y apoyo veterinario." },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  { handle: "mobiliario-tecnico", code: "TEC", number: "03", name: "Mobiliario técnico", image: IMG.labBench,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    description: "Muebles fijos, mesones, estaciones de trabajo, almacenamiento y lavado especializado. Trabajos especializados para hospitales, farmacias, laboratorios y morgues." },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")]
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")/** Child categories ("categorías hijas"); `items` = "productos incluidos". */
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const CHILDREN = [
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  { parent: "mobiliario-medico", code: "MED-01", handle: "camillas-clinicas", name: "Camillas clínicas", image: IMG.bed,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    items: "Camillas de examen, exploración, inyectables y camillas ginecológicas" },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  { parent: "mobiliario-medico", code: "MED-02", handle: "sillas-y-sillones-clinicos", name: "Sillas y sillones clínicos", image: IMG.dental,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    items: "Sillas de flebotomía, de toma de muestras y sillones de procedimientos" },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  { parent: "mobiliario-medico", code: "MED-03", handle: "mesas-clinicas-y-de-instrumental", name: "Mesas clínicas y de instrumental", image: IMG.orTable,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    items: "Mesas Mayo, instrumentación, anestesia, mesas puente y mesas auxiliares clínicas" },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  { parent: "mobiliario-medico", code: "MED-04", handle: "carros-hospitalarios", name: "Carros hospitalarios", image: IMG.ward,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    items: "Carros de curaciones, procedimientos, medicamentos, instrumental, suministros y ropa" },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  { parent: "mobiliario-medico", code: "MED-05", handle: "lavamanos-clinicos", name: "Lavamanos clínicos", image: IMG.orRoom,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    items: "Lavamanos quirúrgicos, de consulta, odontológicos y de higiene de manos" },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  { parent: "mobiliario-medico", code: "MED-06", handle: "atriles-y-soportes", name: "Atriles y soportes", image: IMG.bed,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    items: "Porta sueros, soportes de bombas, porta platones y soportes clínicos" },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  { parent: "mobiliario-medico", code: "MED-07", handle: "auxiliares-clinicos", name: "Auxiliares clínicos", image: IMG.reception,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    items: "Escabeles, banquillos, taburetes, biombos, porta guantes y contenedores auxiliares" },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  { parent: "mobiliario-medico", code: "MED-08", handle: "cunas-neonatales", name: "Cunas neonatales", image: IMG.room,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    items: "Bassinets, cunas hospitalarias neonatales y sus configuraciones" },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  { parent: "mobiliario-veterinario", code: "VET-01", handle: "mesas-veterinarias", name: "Mesas veterinarias", image: IMG.vetWet,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    items: "Exploración, tratamiento, preparación móvil, mesas húmedas y mesas Mayo veterinarias" },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  { parent: "mobiliario-veterinario", code: "VET-02", handle: "jaulas-veterinarias", name: "Jaulas veterinarias", image: IMG.shelving,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    items: "Individuales, modulares, felinas, caninas y estaciones múltiples" },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  { parent: "mobiliario-veterinario", code: "VET-03", handle: "higiene-y-lavado-veterinario", name: "Higiene y lavado veterinario", image: IMG.orRoom,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    items: "Bañeras clínicas, lavamanos y estaciones destinadas principalmente al lavado" },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  { parent: "mobiliario-veterinario", code: "VET-04", handle: "auxiliares-y-accesorios-veterinarios", name: "Auxiliares y accesorios veterinarios", image: IMG.reception,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    items: "Carros, repisas, gabinetes auxiliares, porta platones y accesorios de jaulas" },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  { parent: "mobiliario-tecnico", code: "TEC-01", handle: "muebles-base-y-aereos", name: "Muebles base y aéreos", image: IMG.labBench,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    items: "Mobiliario fijo, módulos inferiores, superiores y conjuntos de muebles instalados" },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  { parent: "mobiliario-tecnico", code: "TEC-02", handle: "mesas-y-estaciones-de-trabajo", name: "Mesas y estaciones de trabajo", image: IMG.lab,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    items: "Mesones técnicos, mesas de preparación, bancos de trabajo y mesas especializadas" },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  { parent: "mobiliario-tecnico", code: "TEC-03", handle: "fregadores-y-tinas", name: "Fregadores y tinas", image: IMG.orRoom,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    items: "Fregadores técnicos, estaciones de lavado, tinas y muebles cuya función principal es lavar" },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  { parent: "mobiliario-tecnico", code: "TEC-04", handle: "gabinetes-y-almacenamiento", name: "Gabinetes y almacenamiento", image: IMG.shelving,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    items: "Anaqueles, estanterías, armarios, archivadores y gabinetes independientes" },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")]
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")/** Old collection handle (previous taxonomy) -> new category handle, for the sample products. */
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const COLLECTION_TO_CATEGORY = {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  "camillas-y-camas": "camillas-clinicas",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  "mesas-clinicas": "mesas-clinicas-y-de-instrumental",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  "consultorio": "gabinetes-y-almacenamiento",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  "unidades-odontologicas": "sillas-y-sillones-clinicos",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  "carros-de-transporte": "carros-hospitalarios",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  "carros-y-estaciones": "carros-hospitalarios",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  "carros-quirurgicos": "carros-hospitalarios",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  "carros-de-hospitalizacion": "carros-hospitalarios",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  "carros-de-aislamiento": "carros-hospitalarios",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  "atriles-y-soportes": "atriles-y-soportes",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  "mesas-quirurgicas": "mesas-clinicas-y-de-instrumental",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  "mesas-de-instrumental": "mesas-clinicas-y-de-instrumental",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  "lavamanos-quirurgicos": "lavamanos-clinicos",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  "estaciones-de-lavado": "fregadores-y-tinas",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  "laboratorio": "mesas-y-estaciones-de-trabajo",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  "almacenamiento-tecnico": "gabinetes-y-almacenamiento",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  "mesas-de-patologia": "mesas-y-estaciones-de-trabajo",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  "superficies-sanitarias": "muebles-base-y-aereos",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  "elementos-hospitalarios": "auxiliares-clinicos",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  "apoyo-y-circulacion": "auxiliares-clinicos",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")}
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")// A few sample products fit better elsewhere than their old collection suggests.
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const PRODUCT_TO_CATEGORY = { "escritorio-clinico-k40": "mesas-y-estaciones-de-trabajo" }
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")// ─── Admin API ──────────────────────────────────────────────────────
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const login = await fetch(`${BACKEND}/auth/user/emailpass`, {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  method: "POST", headers: { "content-type": "application/json" },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  body: JSON.stringify({ email: env.ADMIN_EMAIL, password: env.ADMIN_PASSWORD }),
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")})
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")if (!login.ok) throw new Error(`Admin login failed: ${login.status}`)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const { token } = await login.json()
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const api = async (path, body, method = body === undefined ? "GET" : "POST") => {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  const res = await fetch(`${BACKEND}/admin${path}`, {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    method, headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    body: body === undefined ? undefined : JSON.stringify(body),
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  })
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  const json = await res.json().catch(() => ({}))
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status} ${JSON.stringify(json).slice(0, 300)}`)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  return json
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")}
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const existing = (await api(`/product-categories?limit=200&fields=id,name,handle,parent_category_id`)).product_categories
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const byHandle = new Map(existing.map((c) => [c.handle, c]))
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")async function upsertCategory(def, parentId, rank) {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  const payload = {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    name: def.name, handle: def.handle, description: def.description || def.items, is_active: true, is_internal: false,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    rank, parent_category_id: parentId ?? null,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    metadata: { code: def.code, number: def.number || def.code.split("-")[1], image: def.image, items: def.items || null },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  }
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  const found = byHandle.get(def.handle)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  if (found) {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    const res = await api(`/product-categories/${found.id}`, payload)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    console.log(`= ${def.code} ${def.name}`)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    return res.product_category
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  }
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  const res = await api(`/product-categories`, payload)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  byHandle.set(def.handle, res.product_category)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  console.log(`+ ${def.code} ${def.name}`)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  return res.product_category
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")}
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const parentIds = {}
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")for (const [i, p] of PARENTS.entries()) parentIds[p.handle] = (await upsertCategory(p, null, i)).id
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const childIds = {}
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")for (const [i, c] of CHILDREN.entries()) childIds[c.handle] = (await upsertCategory(c, parentIds[c.parent], i)).id
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")if (ASSIGN) {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  const { products } = await api(`/products?limit=200&fields=id,handle,title,*collection,*categories`)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  let n = 0
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  for (const p of products) {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    const target = PRODUCT_TO_CATEGORY[p.handle] || COLLECTION_TO_CATEGORY[p.collection?.handle]
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    if (!target) { console.log(`? ${p.handle}: no mapping (collection ${p.collection?.handle || "none"})`); continue }
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    const already = (p.categories || []).some((c) => c.id === childIds[target])
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    if (already) continue
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    await api(`/products/${p.id}`, { categories: [{ id: childIds[target] }] })
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    n++
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    console.log(`→ ${p.title} -> ${target}`)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  }
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  console.log(`Assigned ${n} product(s).`)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")}
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")console.log("Done.")
