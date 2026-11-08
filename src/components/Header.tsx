"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { FiMenu, FiX, FiShoppingBag, FiArrowUpRight, FiSun, FiMoon } from "react-icons/fi"
import { useCart } from "@/context/CartContext"
import { useCategories } from "@/context/CategoriesContext"
import { useTheme, setTheme } from "@/lib/theme"

const NAV_LINKS = [
  { href: "/fabricacion", label: "Fabricación a medida" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
]

/** Floating glass bar, detached from the page edge once the user scrolls. */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { openCart, itemCount } = useCart()
  const pathname = usePathname()
  const { parents } = useCategories()
  const theme = useTheme()
  const logo = theme === "light" ? "oscuro" : "blanco"

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isMenuOpen])

  const close = () => setIsMenuOpen(false)
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light")

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div className={`container-custom transition-[padding] duration-500 ${isScrolled ? "pt-3" : "pt-4"}`}>
        <div
          className={`pointer-events-auto relative flex items-center justify-between h-14 px-2 sm:px-3 rounded-2xl transition-[background-color,border-color,box-shadow] duration-500 border ${
            isScrolled || isMenuOpen ? "glass" : "bg-transparent border-transparent"
          }`}
        >
          <Link href="/" onClick={close} className="relative z-10 flex items-center gap-3 pl-2" aria-label="Karven, inicio">
            <span className="relative block w-7 h-7">
              <Image src={`/images/logo-isotipo-${theme === "light" ? "color" : "blanco"}.png`} alt="" fill className="object-contain" sizes="28px" priority />
            </span>
            <span className="relative hidden sm:block h-4 w-[82px]">
              <Image src={`/images/logo-logotipo-${logo}.png`} alt="Karven" fill className="object-contain object-left" sizes="82px" priority />
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2" aria-label="Principal">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/")
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                    active ? "text-ink bg-tint/[0.06]" : "text-text-2 hover:text-ink hover:bg-tint/[0.04]"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-1">
            {(
              <button onClick={toggleTheme} className="p-2.5 rounded-lg text-text-2 hover:text-ink hover:bg-tint/[0.05] transition-colors" aria-label={theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}>
                {theme === "light" ? <FiMoon className="w-[17px] h-[17px]" /> : <FiSun className="w-[17px] h-[17px]" />}
              </button>
            )}
            <button onClick={openCart} className="relative p-2.5 rounded-lg text-text-2 hover:text-ink hover:bg-tint/[0.05] transition-colors" aria-label="Abrir cotización">
              <FiShoppingBag className="w-[18px] h-[18px]" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-teal text-paper text-[10px] font-bold flex items-center justify-center tnum">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>
            <Link href="/contacto" className="hidden lg:inline-flex btn btn-teal text-[13px] py-2 px-4 rounded-lg">
              Cotizar <FiArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="relative z-10 lg:hidden p-2.5 rounded-lg text-ink hover:bg-tint/[0.05]"
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
        className={`fixed inset-0 top-0 -z-10 bg-paper/95 backdrop-blur-xl transition-opacity duration-400 lg:hidden overflow-y-auto ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="container-custom pt-24 pb-10">
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
          <p className="eyebrow text-text-3 mt-10 mb-4">Líneas de producto</p>
          <ul className="space-y-3">
            {parents.map((p) => (
              <li key={p.handle}>
                <Link href={`/equipamiento?linea=`} onClick={close} className="text-sm text-text-2 hover:text-ink">
                  <span className="mono text-text-3 mr-2">{p.number}</span>{p.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contacto" onClick={close} className="btn btn-teal mt-10 w-full">Solicitar cotización</Link>
        </div>
      </div>
    </header>
  )
}
