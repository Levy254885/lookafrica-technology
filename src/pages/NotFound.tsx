import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
export default function NotFound() {
  useSeo({ title: 'Page not found', description: 'The page you are looking for could not be found.', path: '/404' })
  return <section className="wrap section text-center"><p className="eyebrow justify-center">404</p><h1 className="mt-4 text-4xl">Page not found</h1><p className="lead mx-auto mt-4 max-w-md">The page you are looking for does not exist or has moved.</p><Link to="/" className="btn-red mt-8">Back to home</Link></section>
}
