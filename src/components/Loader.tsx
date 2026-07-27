"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function Loader() {
  const [phase, setPhase] = useState<"entering" | "visible" | "leaving" | "hidden">("entering")

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const enterTimer = setTimeout(() => setPhase("visible"), 100)

    // Wait for everything to render, then fade out
    const leaveTimer = setTimeout(() => {
      setPhase("leaving")
      setTimeout(() => setPhase("hidden"), 800)
    }, 1800)

    // Safety: hide after max 4 seconds
    const safetyTimer = setTimeout(() => setPhase("hidden"), 4000)

    return () => {
      clearTimeout(enterTimer)
      clearTimeout(leaveTimer)
      clearTimeout(safetyTimer)
    }
  }, [])

  if (phase === "hidden") return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark-base transition-all duration-800 ease-in-out ${
        phase === "leaving" ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-ivory-glow rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-ivory-glow rounded-full blur-[120px] animate-pulse delay-500" />
      </div>

      {/* Animated rings */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer ring */}
        <div
          className="absolute w-32 h-32 rounded-full border border-ivory/20 animate-loader-ring"
          style={{ animationDuration: "3s" }}
        />
        {/* Middle ring */}
        <div
          className="absolute w-24 h-24 rounded-full border border-ivory/10 animate-loader-ring-delayed"
          style={{ animationDuration: "3s" }}
        />
        {/* Inner ring */}
        <div
          className="absolute w-16 h-16 rounded-full border border-ivory/5"
          style={{ animation: "pulse 2s ease-in-out infinite" }}
        />

        {/* Isotipo logo */}
        <div className="relative w-20 h-20 animate-loader-pulse">
          <Image
            src="/images/logo-isotipo-blanco.png"
            alt="Karven"
            fill
            className="object-contain"
            sizes="80px"
            priority
          />
        </div>
      </div>

      {/* Brand name */}
      <div className="text-center">
        <h2 className="text-xl font-serif font-bold text-text-primary tracking-wide mb-2">KARVEN</h2>
        <p className="text-[10px] uppercase tracking-[0.3em] text-ivory">Inmobiliaria Médica Premium</p>
      </div>

      {/* Loading dots */}
      <div className="flex items-center gap-1.5 mt-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-ivory/60"
            style={{
              animation: "pulse 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
