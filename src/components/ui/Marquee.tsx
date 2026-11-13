import type { ReactNode } from 'react'
export default function Marquee({ items, seconds = 50, reverse, repeat = 1 }: { items: ReactNode[]; seconds?: number; reverse?: boolean; repeat?: number }) {
  const half = Array.from({ length: repeat }).flatMap(() => items)
  const all = [...half, ...half]
  return (
    <div className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <ul className={`marquee-track ${reverse ? 'marquee-rev' : ''}`} style={{ animationDuration: `${seconds}s` }}>
        {all.map((it, i) => <li key={i} aria-hidden={i >= half.length} className="shrink-0">{it}</li>)}
      </ul>
    </div>
  )
}
