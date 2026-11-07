"use client"

import Image from "next/image"
import Link from "next/link"
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi"
import SplitText from "@/components/reactbits/SplitText/SplitText"
import TiltedCard from "@/components/reactbits/TiltedCard/TiltedCard"
import { HERO_PRODUCT } from "@/lib/catalog"

const FACTS = [
  ["Material", "Inox AISI 304 / 316"],
  ["Proceso", "Soldadura TIG, pulido sanitario"],
  ["Alcance", "Diseño, fabricación, instalación"],
  ["Origen", "Ciudad de Panamá"],
]

export default function Hero() {
  return (
    <section className="bg-paper pt-28 lg:pt-36">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          <div className="lg:col-span-7">
            <p className="eyebrow text-teal animate-fade-in">Karven · Mobiliario médico</p>
            <SplitText
              text="Mobiliario clínico en acero inoxidable, fabricado en Panamá."
              tag="h1"
              className="display-lg mt-6 text-ink text-balance"
              splitType="words"
              effect="rise"
              trigger="load"
              delay={45}
              duration={1.1}
              ease="power4.out"
              textAlign="left"
              threshold={0}
              rootMargin="0px"
            />
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-text-2 animate-rise" style={{ animationDelay: "450ms" }}>
              Camillas, mesas, carros, lavamanos quirúrgicos y superficies sanitarias para hospitales, clínicas,
              consultorios y laboratorios. Cada pieza sale soldada, pulida y lista para desinfección diaria.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 animate-rise" style={{ animationDelay: "600ms" }}>
              <Link href="/equipamiento" className="btn btn-ink">Ver equipamiento <FiArrowRight className="w-4 h-4" /></Link>
              <Link href="/contacto" className="btn btn-outline">Solicitar cotización</Link>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-10 animate-rise" style={{ animationDelay: "350ms" }}>
            <div className="aspect-[4/5] w-full">
            <TiltedCard
              altText={HERO_PRODUCT.label}
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={6}
              scaleOnHover={1.02}
              glare={0.18}
              shadow={0.35}
              radius={24}
              showTooltip={false}
              flipOnClick={false}
              displayOverlayContent
              overlayContent={
                <Link href={`/equipamiento/${HERO_PRODUCT.handle}`} className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between text-paper">
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.22em] text-paper/70">Referencia</span>
                    <span className="block font-display text-2xl mt-1">{HERO_PRODUCT.label}</span>
                    <span className="block text-xs text-paper/80 mt-1 tnum">{HERO_PRODUCT.spec}</span>
                  </span>
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-paper text-ink"><FiArrowUpRight className="w-4 h-4" /></span>
                </Link>
              }
              className="w-full"
            >
              <div className="plate absolute inset-0">
                <Image src={HERO_PRODUCT.image} alt={HERO_PRODUCT.label} fill priority sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
              </div>
            </TiltedCard>
            </div>
          </div>
        </div>

        <dl className="rule-strong mt-14 lg:mt-20 pt-5 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5 animate-rise" style={{ animationDelay: "750ms" }}>
          {FACTS.map(([k, v]) => (
            <div key={k}>
              <dt className="text-[11px] uppercase tracking-[0.2em] text-text-3">{k}</dt>
              <dd className="mt-1.5 text-sm text-ink tnum">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
