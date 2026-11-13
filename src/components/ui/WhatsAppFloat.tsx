import { whatsappLink } from '../../data/site'
import { WhatsAppGlyph } from './Social'
export default function WhatsAppFloat() {
  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
      className="fixed right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-200 hover:scale-105"><WhatsAppGlyph s={32} /></a>
  )
}
