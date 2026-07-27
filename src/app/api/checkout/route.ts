import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000").trim()
const PUBLISHABLE_KEY = (process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY || "").trim()
const RESEND_KEY = (process.env.RESEND_API_KEY || "").trim()
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "karvenmedicalpa@gmail.com").trim()
const ADMIN_PASSWORD_VAR = (process.env.ADMIN_PASSWORD || "").trim()
const STORE_EMAIL = "karvenmedicalpa@gmail.com"
const STORE_NAME = "Karven - Inmobiliaria Médica"

interface CheckoutBody {
  cartId: string
  name: string
  email: string
  phone?: string
  message?: string
  items?: { title: string; quantity: number; price: string; handle?: string }[]
}

// ─── Medusa Admin Auth ──────────────────────────────────────────────
async function getAdminToken(): Promise<string | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/user/emailpass`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD_VAR }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.token || null
  } catch {
    return null
  }
}

// ─── Create Order in Medusa ─────────────────────────────────────────
async function createOrder(cartId: string, customerEmail: string): Promise<{ id?: string; status: string; cartId: string }> {
  const storeHeaders = { "Content-Type": "application/json", "x-publishable-api-key": PUBLISHABLE_KEY }

  // Strategy 1: Set email on cart via store API
  await fetch(`${BACKEND_URL}/store/carts/${cartId}`, {
    method: "POST",
    headers: storeHeaders,
    body: JSON.stringify({ email: customerEmail }),
  })

  // Strategy 2: Try adding payment session + completing via store API
  try {
    const paymentRes = await fetch(`${BACKEND_URL}/store/carts/${cartId}/payment-sessions`, {
      method: "POST",
      headers: storeHeaders,
      body: JSON.stringify({ provider_id: "system" }),
    })
    if (paymentRes.ok) {
      const completeRes = await fetch(`${BACKEND_URL}/store/carts/${cartId}/complete`, {
        method: "POST",
        headers: storeHeaders,
      })
      if (completeRes.ok) {
        const data = await completeRes.json()
        if (data.order?.id) return { id: data.order.id, status: "completed", cartId }
      }
    }
  } catch {
    // Payment session failed, try admin API
  }

  // Strategy 3: Complete via admin API (bypasses payment)
  try {
    const token = await getAdminToken()
    if (token) {
      const adminHeaders = { "Content-Type": "application/json", Authorization: `Bearer ${token}` }

      // Set email via admin API
      await fetch(`${BACKEND_URL}/admin/carts/${cartId}`, {
        method: "POST",
        headers: adminHeaders,
        body: JSON.stringify({ email: customerEmail }),
      })

      // Try to complete via admin API
      const completeRes = await fetch(`${BACKEND_URL}/admin/carts/${cartId}/complete`, {
        method: "POST",
        headers: adminHeaders,
      })
      if (completeRes.ok) {
        const data = await completeRes.json()
        if (data.order?.id) return { id: data.order.id, status: "completed", cartId }
      }

      // Admin complete might not exist in v2, try draft order
      const draftRes = await fetch(`${BACKEND_URL}/admin/draft-orders`, {
        method: "POST",
        headers: adminHeaders,
        body: JSON.stringify({
          email: customerEmail,
          cart_id: cartId,
        }),
      })
      if (draftRes.ok) {
        const data = await draftRes.json()
        if (data.draft_order?.id) return { id: data.draft_order.id, status: "draft", cartId }
      }
    }
  } catch {
    // Admin API also failed
  }

  // Strategy 4: Last resort - get cart details from admin API to at least log it
  try {
    const token = await getAdminToken()
    if (token) {
      const cartRes = await fetch(`${BACKEND_URL}/admin/carts/${cartId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (cartRes.ok) {
        const cartData = await cartRes.json()
        return { id: cartData.cart?.id, status: "inquiry_logged", cartId }
      }
    }
  } catch {
    // Everything failed
  }

  return { status: "inquiry_only", cartId }
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
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Karven <onboarding@resend.dev>",
        to: [to],
        subject,
        html,
      }),
    })
    return res.ok
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}

// ─── Email Templates ────────────────────────────────────────────────
function buildItemsList(items?: { title: string; quantity: number; price: string }[]): string {
  if (!items || items.length === 0) return "<li>Propiedades en carrito</li>"
  return items.map((i) => `<li>${i.title} × ${i.quantity} — ${i.price}</li>`).join("")
}

function getDateStr(): string {
  return new Date().toLocaleDateString("es-PA", {
    year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
  })
}

// ─── POST Handler ───────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body: CheckoutBody = await request.json()
    const { cartId, name, email, phone, message, items } = body

    if (!cartId || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // 1. Create order in Medusa
    const order = await createOrder(cartId, email)

    // 2. Build email content
    const itemsHtml = buildItemsList(items)
    const dateStr = getDateStr()
    const phoneDisplay = phone || "No especificado"

    // 3. Email to store
    const storeHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#0a0a0a;color:#f5f0e8;border-radius:12px">
        <div style="text-align:center;padding:20px 0;border-bottom:1px solid #2a2a2a">
          <h1 style="color:#f5f0e8;font-size:24px;margin:0">${STORE_NAME}</h1>
          <p style="color:#808078;font-size:14px">Nueva Solicitud de Información</p>
        </div>
        <div style="padding:20px 0">
          <h2 style="color:#f5f0e8;font-size:18px">Datos del Cliente</h2>
          <table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:14px">
            <tr><td style="color:#808078;padding:8px 0">Nombre:</td><td style="color:#f5f0e8;padding:8px 0">${name}</td></tr>
            <tr><td style="color:#808078;padding:8px 0">Email:</td><td style="color:#f5f0e8;padding:8px 0"><a href="mailto:${email}" style="color:#f5f0e8">${email}</a></td></tr>
            <tr><td style="color:#808078;padding:8px 0">Teléfono:</td><td style="color:#f5f0e8;padding:8px 0">${phoneDisplay}</td></tr>
            <tr><td style="color:#808078;padding:8px 0">Fecha:</td><td style="color:#f5f0e8;padding:8px 0">${dateStr}</td></tr>
            <tr><td style="color:#808078;padding:8px 0">Orden:</td><td style="color:#f5f0e8;padding:8px 0">${order.id || order.status}${order.id ? ` (${order.status})` : ""}</td></tr>
          </table>
          <h2 style="color:#f5f0e8;font-size:18px;margin-top:20px">Propiedades de Interés</h2>
          <ul style="color:#c0c0b8;font-size:14px;line-height:1.8">${itemsHtml}</ul>
          ${message ? `<h2 style="color:#f5f0e8;font-size:18px;margin-top:20px">Mensaje</h2><p style="color:#c0c0b8;font-size:14px;padding:12px;background:#111;border-radius:8px;border:1px solid #2a2a2a">${message}</p>` : ""}
        </div>
        <div style="text-align:center;padding:20px 0;border-top:1px solid #2a2a2a;color:#808078;font-size:12px">
          <p>© ${new Date().getFullYear()} Karven. Todos los derechos reservados.</p>
        </div>
      </div>`

    // 4. Email to customer
    const customerHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#0a0a0a;color:#f5f0e8;border-radius:12px">
        <div style="text-align:center;padding:20px 0;border-bottom:1px solid #2a2a2a">
          <h1 style="color:#f5f0e8;font-size:24px;margin:0">${STORE_NAME}</h1>
          <p style="color:#808078;font-size:14px">Hemos recibido su solicitud</p>
        </div>
        <div style="padding:20px 0">
          <p style="color:#c0c0b8;font-size:15px;line-height:1.6">Estimado/a <strong style="color:#f5f0e8">${name}</strong>,</p>
          <p style="color:#c0c0b8;font-size:15px;line-height:1.6">Gracias por contactarnos. Hemos recibido su solicitud de información sobre las siguientes propiedades:</p>
          <ul style="color:#c0c0b8;font-size:14px;line-height:1.8;padding:12px;background:#111;border-radius:8px;border:1px solid #2a2a2a">${itemsHtml}</ul>
          <p style="color:#c0c0b8;font-size:15px;line-height:1.6;margin-top:20px">Uno de nuestros asesores se pondrá en contacto con usted a la brevedad para brindarle toda la información detallada.</p>
          <p style="color:#c0c0b8;font-size:15px;line-height:1.6">Si tiene alguna pregunta adicional, no dude en escribirnos a <a href="mailto:${STORE_EMAIL}" style="color:#f5f0e8">${STORE_EMAIL}</a> o llamarnos al <strong style="color:#f5f0e8">+507 000-0000</strong>.</p>
        </div>
        <div style="text-align:center;padding:20px 0;border-top:1px solid #2a2a2a;color:#808078;font-size:12px">
          <p>© ${new Date().getFullYear()} Karven. Todos los derechos reservados.</p>
          <p style="margin-top:4px">Ciudad de Panamá, Panamá</p>
        </div>
      </div>`

    const [emailStore, emailCustomer] = await Promise.all([
      sendEmail(STORE_EMAIL, `🆕 Nueva solicitud de ${name} — ${items?.length || 0} propiedades`, storeHtml),
      sendEmail(email, "Hemos recibido su solicitud — Karven", customerHtml),
    ])

    return NextResponse.json({
      success: true,
      order,
      notifications: { store: emailStore, customer: emailCustomer },
    })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Internal error" },
      { status: 500 }
    )
  }
}
