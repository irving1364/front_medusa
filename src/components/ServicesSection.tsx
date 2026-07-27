"use client"

import { FiSearch, FiFileText, FiUsers, FiBarChart2, FiShield, FiRefreshCw } from "react-icons/fi"

const services = [
  { icon: FiSearch, title: "B&uacute;squeda de Propiedades", description: "Encontramos el espacio perfecto para su pr&aacute;ctica m&eacute;dica, considerando ubicaci&oacute;n, tama&ntilde;o y normativas del sector salud." },
  { icon: FiFileText, title: "Asesor&iacute;a Legal", description: "Acompa&ntilde;amiento jur&iacute;dico especializado en transacciones inmobiliarias m&eacute;dicas, contratos de arrendamiento y due diligence." },
  { icon: FiUsers, title: "Gesti&oacute;n de Arrendamiento", description: "Administramos contratos de alquiler para consultorios y cl&iacute;nicas, asegurando las mejores condiciones para su pr&aacute;ctica." },
  { icon: FiBarChart2, title: "Valoraci&oacute;n de Mercado", description: "An&aacute;lisis preciso del valor de propiedades m&eacute;dicas basado en ubicaci&oacute;n, equipamiento y potencial de rentabilidad." },
  { icon: FiShield, title: "Seguros y Garant&iacute;as", description: "Gesti&oacute;n de seguros para propiedades m&eacute;dicas, protegiendo su inversi&oacute;n con las mejores coberturas del mercado." },
  { icon: FiRefreshCw, title: "Post-Venta", description: "Soporte continuo despu&eacute;s de la transacci&oacute;n, incluyendo gesti&oacute;n de remodelaciones y adecuaci&oacute;n de espacios." },
]

export default function ServicesSection() {
  return (
    <section className="section-padding bg-dark-base">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary mb-6">
            Servicios <span className="text-gradient-ivory">Integrales</span>
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Ofrecemos un acompa&ntilde;amiento completo en cada paso de su inversi&oacute;n inmobiliaria m&eacute;dica, desde la b&uacute;squeda inicial hasta el soporte post-venta.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="group p-6 sm:p-8 rounded-xl bg-dark-elevated border border-dark-border hover:border-ivory/20 transition-all duration-500 hover-lift"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-ivory-glow/10 border border-ivory/10 flex items-center justify-center mb-5 group-hover:bg-ivory-glow/20 group-hover:border-ivory/20 transition-all duration-300">
                  <Icon className="w-5 h-5 text-ivory" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-3 group-hover:text-ivory-light transition-colors">{service.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
