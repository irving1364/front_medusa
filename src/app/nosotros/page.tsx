import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { FiArrowRight } from "react-icons/fi"
import Reveal from "@/components/ui/Reveal"
import FamilyIcon from "@/components/ui/FamilyIcon"
import { SECTORS, unsplash } from "@/lib/catalog"

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Karven Medical: fabricantes de mobiliario médico, veterinario y técnico en acero inoxidable, con taller propio en Ciudad de Panamá.",
}

const LINES = [
  { code: "MED" as const, title: "Mobiliario médico", text: "Atención humana, exploración, procedimientos, higiene clínica y apoyo al paciente.", href: "/mobiliario-medico" },
  { code: "VET" as const, title: "Mobiliario veterinario", text: "Exploración, tratamiento, hospitalización, preparación y apoyo veterinario.", href: "/mobiliario-veterinario" },
  { code: "TEC" as const, title: "Mobiliario técnico", text: "Muebles fijos, mesones, estaciones de trabajo, almacenamiento y lavado especializado.", href: "/mobiliario-tecnico" },
]

const PRINCIPLES = [
  { title: "Acero que aguanta la desinfección diaria.", text: "AISI 304 en uso clínico general y 316 donde hay fluidos o cloruros. Sin pintura que se descascare ni juntas que acumulen." },
  { title: "Fabricamos a medida, no adaptamos catálogo.", text: "Cada pieza parte del plano del área y del flujo de trabajo del personal que la va a usar." },
  { title: "Un solo equipo de principio a fin.", text: "Levantamiento, diseño, fabricación, instalación y servicio con la misma gente. Sin intermediarios." },
  { title: "Repuestos y servicio en Panamá.", text: "Lo que fabricamos aquí lo reparamos aquí, sin esperar importaciones." },
]

/** PROVISIONAL copy: replace with Karven's own history, team and workshop photos when available. */
export default function AboutPage() {
  return (
    <div className="bg-paper pt-28 lg:pt-32">
      <div className="container-custom">
        <div className="rule-strong pt-5 grid lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow text-teal">Nosotros</p>
            <h1 className="display-lg mt-4 text-ink text-balance">Desarrollamos y fabricamos mobiliario para quienes cuidan.</h1>
          </div>
          <div className="lg:col-span-4 text-base leading-relaxed text-text-2 space-y-4">
            <p>KARVEN Medical es una marca panameña especializada en el desarrollo, fabricación, adaptación y respaldo de mobiliario médico, veterinario y técnico para entornos sanitarios.</p>
            <p>Comprendemos las necesidades de uso, definimos las especificaciones y respaldamos nuestros productos. La fabricación se realiza en nuestro taller en Ciudad de Panamá, a través de FABMETAL.</p>
          </div>
        </div>

        <Reveal className="mt-12">
          <div className="plate aspect-[21/9] rounded-[18px] border border-line">
            <Image src={unsplash("1504439468489-c8920d796a29", 2000)} alt="Taller y equipamiento clínico" fill sizes="100vw" className="object-cover" priority />
          </div>
        </Reveal>
      </div>

      <section className="section">
        <div className="container-custom grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Reveal><p className="eyebrow text-teal">Qué hacemos</p><h2 className="display-md mt-4 text-ink">Tres líneas, un mismo acero.</h2></Reveal>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-5">
            {LINES.map((l, i) => (
              <Reveal key={l.code} delay={i * 0.06} distance={16}>
                <Link href={l.href} className="card shadow-card p-6 h-full flex flex-col hover:border-teal/40 transition-colors">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-teal-soft text-teal"><FamilyIcon name={l.code} className="w-5 h-5" /></span>
                  <h3 className="mt-5 font-display text-xl text-ink">{l.title}</h3>
                  <p className="mt-2 text-sm text-text-2 leading-relaxed">{l.text}</p>
                  <span className="mt-auto pt-5 link-arrow !text-sm">Ver línea</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-paper-2">
        <div className="container-custom grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Reveal><p className="eyebrow text-teal">Cómo trabajamos</p><h2 className="display-md mt-4 text-ink">Cuatro reglas que no negociamos.</h2></Reveal>
          </div>
          <div className="lg:col-span-8">
            <ol className="border-t border-line-2">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.05} distance={14}>
                  <li className="grid sm:grid-cols-[4rem_1fr] gap-2 sm:gap-6 py-6 border-b border-line">
                    <span className="mono text-sm text-teal">{String(i + 1).padStart(2, "0")}</span>
                    <div><h3 className="font-display text-xl text-ink">{p.title}</h3><p className="mt-2 body-lg text-text-2">{p.text}</p></div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow text-teal justify-center">Dónde estamos</p>
              <h2 className="display-md mt-4 text-ink">Hospitales, clínicas, veterinarias, farmacias, laboratorios y morgues.</h2>
              <p className="subtitle">Fabricamos en Ciudad de Panamá e instalamos con equipo propio.</p>
            </div>
          </Reveal>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {SECTORS.map((s) => <span key={s} className="chip">{s}</span>)}
          </div>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <Link href="/contacto" className="btn btn-teal">Hablar con nosotros <FiArrowRight className="w-4 h-4" /></Link>
            <Link href="/proyectos" className="link-arrow">Ver proyectos</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
