"use client"

import Image from "next/image"
import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import SplitText from "@/components/reactbits/SplitText/SplitText"
import GradientWaves from "@/components/reactbits/GradientWaves/GradientWaves"
import { HERO_PRODUCT } from "@/lib/catalog"
import { useTheme } from "@/lib/theme"

/** Apple-style opener: centered headline (≤ 8 words), one-line subtitle, one CTA + one link, product below. */
export default function Hero() {
  const theme = useTheme()
  const light = theme === "light"

  return (
    <section className="relative bg-paper-2 pt-36 lg:pt-44 pb-6 overflow-hidden">
      <div className="container-custom">
        <div className="section-head">
          <p className="eyebrow text-teal justify-center animate-fade-in">Karven · Mobiliario médico</p>
          <SplitText
            text="Acero inoxidable. Hecho en Panamá."
            tag="h1"
            className="display-xl mt-5 text-ink text-balance"
            splitType="words"
            effect="rise"
            trigger="load"
            delay={50}
            duration={1}
            ease="power4.out"
            textAlign="center"
            threshold={0}
            rootMargin="0px"
          />
          <p className="subtitle mt-5 animate-rise" style={{ animationDelay: "400ms" }}>
            Mobiliario clínico soldado, pulido y listo para desinfección diaria.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 animate-rise" style={{ animationDelay: "550ms" }}>
            <Link href="/equipamiento" className="btn btn-teal">Ver equipamiento</Link>
            <Link href="/contacto" className="link-arrow">Solicitar cotización</Link>
          </div>
        </div>

        {/* Product stage */}
        <div className="relative mt-14 lg:mt-20 panel overflow-hidden animate-rise" style={{ animationDelay: "350ms" }}>
          <div className="absolute inset-0" aria-hidden="true">
            <GradientWaves
              key={theme}
              horizonColor={light ? "#8BE0EA" : "#0E6B78"}
              waveColor="#2FB1C2"
              crestColor={light ? "#FFFFFF" : "#C6F0F5"}
              backgroundColor={light ? "#FFFFFF" : "#10131A"}
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
            <div className="absolute inset-0 bg-gradient-to-t from-paper-2/90 via-paper-2/20 to-transparent" />
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
