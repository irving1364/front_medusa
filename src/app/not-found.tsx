import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper pt-40 pb-32">
      <div className="container-custom rule-strong pt-6">
        <p className="eyebrow text-teal">Error 404</p>
        <h1 className="display-xl mt-6 text-ink">Esta página no existe.</h1>
        <p className="mt-6 text-text-2 max-w-md">El enlace puede haber cambiado. Vuelva al inicio o entre al equipamiento.</p>
        <div className="mt-10 flex gap-3">
          <Link href="/" className="btn btn-ink"><FiArrowLeft className="w-4 h-4" /> Inicio</Link>
          <Link href="/equipamiento" className="btn btn-outline">Equipamiento</Link>
        </div>
      </div>
    </div>
  )
}
