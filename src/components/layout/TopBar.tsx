import { Mail } from 'lucide-react'
import { mailto, site, whatsappLink } from '../../data/site'
import SocialLinks, { WhatsAppGlyph } from '../ui/Social'
export default function TopBar() {
  return (
    <div className="hidden bg-navy text-xs text-white sm:block">
      <div className="wrap flex h-10 items-center justify-between">
        <div className="flex items-center gap-6">
          <a href={mailto} className="flex items-center gap-2 hover:underline"><Mail size={14} aria-hidden />{site.email}</a>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline"><WhatsAppGlyph s={16} />{site.whatsappDisplay}</a>
        </div>
        <SocialLinks size={28} className="!gap-2" />
      </div>
    </div>
  )
}
