import { useEffect } from 'react'
import { BASE_URL } from '../data/site'

type Seo = { title?: string; description: string; path: string; type?: 'website' | 'article'; crumbs?: [string, string][]; jsonLd?: object | object[] }
const setTag = (sel: string, attr: string, key: string, val: string) => {
  let el = document.head.querySelector<HTMLElement>(sel)
  if (!el) { el = document.createElement(sel.startsWith('link') ? 'link' : 'meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
  el.setAttribute(sel.startsWith('link') ? 'href' : 'content', val)
}
export function useSeo({ title, description, path, type = 'website', crumbs, jsonLd }: Seo) {
  useEffect(() => {
    const full = title ? `${title} | LOOK AFRICA TECHNOLOGY` : 'LOOK AFRICA TECHNOLOGY | Technology that moves business forward'
    const url = BASE_URL + path
    document.title = full
    setTag('meta[name="description"]', 'name', 'description', description)
    setTag('link[rel="canonical"]', 'rel', 'canonical', url)
    setTag('meta[property="og:title"]', 'property', 'og:title', full)
    setTag('meta[property="og:description"]', 'property', 'og:description', description)
    setTag('meta[property="og:url"]', 'property', 'og:url', url)
    setTag('meta[property="og:type"]', 'property', 'og:type', type)
    setTag('meta[property="og:image"]', 'property', 'og:image', BASE_URL + '/images/hero/developer-workstation.webp')
    setTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    const graph: object[] = []
    if (crumbs) graph.push({ '@type': 'BreadcrumbList', itemListElement: crumbs.map(([n, p], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: BASE_URL + p })) })
    if (jsonLd) graph.push(...(Array.isArray(jsonLd) ? jsonLd : [jsonLd]))
    let s = document.getElementById('page-ld') as HTMLScriptElement | null
    if (graph.length) {
      if (!s) { s = document.createElement('script'); s.id = 'page-ld'; s.type = 'application/ld+json'; document.head.appendChild(s) }
      s.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
    } else s?.remove()
  }, [title, description, path, type, crumbs, jsonLd])
}
