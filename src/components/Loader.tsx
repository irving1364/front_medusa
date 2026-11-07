"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function Loader() {
  const [phase, setPhase] = useState<"visible" | "leaving" | "hidden">("visible")

  useEffect(() => {
    const leave = setTimeout(() => setPhase("leaving"), 1100)
    const hide = setTimeout(() => setPhase("hidden"), 1800)
    return () => { clearTimeout(leave); clearTimeout(hide) }
  }, [])

  if (phase === "hidden") return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-ink transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        phase === "leaving" ? "opacity-0 -translate-y-6 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16 animate-fade-in">
          <Image src="/images/logo-isotipo-blanco.png" alt="" fill className="object-contain" sizes="64px" priority />
        </div>
        <div className="w-40 h-px bg-line-ink overflow-hidden">
          <div className="h-full w-full bg-teal-3 origin-left" style={{ animation: "loader-bar 1s cubic-bezier(0.16,1,0.3,1) both" }} />
        </div>
      </div>
    </div>
  )
}
