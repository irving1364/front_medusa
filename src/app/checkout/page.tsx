"use client"

import { useState, type FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FiArrowLeft, FiShoppingBag, FiTrash2, FiSend, FiCheck, FiHome } from "react-icons/fi"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/lib/medusa"

export default function CheckoutPage() {
  const { items, itemCount, subtotal, currencyCode, removeItem, clearCart, isLoading } = useCart()
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    // Simulate sending inquiry
    await new Promise((r) => setTimeout(r, 1500))
    setStatus("sent")
    clearCart()
  }

  // Empty cart
  if (items.length === 0 && status !== "sent") {
    return (
      <div className="pt-20 min-h-screen bg-dark-base">
        <div className="container-custom px-4 sm:px-6 py-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-ivory-glow/10 border border-ivory/20 flex items-center justify-center mb-6">
              <FiShoppingBag className="w-8 h-8 text-ivory/60" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-text-primary mb-3">Carrito vacío</h1>
            <p className="text-text-muted mb-8">Agregue propiedades a su carrito para solicitar información.</p>
            <Link href="/propiedades" className="inline-flex items-center gap-2 px-6 py-3 bg-ivory text-dark-base font-medium rounded-lg hover:bg-ivory-light transition-all">
              <FiHome className="w-4 h-4" /> Ver Propiedades
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Success state
  if (status === "sent") {
    return (
      <div className="pt-20 min-h-screen bg-dark-base">
        <div className="container-custom px-4 sm:px-6 py-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-success/20 border border-success/30 flex items-center justify-center mb-6">
              <FiCheck className="w-8 h-8 text-success" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-text-primary mb-3">¡Solicitud enviada!</h1>
            <p className="text-text-muted mb-2">Hemos recibido su solicitud de información.</p>
            <p className="text-text-muted mb-8">Nuestro equipo se pondrá en contacto con usted a la brevedad.</p>
            <Link href="/propiedades" className="inline-flex items-center gap-2 px-6 py-3 bg-ivory text-dark-base font-medium rounded-lg hover:bg-ivory-light transition-all">
              Seguir explorando
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const inputClass = "w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-lg text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-ivory/50 focus:ring-1 focus:ring-ivory/20 transition-all duration-200"

  return (
    <div className="pt-20 min-h-screen bg-dark-base">
      <div className="border-b border-dark-border">
        <div className="container-custom px-4 sm:px-6 py-4">
          <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-ivory-light transition-colors">
            <FiArrowLeft className="w-4 h-4" /> Volver
          </button>
        </div>
      </div>

      <div className="container-custom px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ivory/20 bg-ivory-glow/10 mb-4">
              <FiShoppingBag className="w-3 h-3 text-ivory" />
              <span className="text-[11px] uppercase tracking-[0.15em] text-ivory-light font-medium">Checkout</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary mb-2">Confirmar Solicitud</h1>
            <p className="text-text-secondary">Revise las propiedades seleccionadas y complete sus datos para recibir información.</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Cart items */}
            <div className="lg:col-span-3 space-y-4">
              <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
                Propiedades seleccionadas ({itemCount})
              </h2>

              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-dark-elevated border border-dark-border">
                  <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-dark-surface">
                    {item.thumbnail ? (
                      <Image src={item.thumbnail} alt={item.title} fill className="object-cover" sizes="64px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-lg font-serif text-ivory/30">{item.title.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/propiedades/${item.product_handle}`} className="text-sm font-medium text-text-primary hover:text-ivory-light transition-colors line-clamp-1">
                      {item.title}
                    </Link>
                    <p className="text-xs text-text-muted mt-1">{formatPrice(item.unit_price, currencyCode)}</p>
                    <p className="text-xs text-text-muted mt-0.5">Cant: {item.quantity}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} disabled={isLoading} className="p-1.5 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-all self-start disabled:opacity-30">
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              <div className="flex justify-between items-center pt-4 border-t border-dark-border">
                <span className="text-sm text-text-muted">Total estimado</span>
                <span className="text-lg font-bold text-text-primary">{formatPrice(subtotal, currencyCode)}</span>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="p-6 rounded-xl bg-dark-elevated border border-dark-border sticky top-28">
                <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-6">Sus Datos</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-text-secondary mb-1.5">Nombre Completo *</label>
                    <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Su nombre" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-text-secondary mb-1.5">Correo Electrónico *</label>
                    <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="correo@ejemplo.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-text-secondary mb-1.5">Teléfono</label>
                    <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="+507 0000-0000" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-text-secondary mb-1.5">Mensaje</label>
                    <textarea id="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputClass} resize-none`} placeholder="¿Algo específico que desee consultar?" />
                  </div>

                  <button type="submit" disabled={status === "sending"}
                    className="w-full px-6 py-3.5 bg-ivory text-dark-base font-semibold rounded-lg hover:bg-ivory-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 glow-ivory-subtle hover:glow-ivory"
                  >
                    {status === "sending" ? (
                      <><div className="w-4 h-4 border-2 border-dark-base border-t-transparent rounded-full animate-spin" /> Enviando...</>
                    ) : (
                      <><FiSend className="w-4 h-4" /> Enviar Solicitud</>
                    )}
                  </button>
                </form>

                <p className="text-[11px] text-text-muted mt-4 text-center">
                  Al enviar, un asesor se comunicará con usted para brindarle información detallada de las propiedades seleccionadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
