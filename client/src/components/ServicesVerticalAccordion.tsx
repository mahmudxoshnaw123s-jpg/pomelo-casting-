import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { services } from '../data/content'
import { serviceVisuals } from '../data/serviceVisuals'

const grade = 'grayscale(0.35) contrast(1.04) brightness(1.03)'
const ease = [0.16, 1, 0.3, 1] as const

export default function ServicesVerticalAccordion() {
  const [active, setActive] = useState<number | null>(0)
  const items = services.items

  return (
    <div className="mx-auto max-w-4xl px-6 sm:px-10">
      <div className="border-t border-white/10">
        {items.map((item, i) => {
          const isActive = active === i
          const meta = serviceVisuals[item.icon as keyof typeof serviceVisuals]

          return (
            <div key={item.slug} className="border-b border-white/10">
              <button
                type="button"
                onClick={() => setActive(isActive ? null : i)}
                aria-expanded={isActive}
                className="group flex w-full items-center gap-6 py-8 text-left transition-colors duration-300 hover:bg-white/[0.02] sm:py-10"
              >
                <h3
                  className={`text-balance font-display text-2xl leading-tight transition-colors duration-300 sm:text-4xl ${
                    isActive ? 'text-white' : 'text-white/50 group-hover:text-white/75'
                  }`}
                >
                  {item.title}
                </h3>
                <motion.span
                  animate={{ rotate: isActive ? 45 : 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center text-2xl font-extralight leading-none text-white/40 sm:h-9 sm:w-9"
                  aria-hidden="true"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ height: { duration: 0.55, ease }, opacity: { duration: 0.35 } }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 pb-12 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] sm:gap-12 sm:pb-16">
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15, ease }}
                      >
                        <div className="aspect-[4/5] w-full overflow-hidden">
                          <motion.img
                            src={meta.image}
                            alt={meta.imageAlt}
                            loading="lazy"
                            style={{ objectPosition: meta.imageObjectPosition, filter: grade }}
                            initial={{ scale: 1.06 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 8, ease: 'easeOut' }}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25, ease }}
                        className="sm:pt-2"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35">{meta.kicker}</p>
                        <p className="mt-5 max-w-md text-lg text-white/75">{item.description}</p>
                        <p className="mt-4 max-w-md text-white/50">{item.overview}</p>

                        <ul className="mt-6 space-y-1.5 text-sm text-white/60">
                          {item.workflow.slice(0, 4).map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ul>

                        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-white/60">Typical timeline — {item.timeline}</p>

                        <a
                          href="#contact"
                          className="mt-5 inline-flex w-fit items-center gap-2 text-sm text-white/70 underline decoration-white/30 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-white/70"
                        >
                          Enquire about this service
                          <span aria-hidden="true">→</span>
                        </a>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
