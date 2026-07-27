"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { FiArrowRight, FiShield, FiHome, FiTrendingUp } from "react-icons/fi"

const stats = [
  { label: "Propiedades Premium", value: "150+", icon: FiHome },
  { label: "Años de Experiencia", value: "12+", icon: FiTrendingUp },
  { label: "Clientes Satisfechos", value: "500+", icon: FiShield },
]

export default function Hero() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      gridRef.current.style.transform = `translate(${x}px, ${y}px)`
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-base via-dark-surface to-dark-base" />

      {/* Animated Grid */}
      <div ref={gridRef} className="absolute inset-0 transition-transform duration-500 ease-out">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(245,240,232,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245,240,232,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Gold Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ivory-glow rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-ivory-glow rounded-full blur-[100px] animate-pulse delay-500" />

      <div className="relative container-custom px-4 sm:px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ivory/20 bg-ivory-glow/10 mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-ivory animate-pulse" />
              <span className="text-xs uppercase tracking-[0.15em] text-ivory-light font-medium">
                Inmobiliaria Médica Premium
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold leading-[1.1] mb-6 animate-fade-in delay-100">
              El <span className="text-gradient-ivory">Futuro</span> de la<br />
              Inversión Médica
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed mb-10 max-w-lg animate-fade-in delay-200">
              Descubra propiedades médicas premium diseñadas para el éxito de su práctica. Espacios que inspiran confianza y excelencia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-300">
              <Link
                href="/propiedades"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-ivory text-dark-base font-semibold rounded-lg hover:bg-ivory-light transition-all duration-300 glow-ivory-subtle hover:glow-ivory"
              >
                Ver Propiedades
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/nosotros"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-dark-border-light text-text-primary font-medium rounded-lg hover:border-ivory/30 hover:text-ivory-light transition-all duration-300"
              >
                Conócenos
              </Link>
            </div>
          </div>

          {/* Right - Logo showcase */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              {/* Animated rings */}
              <div className="absolute -inset-16 rounded-full border border-ivory/10 animate-[spin_25s_linear_infinite]" />
              <div className="absolute -inset-8 rounded-full border border-ivory/5 animate-[spin_35s_linear_infinite_reverse]" />

              {/* Logo display */}
              <div className="relative w-80 h-80 flex flex-col items-center justify-center">
                {/* Isotipo with glow */}
                <div className="relative w-32 h-32 mb-6">
                  <div className="absolute inset-0 bg-ivory-glow rounded-full blur-3xl" />
                  <Image
                    src="/images/logo-isotipo-blanco.png"
                    alt="Karven"
                    fill
                    className="object-contain relative z-10"
                    sizes="128px"
                    priority
                  />
                </div>
                {/* Logotipo */}
                <div className="relative w-48 h-12">
                  <Image
                    src="/images/logo-logotipo-blanco.png"
                    alt="Karven"
                    fill
                    className="object-contain"
                    sizes="192px"
                    priority
                  />
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-ivory mt-4">
                  Excelencia Médica
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 sm:mt-20 pt-12 border-t border-dark-border animate-fade-in delay-400">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="text-center sm:text-left">
                <Icon className="w-5 h-5 text-ivory mb-3 mx-auto sm:mx-0" />
                <div className="text-2xl sm:text-3xl font-bold text-text-primary mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-text-muted">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
