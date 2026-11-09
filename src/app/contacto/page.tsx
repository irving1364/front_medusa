import type { Metadata } from "next"
import ContactForm from "@/components/ContactForm"
import Reveal from "@/components/ui/Reveal"

export const metadata: Metadata = {
  title: "Contacto",
  description: "Solicite una cotización de mobiliario clínico o agende una visita técnica con Karven en Ciudad de Panamá.",
}

const INFO: [string, string, string?][] = [
  ["Correo", "contact@karvenmedical.com", "mailto:contact@karvenmedical.com"],
  ["WhatsApp", "+507 6662-2199", "https://wa.me/50766622199"],
  ["Taller", "Ciudad de Panamá, Panamá"],
  ["Horario", "Lun – Vie · 8:00 a 17:00"],
]

export default function ContactPage() {
  return (
    <div className="bg-paper pt-28 lg:pt-32 pb-20">
      <div className="container-custom">
        <div className="rule-strong pt-5 grid lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow text-teal">Contacto</p>
            <h1 className="display-lg mt-4 text-ink text-balance">Cuéntenos qué mobiliario necesita.</h1>
          </div>
          <div className="lg:col-span-4 text-base leading-relaxed text-text-2 space-y-3">
            <p>Desde un producto de catálogo hasta una fabricación a medida, compártanos su requerimiento.</p>
            <p>Puede incluir cantidades, dimensiones, planos o fotografías. Revisaremos la información para definir los requisitos y preparar una propuesta.</p>
          </div>
        </div>

        <div className="mt-12 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <dl className="border-t border-line-2">
                {INFO.map(([k, v, href]) => (
                  <div key={k} className="grid grid-cols-[6rem_1fr] gap-4 py-3.5 border-b border-line text-sm">
                    <dt className="text-text-3">{k}</dt>
                    <dd className="text-ink tnum">{href ? <a href={href} className="hover:text-teal">{v}</a> : v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm text-text-2 leading-relaxed">
                ¿Ya armó una lista en el catálogo? Ábrala desde el ícono de cotización y envíela con sus datos; llega a fabricación con las referencias exactas.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.08}>
              <div className="card p-6 sm:p-10">
                <h2 className="font-display text-3xl text-ink">Escríbanos</h2>
                <div className="mt-8"><ContactForm /></div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  )
}
