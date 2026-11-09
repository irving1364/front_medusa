import type { NextConfig } from "next"

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
    ],
  },
  async redirects() {
    return [
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
