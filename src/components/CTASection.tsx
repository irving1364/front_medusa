"use client"

import Link from "next/link"
import { FiArrowRight } from "react-icons/fi"
import Reveal from "@/components/ui/Reveal"

export default function CTASection() {
  return (
    <section className="bg-paper">
      <div className="container-custom py-20 lg:py-28">
        <Reveal>
          <div className="rule-strong pt-6 grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow text-teal">Cotización</p>
              <h2 className="display-md mt-4 text-ink text-balance">Envíenos la lista de piezas o los planos del área. Respondemos con una cotización formal.</h2>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
              <Link href="/contacto" className="btn btn-ink">Solicitar cotización <FiArrowRight className="w-4 h-4" /></Link>
              <Link href="/equipamiento" className="btn btn-outline">Armar lista desde el catálogo</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
