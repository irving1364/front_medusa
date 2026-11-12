"use client"

import { useState } from "react"
import Reveal from "@/components/ui/Reveal"
import ProjectCard, { type ProjectCardData, type ProjectLine as Line } from "@/components/ProjectCard"

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
            <li className="h-full"><ProjectCard p={p} /></li>
          </Reveal>
        ))}
      </ul>
    </div>
  )
}
