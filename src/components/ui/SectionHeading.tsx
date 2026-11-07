import type { ReactNode } from "react"

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: "left" | "center"
  onDark?: boolean
  className?: string
}

export default function SectionHeading({ eyebrow, title, description, align = "left", onDark = false, className = "" }: SectionHeadingProps) {
  const centered = align === "center"
  return (
    <div className={`${centered ? "text-center mx-auto" : ""} max-w-3xl ${className}`}>
      <p className={`eyebrow ${onDark ? "text-teal-3" : "text-teal"} ${centered ? "justify-center" : ""}`}>{eyebrow}</p>
      <h2 className={`display-md mt-5 text-balance ${"text-ink"}`}>{title}</h2>
      {description && (
        <p className={`mt-5 text-base sm:text-lg leading-relaxed ${onDark ? "text-text-2" : "text-text-2"} ${centered ? "mx-auto" : ""} max-w-2xl`}>
          {description}
        </p>
      )}
    </div>
  )
}
