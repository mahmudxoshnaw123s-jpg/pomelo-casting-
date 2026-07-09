import { useEffect } from 'react'
import ModelApplicationForm from '../components/ModelApplicationForm'

export default function ApplyPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <ModelApplicationForm />
}
