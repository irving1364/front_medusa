"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/ui/Reveal"

type Line = "medico" | "veterinario" | "tecnico"
export interface ProjectCardData {
  slug: string
  title: string
  line: Line
  lineLabel: string
  specialty: string | null
  summary: string | null
  cover: string | null
  coverAlt: string
  year: number | null
}

const TABS: { key: "all" | Line; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "medico", label: "Médico" },
  { key: "veterinario", label: "Veterinario" },
  { key: "tecnico", label: "Técnico" },
]

/** Portfolio cards with a line filter; the list arrives rendered from the server so crawlers see every project. */
export default function ProjectsGrid({ projects }: { projects: ProjectCardData[] }) {
  const [tab, setTab] = useState<"all" | Line>("all")
  const counts = TABS.map((t) => (t.key === "all" ? projects.length : projects.filter((p) => p.line === t.key).length))
  const shown = tab === "all" ? projects : projects.filter((p) => p.line === tab)

  return (
    <div className="mt-12">
      <div role="tablist" aria-label="Filtrar por línea" className="flex flex-wrap gap-2">
        {TABS.map((t, i) => {
          if (t.key !== "all" && counts[i] === 0) return null
          const active = tab === t.key
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.key)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors duration-300 ${active ? "bg-ink text-paper" : "glass text-text-2 hover:text-ink"}`}
            >
              {t.label}
              <span className={`mono text-[11px] ${active ? "text-paper/70" : "text-text-3"}`}>{counts[i]}</span>
            </button>
          )
        })}
      </div>

      <ul key={tab} className="mt-8 grid md:grid-cols-2 gap-5">
        {shown.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.08} distance={20}>
            <li className="h-full">
              <Link href={`/proyectos/${p.slug}`} className="group card shadow-card overflow-hidden h-full flex flex-col">
                <div className="plate plate-color aspect-[16/10]">
                  {p.cover ? (
                    <Image src={p.cover} alt={p.coverAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[1.2s] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.03]" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-paper-3 to-paper-2" />
                  )}
                  <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md glass mono text-[11px] text-ink">{p.lineLabel}</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="mono text-[10px] uppercase tracking-[0.14em] text-teal">{[p.specialty, p.year].filter(Boolean).join(" · ") || "Proyecto"}</p>
                  <h2 className="mt-2 font-display text-2xl text-ink">{p.title}</h2>
                  {p.summary && <p className="mt-2 body-lg text-text-2">{p.summary}</p>}
                  <span className="mt-auto pt-6 link-arrow !text-sm">Ver proyecto</span>
                </div>
              </Link>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  )
}
