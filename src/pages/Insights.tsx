import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import { articles, categories, readingTime, type Article } from '../data/insights'
import { CtaBlock, PageHero, Crumbs } from '../components/ui/UI'
import NotFound from './NotFound'

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
const Meta = ({ a }: { a: Article }) => <p className="text-xs text-mute">{a.category} · {fmt(a.date)} · {readingTime(a)} min read{a.draft ? ' · Editorial draft' : ''}</p>

export function Insights() {
  useSeo({ title: 'Insights', description: 'Practical articles on technology, software engineering, business technology, digital transformation and digital growth from LOOK AFRICA TECHNOLOGY.', path: '/insights', crumbs: [['Insights', '/insights']] })
  const [cat, setCat] = useState('All'); const [q, setQ] = useState('')
  const list = useMemo(() => articles.filter((a) => (cat === 'All' || a.category === cat) && (a.title + a.excerpt).toLowerCase().includes(q.toLowerCase())), [cat, q])
  return (
    <>
      <PageHero eyebrow="Insights" crumbs={[['Insights', '/insights']]} title={<>Practical thinking on <span className="text-copper">technology and business.</span></>} text="Clear, useful articles to help you make better technology decisions." />
      <section className="wrap section">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-2">{['All', ...categories].map((c) => <li key={c}><button onClick={() => setCat(c)} aria-pressed={cat === c} className={`rounded-full px-4 py-2 text-sm font-semibold ${cat === c ? 'bg-red text-white' : 'bg-soft text-navy'}`}>{c}</button></li>)}</ul>
          <label className="sm:w-64"><span className="sr-only">Search articles</span><input className="field" type="search" placeholder="Search articles" value={q} onChange={(e) => setQ(e.target.value)} /></label>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">{list.map((a) => <li key={a.slug}><Link to={`/insights/${a.slug}`} className="block h-full rounded-2xl border border-line bg-white p-6 transition-shadow hover:shadow-md"><Meta a={a} /><h2 className="mt-3 text-xl">{a.title}</h2><p className="mt-2 text-sm leading-6 text-mute">{a.excerpt}</p></Link></li>)}</ul>
        {list.length === 0 && <p className="mt-10 text-mute" role="status">No articles match your search.</p>}
      </section>
    </>
  )
}
export function ArticlePage() {
  const { slug } = useParams(); const a = articles.find((x) => x.slug === slug)
  return a ? <Post a={a} /> : <NotFound />
}
function Post({ a }: { a: Article }) {
  const path = `/insights/${a.slug}`
  useSeo({ title: a.title, description: a.excerpt, path, type: 'article', crumbs: [['Insights', '/insights'], [a.title, path]],
    jsonLd: { '@type': 'Article', headline: a.title, description: a.excerpt, datePublished: a.date, author: { '@type': 'Organization', name: a.author } } })
  const related = articles.filter((x) => x.slug !== a.slug && x.category === a.category).slice(0, 2)
  return (
    <>
      <article className="wrap max-w-3xl py-12 sm:py-16">
        <Crumbs items={[['Insights', '/insights'], [a.title, path]]} />
        <div className="mt-8"><Meta a={a} /><h1 className="mt-3 text-3xl leading-tight sm:text-4xl">{a.title}</h1><p className="mt-3 text-sm text-mute">By {a.author}</p></div>
        <div className="mt-8 space-y-5">{a.body.map((p, i) => <p key={i} className="text-lg leading-8 text-ink/90">{p}</p>)}</div>
        {related.length > 0 && <div className="mt-14 border-t border-line pt-8"><h2 className="text-xl">Related articles</h2><ul className="mt-4 space-y-3">{related.map((r) => <li key={r.slug}><Link className="font-semibold text-red u-link" to={`/insights/${r.slug}`}>{r.title}</Link></li>)}</ul></div>}
      </article>
      <CtaBlock />
    </>
  )
}
