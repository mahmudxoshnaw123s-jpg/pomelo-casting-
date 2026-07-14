import { useEffect } from 'react'
import ModelApplicationForm from '../components/ModelApplicationForm'
import Seo from '../components/Seo'
import { buildBreadcrumbLd } from '../data/seo'

export default function ApplyPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Seo
        title="Apply to Join Our Talent Roster | Pomelo Casting"
        description="Tell us about yourself and share a few recent photos — our team reviews every submission personally and follows up on strong fits."
        path="/apply"
        jsonLd={buildBreadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Apply', path: '/apply' },
        ])}
      />
      <ModelApplicationForm />
    </>
  )
}
