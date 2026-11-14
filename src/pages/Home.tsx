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
import HeroSlider from '../components/ui/HeroSlider'
import ExploreGrid from '../components/ui/ExploreGrid'

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
      <HeroSlider />

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

      <ExploreGrid />

      <KenyaMapSection />
      <CtaBlock />
    </>
  )
}
