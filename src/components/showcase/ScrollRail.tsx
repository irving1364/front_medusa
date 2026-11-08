"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { formatPrice } from "@/lib/medusa"
import type { Product } from "@/types"

interface ScrollRailProps {
  products: Product[]
  /** Viewport heights of scroll spent per product. */
  perItem?: number
}

/**
 * Scroll-driven depth rail. The stage sticks for `products.length * perItem` viewport heights;
 * window scroll (not the wheel) moves the cards along a 3D rail, then the page keeps going.
 */
export default function ScrollRail({ products, perItem = 0.9 }: ScrollRailProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)
  const count = products.length

  useEffect(() => {
    const outer = outerRef.current
    if (!outer || count === 0) return
    let target = 0
    let current = 0
    let raf = 0
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const read = () => {
      const rect = outer.getBoundingClientRect()
      const travel = outer.offsetHeight - window.innerHeight
      const p = travel > 0 ? -rect.top / travel : 0
      return Math.min(Math.max(p, 0), 1) * (count - 1)
    }

    const paint = (p: number) => {
      const wide = window.innerWidth >= 1024
      const spread = wide ? 420 : 240
      const depth = 260
      const tilt = wide ? 26 : 14
      cardsRef.current.forEach((el, i) => {
        if (!el) return
        const d = i - p
        const a = Math.abs(d)
        el.style.transform = `translate3d(${d * spread}px, 0, ${-a * depth}px) rotateY(${-d * tilt}deg) scale(${1 - a * 0.08})`
        el.style.opacity = String(Math.max(0, 1 - a * 0.42))
        el.style.filter = `blur(${Math.min(a * 3, 6)}px) grayscale(${Math.min(a, 1)})`
        el.style.zIndex = String(100 - Math.round(a * 10))
      })
    }

    const tick = () => {
      current += (target - current) * (reduce ? 1 : 0.14)
      if (Math.abs(target - current) < 0.001) current = target
      paint(current)
      setActive(Math.round(current))
      raf = Math.abs(target - current) > 0.0005 ? requestAnimationFrame(tick) : 0
    }
    const onScroll = () => {
      target = read()
      if (!raf) raf = requestAnimationFrame(tick)
    }
    onScroll()
    current = target
    paint(current)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [count])

  if (count === 0) return null
  const current = products[active]

  return (
    <div ref={outerRef} style={{ height: `${Math.max(count, 1) * perItem * 100 + 100}vh` }}>
      <div className="sticky top-0 h-[100svh] flex flex-col justify-center overflow-hidden">
        <div className="container-custom text-center">
          <p className="eyebrow text-teal justify-center">Referencias</p>
          <h2 className="display-md mt-3 text-ink">Piezas de catálogo.</h2>
        </div>

        <div className="relative mt-6 h-[380px] sm:h-[440px] lg:h-[480px] [perspective:1500px] [perspective-origin:50%_50%]">
          {products.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => { cardsRef.current[i] = el }}
              className="absolute left-1/2 top-1/2 w-[260px] h-[340px] sm:w-[320px] sm:h-[400px] lg:w-[360px] lg:h-[450px] -ml-[130px] -mt-[170px] sm:-ml-[160px] sm:-mt-[200px] lg:-ml-[180px] lg:-mt-[225px] rounded-[20px] overflow-hidden border border-line bg-paper-2 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              {p.thumbnail && <Image src={p.thumbnail} alt={p.title} fill sizes="360px" className="object-cover" />}
              <span className="absolute top-3 left-3 px-2 py-1 rounded-md glass mono text-[10px] text-ink">{p.sku}</span>
            </div>
          ))}
        </div>

        <div className="container-custom mt-6 text-center">
          <p className="mono text-[11px] uppercase tracking-[0.18em] text-text-3">{current.collection?.title} · {current.sku}</p>
          <h3 className="mt-2 font-display text-2xl sm:text-3xl text-ink">{current.title}</h3>
          <p className="mt-1 text-text-2 tnum">{formatPrice(current.price, current.currencyCode)}</p>
          <div className="mt-4 flex items-center justify-center gap-2" aria-hidden="true">
            {products.map((p, i) => (
              <span key={p.id} className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-teal" : "w-3 bg-tint/25"}`} />
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <Link href={`/equipamiento/${current.handle}`} className="link-arrow">Ver ficha</Link>
            <Link href="/equipamiento" className="link-arrow">Todo el equipamiento</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
