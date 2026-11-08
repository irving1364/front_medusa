import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Medusa backend on Railway (current and future deployments)
      { protocol: "https", hostname: "**.up.railway.app", pathname: "/**" },
      // Temporary stock imagery until real product photos are uploaded to Medusa
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "http", hostname: "localhost", port: "9000", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      { source: "/propiedades", destination: "/equipamiento", permanent: true },
      { source: "/propiedades/:handle", destination: "/equipamiento/:handle", permanent: true },
      { source: "/productos", destination: "/equipamiento", permanent: true },
      { source: "/productos/:handle", destination: "/equipamiento/:handle", permanent: true },
      { source: "/minimal", destination: "/", permanent: false },
      { source: "/showcase", destination: "/", permanent: false },
      { source: "/entornos", destination: "/equipamiento", permanent: true },
    ]
  },
}

export default nextConfig
