import type { NextConfig } from "next"

const PRIMARY_HOST = (() => {
  try { return new URL(process.env.NEXT_PUBLIC_SITE_URL || "").hostname } catch { return "" }
})()

/** Redirects every other host (vercel.app previews, www) to the primary domain; no-op until it is configured. */
function hostRedirects() {
  if (!PRIMARY_HOST || PRIMARY_HOST === "localhost" || PRIMARY_HOST.endsWith(".vercel.app")) return []
  const assets = "/:path((?!products/|images/|_next/|api/|favicon).*)"
  return [
    { source: assets, has: [{ type: "host" as const, value: "(?<h>.*\.vercel\.app)" }], destination: `https://${PRIMARY_HOST}/:path`, permanent: true },
    { source: assets, has: [{ type: "host" as const, value: `www.${PRIMARY_HOST}` }], destination: `https://${PRIMARY_HOST}/:path`, permanent: true },
  ]
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Medusa backend on Railway (current and future deployments)
      { protocol: "https", hostname: "**.up.railway.app", pathname: "/**" },
      // Temporary stock imagery until real product photos are uploaded to Medusa
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "http", hostname: "localhost", port: "9000", pathname: "/**" },
      // Product photography committed to this repo and served by Vercel (absolute URLs stored in Medusa)
      { protocol: "https", hostname: "**.vercel.app", pathname: "/products/**" },
      { protocol: "https", hostname: "karvenmedical.com", pathname: "/products/**" },
      { protocol: "https", hostname: "www.karvenmedical.com", pathname: "/products/**" },
      // Instagram feed on the home: Behold resized images, or the Instagram CDN when read through the Graph API
      { protocol: "https", hostname: "behold.pictures", pathname: "/**" },
      { protocol: "https", hostname: "**.behold.pictures", pathname: "/**" },
      { protocol: "https", hostname: "**.cdninstagram.com", pathname: "/**" },
      { protocol: "https", hostname: "**.fbcdn.net", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      // Once the custom domain is live (NEXT_PUBLIC_SITE_URL set in Vercel), the *.vercel.app URL and www
      // redirect permanently to it. Static assets stay reachable on every host because Medusa stores
      // absolute image URLs that still point at vercel.app.
      ...hostRedirects(),
      { source: "/propiedades", destination: "/mobiliario", permanent: true },
      { source: "/propiedades/:handle", destination: "/mobiliario/:handle", permanent: true },
      { source: "/productos", destination: "/mobiliario", permanent: true },
      { source: "/productos/:handle", destination: "/mobiliario/:handle", permanent: true },
      { source: "/minimal", destination: "/", permanent: false },
      { source: "/showcase", destination: "/", permanent: false },
      { source: "/entornos", destination: "/mobiliario", permanent: true },
      // Line pages have their own URLs; the old query form redirects to them
      { source: "/mobiliario", has: [{ type: "query", key: "linea", value: "(?<linea>mobiliario-[a-z]+)" }], destination: "/:linea", permanent: true },
      // Catalogue moved from /equipamiento to /mobiliario (2026-11-09)
      { source: "/equipamiento", destination: "/mobiliario", permanent: true },
      { source: "/equipamiento/:handle", destination: "/mobiliario/:handle", permanent: true },
    ]
  },
}

export default nextConfig
