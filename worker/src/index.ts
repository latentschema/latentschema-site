export interface Env {
  RESEND_API_KEY: string
  TOKEN_SECRET: string
  ALLOWED_ORIGINS: string // comma-separated list
  SITE_URL: string
  FROM_EMAIL: string
  NOTIFY_EMAIL: string
}

// Maps the public `resource` key (sent from the frontend) to the actual static
// file path on the site. Keeping this server-side means a submitted resource
// key can be validated, and the redirect target isn't guessable from the token.
const RESOURCES: Record<string, { file: string; title: string }> = {
  'latentschema-whitepaper': {
    file: 'latentschema-whitepaper.html',
    title: 'LatentSchema Technical Whitepaper',
  },
  'fnbpulse-whitepaper': {
    file: 'fnbpulse-whitepaper.html',
    title: 'fnbPulse Whitepaper',
  },
}

const TOKEN_TTL_SECONDS = 30 * 60 // 30 minutes

function resolveOrigin(request: Request, env: Env): string | null {
  const requestOrigin = request.headers.get('Origin')
  if (!requestOrigin) return null
  const allowed = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  return allowed.includes(requestOrigin) ? requestOrigin : null
}

function corsHeaders(origin: string | null): HeadersInit {
  if (!origin) return {}
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

function json(data: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) },
  })
}

function base64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)
  let str = ''
  for (const b of arr) str += String.fromCharCode(b)
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64urlDecode(str: string): Uint8Array {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/').padEnd(str.length + ((4 - (str.length % 4)) % 4), '=')
  const bin = atob(padded)
  const arr = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i)
  return arr
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

interface TokenPayload {
  email: string
  resource: string
  exp: number
}

async function signToken(payload: TokenPayload, secret: string): Promise<string> {
  const payloadB64 = base64url(new TextEncoder().encode(JSON.stringify(payload)))
  const key = await hmacKey(secret)
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payloadB64))
  return `${payloadB64}.${base64url(sig)}`
}

async function verifyToken(token: string, secret: string): Promise<TokenPayload | null> {
  const [payloadB64, sigB64] = token.split('.')
  if (!payloadB64 || !sigB64) return null

  const key = await hmacKey(secret)
  const valid = await crypto.subtle.verify(
    'HMAC',
    key,
    base64urlDecode(sigB64),
    new TextEncoder().encode(payloadB64),
  )
  if (!valid) return null

  try {
    const payload = JSON.parse(new TextDecoder().decode(base64urlDecode(payloadB64))) as TokenPayload
    if (typeof payload.exp !== 'number' || payload.exp < Date.now() / 1000) return null
    if (!RESOURCES[payload.resource]) return null
    return payload
  } catch {
    return null
  }
}

async function sendEmail(
  env: Env,
  { to, subject, html }: { to: string; subject: string; html: string },
): Promise<void> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: env.FROM_EMAIL, to, subject, html }),
  })
  if (!res.ok) {
    throw new Error(`Resend request failed: ${res.status} ${await res.text()}`)
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function handleRequestAccess(request: Request, env: Env, origin: string | null): Promise<Response> {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'Invalid JSON body' }, { status: 400, headers: corsHeaders(origin) })
  }

  const name = String(body.name ?? '').trim()
  const company = String(body.company ?? '').trim()
  const email = String(body.email ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const resource = String(body.resource ?? '').trim()

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!name || !company || !emailPattern.test(email) || !RESOURCES[resource]) {
    return json({ ok: false, error: 'Missing or invalid fields' }, { status: 400, headers: corsHeaders(origin) })
  }

  const payload: TokenPayload = {
    email,
    resource,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
  }
  const token = await signToken(payload, env.TOKEN_SECRET)
  const verifyUrl = `${new URL(request.url).origin}/verify?token=${encodeURIComponent(token)}`
  const paper = RESOURCES[resource]

  await sendEmail(env, {
    to: email,
    subject: `Your link to the ${paper.title}`,
    html: `
      <p>Hi ${escapeHtml(name)},</p>
      <p>Click below to confirm your email and open the <strong>${escapeHtml(paper.title)}</strong>:</p>
      <p><a href="${verifyUrl}">Confirm &amp; open the whitepaper</a></p>
      <p>This link expires in 30 minutes and can only be used once.</p>
      <p>&mdash; LatentSchema</p>
    `,
  })

  // Internal lead notification — best-effort, doesn't block the visitor's response.
  try {
    await sendEmail(env, {
      to: env.NOTIFY_EMAIL,
      subject: `Whitepaper request: ${paper.title}`,
      html: `
        <p>New whitepaper request (pending email confirmation):</p>
        <ul>
          <li><strong>Name:</strong> ${escapeHtml(name)}</li>
          <li><strong>Company:</strong> ${escapeHtml(company)}</li>
          <li><strong>Email:</strong> ${escapeHtml(email)}</li>
          <li><strong>Phone:</strong> ${escapeHtml(phone || '—')}</li>
          <li><strong>Resource:</strong> ${escapeHtml(paper.title)}</li>
        </ul>
      `,
    })
  } catch (err) {
    console.error('Internal notification email failed', err)
  }

  return json({ ok: true }, { headers: corsHeaders(origin) })
}

function errorPage(message: string): Response {
  return new Response(
    `<!doctype html><html><head><meta charset="utf-8"><title>Link expired</title>
     <style>body{font-family:system-ui,sans-serif;background:#0B0F19;color:#F1F5F9;
     display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:24px;text-align:center}
     a{color:#3B82F6}</style></head>
     <body><div><h1>${escapeHtml(message)}</h1><p>Please go back and request a new link.</p></div></body></html>`,
    { status: 400, headers: { 'Content-Type': 'text/html' } },
  )
}

async function handleVerify(request: Request, env: Env): Promise<Response> {
  const token = new URL(request.url).searchParams.get('token') ?? ''
  const payload = await verifyToken(token, env.TOKEN_SECRET)
  if (!payload) return errorPage('This link is invalid or has expired.')

  const paper = RESOURCES[payload.resource]
  const target = `${env.SITE_URL.replace(/\/$/, '')}/${paper.file}`
  return Response.redirect(target, 302)
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const origin = resolveOrigin(request, env)

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(origin) })
    }

    if (url.pathname === '/request-access' && request.method === 'POST') {
      return handleRequestAccess(request, env, origin)
    }

    if (url.pathname === '/verify' && request.method === 'GET') {
      return handleVerify(request, env)
    }

    return json({ ok: false, error: 'Not found' }, { status: 404 })
  },
}
