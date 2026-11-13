import { tools } from '../../data/tools'
import Marquee from './Marquee'

const chip = (t: (typeof tools)[number]) => (
  <span className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-medium text-navy shadow-sm">
    <t.icon size={18} style={{ color: t.color }} aria-hidden />{t.name}
  </span>
)
export default function ToolsMarquee() {
  return (
    <div className="space-y-3">
      <Marquee items={tools.map(chip)} seconds={50} />
      <Marquee items={[...tools].reverse().map(chip)} seconds={60} reverse />
    </div>
  )
}
