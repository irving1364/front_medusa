import Image from "next/image"
import Link from "next/link"

export type ProjectLine = "medico" | "veterinario" | "tecnico"

/** Flat, serialisable card data (safe to pass from server pages into client grids). */
export interface ProjectCardData {
  slug: string
  title: string
  line: ProjectLine
  lineLabel: string
  specialty: string | null
  summary: string | null
  cover: string | null
  coverAlt: string
  year: number | null
}

/** Portfolio card shared by the home teaser and the /proyectos grid. */
export default function ProjectCard({ p, sizes = "(max-width: 768px) 100vw, 50vw", heading: Heading = "h2" }: { p: ProjectCardData; sizes?: string; heading?: "h2" | "h3" }) {
  return (
    <Link href={`/proyectos/${p.slug}`} className="group card shadow-card overflow-hidden h-full flex flex-col">
      <div className="plate plate-color aspect-[16/10]">
        {p.cover ? (
          <Image src={p.cover} alt={p.coverAlt} fill sizes={sizes} className="object-cover transition-transform duration-[1.2s] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.03]" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-paper-3 to-paper-2" />
        )}
        <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md glass mono text-[11px] text-ink">{p.lineLabel}</span>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <p className="mono text-[10px] uppercase tracking-[0.14em] text-teal">{[p.specialty, p.year].filter(Boolean).join(" · ") || "Proyecto"}</p>
        <Heading className="mt-2 font-display text-2xl text-ink">{p.title}</Heading>
        {p.summary && <p className="mt-2 body-lg text-text-2">{p.summary}</p>}
        <span className="mt-auto pt-6 link-arrow !text-sm">Ver proyecto</span>
      </div>
    </Link>
  )
}
