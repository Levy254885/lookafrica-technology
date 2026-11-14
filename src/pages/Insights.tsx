import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, Clock, Facebook, Linkedin, MessageCircle } from 'lucide-react'
import { useSeo } from '../hooks/useSeo'
import { articles, categories, readingTime, slugify, type Article } from '../data/insights'
import { services } from '../data/services'
import { BASE_URL } from '../data/site'
import { CtaBlock, Crumbs, Faq, PageHero } from '../components/ui/UI'
import NotFound from './NotFound'

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
const Meta = ({ a }: { a: Article }) => (
  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-mute">
    <span className="rounded-full bg-butter px-3 py-1 font-semibold text-[#6b4a00]">{a.category}</span>
    <span>{fmt(a.date)}</span><span className="flex items-center gap-1"><Clock size={12} aria-hidden />{readingTime(a)} min read</span>
  </p>
)

export function Insights() {
  useSeo({ title: 'Insights', description: 'In-depth guides on web development, software, SEO, GEO and AEO, M-Pesa integration, automation and digital transformation from LOOK AFRICA TECHNOLOGY.', path: '/insights', crumbs: [['Insights', '/insights']] })
  const [cat, setCat] = useState('All'); const [q, setQ] = useState('')
  const list = useMemo(() => articles.filter((a) => (cat === 'All' || a.category === cat) && (a.title + a.excerpt + a.keywords.join(' ')).toLowerCase().includes(q.toLowerCase())), [cat, q])
  return (
    <>
      <PageHero eyebrow="Insights" crumbs={[['Insights', '/insights']]} title={<>Guides to help you <span className="text-copper">build, grow and automate.</span></>} text={`${articles.length} in-depth guides on websites, software, search visibility and digital transformation, written for businesses in Kenya and beyond.`} />
      <section className="wrap section">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-2">{['All', ...categories].map((c) => <li key={c}><button onClick={() => setCat(c)} aria-pressed={cat === c} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${cat === c ? 'bg-red text-white' : 'bg-soft text-navy hover:bg-butter'}`}>{c}</button></li>)}</ul>
          <label className="lg:w-72"><span className="sr-only">Search articles</span><input className="field" type="search" placeholder="Search guides" value={q} onChange={(e) => setQ(e.target.value)} /></label>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((a, i) => (
            <motion.li key={a.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}>
              <Link to={`/insights/${a.slug}`} className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <Meta a={a} />
                <h2 className="mt-4 text-lg leading-snug transition-colors group-hover:text-copper">{a.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-mute">{a.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red">Read the guide <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </motion.li>
          ))}
        </ul>
        {list.length === 0 && <p className="mt-10 text-mute" role="status">No guides match your search.</p>}
      </section>
      <CtaBlock />
    </>
  )
}

export function ArticlePage() {
  const { slug } = useParams(); const a = articles.find((x) => x.slug === slug)
  return a ? <Post a={a} /> : <NotFound />
}

function Post({ a }: { a: Article }) {
  const path = `/insights/${a.slug}`; const url = BASE_URL + path
  const ld = useMemo(() => [
    { '@type': 'Article', headline: a.title, description: a.excerpt, datePublished: a.date, dateModified: a.date, keywords: a.keywords.join(', '), mainEntityOfPage: url, author: { '@type': 'Organization', name: a.author }, publisher: { '@type': 'Organization', name: 'LOOK AFRICA TECHNOLOGY', url: BASE_URL } },
    { '@type': 'FAQPage', mainEntity: a.faq.map(([q, ans]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: ans } })) },
  ], [a, url])
  useSeo({ title: a.title, description: a.excerpt, path, type: 'article', crumbs: [['Insights', '/insights'], [a.title, path]], jsonLd: ld })
  const svc = services.find((s) => s.slug === a.service)
  const related = [...articles.filter((x) => x.slug !== a.slug && x.category === a.category), ...articles.filter((x) => x.slug !== a.slug && x.category !== a.category)].slice(0, 3)
  const enc = encodeURIComponent
  const share = [
    ['WhatsApp', `https://wa.me/?text=${enc(a.title + ' ' + url)}`, <MessageCircle key="w" size={16} />],
    ['LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`, <Linkedin key="l" size={16} />],
    ['Facebook', `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, <Facebook key="f" size={16} />],
  ] as const
  return (
    <>
      <div className="wrap py-10 sm:py-14">
        <Crumbs items={[['Insights', '/insights'], [a.title, path]]} />
        <header className="mt-8 max-w-3xl">
          <Meta a={a} />
          <h1 className="mt-4 text-3xl leading-tight sm:text-5xl">{a.title}</h1>
          <p className="lead mt-5">{a.excerpt}</p>
          <p className="mt-4 text-sm text-mute">By {a.author}</p>
        </header>
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <article className="lg:col-span-8">
            <nav aria-label="In this article" className="mb-10 rounded-2xl bg-soft p-5 lg:hidden">
              <p className="text-sm font-bold">In this article</p>
              <ol className="mt-3 space-y-2 text-sm">{a.blocks.map((b) => <li key={b.h}><a className="text-navy u-link" href={`#${slugify(b.h)}`}>{b.h}</a></li>)}</ol>
            </nav>
            {a.blocks.map((b) => (
              <section key={b.h} className="mb-10 scroll-mt-28">
                <h2 id={slugify(b.h)} className="text-2xl sm:text-3xl">{b.h}</h2>
                {b.p?.map((t, i) => <p key={i} className="mt-4 text-base leading-8 text-ink/90 sm:text-lg">{t}</p>)}
                {b.ul && <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-7 text-ink/90 marker:text-copper sm:text-lg">{b.ul.map((t, i) => <li key={i}>{t}</li>)}</ul>}
                {b.ol && <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-7 text-ink/90 marker:font-bold marker:text-copper sm:text-lg">{b.ol.map((t, i) => <li key={i}>{t}</li>)}</ol>}
                {b.code && <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0b0b] p-4 text-sm leading-6 text-white/90"><code>{b.code}</code></pre>}
              </section>
            ))}
            <section className="mt-14">
              <h2 className="text-2xl sm:text-3xl" id="faq">Frequently asked questions</h2>
              <div className="[&>ul]:mx-0 [&>ul]:max-w-none"><Faq items={a.faq} /></div>
            </section>
            {svc && (
              <aside className="mt-14 rounded-3xl bg-navy p-7 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffd9a8]">Related service</p>
                <h2 className="mt-2 text-xl !text-white">{svc.title}</h2>
                <p className="mt-2 text-sm text-white/75">{svc.short}</p>
                <div className="mt-5 flex flex-wrap gap-4"><Link to={`/services/${svc.slug}`} className="btn-white !py-2.5 !text-sm">Explore {svc.title}</Link><Link to="/contact" className="self-center text-sm font-semibold underline underline-offset-4">Talk to our team</Link></div>
              </aside>
            )}
          </article>
          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              <nav aria-label="In this article" className="hidden rounded-2xl border border-line bg-white p-6 lg:block">
                <p className="text-sm font-bold">In this article</p>
                <ol className="mt-4 space-y-3 text-sm">{a.blocks.map((b) => <li key={b.h}><a className="text-mute transition-colors hover:text-copper" href={`#${slugify(b.h)}`}>{b.h}</a></li>)}<li><a className="text-mute hover:text-copper" href="#faq">FAQs</a></li></ol>
              </nav>
              <div className="rounded-2xl border border-line bg-white p-6">
                <p className="text-sm font-bold">Share this guide</p>
                <ul className="mt-4 flex flex-wrap gap-2">{share.map(([n, h, i]) => <li key={n}><a href={h} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-soft px-4 py-2 text-sm font-semibold text-navy hover:bg-butter">{i}{n}</a></li>)}</ul>
              </div>
            </div>
          </aside>
        </div>
        <section className="mt-16 border-t border-line pt-10">
          <h2 className="text-2xl">Related guides</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">{related.map((r) => <li key={r.slug}><Link to={`/insights/${r.slug}`} className="group block h-full rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-md"><Meta a={r} /><h3 className="mt-3 text-base leading-snug group-hover:text-copper">{r.title}</h3></Link></li>)}</ul>
        </section>
      </div>
      <CtaBlock />
    </>
  )
}
