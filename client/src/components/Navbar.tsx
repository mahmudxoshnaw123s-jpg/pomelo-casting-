import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Link } from 'react-router-dom'
import logoDark from '../assets/pomelo-logo-dark-optimized.png'
import Magnetic from './Magnetic'
import PomeloMark from './PomeloMark'
import { nav } from '../data/content'

const ease = [0.16, 1, 0.3, 1] as const

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
        menuOpen
          ? 'bg-[#0a0f1a]'
          : scrolled
            ? 'bg-[#0a0f1a]/85 backdrop-blur-md shadow-lg shadow-black/30'
            : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link to="/#top" className="flex items-center" aria-label="Pomelo Casting home">
          <img src={logoDark} alt="Pomelo Casting" width={641} height={256} className="h-11 w-auto sm:h-14" />
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

        <div className="relative z-50 flex items-center gap-2 md:hidden">
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="fixed inset-0 z-40 flex flex-col overflow-hidden bg-gradient-to-br from-[#1a0a24] via-pomelo-purple to-pomelo-blue md:hidden"
          >
            <motion.div
              className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 opacity-[0.14]"
              animate={{ rotate: 360 }}
              transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            >
              <PomeloMark className="h-full w-full" />
            </motion.div>

            <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-1 overflow-y-auto px-6 pt-20">
              <nav className="flex flex-col items-center gap-0.5">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease }}
                  >
                    <Link
                      to={`/${item.href}`}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-1 text-center font-display text-3xl text-white transition-colors duration-200 hover:text-[#0a0f1a] sm:text-4xl"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.5, delay: 0.1 + nav.length * 0.06, ease }}
                className="mt-6"
              >
                <Magnetic strength={10}>
                  <Link
                    to="/#contact"
                    onClick={() => setMenuOpen(false)}
                    className="inline-block rounded-full border border-white/50 bg-white/10 px-7 py-3 text-sm font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#1a0a24]"
                  >
                    Get in touch
                  </Link>
                </Magnetic>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="relative z-10 flex shrink-0 justify-center pb-8 pt-4"
            >
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60 transition-colors hover:text-white"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
