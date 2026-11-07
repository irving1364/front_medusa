"use client"

import Image from "next/image"
import Link from "next/link"
import { FiArrowRight, FiArrowUpRight, FiCheck } from "react-icons/fi"
import SplitText from "@/components/reactbits/SplitText/SplitText"
import GradientWaves from "@/components/reactbits/GradientWaves/GradientWaves"
import { FAMILIES, HERO_PRODUCT } from "@/lib/catalog"

const SPECS: [string, string][] = [
  ["material", "AISI 304"],
  ["motores", "3 · 24 V"],
  ["carga", "250 kg"],
  ["ruedas", "Ø150 · freno central"],
]

const QUOTE_LINES = [
  ["2 ×", "Cama clínica eléctrica KC-300"],
  ["4 ×", "Carro de hospitalización CH-120"],
  ["1 ×", "Lavamanos quirúrgico LQ-2"],
]

const SUBFAMILY_COUNT = FAMILIES.reduce((n, f) => n + f.subfamilies.length, 0)

export default function Hero() {
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

        {/* Stage */}
        <div className="relative mt-12 lg:mt-16 panel overflow-hidden animate-rise" style={{ animationDelay: "350ms" }}>
          <div className="absolute inset-0">
            <GradientWaves
              horizonColor="#0E6B78"
              waveColor="#2FB1C2"
              crestColor="#C6F0F5"
              backgroundColor="#0A0C10"
              speed={0.22}
              amplitude={1.9}
              swell={28}
              turbulence={12}
              height={5.2}
              fogDepth={18}
              brightness={1.15}
              grain={0.18}
              quality="medium"
              mouseInteraction
              parallaxStrength={0.35}
              mouseStrength={0.35}
              swellOnClick={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paper/90 via-paper/20 to-transparent" />
          </div>

          <div className="relative grid lg:grid-cols-12 gap-4 lg:gap-5 p-4 sm:p-6 lg:p-8 min-h-[520px] lg:min-h-[600px]">
            {/* Product plate */}
            <Link href={`/equipamiento/${HERO_PRODUCT.handle}`} className="group lg:col-span-7 glass rounded-2xl overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-4 h-10 border-b border-white/[0.06]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/15" /><span className="w-2 h-2 rounded-full bg-white/15" /><span className="w-2 h-2 rounded-full bg-white/15" />
                </span>
                <span className="mono text-[11px] text-text-2">{HERO_PRODUCT.label}</span>
                <FiArrowUpRight className="w-4 h-4 text-text-3 group-hover:text-ink transition-colors" />
              </div>
              <div className="plate relative flex-1 min-h-[280px]">
                <Image src={HERO_PRODUCT.image} alt={HERO_PRODUCT.label} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
              </div>
              <dl className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.06] border-t border-white/[0.06]">
                {SPECS.map(([k, v]) => (
                  <div key={k} className="px-4 py-3">
                    <dt className="mono text-[10px] uppercase tracking-[0.14em] text-text-3">{k}</dt>
                    <dd className="mt-1 text-sm text-ink tnum">{v}</dd>
                  </div>
                ))}
              </dl>
            </Link>

            {/* Right column: quote list + families */}
            <div className="lg:col-span-5 flex flex-col gap-4 lg:gap-5">
              <div className="glass rounded-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="mono text-[11px] text-text-2">Cotización</span>
                  <span className="mono text-[10px] text-text-3">#1042</span>
                </div>
                <ul className="mt-4 space-y-2.5 font-mono text-[12px]">
                  {QUOTE_LINES.map(([q, t]) => (
                    <li key={t} className="flex items-center gap-3 text-text-2">
                      <FiCheck className="w-3.5 h-3.5 text-teal shrink-0" /><span className="text-text-3 w-7">{q}</span><span className="truncate">{t}</span>
                    </li>
                  ))}
                  <li className="flex items-center gap-3 text-ink pt-1"><span className="w-3.5" /><span className="text-text-3 w-7">→</span>Enviada a fabricación<span className="w-1.5 h-3.5 bg-teal animate-blink" /></li>
                </ul>
              </div>

              <div className="glass rounded-2xl p-2 flex-1">
                <p className="px-3 pt-2 pb-1 mono text-[11px] text-text-2">Familias</p>
                <ul>
                  {FAMILIES.slice(0, 5).map((f, i) => (
                    <li key={f.handle}>
                      <Link href={`/equipamiento?familia=${f.handle}`} className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${i === 0 ? "bg-white/[0.06] text-ink" : "text-text-2 hover:text-ink hover:bg-white/[0.04]"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-teal" : "bg-white/20"}`} />
                        <span className="flex-1">{f.title}</span>
                        <span className="mono text-[10px] text-text-3">{f.subfamilies.length} sub.</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/equipamiento" className="flex items-center gap-2 px-3 py-2 text-xs text-text-3 hover:text-ink">Ver las {FAMILIES.length} familias <FiArrowUpRight className="w-3 h-3" /></Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
