import type { Metadata } from "next"
import Link from "next/link"
import { FiCheck, FiArrowRight } from "react-icons/fi"

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conozca la historia y el equipo de Karven, l\u00edderes en inmobiliaria m\u00e9dica premium en Panam\u00e1.",
}

const values = [
  { title: "Excelencia", description: "Nos comprometemos con los m\u00e1s altos est\u00e1ndares de calidad en cada propiedad que ofrecemos." },
  { title: "Integridad", description: "Actuamos con transparencia y \u00e9tica en todas nuestras transacciones inmobiliarias." },
  { title: "Especializaci\u00f3n", description: "Somos expertos en el sector salud, entendiendo las necesidades \u00fanicas de cada pr\u00e1ctica m\u00e9dica." },
  { title: "Compromiso", description: "Acompa\u00f1amos a nuestros clientes en cada paso, desde la b\u00fasqueda hasta la post-venta." },
]

const team = [
  { name: "Ana Karina V.", role: "Directora General", initials: "AK" },
  { name: "Carlos M\u00e9ndez", role: "Director de Operaciones", initials: "CM" },
  { name: "Mar\u00eda Fernanda R.", role: "Gerente de Ventas", initials: "MF" },
  { name: "Jos\u00e9 Luis T.", role: "Asesor Legal", initials: "JL" },
]

export default function AboutPage() {
  return (
    <div className="pt-20 min-h-screen bg-dark-base">
      {/* Hero */}
      <section className="section-padding bg-dark-surface border-b border-dark-border">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/20 bg-gold-glow/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-[11px] uppercase tracking-[0.15em] text-gold-light font-medium">Nuestra Historia</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-text-primary mb-6">
              Transformando el <span className="text-gradient-gold">Sector Salud</span><br />a Trav\u00e9s del Espacio
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
              En Karven, somos m\u00e1s que una inmobiliaria. Somos un equipo apasionado por conectar profesionales de la salud con espacios que elevan la calidad de la atenci\u00f3n m\u00e9dica en Panam\u00e1.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-dark-base">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary mb-6">
                M\u00e1s de 12 A&ntilde;os de <span className="text-gradient-gold">Experiencia</span>
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>Fundada en 2014 en la Ciudad de Panam\u00e1, Karven naci\u00f3 de la visi\u00f3n de crear un puente entre el sector inmobiliario y el mundo m\u00e9dico.</p>
                <p>Desde entonces, hemos ayudado a cientos de m\u00e9dicos, cl\u00ednicas y grupos m\u00e9dicos a encontrar el espacio perfecto para desarrollar su pr\u00e1ctica.</p>
                <p>Hoy somos l\u00edderes en el mercado de bienes ra\u00edces m\u00e9dicos en Panam\u00e1, con una cartera de propiedades premium en las zonas m\u00e1s exclusivas del pa\u00eds.</p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-gold/10 via-dark-elevated to-dark-surface border border-dark-border flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl font-serif text-gradient-gold mb-4">K+</div>
                  <p className="text-text-muted text-sm uppercase tracking-[0.2em]">Excelencia desde 2014</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-dark-surface">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary mb-6">Nuestros <span className="text-gradient-gold">Valores</span></h2>
            <p className="text-text-secondary leading-relaxed">Son la gu\u00eda de cada decisi\u00f3n que tomamos y la base de la confianza que nuestros clientes depositan en nosotros.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="p-6 rounded-xl bg-dark-elevated border border-dark-border hover:border-gold/20 transition-all duration-500">
                <div className="w-10 h-10 rounded-full bg-gold-glow/10 border border-gold/20 flex items-center justify-center mb-4">
                  <FiCheck className="w-4 h-4 text-gold" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">{v.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-dark-base">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary mb-6">Nuestro <span className="text-gradient-gold">Equipo</span></h2>
            <p className="text-text-secondary leading-relaxed">Profesionales apasionados dedicados a brindarle la mejor experiencia en bienes ra\u00edces m\u00e9dicos.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m) => (
              <div key={m.name} className="p-6 text-center rounded-xl bg-dark-elevated border border-dark-border hover:border-gold/20 transition-all duration-500 group">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center mx-auto mb-4 group-hover:border-gold/40 transition-all">
                  <span className="text-xl font-bold text-gold">{m.initials}</span>
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-1">{m.name}</h3>
                <p className="text-sm text-text-muted">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-dark-surface border-t border-dark-border">
        <div className="container-custom text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary mb-6">
            &iquest;Listo para trabajar con <span className="text-gradient-gold">nosotros</span>?
          </h2>
          <p className="text-text-secondary mb-8 max-w-lg mx-auto">Cont&aacute;ctenos hoy y descubra c&oacute;mo podemos ayudarle a encontrar el espacio perfecto para su pr&aacute;ctica m&eacute;dica.</p>
          <Link href="/contacto" className="group inline-flex items-center gap-2 px-8 py-4 bg-gold text-dark-base font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 glow-gold-subtle hover:glow-gold">
            Cont&aacute;ctenos
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}
