import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY || ""

export async function GET() {
  const results: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {
      MEDUSA_BACKEND_URL: BACKEND_URL,
      MEDUSA_API_KEY_SET: !!PUBLISHABLE_KEY,
      MEDUSA_API_KEY_PREFIX: PUBLISHABLE_KEY ? PUBLISHABLE_KEY.substring(0, 10) + "..." : "EMPTY",
    },
  }

  // Test 1: Can we reach the Medusa backend?
  try {
    const start = Date.now()
    const res = await fetch(`${BACKEND_URL}/store/products?limit=1`, {
      headers: { "x-publishable-api-key": PUBLISHABLE_KEY },
      signal: AbortSignal.timeout(10000),
    })
    const duration = Date.now() - start
    const data = await res.json()
    results.connectivity = {
      status: res.status,
      duration_ms: duration,
      ok: res.ok,
    }
    if (res.ok) {
      results.products = {
        count: data.count || data.products?.length || 0,
        hasProducts: (data.products?.length || 0) > 0,
        firstProduct: data.products?.[0] ? {
          title: data.products[0].title,
          handle: data.products[0].handle,
          hasVariants: (data.products[0].variants?.length || 0) > 0,
          variantId: data.products[0].variants?.[0]?.id || null,
        } : null,
      }
    } else {
      results.error = data
    }
  } catch (error) {
    results.connectivity = {
      status: "ERROR",
      error: error instanceof Error ? error.message : String(error),
    }
  }

  return NextResponse.json(results)
}
