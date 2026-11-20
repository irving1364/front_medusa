"use client"

import Image from "next/image"
import { FaInstagram } from "react-icons/fa"
import { FiArrowRight, FiArrowUpRight, FiCopy, FiPlay } from "react-icons/fi"
import Reveal from "@/components/ui/Reveal"
import type { InstagramPost } from "@/lib/instagram"

interface InstagramFeedProps {
  posts: InstagramPost[]
  handle: string
  url: string
}

/** Latest Instagram posts in the catalogue's plate treatment: monochrome at rest, colour on hover. */
export default function InstagramFeed({ posts, handle, url }: InstagramFeedProps) {
  if (!posts.length) return null
  return (
    <section className="section pt-0" aria-labelledby="instagram-title">
      <div className="container-custom">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" stagger={0.1}>
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-teal">06 · Fabricación y entregas</p>
            <h2 id="instagram-title" className="display-md mt-3 text-ink">Lo que fabricamos, día a día.</h2>
            <p className="mt-3 text-base sm:text-lg text-text-2">Seguimiento visual de productos, procesos y entregas.</p>
          </div>
          <a href={url} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal hover:gap-2.5 transition-[gap] duration-300">
            <FaInstagram className="w-4 h-4" aria-hidden="true" /> @{handle} <FiArrowRight className="w-3.5 h-3.5" />
          </a>
        </Reveal>

        <Reveal as="ul" className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4" stagger={0.08} distance={24}>
          {posts.slice(0, 5).map((p, i) => (
            <li key={p.id}>
              <a
                href={p.permalink}
                target="_blank"
                rel="noreferrer"
                aria-label={`Ver publicación en Instagram: ${p.alt}`}
                className="group block plate aspect-square rounded-2xl ring-1 ring-line-2 hover:ring-line-3 transition-shadow duration-500"
              >
                {p.blankCover ? (
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-paper-3 via-paper-2 to-paper text-ink" aria-hidden="true">
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-teal text-paper shadow-[0_12px_32px_-14px_rgba(47,177,194,0.9)] transition-transform duration-500 group-hover:scale-105">
                      <FiPlay className="w-5 h-5 translate-x-px" />
                    </span>
                    <span className="eyebrow text-text-3">Reel</span>
                  </span>
                ) : (
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"
                    className="object-cover"
                    loading={i < 3 ? "eager" : "lazy"}
                  />
                )}
                {p.type !== "IMAGE" && !p.blankCover && (
                  <span className="absolute top-2.5 right-2.5 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-ink/70 text-paper backdrop-blur-sm" aria-hidden="true">
                    {p.type === "VIDEO" ? <FiPlay className="w-3.5 h-3.5 translate-x-px" /> : <FiCopy className="w-3.5 h-3.5" />}
                  </span>
                )}
                <span
                  className="absolute inset-0 z-10 flex items-end p-3 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 [transition-timing-function:var(--ease-out-expo)]"
                  aria-hidden="true"
                >
                  <span className="flex items-center gap-1.5 text-paper text-xs font-medium">
                    <FaInstagram className="w-3.5 h-3.5" /> Ver publicación <FiArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </Reveal>
        <p className="mt-6 text-center text-sm text-text-3">Fotografías y videos de piezas verificadas, sin alterar las características de los productos.</p>
      </div>
    </section>
  )
}
