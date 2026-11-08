// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")#!/usr/bin/env node
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")/**
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "") * Loads the real VET products (source: "VET - PRODUCTOS - PRIMERA PARTE", 23-08-2026) into Medusa.
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "") * Photos were extracted from that PDF into public/products/<handle>.jpg and are referenced by
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "") * absolute URL on the storefront domain. Idempotent: products are matched by handle.
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "") *
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "") *   node scripts/seed-vet-products.mjs                     # create/update the 9 products
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "") *   node scripts/seed-vet-products.mjs --unpublish-others  # also set every other product to draft
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "") *
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "") * Reads NEXT_PUBLIC_MEDUSA_BACKEND_URL, ADMIN_EMAIL, ADMIN_PASSWORD (and optional NEXT_PUBLIC_SITE_URL)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "") * from front/.env.local. Prices are "desde" prices in PAB with ITBMS included, as in the PDF.
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
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")] })
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, ""))
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const BACKEND = (env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "").replace(/\/$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")|| "https://front-medusa-kappa.vercel.app").replace(/\/$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const UNPUBLISH = process.argv.includes("--unpublish-others")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")if (!BACKEND || !env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) throw new Error("Missing NEXT_PUBLIC_MEDUSA_BACKEND_URL / ADMIN_EMAIL / ADMIN_PASSWORD in .env.local")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const img = (handle) => `${SITE}/products/${handle}.jpg`
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const INOX = "Acero inoxidable AISI 304 satinado"
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const SIZES = ["120 × 60 × 90 cm", "150 × 60 × 90 cm"]
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const MAYO_DIMS = "Bandeja 50 × 35 cm · Base 50 × 55 cm · Altura 85–130 cm"
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")/** Category handle for every product in this file (VET-01 Mesas veterinarias). */
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const CATEGORY = "mesas-veterinarias"
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const PRODUCTS = [
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    handle: "mesa-veterinaria-exploracion-tratamiento", sku: "KM-VET-CT-MET", price: 925,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    title: "Mesa veterinaria de exploración y tratamiento",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    subtitle: "Superficie sanitaria en acero inoxidable, 120 o 150 cm",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    group: "Consulta y tratamiento", sizes: SIZES,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    description: "Mesa clínica diseñada para exploración, consulta, curaciones y procedimientos veterinarios de rutina. Su superficie en acero inoxidable ofrece alta resistencia, higiene y facilidad de desinfección para uso continuo en clínicas y hospitales veterinarios.",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    features: ["Acero inoxidable AISI 304 satinado", "Superficie amplia, lisa y sanitaria", "Bordes seguros y acabado de fácil limpieza", "Estructura estable para exploración y tratamiento", "Diseñada para uso veterinario clínico intensivo"],
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    uses: "Exploración · Consulta · Vacunación · Toma de muestras · Curaciones · Tratamientos · Procedimientos menores",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    handle: "mesa-veterinaria-fija-consulta-examen", sku: "KM-VET-CT-MCE", price: 449,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    title: "Mesa veterinaria fija de consulta y examen",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    subtitle: "Estructura tubular abierta con niveladores, 120 o 150 cm",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    group: "Consulta y tratamiento", sizes: SIZES,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    description: "Mesa clínica fija en acero inoxidable AISI 304, diseñada para consulta, exploración y procedimientos veterinarios de rutina. Su estructura abierta ofrece estabilidad, acceso cómodo al paciente y fácil limpieza.",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    features: ["Acero inoxidable AISI 304 satinado", "Superficie lisa con bordes sanitarios seguros", "Estructura tubular fija y reforzada", "4 niveladores regulables", "Diseño abierto de fácil limpieza y desinfección", "Alta resistencia para uso clínico continuo"],
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    uses: "Consulta · Exploración · Vacunación · Toma de muestras · Curaciones · Tratamientos · Procedimientos menores",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    handle: "mesa-movil-preparacion-tratamiento", sku: "KM-VET-PP-MPT", price: 535,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    title: "Mesa móvil de preparación y tratamiento",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    subtitle: "Con repisa inferior y ruedas con freno, 120 o 150 cm",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    group: "Preparación y procedimientos", sizes: SIZES, wheels: "4 ruedas giratorias, 2 con freno",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    description: "Mesa clínica móvil diseñada para preparación, curaciones y procedimientos veterinarios. Su construcción en acero inoxidable facilita la limpieza y permite trasladar el área de trabajo según las necesidades del personal clínico.",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    features: ["Acero inoxidable AISI 304 satinado", "Superficie de trabajo sanitaria", "Repisa inferior para instrumental e insumos", "4 ruedas giratorias, 2 con freno", "Diseño abierto de fácil acceso y limpieza"],
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    uses: "Preparación · Curaciones · Tratamientos · Procedimientos clínicos",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    handle: "mesa-movil-preparacion-tratamiento-2-gavetas", sku: "KM-VET-PP-MPT-2G", price: 798,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    title: "Mesa móvil veterinaria de preparación y tratamiento con 2 gavetas",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    subtitle: "Estación móvil con gavetas y repisa de almacenamiento, 120 o 150 cm",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    group: "Preparación y procedimientos", sizes: SIZES, wheels: "4 ruedas giratorias, 2 con freno",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    description: "Estación móvil de trabajo veterinario que combina una amplia superficie clínica con almacenamiento inmediato para instrumental e insumos, manteniendo todo organizado y accesible durante los procedimientos.",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    features: ["Acero inoxidable AISI 304 satinado", "2 gavetas integradas para instrumental e insumos", "Repisa inferior de almacenamiento", "4 ruedas giratorias, 2 con freno", "Superficies lisas de fácil limpieza y desinfección"],
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    uses: "Preparación · Tratamientos · Curaciones · Apoyo clínico",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    handle: "mesa-humeda-veterinaria-tratamiento-preparacion", sku: "KM-VET-PP-MHP-1P3G", price: 1305,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    title: "Mesa húmeda veterinaria de tratamiento y preparación",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    subtitle: "Tina clínica integrada con drenaje y rejilla removible, 120 o 150 cm",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    group: "Preparación y procedimientos", sizes: SIZES,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    description: "Estación clínica diseñada para preparación, lavado, curaciones y procedimientos veterinarios que requieren manejo de líquidos. Su superficie húmeda en acero inoxidable facilita la higiene, el drenaje y la desinfección entre pacientes. Profundidad de tina aprox. 12.5–15 cm.",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    features: ["Acero inoxidable AISI 304 satinado", "Tina clínica integrada de baja profundidad", "Rejilla o superficie de trabajo removible", "Sistema de drenaje para evacuación de líquidos", "Superficies sanitarias de fácil limpieza y desinfección"],
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    uses: "Preparación preoperatoria · Lavado de pacientes · Curaciones · Limpieza de heridas · Procedimientos húmedos · Odontología veterinaria · Tratamientos",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    options: "Grifería · Ducha manual · Filtro atrapapelo/residuos · Gavetas y gabinete inferior",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    handle: "mesa-de-mayo-movil-base-u", sku: "KM-VET-PP-MAY-U-M", price: 145.07,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    title: "Mesa de Mayo móvil base U",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    subtitle: "Bandeja removible 50 × 35 cm, altura regulable 85–130 cm",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    group: "Preparación y procedimientos", dimensions: MAYO_DIMS, wheels: "4 ruedas giratorias de 2\"", finish: "Soldadura TIG y acabado satinado sanitario #4",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    description: "Soporte móvil para instrumental clínico, fabricado en acero inoxidable AISI 304. Su base tipo U facilita el acercamiento al área de trabajo, mientras que el ajuste manual de altura permite adaptarlo cómodamente a diferentes procedimientos.",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    features: ["Acero inoxidable AISI 304", "Bandeja removible de 50 × 35 cm", "Altura regulable de 85 a 130 cm", "Base tubular tipo U de alta estabilidad", "4 ruedas giratorias de 2\"", "Ajuste manual mediante perilla", "Soldadura TIG y acabado satinado sanitario #4", "Superficies resistentes y de fácil limpieza"],
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    uses: "Consulta, preparación de procedimientos, curaciones y soporte móvil de instrumental en clínicas, consultorios y hospitales.",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    handle: "mesa-de-mayo-base-u-bajo-perfil", sku: "KM-VET-PP-MAY-U-BP", price: 180.63,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    title: "Mesa de Mayo base U de bajo perfil",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    subtitle: "Base de baja holgura para posicionar bajo camillas y mesas",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    group: "Preparación y procedimientos", dimensions: MAYO_DIMS, wheels: "2 ruedas posteriores de 2\" + patines delanteros", finish: "Soldadura TIG, acabado satinado sanitario #4",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    description: "Soporte de instrumental en acero inoxidable AISI 304, diseñado con base de bajo perfil para facilitar su posicionamiento debajo de camillas y mesas clínicas. Su configuración de ruedas posteriores y patines delanteros proporciona estabilidad durante los procedimientos.",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    features: ["Acero inoxidable AISI 304", "Bandeja removible de 50 × 35 cm", "Altura regulable de 85 a 130 cm", "Base U Low Profile para baja holgura", "2 ruedas posteriores de 2\" + patines delanteros", "Ajuste manual mediante perilla", "Soldadura TIG", "Acabado satinado sanitario #4", "Diseño estable y de fácil limpieza"],
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    uses: "Preparación de procedimientos, curaciones y soporte de instrumental en consultorios, clínicas, hospitales y áreas donde se requiere aproximación directa a la camilla.",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    handle: "mesa-de-mayo-base-h-movil", sku: "KM-VET-PP-MAY-H-M", price: 143.34,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    title: "Mesa de Mayo base H móvil",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    subtitle: "Base H de alta estabilidad con desplazamiento multidireccional",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    group: "Preparación y procedimientos", dimensions: MAYO_DIMS, wheels: "4 ruedas giratorias de 2\"", finish: "Soldadura TIG con aporte ER308L, acabado satinado sanitario #4",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    description: "Soporte móvil para instrumental clínico, fabricado en acero inoxidable AISI 304. Su base tipo H proporciona alta estabilidad y desplazamiento multidireccional para acompañar procedimientos médicos con comodidad y seguridad.",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    features: ["Acero inoxidable AISI 304", "Bandeja removible de 50 × 35 cm", "Altura regulable de 85 a 130 cm", "Base tipo H de alta estabilidad", "4 ruedas giratorias de 2\"", "Ajuste manual mediante perilla", "Soldadura TIG con aporte ER308L", "Acabado satinado sanitario #4", "Superficies resistentes y de fácil limpieza"],
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    uses: "Soporte de instrumental en procedimientos, curaciones, preparación clínica y áreas que requieren movilidad y estabilidad durante el trabajo.",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    handle: "mesa-de-mayo-quirurgica-elevacion-pedal", sku: "KM-VET-PP-MAY-U-P", price: 260.06,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    title: "Mesa de Mayo quirúrgica con elevación por pedal",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    subtitle: "Doble poste, ajuste de altura sin usar las manos, 90–150 cm",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    group: "Preparación y procedimientos", dimensions: "Bandeja 50 × 35 cm · Base 50 × 55 cm · Altura regulable aprox. 90–150 cm", wheels: "2 ruedas posteriores de 2\" + patines delanteros", finish: "Soldadura TIG con aporte ER308L, acabado satinado sanitario #4",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    description: "Mesa de Mayo de alta estabilidad para quirófano y procedimientos clínicos, con ajuste de altura mediante pedal para facilitar el posicionamiento sin utilizar las manos. Fabricada completamente en acero inoxidable AISI 304.",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    features: ["Acero inoxidable AISI 304", "Bandeja removible de 50 × 35 cm", "Ajuste de altura mediante pedal", "Doble poste para mayor estabilidad", "Poste exterior Ø1 ½\" y telescópico Ø1 ¼\"", "Base U de bajo perfil", "2 ruedas posteriores de 2\" + patines delanteros", "Soldadura TIG con aporte ER308L", "Acabado satinado sanitario #4", "Diseño resistente y de fácil limpieza"],
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    uses: "Quirófanos, salas de procedimientos y áreas clínicas donde se requiere mantener el instrumental accesible y ajustar la altura sin interrumpir la técnica de trabajo.",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")]
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")// ─── Admin API ──────────────────────────────────────────────────────
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const login = await fetch(`${BACKEND}/auth/user/emailpass`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: env.ADMIN_EMAIL, password: env.ADMIN_PASSWORD }) })
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")if (!login.ok) throw new Error(`Admin login failed: ${login.status}`)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const { token } = await login.json()
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const api = async (path, body, method = body === undefined ? "GET" : "POST") => {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  const res = await fetch(`${BACKEND}/admin${path}`, { method, headers: { authorization: `Bearer ${token}`, "content-type": "application/json" }, body: body === undefined ? undefined : JSON.stringify(body) })
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
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const { regions } = await api("/regions")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const region = regions.find((r) => r.currency_code === "pab") || regions[0]
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const sc = (await api("/sales-channels")).sales_channels[0]
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const profile = (await api("/shipping-profiles")).shipping_profiles[0]
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const category = (await api(`/product-categories?handle=${CATEGORY}&fields=id,name`)).product_categories[0]
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")if (!category) throw new Error(`Category ${CATEGORY} not found; run scripts/seed-categories.mjs first`)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")console.log(`region=${region.name} (${region.currency_code}) category=${category.name}`)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")const current = (await api("/products?limit=200&fields=id,handle,title,status,*variants")).products
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")for (const p of PRODUCTS) {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  const sizes = p.sizes || null
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  const dimensions = p.dimensions || (sizes ? sizes.join(" · ") : null)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  const payload = {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    title: p.title, subtitle: p.subtitle, handle: p.handle, description: p.description, status: "published",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    thumbnail: img(p.handle), images: [{ url: img(p.handle) }],
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    categories: [{ id: category.id }],
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    metadata: {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")      code: p.sku, group: p.group, material: INOX, finish: p.finish || "Satinado sanitario, soldadura TIG",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")      dimensions, wheels: p.wheels || null, options: p.options || null, uses: p.uses, features: p.features,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")      price_from: true, tax_included: true, source: "VET - PRODUCTOS - PRIMERA PARTE (23-08-2026)",
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    },
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    ...(profile ? { shipping_profile_id: profile.id } : {}),
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  }
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  const variants = sizes
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    ? sizes.map((s) => ({ title: s, sku: `${p.sku}-${s.slice(0, 3)}`, options: { Medida: s }, manage_inventory: false, prices: [{ currency_code: region.currency_code, amount: p.price }] }))
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    : [{ title: "Estándar", sku: p.sku, options: { Modelo: "Estándar" }, manage_inventory: false, prices: [{ currency_code: region.currency_code, amount: p.price }] }]
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  const found = current.find((c) => c.handle === p.handle)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  if (found) {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    await api(`/products/${found.id}`, payload)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    for (const v of variants) {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")      const existing = found.variants?.find((x) => x.sku === v.sku)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")      if (existing) await api(`/products/${found.id}/variants/${existing.id}`, { title: v.title, prices: v.prices, manage_inventory: false })
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")      else await api(`/products/${found.id}/variants`, v)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    }
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    console.log(`= ${p.sku} ${p.title}`)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  } else {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    await api("/products", {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")      ...payload,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")      sales_channels: [{ id: sc.id }],
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")      options: sizes ? [{ title: "Medida", values: sizes }] : [{ title: "Modelo", values: ["Estándar"] }],
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")      variants,
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    })
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    console.log(`+ ${p.sku} ${p.title}`)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  }
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")}
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")if (UNPUBLISH) {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  const keep = new Set(PRODUCTS.map((p) => p.handle))
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  let n = 0
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  for (const c of current) {
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    if (keep.has(c.handle) || c.status === "draft") continue
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    await api(`/products/${c.id}`, { status: "draft" })
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    n++
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")    console.log(`- draft: ${c.title}`)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  }
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")  console.log(`Unpublished ${n} product(s).`)
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")}
// Public storefront origin for asset URLs stored in Medusa (never localhost)
const SITE = (/^https:///.test(env.PUBLIC_ASSET_URL || "") ? env.PUBLIC_ASSET_URL : /^https:///.test(env.NEXT_PUBLIC_SITE_URL || "") ? env.NEXT_PUBLIC_SITE_URL : "https://front-medusa-kappa.vercel.app").replace(//$/, "")console.log("Done.")
