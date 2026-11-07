import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink text-paper">
      <div className="container-custom text-center py-32">
        <p className="eyebrow text-teal-3 justify-center">Error 404</p>
        <h1 className="display-xl mt-6">Esta página no existe.</h1>
        <p className="mt-6 text-text-on-ink-2 max-w-md mx-auto">El enlace puede haber cambiado. Vuelva al inicio o explore el catálogo.</p>
        <div className="mt-10 flex justify-center gap-3">
          <Link href="/" className="btn btn-paper"><FiArrowLeft className="w-4 h-4" /> Inicio</Link>
          <Link href="/productos" className="btn btn-outline-paper">Catálogo</Link>
        </div>
      </div>
    </div>
  )
}
