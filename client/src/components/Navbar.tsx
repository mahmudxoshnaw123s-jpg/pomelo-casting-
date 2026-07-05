import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import logoLight from '../assets/pomelo-logo.png'
import logoDark from '../assets/pomelo-logo-dark.png'
import ThemeToggle from './ThemeToggle'
import { nav } from '../data/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const { theme } = useTheme()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24)
  })

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-base/85 backdrop-blur-md shadow-lg shadow-black/10' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="#top" className="flex items-center" aria-label="Pomelo Casting home">
          <img src={theme === 'dark' ? logoDark : logoLight} alt="Pomelo Casting" className="h-11 w-auto sm:h-14" />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item, i) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group flex items-center gap-1.5 text-sm font-medium tracking-wide text-ink-soft transition-colors hover:text-ink"
              >
                <span className="text-xs font-bold text-pomelo-blue">{String(i + 1).padStart(2, '0')}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <a
            href="#contact"
            className="rounded-full bg-pomelo-blue px-5 py-2 text-sm font-semibold text-[var(--color-on-accent)] transition-transform hover:scale-105"
          >
            Get in touch
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <motion.span
              className="h-0.5 w-6 bg-ink"
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            />
            <motion.span className="h-0.5 w-6 bg-ink" animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} />
            <motion.span
              className="h-0.5 w-6 bg-ink"
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-base/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-6">
              {nav.map((item, i) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 py-3 text-lg font-medium text-ink"
                  >
                    <span className="text-sm font-bold text-pomelo-blue">{String(i + 1).padStart(2, '0')}</span>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 inline-block rounded-full bg-pomelo-blue px-5 py-2 text-sm font-semibold text-[var(--color-on-accent)]"
                >
                  Get in touch
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
