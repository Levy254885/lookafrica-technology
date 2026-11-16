import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { services } from '../../data/services'
import { IconCircle } from './UI'

const more = [['Industries', '/industries'], ['How we work', '/how-we-work'], ['Why LOOK AFRICA', '/why-look-africa'], ['Our Work', '/work'], ['Insights', '/insights'], ['Clients', '/clients'], ['Technologies', '/technologies'], ['About us', '/about'], ['FAQs', '/faq'], ['Contact', '/contact']]
const list = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } }
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } } }

export default function ExploreGrid() {
  return (
    <section className="wrap py-12 sm:py-16">
      <h2 className="h2">What we do</h2>
      <motion.ul variants={list} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {services.map((s, i) => (
          <motion.li key={s.slug} variants={item}>
            <Link to={`/services/${s.slug}`} className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <IconCircle name={s.icon} i={i} size="h-10 w-10" />
              <span className="text-sm font-semibold leading-snug">{s.title}</span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
      <p className="mt-10 text-sm font-semibold text-mute">Explore more</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {more.map(([t, to]) => <li key={to}><Link to={to} className="inline-block rounded-full bg-soft px-4 py-2 text-sm font-medium text-navy transition-colors hover:bg-butter">{t}</Link></li>)}
      </ul>
    </section>
  )
}
