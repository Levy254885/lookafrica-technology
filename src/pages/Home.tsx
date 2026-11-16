import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import { CtaBlock } from '../components/ui/UI'
import ToolsMarquee from '../components/ui/ToolsMarquee'
import { ClientsMarquee } from '../components/ui/ClientsStrip'
import KenyaMapSection from '../components/ui/KenyaMap'
import HeroSlider from '../components/ui/HeroSlider'
import ExploreGrid from '../components/ui/ExploreGrid'
import { landing } from '../data/landing'

export default function Home() {
  useSeo({ title: 'Software Development Company in Kenya', description: 'LOOK AFRICA TECHNOLOGY is a software development company in Kenya. We build custom software, SaaS platforms, websites and mobile apps for businesses in Kenya and worldwide.', path: '/' })
  return (
    <>
      <HeroSlider />
      <section className="wrap py-12 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Digital engineering · Software · Innovation</p>
            <h1 className="mt-4 text-3xl leading-tight sm:text-5xl">We build technology for businesses <span className="text-copper">ready to move forward.</span></h1>
            <p className="lead mx-auto mt-5 max-w-xl lg:mx-0">We partner with businesses to design, develop and deliver digital products, intelligent systems and technology solutions that create lasting value.</p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link to="/services" className="btn-red w-full sm:w-auto">Explore our capabilities</Link>
              <Link to="/contact" className="text-sm font-semibold text-red u-link">Start a project</Link>
            </div>
          </div>
          <img src="/images/hero/developer-workstation.webp" alt="Software developer writing code across a laptop and monitor" className="mx-auto aspect-[4/3] w-full max-w-md rounded-2xl object-cover lg:max-w-none" fetchPriority="high" />
        </div>
      </section>
      <section className="border-y border-line bg-white py-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-mute">Clients we have worked with</p>
        <div className="mt-3"><ClientsMarquee /></div>
        <p className="mt-6 text-center text-xs font-semibold uppercase tracking-[0.16em] text-mute">Tools we build with</p>
        <div className="mt-4"><ToolsMarquee /></div>
      </section>
      <ExploreGrid />
      <section className="wrap pb-4 sm:pb-8">
        <h2 className="h2">Software development in Kenya</h2>
        <p className="lead mt-4 max-w-3xl">LOOK AFRICA TECHNOLOGY is a software development company in Kenya. We build custom software, web applications, e-commerce websites and mobile apps, with M-Pesa integration and search visibility built in, for clients in Kenya, East Africa and worldwide.</p>
        <ul className="mt-5 flex flex-wrap gap-2">{landing.map((l) => <li key={l.slug}><Link to={`/${l.slug}`} className="inline-block rounded-full bg-soft px-4 py-2 text-sm font-medium text-navy transition-colors hover:bg-butter">{l.title}</Link></li>)}</ul>
      </section>
      <KenyaMapSection />
      <CtaBlock />
    </>
  )
}
