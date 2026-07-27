import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-base">
      <div className="text-center px-4">
        <div className="text-9xl sm:text-[10rem] font-serif font-bold text-gradient-gold mb-6">
          404
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary mb-4">
          Página No Encontrada
        </h1>
        <p className="text-text-secondary max-w-md mx-auto mb-8 leading-relaxed">
          La página que está buscando no existe o ha sido movida.
          Por favor, verifique la URL o regrese al inicio.
        </p>
        <Link
          href="/"
          className="group inline-flex items-center gap-2 px-8 py-4 bg-gold text-dark-base font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 glow-gold-subtle hover:glow-gold"
        >
          <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver al Inicio
        </Link>
      </div>
    </div>
  )
}
