"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { FiMenu, FiX, FiShoppingBag, FiArrowUpRight } from "react-icons/fi"
import { useCart } from "@/context/CartContext"

const NAV_LINKS = [
  { href: "/productos", label: "Catálogo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { openCart, itemCount } = useCart()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isMenuOpen])

  // Every page opens with a dark band, so the header is light-on-dark at the top
  // and flips to paper-on-scroll.
  const onDark = !isScrolled && !isMenuOpen
  const textColor = onDark ? "text-paper" : "text-ink"
  const mutedColor = onDark ? "text-paper/70 hover:text-paper" : "text-text-2 hover:text-ink"

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        isScrolled && !isMenuOpen
          ? "bg-paper/85 backdrop-blur-xl border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-[76px]">
          <Link href="/" className="relative z-10 flex items-center gap-3" aria-label="Karven, inicio">
            <span className="relative block w-9 h-9">
              <Image
                src={onDark ? "/images/logo-isotipo-blanco.png" : "/images/logo-isotipo-oscuro.png"}
                alt=""
                fill
                className="object-contain"
                sizes="36px"
                priority
              />
            </span>
            <span className="relative hidden sm:block h-6 w-24">
              <Image
                src={onDark ? "/images/logo-logotipo-blanco.png" : "/images/logo-logotipo-oscuro.png"}
                alt="Karven"
                fill
                className="object-contain object-left"
                sizes="96px"
                priority
              />
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/")
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[13px] font-medium tracking-wide transition-colors ${mutedColor} ${active ? (onDark ? "text-paper" : "text-ink") : ""}`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1.5 left-0 h-px bg-teal-3 transition-all duration-500 ${active ? "w-full" : "w-0"}`} />
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={openCart}
              className={`relative p-2.5 rounded-full transition-colors ${mutedColor}`}
              aria-label="Abrir cotización"
            >
              <FiShoppingBag className="w-[18px] h-[18px]" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-teal text-white text-[10px] font-bold flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>

            <Link
              href="/contacto"
              className={`hidden lg:inline-flex btn text-[13px] py-2.5 px-5 ${onDark ? "btn-paper" : "btn-ink"}`}
            >
              Solicitar cotización
              <FiArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className={`relative z-10 lg:hidden p-2.5 rounded-full transition-colors ${textColor}`}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-paper transition-opacity duration-500 lg:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="container-custom h-full flex flex-col justify-center gap-2 pb-16">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="font-display display-lg text-ink py-2 border-b border-line animate-rise"
              style={{ animationDelay: `${120 + i * 80}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-8 flex flex-col gap-3 animate-rise" style={{ animationDelay: "420ms" }}>
            <Link href="/contacto" onClick={() => setIsMenuOpen(false)} className="btn btn-ink">
              Solicitar cotización <FiArrowUpRight className="w-4 h-4" />
            </Link>
            <p className="text-sm text-text-3">Ciudad de Panamá · Lun a Vie 8:00 – 6:00</p>
          </div>
        </div>
      </div>
    </header>
  )
}
