"use client"

import { useState } from "react"
import Image from "next/image"
import { FiPlay } from "react-icons/fi"

export interface GalleryMedia { type: "image" | "video" | "embed"; url: string; alt: string; embed: string | null; poster?: string | null }

/** Project gallery: one large stage plus thumbnails; videos (uploaded or YouTube/Vimeo/Instagram) play in place. */
export default function ProjectGallery({ items, title }: { items: GalleryMedia[]; title: string }) {
  const [index, setIndex] = useState(0)
  if (!items.length) return null
  const current = items[Math.min(index, items.length - 1)]

  return (
    <div>
      <div className="plate plate-color rounded-2xl aspect-[16/10] sm:aspect-[16/9] bg-paper-3">
        {current.type === "image" && (
          <Image key={current.url} src={current.url} alt={current.alt} fill priority sizes="(max-width: 1320px) 100vw, 1280px" className="object-cover" />
        )}
        {current.type === "video" && (
          <video key={current.url} src={current.url} poster={current.poster || undefined} controls playsInline preload="metadata" className="absolute inset-0 h-full w-full object-contain bg-black" aria-label={current.alt} />
        )}
        {current.type === "embed" && current.embed && (
          <iframe key={current.url} src={current.embed} title={current.alt || title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="absolute inset-0 h-full w-full bg-black" />
        )}
      </div>
      {items.length > 1 && (
        <ul className="mt-3 grid grid-cols-5 sm:grid-cols-8 gap-2" aria-label="Más imágenes del proyecto">
          {items.map((m, i) => {
            const active = i === index
            return (
              <li key={`${m.url}-${i}`}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Ver ${m.type === "image" ? "imagen" : "vídeo"} ${i + 1}`}
                  aria-current={active}
                  className={`relative block w-full aspect-square overflow-hidden rounded-lg ring-1 transition-all duration-300 ${active ? "ring-teal opacity-100" : "ring-line-2 opacity-70 hover:opacity-100"}`}
                >
                  {m.type === "image" ? (
                    <Image src={m.url} alt="" fill sizes="120px" className="object-cover" />
                  ) : m.poster ? (
                    <Image src={m.poster} alt="" fill sizes="120px" className="object-cover" />
                  ) : (
                    <span className="absolute inset-0 bg-paper-3" />
                  )}
                  {m.type !== "image" && (
                    <span className="absolute inset-0 flex items-center justify-center text-paper"><span className="flex items-center justify-center w-7 h-7 rounded-full bg-ink/70"><FiPlay className="w-3.5 h-3.5 translate-x-px" /></span></span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}
      {current.alt && current.type === "image" && <p className="mt-3 text-sm text-text-3">{current.alt}</p>}
    </div>
  )
}
