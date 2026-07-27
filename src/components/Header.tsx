"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { FiMenu, FiX, FiPhone, FiShoppingBag } from "react-icons/fi"
import { useCart } from "@/context/CartContext"

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/propiedades", label: "Propiedades" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { openCart, itemCount } = useCart()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isMobileMenuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-dark-base/90 backdrop-blur-xl border-b border-dark-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - using white logotipo */}
          <Link href="/" className="relative z-10 flex items-center gap-3 group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src="/images/logo-isotipo-blanco.png"
                alt="Karven"
                fill
                className="object-contain"
                sizes="48px"
              />
            </div>
            <div className="hidden sm:block relative h-8 w-28">
              <Image
                src="/images/logo-logotipo-blanco.png"
                alt="Karven"
                fill
                className="object-contain object-left"
                sizes="112px"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 rounded-lg hover:bg-ivory-glow/10"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-lg text-text-secondary hover:text-ivory-light hover:bg-ivory-glow/10 transition-all"
              aria-label="Abrir carrito"
            >
              <FiShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-ivory text-dark-base text-[10px] font-bold flex items-center justify-center shadow-lg shadow-ivory-glow">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>

            <a href="tel:+50700000000" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
              <FiPhone className="w-4 h-4 text-ivory" />
              <span>+507 000-0000</span>
            </a>
            <Link
              href="/contacto"
              className="px-5 py-2.5 text-sm font-medium text-dark-base bg-ivory hover:bg-ivory-light transition-all duration-300 rounded-lg"
            >
              Solicitar Información
            </Link>
          </div>

          {/* Mobile Right */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 text-text-secondary hover:text-ivory-light transition-colors"
              aria-label="Abrir carrito"
            >
              <FiShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-ivory text-dark-base text-[9px] font-bold flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-10 p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-dark-base/95 backdrop-blur-lg transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {/* Mobile menu logo */}
          <div className="relative w-16 h-16 mb-4">
            <Image
              src="/images/logo-isotipo-blanco.png"
              alt="Karven"
              fill
              className="object-contain"
              sizes="64px"
            />
          </div>

          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl text-text-secondary hover:text-text-primary transition-colors animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 px-8 py-3 text-base font-medium text-dark-base bg-ivory hover:bg-ivory-light transition-all duration-300 rounded-lg"
          >
            Solicitar Información
          </Link>
          <a href="tel:+50700000000" className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
            <FiPhone className="w-4 h-4" />
            +507 000-0000
          </a>
        </div>
      </div>
    </header>
  )
}
