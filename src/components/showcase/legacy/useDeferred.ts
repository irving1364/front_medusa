"use client"

import { useEffect, useState, useSyncExternalStore, type RefObject } from "react"

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
  // Browsers without IntersectionObserver (none in practice) mount immediately.
  const [inView, setInView] = useState(() => typeof window !== "undefined" && !("IntersectionObserver" in window))
  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setInView(true); io.disconnect() }
    }, { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin, inView])
  return inView
}

/**
 * True when WebGL is missing or rasterised in software (SwiftShader, llvmpipe, Mesa offscreen…).
 * Full-screen fragment shaders on a software renderer cost 100+ ms per frame on the main thread,
 * so those machines (headless browsers, VMs, very old laptops) get the static CSS fallback.
 */
function readSoftwareGpu(): boolean {
  try {
    const canvas = document.createElement("canvas")
    const gl = (canvas.getContext("webgl2") || canvas.getContext("webgl")) as WebGLRenderingContext | null
    if (!gl) return true
    const info = gl.getExtension("WEBGL_debug_renderer_info")
    const renderer = String(info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER))
    gl.getExtension("WEBGL_lose_context")?.loseContext()
    return /swiftshader|llvmpipe|softpipe|software|mesa offscreen|microsoft basic render/i.test(renderer)
  } catch {
    return true
  }
}

/**
 * Low-power heuristic: data saver, slow network, few cores/little memory on small screens, or a software GPU.
 * prefers-reduced-motion is deliberately NOT part of it: the owner wants the hero effects to show, and the
 * individual components already freeze their own motion when the visitor asks for reduced motion.
 * Such devices get static CSS backgrounds instead of shaders.
 */
let lowPowerCache: boolean | null = null

function readLowPower(): boolean {
  if (lowPowerCache !== null) return lowPowerCache
  const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string }; deviceMemory?: number }
  const saveData = !!nav.connection?.saveData
  const slowNet = /(^|-)2g$/.test(nav.connection?.effectiveType || "")
  const fewCores = (navigator.hardwareConcurrency || 8) <= 4
  const lowMem = (nav.deviceMemory || 8) <= 4
  const smallScreen = window.innerWidth < 768
  lowPowerCache = saveData || slowNet || (smallScreen && (fewCores || lowMem)) || readSoftwareGpu()
  return lowPowerCache
}
const noopSubscribe = () => () => {}

export function useLowPower(): boolean {
  // Evaluated once on the client; the server snapshot is "capable" so SSR markup matches the common case.
  return useSyncExternalStore(noopSubscribe, readLowPower, () => false)
}
