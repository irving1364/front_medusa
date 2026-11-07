"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { FiArrowRight, FiArrowDown } from "react-icons/fi"
import SplitText from "@/components/reactbits/SplitText/SplitText"
import CountUp from "@/components/reactbits/CountUp/CountUp"
import GlareHover from "@/components/reactbits/GlareHover/GlareHover"
import Magnet from "@/components/reactbits/Magnet/Magnet"
import { HERO_IMAGE } from "@/lib/catalog"

// WebGL background: client-only, loaded after the critical content.
const Threads = dynamic(() => import("@/components/reactbits/Threads/Threads"), { ssr: false })

const STATS = [
  { value: 350, suffix: "+", label: "Proyectos equipados" },
  { value: 12, suffix: "", label: "Años en el sector salud" },
  { value: 48, suffix: "h", label: "Respuesta a cotizaciones" },
]

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper grain">
      {/* Background */}
      <div className="absolute inset-0 -z-10 opacity-70">
        <Threads
          color="#148A9A"
          accentColor="#35A7B6"
          amplitude={1.3}
          distance={0.3}
          lineCount={70}
          thickness={0.5}
          speed={0.35}
          angle={18}
          brightness={1.1}
          enableMouseInteraction
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(31,35,41,0.1),rgba(31,35,41,0.85)_60%)]" />

      <div className="container-custom pt-36 pb-16 lg:pt-44 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-teal-3 animate-fade-in">Mobiliario médico · Panamá</p>
            <SplitText
              text="Mobiliario clínico diseñado para quienes cuidan."
              tag="h1"
              className="display-xl mt-6 text-paper text-balance"
              splitType="words"
              effect="rise"
              trigger="load"
              delay={70}
              duration={1.3}
              ease="power4.out"
              textAlign="left"
              threshold={0}
              rootMargin="0px"
            />
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-text-on-ink-2 animate-rise" style={{ animationDelay: "500ms" }}>
              Camillas, mesas quirúrgicas, unidades odontológicas y mobiliario de consultorio y laboratorio.
              Suministro, instalación y garantía para hospitales, clínicas y prácticas privadas.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 animate-rise" style={{ animationDelay: "650ms" }}>
              <Magnet padding={60} magnetStrength={4}>
                <Link href="/productos" className="btn btn-paper">
                  Explorar catálogo <FiArrowRight className="w-4 h-4" />
                </Link>
              </Magnet>
              <Link href="/contacto" className="btn btn-outline-paper">
                Solicitar cotización
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 animate-rise" style={{ animationDelay: "400ms" }}>
            <GlareHover
              width="100%"
              height="auto"
              borderRadius="1.5rem"
              background="transparent"
              glareColor="#ffffff"
              glareOpacity={0.25}
              glareSize={220}
              variant="sheen"
              transitionDuration={1100}
              className="w-full"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src={HERO_IMAGE}
                  alt="Quirófano equipado con mesa quirúrgica y lámparas cialíticas"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-paper/70">Serie Quirúrgica</p>
                    <p className="font-display text-2xl text-paper mt-1">Mesa electrohidráulica K-700</p>
                  </div>
                  <span className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full border border-paper/40 text-paper">
                    <FiArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </GlareHover>
          </div>
        </div>

        <div className="mt-16 lg:mt-24 grid grid-cols-3 gap-6 border-t border-line-ink pt-8 animate-rise" style={{ animationDelay: "800ms" }}>
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl sm:text-5xl text-paper">
                <CountUp to={s.value} duration={1.8} separator="." trigger="load" delay={0.6} />
                {s.suffix}
              </div>
              <p className="mt-2 text-xs sm:text-sm text-text-on-ink-3">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <a href="#categorias" className="absolute bottom-6 right-6 hidden lg:flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-text-on-ink-3 hover:text-paper transition-colors" aria-label="Bajar a categorías">
        Scroll <FiArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </a>
    </section>
  )
}
