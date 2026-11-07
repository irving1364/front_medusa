"use client"

import Image from "next/image"
import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { CATEGORIES } from "@/lib/catalog"
import Reveal from "@/components/ui/Reveal"
import SectionHeading from "@/components/ui/SectionHeading"

// Bento layout: first tile spans two columns and two rows on desktop.
const SPANS = [
  "lg:col-span-2 lg:row-span-2 aspect-[4/3] lg:aspect-auto",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "sm:col-span-2 lg:col-span-4 aspect-[4/3] sm:aspect-[8/3] lg:aspect-[16/5]",
]

export default function CategoryGrid() {
  return (
    <section id="categorias" className="section bg-paper">
      <div className="container-custom">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <SectionHeading
              eyebrow="Catálogo"
              title={<>Seis familias de producto, <span className="text-teal">un solo estándar</span> de calidad.</>}
            />
            <Link href="/productos" className="btn btn-outline self-start lg:self-auto">
              Ver todo el catálogo <FiArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.handle} delay={i * 0.08} className={SPANS[i]}>
              <Link
                href={`/productos?coleccion=${cat.handle}`}
                className="group relative block h-full w-full overflow-hidden rounded-2xl bg-paper-2"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-paper/70">0{i + 1}</p>
                      <h3 className="font-display text-2xl sm:text-3xl text-paper mt-1 text-balance">{cat.title}</h3>
                      {i === 0 && <p className="hidden lg:block mt-3 max-w-md text-sm text-paper/80">{cat.description}</p>}
                    </div>
                    <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-paper text-ink translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <FiArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
