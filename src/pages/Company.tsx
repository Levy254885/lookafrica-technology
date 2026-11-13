import { Link } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import { useSeo } from '../hooks/useSeo'
import { faqs } from '../data/content'
import { clients } from '../data/clients'
import { toolGroups } from '../data/tools'
import { CtaBlock, Faq, PageHero, SectionHead } from '../components/ui/UI'
import ProcessExplorer from '../components/ui/ProcessExplorer'
import ExpandingPanels from '../components/ui/ExpandingPanels'
import ToolsMarquee from '../components/ui/ToolsMarquee'
import { ClientsMarquee } from '../components/ui/ClientsStrip'

export function HowWeWork() {
  useSeo({ title: 'How we work', description: 'Our six-step delivery process: discover, strategise, design, engineer, deploy and support.', path: '/how-we-work', crumbs: [['How we work', '/how-we-work']] })
  return (
    <>
      <PageHero eyebrow="How we work" crumbs={[['How we work', '/how-we-work']]} title={<>A clear process from <span className="text-copper">first call to launch.</span></>} text="Every project follows the same six steps. Select a step to see what you can expect." />
      <section className="wrap section"><ProcessExplorer detailed /></section>
      <section className="bg-soft"><div className="wrap section grid gap-10 lg:grid-cols-2">
        <SectionHead title="What we ask from you" text="Good projects are collaborations. These keep things moving." />
        <ul className="space-y-3">{['A named person who can make decisions', 'Access to the people who will use the product', 'Content, branding and existing systems we should know about', 'Timely feedback at each stage'].map((x) => <li key={x} className="flex gap-3 rounded-xl bg-white p-4 text-sm"><Check size={18} className="mt-0.5 shrink-0 text-teal" aria-hidden />{x}</li>)}</ul>
      </div></section>
      <CtaBlock />
    </>
  )
}
export function WhyUs() {
  useSeo({ title: 'Why LOOK AFRICA', description: 'Business-first thinking, purposeful engineering, practical solutions, quality-focused delivery and long-term technology thinking.', path: '/why-look-africa', crumbs: [['Why LOOK AFRICA', '/why-look-africa']] })
  return (
    <>
      <PageHero eyebrow="Why LOOK AFRICA" crumbs={[['Why LOOK AFRICA', '/why-look-africa']]} title={<>Technology that fits <span className="text-copper">how you really work.</span></>} text="Five principles guide every decision we make. Hover or tap a panel to explore." />
      <section className="wrap section"><ExpandingPanels /></section>
      <section className="wrap pb-16"><p className="max-w-2xl rounded-2xl bg-soft p-6 text-sm leading-6 text-mute">We are open about what we deliver ourselves and where a specialist partner is the better choice. We would rather tell you that up front than overpromise.</p></section>
      <CtaBlock />
    </>
  )
}
export function ClientsPage() {
  useSeo({ title: 'Clients', description: 'A selection of the businesses and organisations LOOK AFRICA TECHNOLOGY has worked with.', path: '/clients', crumbs: [['Clients', '/clients']] })
  return (
    <>
      <PageHero eyebrow="Clients" crumbs={[['Clients', '/clients']]} title={<>Organisations we have <span className="text-copper">built for.</span></>} text="A selection of the businesses we have worked with. Tap a logo to visit their website." />
      <section className="border-y border-line bg-white py-10"><ClientsMarquee /></section>
      <section className="wrap section">
        <ul className="divide-y divide-line border-y border-line">
          {clients.map((c) => <li key={c.name}><a href={c.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-5"><span><span className="block font-display text-lg font-bold group-hover:text-copper">{c.name}</span><span className="text-sm text-mute">{c.note ?? c.domain}</span></span><ArrowUpRight className="text-red transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden /></a></li>)}
        </ul>
        <p className="mt-6 text-sm text-mute">These are a few of the organisations we work with.</p>
      </section>
      <CtaBlock title="Want to work with us?" />
    </>
  )
}
export function Technologies() {
  useSeo({ title: 'Technologies', description: 'The languages, frameworks and tools LOOK AFRICA TECHNOLOGY builds with.', path: '/technologies', crumbs: [['Technologies', '/technologies']] })
  return (
    <>
      <PageHero eyebrow="Technologies" crumbs={[['Technologies', '/technologies']]} title={<>The tools we <span className="text-copper">build with.</span></>} text="Modern, proven technologies, chosen for each project rather than by habit." />
      <section className="border-y border-line bg-white py-10"><ToolsMarquee /></section>
      <section className="wrap section grid gap-10 sm:grid-cols-2">
        {toolGroups.map(([g, list]) => <div key={g}><h2 className="text-xl">{g}</h2><ul className="mt-4 flex flex-wrap gap-2">{list.map((t) => <li key={t} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy">{t}</li>)}</ul></div>)}
      </section>
      <CtaBlock />
    </>
  )
}
export function FaqPage() {
  useSeo({ title: 'FAQs', description: 'Answers to common questions about working with LOOK AFRICA TECHNOLOGY.', path: '/faq', crumbs: [['FAQs', '/faq']] })
  return (
    <>
      <PageHero eyebrow="FAQs" crumbs={[['FAQs', '/faq']]} title={<>Frequently asked <span className="text-copper">questions.</span></>} text="Can't find your answer? Message us on WhatsApp or send an enquiry." />
      <section className="wrap section"><Faq items={faqs} /><p className="mt-8 text-center text-sm text-mute">Still unsure? <Link to="/contact" className="font-semibold text-red u-link">Contact us</Link></p></section>
      <CtaBlock />
    </>
  )
}
