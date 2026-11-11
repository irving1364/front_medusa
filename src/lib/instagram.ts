import { INSTAGRAM_HANDLE } from "@/lib/instagram-meta"

/** One Instagram post normalised from either source (Behold JSON feed or the Instagram Graph API). */
export interface InstagramPost {
  id: string
  permalink: string
  image: string
  width?: number
  height?: number
  alt: string
  type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  timestamp: string
  /** Instagram picked a black frame as the reel cover: render a branded tile instead of a black square. */
  blankCover?: boolean
}

/** Feed is cached for an hour: Behold's free plan refreshes once a day, so anything shorter is wasted. */
const REVALIDATE = 3600

const clean = (s?: string | null) =>
  (s || "")
    .replace(/#\S+/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 140)

type BeholdSize = { mediaUrl: string; width: number; height: number }
interface BeholdPost {
  id: string
  permalink: string
  mediaType: InstagramPost["type"]
  mediaUrl: string
  thumbnailUrl?: string
  caption?: string
  prunedCaption?: string
  altText?: string
  timestamp: string
  sizes?: { small?: BeholdSize; medium?: BeholdSize; large?: BeholdSize; full?: BeholdSize }
  colorPalette?: { dominant?: string }
}

/** "8,4,4" → true: the cover is (almost) solid black. */
const isBlack = (rgb?: string) => {
  const c = (rgb || "").split(",").map((n) => Number(n.trim()))
  return c.length === 3 && c.every((n) => Number.isFinite(n) && n < 28)
}

/** Behold (behold.so) proxies the Instagram API, keeps the token alive and serves resized images. */
async function fromBehold(url: string, limit: number): Promise<InstagramPost[]> {
  const res = await fetch(url, { next: { revalidate: REVALIDATE } })
  if (!res.ok) throw new Error(`Behold ${res.status}`)
  const data = (await res.json()) as { posts?: BeholdPost[] }
  return (data.posts || [])
    .map((p): InstagramPost | null => {
      const size = p.sizes?.medium || p.sizes?.large || p.sizes?.small
      const image = size?.mediaUrl || p.thumbnailUrl || (p.mediaType === "VIDEO" ? "" : p.mediaUrl)
      if (!image) return null
      return {
        id: p.id,
        permalink: p.permalink,
        image,
        width: size?.width,
        height: size?.height,
        alt: p.altText || clean(p.prunedCaption || p.caption) || `Publicación de @${INSTAGRAM_HANDLE}`,
        type: p.mediaType,
        timestamp: p.timestamp,
        blankCover: p.mediaType === "VIDEO" && isBlack(p.colorPalette?.dominant),
      }
    })
    .filter((p): p is InstagramPost => !!p)
    .slice(0, limit)
}

interface GraphMedia {
  id: string
  permalink: string
  media_type: InstagramPost["type"]
  media_url?: string
  thumbnail_url?: string
  caption?: string
  alt_text?: string
  timestamp: string
}

/** Direct read with an Instagram Login (professional account) long-lived token. */
async function fromGraph(token: string, limit: number): Promise<InstagramPost[]> {
  const fields = "id,permalink,media_type,media_url,thumbnail_url,caption,alt_text,timestamp"
  const url = `https://graph.instagram.com/v21.0/me/media?fields=${fields}&limit=${limit + 4}&access_token=${encodeURIComponent(token)}`
  const res = await fetch(url, { next: { revalidate: REVALIDATE } })
  if (!res.ok) throw new Error(`Instagram Graph ${res.status}`)
  const data = (await res.json()) as { data?: GraphMedia[] }
  return (data.data || [])
    .map((m): InstagramPost | null => {
      const image = m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url
      if (!image) return null
      return {
        id: m.id,
        permalink: m.permalink,
        image,
        alt: m.alt_text || clean(m.caption) || `Publicación de @${INSTAGRAM_HANDLE}`,
        type: m.media_type,
        timestamp: m.timestamp,
      }
    })
    .filter((p): p is InstagramPost => !!p)
    .slice(0, limit)
}

/**
 * Latest posts of @karvenmedical for the home. Returns [] when nothing is configured or the source fails,
 * so the section simply does not render. Configure ONE of:
 *   INSTAGRAM_FEED_URL     - Behold JSON feed URL (https://feeds.behold.so/...)
 *   INSTAGRAM_ACCESS_TOKEN - long-lived token from "Instagram API with Instagram Login"
 */
export async function getInstagramPosts(limit = 6): Promise<InstagramPost[]> {
  const feed = process.env.INSTAGRAM_FEED_URL?.trim()
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim()
  try {
    if (feed) return await fromBehold(feed, limit)
    if (token) return await fromGraph(token, limit)
  } catch (e) {
    console.warn("[instagram] feed unavailable:", e instanceof Error ? e.message : e)
  }
  return []
}
