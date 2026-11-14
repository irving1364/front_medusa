import "server-only"

export interface OgImage { url: string; alt: string; width?: number; height?: number; type?: string }

const RANGE = 262143 // first 256 KB is enough to reach the size header of PNG/JPEG/WebP/GIF files

const u16be = (b: Uint8Array, i: number) => (b[i] << 8) | b[i + 1]
const u32be = (b: Uint8Array, i: number) => ((b[i] << 24) | (b[i + 1] << 16) | (b[i + 2] << 8) | b[i + 3]) >>> 0
const u16le = (b: Uint8Array, i: number) => b[i] | (b[i + 1] << 8)
const u24le = (b: Uint8Array, i: number) => b[i] | (b[i + 1] << 8) | (b[i + 2] << 16)
const ascii = (b: Uint8Array, i: number, n: number) => String.fromCharCode(...b.subarray(i, i + n))

/** Reads width/height/type from the leading bytes of an image (no decoding, no dependency). */
export const imageSize = (b: Uint8Array): Pick<OgImage, "width" | "height" | "type"> | null => {
  if (b.length > 24 && u32be(b, 0) === 0x89504e47) return { width: u32be(b, 16), height: u32be(b, 20), type: "image/png" }
  if (b.length > 10 && ascii(b, 0, 3) === "GIF") return { width: u16le(b, 6), height: u16le(b, 8), type: "image/gif" }
  if (b.length > 30 && ascii(b, 0, 4) === "RIFF" && ascii(b, 8, 4) === "WEBP") {
    const chunk = ascii(b, 12, 4)
    if (chunk === "VP8 ") return { width: u16le(b, 26) & 0x3fff, height: u16le(b, 28) & 0x3fff, type: "image/webp" }
    if (chunk === "VP8L") { const bits = b[21] | (b[22] << 8) | (b[23] << 16) | (b[24] << 24); return { width: (bits & 0x3fff) + 1, height: ((bits >>> 14) & 0x3fff) + 1, type: "image/webp" } }
    if (chunk === "VP8X") return { width: u24le(b, 24) + 1, height: u24le(b, 27) + 1, type: "image/webp" }
    return { type: "image/webp" }
  }
  if (b.length > 4 && b[0] === 0xff && b[1] === 0xd8) {
    let i = 2
    while (i + 9 < b.length) {
      if (b[i] !== 0xff) { i++; continue }
      const m = b[i + 1]
      if (m === 0xff) { i++; continue }
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return { height: u16be(b, i + 5), width: u16be(b, i + 7), type: "image/jpeg" }
      if (m === 0xd8 || (m >= 0xd0 && m <= 0xd7) || m === 0x01) { i += 2; continue }
      i += 2 + u16be(b, i + 2)
    }
    return { type: "image/jpeg" }
  }
  return null
}

/**
 * Open Graph image entry with explicit dimensions, so WhatsApp / Facebook / LinkedIn render the large preview
 * on the very first share. Fetches only the first bytes of the file, cached for a day; falls back to the bare URL.
 */
export const ogImage = async (url: string, alt: string): Promise<OgImage> => {
  try {
    const res = await fetch(url, { headers: { Range: `bytes=0-${RANGE}` }, signal: AbortSignal.timeout(4000), next: { revalidate: 86400 } })
    if (!res.ok || !res.body) return { url, alt }
    const reader = res.body.getReader()
    const chunks: Uint8Array[] = []
    let got = 0
    while (got <= RANGE) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value); got += value.length
    }
    reader.cancel().catch(() => {})
    const bytes = new Uint8Array(got)
    let o = 0
    for (const c of chunks) { bytes.set(c, o); o += c.length }
    const size = imageSize(bytes)
    return size?.width && size.height ? { url, alt, ...size } : { url, alt, ...(size?.type ? { type: size.type } : {}) }
  } catch {
    return { url, alt }
  }
}
