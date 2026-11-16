import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useSeo } from '../hooks/useSeo'
import { landing } from '../data/landing'
import { services } from '../data/services'
import { articles } from '../data/insights'
import { BASE_URL } from '../data/site'
import { CtaBlock, Faq, IconCircle, PageHero, SectionHead } from '../components/ui/UI'
import NotFound from './NotFound'

export default function Landing({ slug }: { slug: string }) {
  const l = landing.find((x) => x.slug === slug)
  return l ? <View l={l} /> : <NotFound />
}

function View({ l }: { l: (typeof landing)[number] }) {
  const path = `/${l.slug}`
  const svc = services.find((s) => s.slug === l.service)!
  const ld = useMemo(() => [
    { '@type': 'Service', name: l.h1, description: l.description, areaServed: { '@type': 'Country', name: 'Kenya' }, provider: { '@type': 'Organization', name: 'LOOK AFRICA TECHNOLOGY', url: BASE_URL } },
    { '@type': 'FAQPage', mainEntity: l.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ], [l])
  useSeo({ title: l.title, description: l.description, path, crumbs: [[l.short, path]], jsonLd: ld })
  const guides = l.guides.map((g) => articles.find((a) => a.slug === g)).filter(Boolean)
  return (
    <>
      <PageHero eyebrow="Kenya" crumbs={[[l.short, path]]} title={l.h1} text={l.intro[0]} image={svc.image} alt={svc.imageAlt}>
        <Link to="/contact" className="btn-red">Start a project</Link>
        <Link to={`/services/${svc.slug}`} className="text-sm font-semibold text-red u-link">{svc.title}</Link>
      </PageHero>
      <section className="wrap section">
        <p className="lead max-w-3xl">{l.intro[1]}</p>
        <SectionHead title="Why work with LOOK AFRICA TECHNOLOGY" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {l.points.map(([h, p], i) => <li key={h} className="flex gap-4 rounded-2xl border border-line bg-white p-5"><IconCircle name={svc.icon} i={i} size="h-10 w-10" /><span><span className="block font-semibold">{h}</span><span className="mt-1 block text-sm leading-6 text-mute">{p}</span></span></li>)}
        </ul>
      </section>
      <section className="bg-soft"><div className="wrap section grid gap-8 lg:grid-cols-2">
        <SectionHead title="What we build" />
        <ul className="grid gap-3 sm:grid-cols-2">{l.includes.map((x) => <li key={x} className="flex gap-3 text-sm"><Check size={18} className="mt-0.5 shrink-0 text-teal" aria-hidden />{x}</li>)}</ul>
      </div></section>
      <section className="wrap section">
        <SectionHead title="Frequently asked questions" />
        <div className="[&>ul]:mx-0 [&>ul]:max-w-3xl"><Faq items={l.faqs} /></div>
      </section>
      <section className="wrap pb-12">
        <h2 className="text-xl">Helpful guides</h2>
        <ul className="mt-4 flex flex-wrap gap-2">{guides.map((g) => g && <li key={g.slug}><Link to={`/insights/${g.slug}`} className="inline-block rounded-full bg-soft px-4 py-2 text-sm font-medium text-navy hover:bg-butter">{g.title}</Link></li>)}</ul>
        <h2 className="mt-8 text-xl">More services in Kenya</h2>
        <ul className="mt-4 flex flex-wrap gap-2">{landing.filter((x) => x.slug !== l.slug).map((x) => <li key={x.slug}><Link to={`/${x.slug}`} className="inline-block rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy hover:bg-butter">{x.short}</Link></li>)}</ul>
      </section>
      <CtaBlock />
    </>
  )
}
