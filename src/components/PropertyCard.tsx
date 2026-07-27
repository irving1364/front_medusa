"use client"

import Link from "next/link"
import Image from "next/image"
import { FiMapPin, FiMaximize2, FiGrid, FiDroplet, FiArrowRight } from "react-icons/fi"
import type { Property } from "@/types"

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { title, subtitle, handle, thumbnail, price, currencyCode, location, area, bedrooms, bathrooms, type, status } = property

  return (
    <Link
      href={`/propiedades/${handle}`}
      className="group block rounded-xl overflow-hidden bg-dark-elevated border border-dark-border hover:border-ivory/20 transition-all duration-500 hover-lift"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-dark-elevated to-dark-surface flex items-center justify-center">
            <div className="text-4xl font-serif text-ivory/30">{title.charAt(0)}</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-base/80 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider ${
            status === "disponible"
              ? "bg-success/20 text-success border border-success/30"
              : status === "vendido"
              ? "bg-error/20 text-error border border-error/30"
              : "bg-warning/20 text-warning border border-warning/30"
          }`}>
            {status}
          </span>
        </div>
        {type && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider bg-dark-base/60 text-text-secondary border border-dark-border backdrop-blur-sm">
              {type}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-xl font-bold text-text-primary">
            {currencyCode === "PAB" ? "B/." : "$"}{price.toLocaleString("es-PA")}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-text-primary group-hover:text-ivory-light transition-colors mb-1 line-clamp-1">{title}</h3>
        {subtitle && <p className="text-sm text-text-muted mb-3 line-clamp-1">{subtitle}</p>}

        {location && (
          <div className="flex items-center gap-1.5 text-xs text-text-muted mb-4">
            <FiMapPin className="w-3.5 h-3.5 text-ivory/60 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-dark-border">
          {area && (
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <FiMaximize2 className="w-3.5 h-3.5 text-ivory/60 shrink-0" />
              <span>{area} m&sup2;</span>
            </div>
          )}
          {bedrooms != null && (
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <FiGrid className="w-3.5 h-3.5 text-ivory/60 shrink-0" />
              <span>{bedrooms} hab</span>
            </div>
          )}
          {bathrooms != null && (
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <FiDroplet className="w-3.5 h-3.5 text-ivory/60 shrink-0" />
              <span>{bathrooms} ba&ntilde;os</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center gap-1 text-xs font-medium text-ivory opacity-0 group-hover:opacity-100 transition-opacity">
          Ver detalles
          <FiArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
