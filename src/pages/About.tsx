import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import { about } from '../data/content'
import { CtaBlock, PageHero, ProcessDark, SectionHead } from '../components/ui/UI'
import Reveal from '../components/ui/Reveal'

export default function About() {
  useSeo({ title: 'About', description: 'LOOK AFRICA TECHNOLOGY is the technology division of LOOK AFRICA GROUP LIMITED, designing and delivering digital solutions from Kenya and East Africa for clients globally.', path: '/about', crumbs: [['About', '/about']] })
  const f = about.founder
  return (
    <>
      <PageHero eyebrow="About us" crumbs={[['About', '/about']]} title={<>A technology company built to <span className="text-copper">move business forward.</span></>} text="LOOK AFRICA TECHNOLOGY is the technology division of LOOK AFRICA GROUP LIMITED. We design, engineer and deliver digital solutions for businesses anywhere, from our operational base in Kenya and East Africa." image="/images/about/boardroom-nairobi.webp" alt="Professionals meeting around a boardroom table">
        <Link to="/contact" className="btn-red">Start a project</Link>
      </PageHero>
      <section className="wrap section grid gap-6 md:grid-cols-2">
        {[['Mission', about.mission], ['Vision', about.vision]].map(([t, d]) => <Reveal key={t} className="rounded-3xl bg-soft p-8"><h2 className="text-2xl">{t}</h2><p className="lead mt-4">{d}</p></Reveal>)}
      </section>
      <section className="wrap pb-16">
        <SectionHead title="Our values" />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{about.values.map(([t, d]) => <li key={t} className="rounded-2xl border border-line bg-white p-6"><h3 className="text-lg">{t}</h3><p className="mt-2 text-sm leading-6 text-mute">{d}</p></li>)}</ul>
        <div className="mt-14 max-w-3xl"><h2 className="h2">Technology philosophy</h2><p className="lead mt-4">{about.philosophy}</p></div>
      </section>
      <ProcessDark title="How we deliver" />
      <section className="wrap section">
        <SectionHead eyebrow="Leadership" title="Founder & Technology Lead" />
        <div className="mt-8 flex flex-col gap-6 rounded-3xl border border-line bg-white p-8 sm:flex-row sm:items-center">
          <span className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-butter font-display text-3xl font-bold text-navy" aria-hidden>LM</span>
          <div><h3 className="text-xl">{f.name}</h3><p className="text-sm font-semibold text-copper">{f.role}</p><p className="mt-3 max-w-2xl leading-7 text-mute">{f.bio}</p></div>
        </div>
      </section>
      <CtaBlock />
    </>
  )
}
