"use client"

import Link from "next/link"
import Image from "next/image"
import { useCategories } from "@/context/CategoriesContext"
import { useTheme } from "@/lib/theme"

export default function Footer() {
  const year = new Date().getFullYear()
  const logo = useTheme() === "light" ? "oscuro" : "blanco"
  const { parents } = useCategories()

  return (
    <footer className="bg-paper border-t border-line-2">
      <div className="container-custom pt-16 pb-10">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <Link href="/" className="inline-block relative w-36 h-[4.4rem]" aria-label="Karven">
              <Image src={`/images/logo-compacta-${logo === "oscuro" ? "color" : "blanca-web"}.png`} alt="Karven Medical Furniture" fill className="object-contain object-left" sizes="144px" />
            </Link>
            <p className="mt-6 max-w-xs font-display text-lg text-ink leading-snug">Existimos para sostener a quienes cuidan.</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-2">
              Desarrollamos, fabricamos y respaldamos mobiliario médico, veterinario y técnico para entornos sanitarios.
            </p>
            <p className="mt-3 max-w-xs text-sm text-text-3">Fabricado en Panamá por FABMETAL.</p>
            <dl className="mt-6 text-sm text-text-2 space-y-1">
              <div className="flex gap-3"><dt className="w-20 text-text-3">Correo</dt><dd><a href="mailto:contact@karvenmedical.com" className="hover:text-ink">contact@karvenmedical.com</a></dd></div>
              <div className="flex gap-3"><dt className="w-20 text-text-3">WhatsApp</dt><dd><a href="https://wa.me/50766622199" target="_blank" rel="noreferrer" className="hover:text-ink tnum">+507 6662-2199</a></dd></div>
              <div className="flex gap-3"><dt className="w-20 text-text-3">Horario</dt><dd className="tnum">Lun – Vie · 8:00 a 17:00</dd></div>
            </dl>
          </div>

          {parents.map((p) => (
            <div key={p.handle} className="lg:col-span-2">
              <h3 className="eyebrow text-text-3 mb-5">
                <Link href={`/mobiliario?linea=${p.handle}`} className="hover:text-ink">{p.name}</Link>
              </h3>
              <ol className="space-y-2.5">
                {p.children.map((c) => (
                  <li key={c.handle} className="text-sm">
                    <Link href={`/mobiliario?categoria=${c.handle}`} className="text-text-2 hover:text-ink transition-colors">{c.name}</Link>
                  </li>
                ))}
              </ol>
            </div>
          ))}

          <div className="lg:col-span-3 lg:col-start-10">
            <h3 className="eyebrow text-text-3 mb-5">Empresa</h3>
            <ul className="space-y-2.5">
              <li><Link href="/nosotros" className="text-sm text-text-2 hover:text-ink transition-colors">Nosotros</Link></li>
              <li><Link href="/fabricacion" className="text-sm text-text-2 hover:text-ink transition-colors">Fabricación a medida</Link></li>
              <li><Link href="/proyectos" className="text-sm text-text-2 hover:text-ink transition-colors">Proyectos</Link></li>
              <li><Link href="/contacto" className="text-sm text-text-2 hover:text-ink transition-colors">Contacto</Link></li>
              <li><Link href="/checkout" className="text-sm text-text-2 hover:text-ink transition-colors">Solicitar cotización</Link></li>
            </ul>
          </div>
        </div>

        <div className="rule mt-14 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-text-3">
          <p>© {year} KARVEN Medical. Todos los derechos reservados.</p>
          <p>Fabricado en Panamá por FABMETAL.</p>
        </div>
      </div>
    </footer>
  )
}
