import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
export default function ArrowLink({ to, children, className = '' }: { to: string; children: string; className?: string }) {
  return (
    <Link to={to} className={`group inline-flex items-center gap-2 text-sm font-semibold ${className}`}>
      <span className="u-link pb-0.5">{children}</span><ArrowRight size={16} aria-hidden className="transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  )
}
