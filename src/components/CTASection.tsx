"use client"

import Link from "next/link"
import DotField from "@/components/reactbits/DotField/DotField"
import Reveal from "@/components/ui/Reveal"
import { useTheme } from "@/lib/theme"

export default function CTASection() {
  const theme = useTheme()
  return (
    <section className="section bg-paper">
      <div className="container-custom">
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
              <div className="absolute inset-0 bg-gradient-to-b from-paper-2/80 via-paper-2/40 to-paper-2/80 pointer-events-none" />
            </div>
            <div className="relative section-head py-16 sm:py-20 lg:py-24 px-6 pointer-events-none">
              <p className="eyebrow text-teal justify-center">Cotización</p>
              <h2 className="display-md mt-4 text-ink text-balance">Envíe la lista. Reciba la cotización.</h2>
              <p className="subtitle">Una lista de piezas o los planos del área bastan para empezar.</p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pointer-events-auto">
                <Link href="/contacto" className="btn btn-teal">Solicitar cotización</Link>
                <Link href="/equipamiento" className="link-arrow">Armar lista desde el catálogo</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
