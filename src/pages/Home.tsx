import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { useSeo } from '../hooks/useSeo'
import { services } from '../data/services'
import { icons, type IconName } from '../lib/icons'
import { CtaBlock } from '../components/ui/UI'
import Reveal from '../components/ui/Reveal'
import ToolsMarquee from '../components/ui/ToolsMarquee'
import { ClientsMarquee } from '../components/ui/ClientsStrip'
import ArrowLink from '../components/ui/ArrowLink'
import KenyaMapSection from '../components/ui/KenyaMap'

const stats = [[String(services.length), 'service areas', 'text-teal'], ['5', 'industries served', 'text-blue'], ['6', 'step delivery process', 'text-orange']]
type T = { to: string; title: string; desc: string; icon: IconName; cls: string; span?: string }
const tiles: T[] = [
  { to: '/industries', title: 'Industries', desc: 'Education, real estate, healthcare, retail and professional services.', icon: 'Building2', cls: 'bg-butter text-[#4a3400]', span: 'md:col-span-2' },
  { to: '/how-we-work', title: 'How we work', desc: 'Six clear steps from first call to launch.', icon: 'Rocket', cls: 'bg-red text-white', span: 'md:col-span-2' },
  { to: '/why-look-africa', title: 'Why LOOK AFRICA', desc: 'The principles behind our work.', icon: 'Target', cls: 'bg-teal text-white', span: 'md:col-span-2' },
  { to: '/work', title: 'Our Work', desc: 'Projects and case studies.', icon: 'Briefcase', cls: 'bg-soft text-ink', span: 'md:col-span-2' },
  { to: '/insights', title: 'Insights', desc: 'Practical articles on technology.', icon: 'Newspaper', cls: 'bg-white text-ink border border-line', span: 'md:col-span-2' },
  { to: '/clients', title: 'Clients', desc: 'Who we have built for.', icon: 'Users', cls: 'bg-white text-ink border border-line', span: 'md:col-span-2' },
  { to: '/technologies', title: 'Technologies', desc: 'The tools we build with.', icon: 'Code2', cls: 'bg-white text-ink border border-line', span: 'md:col-span-2' },
  { to: '/about', title: 'About us', desc: 'Our mission and leadership.', icon: 'Compass', cls: 'bg-blue text-white', span: 'md:col-span-2' },
  { to: '/faq', title: 'FAQs', desc: 'Answers to common questions.', icon: 'HelpCircle', cls: 'bg-soft text-ink', span: 'col-span-2 md:col-span-2' },
  { to: '/contact', title: 'Start a project', desc: 'Tell us what you need and we will respond with a considered next step.', icon: 'Mail', cls: 'bg-navy text-white', span: 'col-span-2 md:col-span-4' },
]

export default function Home() {
  useSeo({ description: 'We design, engineer and deliver digital solutions that help businesses operate smarter, compete effectively and grow. Based in Kenya and East Africa, serving clients globally.', path: '/' })
  return (
    <>
      <section className="wrap pt-6">
        <Reveal className="relative isolate overflow-hidden rounded-2xl p-7 text-center shadow-sm sm:p-10">
          <img src="/images/about/boardroom-skyline.webp" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#1a0f08]/85 via-[#8f3a0f]/70 to-[#f28c28]/50" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffd9a8]">Work with LOOK AFRICA</p>
          <p className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">Technology built around your business.</p>
          <p className="mx-auto mt-2 max-w-xl text-white/85">Tell us about your project and get a considered response from the team.</p>
          <Link to="/contact" className="btn-white mt-5 w-full max-w-md sm:w-auto">Start a project <ArrowRight size={18} aria-hidden /></Link>
        </Reveal>
      </section>

      <section className="wrap py-14 sm:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="eyebrow justify-center lg:justify-start">Digital engineering · Software · Innovation</p>
            <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-6 text-4xl leading-[1.15] sm:text-5xl">
              We build technology for businesses <span className="text-copper">ready to move forward.</span>
            </motion.h1>
            <p className="lead mx-auto mt-6 max-w-xl lg:mx-0">We partner with businesses to design, develop and deliver digital products, intelligent systems and technology solutions that create lasting value.</p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start sm:justify-center">
              <Link to="/services" className="btn-red w-full sm:w-auto">Explore our capabilities</Link>
              <Link to="/contact" className="text-sm font-semibold text-red u-link">Start a project →</Link>
            </div>
            <dl className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-4 text-left lg:mx-0">
              {stats.map(([n, l, c]) => <div key={l}><dt className={`font-display text-4xl font-bold italic ${c}`}>{n}</dt><dd className="mt-1 text-xs text-mute">{l}</dd></div>)}
            </dl>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-x-[16%] bottom-[14%] top-[6%] overflow-hidden rounded-2xl bg-butter">
              <img src="/images/hero/developer-workstation.webp" alt="Software developer writing code across a laptop and monitor" className="h-full w-full object-cover" fetchPriority="high" />
            </div>
            <img src="/images/industries/professional-laptop.webp" alt="Professional working on a laptop" loading="lazy" className="absolute left-0 top-[26%] aspect-[3/4] w-[28%] rounded-xl border-4 border-white object-cover shadow-md" />
            <img src="/images/about/glass-office-building.webp" alt="Modern glass office building" loading="lazy" className="absolute bottom-[8%] right-0 aspect-[3/4] w-[28%] rounded-xl border-4 border-white object-cover shadow-md" />
            {[['Digital Engineering', 'Code2', 'right-[2%] top-[18%]'], ['Software Development', 'Layers', 'right-[0%] top-[30%]'], ['Cloud & Infrastructure', 'Cloud', 'left-[4%] bottom-[14%]']].map(([t, ic, pos], n) => {
              const Ic = icons[ic as IconName]
              return <span key={t} className={`absolute ${pos} flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-3 text-[11px] font-semibold shadow-md sm:text-xs`}><span className={`grid h-7 w-7 place-items-center rounded-full ${['bg-teal/10 text-teal', 'bg-red/10 text-red', 'bg-orange/15 text-orange'][n]}`}><Ic size={15} aria-hidden /></span>{t}</span>
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-10">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-navy">Clients we have worked with</p>
        <div className="mt-4"><ClientsMarquee /></div>
        <p className="mt-8 text-center text-xs font-bold uppercase tracking-[0.2em] text-navy">Tools we build with</p>
        <div className="mt-5"><ToolsMarquee /></div>
        <div className="wrap mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3"><ArrowLink to="/clients">All clients</ArrowLink><ArrowLink to="/technologies">All technologies</ArrowLink></div>
      </section>

      <section className="wrap py-14 sm:py-20">
        <Reveal className="mb-8 max-w-xl"><p className="eyebrow">Explore</p><h2 className="h2 mt-3">Everything in one place</h2></Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
          <div className="col-span-2 rounded-3xl bg-ink p-6 text-white sm:p-8 md:col-span-4 md:row-span-2">
            <Link to="/services" className="group inline-flex items-center gap-2 font-display text-2xl font-bold sm:text-3xl">Services <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden /></Link>
            <p className="mt-2 max-w-md text-sm text-white/70">Six ways we help your business move forward.</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {services.map((s) => { const Ic = icons[s.icon]; return (
                <li key={s.slug}><Link to={`/services/${s.slug}`} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 transition-colors hover:bg-white/20"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-red"><Ic size={18} aria-hidden /></span><span className="text-sm font-semibold">{s.title}</span></Link></li>
              ) })}
            </ul>
          </div>
          {tiles.map((t) => { const Ic = icons[t.icon]; return (
            <Link key={t.to} to={t.to} className={`group flex min-h-[7.5rem] flex-col justify-between rounded-3xl p-5 transition-transform duration-300 hover:-translate-y-1 ${t.cls} ${t.span ?? ''}`}>
              <span className="flex items-start justify-between"><Ic size={26} aria-hidden /><ArrowUpRight size={18} aria-hidden className="opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
              <span><span className="block font-display text-lg font-bold">{t.title}</span><span className="mt-1 hidden text-sm opacity-80 sm:block">{t.desc}</span></span>
            </Link>
          ) })}
        </div>
      </section>

      <KenyaMapSection />
      <CtaBlock />
    </>
  )
}
