"use client"

import Link from "next/link"
import { FiArrowRight } from "react-icons/fi"
import DotField from "@/components/reactbits/DotField/DotField"
import Reveal from "@/components/ui/Reveal"
import { useTheme } from "@/lib/theme"

export default function CTASection() {
  const theme = useTheme()
  return (
    <section className="bg-paper">
      <div className="container-custom pb-20 lg:pb-28">
        <Reveal>
          <div className="relative panel overflow-hidden">
            <div className="absolute inset-0">
              <DotField
                key={theme}
                lightMode={theme === "light"}
                dotRadius={1.2}
                dotSpacing={16}
                gradientFrom="#2FB1C2"
                gradientTo="#0E6B78"
                gradientAngle={120}
                cursorRadius={220}
                bulgeStrength={0.4}
                glowColor="#8BE0EA"
                glowRadius={160}
                glowIntensity={0.5}
                baseOpacity={0.32}
                waveAmplitude={0.08}
                speed={0.6}
                holdToZoom={false}
                sparkle={false}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/70 to-transparent pointer-events-none" />
            </div>
            <div className="relative grid lg:grid-cols-12 gap-8 items-end p-8 sm:p-12 lg:p-16 pointer-events-none">
              <div className="lg:col-span-8">
                <p className="eyebrow text-teal">Cotización</p>
                <h2 className="display-md mt-4 text-ink text-balance max-w-2xl">Envíenos la lista de piezas o los planos del área. Respondemos con una cotización formal.</h2>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end pointer-events-auto">
                <Link href="/contacto" className="btn btn-teal">Solicitar cotización <FiArrowRight className="w-4 h-4" /></Link>
                <Link href="/equipamiento" className="btn btn-outline">Armar lista desde el catálogo</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
