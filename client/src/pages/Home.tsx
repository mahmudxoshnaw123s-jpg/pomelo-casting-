import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Marquee from '../components/Marquee'
import About from '../sections/About'
import Contact from '../sections/Contact'
import Faq from '../sections/Faq'
import Hero from '../sections/Hero'
import Insights from '../sections/Insights'
import Services from '../sections/Services'
import Work from '../sections/Work'
import { marquee } from '../data/content'

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
      <Hero />
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
