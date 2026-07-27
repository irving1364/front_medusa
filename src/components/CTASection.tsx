import Link from "next/link"
import { FiArrowRight } from "react-icons/fi"

export default function CTASection() {
  return (
    <section className="section-padding bg-dark-base">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gold/10 via-dark-elevated to-dark-surface border border-ivory/20 p-8 sm:p-12 lg:p-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-ivory-glow rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-ivory-glow rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

          <div className="relative text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary mb-6">
              &iquest;Listo para Encontrar el <span className="text-gradient-ivory">Espacio Perfecto</span>?
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Nuestro equipo de expertos est&aacute; listo para ayudarle a encontrar la propiedad m&eacute;dica ideal para su pr&aacute;ctica. Cont&aacute;ctenos hoy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-ivory text-dark-base font-semibold rounded-lg hover:bg-ivory-light transition-all duration-300 glow-ivory-subtle hover:glow-ivory">
                Solicitar Asesor&iacute;a
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/propiedades" className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-dark-border-light text-text-primary font-medium rounded-lg hover:border-ivory/30 hover:text-ivory-light transition-all duration-300">
                Explorar Propiedades
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
