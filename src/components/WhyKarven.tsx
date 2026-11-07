"use client"

import Image from "next/image"
import { FiShield, FiTool, FiTruck, FiLayers } from "react-icons/fi"
import Reveal from "@/components/ui/Reveal"
import SectionHeading from "@/components/ui/SectionHeading"
import { ABOUT_IMAGE } from "@/lib/catalog"

const PILLARS = [
  {
    icon: FiShield,
    title: "Grado hospitalario",
    text: "Acero inoxidable 304, laminados antibacterianos y tapicería sanitaria sin costuras. Materiales que resisten desinfección diaria.",
  },
  {
    icon: FiLayers,
    title: "Diseño a medida",
    text: "Adaptamos dimensiones, colores y configuraciones a cada especialidad, desde un consultorio hasta un hospital completo.",
  },
  {
    icon: FiTruck,
    title: "Entrega e instalación",
    text: "Logística propia en Panamá. Instalamos, nivelamos y dejamos cada pieza lista para operar el mismo día.",
  },
  {
    icon: FiTool,
    title: "Garantía y servicio",
    text: "Garantía de hasta 5 años, repuestos en stock y mantenimiento preventivo programado para su equipo.",
  },
]

export default function WhyKarven() {
  return (
    <section className="section bg-ink text-paper grain">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                onDark
                eyebrow="Por qué Karven"
                title={<>Mobiliario que soporta el ritmo real <span className="text-teal-3">de una clínica.</span></>}
                description="No vendemos muebles genéricos adaptados a la salud. Cada pieza nace de la rutina clínica: limpieza constante, carga de pacientes, movilidad y años de uso."
              />
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
                <Image src={ABOUT_IMAGE} alt="Equipo quirúrgico trabajando en un quirófano" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <p className="absolute bottom-5 left-5 text-[11px] uppercase tracking-[0.2em] text-paper/80">Hospital privado · Ciudad de Panamá</p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:pt-10">
            <div className="grid sm:grid-cols-2 gap-px bg-line-ink rounded-3xl overflow-hidden border border-line-ink">
              {PILLARS.map((p, i) => {
                const Icon = p.icon
                return (
                  <Reveal key={p.title} delay={0.1 + i * 0.1} className="bg-ink">
                    <div className="h-full p-7 sm:p-9 hover:bg-ink-2 transition-colors duration-500">
                      <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-teal/20 text-teal-3">
                        <Icon className="w-5 h-5" />
                      </span>
                      <h3 className="mt-7 font-display text-2xl text-paper">{p.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-text-on-ink-2">{p.text}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
