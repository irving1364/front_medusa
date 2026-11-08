import type { LineCode } from "@/lib/categories"

interface FamilyIconProps {
  /** Product line: MED (medical), VET (veterinary), TEC (technical) */
  name: LineCode
  className?: string
}

/** Hand-drawn 1.5px line icons for the three product lines (24×24 grid). */
export default function FamilyIcon({ name, className = "w-6 h-6" }: FamilyIconProps) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  }
  switch (name) {
    case "VET": // paw
      return (
        <svg {...common}>
          <circle cx="7" cy="8" r="1.8" /><circle cx="12" cy="6" r="1.8" /><circle cx="17" cy="8" r="1.8" />
          <path d="M12 11c-2.6 0-5.5 2.6-5.5 5.1 0 1.6 1.2 2.4 2.6 2.4 1.1 0 1.9-.6 2.9-.6s1.8.6 2.9.6c1.4 0 2.6-.8 2.6-2.4C17.5 13.6 14.6 11 12 11Z" />
        </svg>
      )
    case "TEC": // bench with sink
      return (
        <svg {...common}>
          <path d="M3 10h18M4 10v9M20 10v9M4 15h16" />
          <path d="M9 10V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M12 7V4" />
        </svg>
      )
    default: // MED: examination bed
      return (
        <svg {...common}>
          <path d="M3 10h18M4 10v9M20 10v9M8 10V7h8v3" />
          <path d="M4 15h16" />
        </svg>
      )
  }
}
