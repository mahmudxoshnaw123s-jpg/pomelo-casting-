import { useEffect } from 'react'
import TalentShowcase from '../components/TalentShowcase'

export default function TalentPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <TalentShowcase />
}
