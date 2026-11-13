import { Link } from 'react-router-dom'
import { Mail, MapPin } from 'lucide-react'
import { mailto, site, whatsappLink } from '../../data/site'
import { services } from '../../data/services'
import { industries } from '../../data/industries'
import SocialLinks, { WhatsAppGlyph } from '../ui/Social'

const l = 'text-sm text-white/80 u-link hover:text-white'
const Col = ({ t, items, cls = '' }: { t: string; items: string[][]; cls?: string }) => (
  <nav aria-label={t} className={cls}>
    <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffd9a8]">{t}</h2>
    <ul className="mt-5 space-y-3">{items.map(([n, to]) => <li key={n}><Link className={l} to={to}>{n}</Link></li>)}</ul>
  </nav>
)
export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="wrap">
        <div className="flex flex-col gap-6 border-b border-white/15 py-12 md:flex-row md:items-center md:justify-between">
          <div><h2 className="font-display text-2xl font-bold !text-white sm:text-3xl">Let's build something that works.</h2><p className="mt-2 text-white/70">Tell us about your project, or message us directly.</p></div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn-white">Start a project</Link>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-semibold text-white"><WhatsAppGlyph s={20} />WhatsApp us</a>
          </div>
        </div>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="inline-block rounded-xl bg-white px-4 py-2"><img src="/images/brand/look-logo.png" alt="LOOK" className="h-9 w-auto mix-blend-multiply" /></span>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/75">{site.tagline} A division of {site.parent}.</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-center gap-3"><Mail size={16} aria-hidden className="text-[#ffd9a8]" /><a className={l} href={mailto}>{site.email}</a></li>
              <li className="flex items-center gap-3"><WhatsAppGlyph s={16} color="#ffd9a8" /><a className={l} href={whatsappLink} target="_blank" rel="noopener noreferrer">{site.whatsappDisplay}</a></li>
              <li className="flex items-center gap-3 text-white/80"><MapPin size={16} aria-hidden className="text-[#ffd9a8]" />Kenya / East Africa</li>
            </ul>
            <SocialLinks className="mt-6" />
          </div>
          <Col cls="lg:col-span-3" t="Services" items={[['All services', '/services'], ...services.map((s) => [s.title, `/services/${s.slug}`])]} />
          <Col cls="lg:col-span-2" t="Industries" items={[['All industries', '/industries'], ...industries.map((s) => [s.title, `/industries/${s.slug}`])]} />
          <Col cls="lg:col-span-3" t="Company" items={[['About us', '/about'], ['How we work', '/how-we-work'], ['Why LOOK AFRICA', '/why-look-africa'], ['Our Work', '/work'], ['Clients', '/clients'], ['Technologies', '/technologies'], ['Insights', '/insights'], ['FAQs', '/faq'], ['Contact', '/contact']]} />
        </div>
        <div className="flex flex-col items-center gap-3 border-t border-white/15 py-6 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}, a division of {site.parent}.</p>
          <div className="flex gap-6"><Link className="u-link hover:text-white" to="/privacy-policy">Privacy Policy</Link><Link className="u-link hover:text-white" to="/terms-of-service">Terms of Service</Link></div>
        </div>
      </div>
    </footer>
  )
}
