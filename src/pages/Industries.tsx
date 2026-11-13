import { Link, useParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useSeo } from '../hooks/useSeo'
import { industries, type Industry } from '../data/industries'
import { services } from '../data/services'
import { CtaBlock, IconCircle, PageHero, SectionHead } from '../components/ui/UI'
import Reveal from '../components/ui/Reveal'
import NotFound from './NotFound'

export function IndustriesIndex() {
  useSeo({ title: 'Industries', description: 'How LOOK AFRICA TECHNOLOGY helps education, real estate, healthcare, retail and professional services organisations with practical digital solutions.', path: '/industries', crumbs: [['Industries', '/industries']] })
  return (
    <>
      <PageHero eyebrow="Industries" crumbs={[['Industries', '/industries']]} title={<>Technology shaped by <span className="text-copper">your industry.</span></>} text="Every sector has its own workflows, customers and constraints. Explore how digital solutions can solve real problems in yours.">
        <Link to="/contact" className="btn-red">Start a project</Link>
      </PageHero>
      <section className="wrap section"><ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((s, i) => <li key={s.slug}><Reveal delay={i * 0.05} className="h-full"><Link to={`/industries/${s.slug}`} className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-shadow hover:shadow-md">
          <img src={s.image} alt={s.imageAlt} loading="lazy" className="aspect-[16/10] w-full rounded-xl object-cover" />
          <div className="mt-5 flex items-center gap-3"><IconCircle name={s.icon} i={i} size="h-11 w-11" /><h2 className="text-xl">{s.title}</h2></div>
          <p className="mt-3 text-sm leading-6 text-mute">{s.short}</p>
        </Link></Reveal></li>)}
      </ul></section>
      <CtaBlock />
    </>
  )
}

export function IndustryDetail() {
  const { slug } = useParams()
  const s = industries.find((x) => x.slug === slug)
  return s ? <View s={s} /> : <NotFound />
}
function View({ s }: { s: Industry }) {
  const path = `/industries/${s.slug}`
  useSeo({ title: `${s.title} technology solutions`, description: `${s.intro} ${s.short}`, path, crumbs: [['Industries', '/industries'], [s.title, path]] })
  return (
    <>
      <PageHero eyebrow="Industry" crumbs={[['Industries', '/industries'], [s.title, path]]} title={s.title} text={s.intro} image={s.image} alt={s.imageAlt}>
        <Link to="/contact" className="btn-red">Start a project</Link>
      </PageHero>
      <section className="wrap section grid gap-12 lg:grid-cols-2">
        <div><SectionHead eyebrow="Common challenges" title="Where technology can help" /><ul className="mt-8 space-y-3">{s.challenges.map((c) => <li key={c} className="rounded-xl border border-line bg-white p-4 text-sm text-mute">{c}</li>)}</ul></div>
        <div className="rounded-3xl bg-soft p-8"><h2 className="text-2xl">Solutions we can deliver</h2><ul className="mt-6 space-y-3">{s.solutions.map((c) => <li key={c} className="flex gap-3 font-medium"><Check size={20} className="mt-0.5 shrink-0 text-teal" aria-hidden />{c}</li>)}</ul></div>
      </section>
      {s.note && <section className="wrap"><p className="rounded-xl border border-line bg-white p-5 text-sm leading-6 text-mute">{s.note}</p></section>}
      <section className="wrap section">
        <h2 className="text-xl">Services that apply</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3">{s.services.map((x, i) => { const v = services.find((y) => y.slug === x)!; return <li key={x}><Link to={`/services/${x}`} className="block h-full rounded-2xl border border-line bg-white p-5 transition-shadow hover:shadow-md"><IconCircle name={v.icon} i={i} size="h-10 w-10" /><span className="mt-3 block font-semibold">{v.title}</span><span className="mt-1 block text-sm text-mute">{v.short}</span></Link></li> })}</ul>
      </section>
      <CtaBlock title={`Building for ${s.title.toLowerCase()}?`} />
    </>
  )
}
