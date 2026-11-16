import { Link } from 'react-router-dom'
import { useReducedMotion } from 'motion/react'
import { Cloud, Code2, Database, Globe, Layers, Smartphone, Wifi } from 'lucide-react'
import Reveal from './Reveal'

const KENYA = 'M31.2 66.0 L54.4 42.8 L89.2 19.6 L141.4 42.8 L199.4 51.5 L257.4 97.9 L324.1 106.6 L367.6 83.4 L425.6 66.0 L489.4 78.8 L437.2 135.6 L436.0 147.2 L437.2 361.8 L466.2 408.2 L431.4 437.2 L390.8 472.0 L373.4 506.8 L358.9 544.5 L332.8 582.2 L245.8 506.8 L242.9 483.6 L147.2 419.8 L31.2 367.6 L28.3 315.4 L37.0 280.6 L60.2 245.8 L89.2 199.4 L66.0 129.8 Z'
const NODES: [number, number][] = [[194.8, 384.4], [360.1, 543.9], [75.3, 314.8], [151.3, 327.0], [104.9, 279.4], [358.3, 335.7], [124.0, 128.6], [386.2, 496.4], [262.6, 174.5]]
const CONNS = ["M194.8 384.4 Q265.5 446.1 360.1 543.9", "M194.8 384.4 Q147.1 331.6 75.3 314.8", "M194.8 384.4 Q161.1 337.7 151.3 327.0", "M194.8 384.4 Q161.9 313.9 104.9 279.4", "M194.8 384.4 Q264.6 342.0 358.3 335.7", "M194.8 384.4 Q171.4 238.5 124.0 128.6", "M194.8 384.4 Q278.5 422.4 386.2 496.4", "M194.8 384.4 Q240.7 261.4 262.6 174.5"]
const TWINKLE: [number, number, number][] = [[172, 99, 2.6], [54, 326, 1.5], [47, 309, 0.1], [224, 51, 0.4], [220, 498, 0.5], [125, 380, 3.8], [291, 244, 3.9], [42, 516, 1.2], [88, 79, 1.2], [404, 117, 2.3], [320, 230, 2.2], [50, 45, 0.8], [340, 262, 1.3], [295, 277, 1.2], [393, 422, 1.0], [290, 320, 3.5], [363, 180, 3.9], [75, 257, 3.0], [91, 298, 0.2], [334, 461, 2.3], [431, 195, 2.8], [299, 352, 1.8], [415, 567, 1.9], [332, 46, 2.8], [324, 596, 3.3], [154, 238, 2.7], [31, 282, 0.7], [75, 45, 3.1], [81, 156, 1.6], [430, 58, 1.8], [278, 531, 3.3], [426, 174, 1.7], [189, 532, 3.8], [91, 114, 0.9], [130, 296, 2.4], [143, 12, 1.7], [194, 344, 3.8], [345, 314, 2.5], [338, 42, 3.6], [387, 526, 3.2], [204, 245, 0.4], [318, 47, 0.3], [118, 106, 1.4], [45, 10, 0.6], [68, 225, 0.1], [431, 372, 0.6]]
const [HX, HY] = NODES[0]
const SECTOR = 'M194.8 384.4 L440.5 212.3 A300 300 0 0 1 494.8 384.4 Z'

const chips = [
  [Code2, 'left-[2%] top-[8%]', '0s', 'text-blue'], [Cloud, 'right-[4%] top-[4%]', '1.2s', 'text-teal'], [Smartphone, 'left-[-2%] top-[56%]', '2.1s', 'text-copper'],
  [Database, 'right-[-2%] top-[46%]', '0.7s', 'text-orange'], [Wifi, 'right-[12%] bottom-[4%]', '1.8s', 'text-navy'], [Layers, 'left-[8%] bottom-[6%]', '2.6s', 'text-blue'],
] as const

function Map({ still }: { still: boolean }) {
  return (
    <svg viewBox="0 0 510 610" role="img" aria-label="Animated map of Kenya with connected digital nodes" className="h-full w-full">
      <defs>
        <pattern id="kdots" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="#17185C" opacity=".3" /></pattern>
        <clipPath id="kclip"><path d={KENYA} /></clipPath>
        <linearGradient id="kscan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#B71C2B" stopOpacity="0" /><stop offset=".5" stopColor="#B71C2B" stopOpacity=".35" /><stop offset="1" stopColor="#B71C2B" stopOpacity="0" /></linearGradient>
        <radialGradient id="ksweep" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform={`translate(${HX} ${HY}) scale(300)`}><stop offset="0" stopColor="#B71C2B" stopOpacity=".5" /><stop offset="1" stopColor="#B71C2B" stopOpacity="0" /></radialGradient>
      </defs>
      <path d={KENYA} fill="#FBE8A6" opacity=".55" />
      <rect width="510" height="610" fill="url(#kdots)" clipPath="url(#kclip)" />
      <g clipPath="url(#kclip)">
        {!still && TWINKLE.map(([x, y, d], i) => <circle key={i} cx={x} cy={y} r="2" fill="#B71C2B" className="ktwinkle" style={{ animationDelay: `${d}s` }} />)}
        {!still && <path d={SECTOR} fill="url(#ksweep)" className="kradar" style={{ transformOrigin: `${HX}px ${HY}px` }} />}
        {!still && <rect x="0" y="-60" width="510" height="60" fill="url(#kscan)" className="kscan" />}
      </g>
      <path d={KENYA} fill="none" stroke="#17185C" strokeWidth="2.5" strokeLinejoin="round" pathLength={1} className={still ? '' : 'kdraw'} />
      {CONNS.map((d, i) => (
        <g key={i}>
          <path d={d} className={still ? '' : 'kdash'} fill="none" stroke="#B71C2B" strokeWidth="1.2" strokeDasharray="4 5" opacity=".5" />
          {!still && [0, 1].map((k) => (
            <circle key={k} r="3" fill="#B71C2B"><animateMotion dur={`${3 + (i % 3) * 0.6}s`} begin={`${i * 0.4 + k * 1.6}s`} repeatCount="indefinite" path={d} /><animate attributeName="opacity" values="0;1;1;0" dur={`${3 + (i % 3) * 0.6}s`} begin={`${i * 0.4 + k * 1.6}s`} repeatCount="indefinite" /></circle>
          ))}
        </g>
      ))}
      {!still && [0, 1, 2].map((k) => <circle key={k} cx={HX} cy={HY} r="10" fill="none" stroke="#B71C2B" strokeWidth="1.5" className="kripple" style={{ animationDelay: `${k * 0.9}s` }} />)}
      {NODES.map(([x, y], i) => (
        <g key={i} className={still ? '' : 'kpop'} style={{ animationDelay: `${0.6 + i * 0.15}s`, transformOrigin: `${x}px ${y}px` }}>
          {!still && <circle cx={x} cy={y} r="9" fill="none" stroke="#B71C2B" strokeWidth="1.5" className="kpulse" style={{ animationDelay: `${i * 0.35}s` }} />}
          <circle cx={x} cy={y} r="4.5" fill="#B71C2B" /><circle cx={x} cy={y} r="1.8" fill="#fff" />
        </g>
      ))}
    </svg>
  )
}

export default function KenyaMapSection() {
  const still = !!useReducedMotion()
  return (
    <section className="section wrap">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="eyebrow">Our base</p>
          <h2 className="h2 mt-4">Built in Kenya. <span className="text-copper">Delivering worldwide.</span></h2>
          <p className="lead mt-4 max-w-lg">Our operational foundation is in Kenya and East Africa. From here we design, engineer and support digital solutions for businesses and organisations around the world.</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {[[Globe, 'Serving clients globally'], [Wifi, 'Remote-first collaboration']].map(([I, t]) => { const Ic = I as typeof Globe; return <li key={t as string} className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy"><Ic size={16} aria-hidden />{t as string}</li> })}
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3"><Link to="/software-development-company-kenya" className="btn-red">Software development in Kenya</Link><Link to="/contact" className="text-sm font-semibold text-red u-link">Talk to our team</Link></div>
        </Reveal>
        <Reveal className="relative mx-auto aspect-[510/610] w-full max-w-[17rem] sm:max-w-sm">
          <Map still={still} />
          {chips.map(([I, pos, delay, color], i) => <span key={i} style={{ animationDelay: delay }} className={`kfloat absolute ${pos} hidden sm:grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-md ${color}`}><I size={22} aria-hidden /></span>)}
        </Reveal>
      </div>
    </section>
  )
}
