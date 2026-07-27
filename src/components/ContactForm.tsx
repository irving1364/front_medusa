"use client"

import { useState, type FormEvent } from "react"
import { FiSend, FiCheck, FiAlertCircle } from "react-icons/fi"

const INTEREST_OPTIONS = [
  "Compra de Propiedad M&eacute;dica",
  "Arrendamiento",
  "Venta de Propiedad",
  "Informaci&oacute;n General",
  "Otro",
]

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "", interest: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    await new Promise((r) => setTimeout(r, 1500))
    setStatus("sent")
    setTimeout(() => setStatus("idle"), 3000)
  }

  const update = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }))

  const inputClass = "w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-lg text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-ivory/50 focus:ring-1 focus:ring-ivory/20 transition-all duration-200"

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">Nombre Completo *</label>
          <input id="name" type="text" required value={formData.name} onChange={(e) => update("name", e.target.value)} className={inputClass} placeholder="Su nombre" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">Correo Electr&oacute;nico *</label>
          <input id="email" type="email" required value={formData.email} onChange={(e) => update("email", e.target.value)} className={inputClass} placeholder="correo@ejemplo.com" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-2">Tel&eacute;fono</label>
          <input id="phone" type="tel" value={formData.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} placeholder="+507 0000-0000" />
        </div>
        <div>
          <label htmlFor="interest" className="block text-sm font-medium text-text-secondary mb-2">Inter&eacute;s</label>
          <select id="interest" value={formData.interest} onChange={(e) => update("interest", e.target.value)} className={inputClass}>
            <option value="" disabled>Seleccione una opci&oacute;n</option>
            {INTEREST_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">Mensaje *</label>
        <textarea id="message" required rows={5} value={formData.message} onChange={(e) => update("message", e.target.value)} className={`${inputClass} resize-none`} placeholder="Cu&eacute;ntenos sobre su proyecto o requisitos..." />
      </div>

      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className="w-full sm:w-auto px-8 py-4 bg-ivory text-dark-base font-semibold rounded-lg hover:bg-ivory-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 glow-ivory-subtle hover:glow-ivory group"
      >
        {status === "sending" ? (
          <><div className="w-4 h-4 border-2 border-dark-base border-t-transparent rounded-full animate-spin" /> Enviando...</>
        ) : status === "sent" ? (
          <><FiCheck className="w-4 h-4" /> Mensaje Enviado</>
        ) : status === "error" ? (
          <><FiAlertCircle className="w-4 h-4" /> Error - Intentar de Nuevo</>
        ) : (
          <>Enviar Mensaje <FiSend className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
        )}
      </button>
    </form>
  )
}
