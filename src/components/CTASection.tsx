"use client"

import Image from "next/image"
import Link from "next/link"
import { FiArrowRight } from "react-icons/fi"
import Magnet from "@/components/reactbits/Magnet/Magnet"
import Reveal from "@/components/ui/Reveal"
import { CTA_IMAGE } from "@/lib/catalog"

export default function CTASection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      <Image src={CTA_IMAGE} alt="" fill sizes="100vw" className="object-cover opacity-30 -z-10" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/40" />
      <div className="container-custom py-28 lg:py-40">
        <Reveal>
          <p className="eyebrow text-teal-3">Empecemos</p>
          <h2 className="display-lg mt-6 max-w-3xl text-balance">Cuéntenos qué espacio va a equipar. Nosotros hacemos el resto.</h2>
          <p className="mt-6 max-w-xl text-lg text-text-on-ink-2">Cotización formal en 48 horas, con planos de distribución si su proyecto lo requiere.</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Magnet padding={60} magnetStrength={4}>
              <Link href="/contacto" className="btn btn-paper">
                Solicitar cotización <FiArrowRight className="w-4 h-4" />
              </Link>
            </Magnet>
            <Link href="/productos" className="btn btn-outline-paper">Ver catálogo</Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
