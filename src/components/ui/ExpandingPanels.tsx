import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { principles } from '../../data/content'
import { icons, type IconName } from '../../lib/icons'

const bgs = ['bg-red', 'bg-blue', 'bg-[#c2630a]', 'bg-teal', 'bg-navy']
export default function ExpandingPanels() {
  const [a, setA] = useState(0)
  return (
    <div className="flex flex-col gap-3 md:h-[24rem] md:flex-row">
      {principles.map(([t, d, ic], i) => {
        const Icon = icons[ic as IconName]; const on = a === i
        return (
          <button key={t} onClick={() => setA(i)} onMouseEnter={() => setA(i)} onFocus={() => setA(i)} aria-expanded={on}
            className={`${bgs[i]} relative overflow-hidden rounded-3xl p-6 text-left text-white transition-[flex] duration-500 md:p-7 ${on ? 'md:flex-[4]' : 'md:flex-1'}`}>
            <span className="flex items-center gap-4 md:block">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/20"><Icon size={24} aria-hidden /></span>
              <span className={`font-display text-lg font-bold md:mt-5 md:block ${on ? '' : 'md:mt-6 md:rotate-180 md:[writing-mode:vertical-rl]'}`}>{t}</span>
            </span>
            <AnimatePresence initial={false}>
              {on && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="mt-3 max-w-sm text-sm leading-6 text-white/90 md:absolute md:bottom-7 md:left-7 md:right-7">{d}</motion.p>}
            </AnimatePresence>
          </button>
        )
      })}
    </div>
  )
}
