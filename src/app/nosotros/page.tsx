import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { FiArrowRight } from "react-icons/fi"
import Reveal from "@/components/ui/Reveal"
import SectionHeading from "@/components/ui/SectionHeading"
import { ABOUT_IMAGE, HERO_IMAGE } from "@/lib/catalog"

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Karven diseña, fabrica y suministra mobiliario médico en Panamá desde hace más de una década.",
}

const VALUES = [
  { title: "Rigor clínico", text: "Cada pieza se diseña con el personal que la va a usar: enfermería, cirugía, odontología y laboratorio." },
  { title: "Materiales honestos", text: "Acero inoxidable 304, aluminio anodizado y laminados de alta presión. Sin atajos que aparezcan a los dos años." },
  { title: "Plazos reales", text: "Decimos fechas que cumplimos. La logística la hacemos nosotros, no un tercero." },
  { title: "Servicio después de la venta", text: "Repuestos en stock y mantenimiento preventivo. Su equipo sigue operando aunque pasen los años." },
]

const MILESTONES = [
  { year: "2014", text: "Nace Karven en Ciudad de Panamá como taller de mobiliario clínico a medida." },
  { year: "2017", text: "Primer hospital completo equipado: 120 camas y 4 quirófanos." },
  { year: "2021", text: "Línea propia de unidades odontológicas y carros de enfermería." },
  { year: "2024", text: "Más de 350 proyectos entregados entre hospitales, clínicas y laboratorios." },
]

export default function AboutPage() {
  return (
    <div className="bg-paper">
      <section className="relative isolate overflow-hidden bg-ink text-paper pt-36 pb-20 lg:pt-48 lg:pb-28 grain">
        <Image src={HERO_IMAGE} alt="" fill sizes="100vw" className="object-cover opacity-20 -z-10" aria-hidden="true" />
        <div className="container-custom">
          <p className="eyebrow text-teal-3">Nosotros</p>
          <h1 className="display-xl mt-6 max-w-4xl text-balance">Fabricamos el mobiliario que sostiene el trabajo clínico.</h1>
          <p className="mt-8 max-w-2xl text-lg text-text-on-ink-2">
            Desde 2014 equipamos hospitales, clínicas, consultorios y laboratorios en Panamá con piezas pensadas para la desinfección diaria,
            la carga de pacientes y años de uso continuo.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-custom grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line">
                <Image src={ABOUT_IMAGE} alt="Equipo quirúrgico en un quirófano equipado" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <SectionHeading
                eyebrow="Nuestra historia"
                title={<>Diez años aprendiendo <span className="text-teal">del personal de salud.</span></>}
                description="Empezamos fabricando camillas a medida para un consultorio. Hoy diseñamos líneas completas de mobiliario, pero seguimos trabajando igual: escuchando primero a quienes van a usar cada pieza."
              />
              <ol className="mt-10 border-l border-line pl-6 space-y-6">
                {MILESTONES.map((m) => (
                  <li key={m.year} className="relative">
                    <span className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-teal" />
                    <p className="font-display text-xl text-ink">{m.year}</p>
                    <p className="mt-1 text-sm text-text-2">{m.text}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-ink text-paper">
        <div className="container-custom">
          <Reveal>
            <SectionHeading onDark eyebrow="Principios" title="Lo que no negociamos." />
          </Reveal>
          <div className="mt-14 grid sm:grid-cols-2 gap-px bg-line-ink border border-line-ink rounded-3xl overflow-hidden">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1} className="bg-ink">
                <div className="p-8 sm:p-10 h-full hover:bg-ink-2 transition-colors duration-500">
                  <p className="font-display text-3xl text-teal-3">0{i + 1}</p>
                  <h3 className="mt-6 font-display text-2xl">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-on-ink-2">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom text-center">
          <Reveal>
            <h2 className="display-md text-ink text-balance max-w-3xl mx-auto">¿Está planificando un espacio clínico?</h2>
            <p className="mt-5 text-text-2 max-w-xl mx-auto">Revisamos sus planos sin costo y le proponemos una distribución con el mobiliario adecuado.</p>
            <Link href="/contacto" className="btn btn-ink mt-8">
              Agendar una conversación <FiArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
