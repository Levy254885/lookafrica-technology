import { Link, useParams } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import { projects } from '../data/projects'
import { CtaBlock, PageHero } from '../components/ui/UI'
import ClientsStrip from '../components/ui/ClientsStrip'
import NotFound from './NotFound'

export function Work() {
  useSeo({ title: 'Our Work', description: 'Selected projects and case studies from LOOK AFRICA TECHNOLOGY.', path: '/work', crumbs: [['Our Work', '/work']] })
  return (
    <>
      <PageHero eyebrow="Our work" crumbs={[['Our Work', '/work']]} title={<>Projects we are <span className="text-copper">proud to stand behind.</span></>} text="We show only genuine, authorised projects, each with the challenge, the solution and verified outcomes.">
        <Link to="/contact" className="btn-red">Start a project</Link>
      </PageHero>
      <section className="wrap section">
        {projects.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-3xl bg-soft p-8 text-center sm:p-12">
            <h2 className="text-2xl">Case studies are on the way</h2>
            <p className="mt-4 leading-7 text-mute">We are preparing our first published case studies and will only list work we have permission to share. If you would like to discuss a project, we would be glad to hear from you.</p>
            <Link to="/contact" className="btn-red mt-6">Talk to our team</Link>
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2">{projects.map((p) => <li key={p.slug}><Link to={`/work/${p.slug}`} className="block rounded-2xl border border-line bg-white p-6 transition-shadow hover:shadow-md">
            {p.images[0] && <img src={p.images[0].src} alt={p.images[0].alt} loading="lazy" className="aspect-[16/10] w-full rounded-xl object-cover" />}
            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-navy">{p.industry}</p><h2 className="mt-1 text-xl">{p.name}</h2><p className="mt-2 text-sm text-mute">{p.summary}</p></Link></li>)}</ul>
        )}
      </section>
      <ClientsStrip />
      <CtaBlock />
    </>
  )
}
export function CaseStudy() {
  const { slug } = useParams(); const p = projects.find((x) => x.slug === slug)
  return p ? <Study slug={p.slug} /> : <NotFound />
}
function Study({ slug }: { slug: string }) {
  const p = projects.find((x) => x.slug === slug)!
  useSeo({ title: p.name, description: p.summary, path: `/work/${p.slug}`, crumbs: [['Our Work', '/work'], [p.name, `/work/${p.slug}`]] })
  return (
    <>
      <PageHero eyebrow={p.industry} crumbs={[['Our Work', '/work'], [p.name, `/work/${p.slug}`]]} title={p.name} text={p.summary} image={p.images[0]?.src} alt={p.images[0]?.alt}>
        {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-red">Visit live project</a>}
      </PageHero>
      <section className="wrap section grid gap-10 lg:grid-cols-2">
        <div><h2 className="text-2xl">The challenge</h2><p className="lead mt-4">{p.challenge}</p></div>
        <div><h2 className="text-2xl">The solution</h2><p className="lead mt-4">{p.solution}</p></div>
      </section>
      <section className="wrap pb-16"><h2 className="text-xl">Technologies used</h2><ul className="mt-4 flex flex-wrap gap-3">{p.technologies.map((t) => <li key={t} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy">{t}</li>)}</ul>
        {p.outcomes && <><h2 className="mt-10 text-xl">Verified outcomes</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-mute">{p.outcomes.map((o) => <li key={o}>{o}</li>)}</ul></>}</section>
      <CtaBlock />
    </>
  )
}
