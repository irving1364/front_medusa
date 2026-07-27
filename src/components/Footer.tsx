import Link from "next/link"
import Image from "next/image"
import { FiMapPin, FiPhone, FiMail, FiClock, FiArrowUpRight } from "react-icons/fi"

const QUICK_LINKS = [
  { href: "/propiedades", label: "Propiedades" },
  { href: "/propiedades?tipo=consultorio", label: "Consultorios" },
  { href: "/propiedades?tipo=clinica", label: "Clínicas" },
  { href: "/propiedades?tipo=centro-medico", label: "Centros Médicos" },
]

const SERVICES = [
  "Compra y Venta",
  "Arrendamiento",
  "Gestión de Propiedades",
  "Consultoría Inmobiliaria",
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-dark-border bg-dark-surface">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container-custom px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <Image src="/images/logo-isotipo-blanco.png" alt="Karven" fill className="object-contain" sizes="40px" />
              </div>
              <div className="relative h-8 w-24">
                <Image
                  src="/images/logo-logotipo-blanco.png"
                  alt="Karven"
                  fill
                  className="object-contain object-left"
                  sizes="96px"
                />
              </div>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed mb-6">
              Somos líderes en bienes raíces para el sector salud en Panamá. Especialistas en propiedades médicas premium.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-6">Propiedades</h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-muted hover:text-text-primary transition-colors flex items-center gap-1 group">
                    {link.label}
                    <FiArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-6">Servicios</h3>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s}><span className="text-sm text-text-muted cursor-default">{s}</span></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-4 h-4 text-ivory mt-0.5 shrink-0" />
                <span className="text-sm text-text-muted">Ciudad de Panamá, Panamá</span>
              </li>
              <li>
                <a href="tel:+50700000000" className="flex items-center gap-3 text-sm text-text-muted hover:text-text-primary transition-colors">
                  <FiPhone className="w-4 h-4 text-ivory shrink-0" />
                  +507 000-0000
                </a>
              </li>
              <li>
                <a href="mailto:info@karven.com" className="flex items-center gap-3 text-sm text-text-muted hover:text-text-primary transition-colors">
                  <FiMail className="w-4 h-4 text-ivory shrink-0" />
                  info@karven.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiClock className="w-4 h-4 text-ivory mt-0.5 shrink-0" />
                <span className="text-sm text-text-muted">Lun - Vie: 8:00 AM - 6:00 PM<br />Sáb: 9:00 AM - 1:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-dark-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-text-muted">&copy; {year} Karven. Todos los derechos reservados.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-xs text-text-muted hover:text-text-primary transition-colors">Términos y Condiciones</Link>
              <Link href="#" className="text-xs text-text-muted hover:text-text-primary transition-colors">Política de Privacidad</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
