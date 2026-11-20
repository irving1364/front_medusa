"use client"

import Link from "next/link"
import Image from "next/image"
import { FiArrowRight } from "react-icons/fi"
import Reveal from "@/components/ui/Reveal"
import InstagramFeed from "@/components/InstagramFeed"
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/instagram-meta"
import type { InstagramPost } from "@/lib/instagram"
import type { ProjectCardData } from "@/components/ProjectCard"
import { useCategories } from "@/context/CategoriesContext"
import type { CategoryNode } from "@/lib/categories"
import type { Product } from "@/types"

interface ShowcaseHomeProps {
  /** Product lines fetched on the server (so the HTML carries real links); falls back to the client context */
  lines?: CategoryNode[]
  /** Featured products ("Destacados" collection) fetched on the server */
  products?: Product[]
  /** Latest Instagram posts fetched on the server (empty -> section hidden) */
  instagram?: InstagramPost[]
  /** Latest published projects from the Medusa admin */
  projects?: ProjectCardData[]
}

/** One-line summary per line, as in the client's home mockup (falls back to the category description). */
const LINE_SUMMARY: Record<string, string> = {
  "mobiliario-medico": "Camillas, instrumental, carros y auxiliares",
  "mobiliario-veterinario": "Mesas, jaulas y mobiliario para atención",
  "mobiliario-tecnico": "Mesones, estaciones y almacenamiento",
}

const PROCESS = [
  { title: "Escuchar", text: "Comprendemos la necesidad y el entorno de uso." },
  { title: "Definir", text: "Establecemos función, medidas y materiales." },
  { title: "Diseñar", text: "Resolvemos estructura, uso, limpieza y mantenimiento." },
  { title: "Planificar", text: "Organizamos materiales, tiempos y controles." },
  { title: "Fabricar", text: "Producimos conforme a lo aprobado." },
  { title: "Verificar", text: "Comprobamos dimensiones, función y acabados." },
  { title: "Respaldar", text: "Atendemos garantía y observaciones aplicables." },
  { title: "Mejorar", text: "Documentamos aprendizajes y corregimos procesos." },
]

const kicker = "font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-teal"
const arrowLink = "inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:gap-2.5 transition-[gap] duration-300"

/** Stand-in for the fabrication photo: a blueprint-style line drawing (a table with dimension lines and a compass arc) on the dark teal panel of the mockup. */
function FabricationSketch() {
  const stroke = "#9CCFD8"
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#15485A_0%,#0F3442_50%,#0A1E28_100%)] shadow-[0_30px_70px_-40px_rgba(10,30,40,0.8)]" aria-hidden="true">
      <svg viewBox="0 0 640 400" className="absolute inset-0 h-full w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <pattern id="fab-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" stroke="#FFFFFF" strokeOpacity="0.05" strokeWidth="1" /></pattern>
        </defs>
        <rect width="640" height="400" fill="url(#fab-grid)" />
        {/* Floor line */}
        <path d="M70 318H570" stroke={stroke} strokeOpacity="0.55" strokeWidth="2" />
        {/* Table: top, legs, lower shelf, wheels */}
        <g stroke={stroke} strokeWidth="5">
          <path d="M150 150H430L452 166H128Z" />
          <path d="M150 166V292M430 166V292" />
          <path d="M150 248H430" />
        </g>
        <g stroke={stroke} strokeWidth="4"><circle cx="150" cy="303" r="10" /><circle cx="430" cy="303" r="10" /></g>
        {/* Dimension lines */}
        <g stroke={stroke} strokeOpacity="0.6" strokeWidth="1.5">
          <path d="M128 122H452M128 114V130M452 114V130" />
          <path d="M488 150V318M480 150H496M480 318H496" />
        </g>
        <g fill={stroke} fillOpacity="0.75" fontFamily="ui-monospace, monospace" fontSize="13" letterSpacing="2">
          <text x="290" y="108" textAnchor="middle">1500 MM</text>
          <text x="476" y="238" textAnchor="end">900</text>
        </g>
        {/* Compass: hinge, legs and arc */}
        <g stroke={stroke} strokeWidth="3.5">
          <path d="M548 70L512 196M548 70L590 190" />
          <circle cx="548" cy="64" r="7" />
        </g>
        <path d="M498 214A64 64 0 0 0 604 208" stroke={stroke} strokeOpacity="0.55" strokeWidth="2" strokeDasharray="5 7" />
        {/* Measuring circle on the worktop */}
        <circle cx="290" cy="208" r="34" stroke={stroke} strokeOpacity="0.45" strokeWidth="2" />
        <path d="M290 166V250M248 208H332" stroke={stroke} strokeOpacity="0.3" strokeWidth="1.2" />
      </svg>
    </div>
  )
}

/** Numbered section opener: kicker, title, subtitle and an optional link aligned right. */
function SectionHead({ n, kickerText, title, subtitle, link }: { n: string; kickerText: string; title: string; subtitle: string; link?: { href: string; label: string; external?: boolean } }) {
  return (
    <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" stagger={0.1}>
      <div>
        <p className={kicker}>{n} · {kickerText}</p>
        <h2 className="display-md mt-3 text-ink text-balance">{title}</h2>
        <p className="mt-3 text-base sm:text-lg text-text-2">{subtitle}</p>
      </div>
      {link && (link.external
        ? <a href={link.href} target="_blank" rel="noreferrer" className={`${arrowLink} shrink-0`}>{link.label} <FiArrowRight className="w-3.5 h-3.5" /></a>
        : <Link href={link.href} className={`${arrowLink} shrink-0`}>{link.label} <FiArrowRight className="w-3.5 h-3.5" /></Link>)}
    </Reveal>
  )
}

/** Home following the client's mockup: calm hero, lines, own models, custom fabrication, process, projects, Instagram and contact. */
export default function ShowcaseHome({ lines, products = [], instagram = [], projects = [] }: ShowcaseHomeProps) {
  const ctx = useCategories()
  const parents = lines && lines.length ? lines : ctx.parents

  return (
    <div className="bg-paper text-ink">
      {/* Hero */}
      <section className="pt-24 sm:pt-28">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-[28px] border border-line px-6 py-16 sm:py-20 text-center bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-paper-2)_96%,transparent),color-mix(in_srgb,var(--color-teal)_7%,var(--color-paper-2)))] shadow-[0_30px_80px_-50px_rgba(15,19,24,0.35)]">
            <p className={`${kicker} animate-rise`}>KARVEN Medical · Panamá</p>
            <h1 className="display-lg mt-6 text-ink text-balance max-w-4xl mx-auto animate-rise" style={{ animationDelay: "80ms" }}>
              Mobiliario médico y veterinario diseñado y fabricado en Panamá.
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed text-text-2 animate-rise" style={{ animationDelay: "160ms" }}>
              Modelos propios y soluciones a medida para entornos médicos, veterinarios y técnicos, con respaldo local.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 animate-rise" style={{ animationDelay: "240ms" }}>
              <Link href="/mobiliario" className="btn btn-teal px-7">Explorar mobiliario</Link>
              <Link href="/contacto" className="btn btn-outline px-7">Solicitar cotización</Link>
            </div>
            <p className="mt-10 font-display text-lg sm:text-xl font-semibold text-ink animate-fade-in" style={{ animationDelay: "400ms" }}>
              Existimos para sostener a quienes cuidan.
            </p>
          </div>
        </div>
      </section>

      {/* 01 · Lines */}
      <section className="section">
        <div className="container-custom">
          <SectionHead n="01" kickerText="Líneas de mobiliario" title="Mobiliario para entornos de atención" subtitle="Tres líneas especializadas. Acceso directo a las categorías y sus modelos." />
          <Reveal as="ul" className="mt-10 grid gap-6 md:grid-cols-3" stagger={0.1}>
            {parents.map((p) => (
              <li key={p.handle}>
                <Link href={`/${p.handle}`} className="group block">
                  <div className="plate plate-color aspect-[16/10] rounded-2xl bg-paper-3">
                    <Image src={p.image} alt={`${p.name} KARVEN en acero inoxidable`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  </div>
                  <div className="px-1 pt-4">
                    <h3 className="font-display text-xl font-semibold text-ink group-hover:text-teal transition-colors">{p.name}</h3>
                    <p className="mt-1 text-sm text-text-2">{LINE_SUMMARY[p.handle] || p.description}</p>
                    <span className={`${arrowLink} mt-3`}>Ver línea <FiArrowRight className="w-3.5 h-3.5" /></span>
                  </div>
                </Link>
              </li>
            ))}
          </Reveal>
          <p className="mt-10 text-center"><Link href="/mobiliario" className={arrowLink}>Ver catálogo completo <FiArrowRight className="w-3.5 h-3.5" /></Link></p>
        </div>
      </section>

      {/* 02 · Own models (Destacados) */}
      {products.length > 0 && (
        <section className="section pt-0">
          <div className="container-custom">
            <SectionHead n="02" kickerText="Catálogo" title="Modelos KARVEN" subtitle="Modelos propios con dimensiones y características definidas." />
            <Reveal as="ul" className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
              {products.map((p) => (
                <li key={p.id}>
                  <Link href={`/mobiliario/${p.handle}`} className="group block">
                    <div className="plate plate-color aspect-[4/3] rounded-2xl bg-white">
                      {p.thumbnail && <Image src={p.thumbnail} alt={p.images[0]?.alt || p.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain p-4" />}
                    </div>
                    <div className="px-1 pt-4">
                      <p className={kicker}>{p.sku || p.categories[0]?.name || "Modelo propio"}</p>
                      <h3 className="mt-2 font-display text-lg font-semibold text-ink group-hover:text-teal transition-colors">{p.title}</h3>
                      <span className={`${arrowLink} mt-2`}>Ver ficha <FiArrowRight className="w-3.5 h-3.5" /></span>
                    </div>
                  </Link>
                </li>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* 03 · Custom fabrication */}
      <section className="section pt-0">
        <div className="container-custom">
          <Reveal className="grid items-center gap-8 md:grid-cols-2 lg:gap-14" stagger={0.12}>
            <FabricationSketch />
            <div>
              <p className={kicker}>03 · Soluciones a medida</p>
              <h2 className="display-md mt-3 text-ink">Fabricación a medida</h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-text-2">
                Comprendemos el uso antes de fabricar. Definimos medidas, materiales y acabados según los requisitos del proyecto.
              </p>
              <Link href="/fabricacion-a-medida" className="btn btn-teal mt-7 px-7">Conocer el proceso</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 04 · Process */}
      <section className="section bg-paper-2">
        <div className="container-custom">
          <SectionHead n="04" kickerText="Nuestra forma de trabajar" title="Cómo trabajamos" subtitle="Del uso previsto al respaldo. Un proceso comprensible y verificable." />
          <Reveal as="ol" className="mt-12 grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4" stagger={0.06}>
            {PROCESS.map((s, i) => (
              <li key={s.title} className="border-t border-line pt-5">
                <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-teal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-1.5 max-w-[16rem] text-sm leading-relaxed text-text-2">{s.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 05 · Projects (only what is published from the Medusa admin) */}
      {projects.length > 0 && (
        <section className="section">
          <div className="container-custom">
            <SectionHead n="05" kickerText="Proyectos" title="Nuestro trabajo, documentado." subtitle="Aplicaciones reales, adaptaciones y resultados de fabricación." link={{ href: "/proyectos", label: "Ver proyectos" }} />
            <Reveal as="ul" className="mt-10 grid gap-8 md:grid-cols-2" stagger={0.1}>
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link href={`/proyectos/${p.slug}`} className="group block">
                    <div className="plate plate-color aspect-[16/9] rounded-2xl bg-paper-3">
                      {p.cover && <Image src={p.cover} alt={p.coverAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[1.2s] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.03]" />}
                    </div>
                    <div className="px-1 pt-4">
                      <p className={kicker}>{p.specialty || p.lineLabel}</p>
                      <h3 className="mt-2 font-display text-xl font-semibold text-ink group-hover:text-teal transition-colors">{p.title}</h3>
                      <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-text-2 group-hover:text-teal transition-colors">Ver proyecto y configuración <FiArrowRight className="w-3.5 h-3.5" /></span>
                    </div>
                  </Link>
                </li>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* 06 · Instagram */}
      <InstagramFeed posts={instagram} handle={INSTAGRAM_HANDLE} url={INSTAGRAM_URL} />

      {/* 07 · Contact */}
      <section className="section pt-0">
        <div className="container-custom">
          <Reveal>
            <div className="rounded-[28px] px-6 py-14 sm:py-16 text-center text-white bg-[linear-gradient(160deg,#126E7B_0%,#0E5260_55%,#0B2F3A_100%)] shadow-[0_30px_80px_-40px_rgba(11,47,58,0.6)]">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white/75">07 · Contacto</p>
              <h2 className="display-md mt-3 text-white text-balance">Fabricación y respaldo en Panamá.</h2>
              <p className="mt-4 mx-auto max-w-2xl text-lg text-white/85">Cuéntenos qué necesita. Evaluamos el modelo adecuado o una solución a medida.</p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/contacto" className="btn bg-white px-7 text-[#0B2F3A] hover:bg-white/90">Solicitar cotización</Link>
                <Link href="/mobiliario" className="btn border border-white/70 px-7 text-white hover:bg-white/10">Explorar catálogo</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
