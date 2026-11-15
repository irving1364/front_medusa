import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { FiArrowRight } from "react-icons/fi"
import Reveal from "@/components/ui/Reveal"

export const metadata: Metadata = {
  title: { absolute: "Mobiliario Médico y Veterinario a Medida en Panamá | KARVEN Medical" },
  description: "Desarrollamos, adaptamos y fabricamos mobiliario médico, veterinario y técnico según los requisitos de cada proyecto. Acero inoxidable AISI 304 y 316, acero al carbono pintado y materiales complementarios. Fabricado en Panamá por FABMETAL.",
  alternates: { canonical: "/fabricacion-a-medida" },
  openGraph: { title: "Mobiliario Médico y Veterinario a Medida en Panamá | KARVEN Medical", url: "/fabricacion-a-medida", type: "website" },
}

const MATERIALS = [
  { name: "Acero inoxidable AISI 304", text: "Utilizado en distintas estructuras y superficies de mobiliario médico, veterinario y técnico. Su aplicación se define según las condiciones de exposición y los requisitos del producto." },
  { name: "Acero inoxidable AISI 316", text: "Alternativa para aplicaciones que requieren evaluar una mayor resistencia a determinados ambientes corrosivos. Su selección depende de las condiciones específicas de trabajo y limpieza." },
  { name: "Acero al carbono con acabado pintado", text: "Utilizado en estructuras de mobiliario clínico cuando sus propiedades mecánicas y el sistema de protección superficial son adecuados para el uso previsto." },
  { name: "Materiales complementarios", text: "Según el diseño, incorporamos superficies fenólicas, componentes poliméricos, tapicería y otros materiales seleccionados." },
]

const PROCESS = [
  { n: "01", title: "Escuchar", text: "Conocemos la necesidad del cliente, el entorno de utilización y las condiciones del trabajo." },
  { n: "02", title: "Definir", text: "Establecemos el uso previsto, dimensiones, materiales, requisitos funcionales y criterios de aceptación." },
  { n: "03", title: "Diseñar", text: "Adaptamos un modelo existente o desarrollamos una solución especial, considerando fabricación, uso, limpieza y mantenimiento." },
  { n: "04", title: "Planificar", text: "Definimos materiales, componentes, procesos, costos y plazos antes de confirmar la fabricación." },
  { n: "05", title: "Fabricar", text: "Materializamos la solución mediante FABMETAL, conforme a la configuración y especificaciones aprobadas." },
  { n: "06", title: "Verificar", text: "Revisamos dimensiones, uniones, acabados y funcionamiento según las características del producto." },
  { n: "07", title: "Respaldar", text: "Establecemos las condiciones de garantía, atención posterior y mantenimiento correspondientes." },
  { n: "08", title: "Mejorar", text: "Utilizamos las observaciones y la experiencia de fabricación para corregir y mejorar nuestros productos y procesos." },
]

const CAPABILITIES = [
  ["Desarrollo y adaptación", "Mobiliario según modelos propios, requisitos específicos o planos evaluados."],
  ["Materiales", "Acero inoxidable, acero al carbono pintado y materiales complementarios según aplicación."],
  ["Fabricación metalmecánica", "Conformación de estructuras, soldadura, ensamble y acabados."],
  ["Procesos complementarios", "Corte, plegado y otros servicios especializados mediante proveedores externos cuando corresponda."],
  ["Acabados", "Pulido y acabados para acero inoxidable, pintura y tapicería según especificación."],
  ["Dimensiones", "Definidas según el producto, los materiales disponibles y la viabilidad técnica."],
  ["Plazos", "Establecidos en la cotización según complejidad, cantidad y programación."],
  ["Garantía", "Garantía general de 12 meses, conforme a las condiciones aplicables al producto."],
]

export default function FabricationPage() {
  return (
    <div className="bg-paper pt-28 lg:pt-32 pb-20">
      <div className="container-custom">
        <div className="rule-strong pt-5 grid lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-teal">Fabricación a medida</p>
            <h1 className="display-lg mt-4 text-ink text-balance">Mobiliario a medida. Pensado para su función.</h1>
          </div>
          <div className="lg:col-span-5 space-y-3 text-base leading-relaxed text-text-2">
            <p>Desarrollamos, adaptamos y fabricamos mobiliario médico, veterinario y técnico según los requisitos de cada proyecto.</p>
            <p>Evaluamos el uso previsto, las dimensiones, los materiales y las condiciones de limpieza y mantenimiento antes de definir la solución.</p>
            <p className="mono text-[11px] uppercase tracking-[0.14em] text-text-3 pt-1">Fabricado en Panamá por FABMETAL.</p>
          </div>
        </div>

        <Reveal className="mt-12">
          <div className="plate aspect-[21/9] rounded-3xl border border-line">
            <Image src="/images/fabricacion.webp" alt="Soldadura TIG de una mesa de acero inoxidable en el taller de FABMETAL, Ciudad de Panamá" fill sizes="(max-width: 1320px) 100vw, 1280px" className="object-cover" priority />
          </div>
        </Reveal>
      </div>

      {/* Materiales */}
      <section className="section">
        <div className="container-custom grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow text-teal">Materiales</p>
              <h2 className="display-md mt-4 text-ink text-balance">Materiales seleccionados según su aplicación.</h2>
              <p className="mt-4 text-sm leading-relaxed text-text-2">La selección de materiales forma parte de cada especificación. Evaluamos la función del mobiliario, las condiciones de uso, la limpieza, la resistencia requerida y el mantenimiento.</p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <dl className="border-t border-line-2">
              {MATERIALS.map((m, i) => (
                <Reveal key={m.name} delay={i * 0.06} distance={16}>
                  <div className="grid md:grid-cols-[16rem_1fr] gap-2 md:gap-8 py-5 border-b border-line">
                    <dt className="font-display text-xl text-ink text-balance">{m.name}</dt>
                    <dd className="text-text-2 leading-relaxed">{m.text}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="section bg-paper-2 text-ink">
        <div className="container-custom">
          <Reveal><p className="eyebrow text-teal-3">Nuestro proceso</p><h2 className="display-md mt-4 max-w-2xl text-balance">De la necesidad a una solución definida y respaldada.</h2></Reveal>
          <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
            {PROCESS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06} className="bg-paper-2">
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

      {/* Capacidades */}
      <section className="section">
        <div className="container-custom grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow text-teal">Capacidades de fabricación</p>
              <h2 className="display-md mt-4 text-ink text-balance">Capacidad técnica para soluciones a medida.</h2>
              <p className="mt-4 text-sm leading-relaxed text-text-2">Evaluamos cada requerimiento según su función, dimensiones, materiales, complejidad y viabilidad de fabricación.</p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <table className="spec-table border-t border-line-2">
                <thead className="sr-only"><tr><th scope="col">Capacidad</th><th scope="col">Descripción</th></tr></thead>
                <tbody>
                  {CAPABILITIES.map(([k, v]) => (<tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="container-custom">
        <Reveal>
          <div className="panel p-8 sm:p-12 grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow text-teal">Fabricación a medida</p>
              <h2 className="display-md mt-4 text-ink text-balance">¿Necesita un mobiliario con características especiales?</h2>
              <p className="subtitle mt-3 max-w-2xl">Envíenos sus planos, fotografías o dimensiones para evaluar su fabricación.</p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link href="/contacto" className="btn btn-teal">Solicitar fabricación a medida <FiArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
