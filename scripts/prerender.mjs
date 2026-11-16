// Runs after `vite build`. Writes a real HTML file per route (unique title, description, canonical,
// Open Graph, structured data and readable content) so search engines see everything immediately,
// and regenerates sitemap.xml and robots.txt for the configured domain.
import { build } from 'esbuild'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const dist = path.join(root, 'dist')
const BASE = (process.env.SITE_URL || 'https://lookafrica.co.ke').replace(/\/$/, '')
const verify = process.env.VITE_GOOGLE_SITE_VERIFICATION || process.env.GOOGLE_SITE_VERIFICATION
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

try {
  const tmp = path.join(root, '.prerender-routes.mjs')
  await build({ entryPoints: [path.join(root, 'scripts/routes.ts')], bundle: true, format: 'esm', platform: 'node', outfile: tmp, logLevel: 'silent' })
  const { getRoutes } = await import(pathToFileURL(tmp).href)
  fs.rmSync(tmp, { force: true })
  const tpl = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
  const routes = getRoutes(BASE)

  for (const r of routes) {
    const full = r.title ? `${r.title} | LOOK AFRICA TECHNOLOGY` : 'LOOK AFRICA TECHNOLOGY | Technology that moves business forward'
    const url = BASE + r.path
    const graph = []
    if (r.crumbs) graph.push({ '@type': 'BreadcrumbList', itemListElement: r.crumbs.map(([n, pth], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: BASE + pth })) })
    if (r.ld) graph.push(...r.ld)
    const head = [
      `<meta name="description" content="${esc(r.description)}" />`,
      `<link rel="canonical" href="${url}" />`,
      `<meta property="og:title" content="${esc(full)}" />`,
      `<meta property="og:description" content="${esc(r.description)}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:type" content="${r.path.startsWith('/insights/') ? 'article' : 'website'}" />`,
      `<meta property="og:site_name" content="LOOK AFRICA TECHNOLOGY" />`,
      `<meta property="og:locale" content="en_KE" />`,
      `<meta property="og:image" content="${BASE}/images/hero/developer-workstation.webp" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${esc(full)}" />`,
      `<meta name="twitter:description" content="${esc(r.description)}" />`,
      verify ? `<meta name="google-site-verification" content="${esc(verify)}" />` : '',
      graph.length ? `<script type="application/ld+json" id="page-ld">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>` : '',
    ].filter(Boolean).join('\n    ')
    let html = tpl.replace(/<title>.*?<\/title>/s, `<title>${esc(full)}</title>`).replace(/<meta name="description"[^>]*>\s*/i, '')
    html = html.replace('</head>', `    ${head}\n  </head>`)
    html = html.replace('<div id="root"></div>', `<div id="root"><div style="max-width:48rem;margin:0 auto;padding:1.5rem;font-family:system-ui,sans-serif;line-height:1.6">${r.body}</div></div>`)
    const out = r.path === '/' ? path.join(dist, 'index.html') : path.join(dist, r.path, 'index.html')
    fs.mkdirSync(path.dirname(out), { recursive: true })
    fs.writeFileSync(out, html)
  }
  const day = new Date().toISOString().slice(0, 10)
  fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((r) => `  <url><loc>${BASE}${r.path === '/' ? '/' : r.path}</loc><lastmod>${day}</lastmod></url>`).join('\n')}\n</urlset>\n`)
  fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${BASE}/sitemap.xml\n`)
  console.log(`prerender: wrote ${routes.length} routes for ${BASE}`)
} catch (e) {
  console.warn('prerender skipped:', e && e.message ? e.message : e)
}
