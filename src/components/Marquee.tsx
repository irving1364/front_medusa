"use client"

import ScrollVelocity from "@/components/reactbits/ScrollVelocity/ScrollVelocity"
import { CATEGORIES } from "@/lib/catalog"

export default function Marquee() {
  const words = CATEGORIES.map((c) => c.short)
  return (
    <div className="border-y border-line bg-paper-2 py-6 overflow-hidden select-none">
      <ScrollVelocity
        texts={[words.join("  ·  ") + "  ·  ", words.slice().reverse().join("  ·  ") + "  ·  "]}
        velocity={40}
        numCopies={4}
        fadeEdges
        outlineAlternate
        className="font-display text-3xl sm:text-5xl leading-[1.3] text-ink/90 whitespace-nowrap pr-6"
      />
    </div>
  )
}
