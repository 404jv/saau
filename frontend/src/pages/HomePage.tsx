import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SiteNav from '../components/landing/SiteNav'
import SiteFooter from '../components/landing/SiteFooter'
import HeroSection from '../components/landing/HeroSection'
import AboutSection from '../components/landing/AboutSection'
import DonateSection from '../components/landing/DonateSection'
import BazarPreview from '../components/landing/BazarPreview'
import AdoptionSection from '../components/landing/AdoptionSection'
import TutorVirtualPreview from '../components/landing/TutorVirtualPreview'
import ContactSection from '../components/landing/ContactSection'

export default function HomePage() {
  const location = useLocation()

  // Smoothly scroll to the target hash when arriving with one (e.g. /#doar)
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const el = document.getElementById(id)
    if (!el) return
    // Defer one frame so the page paints before we scroll
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location.hash])

  return (
    <>
      <SiteNav />
      <main className="scroll-smooth">
        <HeroSection />
        <AboutSection />
        <DonateSection />
        <BazarPreview />
        <AdoptionSection />
        <TutorVirtualPreview />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
