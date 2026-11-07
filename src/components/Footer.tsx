import Link from "next/link"
import Image from "next/image"
import { FiArrowUpRight } from "react-icons/fi"

const CATALOG_LINKS = [
  { href: "/productos", label: "Todo el catálogo" },
  { href: "/productos?coleccion=camillas-y-camas", label: "Camillas y camas" },
  { href: "/productos?coleccion=mesas-quirurgicas", label: "Mesas quirúrgicas" },
  { href: "/productos?coleccion=unidades-odontologicas", label: "Unidades odontológicas" },
  { href: "/productos?coleccion=consultorio", label: "Consultorio" },
  { href: "/productos?coleccion=laboratorio", label: "Laboratorio" },
]

const COMPANY_LINKS = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
  { href: "/checkout", label: "Mi cotización" },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink text-text-on-ink">
      <div className="container-custom pt-20 pb-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block relative w-44 h-14" aria-label="Karven">
              <Image src="/images/logo-imagotipo-blanco.png" alt="Karven Medical Furniture" fill className="object-contain object-left" sizes="176px" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-text-on-ink-2">
              Mobiliario médico y clínico de alto nivel para hospitales, clínicas, consultorios y laboratorios en Panamá.
              Diseño, suministro e instalación.
            </p>
            <Link href="/contacto" className="btn btn-paper mt-8">
              Hablemos de su proyecto <FiArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <h3 className="eyebrow text-text-on-ink-3 mb-6">Catálogo</h3>
            <ul className="space-y-3">
              {CATALOG_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-text-on-ink-2 hover:text-paper transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="eyebrow text-text-on-ink-3 mb-6">Empresa</h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-text-on-ink-2 hover:text-paper transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
            <h3 className="eyebrow text-text-on-ink-3 mt-10 mb-4">Contacto</h3>
            <p className="text-sm text-text-on-ink-2">Ciudad de Panamá, Panamá</p>
            <a href="mailto:karvenmedicalpa@gmail.com" className="block text-sm text-text-on-ink-2 hover:text-paper transition-colors mt-1">karvenmedicalpa@gmail.com</a>
            <a href="tel:+50700000000" className="block text-sm text-text-on-ink-2 hover:text-paper transition-colors mt-1">+507 000-0000</a>
          </div>
        </div>

        <div className="hairline-ink mt-16 mb-8" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-text-on-ink-3">
          <p>© {year} Karven Medical Furniture. Todos los derechos reservados.</p>
          <p className="tracking-[0.2em] uppercase">Panamá · Mobiliario médico</p>
        </div>
      </div>
    </footer>
  )
}
