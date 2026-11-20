/** Public quote (customer portal) as returned by GET /store/quotes/:token. */
export interface PortalQuote {
  number: string
  version: number
  status: "sent" | "approved" | "rejected" | "expired"
  can_respond: boolean
  customer_name: string
  contact_name: string | null
  customer_ruc: string | null
  issue_date: string
  valid_until: string | null
  lead_time: string | null
  lead_time_label: string
  intro_text: string | null
  lines: { ref: string | null; title: string; description: string | null; quantity: number; unit: string; unit_price: number; discount_pct: number; tax_rate: number; amount: number }[]
  totals: { subtotal: number; discount_total: number; tax_total: number; total: number }
  warranty_text: string | null
  payment_terms: string | null
  general_terms: string | null
  response: { at: string; name: string; comment: string | null } | null
  company: { name: string; brand_line: string; legal_name: string | null; ruc: string | null; address: string | null; email: string | null; whatsapp: string | null; website: string | null; logo_url: string | null; color: string | null; bank: { name: string | null; holder: string | null; type: string | null; number: string } | null }
}

export const BACKEND = (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000").trim().replace(/\/$/, "")
export const PUBLISHABLE_KEY = (process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY || "").trim()

export const money = (n: number) => { const v = Math.round((Number(n) || 0) * 100) / 100; const [i, f = ""] = Math.abs(v).toFixed(2).split("."); return `B/. ${v < 0 ? "-" : ""}${i.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${f}` }
export const dateLong = (d: string | null | undefined) => (d ? new Intl.DateTimeFormat("es-PA", { day: "numeric", month: "long", year: "numeric", timeZone: "America/Panama" }).format(new Date(d)) : "—")

/** Server-side read without counting a view (link previews from WhatsApp also hit the page). */
export async function getPortalQuote(token: string): Promise<PortalQuote | null> {
  try {
    const res = await fetch(`${(process.env.MEDUSA_BACKEND_URL || BACKEND).replace(/\/$/, "")}/store/quotes/${encodeURIComponent(token)}?track=0`, { headers: { "x-publishable-api-key": PUBLISHABLE_KEY }, cache: "no-store" })
    if (!res.ok) return null
    return ((await res.json()) as { quote: PortalQuote }).quote
  } catch {
    return null
  }
}
