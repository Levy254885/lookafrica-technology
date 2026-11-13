import { useState, type FormEvent } from 'react'
import { Mail, MapPin, MessageCircle } from 'lucide-react'
import { useSeo } from '../hooks/useSeo'
import { mailto, site, whatsappLink } from '../data/site'
import { services } from '../data/services'
import { PageHero } from '../components/ui/UI'

const budgets = ['Under $2,000', '$2,000 – $5,000', '$5,000 – $10,000', '$10,000 – $25,000', '$25,000 – $50,000', '$50,000+', 'Not yet determined']
const timelines = ['As soon as possible', 'Within 1–3 months', '3–6 months', '6+ months', 'Flexible']
type Status = 'idle' | 'loading' | 'success' | 'error' | 'unconfigured'
const empty = { name: '', organisation: '', email: '', country: '', service: '', description: '', budget: 'Not yet determined', timeline: 'Flexible', contactMethod: 'Email', website: '' }

export default function Contact() {
  useSeo({ title: 'Contact', description: 'Start a project with LOOK AFRICA TECHNOLOGY. Send an enquiry, message us on WhatsApp or email the team.', path: '/contact', crumbs: [['Contact', '/contact']] })
  const [v, setV] = useState(empty); const [errs, setErrs] = useState<Record<string, string>>({}); const [status, setStatus] = useState<Status>('idle')
  const set = (k: string) => (e: { target: { value: string } }) => setV((p) => ({ ...p, [k]: e.target.value }))

  const validate = () => {
    const e: Record<string, string> = {}
    if (v.name.trim().length < 2) e.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Please enter a valid email address.'
    if (!v.country.trim()) e.country = 'Please enter your country.'
    if (!v.service) e.service = 'Please choose a service.'
    if (v.description.trim().length < 20) e.description = 'Please describe your project in at least 20 characters.'
    return e
  }
  const submit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (status === 'loading' || status === 'success') return
    const e = validate(); setErrs(e); if (Object.keys(e).length) return
    setStatus('loading')
    try {
      const r = await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(v) })
      if (r.ok) { setStatus('success'); setV(empty) } else if (r.status === 503 || r.status === 404) setStatus('unconfigured')
      else setStatus('error')
    } catch { setStatus('error') }
  }
  const Err = ({ k }: { k: string }) => errs[k] ? <p id={`${k}-err`} className="mt-1 text-sm text-red">{errs[k]}</p> : null
  const f = (k: string) => ({ id: k, 'aria-invalid': !!errs[k], 'aria-describedby': errs[k] ? `${k}-err` : undefined, className: 'field mt-1.5' })
  return (
    <>
      <PageHero eyebrow="Contact" crumbs={[['Contact', '/contact']]} title={<>Tell us about your <span className="text-copper">project.</span></>} text="Send an enquiry, or reach the team directly on WhatsApp or email. We respond with a considered next step." />
      <section className="wrap section grid gap-12 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 hover:shadow-md"><span className="grid h-11 w-11 place-items-center rounded-full bg-teal/10 text-teal"><MessageCircle size={22} /></span><span><span className="block font-semibold">WhatsApp</span><span className="text-sm text-mute">{site.whatsappDisplay}</span></span></a>
          <a href={mailto} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 hover:shadow-md"><span className="grid h-11 w-11 place-items-center rounded-full bg-blue/10 text-blue"><Mail size={22} /></span><span><span className="block font-semibold">Email</span><span className="text-sm text-mute">{site.email}</span></span></a>
          <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5"><span className="grid h-11 w-11 place-items-center rounded-full bg-orange/15 text-orange"><MapPin size={22} /></span><span><span className="block font-semibold">Operational base</span><span className="text-sm text-mute">Kenya / East Africa</span></span></div>
        </div>
        <form onSubmit={submit} noValidate className="space-y-5 rounded-3xl border border-line bg-white p-6 sm:p-8 lg:col-span-3" aria-label="Project enquiry">
          <div className="grid gap-5 sm:grid-cols-2">
            <div><label htmlFor="name" className="text-sm font-semibold">Name *</label><input {...f('name')} autoComplete="name" value={v.name} onChange={set('name')} /><Err k="name" /></div>
            <div><label htmlFor="organisation" className="text-sm font-semibold">Business or organisation</label><input {...f('organisation')} autoComplete="organization" value={v.organisation} onChange={set('organisation')} /></div>
            <div><label htmlFor="email" className="text-sm font-semibold">Email *</label><input {...f('email')} type="email" autoComplete="email" value={v.email} onChange={set('email')} /><Err k="email" /></div>
            <div><label htmlFor="country" className="text-sm font-semibold">Country *</label><input {...f('country')} autoComplete="country-name" value={v.country} onChange={set('country')} /><Err k="country" /></div>
          </div>
          <div><label htmlFor="service" className="text-sm font-semibold">Service required *</label>
            <select {...f('service')} value={v.service} onChange={set('service')}><option value="">Select a service</option>{services.map((s) => <option key={s.slug}>{s.title}</option>)}<option>Not sure yet</option></select><Err k="service" /></div>
          <div><label htmlFor="description" className="text-sm font-semibold">Project description *</label><textarea {...f('description')} rows={5} value={v.description} onChange={set('description')} /><Err k="description" /></div>
          <div className="grid gap-5 sm:grid-cols-3">
            <div><label htmlFor="budget" className="text-sm font-semibold">Estimated budget (USD)</label><select {...f('budget')} value={v.budget} onChange={set('budget')}>{budgets.map((b) => <option key={b}>{b}</option>)}</select></div>
            <div><label htmlFor="timeline" className="text-sm font-semibold">Timeline</label><select {...f('timeline')} value={v.timeline} onChange={set('timeline')}>{timelines.map((b) => <option key={b}>{b}</option>)}</select></div>
            <div><label htmlFor="contactMethod" className="text-sm font-semibold">Preferred contact</label><select {...f('contactMethod')} value={v.contactMethod} onChange={set('contactMethod')}>{['Email', 'WhatsApp', 'Either'].map((b) => <option key={b}>{b}</option>)}</select></div>
          </div>
          <div className="hidden" aria-hidden="true"><label>Leave this empty<input tabIndex={-1} autoComplete="off" value={v.website} onChange={set('website')} /></label></div>
          <button type="submit" disabled={status === 'loading' || status === 'success'} className="btn-red w-full disabled:opacity-60 sm:w-auto">{status === 'loading' ? 'Sending…' : 'Send enquiry'}</button>
          <div role="status" aria-live="polite" className="text-sm">
            {status === 'success' && <p className="rounded-lg bg-teal/10 p-4 text-teal">Thank you. Your enquiry has been received and we will be in touch.</p>}
            {status === 'unconfigured' && <p className="rounded-lg bg-orange/15 p-4 text-ink">The enquiry service is not configured in this environment, so your message was not sent. Please use WhatsApp or email instead.</p>}
            {status === 'error' && <p className="rounded-lg bg-red/10 p-4 text-red">Something went wrong and your enquiry was not sent. Please try again, or contact us on WhatsApp or email.</p>}
          </div>
        </form>
      </section>
    </>
  )
}
