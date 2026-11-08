"use client"

import Link from "next/link"
import BorderGlow from "@/components/reactbits/BorderGlow/BorderGlow"
import Reveal from "@/components/ui/Reveal"
import FamilyIcon from "@/components/ui/FamilyIcon"
import { FAMILIES, ENVIRONMENTS } from "@/lib/catalog"
import { useTheme } from "@/lib/theme"

const MATERIALS = [
  ["AISI 304", "Mobiliario clínico general", true],
  ["AISI 316", "Higiene, patología, zonas húmedas", false],
  ["HPL / fenólico", "Cubiertas de consultorio y laboratorio", false],
  ["ABS / PU", "Cajones, parachoques, tapicería", false],
] as const

const PROCESS = ["Levantamiento", "Diseño y cotización", "Corte láser y plegado CNC", "Soldadura TIG continua", "Pulido grano 180 y pasivado", "Instalación con equipo propio"]

const SUBFAMILIES = FAMILIES.flatMap((f) => f.subfamilies)

function Card({ children }: { children: React.ReactNode }) {
  const theme = useTheme()
  return (
    <div className="h-full rounded-[20px] shadow-card">
      <BorderGlow
        className="h-full"
        backgroundColor={theme === "light" ? "#FFFFFF" : "#10131A"}
        borderRadius={20}
        glowColor="47 177 194"
        glowRadius={46}
        glowIntensity={theme === "light" ? 0.6 : 0.9}
        coneSpread={28}
        edgeSensitivity={34}
        fillOpacity={theme === "light" ? 0.08 : 0.14}
        colors={["#2FB1C2", "#8BE0EA", "#0E6B78"]}
      >
        {children}
      </BorderGlow>
    </div>
  )
}

/** "Feature cards" section in the Apple sense: one short claim per card, the visual does the explaining. */
export default function FabricationSection() {
  return (
    <section className="section bg-paper">
      <div className="container-custom">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow text-teal justify-center">Fabricación</p>
            <h2 className="display-md mt-4 text-ink text-balance">Soldado como un instrumento.</h2>
            <p className="subtitle">Sin aristas, sin juntas, sin cordones visibles. Acero 304 y 316 pulido para desinfección diaria.</p>
            <Link href="/fabricacion" className="link-arrow">Cómo fabricamos</Link>
          </div>
        </Reveal>

        {/* Bento */}
        <div className="mt-14 lg:mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Reveal delay={0}>
            <Card>
              <div className="p-7 h-full flex flex-col">
                <div className="flex flex-wrap gap-2">
                  {FAMILIES.map((f) => (
                    <Link key={f.handle} href={`/equipamiento?familia=${f.handle}`} className="w-11 h-11 rounded-xl border border-line-2 bg-tint/[0.03] flex items-center justify-center text-text-2 hover:text-teal hover:border-teal/50 transition-colors" aria-label={f.title}>
                      <FamilyIcon name={f.icon} className="w-5 h-5" />
                    </Link>
                  ))}
                </div>
                <h3 className="mt-auto pt-8 font-display text-xl text-ink">Siete familias.</h3>
                <p className="mt-1.5 body-lg text-text-2">De la camilla de examen al lavamanos quirúrgico.</p>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.06}>
            <Card>
              <div className="p-7 h-full flex flex-col">
                <div className="[mask-image:linear-gradient(180deg,#000_55%,transparent)]">
                  <div className="flex flex-wrap gap-2 max-h-[96px] overflow-hidden">
                    {SUBFAMILIES.map((s) => (
                      <Link key={s.handle} href={`/equipamiento?coleccion=${s.handle}`} className="chip !text-[11px] !py-1 !px-2 hover:text-ink hover:border-line-3">{s.title}</Link>
                    ))}
                  </div>
                </div>
                <h3 className="mt-auto pt-8 font-display text-xl text-ink">Veinte subfamilias.</h3>
                <p className="mt-1.5 body-lg text-text-2">Cada una con ficha técnica por referencia.</p>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.12}>
            <Card>
              <div className="p-7 h-full flex flex-col">
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
                <h3 className="mt-auto pt-8 font-display text-xl text-ink">Seis entornos.</h3>
                <p className="mt-1.5 body-lg text-text-2">Del quirófano a la central de esterilización.</p>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.18}>
            <Card>
              <div className="p-7 h-full flex flex-col">
                <ul className="rounded-xl border border-line bg-paper/60 p-1.5 space-y-0.5">
                  {MATERIALS.map(([code, use, active]) => (
                    <li key={code} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs ${active ? "bg-tint/[0.06] text-ink" : "text-text-3"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-teal" : "bg-tint/20"}`} />
                      <span className="mono w-24 shrink-0">{code}</span>
                      <span className="truncate">{use}</span>
                    </li>
                  ))}
                </ul>
                <h3 className="mt-auto pt-8 font-display text-xl text-ink">El acero correcto.</h3>
                <p className="mt-1.5 body-lg text-text-2">304 para uso clínico, 316 donde hay fluidos.</p>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.24}>
            <Card>
              <div className="p-7 h-full flex flex-col">
                <div className="rounded-xl border border-line bg-paper/60 overflow-hidden">
                  <div className="flex items-center gap-2 px-3 h-8 border-b border-line">
                    <span className="w-2 h-2 rounded-full bg-tint/15" /><span className="w-2 h-2 rounded-full bg-tint/15" /><span className="w-2 h-2 rounded-full bg-tint/15" />
                    <span className="ml-2 mono text-[10px] text-text-3">proceso.txt</span>
                  </div>
                  <ol className="p-3 font-mono text-[11px] leading-5 text-text-2">
                    {PROCESS.map((p, i) => (
                      <li key={p} className="flex gap-3"><span className="text-text-3 w-4 text-right">{i + 1}</span><span className={i === 3 ? "text-teal" : ""}>{p}</span></li>
                    ))}
                  </ol>
                </div>
                <h3 className="mt-auto pt-8 font-display text-xl text-ink">Seis pasos. Un taller.</h3>
                <p className="mt-1.5 body-lg text-text-2">Del levantamiento a la instalación, sin intermediarios.</p>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.3}>
            <Card>
              <div className="p-7 h-full flex flex-col">
                <div className="flex items-end gap-2">
                  <span className="font-display text-6xl leading-none text-ink tnum">5</span>
                  <span className="pb-1 text-sm text-text-2">años de garantía<br />en estructura</span>
                </div>
                <svg viewBox="0 0 200 48" className="mt-4 w-full h-10 text-teal" aria-hidden="true">
                  <polyline fill="none" stroke="currentColor" strokeWidth="1.5" points="0,40 30,38 60,34 90,30 120,22 150,14 180,8 200,4" />
                  <polyline fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 3" points="0,46 200,46" />
                </svg>
                <h3 className="mt-auto pt-6 font-display text-xl text-ink">Hecho para durar.</h3>
                <p className="mt-1.5 body-lg text-text-2">Repuestos fabricados aquí, no importados.</p>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
