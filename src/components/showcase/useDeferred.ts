"use client"

import { useEffect, useState, type RefObject } from "react"

/**
 * Performance helpers for the heavy WebGL/canvas effects on the home.
 * Lighthouse (Moto G, slow 4G) measured ~7 s of Total Blocking Time when every shader
 * compiled during hydration, so effects now wait for idle time, mount only near the
 * viewport, and are skipped entirely on low-power devices.
 */

/** True after hydration + browser idle time (or `delay` ms as a fallback). */
export function useIdle(delay = 1200): boolean {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let done = false
    const finish = () => { if (!done) { done = true; setReady(true) } }
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }
    const t = window.setTimeout(finish, delay)
    if (w.requestIdleCallback) w.requestIdleCallback(finish, { timeout: delay })
    return () => window.clearTimeout(t)
  }, [delay])
  return ready
}

/** True once the element is within `rootMargin` of the viewport (stays true). */
export function useInView<T extends Element>(ref: RefObject<T | null>, rootMargin = "400px"): boolean {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    if (!("IntersectionObserver" in window)) { setInView(true); return }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setInView(true); io.disconnect() }
    }, { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin, inView])
  return inView
}

/**
 * Low-power heuristic: reduced-motion preference, data saver, few cores or little memory.
 * Such devices get static CSS backgrounds instead of shaders.
 */
export function useLowPower(): boolean {
  const [low, setLow] = useState(false)
  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string }; deviceMemory?: number }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const saveData = !!nav.connection?.saveData
    const slowNet = /(^|-)2g$/.test(nav.connection?.effectiveType || "")
    const fewCores = (navigator.hardwareConcurrency || 8) <= 4
    const lowMem = (nav.deviceMemory || 8) <= 4
    const smallScreen = window.innerWidth < 768
    setLow(reduced || saveData || slowNet || (smallScreen && (fewCores || lowMem)))
  }, [])
  return low
}
