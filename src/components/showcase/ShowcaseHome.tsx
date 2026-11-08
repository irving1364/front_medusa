"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FiArrowRight } from "react-icons/fi"
import LightRays from "@/components/reactbits/LightRays/LightRays"
import Noise from "@/components/reactbits/Noise/Noise"
import SplitText from "@/components/reactbits/SplitText/SplitText"
import ShinyText from "@/components/reactbits/ShinyText/ShinyText"
import Magnet from "@/components/reactbits/Magnet/Magnet"
import ScrollExpand from "@/components/reactbits/ScrollExpand/ScrollExpand"
import ChromaGrid from "@/components/reactbits/ChromaGrid/ChromaGrid"
import ScrollReveal from "@/components/reactbits/ScrollReveal/ScrollReveal"
import ScrollRail from "@/components/showcase/ScrollRail"
import ScrollStack, { ScrollStackItem } from "@/components/reactbits/ScrollStack/ScrollStack"
import GradientWaves from "@/components/reactbits/GradientWaves/GradientWaves"
import Reveal from "@/components/ui/Reveal"
import { FAMILIES, HERO_PRODUCT } from "@/lib/catalog"
import { getProducts } from "@/lib/medusa"
import { forceTheme } from "@/lib/theme"
import type { Product } from "@/types"

const PROCESS = [
  { n: "01", title: "Levantamiento", text: "Visitamos el área o revisamos los planos. Medimos, fotografiamos y anotamos flujos de trabajo, puntos de agua y eléctricos." },
  { n: "02", title: "Diseño y cotización", text: "Dibujamos cada pieza con cotas, definimos calibres y acabados, y entregamos una cotización formal con plazo." },
  { n: "03", title: "Corte y plegado", text: "Corte láser y plegado CNC sobre lámina 304 o 316 en calibres 20 a 14 según la carga de la pieza." },
  { n: "04", title: "Soldadura TIG", text: "Soldadura continua con aporte del mismo material. Sin salpicaduras ni cordones visibles en superficies de contacto." },
  { n: "05", title: "Pulido y pasivado", text: "Pulido sanitario grano 180, esquinas radiadas y pasivado en piezas 316 y en contacto con fluidos." },
  { n: "06", title: "Instalación", text: "Transporte e instalación con equipo propio en Ciudad de Panamá. Nivelación, fijación y entrega con el personal del área." },
]

/** Cinematic alternative home. Dark by design: the route forces the dark theme while mounted. */
export default function ShowcaseHome() {
  const [products, setProducts] = useState<Product[]>([])

  // Dark only: force on mount and re-apply if anything else flips the theme while we are mounted.
  useEffect(() => {
    const restore = forceTheme("dark")
    const guard = () => {
      if (document.documentElement.getAttribute("data-theme") !== "dark") forceTheme("dark")
    }
    window.addEventListener("karven-theme-change", guard)
    return () => {
      window.removeEventListener("karven-theme-change", guard)
      restore()
    }
  }, [])

  useEffect(() => {
    getProducts({ limit: 6 })
      .then((res) => setProducts(res.products.filter((p) => p.thumbnail).slice(0, 3)))
      .catch((error) => console.error("Error loading products:", error))
  }, [])

  const chromaItems = [
    ...FAMILIES.map((f) => ({ image: f.image, title: f.title, subtitle: `${f.subfamilies.length} subfamilias`, accent: "#2FB1C2", url: `/equipamiento?familia=${f.handle}`, alt: f.title })),
    { image: HERO_PRODUCT.image, title: "Catálogo completo", subtitle: "Todas las referencias", accent: "#8BE0EA", url: "/equipamiento", alt: "Catálogo" },
  ]

  return (
    <div className="bg-paper text-ink">
      {/* 1 · Hero: light rays + split headline */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <LightRays
            raysOrigin="top-center"
            raysColor="#8BE0EA"
            raysSpeed={0.9}
            lightSpread={0.65}
            rayLength={2.6}
            rayDensity={1.1}
            raySharpness={0.4}
            glow={0.7}
            haze={0.3}
            atmosphere={1}
            intensity={0.95}
            pulsating
            followMouse
            mouseInfluence={0.14}
            cursorShadow={false}
            clickPulse={false}
            noiseAmount={0.04}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-paper/20 to-paper" />
          <Noise opacity={0.07} size={1} fps={18} blendMode="overlay" />
        </div>

        <div className="relative container-custom pt-32 pb-24 text-center">
          <div className="flex justify-center">
            <ShinyText text="Karven · Mobiliario médico · Panamá" color="#8BE0EA" shineColor="#FFFFFF" speed={3} className="eyebrow" />
          </div>
          <SplitText
            text="Acero. Precisión. Panamá."
            tag="h1"
            className="display-xl mt-6 text-ink"
            splitType="chars"
            effect="rise"
            trigger="load"
            delay={22}
            duration={1.1}
            ease="power4.out"
            textAlign="center"
            threshold={0}
            rootMargin="0px"
          />
          <p className="subtitle mt-6 max-w-2xl mx-auto animate-rise" style={{ animationDelay: "700ms" }}>
            Mobiliario clínico en acero inoxidable 304 y 316. Soldado, pulido e instalado por nosotros.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-rise" style={{ animationDelay: "850ms" }}>
            <Magnet padding={80} magnetStrength={3} scale={1.03}>
              <Link href="/equipamiento" className="btn btn-teal px-7 py-4 text-base">Ver equipamiento <FiArrowRight className="w-4 h-4" /></Link>
            </Magnet>
            <Magnet padding={80} magnetStrength={3} scale={1.03}>
              <Link href="/contacto" className="btn btn-outline px-7 py-4 text-base">Solicitar cotización</Link>
            </Magnet>
          </div>
          <p className="mt-16 mono text-[11px] uppercase tracking-[0.2em] text-text-3 animate-fade-in" style={{ animationDelay: "1400ms" }}>Desplácese</p>
        </div>
      </section>

      {/* 2 · Scroll-expanding product frame */}
      <section className="relative">
        <ScrollExpand
          src={HERO_PRODUCT.image}
          alt={HERO_PRODUCT.label}
          title={HERO_PRODUCT.label}
          scrollHint={HERO_PRODUCT.spec}
          startWidth={46}
          startHeight={58}
          startRadius={28}
          endRadius={0}
          mediaZoom={1.25}
          scrollDistance={1.1}
          holdDistance={0.3}
          overlayScrim={0.35}
          useWindowScroll
          className="[--se-title-size:clamp(2rem,5vw,4.5rem)]"
        />
      </section>

      {/* 3 · Families as a chroma grid */}
      <section className="section">
        <div className="container-custom">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow text-teal justify-center">Equipamiento</p>
              <h2 className="display-md mt-4 text-ink">Siete familias. Veinte subfamilias.</h2>
              <p className="subtitle">Pase el cursor: cada pieza recupera su color.</p>
            </div>
          </Reveal>
          <div className="mt-14">
            <ChromaGrid
              items={chromaItems}
              columns={4}
              minCardWidth={220}
              gap={14}
              radius={320}
              softness={0.65}
              damping={0.4}
              grayscale={1}
              dim={0.18}
              glow={0.55}
              borderGlow={1}
              reveal="spotlight"
              aspectRatio="4 / 3"
              cardRadius={20}
              showInfo
              theme="dark"
            />
          </div>
        </div>
      </section>

      {/* 4 · Statement */}
      <section className="section bg-paper-2">
        <div className="container-custom max-w-5xl">
          <p className="eyebrow text-teal">Fabricación</p>
          <ScrollReveal
            baseOpacity={0.1}
            baseRotation={1.2}
            blurStrength={5}
            stagger={0.035}
            splitBy="words"
            containerClassName="mt-6"
            textClassName="font-display display-lg text-ink text-balance"
          >
            Trabajamos el acero inoxidable como se trabaja un instrumento: sin aristas, sin juntas donde se acumule nada, y con una soldadura que no se nota al tacto.
          </ScrollReveal>
        </div>
      </section>

      {/* 5 · Scroll-driven rail of three references; the page keeps scrolling after the third */}
      <section className="relative">
        <ScrollRail products={products} />
      </section>

      {/* 6 · Process as a scroll stack */}
      <section className="section bg-paper-2">
        <div className="container-custom">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow text-teal justify-center">Proceso</p>
              <h2 className="display-md mt-4 text-ink">Seis pasos. Un taller.</h2>
              <p className="subtitle">Del levantamiento a la instalación, sin intermediarios.</p>
            </div>
          </Reveal>
        </div>
        <div className="container-custom max-w-4xl mt-10">
          <ScrollStack useWindowScroll smoothScroll={false} itemDistance={120} itemStackDistance={22} stackPosition="18%" baseScale={0.86} itemScale={0.035} dimAmount={0.25} blurAmount={1.5} holdDistance={160}>
            {PROCESS.map((s) => (
              <ScrollStackItem key={s.n} itemClassName="!bg-[#10131A] !text-ink border border-line shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] !p-8 sm:!p-12 !h-auto min-h-[18rem]">
                <span className="mono text-sm text-teal">{s.n}</span>
                <h3 className="mt-4 font-display text-3xl sm:text-4xl text-ink">{s.title}</h3>
                <p className="mt-4 body-lg text-text-2 max-w-xl">{s.text}</p>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </section>

      {/* 7 · CTA on waves */}
      <section className="section">
        <div className="container-custom">
          <Reveal>
            <div className="relative panel overflow-hidden">
              <div className="absolute inset-0" aria-hidden="true">
                <GradientWaves
                  horizonColor="#0E6B78"
                  waveColor="#2FB1C2"
                  crestColor="#C6F0F5"
                  backgroundColor="#0A0C10"
                  speed={0.3}
                  amplitude={2.4}
                  swell={34}
                  turbulence={16}
                  brightness={1.25}
                  grain={0.2}
                  quality="medium"
                  mouseInteraction
                  parallaxStrength={0.4}
                  mouseStrength={0.5}
                  swellOnClick
                />
                <div className="absolute inset-0 bg-gradient-to-b from-paper/70 via-transparent to-paper/80 pointer-events-none" />
              </div>
              <div className="relative section-head py-20 sm:py-28 px-6 pointer-events-none">
                <p className="eyebrow text-teal justify-center">Cotización</p>
                <h2 className="display-lg mt-4 text-ink text-balance">Envíe la lista. Reciba la cotización.</h2>
                <p className="subtitle">Una lista de piezas o los planos del área bastan para empezar.</p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
                  <Magnet padding={80} magnetStrength={3} scale={1.03}>
                    <Link href="/contacto" className="btn btn-teal px-7 py-4 text-base">Solicitar cotización <FiArrowRight className="w-4 h-4" /></Link>
                  </Magnet>
                  <Link href="/equipamiento" className="link-arrow">Armar lista desde el catálogo</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
