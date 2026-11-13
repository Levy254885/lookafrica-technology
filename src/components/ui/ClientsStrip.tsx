import { clients } from '../../data/clients'
import Marquee from './Marquee'
import ArrowLink from './ArrowLink'
import { SectionHead } from './UI'

export function ClientsMarquee() {
  if (clients.length === 0) return null
  const items = clients.map((c) => {
    const img = c.logo
      ? <img src={c.logo} alt={`${c.name} logo`} loading="lazy" className={c.dark ? 'h-14 w-auto rounded-lg' : 'h-20 w-auto mix-blend-multiply'} />
      : <span className="font-display text-lg font-bold text-navy">{c.name}</span>
    return c.url
      ? <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${c.name}`} className="flex h-24 items-center px-6 transition-transform duration-200 hover:scale-105">{img}</a>
      : <span key={c.name} className="flex h-24 items-center px-6">{img}</span>
  })
  return <Marquee items={items} seconds={40} repeat={3} />
}
export default function ClientsStrip() {
  if (clients.length === 0) return null
  return (
    <section className="section">
      <div className="wrap"><SectionHead center title="Clients we have worked with" text="A selection of the businesses and organisations we have built for." /></div>
      <div className="mt-10"><ClientsMarquee /></div>
      <div className="mt-8 text-center"><ArrowLink to="/clients">See all clients</ArrowLink></div>
    </section>
  )
}
