import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { icons, tones, type IconName } from '../../lib/icons'
import { whatsappLink } from '../../data/site'
import Reveal from './Reveal'
import ProcessExplorer from './ProcessExplorer'

export function IconCircle({ name, i = 0, size = 'h-14 w-14' }: { name: IconName; i?: number; size?: string }) {
  const Icon = icons[name]
  return <span className={`grid ${size} shrink-0 place-items-center rounded-full ${tones[i % 4]}`}><Icon size={26} aria-hidden /></span>
}
export function Crumbs({ items }: { items: [string, string][] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-mute">
      <ol className="flex flex-wrap gap-2">
        <li><Link className="u-link" to="/">Home</Link></li>
        {items.map(([n, p], i) => <li key={p} className="flex gap-2"><span aria-hidden>/</span>{i === items.length - 1 ? <span aria-current="page" className="text-ink">{n}</span> : <Link className="u-link" to={p}>{n}</Link>}</li>)}
      </ol>
    </nav>
  )
}
export function PageHero({ eyebrow, title, text, image, alt, crumbs, children }: { eyebrow: string; title: React.ReactNode; text: string; image?: string; alt?: string; crumbs?: [string, string][]; children?: React.ReactNode }) {
  return (
    <section className="border-b border-line">
      <div className="wrap py-10 sm:py-14">
        {crumbs && <Crumbs items={crumbs} />}
        <div className={`mt-8 grid items-center gap-10 ${image ? 'lg:grid-cols-2 lg:gap-16' : ''}`}>
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-5 text-4xl leading-[1.12] sm:text-5xl">{title}</h1>
            <p className="lead mt-6 max-w-xl">{text}</p>
            {children && <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">{children}</div>}
          </div>
          {image && <motion.img initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} src={image} alt={alt ?? ''} className="aspect-[4/3] w-full rounded-2xl object-cover" fetchPriority="high" />}
        </div>
      </div>
    </section>
  )
}
export function SectionHead({ eyebrow, title, text, center }: { eyebrow?: string; title: string; text?: string; center?: boolean }) {
  return (
    <Reveal className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className={`eyebrow mb-4 ${center ? 'justify-center before:hidden' : ''}`}>{eyebrow}</p>}
      <h2 className="h2">{title}</h2>
      {text && <p className="lead mt-4">{text}</p>}
    </Reveal>
  )
}
export function CtaBlock({ title = 'Ready to build something that moves your business forward?', text = 'Tell us about your project and we will respond with a considered next step.' }: { title?: string; text?: string }) {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="rounded-3xl bg-red p-8 text-center text-white sm:p-14">
          <h2 className="mx-auto max-w-2xl text-3xl leading-tight !text-white sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">{text}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/contact" className="btn-white">Start a project <ArrowRight size={18} aria-hidden /></Link>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-white underline underline-offset-4">Talk to our team on WhatsApp</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
export function Faq({ items }: { items: readonly (readonly [string, string])[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <ul className="mx-auto mt-10 max-w-3xl space-y-3">
      {items.map(([q, a], i) => (
        <li key={q} className="rounded-2xl border border-line bg-white">
          <h3 className="text-base">
            <button className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
              {q}<ChevronDown size={18} aria-hidden className={`shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
          </h3>
          <AnimatePresence initial={false}>
            {open === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden"><p className="px-5 pb-5 leading-7 text-mute">{a}</p></motion.div>}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  )
}
export function ProcessDark({ title = 'From first conversation to launch and beyond' }: { title?: string }) {
  return (
    <section className="bg-[#0b0b0b] text-white">
      <div className="wrap py-14 sm:py-20">
        <Reveal><h2 className="mx-auto mb-10 max-w-2xl text-center text-3xl leading-tight !text-white sm:text-4xl">{title}</h2></Reveal>
        <ProcessExplorer dark />
      </div>
    </section>
  )
}
