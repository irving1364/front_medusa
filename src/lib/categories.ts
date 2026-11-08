import { getMedusaClient } from "@/lib/medusa"
import { unsplash } from "@/lib/catalog"

/** Prefix of a category code ("MED-01" -> "MED"); the three product lines. */
export type LineCode = "MED" | "VET" | "TEC"

export interface CategoryNode {
  id: string
  handle: string
  name: string
  /** "MED", "VET", "TEC" for parents; "MED-01"… for children */
  code: string
  /** "01" for parents, "01".."08" for children (from the code) */
  number: string
  line: LineCode
  description: string
  /** "Productos incluidos" for children; empty for parents */
  items: string
  image: string
  parentHandle: string | null
  children: CategoryNode[]
}

interface MedusaCategory {
  id: string
  name: string
  handle: string
  description: string | null
  rank: number | null
  parent_category_id: string | null
  metadata: Record<string, unknown> | null
  category_children?: MedusaCategory[]
}

const FALLBACK_IMAGE: Record<LineCode, string> = {
  MED: unsplash("1519494080410-f9aa76cb4283"),
  VET: unsplash("1666214280557-f1b5022eb634"),
  TEC: unsplash("1581594549595-35f6edc7b762"),
}

function lineOf(code: string): LineCode {
  const prefix = code.split("-")[0].toUpperCase()
  return prefix === "VET" || prefix === "TEC" ? prefix : "MED"
}

function toNode(c: MedusaCategory, parentHandle: string | null): CategoryNode {
  const meta = c.metadata || {}
  const code = typeof meta.code === "string" ? meta.code : c.handle.toUpperCase()
  const line = lineOf(code)
  const number = typeof meta.number === "string" ? meta.number : code.includes("-") ? code.split("-")[1] : "00"
  const children = [...(c.category_children || [])]
    .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0))
    .map((child) => toNode(child, c.handle))
  return {
    id: c.id,
    handle: c.handle,
    name: c.name,
    code,
    number,
    line,
    description: c.description || "",
    items: typeof meta.items === "string" ? meta.items : "",
    image: typeof meta.image === "string" ? meta.image : FALLBACK_IMAGE[line],
    parentHandle,
    children,
  }
}

/** Fetches the full tree (parents with their children) from the Store API. */
export async function fetchCategoryTree(): Promise<CategoryNode[]> {
  const client = getMedusaClient()
  const res = await client.store.category.list({
    include_descendants_tree: true,
    parent_category_id: "null",
    limit: 50,
    fields: "id,name,handle,description,rank,parent_category_id,metadata,*category_children",
  } as unknown as Parameters<typeof client.store.category.list>[0])
  const roots = ((res.product_categories || []) as unknown as MedusaCategory[])
    .filter((c) => !c.parent_category_id)
    .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0))
  return roots.map((c) => toNode(c, null))
}

export function flatten(tree: CategoryNode[]): CategoryNode[] {
  return tree.flatMap((p) => [p, ...p.children])
}
