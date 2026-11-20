"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { FiCheck, FiDownload, FiEdit3, FiX } from "react-icons/fi"
import { BACKEND, PUBLISHABLE_KEY, dateLong, money, type PortalQuote } from "@/lib/quote-portal"

type Action = "accept" | "changes" | "reject"

const STATUS_COPY: Record<PortalQuote["status"], { label: string; tone: string }> = {
  sent: { label: "Pendiente de su respuesta", tone: "bg-teal/10 text-teal" },
  approved: { label: "Aprobada", tone: "bg-emerald-500/10 text-emerald-600" },
  rejected: { label: "Rechazada", tone: "bg-red-500/10 text-red-500" },
  expired: { label: "Vencida", tone: "bg-amber-500/10 text-amber-600" },
}

const ACTIONS: Record<Action, { title: string; button: string; help: string; commentLabel: string; required: boolean }> = {
  accept: { title: "Aprobar la cotización", button: "Confirmar aprobación", help: "Al aprobar, el equipo le contactará para coordinar el abono inicial y la programación de la fabricación.", commentLabel: "Comentario (opcional)", required: false },
  changes: { title: "Solicitar cambios", button: "Enviar solicitud", help: "Indique qué desea ajustar (medidas, cantidades, materiales…). Le enviaremos una versión actualizada.", commentLabel: "¿Qué desea cambiar?", required: true },
  reject: { title: "Rechazar la cotización", button: "Confirmar rechazo", help: "Si nos indica el motivo, nos ayuda a mejorar nuestras propuestas.", commentLabel: "Motivo (opcional)", required: false },
}

const paragraphs = (t: string | null) => (t || "").split(/\r?\n/).map((l) => l.trim()).filter(Boolean)

/** Customer-facing quote: summary, lines, totals, terms and the approve / changes / reject actions. */
export default function QuotePortal({ token, initial }: { token: string; initial: PortalQuote }) {
  const [quote, setQuote] = useState(initial)
  const [action, setAction] = useState<Action | null>(null)
  const [name, setName] = useState(initial.contact_name || "")
  const [comment, setComment] = useState("")
  const [agree, setAgree] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<Action | null>(null)
  const accent = initial.company.color && /^#[0-9a-f]{6}$/i.test(initial.company.color) ? initial.company.color : "#0E6B78"

  // Count a view only from a real browser (link previews do not run this)
  useEffect(() => { fetch(`${BACKEND}/store/quotes/${encodeURIComponent(token)}`, { headers: { "x-publishable-api-key": PUBLISHABLE_KEY }, cache: "no-store" }).catch(() => {}) }, [token])

  const submit = async () => {
    if (!action) return
    const cfg = ACTIONS[action]
    if (name.trim().length < 2) { setError("Escriba su nombre"); return }
    if (cfg.required && !comment.trim()) { setError("Describa los cambios que necesita"); return }
    if (action === "accept" && !agree) { setError("Confirme que acepta las condiciones"); return }
    setBusy(true); setError(null)
    try {
      const res = await fetch(`${BACKEND}/store/quotes/${encodeURIComponent(token)}/respond`, { method: "POST", headers: { "content-type": "application/json", "x-publishable-api-key": PUBLISHABLE_KEY }, body: JSON.stringify({ action, name: name.trim(), comment: comment.trim() || null }) })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body?.message || "No se pudo enviar su respuesta")
      setQuote(body.quote); setDone(action); setAction(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo enviar su respuesta")
    } finally {
      setBusy(false)
    }
  }

  const st = STATUS_COPY[quote.status]
  const pdf = `${BACKEND}/store/quotes/${encodeURIComponent(token)}/pdf`
  const c = quote.company

  return (
    <div className="bg-paper pt-28 lg:pt-32 pb-20">
      <div className="container-custom max-w-5xl">
        <div className="rule-strong pt-5 flex flex-wrap items-end justify-between gap-6">
          <div>
            {c.logo_url ? <div className="relative h-10 w-40"><Image src={c.logo_url} alt={c.name} fill sizes="160px" className="object-contain object-left" /></div> : <p className="font-display text-2xl text-ink">{c.brand_line}</p>}
            <p className="mt-3 text-sm text-text-2">Cotización para <span className="text-ink font-medium">{quote.customer_name}</span>{quote.contact_name ? ` · Atención: ${quote.contact_name}` : ""}</p>
          </div>
          <div className="text-right">
            <p className="mono text-[11px] uppercase tracking-[0.14em] text-text-3">Cotización N.º</p>
            <p className="font-display text-4xl" style={{ color: accent }}>{quote.number}{quote.version > 1 ? <span className="text-xl text-text-3"> · v{quote.version}</span> : null}</p>
            <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${st.tone}`}>{st.label}</span>
          </div>
        </div>

        {done && (
          <div className="mt-6 rounded-xl glass px-5 py-4 text-sm text-ink">
            {done === "accept" && "Gracias. Registramos su aprobación y el equipo le contactará para los siguientes pasos."}
            {done === "changes" && "Recibimos su solicitud. Le enviaremos una versión actualizada de la cotización."}
            {done === "reject" && "Registramos su respuesta. Gracias por considerarnos."}
          </div>
        )}

        <div className={`mt-8 grid gap-4 sm:grid-cols-2 ${quote.lead_time ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {[["Fecha", dateLong(quote.issue_date)], ["Válida hasta", dateLong(quote.valid_until)], ...(quote.lead_time ? [[quote.lead_time_label, quote.lead_time]] : []), ["Total (ITBMS incl.)", money(quote.totals.total)]].map(([k, v]) => (
            <div key={k} className="card p-5"><p className="mono text-[10px] uppercase tracking-[0.14em] text-text-3">{k}</p><p className="mt-1.5 text-lg text-ink font-medium">{v}</p></div>
          ))}
        </div>

        {quote.intro_text && <p className="mt-8 body-lg text-text-2 whitespace-pre-line">{quote.intro_text}</p>}

        <div className="mt-8 card overflow-hidden">
          <ul className="divide-y divide-line">
            {quote.lines.map((l, i) => (
              <li key={i} className="p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-ink font-medium">{l.ref ? <span className="mono text-xs text-text-3 mr-2">[{l.ref}]</span> : null}{l.title}</p>
                    <p className="mt-1 text-sm text-text-3">{l.quantity} {l.quantity === 1 ? l.unit.toLowerCase().replace(/(es|s)$/, "").replace(/^unidad$/, "unidad") : l.unit.toLowerCase()} × {money(l.unit_price)}{l.discount_pct ? ` · descuento ${l.discount_pct}%` : ""}{l.tax_rate ? ` · ITBMS ${l.tax_rate}%` : ""}</p>
                  </div>
                  <p className="text-ink font-medium tnum">{money(l.amount)}</p>
                </div>
                {l.description && <div className="mt-3 space-y-1.5 text-sm text-text-2">{paragraphs(l.description).map((p, k) => <p key={k}>{p}</p>)}</div>}
              </li>
            ))}
          </ul>
          <div className="border-t border-line bg-paper-2 p-5 sm:p-6">
            <div className="ml-auto max-w-xs space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-text-3">Subtotal</span><span className="tnum">{money(quote.totals.subtotal)}</span></div>
              {quote.totals.discount_total > 0 && <div className="flex justify-between"><span className="text-text-3">Descuentos</span><span className="tnum">-{money(quote.totals.discount_total)}</span></div>}
              <div className="flex justify-between"><span className="text-text-3">ITBMS</span><span className="tnum">{money(quote.totals.tax_total)}</span></div>
              <div className="flex justify-between border-t border-line pt-2 text-base font-semibold text-ink"><span>Total</span><span className="tnum">{money(quote.totals.total)}</span></div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {quote.payment_terms && <div className="card p-6"><p className="eyebrow text-teal">Condiciones de pago</p><ul className="mt-3 space-y-1.5 text-sm text-text-2">{paragraphs(quote.payment_terms).map((p, i) => <li key={i}>• {p}</li>)}</ul></div>}
          {quote.warranty_text && <div className="card p-6"><p className="eyebrow text-teal">Garantía</p><p className="mt-3 text-sm text-text-2">{quote.warranty_text}</p></div>}
          {quote.general_terms && <div className="card p-6 md:col-span-2"><p className="eyebrow text-teal">Condiciones generales</p><ul className="mt-3 space-y-1.5 text-sm text-text-2">{paragraphs(quote.general_terms).map((p, i) => <li key={i}>• {p}</li>)}</ul></div>}
          {c.bank && <div className="card p-6 md:col-span-2"><p className="eyebrow text-teal">Datos bancarios</p><p className="mt-3 text-sm text-text-2">{c.bank.name} · {c.bank.type} · N.º {c.bank.number}{c.bank.holder ? ` · Titular: ${c.bank.holder}` : ""}</p></div>}
        </div>

        <div className="mt-10 panel p-6 sm:p-8">
          {quote.response ? (
            <div>
              <p className="eyebrow text-teal">Su respuesta</p>
              <p className="mt-3 text-ink">{st.label} por {quote.response.name} el {dateLong(quote.response.at)}.</p>
              {quote.response.comment && <p className="mt-2 text-sm text-text-2 whitespace-pre-line">{quote.response.comment}</p>}
            </div>
          ) : quote.can_respond ? (
            action ? (
              <div className="flex flex-col gap-4">
                <p className="display-md text-ink">{ACTIONS[action].title}</p>
                <p className="text-sm text-text-2">{ACTIONS[action].help}</p>
                <label className="flex flex-col gap-1.5 text-sm"><span className="text-text-2">Su nombre</span><input value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl border border-line-2 bg-paper px-4 py-3 text-ink outline-none focus:border-teal" placeholder="Nombre y apellido" /></label>
                <label className="flex flex-col gap-1.5 text-sm"><span className="text-text-2">{ACTIONS[action].commentLabel}</span><textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={4} className="rounded-xl border border-line-2 bg-paper px-4 py-3 text-ink outline-none focus:border-teal" /></label>
                {action === "accept" && <label className="flex items-start gap-2 text-sm text-text-2"><input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1" /> Acepto la cotización {quote.number} por {money(quote.totals.total)} y sus condiciones de pago y generales.</label>}
                {error && <p className="text-sm text-red-500">{error}</p>}
                <div className="flex flex-wrap gap-3">
                  <button onClick={submit} disabled={busy} className="btn btn-teal disabled:opacity-60">{busy ? "Enviando…" : ACTIONS[action].button}</button>
                  <button onClick={() => { setAction(null); setError(null) }} className="btn btn-outline">Volver</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div><p className="display-md text-ink">¿Qué desea hacer?</p><p className="mt-2 text-sm text-text-2">Puede aprobarla aquí mismo o pedirnos ajustes.</p></div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setAction("accept")} className="btn btn-teal"><FiCheck className="w-4 h-4" /> Aprobar</button>
                  <button onClick={() => setAction("changes")} className="btn btn-outline"><FiEdit3 className="w-4 h-4" /> Solicitar cambios</button>
                  <button onClick={() => setAction("reject")} className="inline-flex items-center gap-1.5 px-3 text-sm text-text-3 hover:text-ink"><FiX className="w-4 h-4" /> Rechazar</button>
                </div>
              </div>
            )
          ) : (
            <p className="text-ink">{quote.status === "expired" ? "Esta cotización está vencida. Escríbanos y le enviamos una versión actualizada." : `Esta cotización está ${st.label.toLowerCase()}.`}</p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-line pt-5 text-sm">
            <a href={pdf} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-ink hover:text-teal"><FiDownload className="w-4 h-4" /> Descargar PDF</a>
            {c.whatsapp && <a href={`https://wa.me/507${c.whatsapp.replace(/\D/g, "").slice(0, 8)}?text=${encodeURIComponent(`Hola, tengo una consulta sobre la cotización ${quote.number}.`)}`} target="_blank" rel="noreferrer" className="text-text-2 hover:text-ink">Consultar por WhatsApp</a>}
            {c.email && <a href={`mailto:${c.email}?subject=${encodeURIComponent(`Cotización ${quote.number}`)}`} className="text-text-2 hover:text-ink">{c.email}</a>}
          </div>
        </div>

        <p className="mt-8 text-xs text-text-3">{c.legal_name}{c.ruc ? ` · R.U.C. ${c.ruc}` : ""}{c.address ? ` · ${c.address}` : ""}</p>
      </div>
    </div>
  )
}
