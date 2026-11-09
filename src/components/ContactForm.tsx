"use client"

import { useRef, useState, type FormEvent } from "react"
import { FiSend, FiCheck, FiPaperclip, FiX } from "react-icons/fi"

export const REQUEST_TYPES = [
  "Cotización de mobiliario",
  "Fabricación a medida",
  "Consulta técnica o comercial",
  "Garantía o respaldo",
  "Otro asunto",
]

export const PRODUCT_LINES = [
  "Mobiliario médico",
  "Mobiliario veterinario",
  "Mobiliario técnico",
  "No estoy seguro / No aplica",
]

/** Attachments: PDF, JPG or PNG. Vercel caps the request body at ~4.5 MB, so keep the total under 4 MB. */
const ACCEPT = ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
const MAX_FILES = 5
const MAX_TOTAL_BYTES = 4 * 1024 * 1024
const isAllowed = (f: File) => ["application/pdf", "image/jpeg", "image/png"].includes(f.type) || /\.(pdf|jpe?g|png)$/i.test(f.name)
const fmtSize = (b: number) => (b >= 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`)

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", organization: "", requestType: "", line: "", message: "" })
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")
  const [error, setError] = useState<string | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)

  const update = (field: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [field]: value }))
  const totalBytes = files.reduce((n, f) => n + f.size, 0)

  const addFiles = (list: FileList | null) => {
    if (!list) return
    const next = [...files]
    for (const f of Array.from(list)) {
      if (!isAllowed(f)) { setError(`"${f.name}" no es PDF, JPG ni PNG.`); continue }
      if (next.some((x) => x.name === f.name && x.size === f.size)) continue
      next.push(f)
    }
    if (next.length > MAX_FILES) { setError(`Máximo ${MAX_FILES} archivos.`); next.length = MAX_FILES }
    if (next.reduce((n, f) => n + f.size, 0) > MAX_TOTAL_BYTES) { setError("Los adjuntos superan 4 MB en total. Reduzca el tamaño o envíe un enlace en el mensaje."); return }
    setFiles(next)
    if (fileInput.current) fileInput.current.value = ""
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    setError(null)
    try {
      const data = new FormData()
      Object.entries(form).forEach(([k, v]) => data.append(k, v))
      files.forEach((f) => data.append("files", f, f.name))
      const res = await fetch("/api/contact", { method: "POST", body: data })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || !json.success) {
        setError(json.error || "No se pudo enviar el mensaje. Intente nuevamente.")
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
        <h3 className="mt-6 font-display text-2xl text-ink">Solicitud recibida</h3>
        <p className="mt-2 text-sm text-text-2">Revisaremos la información y le responderemos en menos de 48 horas hábiles.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Nombre completo *" id="name">
          <input id="name" required value={form.name} onChange={(e) => update("name", e.target.value)} className="input" placeholder="Su nombre" autoComplete="name" />
        </Field>
        <Field label="Correo electrónico *" id="email">
          <input id="email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className="input" placeholder="correo@clinica.com" autoComplete="email" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Teléfono / WhatsApp" id="phone">
          <input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="input" placeholder="+507 0000-0000" autoComplete="tel" />
        </Field>
        <Field label="Clínica, hospital o empresa" id="organization">
          <input id="organization" value={form.organization} onChange={(e) => update("organization", e.target.value)} className="input" placeholder="Nombre de la institución" autoComplete="organization" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Tipo de solicitud *" id="requestType">
          <select id="requestType" required value={form.requestType} onChange={(e) => update("requestType", e.target.value)} className="input">
            <option value="">Seleccione una opción</option>
            {REQUEST_TYPES.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Línea de mobiliario" id="line">
          <select id="line" value={form.line} onChange={(e) => update("line", e.target.value)} className="input">
            <option value="">Seleccione una opción</option>
            {PRODUCT_LINES.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Mensaje *" id="message">
        <textarea id="message" required rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} className="input resize-none" placeholder="Cantidades, dimensiones, plazos y cualquier detalle del requerimiento." />
      </Field>

      <Field label="Adjuntos (opcional)" id="files">
        <input ref={fileInput} id="files" type="file" accept={ACCEPT} multiple className="sr-only" onChange={(e) => addFiles(e.target.files)} />
        <label htmlFor="files" className="flex items-center gap-3 cursor-pointer rounded-xl border border-dashed border-line-2 bg-paper px-4 py-3.5 text-sm text-text-2 hover:border-teal hover:text-ink transition-colors">
          <FiPaperclip className="w-4 h-4 text-teal shrink-0" />
          <span className="flex-1">Adjuntar planos, fotografías o fichas: PDF, JPG o PNG. Hasta {MAX_FILES} archivos, 4 MB en total.</span>
        </label>
        {files.length > 0 && (
          <ul className="mt-2 space-y-1.5">
            {files.map((f) => (
              <li key={`${f.name}-${f.size}`} className="flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-2 text-sm">
                <span className="truncate text-ink">{f.name} <span className="text-text-3 mono text-xs">{fmtSize(f.size)}</span></span>
                <button type="button" onClick={() => setFiles(files.filter((x) => x !== f))} className="p-1 text-text-3 hover:text-error" aria-label={`Quitar ${f.name}`}><FiX className="w-4 h-4" /></button>
              </li>
            ))}
            <li className="text-[11px] text-text-3 mono text-right">{fmtSize(totalBytes)} de 4 MB</li>
          </ul>
        )}
      </Field>

      {error && <p role="alert" className="text-sm text-error bg-error/10 border border-error/30 rounded-lg px-4 py-3">{error}</p>}

      <button type="submit" disabled={status === "sending"} className="btn btn-ink w-full sm:w-auto disabled:opacity-60">
        {status === "sending" ? "Enviando…" : <>Enviar solicitud <FiSend className="w-4 h-4" /></>}
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
