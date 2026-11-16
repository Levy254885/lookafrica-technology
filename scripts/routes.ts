import { services } from '../src/data/services'
import { industries } from '../src/data/industries'
import { articles, readingTime } from '../src/data/insights'
import { landing } from '../src/data/landing'
import { faqs, about, legal } from '../src/data/content'

const esc = (s: string) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const h = (n: number, t: string) => `<h${n}>${esc(t)}</h${n}>`
const p = (t: string) => `<p>${esc(t)}</p>`
const ul = (l: string[]) => `<ul>${l.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`
const a = (href: string, t: string) => `<a href="${href}">${esc(t)}</a>`
const links = (l: [string, string][]) => `<ul>${l.map(([t, href]) => `<li>${a(href, t)}</li>`).join('')}</ul>`

const nav = () => `<nav aria-label="Site">${h(2, 'Explore LOOK AFRICA TECHNOLOGY')}${links([
  ...landing.map((l): [string, string] => [l.title, `/${l.slug}`]),
  ...services.map((s): [string, string] => [s.title, `/services/${s.slug}`]),
  ...industries.map((s): [string, string] => [s.title, `/industries/${s.slug}`]),
  ['About', '/about'], ['How we work', '/how-we-work'], ['Why LOOK AFRICA', '/why-look-africa'], ['Our Work', '/work'], ['Clients', '/clients'], ['Technologies', '/technologies'], ['Insights', '/insights'], ['FAQs', '/faq'], ['Contact', '/contact'],
])}</nav>`
const faqHtml = (f: readonly (readonly [string, string])[]) => h(2, 'Frequently asked questions') + f.map(([q, an]) => h(3, q) + p(an)).join('')
const faqLd = (f: readonly (readonly [string, string])[]) => ({ '@type': 'FAQPage', mainEntity: f.map(([q, an]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: an } })) })
const wrap = (body: string) => `<main>${body}</main>${nav()}`

export type R = { path: string; title?: string; description: string; body: string; ld?: object[]; crumbs?: [string, string][] }

export function getRoutes(base: string): R[] {
  const org = { '@type': 'Organization', name: 'LOOK AFRICA TECHNOLOGY', url: base }
  const r: R[] = []
  const simple = (path: string, title: string | undefined, description: string, h1: string, text: string, extra = '') => r.push({ path, title, description, body: wrap(h(1, h1) + p(text) + extra), crumbs: title ? [[title, path]] : undefined })

  simple('/', 'Software Development Company in Kenya', 'LOOK AFRICA TECHNOLOGY is a software development company in Kenya. We build custom software, SaaS platforms, websites and mobile apps for businesses in Kenya and worldwide.',
    'We build technology for businesses ready to move forward.', 'LOOK AFRICA TECHNOLOGY is a software development company in Kenya. We design, develop and deliver digital products, custom software, e-commerce websites and mobile apps for businesses in Kenya, East Africa and worldwide.')
  simple('/services', 'Services', 'Digital engineering, software development, mobile solutions, digital experience, cloud infrastructure and digital growth services from LOOK AFRICA TECHNOLOGY.', 'Our services', 'Six service areas to help your business move forward.', links(services.map((s): [string, string] => [s.title, `/services/${s.slug}`])))
  simple('/industries', 'Industries', 'How LOOK AFRICA TECHNOLOGY helps education, real estate, healthcare, retail and professional services organisations with practical digital solutions.', 'Industries we serve', 'Technology shaped by your industry.', links(industries.map((s): [string, string] => [s.title, `/industries/${s.slug}`])))
  simple('/work', 'Our Work', 'Selected projects and case studies from LOOK AFRICA TECHNOLOGY.', 'Our work', 'Projects and case studies from LOOK AFRICA TECHNOLOGY.')
  simple('/insights', 'Insights', 'In-depth guides on web development, software, SEO, GEO and AEO, M-Pesa integration, automation and digital transformation from LOOK AFRICA TECHNOLOGY.', 'Insights', 'In-depth guides on websites, software, search visibility and digital transformation.', links(articles.map((x): [string, string] => [x.title, `/insights/${x.slug}`])))
  simple('/about', 'About', 'LOOK AFRICA TECHNOLOGY is the technology division of LOOK AFRICA GROUP LIMITED, designing and delivering digital solutions from Kenya and East Africa for clients globally.', 'About LOOK AFRICA TECHNOLOGY', about.mission, p(about.vision) + p(about.philosophy))
  simple('/how-we-work', 'How we work', 'Our six-step delivery process: discover, strategise, design, engineer, deploy and support.', 'How we work', 'Discover, strategise, design, engineer, deploy and support.')
  simple('/why-look-africa', 'Why LOOK AFRICA', 'Business-first thinking, purposeful engineering, practical solutions, quality-focused delivery and long-term technology thinking.', 'Why LOOK AFRICA', 'Five principles guide every decision we make.')
  simple('/clients', 'Clients', 'A selection of the businesses and organisations LOOK AFRICA TECHNOLOGY has worked with.', 'Clients', 'Organisations we have built for.')
  simple('/technologies', 'Technologies', 'The languages, frameworks and tools LOOK AFRICA TECHNOLOGY builds with.', 'Technologies', 'React, Next.js, TypeScript, Node.js, Tailwind CSS, Firebase, Figma and more.')
  r.push({ path: '/faq', title: 'FAQs', description: 'Answers to common questions about working with LOOK AFRICA TECHNOLOGY.', body: wrap(h(1, 'Frequently asked questions') + faqs.map(([q, an]) => h(3, q) + p(an)).join('')), ld: [faqLd(faqs)] })
  simple('/contact', 'Contact', 'Start a project with LOOK AFRICA TECHNOLOGY. Send an enquiry, message us on WhatsApp or email the team.', 'Contact LOOK AFRICA TECHNOLOGY', 'Email levymukolwe9@gmail.com or message us on WhatsApp at +254 115 082 284. Operational base: Kenya and East Africa.')
  simple('/privacy-policy', 'Privacy Policy', 'Privacy Policy for LOOK AFRICA TECHNOLOGY.', legal.privacy.title, legal.privacy.sections.map((x) => x[1]).join(' '))
  simple('/terms-of-service', 'Terms of Service', 'Terms of Service for LOOK AFRICA TECHNOLOGY.', legal.terms.title, legal.terms.sections.map((x) => x[1]).join(' '))

  for (const l of landing) r.push({ path: `/${l.slug}`, title: l.title, description: l.description, crumbs: [[l.short, `/${l.slug}`]],
    body: wrap(h(1, l.h1) + l.intro.map(p).join('') + h(2, 'Why work with LOOK AFRICA TECHNOLOGY') + l.points.map(([t, d]) => h(3, t) + p(d)).join('') + h(2, 'What we build') + ul(l.includes) + faqHtml(l.faqs)),
    ld: [{ '@type': 'Service', name: l.h1, description: l.description, areaServed: { '@type': 'Country', name: 'Kenya' }, provider: org }, faqLd(l.faqs)] })
  for (const s of services) r.push({ path: `/services/${s.slug}`, title: s.title, description: `${s.intro} ${s.short}`, crumbs: [['Services', '/services'], [s.title, `/services/${s.slug}`]],
    body: wrap(h(1, s.title) + p(s.intro) + h(2, 'Problems we solve') + ul(s.problems) + h(2, 'What is included') + p(s.detail) + ul(s.offerings) + h(2, 'Deliverables') + ul(s.deliverables) + h(2, 'Use cases') + ul(s.useCases)),
    ld: [{ '@type': 'Service', name: s.title, description: s.short, provider: org }] })
  for (const s of industries) r.push({ path: `/industries/${s.slug}`, title: `${s.title} technology solutions`, description: `${s.intro} ${s.short}`, crumbs: [['Industries', '/industries'], [s.title, `/industries/${s.slug}`]],
    body: wrap(h(1, s.title) + p(s.intro) + h(2, 'Common challenges') + ul(s.challenges) + h(2, 'Solutions we can deliver') + ul(s.solutions)) })
  for (const x of articles) r.push({ path: `/insights/${x.slug}`, title: x.title, description: x.excerpt, crumbs: [['Insights', '/insights'], [x.title, `/insights/${x.slug}`]],
    body: wrap(`<article>${h(1, x.title)}${p(`${x.category} · ${readingTime(x)} min read · ${x.author}`)}${p(x.excerpt)}${x.blocks.map((b) => h(2, b.h) + (b.p ?? []).map(p).join('') + (b.ul ? ul(b.ul) : '') + (b.ol ? `<ol>${b.ol.map((i) => `<li>${esc(i)}</li>`).join('')}</ol>` : '') + (b.code ? `<pre>${esc(b.code)}</pre>` : '')).join('')}${faqHtml(x.faq)}</article>`),
    ld: [{ '@type': 'Article', headline: x.title, description: x.excerpt, datePublished: x.date, dateModified: x.date, keywords: x.keywords.join(', '), mainEntityOfPage: `${base}/insights/${x.slug}`, author: { '@type': 'Organization', name: x.author }, publisher: org }, faqLd(x.faq)] })
  return r
}
