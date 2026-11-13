import { useSeo } from '../hooks/useSeo'
import { legal } from '../data/content'
import { Crumbs } from '../components/ui/UI'

export default function Legal({ kind }: { kind: 'privacy' | 'terms' }) {
  const d = legal[kind]; const path = kind === 'privacy' ? '/privacy-policy' : '/terms-of-service'
  useSeo({ title: d.title, description: `${d.title} for LOOK AFRICA TECHNOLOGY.`, path, crumbs: [[d.title, path]] })
  return (
    <article className="wrap max-w-3xl py-12 sm:py-16">
      <Crumbs items={[[d.title, path]]} />
      <h1 className="mt-8 text-4xl">{d.title}</h1>
      <p className="mt-2 text-sm text-mute">Last updated: 13 November 2026</p>
      {d.sections.map(([h, t]) => <section key={h} className="mt-8"><h2 className="text-xl">{h}</h2><p className="mt-2 leading-7 text-mute">{t}</p></section>)}
    </article>
  )
}
