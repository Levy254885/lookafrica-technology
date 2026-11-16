import { Link } from 'react-router-dom'
import { Mail, MapPin } from 'lucide-react'
import { mailto, site, whatsappLink } from '../../data/site'
import { services } from '../../data/services'
import { industries } from '../../data/industries'
import { landing } from '../../data/landing'
import SocialLinks, { WhatsAppGlyph } from '../ui/Social'

const l = 'text-sm text-white/80 hover:text-white'
const Col = ({ t, items, cls = '' }: { t: string; items: string[][]; cls?: string }) => (
  <nav aria-label={t} className={cls}>
    <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">{t}</h2>
    <ul className="mt-4 space-y-2.5">{items.map(([n, to]) => <li key={n}><Link className={l} to={to}>{n}</Link></li>)}</ul>
  </nav>
)
export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="wrap py-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="inline-block rounded-xl bg-white px-4 py-2"><img src="/images/brand/look-logo.png" alt="LOOK" className="h-8 w-auto mix-blend-multiply" /></span>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">{site.tagline}</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-center gap-3"><Mail size={16} aria-hidden className="text-white/60" /><a className={l} href={mailto}>{site.email}</a></li>
              <li className="flex items-center gap-3"><WhatsAppGlyph s={16} color="#ffffff99" /><a className={l} href={whatsappLink} target="_blank" rel="noopener noreferrer">{site.whatsappDisplay}</a></li>
              <li className="flex items-center gap-3 text-white/80"><MapPin size={16} aria-hidden className="text-white/60" />Kenya / East Africa</li>
            </ul>
            <SocialLinks className="mt-6" size={38} />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            <Col t="Services" items={services.map((s) => [s.title, `/services/${s.slug}`])} />
            <Col t="Industries" items={industries.map((s) => [s.title, `/industries/${s.slug}`])} />
            <Col t="In Kenya" items={landing.map((l) => [l.short, `/${l.slug}`])} />
            <Col t="Company" items={[['About us', '/about'], ['How we work', '/how-we-work'], ['Our Work', '/work'], ['Insights', '/insights'], ['Clients', '/clients'], ['FAQs', '/faq'], ['Contact', '/contact']]} />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}, a division of {site.parent}.</p>
          <div className="flex gap-6"><Link className="hover:text-white" to="/privacy-policy">Privacy Policy</Link><Link className="hover:text-white" to="/terms-of-service">Terms of Service</Link></div>
        </div>
      </div>
    </footer>
  )
}
