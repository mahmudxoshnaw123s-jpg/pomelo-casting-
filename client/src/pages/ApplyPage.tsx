import { useEffect } from 'react'
import ModelApplicationForm from '../components/ModelApplicationForm'
import Seo from '../components/Seo'
import { useContent, useLanguage } from '../context/LanguageContext'
import { buildBreadcrumbLd } from '../data/seo'

export default function ApplyPage() {
  const { ui } = useContent()
  const { href } = useLanguage()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Seo
        title={ui.seo.applyTitle}
        description={ui.seo.applyDescription}
        path="/apply"
        jsonLd={buildBreadcrumbLd([
          { name: ui.seo.breadcrumbHome, path: href('/') },
          { name: ui.seo.breadcrumbApply, path: href('/apply') },
        ])}
      />
      <ModelApplicationForm />
    </>
  )
}
