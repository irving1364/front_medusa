import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi"
import Reveal from "@/components/ui/Reveal"
import { unsplash } from "@/lib/catalog"

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Proyectos de equipamiento de Karven Medical: quirófanos, hospitalización, clínicas veterinarias, laboratorios, farmacias y morgues equipados en acero inoxidable.",
}

/**
 * Project types Karven delivers. PROVISIONAL: these describe the kind of work, not real client
 * projects. Replace with real cases (client, year, place, photos) when the content arrives;
 * each entry then becomes a case study card.
 */
const PROJECTS = [
  { slug: "quirofano", sector: "Hospitales", title: "Quirófano completo", line: "mobiliario-medico",
    text: "Mesas de instrumental, carros de anestesia, lavamanos quirúrgicos y atriles para una sala nueva o una renovación.", image: unsplash("1551076805-e1869033e561") },
  { slug: "hospitalizacion", sector: "Hospitales y clínicas", title: "Piso de hospitalización", line: "mobiliario-medico",
    text: "Camillas, carros de curaciones y medicación, atriles y auxiliares clínicos por habitación y por estación de enfermería.", image: unsplash("1538108149393-fbbd81895907") },
  { slug: "consultorio", sector: "Clínicas", title: "Consultorios y toma de muestras", line: "mobiliario-medico",
    text: "Camillas de examen, sillones de flebotomía, mesas clínicas y lavamanos de consulta para atención ambulatoria.", image: unsplash("1666214280557-f1b5022eb634") },
  { slug: "veterinaria", sector: "Clínicas veterinarias", title: "Clínica veterinaria", line: "mobiliario-veterinario",
    text: "Mesas de exploración y tratamiento, jaulas modulares, bañeras y estaciones de lavado en una sola entrega.", image: unsplash("1519494080410-f9aa76cb4283") },
  { slug: "laboratorio", sector: "Laboratorios y farmacias", title: "Laboratorio y farmacia", line: "mobiliario-tecnico",
    text: "Mesones técnicos, muebles base y aéreos, fregadores y gabinetes de almacenamiento fabricados a la medida del plano.", image: unsplash("1583912086096-8c60d75a53f9") },
  { slug: "morgue", sector: "Patología y morgues", title: "Sala de patología", line: "mobiliario-tecnico",
    text: "Mesas y estaciones de trabajo en 316, tinas, fregadores y almacenamiento para áreas de alta exigencia sanitaria.", image: unsplash("1581594549595-35f6edc7b762") },
]

export default function ProjectsPage() {
  return (
    <div className="bg-paper pt-28 lg:pt-32 pb-20">
      <div className="container-custom">
        <div className="rule-strong pt-5 grid lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow text-teal">Proyectos</p>
            <h1 className="display-lg mt-4 text-ink text-balance">Salas completas, no piezas sueltas.</h1>
          </div>
          <p className="lg:col-span-4 text-base leading-relaxed text-text-2">
            Equipamos áreas enteras: levantamiento, diseño, fabricación e instalación con el mismo equipo. Estos son los tipos de proyecto que entregamos.
          </p>
        </div>

        <ol className="mt-12 grid md:grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08} distance={20}>
              <li className="group card shadow-card overflow-hidden h-full flex flex-col">
                <div className="plate aspect-[16/10]">
                  <Image src={p.image} alt={p.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md glass mono text-[11px] text-ink">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="mono text-[10px] uppercase tracking-[0.14em] text-teal">{p.sector}</p>
                  <h2 className="mt-2 font-display text-2xl text-ink">{p.title}</h2>
                  <p className="mt-2 body-lg text-text-2">{p.text}</p>
                  <div className="mt-auto pt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <Link href={`/${p.line}`} className="link-arrow !text-sm">Ver mobiliario</Link>
                    <Link href="/contacto" className="inline-flex items-center gap-1.5 text-sm text-text-2 hover:text-ink">Cotizar un proyecto así <FiArrowUpRight className="w-3.5 h-3.5" /></Link>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-16">
          <div className="panel p-8 sm:p-12 grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow text-teal">Su proyecto</p>
              <h2 className="display-md mt-4 text-ink text-balance">Envíenos el plano del área. Volvemos con una propuesta completa.</h2>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
              <Link href="/contacto" className="btn btn-teal">Solicitar propuesta <FiArrowRight className="w-4 h-4" /></Link>
              <Link href="/fabricacion" className="link-arrow">Cómo fabricamos</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
