import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const slides = [
  { img: '/images/about/boardroom-skyline.webp', title: 'Technology built around your business.', text: 'Tell us about your project and get a considered response from the team.', cta: 'Start a project', to: '/contact' },
  { img: '/images/hero/developer-workstation.webp', title: 'Websites and platforms that perform.', text: 'Corporate sites, online stores and web apps that are fast and easy to manage.', cta: 'Digital Engineering', to: '/services/digital-engineering' },
  { img: '/images/services/crm-laptop.webp', title: 'Custom software that fits how you work.', text: 'Business systems and automation that replace manual work.', cta: 'Software Development', to: '/services/software-development' },
  { img: '/images/services/seo-audit-laptop.webp', title: 'Be found in search and AI answers.', text: 'Technical SEO, performance and content that answers real questions.', cta: 'Digital Growth', to: '/services/digital-growth' },
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
    <section className="wrap pt-4 sm:pt-6" aria-roledescription="carousel" aria-label="Featured">
      <div className="relative isolate min-h-[17rem] overflow-hidden rounded-2xl sm:min-h-[22rem]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {slides.map((s, k) => (
          <div key={s.to} aria-hidden={k !== i} role="group" aria-roledescription="slide" aria-label={`${k + 1} of ${n}`}
            className={`absolute inset-0 flex flex-col items-center justify-center px-6 pb-10 text-center transition-opacity duration-700 ${k === i ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
            <img src={s.img} alt="" loading={k === 0 ? 'eager' : 'lazy'} className="absolute inset-0 -z-20 h-full w-full object-cover" />
            <div className="absolute inset-0 -z-10 bg-black/60" />
            <p className="max-w-2xl font-display text-2xl font-bold leading-tight text-white sm:text-4xl">{s.title}</p>
            <p className="mt-3 max-w-md text-sm text-white/85 sm:text-base">{s.text}</p>
            <Link to={s.to} tabIndex={k === i ? 0 : -1} className="btn-white mt-5 !px-6 !py-3 !text-sm">{s.cta}</Link>
          </div>
        ))}
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
          {slides.map((s, k) => <button key={s.to} onClick={() => setI(k)} aria-label={`Go to slide ${k + 1}`} aria-current={k === i} className={`h-1.5 rounded-full transition-all ${k === i ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`} />)}
        </div>
      </div>
    </section>
  )
}
