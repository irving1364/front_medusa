"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { FaWhatsapp } from "react-icons/fa"

const PHONE = "50766622199"
const MESSAGE = "Hola, KARVEN Medical. Quisiera información sobre su mobiliario."

/**
 * Floating WhatsApp pill: glass surface matching the header, icon + short label that collapses to
 * the icon alone on small screens. Appears only after the visitor scrolls past the hero so it never
 * competes with the opening of the home, and stays hidden on the contact page where the number is shown.
 */
export default function WhatsAppButton() {
  const pathname = usePathname()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (pathname === "/contacto") return null
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir por WhatsApp"
      className={`group fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex items-center gap-2.5 pl-3 pr-3 sm:pr-4 py-3 rounded-full glass text-ink text-sm font-medium transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-0.5 ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <span className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#25D366] text-white shadow-[0_8px_20px_-8px_rgba(37,211,102,0.8)]">
        <FaWhatsapp className="w-5 h-5" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping [animation-duration:2.4s] group-hover:hidden" aria-hidden="true" />
      </span>
      <span className="hidden sm:inline pr-1">Escríbanos</span>
    </a>
  )
}
