import { useEffect } from 'react'
import Seo from '../components/Seo'
import TalentShowcase from '../components/TalentShowcase'
import { useContent, useLanguage } from '../context/LanguageContext'
import { buildBreadcrumbLd } from '../data/seo'

export default function TalentPage() {
  const { ui } = useContent()
  const { href } = useLanguage()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Seo
        title={ui.seo.talentTitle}
        description={ui.seo.talentDescription}
        path="/talent"
        jsonLd={buildBreadcrumbLd([
          { name: ui.seo.breadcrumbHome, path: href('/') },
          { name: ui.seo.breadcrumbTalent, path: href('/talent') },
        ])}
      />
      <TalentShowcase />
    </>
  )
}
