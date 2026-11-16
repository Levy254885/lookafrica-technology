import { Link } from 'react-router-dom'
export default function ArrowLink({ to, children, className = '' }: { to: string; children: string; className?: string }) {
  return <Link to={to} className={`inline-flex items-center text-sm font-semibold ${className}`}><span className="u-link pb-0.5">{children}</span></Link>
}
