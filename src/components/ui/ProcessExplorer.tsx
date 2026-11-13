import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { process, processMeta } from '../../data/content'
import { icons } from '../../lib/icons'

export default function ProcessExplorer({ dark = false, detailed = false }: { dark?: boolean; detailed?: boolean }) {
  const [a, setA] = useState(0)
  const [title, desc] = process[a]; const m = processMeta[a]; const Icon = icons[m.icon]
  return (
    <div className={dark ? 'text-white' : 'text-ink'}>
      <ol className="relative mx-auto flex max-w-3xl items-start justify-between">
        <span aria-hidden className="absolute left-5 right-5 top-5 h-0.5 bg-current opacity-15" />
        <span aria-hidden className="absolute left-5 top-5 h-0.5 bg-copper transition-[width] duration-500" style={{ width: `calc((100% - 2.5rem) * ${a / 5})` }} />
        {process.map(([t], i) => (
          <li key={t} className="relative z-10 flex flex-col items-center gap-2">
            <button onClick={() => setA(i)} aria-label={`Step ${i + 1}: ${t}`} aria-current={a === i ? 'step' : undefined}
              className={`grid h-10 w-10 place-items-center rounded-full border-2 text-sm font-bold transition-colors ${i <= a ? 'border-copper bg-copper text-white' : dark ? 'border-white/30 bg-[#0b0b0b] text-white/70' : 'border-line bg-white text-mute'}`}>{i + 1}</button>
            <span className={`hidden text-xs font-semibold sm:block ${a === i ? '' : 'opacity-60'}`}>{t}</span>
          </li>
        ))}
      </ol>
      <AnimatePresence mode="wait">
        <motion.div key={a} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}
          className={`relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl p-7 sm:p-10 ${dark ? 'bg-white/[0.06]' : 'bg-soft'}`}>
          <span aria-hidden className="pointer-events-none absolute -right-2 -top-6 font-display text-[9rem] font-extrabold leading-none opacity-[0.07]">0{a + 1}</span>
          <span className="grid h-14 w-14 place-items-center rounded-full bg-copper text-white"><Icon size={26} aria-hidden /></span>
          <h3 className={`mt-5 text-2xl sm:text-3xl ${dark ? '!text-white' : ''}`}>{title}</h3>
          <p className={`mt-3 max-w-xl leading-7 ${dark ? 'text-white/75' : 'text-mute'}`}>{desc}</p>
          {detailed && <ul className="mt-6 space-y-2">{m.gets.map((g) => <li key={g} className="flex gap-3 text-sm"><Check size={18} className="mt-0.5 shrink-0 text-teal" aria-hidden />{g}</li>)}</ul>}
          <div className="mt-8 flex gap-3">
            <button onClick={() => setA(Math.max(0, a - 1))} disabled={a === 0} aria-label="Previous step" className="grid h-11 w-11 place-items-center rounded-full border border-current opacity-70 disabled:opacity-25"><ArrowLeft size={18} /></button>
            <button onClick={() => setA(Math.min(5, a + 1))} disabled={a === 5} aria-label="Next step" className="grid h-11 w-11 place-items-center rounded-full bg-copper text-white disabled:opacity-40"><ArrowRight size={18} /></button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
