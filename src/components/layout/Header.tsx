import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { services } from '../../data/services'
import { IconCircle } from '../ui/UI'
import type { IconName } from '../../lib/icons'
import { industries } from '../../data/industries'

const menus = {
  Services: { base: '/services', items: services },
  Industries: { base: '/industries', items: industries },
  Company: { base: '', items: [
    { slug: 'about', title: 'About us', short: 'Who we are and what we believe.', icon: 'Compass' },
    { slug: 'how-we-work', title: 'How we work', short: 'Our six-step delivery process.', icon: 'Rocket' },
    { slug: 'why-look-africa', title: 'Why LOOK AFRICA', short: 'The principles behind our work.', icon: 'Target' },
    { slug: 'clients', title: 'Clients', short: 'Organisations we have worked with.', icon: 'Users' },
    { slug: 'technologies', title: 'Technologies', short: 'The tools we build with.', icon: 'Code2' },
    { slug: 'faq', title: 'FAQs', short: 'Answers to common questions.', icon: 'HelpCircle' },
  ] as { slug: string; title: string; short: string; icon: IconName }[] },
} as const
const plain = [['Our Work', '/work'], ['Insights', '/insights'], ['Contact', '/contact']]

export default function Header() {
  const [open, setOpen] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => { setOpen(null); setMobile(false) }, [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    const onClick = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(null)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick) }
  }, [])
  useEffect(() => { document.body.style.overflow = mobile ? 'hidden' : '' }, [mobile])

  const link = 'u-link py-1 text-sm text-ink'
  return (
    <header ref={ref} className={`sticky top-0 z-50 bg-cream transition-shadow duration-300 ${scrolled ? 'shadow-[0_1px_0_#E8E8E6]' : ''}`}>
      <div className="wrap flex h-16 items-center justify-between">
        <Link to="/" aria-label="LOOK AFRICA Technology home" className="flex items-center gap-3">
          <img src="/images/brand/look-logo.png" alt="LOOK" className="h-9 w-auto mix-blend-multiply" />
          <span className="hidden text-xs font-medium tracking-wide text-mute sm:inline">AFRICA TECHNOLOGY</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {(Object.keys(menus) as (keyof typeof menus)[]).map((name) => {
            const m = menus[name]
            return (
              <div key={name} className="relative" onMouseEnter={() => setOpen(name)} onMouseLeave={() => setOpen(null)}>
                <button className={`${link} inline-flex items-center gap-1`} aria-expanded={open === name} aria-haspopup="true"
                  onClick={() => setOpen(open === name ? null : name)}>
                  {name}<ChevronDown size={14} aria-hidden className={`transition-transform ${open === name ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {open === name && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.18 }}
                      className="absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-3">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-1 border border-line bg-white p-6 shadow-sm">
                        {m.items.map((i, n) => (
                          <Link key={i.slug} to={`${m.base}/${i.slug}`} className="group flex items-start gap-3 py-2">
                            <IconCircle name={i.icon} i={n} size="h-9 w-9" />
                            <span><span className="block text-sm font-medium group-hover:text-copper">{i.title}</span>
                            <span className="block text-xs leading-5 text-mute">{i.short}</span></span>
                          </Link>
                        ))}
                        {m.base && <Link to={m.base} className="col-span-2 mt-2 border-t border-line pt-4 text-sm font-medium text-copper">All {name.toLowerCase()}</Link>}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
          {plain.map(([l, to]) => <NavLink key={to} to={to} className={link}>{l}</NavLink>)}
          <Link to="/contact" className="btn-red !px-5 !py-2.5 !text-sm">Start a Project</Link>
        </nav>

        <button className="-mr-2 p-2 lg:hidden" aria-label={mobile ? 'Close menu' : 'Open menu'} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
          {mobile ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobile && (
          <motion.nav aria-label="Mobile" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-cream px-5 pb-10 lg:hidden">
            {(Object.keys(menus) as (keyof typeof menus)[]).map((name) => (
              <details key={name} className="border-b border-line py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-medium">{name}<ChevronDown size={18} aria-hidden /></summary>
                <ul className="mt-3 space-y-3 pl-1">
                  {menus[name].items.map((i) => <li key={i.slug}><Link className="block py-1 text-mute" to={`${menus[name].base}/${i.slug}`}>{i.title}</Link></li>)}
                </ul>
              </details>
            ))}
            {plain.map(([l, to]) => <Link key={to} to={to} className="block border-b border-line py-4 text-lg font-medium">{l}</Link>)}
            <Link to="/contact" className="btn-red mt-8 w-full">Start a Project</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
