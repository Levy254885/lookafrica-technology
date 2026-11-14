import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  { img: '/images/about/boardroom-skyline.webp', eyebrow: 'Work with LOOK AFRICA', title: 'Technology built around your business.', text: 'Tell us about your project and get a considered response from the team.', cta: 'Start a project', to: '/contact' },
  { img: '/images/hero/developer-workstation.webp', eyebrow: 'Digital Engineering', title: 'Websites and platforms engineered to perform.', text: 'Corporate sites, e-commerce, web apps and customer portals that are fast, accessible and easy to manage.', cta: 'Explore Digital Engineering', to: '/services/digital-engineering' },
  { img: '/images/services/crm-laptop.webp', eyebrow: 'Software Development', title: 'Custom software that fits how you work.', text: 'Business systems, SaaS platforms and automation that replace manual work.', cta: 'Explore Software Development', to: '/services/software-development' },
  { img: '/images/services/seo-audit-laptop.webp', eyebrow: 'Digital Growth', title: 'Be found in search and in AI answers.', text: 'Technical SEO, performance and analytics, plus content that answers real customer questions.', cta: 'Explore Digital Growth', to: '/services/digital-growth' },
  { img: '/images/services/server-aisle-blue.webp', eyebrow: 'Cloud & Infrastructure', title: 'Reliable hosting and care after launch.', text: 'Deployment, maintenance and performance work so what we build stays fast and available.', cta: 'Explore Cloud & Infrastructure', to: '/services/cloud-infrastructure' },
]

export default function HeroSlider() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = slides.length
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((x) => (x + 1) % n), 6000)
    return () => clearInterval(t)
  }, [paused, n])
  return (
    <section className="wrap pt-6" aria-roledescription="carousel" aria-label="Featured">
      <div className="relative isolate min-h-[21rem] overflow-hidden rounded-2xl shadow-sm sm:min-h-[23rem]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
        {slides.map((s, k) => (
          <div key={s.to + k} aria-hidden={k !== i} role="group" aria-roledescription="slide" aria-label={`${k + 1} of ${n}`}
            className={`absolute inset-0 flex flex-col items-center justify-center px-6 pb-14 pt-8 text-center transition-opacity duration-700 sm:px-16 ${k === i ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
            <img src={s.img} alt="" loading={k === 0 ? 'eager' : 'lazy'} className={`absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[6000ms] ease-out ${k === i ? 'scale-110' : 'scale-100'}`} />
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#1a0f08]/85 via-[#8f3a0f]/70 to-[#f28c28]/50" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffd9a8]">{s.eyebrow}</p>
            <p className="mt-2 max-w-2xl font-display text-2xl font-bold text-white sm:text-4xl">{s.title}</p>
            <p className="mx-auto mt-3 max-w-xl text-white/85">{s.text}</p>
            <Link to={s.to} tabIndex={k === i ? 0 : -1} className="btn-white mt-6">{s.cta} <ArrowRight size={18} aria-hidden /></Link>
          </div>
        ))}
        <button onClick={() => setI((i - 1 + n) % n)} aria-label="Previous slide" className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur-0 hover:bg-white/35 sm:grid"><ChevronLeft size={20} /></button>
        <button onClick={() => setI((i + 1) % n)} aria-label="Next slide" className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white hover:bg-white/35 sm:grid"><ChevronRight size={20} /></button>
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
          {slides.map((s, k) => <button key={s.to + k} onClick={() => setI(k)} aria-label={`Go to slide ${k + 1}`} aria-current={k === i} className={`h-2 rounded-full transition-all ${k === i ? 'w-7 bg-white' : 'w-2 bg-white/50'}`} />)}
        </div>
      </div>
    </section>
  )
}
