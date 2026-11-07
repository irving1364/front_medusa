import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { FiArrowRight } from "react-icons/fi"
import Reveal from "@/components/ui/Reveal"
import { unsplash } from "@/lib/catalog"

export const metadata: Metadata = {
  title: "Fabricación",
  description: "Cómo fabrica Karven: acero inoxidable AISI 304 y 316, corte láser, soldadura TIG, pulido sanitario y pasivado. Taller en Ciudad de Panamá.",
}

const MATERIALS = [
  { code: "AISI 304", use: "Mobiliario clínico general: camillas, mesas, carros, estanterías.", note: "Cr 18 % · Ni 8 %. Resistente a desinfectantes de uso hospitalario." },
  { code: "AISI 316", use: "Higiene, patología, lavado de instrumental y zonas con cloruros.", note: "Añade Mo 2 %. Mayor resistencia a corrosión por picadura." },
  { code: "HPL / fenólico", use: "Cubiertas de consultorio y laboratorio.", note: "Laminado de alta presión antibacteriano o resina fenólica resistente a reactivos." },
  { code: "ABS / PU", use: "Cajones, parachoques y tapicerías.", note: "ABS antibacteriano en cajones; poliuretano termosellado en tapicería sin costuras." },
]

const PROCESS = [
  { n: "01", title: "Levantamiento", text: "Visitamos el área o revisamos los planos. Medimos, fotografiamos y anotamos flujos de trabajo, puntos de agua y eléctricos." },
  { n: "02", title: "Diseño y cotización", text: "Dibujamos cada pieza con cotas, definimos calibres y acabados, y entregamos una cotización formal con plazo." },
  { n: "03", title: "Corte y plegado", text: "Corte láser y plegado CNC sobre lámina 304 o 316 en calibres 20 a 14 según la carga de la pieza." },
  { n: "04", title: "Soldadura TIG", text: "Soldadura continua con aporte del mismo material. Sin salpicaduras ni cordones visibles en superficies de contacto." },
  { n: "05", title: "Pulido y pasivado", text: "Pulido sanitario grano 180, esquinas radiadas y pasivado en piezas 316 y en contacto con fluidos." },
  { n: "06", title: "Instalación", text: "Transporte e instalación con equipo propio en Ciudad de Panamá. Nivelación, fijación y entrega con el personal del área." },
]

const CAPABILITIES = [
  ["Lámina", "Hasta 3000 × 1500 mm, calibre 20 a 10"],
  ["Tubo", "Redondo Ø19 a Ø50 mm, cuadrado 20 a 50 mm"],
  ["Soldadura", "TIG en inox 304 / 316, MIG en acero al carbono"],
  ["Acabados", "Satinado 180, espejo bajo pedido, pintura epóxica"],
  ["Plazos", "2 a 6 semanas según volumen"],
  ["Garantía", "Hasta 5 años en estructura, 1 a 2 en componentes"],
]

export default function FabricationPage() {
  return (
    <div className="bg-paper pt-28 lg:pt-32">
      <div className="container-custom">
        <div className="rule-strong pt-5 grid lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow text-teal">Fabricación</p>
            <h1 className="display-lg mt-4 text-ink text-balance">Taller propio, acero inoxidable y soldadura TIG.</h1>
          </div>
          <p className="lg:col-span-4 text-base leading-relaxed text-text-2">
            Fabricamos en Ciudad de Panamá. Cada pieza se diseña con quien la va a usar, se suelda sin cordones visibles y se pule para soportar desinfección diaria durante años.
          </p>
        </div>

        <Reveal className="mt-12">
          <div className="plate aspect-[21/9] rounded-3xl border border-line">
            <Image src={unsplash("1504439468489-c8920d796a29", 2000)} alt="Quirófano equipado" fill sizes="100vw" className="object-cover" priority />
          </div>
        </Reveal>
      </div>

      <section className="section">
        <div className="container-custom grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Reveal><p className="eyebrow text-teal">Materiales</p><h2 className="display-md mt-4 text-ink">Qué acero va en cada pieza</h2></Reveal>
          </div>
          <div className="lg:col-span-8">
            <dl className="border-t border-line-2">
              {MATERIALS.map((m, i) => (
                <Reveal key={m.code} delay={i * 0.06} distance={16}>
                  <div className="grid sm:grid-cols-[9rem_1fr] gap-2 sm:gap-8 py-5 border-b border-line">
                    <dt className="font-display text-2xl text-ink tnum">{m.code}</dt>
                    <dd><p className="text-ink">{m.use}</p><p className="mt-1 text-sm text-text-3">{m.note}</p></dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section bg-paper-2 text-ink">
        <div className="container-custom">
          <Reveal><p className="eyebrow text-teal-3">Proceso</p><h2 className="display-md mt-4 max-w-2xl text-balance">Del levantamiento a la instalación, seis pasos.</h2></Reveal>
          <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
            {PROCESS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.07} className="bg-paper-2">
                <li className="p-7 h-full hover:bg-paper-3 transition-colors duration-500">
                  <span className="font-display text-3xl text-teal-3 tnum">{s.n}</span>
                  <h3 className="mt-5 font-display text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-2">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container-custom grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Reveal><p className="eyebrow text-teal">Capacidades</p><h2 className="display-md mt-4 text-ink">Lo que podemos fabricar</h2>
              <p className="mt-4 text-sm text-text-2">Si su pieza no está en el catálogo, envíenos un boceto o una foto. Dibujamos, cotizamos y fabricamos a medida.</p>
              <Link href="/contacto" className="btn btn-ink mt-6">Enviar un boceto <FiArrowRight className="w-4 h-4" /></Link>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <table className="spec-table border-t border-line-2">
                <tbody>
                  {CAPABILITIES.map(([k, v]) => (<tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
