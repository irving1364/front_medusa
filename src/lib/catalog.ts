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
  image: "/products/mesa-veterinaria-exploracion-tratamiento.jpg",
  handle: "mesa-veterinaria-exploracion-tratamiento",
  sku: "KM-VET-CT-MET",
  label: "Mesa veterinaria de exploración y tratamiento",
  spec: "Inox 304 · 120 / 150 cm · desde B/. 925",
  specs: [
    ["Material", "AISI 304 satinado"],
    ["Medidas", "120 o 150 × 60 × 90 cm"],
    ["Uso", "Exploración y tratamiento"],
    ["Precio", "Desde B/. 925 · ITBMS incl."],
  ] as [string, string][],
}

/** Where Karven's furniture is installed; used for copy, not as a taxonomy. */
export const SECTORS = ["Hospitales", "Clínicas", "Veterinarias", "Farmacias", "Laboratorios", "Morgues"]
