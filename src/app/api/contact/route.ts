import { NextResponse } from "next/server"

const RESEND_KEY = (process.env.RESEND_API_KEY || "").trim()
const RESEND_FROM = (process.env.RESEND_FROM_EMAIL || "Karven <onboarding@resend.dev>").trim()
// One or several recipients, comma-separated (e.g. "contact@karvenmedical.com, karvenmedicalpa@gmail.com")
const STORE_EMAILS = (process.env.STORE_NOTIFICATION_EMAIL || "karvenmedicalpa@gmail.com").split(",").map((s) => s.trim()).filter(Boolean)

const MAX_FILES = 5
const MAX_TOTAL_BYTES = 4 * 1024 * 1024
const ALLOWED_TYPES = new Set(["application/pdf", "image/jpeg", "image/png"])

interface ContactFields {
  name: string
  email: string
  phone?: string
  organization?: string
  requestType?: string
  line?: string
  /** legacy field name from the previous form */
  interest?: string
  message: string
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

const fail = (error: string, status = 400) => NextResponse.json({ success: false, error }, { status })

/** Accepts multipart/form-data (with optional attachments) or JSON. */
async function parse(request: Request): Promise<{ fields: ContactFields; files: File[] } | null> {
  const type = request.headers.get("content-type") || ""
  try {
    if (type.includes("multipart/form-data")) {
      const data = await request.formData()
      const str = (k: string) => { const v = data.get(k); return typeof v === "string" ? v : undefined }
      const files = data.getAll("files").filter((f): f is File => f instanceof File && f.size > 0)
      return {
        fields: { name: str("name") || "", email: str("email") || "", phone: str("phone"), organization: str("organization"), requestType: str("requestType"), line: str("line"), message: str("message") || "" },
        files,
      }
    }
    return { fields: (await request.json()) as ContactFields, files: [] }
  } catch {
    return null
  }
}

export async function POST(request: Request) {
  const parsed = await parse(request)
  if (!parsed) return fail("Cuerpo de la petición inválido")
  const { fields, files } = parsed

  const name = fields.name?.trim()
  const email = fields.email?.trim()
  const message = fields.message?.trim()
  const requestType = fields.requestType?.trim() || fields.interest?.trim()
  if (!name || !email || !message) return fail("Faltan campos requeridos")

  if (files.length > MAX_FILES) return fail(`Máximo ${MAX_FILES} adjuntos`)
  if (files.some((f) => !ALLOWED_TYPES.has(f.type) && !/\.(pdf|jpe?g|png)$/i.test(f.name))) return fail("Solo se aceptan adjuntos PDF, JPG o PNG")
  if (files.reduce((n, f) => n + f.size, 0) > MAX_TOTAL_BYTES) return fail("Los adjuntos superan 4 MB en total")

  if (!RESEND_KEY) {
    console.log(`[Contact skipped - no RESEND_API_KEY] ${name} <${email}> (${requestType || "sin tipo"}, ${files.length} adjuntos): ${message.slice(0, 80)}`)
    return NextResponse.json({ success: true, delivered: false })
  }

  const row = (label: string, value?: string) =>
    value ? `<tr><td style="color:#7a828c;padding:6px 12px 6px 0;vertical-align:top;white-space:nowrap">${label}</td><td style="color:#1f2329;padding:6px 0">${escapeHtml(value)}</td></tr>` : ""

  const attachments = await Promise.all(
    files.map(async (f) => ({ filename: f.name, content: Buffer.from(await f.arrayBuffer()).toString("base64") }))
  )

  const html = `
    <meta charset="utf-8">
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f4f6f8;color:#1f2329;border-radius:12px">
      <h1 style="font-size:20px;margin:0 0 4px">Karven Medical — Nueva solicitud desde la web</h1>
      <p style="color:#7a828c;font-size:13px;margin:0 0 20px">${new Date().toLocaleString("es-PA")}</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${row("Tipo de solicitud", requestType)}
        ${row("Línea de mobiliario", fields.line)}
        ${row("Nombre", name)}
        ${row("Correo", email)}
        ${row("Teléfono / WhatsApp", fields.phone)}
        ${row("Institución", fields.organization)}
      </table>
      <h2 style="font-size:15px;margin:20px 0 8px">Mensaje</h2>
      <p style="font-size:14px;line-height:1.6;padding:12px;background:#fff;border:1px solid #e1e5ea;border-radius:8px;white-space:pre-line">${escapeHtml(message)}</p>
      ${files.length ? `<p style="font-size:13px;color:#7a828c;margin-top:16px">Adjuntos (${files.length}): ${files.map((f) => escapeHtml(f.name)).join(", ")}</p>` : ""}
    </div>`

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: STORE_EMAILS,
        reply_to: email,
        subject: `${requestType || "Contacto web"}: ${name}${fields.organization ? ` · ${fields.organization}` : ""}`,
        html,
        ...(attachments.length ? { attachments } : {}),
      }),
    })
    if (!res.ok) {
      console.error("Resend error:", res.status, await res.text())
      return fail("No se pudo enviar el mensaje. Intente nuevamente.", 502)
    }
    return NextResponse.json({ success: true, delivered: true })
  } catch (error) {
    console.error("Contact error:", error)
    return fail("No se pudo enviar el mensaje. Intente nuevamente.", 500)
  }
}
