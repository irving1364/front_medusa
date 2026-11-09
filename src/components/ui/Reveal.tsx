"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react"

interface RevealProps {
  children: ReactNode
  /** Seconds before the transition starts once the element is in view */
  delay?: number
  /** Travel distance in px (vertical by default) */
  distance?: number
  className?: string
  direction?: "vertical" | "horizontal"
  /** Seconds between each direct child; when set, the children animate instead of the wrapper */
  stagger?: number
  /** Blur removed while the element settles, in px (0 disables) */
  blur?: number
  /** Seconds the transition lasts */
  duration?: number
  /** Element rendered as the wrapper (use "ul" to stagger list items) */
  as?: "div" | "ul" | "section" | "header"
}

/**
 * Scroll reveal for text blocks and cards: a short rise with the house easing plus a touch of blur.
 * Pure CSS transitions driven by an IntersectionObserver, so it costs nothing until the element is near,
 * and it runs regardless of the OS reduced-motion flag (owner's decision: the motion is subtle and brief).
 * Styles live in globals.css under `[data-reveal]`.
 */
export default function Reveal({
  children,
  delay = 0,
  distance = 22,
  className = "",
  direction = "vertical",
  stagger,
  blur = 4,
  duration = 0.9,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  // Shown immediately when IntersectionObserver is unavailable (never in practice) so nothing stays hidden.
  const [shown, setShown] = useState(() => typeof window !== "undefined" && !("IntersectionObserver" in window))

  useEffect(() => {
    const el = ref.current
    if (!el || shown) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) { setShown(true); io.disconnect() }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [shown])

  const style = {
    "--rv-x": direction === "horizontal" ? `${distance}px` : "0px",
    "--rv-y": direction === "vertical" ? `${distance}px` : "0px",
    "--rv-blur": `${blur}px`,
    "--rv-dur": `${duration}s`,
    "--rv-delay": `${delay}s`,
    "--rv-stagger": `${stagger ?? 0}s`,
  } as CSSProperties

  // All allowed tags share the same attribute set, so typing the dynamic tag as "div" is safe.
  const Tag = as as "div"
  return (
    <Tag ref={ref as RefObject<HTMLDivElement>} className={className} style={style} data-reveal={shown ? "in" : "out"} data-stagger={stagger ? "" : undefined}>
      {children}
    </Tag>
  )
}
