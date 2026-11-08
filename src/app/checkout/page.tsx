"use client"

import { useState, type FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { FiArrowLeft, FiShoppingBag, FiTrash2, FiSend, FiCheck, FiMinus, FiPlus } from "react-icons/fi"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/lib/medusa"

export default function CheckoutPage() {
  const { items, itemCount, subtotal, currencyCode, cartId, removeItem, updateItem, resetCart, isLoading } = useCart()

  const [form, setForm] = useState({ name: "", email: "", phone: "", organization: "", message: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [orderNumber, setOrderNumber] = useState<number | null>(null)

  const update = (field: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    setErrorMessage(null)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId,
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: [form.organization && `Institución: ${form.organization}`, form.message].filter(Boolean).join("\n"),
          items: items.map((i) => ({ title: i.title, quantity: i.quantity, price: formatPrice(i.unit_price, currencyCode), handle: i.product_handle })),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "No se pudo enviar la solicitud. Intente nuevamente.")
        setStatus("idle")
        return
      }
      setOrderNumber(data.order?.display_id ?? null)
      setStatus("sent")
      resetCart()
    } catch {
      setErrorMessage("No se pudo conectar con el servidor. Intente nuevamente.")
      setStatus("idle")
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-paper min-h-screen pb-32">
        <PageBand title="Solicitud enviada" />
        <div className="container-custom max-w-xl text-center pt-16">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-soft text-teal">
            <FiCheck className="w-7 h-7" />
          </span>
          <h1 className="display-md mt-8 text-ink">Solicitud enviada</h1>
          <p className="mt-4 text-text-2">
            Registramos su solicitud de cotización{orderNumber ? <> con el número <span className="font-semibold text-ink">#{orderNumber}</span></> : null}.
            Recibirá una confirmación por correo y un asesor le responderá en menos de 48 horas hábiles.
          </p>
          <Link href="/equipamiento" className="btn btn-ink mt-10">Seguir explorando</Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="bg-paper min-h-screen pb-32">
        <PageBand title="Solicitar cotización" />
        <div className="container-custom max-w-xl text-center pt-16">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-paper-2 text-text-3">
            <FiShoppingBag className="w-7 h-7" />
          </span>
          <h1 className="display-md mt-8 text-ink">Su lista está vacía</h1>
          <p className="mt-4 text-text-2">Agregue mobiliario desde el catálogo para solicitar una cotización.</p>
          <Link href="/equipamiento" className="btn btn-ink mt-10">Ver catálogo</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-paper">
      <div className="pt-28 lg:pt-32">
        <div className="container-custom rule-strong pt-5">
          <Link href="/equipamiento" className="inline-flex items-center gap-2 text-xs text-text-3 hover:text-ink transition-colors">
            <FiArrowLeft className="w-3.5 h-3.5" /> Seguir en el catálogo
          </Link>
          <h1 className="display-lg mt-6 text-ink">Solicitar cotización</h1>
          <p className="mt-4 max-w-xl text-text-2">Revise su lista y complete sus datos. Le enviaremos una cotización formal con entrega e instalación incluidas.</p>
        </div>
      </div>

      <div className="container-custom py-12 lg:py-16 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <section className="lg:col-span-7">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-text-3">Artículos ({itemCount})</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {items.map((item) => (
              <li key={item.id} className="flex gap-5 py-5">
                <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-paper-2">
                  {item.thumbnail ? (
                    <Image src={item.thumbnail} alt={item.title} fill className="object-cover" sizes="96px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display text-2xl text-text-3">{item.title.charAt(0)}</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/equipamiento/${item.product_handle}`} className="font-display text-xl text-ink hover:text-teal transition-colors">{item.title}</Link>
                  <p className="text-sm text-text-3 mt-1">{formatPrice(item.unit_price, currencyCode)} c/u</p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="inline-flex items-center border border-line rounded-full">
                      <button onClick={() => updateItem(item.id, item.quantity - 1)} disabled={isLoading} className="p-2 text-text-2 hover:text-ink disabled:opacity-40" aria-label="Restar"><FiMinus className="w-3.5 h-3.5" /></button>
                      <span className="w-8 text-center text-sm font-medium text-ink">{item.quantity}</span>
                      <button onClick={() => updateItem(item.id, item.quantity + 1)} disabled={isLoading} className="p-2 text-text-2 hover:text-ink disabled:opacity-40" aria-label="Sumar"><FiPlus className="w-3.5 h-3.5" /></button>
                    </div>
                    <button onClick={() => removeItem(item.id)} disabled={isLoading} className="inline-flex items-center gap-1.5 text-xs text-text-3 hover:text-error transition-colors disabled:opacity-40">
                      <FiTrash2 className="w-3.5 h-3.5" /> Quitar
                    </button>
                  </div>
                </div>
                <div className="text-right text-sm font-medium text-ink whitespace-nowrap">{formatPrice(item.unit_price * item.quantity, currencyCode)}</div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-sm text-text-2">Subtotal estimado</span>
            <span className="font-display text-3xl text-ink">{formatPrice(subtotal, currencyCode)}</span>
          </div>
          <p className="mt-2 text-xs text-text-3">Precios con ITBMS incluido. La cotización formal incluye transporte, instalación y descuentos por volumen.</p>
        </section>

        <section className="lg:col-span-5">
          <form onSubmit={handleSubmit} className="card p-6 sm:p-8 lg:sticky lg:top-28 space-y-5">
            <h2 className="font-display text-2xl text-ink">Sus datos</h2>
            <Field label="Nombre completo *" id="name"><input id="name" required value={form.name} onChange={(e) => update("name", e.target.value)} className="input" placeholder="Su nombre" /></Field>
            <Field label="Correo electrónico *" id="email"><input id="email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className="input" placeholder="correo@clinica.com" /></Field>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Teléfono" id="phone"><input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="input" placeholder="+507 0000-0000" /></Field>
              <Field label="Institución" id="organization"><input id="organization" value={form.organization} onChange={(e) => update("organization", e.target.value)} className="input" placeholder="Clínica u hospital" /></Field>
            </div>
            <Field label="Comentarios" id="message"><textarea id="message" rows={4} value={form.message} onChange={(e) => update("message", e.target.value)} className="input resize-none" placeholder="Plazos, dirección de entrega, requisitos especiales…" /></Field>

            {errorMessage && <p role="alert" className="text-sm text-error bg-error/10 border border-error/30 rounded-lg px-4 py-3">{errorMessage}</p>}

            <button type="submit" disabled={status === "sending"} className="btn btn-teal w-full disabled:opacity-60">
              {status === "sending" ? "Enviando…" : <>Enviar solicitud <FiSend className="w-4 h-4" /></>}
            </button>
            <p className="text-[11px] text-text-3 text-center">Al enviar, un asesor de Karven se comunicará con usted con la cotización formal.</p>
          </form>
        </section>
      </div>
    </div>
  )
}

function PageBand({ title }: { title: string }) {
  return (
    <div className="pt-28 lg:pt-32">
      <div className="container-custom rule-strong pt-5">
        <p className="eyebrow text-teal">Cotización</p>
        <h1 className="display-lg mt-4 text-ink">{title}</h1>
      </div>
    </div>
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
