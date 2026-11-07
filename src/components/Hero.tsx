"use client"

import Image from "next/image"
import Link from "next/link"
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi"
import SplitText from "@/components/reactbits/SplitText/SplitText"
import GradientWaves from "@/components/reactbits/GradientWaves/GradientWaves"
import { FAMILIES, HERO_PRODUCT } from "@/lib/catalog"
import { useTheme } from "@/lib/theme"

const SUBFAMILY_COUNT = FAMILIES.reduce((n, f) => n + f.subfamilies.length, 0)

export default function Hero() {
  const theme = useTheme()
  const light = theme === "light"

  return (
    <section className="relative bg-paper pt-32 lg:pt-40 overflow-hidden">
      <div className="container-custom">
        {/* Headline row */}
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <Link href="/equipamiento" className="chip animate-fade-in hover:border-line-3 hover:text-ink transition-colors">
              <span className="px-1.5 py-0.5 rounded bg-teal/15 text-teal text-[10px] font-semibold tracking-wide uppercase">Catálogo</span>
              {FAMILIES.length} familias · {SUBFAMILY_COUNT} subfamilias <FiArrowRight className="w-3 h-3 opacity-70" />
            </Link>
            <SplitText
              text="Mobiliario clínico en acero inoxidable, fabricado en Panamá."
              tag="h1"
              className="display-lg mt-6 text-ink text-balance max-w-4xl"
              splitType="words"
              effect="rise"
              trigger="load"
              delay={40}
              duration={1}
              ease="power4.out"
              textAlign="left"
              threshold={0}
              rootMargin="0px"
            />
            <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-rise" style={{ animationDelay: "500ms" }}>
              <Link href="/equipamiento" className="btn btn-ink">Ver equipamiento <FiArrowRight className="w-4 h-4" /></Link>
              <Link href="/contacto" className="btn btn-outline">Solicitar cotización</Link>
            </div>
          </div>
          <p className="lg:col-span-4 text-base leading-relaxed text-text-2 max-w-sm lg:justify-self-end animate-rise" style={{ animationDelay: "650ms" }}>
            Camillas, mesas, carros, lavamanos quirúrgicos y superficies sanitarias para hospitales, clínicas y laboratorios.
            Soldadura TIG, pulido sanitario, instalación con equipo propio.
          </p>
        </div>

        {/* Stage: one product, nothing else */}
        <div className="relative mt-12 lg:mt-16 panel overflow-hidden animate-rise" style={{ animationDelay: "350ms" }}>
          <div className="absolute inset-0" aria-hidden="true">
            <GradientWaves
              key={theme}
              horizonColor={light ? "#8BE0EA" : "#0E6B78"}
              waveColor="#2FB1C2"
              crestColor={light ? "#FFFFFF" : "#C6F0F5"}
              backgroundColor={light ? "#F4F6F8" : "#0A0C10"}
              lightMode={light}
              speed={0.2}
              amplitude={1.8}
              swell={28}
              turbulence={12}
              height={5.2}
              fogDepth={18}
              brightness={light ? 1 : 1.15}
              grain={0.18}
              quality="medium"
              mouseInteraction
              parallaxStrength={0.3}
              mouseStrength={0.3}
              swellOnClick={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paper/90 via-paper/20 to-transparent" />
          </div>

          <div className="relative p-3 sm:p-4 lg:p-5">
            <Link href={`/equipamiento/${HERO_PRODUCT.handle}`} className="group block glass rounded-2xl overflow-hidden">
              <div className="plate plate-hero relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">
                <Image src={HERO_PRODUCT.image} alt={HERO_PRODUCT.label} fill priority sizes="(max-width: 1024px) 100vw, 1280px" className="object-cover" />
                <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md glass mono text-[11px] text-ink">{HERO_PRODUCT.sku}</span>
                <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md glass text-[11px] text-ink opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                  Ver ficha <FiArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="grid sm:grid-cols-[1.4fr_repeat(4,1fr)] divide-y sm:divide-y-0 sm:divide-x divide-line border-t border-line">
                <div className="px-5 py-4">
                  <p className="mono text-[10px] uppercase tracking-[0.14em] text-text-3">Referencia</p>
                  <p className="mt-1 font-display text-lg text-ink leading-tight">{HERO_PRODUCT.label}</p>
                </div>
                {HERO_PRODUCT.specs.map(([k, v]) => (
                  <div key={k} className="px-5 py-4">
                    <p className="mono text-[10px] uppercase tracking-[0.14em] text-text-3">{k}</p>
                    <p className="mt-1 text-sm text-ink tnum">{v}</p>
                  </div>
                ))}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
