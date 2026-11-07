import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import Reveal from "@/components/ui/Reveal"
import { ENVIRONMENTS, getSubfamily } from "@/lib/catalog"

export const metadata: Metadata = {
  title: "Entornos",
  description: "Qué mobiliario lleva cada área clínica: quirófano, hospitalización, consultorio, laboratorio, patología y central de esterilización.",
}

export default function EnvironmentsPage() {
  return (
    <div className="bg-paper pt-28 lg:pt-32 pb-20">
      <div className="container-custom">
        <div className="rule-strong pt-5 grid lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow text-teal">Entornos</p>
            <h1 className="display-lg mt-4 text-ink text-balance">Lo que lleva cada sala.</h1>
          </div>
          <p className="lg:col-span-4 text-base leading-relaxed text-text-2">
            Una guía por área para armar la lista completa. Cada entorno enlaza a las subfamilias que lo equipan; si falta algo, lo fabricamos a medida.
          </p>
        </div>

        <ol className="mt-6">
          {ENVIRONMENTS.map((e, i) => {
            const subs = e.subfamilies.map(getSubfamily).filter(Boolean)
            return (
              <li key={e.handle} id={e.handle} className="scroll-mt-28 border-t border-line py-12 lg:py-16">
                <Reveal distance={24}>
                  <div className={`grid lg:grid-cols-12 gap-8 lg:gap-14 items-start ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                    <div className="lg:col-span-6">
                      <div className="plate aspect-[4/3] rounded-3xl border border-line">
                        <Image src={e.image} alt={e.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                        <span className="absolute top-4 left-4 px-2.5 py-1 rounded bg-paper/90 text-[11px] font-semibold tracking-[0.15em] text-ink tnum">0{i + 1}</span>
                      </div>
                    </div>
                    <div className="lg:col-span-6">
                      <h2 className="display-md text-ink">{e.title}</h2>
                      <p className="mt-4 text-text-2 leading-relaxed max-w-xl">{e.description}</p>
                      <ul className="mt-8 border-t border-line">
                        {subs.map((s) => s && (
                          <li key={s.handle}>
                            <Link href={`/equipamiento?coleccion=${s.handle}`} className="group flex items-center justify-between gap-4 py-3 border-b border-line text-sm">
                              <span>
                                <span className="text-ink font-medium">{s.title}</span>
                                <span className="block text-xs text-text-3 mt-0.5">{s.family.title} · {s.description}</span>
                              </span>
                              <FiArrowUpRight className="w-4 h-4 text-text-3 group-hover:text-ink transition-colors shrink-0" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link href="/contacto" className="btn btn-outline mt-8 text-sm">Cotizar este entorno</Link>
                    </div>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
