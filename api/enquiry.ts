import type { VercelRequest, VercelResponse } from '@vercel/node'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { FieldValue, getFirestore } from 'firebase-admin/firestore'

// Best-effort per-instance rate limit. For stronger protection add Vercel Firewall rate limiting or a shared store.
const hits = new Map<string, { n: number; t: number }>()
const clean = (v: unknown, max: number) => String(v ?? '').replace(/[<>\u0000-\u001f]/g, ' ').trim().slice(0, max)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' })
  const { FIREBASE_PROJECT_ID: projectId, FIREBASE_CLIENT_EMAIL: clientEmail, FIREBASE_PRIVATE_KEY: key } = process.env
  if (!projectId || !clientEmail || !key) {
    const missing = ['FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY'].filter((k) => !process.env[k])
    return res.status(503).json({ error: 'not_configured', missing })
  }
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {}
  if (body.website) return res.status(200).json({ ok: true }) // honeypot: pretend success to bots

  const ip = String(req.headers['x-forwarded-for'] ?? 'unknown').split(',')[0].trim()
  const now = Date.now(); const h = hits.get(ip)
  if (h && now - h.t < 600_000) { if (h.n >= 5) return res.status(429).json({ error: 'rate_limited' }); h.n++ } else hits.set(ip, { n: 1, t: now })

  const d = { name: clean(body.name, 100), organisation: clean(body.organisation, 150), email: clean(body.email, 150), country: clean(body.country, 80), service: clean(body.service, 80),
    description: clean(body.description, 3000), budget: clean(body.budget, 40), timeline: clean(body.timeline, 40), contactMethod: clean(body.contactMethod, 20) }
  if (d.name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) || !d.country || !d.service || d.description.length < 20) return res.status(400).json({ error: 'invalid' })

  try {
    if (!getApps().length) initializeApp({ credential: cert({ projectId, clientEmail, privateKey: key.replace(/\\n/g, '\n') }) })
    await getFirestore().collection('enquiries').add({ ...d, createdAt: FieldValue.serverTimestamp(), status: 'new' })
    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error('enquiry write failed', e)
    return res.status(500).json({ error: 'server_error' })
  }
}
