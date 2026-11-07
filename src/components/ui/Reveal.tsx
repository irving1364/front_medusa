"use client"

import type { ReactNode } from "react"
import AnimatedContent from "@/components/reactbits/AnimatedContent/AnimatedContent"

interface RevealProps {
  children: ReactNode
  delay?: number
  distance?: number
  className?: string
  direction?: "vertical" | "horizontal"
  stagger?: number
}

/** Thin wrapper around React Bits AnimatedContent with the site's house easing. */
export default function Reveal({ children, delay = 0, distance = 40, className, direction = "vertical", stagger }: RevealProps) {
  return (
    <AnimatedContent
      distance={distance}
      direction={direction}
      duration={1.1}
      ease="power3.out"
      initialOpacity={0}
      animateOpacity
      threshold={0.15}
      delay={delay}
      stagger={stagger}
      once
      className={className}
    >
      {children}
    </AnimatedContent>
  )
}
