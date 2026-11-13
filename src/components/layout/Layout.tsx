import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import Header from './Header'
import Footer from './Footer'
import TopBar from './TopBar'
import ScrollToTop from './ScrollToTop'
import WhatsAppFloat from '../ui/WhatsAppFloat'

export default function Layout() {
  const { pathname } = useLocation()
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
      <ScrollToTop />
      <TopBar />
      <Header />
      <motion.main id="main" key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="min-h-[60vh]">
        <Suspense fallback={<div className="wrap section text-sm text-mute" role="status">Loading…</div>}><Outlet /></Suspense>
      </motion.main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
