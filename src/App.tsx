import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import Layout from './components/layout/Layout'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Legal = lazy(() => import('./pages/Legal'))
const HowWeWork = lazy(() => import('./pages/Company').then((m) => ({ default: m.HowWeWork })))
const WhyUs = lazy(() => import('./pages/Company').then((m) => ({ default: m.WhyUs })))
const ClientsPage = lazy(() => import('./pages/Company').then((m) => ({ default: m.ClientsPage })))
const Technologies = lazy(() => import('./pages/Company').then((m) => ({ default: m.Technologies })))
const FaqPage = lazy(() => import('./pages/Company').then((m) => ({ default: m.FaqPage })))
const NotFound = lazy(() => import('./pages/NotFound'))
const ServicesIndex = lazy(() => import('./pages/Services').then((m) => ({ default: m.ServicesIndex })))
const ServiceDetail = lazy(() => import('./pages/Services').then((m) => ({ default: m.ServiceDetail })))
const IndustriesIndex = lazy(() => import('./pages/Industries').then((m) => ({ default: m.IndustriesIndex })))
const IndustryDetail = lazy(() => import('./pages/Industries').then((m) => ({ default: m.IndustryDetail })))
const Work = lazy(() => import('./pages/Work').then((m) => ({ default: m.Work })))
const CaseStudy = lazy(() => import('./pages/Work').then((m) => ({ default: m.CaseStudy })))
const Insights = lazy(() => import('./pages/Insights').then((m) => ({ default: m.Insights })))
const ArticlePage = lazy(() => import('./pages/Insights').then((m) => ({ default: m.ArticlePage })))

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<ServicesIndex />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="industries" element={<IndustriesIndex />} />
          <Route path="industries/:slug" element={<IndustryDetail />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<CaseStudy />} />
          <Route path="insights" element={<Insights />} />
          <Route path="insights/:slug" element={<ArticlePage />} />
          <Route path="how-we-work" element={<HowWeWork />} />
          <Route path="why-look-africa" element={<WhyUs />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="technologies" element={<Technologies />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<Legal kind="privacy" />} />
          <Route path="terms-of-service" element={<Legal kind="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </MotionConfig>
  )
}
