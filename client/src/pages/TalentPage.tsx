import { useEffect } from 'react'
import Seo from '../components/Seo'
import TalentShowcase from '../components/TalentShowcase'
import { buildBreadcrumbLd } from '../data/seo'

export default function TalentPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Seo
        title="Our Talent Roster | Pomelo Casting"
        description="A curated look at the talent, editorial work, and studio energy Pomelo Casting brings to every brief — browse our full roster and past campaigns."
        path="/talent"
        jsonLd={buildBreadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Talent', path: '/talent' },
        ])}
      />
      <TalentShowcase />
    </>
  )
}
