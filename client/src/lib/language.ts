export type Language = 'en' | 'ar' | 'ku'

export const LANGUAGE_PREFIXES: Record<Language, string> = {
  en: '',
  ar: '/ar',
  ku: '/ku',
}

const RTL_LANGUAGES: Language[] = ['ar', 'ku']

export function isRtl(lang: Language): boolean {
  return RTL_LANGUAGES.includes(lang)
}

export function applyLanguage(lang: Language) {
  document.documentElement.lang = lang
  document.documentElement.dir = isRtl(lang) ? 'rtl' : 'ltr'
}

/**
 * Splits a pathname into its language and the language-agnostic remainder, e.g.
 * "/ar/talent" -> { language: 'ar', path: '/talent' }, "/talent" -> { language: 'en', path: '/talent' }.
 * The URL is the single source of truth for the active language — there is no
 * client-side fallback/redirect, since a distinct URL per language is what lets
 * each one be crawled and indexed independently.
 */
export function parseLanguageFromPath(pathname: string): { language: Language; path: string } {
  for (const lang of ['ar', 'ku'] as const) {
    const prefix = LANGUAGE_PREFIXES[lang]
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      const rest = pathname.slice(prefix.length)
      return { language: lang, path: rest === '' ? '/' : rest }
    }
  }
  return { language: 'en', path: pathname }
}

/** Builds the equivalent path for a target language, given a language-agnostic path (e.g. "/talent", "/#contact", "/"). */
export function localizePath(language: Language, path: string): string {
  const prefix = LANGUAGE_PREFIXES[language]
  if (!prefix) return path
  return path === '/' ? `${prefix}/` : `${prefix}${path}`
}
