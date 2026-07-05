import { useTheme } from '../context/ThemeContext'
import logoLight from '../assets/pomelo-logo.png'
import logoDark from '../assets/pomelo-logo-dark.png'
import { footer, nav } from '../data/content'

export default function Footer() {
  const { theme } = useTheme()

  return (
    <footer className="border-t border-line bg-base py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between">
        <img
          src={theme === 'dark' ? logoDark : logoLight}
          alt="Pomelo Casting"
          className="h-9 w-auto opacity-90"
        />

        <ul className="flex flex-wrap items-center justify-center gap-6">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-sm text-ink-soft transition-colors hover:text-pomelo-blue">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-sm text-ink-soft">{footer.line}</p>
      </div>
    </footer>
  )
}
