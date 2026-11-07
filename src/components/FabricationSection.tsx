"use client"

import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import ScrollReveal from "@/components/reactbits/ScrollReveal/ScrollReveal"
import BorderGlow from "@/components/reactbits/BorderGlow/BorderGlow"
import Reveal from "@/components/ui/Reveal"
import FamilyIcon from "@/components/ui/FamilyIcon"
import { FAMILIES, ENVIRONMENTS } from "@/lib/catalog"

const MATERIALS = [
  ["AISI 304", "Mobiliario clínico general", true],
  ["AISI 316", "Higiene, patología, zonas húmedas", false],
  ["HPL / fenólico", "Cubiertas de consultorio y laboratorio", false],
  ["ABS / PU", "Cajones, parachoques, tapicería", false],
] as const

const PROCESS = ["Levantamiento", "Diseño y cotización", "Corte láser y plegado CNC", "Soldadura TIG continua", "Pulido grano 180 y pasivado", "Instalación con equipo propio"]

const SUBFAMILIES = FAMILIES.flatMap((f) => f.subfamilies)

function Card({ children }: { children: React.ReactNode }) {
  return (
    <BorderGlow
      className="h-full"
      backgroundColor="#10131A"
      borderRadius={20}
      glowColor="47 177 194"
      glowRadius={46}
      glowIntensity={0.9}
      coneSpread={28}
      edgeSensitivity={34}
      fillOpacity={0.14}
      colors={["#2FB1C2", "#8BE0EA", "#0E6B78"]}
    >
      {children}
    </BorderGlow>
  )
}

export default function FabricationSection() {
  return (
    <section className="section bg-paper">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <p className="eyebrow text-teal">Fabricación</p>
            <ScrollReveal
              baseOpacity={0.12}
              baseRotation={0.6}
              blurStrength={3}
              stagger={0.03}
              splitBy="words"
              containerClassName="mt-6"
              textClassName="font-display display-md text-ink text-balance"
            >
              Trabajamos el acero inoxidable como se trabaja un instrumento: sin aristas, sin juntas donde se acumule nada, y con una soldadura que no se nota al tacto.
            </ScrollReveal>
          </div>
          <div className="lg:col-span-4 lg:pt-12">
            <Reveal delay={0.2}>
              <p className="text-sm leading-relaxed text-text-2">
                Diseñamos cada pieza con el personal que la va a usar, la fabricamos en nuestro taller de Ciudad de Panamá y la instalamos nosotros.
              </p>
              <Link href="/fabricacion" className="btn btn-outline mt-6">Cómo fabricamos <FiArrowUpRight className="w-4 h-4" /></Link>
            </Reveal>
          </div>
        </div>

        {/* Bento */}
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Reveal delay={0}>
            <Card>
              <div className="p-6 h-full flex flex-col">
                <div className="flex flex-wrap gap-2">
                  {FAMILIES.map((f) => (
                    <Link key={f.handle} href={`/equipamiento?familia=${f.handle}`} className="w-11 h-11 rounded-xl border border-line-2 bg-white/[0.03] flex items-center justify-center text-text-2 hover:text-teal hover:border-teal/50 transition-colors" aria-label={f.title}>
                      <FamilyIcon name={f.icon} className="w-5 h-5" />
                    </Link>
                  ))}
                </div>
                <h3 className="mt-auto pt-8 font-display text-lg text-ink">{FAMILIES.length} familias de producto</h3>
                <p className="mt-1.5 text-sm text-text-2">De la camilla de examen al lavamanos quirúrgico. Todo en 304 o 316.</p>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.06}>
            <Card>
              <div className="p-6 h-full flex flex-col">
                <div className="[mask-image:linear-gradient(180deg,#000_55%,transparent)]">
                  <div className="flex flex-wrap gap-2 max-h-[96px] overflow-hidden">
                    {SUBFAMILIES.map((s) => (
                      <Link key={s.handle} href={`/equipamiento?coleccion=${s.handle}`} className="chip !text-[11px] !py-1 !px-2 hover:text-ink hover:border-line-3">{s.title}</Link>
                    ))}
                  </div>
                </div>
                <h3 className="mt-auto pt-8 font-display text-lg text-ink">{SUBFAMILIES.length} subfamilias</h3>
                <p className="mt-1.5 text-sm text-text-2">Cada una es una colección del catálogo, con ficha técnica por referencia.</p>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.12}>
            <Card>
              <div className="p-6 h-full flex flex-col">
                <div className="relative h-[88px] px-8">
                  <div className="absolute inset-x-8 top-1/2 h-px bg-line-2" />
                  <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex items-center justify-between">
                    {ENVIRONMENTS.map((e, i) => (
                      <Link key={e.handle} href={`/entornos#${e.handle}`} className={`group relative flex flex-col items-center ${i % 2 ? "translate-y-4" : "-translate-y-4"}`}>
                        <span className="w-3 h-3 rounded-full border border-teal/60 bg-teal/20 group-hover:bg-teal transition-colors" />
                        <span className={`absolute whitespace-nowrap text-[10px] text-text-3 group-hover:text-ink transition-colors ${i % 2 ? "top-5" : "bottom-5"}`}>{e.title.replace("Central de ", "")}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <h3 className="mt-auto pt-8 font-display text-lg text-ink">{ENVIRONMENTS.length} entornos equipados</h3>
                <p className="mt-1.5 text-sm text-text-2">Quirófano, hospitalización, consultorio, laboratorio, patología y esterilización.</p>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.18}>
            <Card>
              <div className="p-6 h-full flex flex-col">
                <ul className="rounded-xl border border-line bg-paper/60 p-1.5 space-y-0.5">
                  {MATERIALS.map(([code, use, active]) => (
                    <li key={code} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs ${active ? "bg-white/[0.06] text-ink" : "text-text-3"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-teal" : "bg-white/20"}`} />
                      <span className="mono w-24 shrink-0">{code}</span>
                      <span className="truncate">{use}</span>
                    </li>
                  ))}
                </ul>
                <h3 className="mt-auto pt-8 font-display text-lg text-ink">El acero según la pieza</h3>
                <p className="mt-1.5 text-sm text-text-2">304 para uso clínico general, 316 donde hay cloruros o fluidos. Calibres 20 a 14.</p>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.24}>
            <Card>
              <div className="p-6 h-full flex flex-col">
                <div className="rounded-xl border border-line bg-paper/60 overflow-hidden">
                  <div className="flex items-center gap-2 px-3 h-8 border-b border-line">
                    <span className="w-2 h-2 rounded-full bg-white/15" /><span className="w-2 h-2 rounded-full bg-white/15" /><span className="w-2 h-2 rounded-full bg-white/15" />
                    <span className="ml-2 mono text-[10px] text-text-3">proceso.txt</span>
                  </div>
                  <ol className="p-3 font-mono text-[11px] leading-5 text-text-2">
                    {PROCESS.map((p, i) => (
                      <li key={p} className="flex gap-3"><span className="text-text-3 w-4 text-right">{i + 1}</span><span className={i === 3 ? "text-teal" : ""}>{p}</span></li>
                    ))}
                  </ol>
                </div>
                <h3 className="mt-auto pt-8 font-display text-lg text-ink">Seis pasos, un solo taller</h3>
                <p className="mt-1.5 text-sm text-text-2">Del levantamiento a la instalación, sin intermediarios.</p>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.3}>
            <Card>
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-end gap-2">
                  <span className="font-display text-6xl leading-none text-ink tnum">5</span>
                  <span className="pb-1 text-sm text-text-2">años de garantía<br />en estructura</span>
                </div>
                <svg viewBox="0 0 200 48" className="mt-4 w-full h-10 text-teal" aria-hidden="true">
                  <polyline fill="none" stroke="currentColor" strokeWidth="1.5" points="0,40 30,38 60,34 90,30 120,22 150,14 180,8 200,4" />
                  <polyline fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 3" points="0,46 200,46" />
                </svg>
                <h3 className="mt-auto pt-6 font-display text-lg text-ink">Hecho para desinfección diaria</h3>
                <p className="mt-1.5 text-sm text-text-2">Con repuestos que fabricamos aquí, no que se importan.</p>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
