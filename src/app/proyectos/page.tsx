import type { Metadata } from "next"
import Link from "next/link"
import { FiArrowRight } from "react-icons/fi"
import Reveal from "@/components/ui/Reveal"
import { LINE_SHORT, serverGetProjects } from "@/lib/projects"
import ProjectsGrid from "./ProjectsGrid"

export const revalidate = 60

export const metadata: Metadata = {
  title: { absolute: "Proyectos | Mobiliario médico, veterinario y técnico fabricado en Panamá | KARVEN" },
  description: "Conozca proyectos de mobiliario médico, veterinario y técnico desarrollados y fabricados en Panamá por KARVEN Medical: fotografías, procesos y soluciones.",
  alternates: { canonical: "/proyectos" },
  openGraph: { title: "Proyectos | KARVEN Medical", description: "Nuestro trabajo, documentado. Proyectos de mobiliario médico, veterinario y técnico fabricados en Panamá.", url: "/proyectos", type: "website" },
}

/** Portfolio: published projects from the Medusa admin ("Proyectos"). */
export default async function ProjectsPage() {
  const projects = await serverGetProjects()
  const cards = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    line: p.line,
    lineLabel: LINE_SHORT[p.line],
    specialty: p.specialty,
    summary: p.summary,
    cover: p.cover_url || p.gallery.find((g) => g.type === "image")?.url || null,
    coverAlt: p.cover_alt || p.title,
    year: p.year,
  }))

  return (
    <div className="bg-paper pt-28 lg:pt-32 pb-20">
      <div className="container-custom">
        <div className="rule-strong pt-5 grid lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-teal">Proyectos</p>
            <h1 className="display-lg mt-4 text-ink text-balance">Nuestro trabajo, documentado.</h1>
          </div>
          <div className="lg:col-span-5 space-y-3 text-base leading-relaxed text-text-2">
            <p>Conozca proyectos de mobiliario médico, veterinario y técnico desarrollados y fabricados en Panamá.</p>
            <p>Fotografías, procesos y soluciones para distintas necesidades de atención, trabajo e infraestructura sanitaria.</p>
          </div>
        </div>

        {cards.length > 0 ? (
          <ProjectsGrid projects={cards} />
        ) : (
          <Reveal className="mt-12">
            <div className="card p-8 sm:p-10 text-center">
              <p className="eyebrow text-teal justify-center">Muy pronto</p>
              <h2 className="display-md mt-4 text-ink text-balance">Estamos documentando los primeros proyectos.</h2>
              <p className="subtitle mt-3 mx-auto max-w-xl">Mientras tanto, puede ver el mobiliario que fabricamos o escribirnos para conocer trabajos realizados en su especialidad.</p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/mobiliario" className="btn btn-teal">Ver mobiliario <FiArrowRight className="w-4 h-4" /></Link>
                <Link href="/contacto" className="link-arrow">Escribirnos</Link>
              </div>
            </div>
          </Reveal>
        )}

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
