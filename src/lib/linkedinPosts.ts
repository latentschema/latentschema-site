export interface LinkedInPost {
  /** iframe src for LinkedIn's embed viewer, e.g. .../embed/feed/update/urn:li:activity:XXXX */
  src: string
  /** Accessible label for the embedded iframe, e.g. "LatentSchema on LinkedIn". */
  title: string
}

/**
 * A Google Sheet published as CSV, one raw LinkedIn post URL per row in
 * column A (the same kind of link you'd copy from the browser address bar
 * or a post's "Copy link to post" menu — no special formatting needed).
 *
 * To set this up: File → Share → Publish to web → select the sheet/range →
 * format "Comma-separated values (.csv)" → Publish, then paste the
 * resulting URL below. Leave empty to fall back to FALLBACK_POSTS.
 */
export const LINKEDIN_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTb8fZh2wbNhHycTtgNglX9sLFr9e7UpxIL9kfT_MQ5LbmFptPPU4mBOWi9agXwZrys3aJgHOiWYlpG/pub?gid=0&single=true&output=csv'

// Used until LINKEDIN_SHEET_CSV_URL is set, or if the sheet fetch fails.
export const FALLBACK_POSTS: LinkedInPost[] = [
  {
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7487059768528949248',
    title: 'LatentSchema on LinkedIn',
  },
  {
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7489605859891740672',
    title: 'LatentSchema on LinkedIn',
  },
  {
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7339318817367449602',
    title: 'Nandu Mahajan on LinkedIn',
  },
]

export const linkedinProfiles = {
  company: 'https://www.linkedin.com/company/latentschema',
  founder: 'https://www.linkedin.com/in/nandu-mahajan/',
}

/** Turns a normal LinkedIn post URL into the embeddable urn used by LinkedIn's viewer. */
export function toEmbedSrc(rawUrl: string): string | null {
  const activityMatch = rawUrl.match(/activity[-:](\d+)/)
  if (activityMatch) {
    return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityMatch[1]}`
  }
  const shareMatch = rawUrl.match(/share[-:](\d+)/)
  if (shareMatch) {
    return `https://www.linkedin.com/embed/feed/update/urn:li:share:${shareMatch[1]}`
  }
  return null
}

function inferTitle(rawUrl: string): string {
  return rawUrl.includes('/nandu-mahajan') ? 'Nandu Mahajan on LinkedIn' : 'LatentSchema on LinkedIn'
}

/** Parses a published-CSV response (one post URL per row) into embeddable posts. */
export function parseLinkedInPostsCsv(csv: string): LinkedInPost[] {
  return csv
    .split('\n')
    .map((line) => line.split(',')[0]?.replace(/^"|"$/g, '').trim())
    .filter((url): url is string => !!url && url.startsWith('http'))
    .map((url) => {
      const src = toEmbedSrc(url)
      return src ? { src, title: inferTitle(url) } : null
    })
    .filter((post): post is LinkedInPost => post !== null)
}
