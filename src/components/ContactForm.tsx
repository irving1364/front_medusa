"use client"

import { useState, type FormEvent } from "react"
import { FiSend, FiCheck } from "react-icons/fi"

const INTEREST_OPTIONS = [
  "Clínico fijo (camillas, mesas, mobiliario inox)",
  "Clínico móvil (carros, atriles, soportes)",
  "Quirúrgico (mesas de operaciones e instrumental)",
  "Higiene (lavamanos quirúrgicos, estaciones de lavado)",
  "Laboratorio (mesones, almacenamiento técnico)",
  "Patología (mesas especiales, superficies sanitarias)",
  "Arquitectura clínica (protecciones, pasamanos)",
  "Proyecto completo (varias áreas)",
  "Pieza a medida",
]

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", organization: "", interest: "", message: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")
  const [error, setError] = useState<string | null>(null)

  const update = (field: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    setError(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.success) {
        setError(data.error || "No se pudo enviar el mensaje. Intente nuevamente.")
        setStatus("idle")
        return
      }
      setStatus("sent")
    } catch {
      setError("No se pudo conectar con el servidor. Intente nuevamente.")
      setStatus("idle")
    }
  }

  if (status === "sent") {
    return (
      <div className="py-10 text-center">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-teal-soft text-teal">
          <FiCheck className="w-6 h-6" />
        </span>
        <h3 className="mt-6 font-display text-2xl text-ink">Mensaje recibido</h3>
        <p className="mt-2 text-sm text-text-2">Un asesor le responderá en menos de 48 horas hábiles.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Nombre completo *" id="name">
          <input id="name" required value={form.name} onChange={(e) => update("name", e.target.value)} className="input" placeholder="Su nombre" />
        </Field>
        <Field label="Correo electrónico *" id="email">
          <input id="email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className="input" placeholder="correo@clinica.com" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Teléfono" id="phone">
          <input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="input" placeholder="+507 0000-0000" />
        </Field>
        <Field label="Clínica, hospital o empresa" id="organization">
          <input id="organization" value={form.organization} onChange={(e) => update("organization", e.target.value)} className="input" placeholder="Nombre de la institución" />
        </Field>
      </div>
      <Field label="¿Qué necesita equipar?" id="interest">
        <select id="interest" value={form.interest} onChange={(e) => update("interest", e.target.value)} className="input">
          <option value="">Seleccione una opción</option>
          {INTEREST_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </Field>
      <Field label="Mensaje *" id="message">
        <textarea id="message" required rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} className="input resize-none" placeholder="Áreas, cantidades aproximadas, medidas y plazos. Puede pegar un enlace a planos o fotos." />
      </Field>

      {error && <p role="alert" className="text-sm text-error bg-error/10 border border-error/30 rounded-lg px-4 py-3">{error}</p>}

      <button type="submit" disabled={status === "sending"} className="btn btn-ink w-full sm:w-auto disabled:opacity-60">
        {status === "sending" ? "Enviando…" : <>Enviar mensaje <FiSend className="w-4 h-4" /></>}
      </button>
    </form>
  )
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium uppercase tracking-[0.12em] text-text-2 mb-2">{label}</label>
      {children}
    </div>
  )
}
