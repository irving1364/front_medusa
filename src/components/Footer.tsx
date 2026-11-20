"use client"

import Link from "next/link"
import Image from "next/image"
import { useCategories } from "@/context/CategoriesContext"
import { useTheme } from "@/lib/theme"

const heading = "font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-teal mb-4"
const item = "text-sm text-text-2 hover:text-ink transition-colors"

/** "Mobiliario médico" -> "Médico" for the footer column. */
const shortLine = (name: string) => { const s = name.replace(/^mobiliario\s+/i, ""); return s.charAt(0).toUpperCase() + s.slice(1) }

export default function Footer() {
  const year = new Date().getFullYear()
  const light = useTheme() === "light"
  const { parents } = useCategories()

  return (
    <footer className="bg-paper-2 border-t border-line">
      <div className="container-custom pt-14 pb-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-5">
            <Link href="/" className="inline-block relative w-32 h-[3.9rem]" aria-label="Karven, inicio">
              <Image src={`/images/logo-compacta-${light ? "color" : "blanca-web"}.png`} alt="Karven Medical" fill className="object-contain object-left" sizes="128px" />
            </Link>
            <p className="mt-5 font-display text-base font-semibold text-ink">Existimos para sostener a quienes cuidan.</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-3">Mobiliario médico y veterinario.<br />Desarrollo, fabricación y respaldo local.</p>
          </div>

          <div className="lg:col-span-2">
            <h3 className={heading}><Link href="/mobiliario">Mobiliario</Link></h3>
            <ul className="space-y-2.5">
              {parents.map((p) => <li key={p.handle}><Link href={`/${p.handle}`} className={item}>{shortLine(p.name)}</Link></li>)}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className={heading}>Empresa</h3>
            <ul className="space-y-2.5">
              <li><Link href="/nosotros" className={item}>Nosotros</Link></li>
              <li><Link href="/proyectos" className={item}>Proyectos</Link></li>
              <li><Link href="/fabricacion-a-medida" className={item}>Fabricación a medida</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className={heading}><Link href="/contacto">Contacto</Link></h3>
            <ul className="space-y-2.5">
              <li><a href="mailto:contact@karvenmedical.com" className={item}>contact@karvenmedical.com</a></li>
              <li><a href="https://wa.me/50766622199" target="_blank" rel="noreferrer" className={`${item} tnum`}>+507 6662-2199</a></li>
              <li><a href="https://www.instagram.com/karvenmedical/" target="_blank" rel="noreferrer" className={item}>@karvenmedical</a></li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-xs text-text-3">
          © {year} KARVEN Medical · La identidad de fabricación se documenta en fichas, placas y documentación según corresponda.
        </p>
      </div>
    </footer>
  )
}
