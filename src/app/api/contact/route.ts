import { NextResponse } from "next/server"

const RESEND_KEY = (process.env.RESEND_API_KEY || "").trim()
const RESEND_FROM = (process.env.RESEND_FROM_EMAIL || "Karven <onboarding@resend.dev>").trim()
const STORE_EMAIL = (process.env.STORE_NOTIFICATION_EMAIL || "karvenmedicalpa@gmail.com").trim()

interface ContactBody {
  name: string
  email: string
  phone?: string
  organization?: string
  interest?: string
  message: string
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

export async function POST(request: Request) {
  let body: ContactBody
  try {
    body = (await request.json()) as ContactBody
  } catch {
    return NextResponse.json({ success: false, error: "Cuerpo de la petición inválido" }, { status: 400 })
  }

  const name = body.name?.trim()
  const email = body.email?.trim()
  const message = body.message?.trim()
  if (!name || !email || !message) {
    return NextResponse.json({ success: false, error: "Faltan campos requeridos" }, { status: 400 })
  }
  if (!RESEND_KEY) {
    console.log(`[Contact skipped - no RESEND_API_KEY] ${name} <${email}>: ${message.slice(0, 80)}`)
    return NextResponse.json({ success: true, delivered: false })
  }

  const row = (label: string, value?: string) =>
    value ? `<tr><td style="color:#7a828c;padding:6px 0;vertical-align:top">${label}</td><td style="color:#1f2329;padding:6px 0">${escapeHtml(value)}</td></tr>` : ""

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f6f4ef;color:#1f2329;border-radius:12px">
      <h1 style="font-size:20px;margin:0 0 4px">Karven — Nuevo mensaje de contacto</h1>
      <p style="color:#7a828c;font-size:13px;margin:0 0 20px">${new Date().toLocaleString("es-PA")}</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${row("Nombre", name)}
        ${row("Correo", email)}
        ${row("Teléfono", body.phone)}
        ${row("Institución", body.organization)}
        ${row("Interés", body.interest)}
      </table>
      <h2 style="font-size:15px;margin:20px 0 8px">Mensaje</h2>
      <p style="font-size:14px;line-height:1.6;padding:12px;background:#fff;border:1px solid #d8d3c8;border-radius:8px;white-space:pre-line">${escapeHtml(message)}</p>
    </div>`

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: RESEND_FROM, to: [STORE_EMAIL], reply_to: email, subject: `Contacto web: ${name}${body.organization ? ` · ${body.organization}` : ""}`, html }),
    })
    if (!res.ok) {
      console.error("Resend error:", res.status, await res.text())
      return NextResponse.json({ success: false, error: "No se pudo enviar el mensaje. Intente nuevamente." }, { status: 502 })
    }
    return NextResponse.json({ success: true, delivered: true })
  } catch (error) {
    console.error("Contact error:", error)
    return NextResponse.json({ success: false, error: "No se pudo enviar el mensaje. Intente nuevamente." }, { status: 500 })
  }
}
