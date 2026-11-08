import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/ui/Reveal"
import MinimalReferences from "@/components/minimal/MinimalReferences"
import { FAMILIES, ENVIRONMENTS, HERO_PRODUCT } from "@/lib/catalog"

export const metadata: Metadata = {
  title: "Inicio (minimal)",
  description: "Versión minimalista del inicio de Karven: mobiliario clínico en acero inoxidable, fabricado en Panamá.",
  robots: { index: false, follow: true },
}

/**
 * Alternative home at /minimal.
 * Apple-design rules taken to the limit: no cards, no panels, no animated backgrounds.
 * Type, whitespace and one photograph carry the page.
 */
export default function MinimalHome() {
  return (
    <div className="bg-paper-2">
      {/* 1 · Statement */}
      <section className="pt-44 pb-24 lg:pt-56 lg:pb-32">
        <div className="container-custom max-w-5xl">
          <Reveal distance={16}>
            <h1 className="display-xl text-ink text-balance">
              Mobiliario clínico.<br />En acero inoxidable.
            </h1>
          </Reveal>
          <Reveal delay={0.15} distance={16}>
            <p className="subtitle mt-8 max-w-2xl">
              Camillas, mesas, carros y lavamanos quirúrgicos. Diseñados, soldados e instalados en Panamá.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link href="/equipamiento" className="link-arrow">Ver equipamiento</Link>
              <Link href="/contacto" className="link-arrow">Solicitar cotización</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 · One photograph */}
      <section className="pb-24 lg:pb-32">
        <div className="container-custom">
          <Reveal distance={24}>
            <Link href={`/equipamiento/${HERO_PRODUCT.handle}`} className="group block">
              <div className="plate plate-hero aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] rounded-[18px]">
                <Image src={HERO_PRODUCT.image} alt={HERO_PRODUCT.label} fill priority sizes="(max-width: 1024px) 100vw, 1280px" className="object-cover" />
              </div>
              <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-sm">
                <span className="text-ink"><span className="mono text-text-3 mr-3">{HERO_PRODUCT.sku}</span>{HERO_PRODUCT.label}</span>
                <span className="mono text-text-3">{HERO_PRODUCT.spec}</span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 3 · Three columns of plain text */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="container-custom grid md:grid-cols-3 gap-12 lg:gap-16">
          <Reveal distance={16}>
            <h2 className="text-sm font-semibold text-ink">Equipamiento</h2>
            <ol className="mt-5 space-y-2.5">
              {FAMILIES.map((f) => (
                <li key={f.handle}>
                  <Link href={`/equipamiento?familia=${f.handle}`} className="body-lg text-text-2 hover:text-ink transition-colors">
                    <span className="mono text-text-3 mr-3">{f.number}</span>{f.title}
                  </Link>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal distance={16} delay={0.08}>
            <h2 className="text-sm font-semibold text-ink">Entornos</h2>
            <ul className="mt-5 space-y-2.5">
              {ENVIRONMENTS.map((e) => (
                <li key={e.handle}>
                  <Link href={`/entornos#${e.handle}`} className="body-lg text-text-2 hover:text-ink transition-colors">{e.title}</Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal distance={16} delay={0.16}>
            <h2 className="text-sm font-semibold text-ink">Fabricación</h2>
            <dl className="mt-5 space-y-2.5 body-lg text-text-2">
              <div className="flex gap-4"><dt className="w-24 shrink-0 text-text-3">Acero</dt><dd>AISI 304 y 316</dd></div>
              <div className="flex gap-4"><dt className="w-24 shrink-0 text-text-3">Unión</dt><dd>Soldadura TIG continua</dd></div>
              <div className="flex gap-4"><dt className="w-24 shrink-0 text-text-3">Acabado</dt><dd>Pulido sanitario grano 180</dd></div>
              <div className="flex gap-4"><dt className="w-24 shrink-0 text-text-3">Entrega</dt><dd>Instalación con equipo propio</dd></div>
              <div className="flex gap-4"><dt className="w-24 shrink-0 text-text-3">Garantía</dt><dd>Hasta 5 años en estructura</dd></div>
            </dl>
            <Link href="/fabricacion" className="link-arrow mt-6">Cómo fabricamos</Link>
          </Reveal>
        </div>
      </section>

      {/* 4 · One sentence */}
      <section className="py-24 lg:py-32">
        <div className="container-custom max-w-5xl">
          <Reveal distance={16}>
            <p className="display-lg text-ink text-balance">Soldado como un instrumento. Sin aristas, sin juntas, sin cordones a la vista.</p>
          </Reveal>
        </div>
      </section>

      {/* 5 · References as a list */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="container-custom">
          <Reveal distance={16}>
            <div className="flex items-baseline justify-between gap-6">
              <h2 className="display-md text-ink">Referencias.</h2>
              <Link href="/equipamiento" className="link-arrow">Todo el equipamiento</Link>
            </div>
          </Reveal>
          <MinimalReferences />
        </div>
      </section>

      {/* 6 · Contact line */}
      <section className="py-24 lg:py-32">
        <div className="container-custom max-w-5xl">
          <Reveal distance={16}>
            <h2 className="display-md text-ink text-balance">¿Qué área va a equipar?</h2>
            <p className="subtitle mt-5 max-w-2xl">Una lista de piezas o los planos del área bastan. Respondemos con una cotización formal.</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link href="/contacto" className="link-arrow">Escribirnos</Link>
              <a href="mailto:karvenmedicalpa@gmail.com" className="body-lg text-text-2 hover:text-ink transition-colors">karvenmedicalpa@gmail.com</a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
