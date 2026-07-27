import type { NextConfig } from "next"

const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "medusa-railway-production-088b.up.railway.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/**",
      },
    ],
  },

  // Proxy /api/medusa/* -> Medusa backend to avoid CORS in the browser
  async rewrites() {
    return [
      {
        source: "/api/medusa/:path*",
        destination: `${MEDUSA_BACKEND_URL}/:path*`,
      },
    ]
  },
}

export default nextConfig
