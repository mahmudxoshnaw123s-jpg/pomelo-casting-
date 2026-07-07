import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import logoLight from '../assets/pomelo-logo.png'
import logoDark from '../assets/pomelo-logo-dark.png'
import Magnetic from '../components/Magnetic'
import { IconArrowRight } from '../components/icons'
import { footer, nav } from '../data/content'

export default function Footer() {
  const { theme } = useTheme()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden border-t border-line bg-base py-10">
      <div className="relative h-px w-full overflow-hidden bg-line">
        <motion.div
          className="h-full w-1/5 bg-gradient-to-r from-transparent via-pomelo-blue to-transparent"
          animate={{ x: ['-100%', '600%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
        />
      </div>

      <motion.div
        className="pointer-events-none absolute -bottom-1/2 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-pomelo-purple/10 blur-[100px]"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 pt-10 sm:flex-row sm:justify-between">
        <img src={theme === 'dark' ? logoDark : logoLight} alt="Pomelo Casting" className="h-16 w-auto opacity-90" />

        <ul className="flex flex-wrap items-center justify-center gap-6">
          {nav.map((item) => (
            <li key={item.href}>
              <Link to={`/${item.href}`} className="group relative text-sm text-ink-soft transition-colors hover:text-pomelo-blue">
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-pomelo-blue to-pomelo-purple transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <p className="text-sm text-ink-soft">{footer.line}</p>
          <Magnetic strength={12}>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-pomelo-blue hover:text-pomelo-blue"
            >
              <IconArrowRight className="h-4 w-4 -rotate-90" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  )
}
