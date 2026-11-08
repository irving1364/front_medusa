/**
 * Static catalogue helpers for Karven Medical Furniture.
 *
 * The category tree (3 lines × 16 categories) lives in Medusa as product categories and is
 * loaded at runtime through `CategoriesProvider` (see src/lib/categories.ts). Seed it with
 * `node scripts/seed-categories.mjs`. Only truly static bits remain here.
 *
 * Images are temporary stock photos rendered through the uniform `.plate` treatment
 * until real product photography exists.
 */
export const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

/** Product featured on the home and showcase heroes. */
export const HERO_PRODUCT = {
  image: unsplash("1519494080410-f9aa76cb4283", 2000),
  handle: "cama-hospitalaria-electrica-k300",
  sku: "KC-300",
  label: "Cama clínica eléctrica KC-300",
  spec: "Inox 304 · 3 motores · 250 kg",
  specs: [
    ["Material", "AISI 304"],
    ["Motores", "3 · 24 V"],
    ["Carga", "250 kg"],
    ["Ruedas", "Ø150 · freno central"],
  ] as [string, string][],
}

/** Where Karven's furniture is installed; used for copy, not as a taxonomy. */
export const SECTORS = ["Hospitales", "Clínicas", "Veterinarias", "Farmacias", "Laboratorios", "Morgues"]
