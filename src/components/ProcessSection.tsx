"use client"

import Reveal from "@/components/ui/Reveal"
import SectionHeading from "@/components/ui/SectionHeading"

const STEPS = [
  {
    n: "01",
    title: "Levantamiento",
    text: "Visitamos el espacio o revisamos sus planos. Definimos flujos, especialidades y normativa aplicable.",
  },
  {
    n: "02",
    title: "Propuesta y cotización",
    text: "Seleccionamos las piezas, proponemos acabados y entregamos una cotización formal en 48 horas.",
  },
  {
    n: "03",
    title: "Fabricación y entrega",
    text: "Producción bajo estándares hospitalarios, control de calidad y logística programada con su equipo.",
  },
  {
    n: "04",
    title: "Instalación y garantía",
    text: "Instalamos, capacitamos al personal y acompañamos con mantenimiento y repuestos durante toda la garantía.",
  },
]

export default function ProcessSection() {
  return (
    <section className="section bg-paper">
      <div className="container-custom">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Cómo trabajamos"
            title={<>De la primera visita a la sala <span className="text-teal">lista para operar.</span></>}
          />
        </Reveal>

        <ol className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative">
          <div className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-line" aria-hidden="true" />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12}>
              <li className="relative">
                <span className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-full bg-paper border border-line-2 font-display text-lg text-ink">
                  {s.n}
                </span>
                <h3 className="mt-6 font-display text-2xl text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-2">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
