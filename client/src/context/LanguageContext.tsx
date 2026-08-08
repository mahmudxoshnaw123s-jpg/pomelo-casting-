import { createContext, useContext, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { applyLanguage, localizePath, parseLanguageFromPath } from '../lib/language'
import type { Language } from '../lib/language'
import { en } from '../data/content.en'
import { ar } from '../data/content.ar'
import { ku } from '../data/content.ku'

const contentByLanguage = { en, ar, ku }

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  /** Resolves a language-agnostic app path (e.g. "/talent", "/#contact") to the current language's URL. */
  href: (path: string) => string
  content: typeof en
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { language, path } = parseLanguageFromPath(location.pathname)

  useEffect(() => {
    applyLanguage(language)
  }, [language])

  const setLanguage = (lang: Language) => {
    navigate(`${localizePath(lang, path)}${location.hash}${location.search}`)
  }

  const href = (targetPath: string) => localizePath(language, targetPath)

  return (
    <LanguageContext.Provider value={{ language, setLanguage, href, content: contentByLanguage[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}

/** Shorthand for `useLanguage().content` — the full translated content tree for the active language. */
export function useContent() {
  return useLanguage().content
}
