"use client"

import { FiStar } from "react-icons/fi"

const testimonials = [
  { name: "Dra. Mar&iacute;a Castillo", role: "Cardi&oacute;loga", location: "Costa del Este", quote: "Karven nos ayud&oacute; a encontrar el consultorio perfecto para mi pr&aacute;ctica. Su conocimiento del sector m&eacute;dico fue invaluable en todo el proceso.", rating: 5 },
  { name: "Dr. Roberto M&eacute;ndez", role: "Cirujano Pl&aacute;stico", location: "Punta Pac&iacute;fica", quote: "La asesor&iacute;a legal y la gesti&oacute;n de arrendamiento superaron mis expectativas. Encontraron un espacio que cumple con todas las normativas del Ministerio de Salud.", rating: 5 },
  { name: "Cl&iacute;nica Dental SmileCare", role: "Grupo M&eacute;dico", location: "San Francisco", quote: "Gracias a Karven pudimos expandir nuestra cl&iacute;nica dental. Su equipo entendi&oacute; perfectamente nuestras necesidades de equipamiento y flujo de pacientes.", rating: 5 },
]

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-dark-surface">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary mb-6">
            Lo Que Dicen <span className="text-gradient-ivory">Nuestros Clientes</span>
          </h2>
          <p className="text-text-secondary leading-relaxed">La satisfacci&oacute;n de nuestros clientes es nuestra mejor carta de presentaci&oacute;n.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="p-6 sm:p-8 rounded-xl bg-dark-elevated border border-dark-border hover:border-ivory/20 transition-all duration-500">
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => <FiStar key={i} className="w-4 h-4 fill-ivory text-ivory" />)}
              </div>
              <p className="text-text-secondary leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="pt-4 border-t border-dark-border">
                <div className="font-semibold text-text-primary text-sm">{t.name}</div>
                <div className="text-xs text-text-muted mt-0.5">{t.role} &middot; {t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
