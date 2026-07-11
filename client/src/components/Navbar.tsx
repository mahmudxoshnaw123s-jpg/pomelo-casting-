import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Link } from 'react-router-dom'
import logoDark from '../assets/pomelo-logo-dark.png'
import Magnetic from './Magnetic'
import { nav } from '../data/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)
  const { scrollY } = useScroll()

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
        scrolled ? 'bg-[#0a0f1a]/85 backdrop-blur-md shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link to="/#top" className="flex items-center" aria-label="Pomelo Casting home">
          <img src={logoDark} alt="Pomelo Casting" className="h-11 w-auto sm:h-14" />
        </Link>

        <ul className="hidden items-center gap-1 md:flex" onMouseLeave={() => setHoveredHref(null)}>
          {nav.map((item) => (
            <li key={item.href} className="relative">
              <Link
                to={`/${item.href}`}
                onMouseEnter={() => setHoveredHref(item.href)}
                className="relative z-10 block rounded-full px-4 py-2 text-sm font-medium tracking-wide text-white/75 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
              {hoveredHref === item.href && (
                <motion.span
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Magnetic strength={10}>
            <Link
              to="/#contact"
              className="inline-block rounded-full bg-pomelo-blue px-5 py-2 text-sm font-semibold text-[var(--color-on-accent)] transition-transform hover:scale-105"
            >
              Get in touch
            </Link>
          </Magnetic>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            className="flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <motion.span className="h-0.5 w-6 bg-white" animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} />
            <motion.span className="h-0.5 w-6 bg-white" animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} />
            <motion.span className="h-0.5 w-6 bg-white" animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} />
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
            className="overflow-hidden bg-[#0a0f1a]/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-6">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    to={`/${item.href}`}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-lg font-medium text-white/85 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/#contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 inline-block rounded-full bg-pomelo-blue px-5 py-2 text-sm font-semibold text-[var(--color-on-accent)]"
                >
                  Get in touch
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
