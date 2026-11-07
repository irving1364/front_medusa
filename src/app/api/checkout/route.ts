import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000").trim()
const PUBLISHABLE_KEY = (process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY || "").trim()
const RESEND_KEY = (process.env.RESEND_API_KEY || "").trim()
const RESEND_FROM = (process.env.RESEND_FROM_EMAIL || "Karven <onboarding@resend.dev>").trim()
const STORE_EMAIL = (process.env.STORE_NOTIFICATION_EMAIL || "karvenmedicalpa@gmail.com").trim()
const STORE_NAME = "Karven - Inmobiliaria Médica"
const STORE_PHONE = "+507 000-0000"
const COUNTRY_CODE = "pa"
const PAYMENT_PROVIDER = "pp_system_default"

interface CheckoutItem { title: string; quantity: number; price: string; handle?: string }

interface CheckoutBody {
  cartId: string
  name: string
  email: string
  phone?: string
  message?: string
  items?: CheckoutItem[]
}

interface PlacedOrder { id: string; display_id: number; status: string; total: number; currency_code: string }

class CheckoutError extends Error {
  constructor(message: string, public step: string, public status = 400) {
    super(message)
  }
}

// ─── Medusa Store API helper ────────────────────────────────────────
async function store<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    method: body === undefined ? "GET" : "POST",
    headers: { "Content-Type": "application/json", "x-publishable-api-key": PUBLISHABLE_KEY },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new CheckoutError(data?.message || `Medusa respondió ${res.status} en ${path}`, path, res.status)
  }
  return data as T
}

function splitName(fullName: string): { first_name: string; last_name: string } {
  const parts = fullName.trim().split(/\s+/)
  const first_name = parts.shift() || fullName
  return { first_name, last_name: parts.join(" ") || "-" }
}

// ─── Place the order in Medusa v2 ───────────────────────────────────
// Flow validated against Medusa 2.13: update cart -> payment collection -> system payment session -> complete.
async function placeOrder(body: CheckoutBody): Promise<PlacedOrder> {
  const { cartId, name, email, phone, message } = body
  const address = { ...splitName(name), address_1: "Solicitud de información", city: "Panamá", country_code: COUNTRY_CODE, phone: phone || undefined }

  await store(`/store/carts/${cartId}`, {
    email,
    shipping_address: address,
    billing_address: address,
    metadata: { inquiry_name: name, inquiry_phone: phone || null, inquiry_message: message || null, source: "web-checkout" },
  })

  const { payment_collection } = await store<{ payment_collection: { id: string } }>(
    "/store/payment-collections",
    { cart_id: cartId }
  )
  await store(`/store/payment-collections/${payment_collection.id}/payment-sessions`, { provider_id: PAYMENT_PROVIDER })

  const result = await store<{ type: "order" | "cart"; order?: PlacedOrder; error?: { message?: string } }>(
    `/store/carts/${cartId}/complete`,
    {}
  )
  if (result.type !== "order" || !result.order) {
    throw new CheckoutError(result.error?.message || "Medusa no pudo completar el carrito", "complete")
  }
  return result.order
}

// ─── Send Email via Resend ──────────────────────────────────────────
async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  if (!RESEND_KEY) {
    console.log(`[Email skipped - no RESEND_API_KEY] To: ${to}, Subject: ${subject}`)
    return false
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: RESEND_FROM, to: [to], subject, html }),
    })
    if (!res.ok) console.error("Resend error:", res.status, await res.text())
    return res.ok
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}

// ─── Email Templates ────────────────────────────────────────────────
const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

function buildItemsList(items?: CheckoutItem[]): string {
  if (!items || items.length === 0) return "<li>Propiedades en carrito</li>"
  return items.map((i) => `<li>${escapeHtml(i.title)} × ${i.quantity} — ${escapeHtml(i.price)}</li>`).join("")
}

function getDateStr(): string {
  return new Date().toLocaleDateString("es-PA", {
    year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
  })
}

function wrap(subtitle: string, content: string): string {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#0a0a0a;color:#f5f0e8;border-radius:12px">
      <div style="text-align:center;padding:20px 0;border-bottom:1px solid #2a2a2a">
        <h1 style="color:#f5f0e8;font-size:24px;margin:0">${STORE_NAME}</h1>
        <p style="color:#808078;font-size:14px">${subtitle}</p>
      </div>
      <div style="padding:20px 0">${content}</div>
      <div style="text-align:center;padding:20px 0;border-top:1px solid #2a2a2a;color:#808078;font-size:12px">
        <p>© ${new Date().getFullYear()} Karven. Todos los derechos reservados.</p>
        <p style="margin-top:4px">Ciudad de Panamá, Panamá</p>
      </div>
    </div>`
}

function storeEmailHtml(body: CheckoutBody, order: PlacedOrder): string {
  const row = (label: string, value: string) =>
    `<tr><td style="color:#808078;padding:8px 0">${label}</td><td style="color:#f5f0e8;padding:8px 0">${value}</td></tr>`
  const email = escapeHtml(body.email)
  return wrap("Nueva Solicitud de Información", `
    <h2 style="color:#f5f0e8;font-size:18px">Datos del Cliente</h2>
    <table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:14px">
      ${row("Nombre:", escapeHtml(body.name))}
      ${row("Email:", `<a href="mailto:${email}" style="color:#f5f0e8">${email}</a>`)}
      ${row("Teléfono:", escapeHtml(body.phone || "No especificado"))}
      ${row("Fecha:", getDateStr())}
      ${row("Orden en Medusa:", `#${order.display_id} (${order.id})`)}
    </table>
    <h2 style="color:#f5f0e8;font-size:18px;margin-top:20px">Propiedades de Interés</h2>
    <ul style="color:#c0c0b8;font-size:14px;line-height:1.8">${buildItemsList(body.items)}</ul>
    ${body.message ? `<h2 style="color:#f5f0e8;font-size:18px;margin-top:20px">Mensaje</h2><p style="color:#c0c0b8;font-size:14px;padding:12px;background:#111;border-radius:8px;border:1px solid #2a2a2a">${escapeHtml(body.message)}</p>` : ""}
  `)
}

function customerEmailHtml(body: CheckoutBody, order: PlacedOrder): string {
  return wrap("Hemos recibido su solicitud", `
    <p style="color:#c0c0b8;font-size:15px;line-height:1.6">Estimado/a <strong style="color:#f5f0e8">${escapeHtml(body.name)}</strong>,</p>
    <p style="color:#c0c0b8;font-size:15px;line-height:1.6">Gracias por contactarnos. Registramos su solicitud con el número <strong style="color:#f5f0e8">#${order.display_id}</strong> sobre las siguientes propiedades:</p>
    <ul style="color:#c0c0b8;font-size:14px;line-height:1.8;padding:12px;background:#111;border-radius:8px;border:1px solid #2a2a2a">${buildItemsList(body.items)}</ul>
    <p style="color:#c0c0b8;font-size:15px;line-height:1.6;margin-top:20px">Uno de nuestros asesores se pondrá en contacto con usted a la brevedad para brindarle toda la información detallada.</p>
    <p style="color:#c0c0b8;font-size:15px;line-height:1.6">Si tiene alguna pregunta adicional, escríbanos a <a href="mailto:${STORE_EMAIL}" style="color:#f5f0e8">${STORE_EMAIL}</a> o llámenos al <strong style="color:#f5f0e8">${STORE_PHONE}</strong>.</p>
  `)
}

// ─── POST Handler ───────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  let body: CheckoutBody
  try {
    body = (await request.json()) as CheckoutBody
  } catch {
    return NextResponse.json({ success: false, error: "Cuerpo de la petición inválido" }, { status: 400 })
  }

  if (!body.cartId || !body.name?.trim() || !body.email?.trim()) {
    return NextResponse.json({ success: false, error: "Faltan campos requeridos" }, { status: 400 })
  }

  try {
    const order = await placeOrder(body)

    const [emailStore, emailCustomer] = await Promise.all([
      sendEmail(STORE_EMAIL, `🆕 Solicitud #${order.display_id} de ${body.name} — ${body.items?.length || 0} propiedades`, storeEmailHtml(body, order)),
      sendEmail(body.email, `Hemos recibido su solicitud #${order.display_id} — Karven`, customerEmailHtml(body, order)),
    ])

    return NextResponse.json({
      success: true,
      order: { id: order.id, display_id: order.display_id, status: order.status },
      notifications: { store: emailStore, customer: emailCustomer },
    })
  } catch (error) {
    const isCheckoutError = error instanceof CheckoutError
    console.error("Checkout error:", isCheckoutError ? `[${error.step}] ${error.message}` : error)
    return NextResponse.json(
      {
        success: false,
        error: isCheckoutError ? error.message : "No se pudo registrar la solicitud. Intente nuevamente.",
      },
      { status: isCheckoutError ? (error.status >= 500 ? 502 : 400) : 500 }
    )
  }
}
