import type { Metadata } from "next"
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi"
import ContactForm from "@/components/ContactForm"
import Reveal from "@/components/ui/Reveal"

export const metadata: Metadata = {
  title: "Contacto",
  description: "Solicite una cotización de mobiliario médico o agende una visita técnica con Karven en Panamá.",
}

const INFO = [
  { icon: FiPhone, title: "Teléfono", lines: ["+507 000-0000"], href: "tel:+50700000000" },
  { icon: FiMail, title: "Correo", lines: ["karvenmedicalpa@gmail.com"], href: "mailto:karvenmedicalpa@gmail.com" },
  { icon: FiMapPin, title: "Ubicación", lines: ["Ciudad de Panamá, Panamá"] },
  { icon: FiClock, title: "Horario", lines: ["Lun – Vie · 8:00 a 6:00", "Sáb · 9:00 a 1:00"] },
]

export default function ContactPage() {
  return (
    <div className="bg-paper">
      <section className="bg-ink text-paper pt-36 pb-16 lg:pt-44 lg:pb-20 grain">
        <div className="container-custom">
          <p className="eyebrow text-teal-3">Contacto</p>
          <h1 className="display-lg mt-5 max-w-3xl text-balance">Cuéntenos qué va a equipar.</h1>
          <p className="mt-6 max-w-xl text-lg text-text-on-ink-2">Respondemos cotizaciones en 48 horas hábiles y agendamos visitas técnicas sin costo en Ciudad de Panamá.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-custom grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <Reveal>
              <ul className="space-y-8">
                {INFO.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.title} className="flex gap-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal-soft text-teal shrink-0">
                        <Icon className="w-4 h-4" />
                      </span>
                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-text-3">{item.title}</h3>
                        {item.lines.map((l) => (
                          item.href
                            ? <a key={l} href={item.href} className="block mt-1 text-ink hover:text-teal transition-colors">{l}</a>
                            : <p key={l} className="mt-1 text-ink">{l}</p>
                        ))}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <div className="card p-6 sm:p-10">
                <h2 className="font-display text-3xl text-ink">Envíenos un mensaje</h2>
                <p className="mt-2 text-sm text-text-2">Si ya armó una lista en el catálogo, use el botón de cotización para enviarla con sus datos.</p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
