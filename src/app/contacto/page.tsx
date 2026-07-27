import type { Metadata } from "next"
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi"
import ContactForm from "@/components/ContactForm"

export const metadata: Metadata = {
  title: "Contacto",
  description: "Cont\u00e1ctenos para recibir asesor\u00eda personalizada en bienes ra\u00edces m\u00e9dicos en Panam\u00e1.",
}

const contactInfo = [
  { icon: FiPhone, title: "Tel\u00e9fono", details: ["+507 000-0000", "+507 000-0000"], action: { label: "Llamar ahora", href: "tel:+50700000000" } },
  { icon: FiMail, title: "Correo Electr\u00f3nico", details: ["info@karven.com", "ventas@karven.com"], action: { label: "Enviar correo", href: "mailto:info@karven.com" } },
  { icon: FiMapPin, title: "Ubicaci\u00f3n", details: ["Ciudad de Panam\u00e1", "Panam\u00e1"] },
  { icon: FiClock, title: "Horario", details: ["Lun - Vie: 8:00 AM - 6:00 PM", "S\u00e1b: 9:00 AM - 1:00 PM"] },
]

export default function ContactPage() {
  return (
    <div className="pt-20 min-h-screen bg-dark-base">
      <section className="border-b border-dark-border bg-dark-surface">
        <div className="container-custom px-4 sm:px-6 py-12 sm:py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/20 bg-gold-glow/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.15em] text-gold-light font-medium">Contacto</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary mb-4">
            Hablemos de su <span className="text-gradient-gold">Proyecto</span>
          </h1>
          <p className="text-text-secondary max-w-xl">Estamos listos para ayudarle a encontrar la propiedad m\u00e9dica ideal. Cont\u00e1ctenos y le responderemos a la brevedad.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
            <div className="lg:col-span-2 space-y-8">
              {contactInfo.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold-glow/10 border border-gold/20 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary mb-2">{item.title}</h3>
                      {item.details.map((d) => <p key={d} className="text-sm text-text-muted">{d}</p>)}
                      {"action" in item && item.action && (
                        <a href={item.action.href} className="inline-block mt-2 text-xs text-gold hover:text-gold-light transition-colors">{item.action.label} &rarr;</a>
                      )}
                    </div>
                  </div>
                )
              })}
              <div className="pt-6 border-t border-dark-border">
                <h3 className="text-sm font-semibold text-text-primary mb-4">S&iacute;ganos</h3>
                <div className="flex gap-3">
                  {["LinkedIn", "Facebook", "Instagram"].map((s) => (
                    <a key={s} href="#" className="px-4 py-2 text-xs text-text-muted bg-dark-elevated border border-dark-border rounded-lg hover:text-gold-light hover:border-gold/30 transition-all">{s}</a>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="p-6 sm:p-8 rounded-2xl bg-dark-elevated border border-dark-border">
                <h2 className="text-xl font-semibold text-text-primary mb-6">Env&iacute;enos un Mensaje</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
