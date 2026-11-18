import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPortalQuote, money } from "@/lib/quote-portal"
import QuotePortal from "./QuotePortal"

type Params = Promise<{ token: string }>

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { token } = await params
  const q = await getPortalQuote(token)
  if (!q) return { title: "Cotización no encontrada", robots: { index: false, follow: false } }
  const title = `Cotización ${q.number} · ${q.company.name}`
  const description = `Cotización para ${q.customer_name} por ${money(q.totals.total)} (ITBMS incluido). Revísela y apruébela en línea.`
  return { title: { absolute: title }, description, robots: { index: false, follow: false }, openGraph: { title, description, type: "website" } }
}

/** Private customer page for a quote: details, PDF, approve / request changes / reject. Reached only through its link. */
export default async function QuotePortalPage({ params }: { params: Params }) {
  const { token } = await params
  const quote = await getPortalQuote(token)
  if (!quote) notFound()
  return <QuotePortal token={token} initial={quote} />
}
