import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { services } from '../../data/services'
import { icons, type IconName } from '../../lib/icons'

type T = { to: string; title: string; desc: string; icon: IconName; cls: string; span?: string }
const tiles: T[] = [
  { to: '/industries', title: 'Industries', desc: 'Five sectors we serve', icon: 'Building2', cls: 'bg-butter text-[#4a3400]' },
  { to: '/how-we-work', title: 'How we work', desc: 'Six clear steps', icon: 'Rocket', cls: 'bg-red text-white' },
  { to: '/why-look-africa', title: 'Why LOOK AFRICA', desc: 'Our principles', icon: 'Target', cls: 'bg-teal text-white' },
  { to: '/work', title: 'Our Work', desc: 'Projects and case studies', icon: 'Briefcase', cls: 'bg-soft text-ink' },
  { to: '/insights', title: 'Insights', desc: '20 in-depth guides', icon: 'Newspaper', cls: 'bg-white text-ink border border-line' },
  { to: '/clients', title: 'Clients', desc: 'Who we have built for', icon: 'Users', cls: 'bg-white text-ink border border-line' },
  { to: '/technologies', title: 'Technologies', desc: 'Tools we build with', icon: 'Code2', cls: 'bg-white text-ink border border-line' },
  { to: '/about', title: 'About us', desc: 'Mission and leadership', icon: 'Compass', cls: 'bg-blue text-white' },
  { to: '/faq', title: 'FAQs', desc: 'Common questions', icon: 'HelpCircle', cls: 'bg-soft text-ink', span: 'col-span-2 md:col-span-1' },
]
const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const item = { hidden: { opacity: 0, y: 18, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' as const } } }
const sweep = 'before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent before:transition-transform before:duration-700 group-hover:before:translate-x-full'

export default function ExploreGrid() {
  const view = { once: true, margin: '-60px' }
  return (
    <section className="wrap py-12 sm:py-16">
      <div className="mb-6 flex items-end justify-between gap-4"><div><p className="eyebrow">Explore</p><h2 className="h2 mt-3 !text-3xl">Everything in one place</h2></div></div>
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={view} className="space-y-3">
        <motion.div variants={item} className="rounded-3xl bg-ink p-4 text-white sm:p-5">
          <Link to="/services" className="group inline-flex items-center gap-2 font-display text-lg font-bold">Services <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden /></Link>
          <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {services.map((s) => { const Ic = icons[s.icon]; return (
              <li key={s.slug}><Link to={`/services/${s.slug}`} className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-white/10 p-2.5 text-xs font-semibold transition-colors hover:bg-white/20 sm:text-sm">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-red transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"><Ic size={16} aria-hidden /></span><span className="leading-tight">{s.title}</span>
              </Link></li>
            ) })}
          </ul>
        </motion.div>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {tiles.map((t) => { const Ic = icons[t.icon]; return (
            <motion.li key={t.to} variants={item} className={t.span}>
              <Link to={t.to} className={`group relative flex h-full items-center gap-3 overflow-hidden rounded-2xl p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${sweep} ${t.cls}`}>
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${/text-white/.test(t.cls) ? 'bg-white/20' : 'bg-black/10'} transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}><Ic size={20} aria-hidden /></span>
                <span className="min-w-0"><span className="block font-display text-sm font-bold sm:text-base">{t.title}</span><span className="block truncate text-xs opacity-75">{t.desc}</span></span>
                <ArrowUpRight size={16} aria-hidden className="ml-auto shrink-0 opacity-50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </Link>
            </motion.li>
          ) })}
        </ul>
        <motion.div variants={item}>
          <Link to="/contact" className={`group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl bg-navy p-4 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${sweep}`}>
            <span className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-white/15"><icons.Mail size={20} aria-hidden /></span><span><span className="block font-display font-bold">Start a project</span><span className="block text-xs text-white/70">Tell us what you need and we will respond with a considered next step.</span></span></span>
            <ArrowRight size={18} aria-hidden className="shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
