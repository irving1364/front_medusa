import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000").trim()
const PUBLISHABLE_KEY = (process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY || "").trim()

async function proxy(request: NextRequest) {
  // Extract the path after /api/medusa/
  const path = request.nextUrl.pathname.replace("/api/medusa", "")
  const search = request.nextUrl.search
  const url = `${BACKEND_URL}${path}${search}`

  // Forward the request to Medusa backend
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-publishable-api-key": PUBLISHABLE_KEY,
  }

  const body = ["GET", "HEAD"].includes(request.method) ? undefined : await request.text()

  try {
    const response = await fetch(url, {
      method: request.method,
      headers,
      body,
    })

    const data = await response.text()
    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json",
      },
    })
  } catch (error) {
    console.error(`Proxy error [${request.method}] ${url}:`, error)
    return NextResponse.json(
      { type: "proxy_error", message: "Failed to connect to Medusa backend" },
      { status: 502 }
    )
  }
}

export async function GET(request: NextRequest) { return proxy(request) }
export async function POST(request: NextRequest) { return proxy(request) }
export async function PUT(request: NextRequest) { return proxy(request) }
export async function PATCH(request: NextRequest) { return proxy(request) }
export async function DELETE(request: NextRequest) { return proxy(request) }
