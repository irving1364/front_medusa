import type { Metadata } from "next"
import Link from "next/link"
import { FiArrowRight } from "react-icons/fi"
import Reveal from "@/components/ui/Reveal"

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
}

const LINES = [
  { href: "/mobiliario-medico", title: "Mobiliario médico", text: "Camillas, sillas clínicas, mesas de instrumental, carros y auxiliares." },
  { href: "/mobiliario-veterinario", title: "Mobiliario veterinario", text: "Mesas de exploración y tratamiento, jaulas de hospitalización y apoyo." },
  { href: "/mobiliario-tecnico", title: "Mobiliario técnico", text: "Mesones, estaciones de trabajo, fregadores y almacenamiento." },
]

const LINKS = [
  { href: "/fabricacion-a-medida", label: "Fabricación a medida" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
]

/** 404 for any route or product that no longer exists: offers the three lines and the main sections instead of a dead end. */
export default function NotFound() {
  return (
    <div className="bg-paper pt-28 lg:pt-32 pb-20">
      <div className="container-custom">
        <Reveal className="rule-strong pt-5 grid lg:grid-cols-12 gap-6 items-end" stagger={0.1}>
          <div className="lg:col-span-7">
            <p className="eyebrow text-teal">Error 404</p>
            <h1 className="display-lg mt-4 text-ink text-balance">Esta página no existe.</h1>
          </div>
          <div className="lg:col-span-5 space-y-3 text-base leading-relaxed text-text-2">
            <p>El enlace puede haber cambiado o la referencia ya no está en el catálogo.</p>
            <p>Si llegó aquí desde una cotización o un mensaje, escríbanos y le indicamos la pieza actual.</p>
          </div>
        </Reveal>

        <Reveal className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link href="/mobiliario" className="btn btn-teal">Ver todo el mobiliario <FiArrowRight className="w-4 h-4" /></Link>
          <Link href="/" className="btn btn-outline">Ir al inicio</Link>
        </Reveal>

        <Reveal as="ul" className="mt-14 grid sm:grid-cols-3 gap-5" stagger={0.1}>
          {LINES.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="group card shadow-card p-6 h-full flex flex-col">
                <h2 className="font-display text-2xl text-ink group-hover:text-teal transition-colors">{l.title}</h2>
                <p className="mt-2 body-lg text-text-2">{l.text}</p>
                <span className="mt-auto pt-6 link-arrow !text-sm">Ver línea</span>
              </Link>
            </li>
          ))}
        </Reveal>

        <Reveal className="mt-14 rule pt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
          <p className="mono text-[10px] uppercase tracking-[0.14em] text-text-3">También puede ir a</p>
          {LINKS.map((l) => <Link key={l.href} href={l.href} className="text-sm text-text-2 hover:text-ink transition-colors">{l.label}</Link>)}
        </Reveal>
      </div>
    </div>
  )
}
