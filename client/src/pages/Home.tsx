import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import FeaturedTalent from '../components/FeaturedTalent'
import Marquee from '../components/Marquee'
import Seo from '../components/Seo'
import About from '../sections/About'
import Contact from '../sections/Contact'
import Faq from '../sections/Faq'
import Hero from '../sections/Hero'
import Insights from '../sections/Insights'
import Services from '../sections/Services'
import Work from '../sections/Work'
import { marquee } from '../data/content'
import { buildFaqPageLd, buildOrganizationLd, buildWebsiteLd } from '../data/seo'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const target = document.getElementById(id)
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth' }))
    }
  }, [location.hash])

  return (
    <>
      <Seo
        title="Pomelo Casting | Casting Agency in Erbil, Iraq"
        description="Pomelo Casting connects brands and productions with the right talent — models, actors, and creators for campaigns across Erbil and the Kurdistan Region."
        path="/"
        jsonLd={[buildOrganizationLd(), buildWebsiteLd(), buildFaqPageLd()]}
      />
      <Hero />
      <FeaturedTalent />
      <Marquee items={marquee} />
      <About />
      <Services />
      <Work />
      <Insights />
      <Faq />
      <Contact />
    </>
  )
}
