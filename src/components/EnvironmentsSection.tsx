"use client"

import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import AccordionGallery from "@/components/reactbits/AccordionGallery/AccordionGallery"
import Reveal from "@/components/ui/Reveal"
import { ENVIRONMENTS } from "@/lib/catalog"
import { useTheme } from "@/lib/theme"

export default function EnvironmentsSection() {
  const theme = useTheme()
  const light = theme === "light"
  return (
    <section className="section bg-paper-2">
      <div className="container-custom">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 rule-strong pt-5">
            <div>
              <p className="eyebrow text-teal">Entornos</p>
              <h2 className="display-md mt-4 text-ink max-w-2xl text-balance">Equipamos la sala completa, no solo la pieza.</h2>
            </div>
            <Link href="/entornos" className="btn btn-outline self-start md:self-auto">Ver entornos <FiArrowUpRight className="w-4 h-4" /></Link>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <AccordionGallery
            items={ENVIRONMENTS.map((e) => ({ image: e.image, label: e.title, link: `/entornos#${e.handle}`, alt: e.description }))}
            defaultIndex={0}
            height={520}
            gap={8}
            radius={20}
            expandRatio={0.46}
            accentColor="#2FB1C2"
            overlayColor={light ? "#F4F6F8" : "#0A0C10"}
            textColor={light ? "#0A0C10" : "#F2F4F7"}
            parallax={0.35}
            tilt={0}
            grayscale
            trigger="hover"
          />
        </Reveal>

        <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 text-sm text-text-2">
          {ENVIRONMENTS.map((e) => (
            <li key={e.handle} className="flex gap-3 border-t border-line pt-3">
              <span className="font-medium text-ink shrink-0 w-40">{e.title}</span>
              <span className="text-text-3">{e.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
