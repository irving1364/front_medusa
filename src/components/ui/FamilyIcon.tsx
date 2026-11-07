import type { FamilyIconName } from "@/lib/catalog"

interface FamilyIconProps {
  name: FamilyIconName
  className?: string
}

/** Hand-drawn 1.5px line icons for the seven product families (24×24 grid). */
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
    case "fixed": // examination table
      return (
        <svg {...common}>
          <path d="M3 10h18M4 10v9M20 10v9M8 10V7h8v3" />
          <path d="M4 15h16" />
        </svg>
      )
    case "mobile": // cart with drawers and wheels
      return (
        <svg {...common}>
          <rect x="5" y="5" width="14" height="12" rx="1" />
          <path d="M5 9h14M5 13h14M10 7h4M10 11h4M10 15h4" />
          <circle cx="8" cy="20" r="1.3" />
          <circle cx="16" cy="20" r="1.3" />
        </svg>
      )
    case "surgical": // operating table on column
      return (
        <svg {...common}>
          <path d="M3 9h5l2-2h4l2 2h5" />
          <path d="M12 9v7M8 20h8M9 16h6" />
          <path d="M3 9v2M21 9v2" />
        </svg>
      )
    case "hygiene": // sink with tap
      return (
        <svg {...common}>
          <path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2z" />
          <path d="M12 12V7a2 2 0 0 1 2-2h2M12 8h3" />
        </svg>
      )
    case "lab": // flask on bench
      return (
        <svg {...common}>
          <path d="M9 3h6M10 3v5l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3" />
          <path d="M7.5 15h9" />
        </svg>
      )
    case "pathology": // table with drain
      return (
        <svg {...common}>
          <rect x="3" y="8" width="18" height="6" rx="1" />
          <path d="M6 14v6M18 14v6M12 14v3M10 17h4" />
          <circle cx="12" cy="11" r="1" />
        </svg>
      )
    case "architecture": // wall with handrail
      return (
        <svg {...common}>
          <path d="M4 4v16M20 4v16" />
          <path d="M4 12h16" />
          <path d="M7 12v-2M12 12v-2M17 12v-2" />
          <path d="M4 17h16" />
        </svg>
      )
  }
}
