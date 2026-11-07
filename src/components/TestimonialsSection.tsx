"use client"

import Reveal from "@/components/ui/Reveal"
import SectionHeading from "@/components/ui/SectionHeading"

const TESTIMONIALS = [
  {
    quote: "Equiparon tres quirófanos y la sala de recuperación en dos semanas. Las mesas llegaron calibradas y el personal recibió capacitación el mismo día.",
    name: "Dr. Ernesto Villalobos",
    role: "Director médico · Centro quirúrgico, Costa del Este",
  },
  {
    quote: "Las camillas de examen y las vitrinas tienen un acabado impecable y se limpian en segundos. Nuestros pacientes lo notan desde la recepción.",
    name: "Dra. Lorena Batista",
    role: "Dermatología · Consultorio privado, Obarrio",
  },
  {
    quote: "Necesitábamos mesones de acero inoxidable a medida para el laboratorio. Cumplieron las especificaciones y el plazo sin una sola desviación.",
    name: "Lic. Mariela Quintero",
    role: "Jefa de laboratorio clínico, Panamá Oeste",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="section bg-paper-2">
      <div className="container-custom">
        <Reveal>
          <SectionHeading eyebrow="Clientes" title={<>Lo que dicen quienes ya <span className="text-teal">equiparon con Karven.</span></>} />
        </Reveal>
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="card h-full p-8 flex flex-col">
                <span className="font-display text-6xl leading-none text-teal/40" aria-hidden="true">“</span>
                <blockquote className="mt-2 text-base leading-relaxed text-ink">{t.quote}</blockquote>
                <figcaption className="mt-auto pt-8">
                  <div className="text-sm font-semibold text-ink">{t.name}</div>
                  <div className="text-xs text-text-3 mt-1">{t.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
