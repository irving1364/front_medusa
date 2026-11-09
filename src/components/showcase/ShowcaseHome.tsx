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
import { HERO_PRODUCT } from "@/lib/catalog"
import { useCategories } from "@/context/CategoriesContext"
import { getProducts } from "@/lib/medusa"
import { useTheme } from "@/lib/theme"
import type { Product } from "@/types"

const PROCESS = [
  { n: "01", title: "Levantamiento", text: "Visitamos el área o revisamos los planos. Medimos, fotografiamos y anotamos flujos de trabajo, puntos de agua y eléctricos." },
  { n: "02", title: "Diseño y cotización", text: "Dibujamos cada pieza con cotas, definimos calibres y acabados, y entregamos una cotización formal con plazo." },
  { n: "03", title: "Corte y plegado", text: "Corte láser y plegado CNC sobre lámina 304 o 316 en calibres 20 a 14 según la carga de la pieza." },
  { n: "04", title: "Soldadura TIG", text: "Soldadura continua con aporte del mismo material. Sin salpicaduras ni cordones visibles en superficies de contacto." },
  { n: "05", title: "Pulido y pasivado", text: "Pulido sanitario grano 180, esquinas radiadas y pasivado en piezas 316 y en contacto con fluidos." },
  { n: "06", title: "Instalación", text: "Transporte e instalación con equipo propio en Ciudad de Panamá. Nivelación, fijación y entrega con el personal del área." },
]

/** Cinematic home built on React Bits; every WebGL effect takes theme-aware colours. */
export default function ShowcaseHome() {
  const [products, setProducts] = useState<Product[]>([])
  const { parents, all } = useCategories()
  const theme = useTheme()
  const light = theme === "light"

  useEffect(() => {
    getProducts({ limit: 6 })
      .then((res) => setProducts(res.products.filter((p) => p.thumbnail).slice(0, 3)))
      .catch((error) => console.error("Error loading products:", error))
  }, [])

  const chromaItems = [
    ...parents.map((p) => ({ image: p.image, title: p.name, subtitle: `${p.children.length} categorías`, accent: "#2FB1C2", url: `/mobiliario?linea=${p.handle}`, alt: p.name })),
    { image: HERO_PRODUCT.image, title: "Catálogo completo", subtitle: "Todas las referencias", accent: "#8BE0EA", url: "/mobiliario", alt: "Catálogo" },
  ]

  return (
    <div className="bg-paper text-ink">
      {/* 1 · Hero: light rays + split headline */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <LightRays
            key={theme}
            lightMode={light}
            raysOrigin="top-center"
            raysColor={light ? "#0E7A88" : "#8BE0EA"}
            raysSpeed={0.9}
            lightSpread={0.65}
            rayLength={2.6}
            rayDensity={1.1}
            raySharpness={0.4}
            glow={light ? 0.5 : 0.7}
            haze={0.3}
            atmosphere={1}
            intensity={light ? 0.75 : 0.95}
            pulsating
            followMouse
            mouseInfluence={0.14}
            cursorShadow={false}
            clickPulse={false}
            noiseAmount={0.04}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-paper/20 to-paper" />
          <Noise key={`noise-${theme}`} opacity={light ? 0.05 : 0.07} size={1} fps={18} blendMode={light ? "multiply" : "overlay"} />
        </div>

        <div className="relative container-custom pt-32 pb-24 text-center">
          <div className="flex justify-center">
            <ShinyText key={`shine-${theme}`} text="KARVEN MEDICAL · PANAMÁ" color={light ? "#0E7A88" : "#8BE0EA"} shineColor={light ? "#8BE0EA" : "#FFFFFF"} speed={3} className="eyebrow" />
          </div>
          <SplitText
            text="Mobiliario médico y veterinario diseñado y fabricado en Panamá."
            tag="h1"
            className="display-lg mt-6 text-ink text-balance max-w-5xl mx-auto"
            splitType="words"
            effect="rise"
            trigger="load"
            delay={45}
            duration={1.1}
            ease="power4.out"
            textAlign="center"
            threshold={0}
            rootMargin="0px"
          />
          <p className="subtitle mt-6 max-w-2xl mx-auto animate-rise" style={{ animationDelay: "700ms" }}>
            Desarrollamos, fabricamos y respaldamos mobiliario para entornos médicos, veterinarios y técnicos. Productos propios y soluciones a medida, con fabricación local por FABMETAL.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-rise" style={{ animationDelay: "850ms" }}>
            <Magnet padding={80} magnetStrength={3} scale={1.03}>
              <Link href="/mobiliario" className="btn btn-teal px-7 py-4 text-base">Explorar mobiliario <FiArrowRight className="w-4 h-4" /></Link>
            </Magnet>
            <Magnet padding={80} magnetStrength={3} scale={1.03}>
              <Link href="/contacto" className="btn btn-outline px-7 py-4 text-base">Solicitar cotización</Link>
            </Magnet>
          </div>
          <p className="mt-16 font-display text-xl sm:text-2xl text-text-2 animate-fade-in" style={{ animationDelay: "1200ms" }}>Existimos para sostener a quienes cuidan.</p>
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
              <p className="eyebrow text-teal justify-center">Mobiliario</p>
              <h2 className="display-md mt-4 text-ink">{parents.length} líneas. {all.length - parents.length} categorías.</h2>
              <p className="subtitle">Pase el cursor: cada pieza recupera su color.</p>
            </div>
          </Reveal>
          <div className="mt-14">
            <ChromaGrid
              items={chromaItems}
              columns={4}
              minCardWidth={240}
              gap={14}
              radius={320}
              softness={0.65}
              damping={0.4}
              grayscale={1}
              dim={light ? 0.06 : 0.18}
              glow={light ? 0.35 : 0.55}
              borderGlow={1}
              reveal="spotlight"
              aspectRatio="4 / 3"
              cardRadius={20}
              showInfo
              theme={theme}
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
          <ScrollStack useWindowScroll smoothScroll={false} itemDistance={120} itemStackDistance={22} stackPosition="18%" baseScale={0.86} itemScale={0.035} dimAmount={light ? 0.1 : 0.25} blurAmount={1.5} holdDistance={160}>
            {PROCESS.map((s) => (
              <ScrollStackItem key={s.n} itemClassName="!bg-paper-2 !text-ink border border-line !shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] !p-8 sm:!p-12 !h-auto min-h-[18rem]">
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
                  key={`waves-${theme}`}
                  lightMode={light}
                  horizonColor={light ? "#8BE0EA" : "#0E6B78"}
                  waveColor="#2FB1C2"
                  crestColor={light ? "#FFFFFF" : "#C6F0F5"}
                  backgroundColor={light ? "#FFFFFF" : "#0A0C10"}
                  speed={0.3}
                  amplitude={2.4}
                  swell={34}
                  turbulence={16}
                  brightness={light ? 1 : 1.25}
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
                  <Link href="/mobiliario" className="link-arrow">Armar lista desde el catálogo</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
