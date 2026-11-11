"use client"

import Image from "next/image"
import { FaInstagram } from "react-icons/fa"
import { FiArrowUpRight, FiCopy, FiPlay } from "react-icons/fi"
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
        <Reveal className="rule-strong pt-6 grid lg:grid-cols-12 gap-6 items-end" stagger={0.15}>
          <div className="lg:col-span-8">
            <p className="eyebrow text-teal">Instagram</p>
            <h2 id="instagram-title" className="display-md mt-4 text-ink">Lo que fabricamos, día a día.</h2>
            <p className="subtitle mt-3 max-w-2xl">Piezas en taller, entregas e instalaciones. Síganos en <span className="text-ink">@{handle}</span>.</p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <a href={url} target="_blank" rel="noreferrer" className="link-arrow">
              <FaInstagram className="w-4 h-4" aria-hidden="true" /> Seguir en Instagram
            </a>
          </div>
        </Reveal>

        <Reveal as="ul" className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4" stagger={0.08} distance={24}>
          {posts.map((p, i) => (
            <li key={p.id}>
              <a
                href={p.permalink}
                target="_blank"
                rel="noreferrer"
                aria-label={`Ver publicación en Instagram: ${p.alt}`}
                className="group block plate aspect-square rounded-2xl ring-1 ring-line-2 hover:ring-line-3 transition-shadow duration-500"
              >
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
                  className="object-cover"
                  loading={i < 3 ? "eager" : "lazy"}
                />
                {p.type !== "IMAGE" && (
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
      </div>
    </section>
  )
}
