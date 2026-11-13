import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { useSeo } from '../hooks/useSeo'
import { services, type Service } from '../data/services'
import { industries } from '../data/industries'
import { whatsappLink } from '../data/site'
import { CtaBlock, IconCircle, PageHero, ProcessDark, SectionHead } from '../components/ui/UI'
import Reveal from '../components/ui/Reveal'
import NotFound from './NotFound'

export function ServicesIndex() {
  useSeo({ title: 'Services', description: 'Digital engineering, software development, mobile solutions, digital experience, cloud infrastructure and digital growth services from LOOK AFRICA TECHNOLOGY.', path: '/services', crumbs: [['Services', '/services']] })
  return (
    <>
      <PageHero eyebrow="Our services" crumbs={[['Services', '/services']]} title={<>Six ways we help your business <span className="text-copper">move forward.</span></>} text="From websites and custom software to cloud infrastructure and search visibility, choose a starting point and we will help you shape the rest.">
        <Link to="/contact" className="btn-red">Start a project</Link>
      </PageHero>
      <section className="wrap section">
        <ul className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <li key={s.slug}><Reveal delay={(i % 2) * 0.05} className="h-full">
              <Link to={`/services/${s.slug}`} className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-shadow hover:shadow-md">
                <img src={s.image} alt={s.imageAlt} loading="lazy" className="aspect-[16/9] w-full rounded-xl object-cover" />
                <div className="mt-5 flex items-center gap-4"><IconCircle name={s.icon} i={i} size="h-11 w-11" /><h2 className="text-xl">{s.title}</h2></div>
                <p className="mt-3 flex-1 text-sm leading-6 text-mute">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red">Learn more <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </Reveal></li>
          ))}
        </ul>
      </section>
      <CtaBlock />
    </>
  )
}

export function ServiceDetail() {
  const { slug } = useParams()
  const s = services.find((x) => x.slug === slug)
  return s ? <View s={s} /> : <NotFound />
}

function View({ s }: { s: Service }) {
  const path = `/services/${s.slug}`
  useSeo({ title: s.title, description: `${s.intro} ${s.short}`, path, crumbs: [['Services', '/services'], [s.title, path]],
    jsonLd: { '@type': 'Service', name: s.title, description: s.short, provider: { '@type': 'Organization', name: 'LOOK AFRICA TECHNOLOGY', url: 'https://lookafrica.com' } } })
  const related = s.related.map((r) => services.find((x) => x.slug === r)!)
  return (
    <>
      <PageHero eyebrow="Service" crumbs={[['Services', '/services'], [s.title, path]]} title={s.title} text={s.intro} image={s.image} alt={s.imageAlt}>
        <Link to="/contact" className="btn-red">Start a project</Link>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-red u-link">Talk to our team →</a>
      </PageHero>
      <section className="wrap section">
        <SectionHead eyebrow="Problems we solve" title="Where businesses get stuck" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {s.problems.map((p, i) => <li key={p}><Reveal delay={i * 0.05} className="flex h-full gap-4 rounded-2xl border border-line bg-white p-6"><IconCircle name={s.icon} i={i} size="h-11 w-11" /><p className="text-sm leading-6 text-mute">{p}</p></Reveal></li>)}
        </ul>
      </section>
      <section className="bg-soft"><div className="wrap section grid gap-10 lg:grid-cols-2">
        <div><SectionHead eyebrow="What is included" title="How we help" text={s.detail} /></div>
        <ul className="flex flex-wrap content-start gap-3">{s.offerings.map((o) => <li key={o} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy">{o}</li>)}</ul>
      </div></section>
      <section className="wrap section grid gap-12 lg:grid-cols-2">
        <div><h2 className="h2">Deliverables</h2><ul className="mt-6 space-y-3">{s.deliverables.map((d) => <li key={d} className="flex gap-3 text-mute"><Check size={20} className="mt-0.5 shrink-0 text-teal" aria-hidden />{d}</li>)}</ul></div>
        <div><h2 className="h2">Typical use cases</h2><ul className="mt-6 space-y-3">{s.useCases.map((u) => <li key={u} className="rounded-xl border border-line bg-white p-4 text-sm text-mute">{u}</li>)}</ul></div>
      </section>
      <section className="wrap pb-16"><h2 className="text-xl">Industries this applies to</h2>
        <ul className="mt-4 flex flex-wrap gap-3">{s.industries.map((i) => { const ind = industries.find((x) => x.slug === i)!; return <li key={i}><Link className="btn-butter" to={`/industries/${i}`}>{ind.title}</Link></li> })}</ul>
      </section>
      <ProcessDark title="Our delivery approach" />
      <section className="wrap section">
        <h2 className="text-xl">Relevant technologies</h2>
        <ul className="mt-4 flex flex-wrap gap-3">{s.tech.map((t) => <li key={t} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy">{t}</li>)}</ul>
        {s.note && <p className="mt-6 max-w-2xl rounded-xl bg-soft p-4 text-sm leading-6 text-mute">{s.note}</p>}
        <h2 className="mt-14 text-xl">Related services</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">{related.map((r, i) => <li key={r.slug}><Link to={`/services/${r.slug}`} className="block h-full rounded-2xl border border-line bg-white p-5 transition-shadow hover:shadow-md"><IconCircle name={r.icon} i={i} size="h-10 w-10" /><span className="mt-3 block font-semibold">{r.title}</span><span className="mt-1 block text-sm text-mute">{r.short}</span></Link></li>)}</ul>
      </section>
      <CtaBlock title={`Need ${s.title.toLowerCase()} for your business?`} />
    </>
  )
}
