import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { sections } from '../data/content'

export default function SectionRail() {
  const [active, setActive] = useState(sections[0].href)

  useEffect(() => {
    const targets = sections
      .map((s) => document.querySelector(s.href))
      .filter((el): el is Element => Boolean(el))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          const topMost = visible.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b))
          setActive(`#${topMost.target.id}`)
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-start gap-5 xl:flex"
    >
      {sections.map((section) => {
        const isActive = active === section.href
        return (
          <a
            key={section.href}
            href={section.href}
            className="group flex items-center gap-3"
            aria-current={isActive ? 'true' : undefined}
          >
            <motion.span
              animate={{ width: isActive ? 28 : 12, backgroundColor: isActive ? '#00b2e2' : 'var(--color-line)' }}
              transition={{ duration: 0.3 }}
              className="h-px"
            />
            <span
              className={`text-xs font-bold tracking-widest transition-colors ${
                isActive ? 'text-pomelo-blue' : 'text-ink-soft/50 group-hover:text-ink-soft'
              }`}
            >
              {section.index}
            </span>
          </a>
        )
      })}
    </nav>
  )
}
