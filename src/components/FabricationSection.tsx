"use client"

import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import ScrollReveal from "@/components/reactbits/ScrollReveal/ScrollReveal"
import Reveal from "@/components/ui/Reveal"

const COLUMNS = [
  {
    title: "Materiales",
    rows: [["AISI 304", "Mobiliario clínico general"], ["AISI 316", "Higiene, patología y zonas húmedas"], ["HPL / fenólico", "Cubiertas de consultorio y laboratorio"], ["Calibres", "20 · 18 · 16 · 14 según carga"]],
  },
  {
    title: "Proceso",
    rows: [["Corte", "Láser y plegado CNC"], ["Unión", "Soldadura TIG continua"], ["Acabado", "Pulido sanitario grano 180"], ["Pasivado", "En piezas 316 y contacto con fluidos"]],
  },
  {
    title: "Entrega",
    rows: [["Cotización", "Formal, con planos si aplica"], ["Fabricación", "Bajo pedido, a medida"], ["Instalación", "Equipo propio en Panamá"], ["Garantía", "Hasta 5 años en estructura"]],
  },
]

export default function FabricationSection() {
  return (
    <section className="section bg-ink text-paper">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <p className="eyebrow text-teal-3">Fabricación</p>
            <ScrollReveal
              baseOpacity={0.15}
              baseRotation={1}
              blurStrength={3}
              stagger={0.03}
              splitBy="words"
              containerClassName="mt-6"
              textClassName="font-display display-md text-paper text-balance"
            >
              Trabajamos el acero inoxidable como se trabaja un instrumento: sin aristas, sin juntas donde se acumule nada, y con una soldadura que no se nota al tacto.
            </ScrollReveal>
          </div>
          <div className="lg:col-span-4 lg:pt-14">
            <Reveal delay={0.2}>
              <p className="text-sm leading-relaxed text-text-on-ink-2">
                Diseñamos cada pieza con el personal que la va a usar, la fabricamos en nuestro taller de Ciudad de Panamá y la instalamos nosotros.
                Sin intermediarios y sin piezas importadas que nadie sabe reparar.
              </p>
              <Link href="/fabricacion" className="btn btn-paper mt-6">Cómo fabricamos <FiArrowUpRight className="w-4 h-4" /></Link>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-px bg-line-ink border border-line-ink">
          {COLUMNS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1} className="bg-ink">
              <div className="p-7">
                <h3 className="font-display text-2xl">{c.title}</h3>
                <dl className="mt-5">
                  {c.rows.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 py-2.5 border-t border-line-ink text-sm">
                      <dt className="text-text-on-ink-3 tnum">{k}</dt>
                      <dd className="text-text-on-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
