import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000").trim()
const PUBLISHABLE_KEY = (process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY || "").trim()
const RESEND_KEY = (process.env.RESEND_API_KEY || "").trim()
const RESEND_FROM = (process.env.RESEND_FROM_EMAIL || "Karven <onboarding@resend.dev>").trim()
// One or several recipients, comma-separated (e.g. "contact@karvenmedical.com, karvenmedicalpa@gmail.com")
const STORE_EMAILS = (process.env.STORE_NOTIFICATION_EMAIL || "karvenmedicalpa@gmail.com").split(",").map((s) => s.trim()).filter(Boolean)
const STORE_EMAIL = STORE_EMAILS[0]
const STORE_NAME = "KARVEN Medical"
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://karvenmedical.com").replace(/\/$/, "")
const STORE_PHONE = "+507 6662-2199"
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

  // Medusa refuses to complete a cart with shippable items unless a shipping method is chosen.
  // Quotes carry a single zero-cost option ("Entrega e instalación (se cotiza)", see scripts/ensure-shipping-option.mjs).
  const { shipping_options } = await store<{ shipping_options: { id: string; name: string }[] }>(`/store/shipping-options?cart_id=${cartId}`)
  const option = shipping_options.find((o) => /cotiza/i.test(o.name)) || shipping_options[0]
  if (!option) throw new CheckoutError("No hay una opción de envío configurada en Medusa para esta región", "shipping")
  await store(`/store/carts/${cartId}/shipping-methods`, { option_id: option.id })

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
async function sendEmail(to: string | string[], subject: string, html: string): Promise<boolean> {
  if (!RESEND_KEY) {
    console.log(`[Email skipped - no RESEND_API_KEY] To: ${to}, Subject: ${subject}`)
    return false
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: RESEND_FROM, to: Array.isArray(to) ? to : [to], subject, html }),
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
  if (!items || items.length === 0) return "<li>Artículos en la lista</li>"
  return items.map((i) => `<li>${escapeHtml(i.title)} × ${i.quantity} — ${escapeHtml(i.price)}</li>`).join("")
}

function getDateStr(): string {
  return new Date().toLocaleDateString("es-PA", {
    year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
  })
}

/**
 * Plain, letter-like layout: white background, system font, no banners or colour blocks.
 * Gmail files visually "designed" mail under Promotions; sober transactional mail lands in Primary.
 */
function wrap(subtitle: string, content: string): string {
  return `
    <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:8px 4px;color:#1f2329;font-size:15px;line-height:1.6">
      <p style="margin:0 0 18px;color:#6b7280;font-size:13px">${STORE_NAME} · ${subtitle}</p>
      ${content}
      <p style="margin:28px 0 0">Atentamente,<br><strong>Equipo ${STORE_NAME}</strong><br>
        <span style="color:#6b7280">WhatsApp ${STORE_PHONE} · <a href="mailto:${STORE_EMAIL}" style="color:#1f2329">${STORE_EMAIL}</a> · <a href="${SITE_URL}" style="color:#1f2329">${SITE_URL.replace(/^https?:\/\//, "")}</a></span></p>
      <p style="margin:24px 0 0;color:#9ca3af;font-size:12px">Fabricado en Panamá por FABMETAL · Calle Hato Azul, casa N.º 43, La Cabima, Alcalde Díaz, Ciudad de Panamá</p>
    </div>`
}

function storeEmailHtml(body: CheckoutBody, order: PlacedOrder): string {
  const row = (label: string, value: string) =>
    `<tr><td style="color:#6b7280;padding:4px 12px 4px 0;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:4px 0">${value}</td></tr>`
  const email = escapeHtml(body.email)
  return wrap("Nueva solicitud de cotización", `
    <p style="margin:0 0 12px"><strong>Cotización #${order.display_id}</strong> · ${getDateStr()}</p>
    <table style="border-collapse:collapse;font-size:14px;margin:0 0 16px">
      ${row("Cliente", escapeHtml(body.name))}
      ${row("Correo", `<a href="mailto:${email}" style="color:#1f2329">${email}</a>`)}
      ${row("Teléfono", escapeHtml(body.phone || "No especificado"))}
      ${row("Orden en Medusa", `#${order.display_id} (${order.id})`)}
    </table>
    <p style="margin:0 0 6px"><strong>Piezas solicitadas</strong></p>
    <ul style="margin:0 0 16px;padding-left:20px;font-size:14px">${buildItemsList(body.items)}</ul>
    ${body.message ? `<p style="margin:0 0 6px"><strong>Mensaje del cliente</strong></p><p style="margin:0;font-size:14px;white-space:pre-line">${escapeHtml(body.message)}</p>` : ""}
  `)
}

function customerEmailHtml(body: CheckoutBody, order: PlacedOrder): string {
  return wrap("Solicitud de cotización", `
    <p style="margin:0 0 14px">Estimado/a ${escapeHtml(body.name)}:</p>
    <p style="margin:0 0 14px">Gracias por escribirnos. Registramos su solicitud de cotización con el número <strong>#${order.display_id}</strong> para las siguientes piezas:</p>
    <ul style="margin:0 0 14px;padding-left:20px">${buildItemsList(body.items)}</ul>
    <p style="margin:0 0 14px">En las próximas horas hábiles un asesor revisará las medidas y cantidades y le enviará la cotización formal, con plazo de fabricación, entrega e instalación en Panamá.</p>
    <p style="margin:0">Si desea adelantar planos, fotografías o alguna especificación, puede responder directamente a este correo.</p>
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
      sendEmail(STORE_EMAILS, `Cotización #${order.display_id} de ${body.name} (${body.items?.length || 0} ${body.items?.length === 1 ? "pieza" : "piezas"})`, storeEmailHtml(body, order)),
      sendEmail(body.email, `Recibimos su solicitud de cotización #${order.display_id}`, customerEmailHtml(body, order)),
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
