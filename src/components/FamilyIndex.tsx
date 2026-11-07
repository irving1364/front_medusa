"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { FAMILIES } from "@/lib/catalog"
import FamilyIcon from "@/components/ui/FamilyIcon"
import Reveal from "@/components/ui/Reveal"

/** Numbered table of contents of the seven product families; the preview plate follows the hovered row. */
export default function FamilyIndex() {
  const [active, setActive] = useState(0)
  const current = FAMILIES[active]

  return (
    <section id="equipamiento" className="section bg-paper">
      <div className="container-custom">
        <Reveal>
          <div className="flex items-end justify-between gap-6 rule-strong pt-5">
            <div>
              <p className="eyebrow text-teal">Índice</p>
              <h2 className="display-md mt-4 text-ink">Equipamiento por familia</h2>
            </div>
            <p className="hidden md:block text-sm text-text-3 tnum">{FAMILIES.length} familias · {FAMILIES.reduce((n, f) => n + f.subfamilies.length, 0)} subfamilias</p>
          </div>
        </Reveal>

        <div className="mt-10 grid lg:grid-cols-12 gap-10 lg:gap-14">
          <ol className="lg:col-span-7">
            {FAMILIES.map((f, i) => {
              const isActive = i === active
              return (
                <Reveal key={f.handle} delay={i * 0.05} distance={16}>
                  <li
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`group border-t border-line last:border-b transition-colors ${isActive ? "bg-paper-2/60" : ""}`}
                  >
                    <Link href={`/equipamiento?familia=${f.handle}`} className="grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[3rem_2.5rem_1fr_auto] items-center gap-4 py-5 px-2 -mx-2">
                      <span className="tnum text-sm text-text-3">{f.number}</span>
                      <span className={`hidden sm:inline-flex transition-colors ${isActive ? "text-teal" : "text-text-3"}`}><FamilyIcon name={f.icon} className="w-6 h-6" /></span>
                      <span>
                        <span className="block font-display text-2xl sm:text-3xl text-ink leading-tight">{f.title}</span>
                        <span className="block mt-1 text-xs text-text-3">
                          {f.subfamilies.map((s) => s.title).join(" · ")}
                        </span>
                      </span>
                      <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-400 ${isActive ? "border-ink bg-ink text-paper" : "border-line text-text-3"}`}>
                        <FiArrowUpRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </li>
                </Reveal>
              )
            })}
          </ol>

          <div className="lg:col-span-5 hidden lg:block">
            <div className="sticky top-28">
              <div className="plate aspect-[4/5] rounded-3xl">
                {FAMILIES.map((f, i) => (
                  <Image
                    key={f.handle}
                    src={f.image}
                    alt={f.title}
                    fill
                    sizes="40vw"
                    className={`object-cover transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-paper">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-paper/70 tnum">{current.number} · {current.subfamilies.length} subfamilias</p>
                  <p className="mt-2 text-sm leading-relaxed text-paper/90 max-w-sm">{current.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
