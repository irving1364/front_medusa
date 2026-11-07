"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { FiMenu, FiX, FiShoppingBag, FiArrowUpRight } from "react-icons/fi"
import { useCart } from "@/context/CartContext"
import { FAMILIES } from "@/lib/catalog"

const NAV_LINKS = [
  { href: "/equipamiento", label: "Equipamiento" },
  { href: "/entornos", label: "Entornos" },
  { href: "/fabricacion", label: "Fabricación" },
  { href: "/contacto", label: "Contacto" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { openCart, itemCount } = useCart()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isMenuOpen])

  const close = () => setIsMenuOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-paper/90 backdrop-blur-md transition-[border-color] duration-300 border-b ${
        isScrolled || isMenuOpen ? "border-line" : "border-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-[72px]">
          <Link href="/" onClick={close} className="relative z-10 flex items-center gap-3" aria-label="Karven, inicio">
            <span className="relative block w-8 h-8">
              <Image src="/images/logo-isotipo-oscuro.png" alt="" fill className="object-contain" sizes="32px" priority />
            </span>
            <span className="relative hidden sm:block h-5 w-[88px]">
              <Image src="/images/logo-logotipo-oscuro.png" alt="Karven" fill className="object-contain object-left" sizes="88px" priority />
            </span>
            <span className="hidden lg:block pl-3 ml-1 border-l border-line text-[10px] uppercase tracking-[0.22em] text-text-3">
              Mobiliario médico · Panamá
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Principal">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/")
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[13px] font-medium tracking-wide transition-colors ${active ? "text-ink" : "text-text-2 hover:text-ink"}`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1.5 left-0 h-px bg-teal transition-all duration-500 ${active ? "w-full" : "w-0"}`} />
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={openCart} className="relative p-2.5 rounded-full text-text-2 hover:text-ink transition-colors" aria-label="Abrir cotización">
              <FiShoppingBag className="w-[18px] h-[18px]" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-teal text-white text-[10px] font-bold flex items-center justify-center tnum">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>
            <Link href="/contacto" className="hidden lg:inline-flex btn btn-ink text-[13px] py-2.5 px-5">
              Cotizar <FiArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="relative z-10 lg:hidden p-2.5 rounded-full text-ink"
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
        className={`fixed inset-0 top-[72px] bg-paper transition-opacity duration-400 lg:hidden overflow-y-auto ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="container-custom py-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="flex items-center justify-between font-display text-4xl text-ink py-4 border-b border-line animate-rise"
              style={{ animationDelay: `${80 + i * 60}ms` }}
            >
              {link.label} <FiArrowUpRight className="w-5 h-5 text-text-3" />
            </Link>
          ))}
          <p className="eyebrow text-text-3 mt-10 mb-4">Familias</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
            {FAMILIES.map((f) => (
              <li key={f.handle}>
                <Link href={`/equipamiento?familia=${f.handle}`} onClick={close} className="text-sm text-text-2 hover:text-ink">
                  <span className="tnum text-text-3 mr-2">{f.number}</span>{f.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contacto" onClick={close} className="btn btn-ink mt-10 w-full">Solicitar cotización</Link>
        </div>
      </div>
    </header>
  )
}
