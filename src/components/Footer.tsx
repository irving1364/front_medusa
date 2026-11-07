"use client"

import Link from "next/link"
import Image from "next/image"
import { FAMILIES, ENVIRONMENTS } from "@/lib/catalog"
import { useTheme } from "@/lib/theme"

export default function Footer() {
  const year = new Date().getFullYear()
  const logo = useTheme() === "light" ? "oscuro" : "blanco"
  return (
    <footer className="bg-paper border-t border-line-2">
      <div className="container-custom pt-16 pb-10">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block relative w-40 h-12" aria-label="Karven">
              <Image src={`/images/logo-imagotipo-${logo}.png`} alt="Karven Medical Furniture" fill className="object-contain object-left" sizes="160px" />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-text-2">
              Fabricamos mobiliario clínico en acero inoxidable 304 y 316 para hospitales, clínicas, consultorios y laboratorios. Ciudad de Panamá.
            </p>
            <dl className="mt-6 text-sm text-text-2 space-y-1">
              <div className="flex gap-3"><dt className="w-14 text-text-3">Correo</dt><dd><a href="mailto:karvenmedicalpa@gmail.com" className="hover:text-ink">karvenmedicalpa@gmail.com</a></dd></div>
              <div className="flex gap-3"><dt className="w-14 text-text-3">Tel.</dt><dd><a href="tel:+50700000000" className="hover:text-ink tnum">+507 000-0000</a></dd></div>
              <div className="flex gap-3"><dt className="w-14 text-text-3">Horario</dt><dd className="tnum">Lun – Vie · 8:00 a 17:00</dd></div>
            </dl>
          </div>

          <div className="lg:col-span-4">
            <h3 className="eyebrow text-text-3 mb-5">Equipamiento</h3>
            <ol className="space-y-2.5">
              {FAMILIES.map((f) => (
                <li key={f.handle} className="flex gap-3 text-sm">
                  <span className="tnum text-text-3 w-6">{f.number}</span>
                  <Link href={`/equipamiento?familia=${f.handle}`} className="text-text-2 hover:text-ink transition-colors">{f.title}</Link>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-2">
            <h3 className="eyebrow text-text-3 mb-5">Entornos</h3>
            <ul className="space-y-2.5">
              {ENVIRONMENTS.map((e) => (
                <li key={e.handle}><Link href={`/entornos#${e.handle}`} className="text-sm text-text-2 hover:text-ink transition-colors">{e.title}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="eyebrow text-text-3 mb-5">Empresa</h3>
            <ul className="space-y-2.5">
              <li><Link href="/fabricacion" className="text-sm text-text-2 hover:text-ink transition-colors">Fabricación</Link></li>
              <li><Link href="/contacto" className="text-sm text-text-2 hover:text-ink transition-colors">Contacto</Link></li>
              <li><Link href="/checkout" className="text-sm text-text-2 hover:text-ink transition-colors">Mi cotización</Link></li>
            </ul>
          </div>
        </div>

        <div className="rule mt-14 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-text-3">
          <p>© {year} Karven Medical Furniture · Ciudad de Panamá</p>
          <p className="tnum">Acero inoxidable AISI 304 / 316 · Soldadura TIG</p>
        </div>
      </div>
    </footer>
  )
}
