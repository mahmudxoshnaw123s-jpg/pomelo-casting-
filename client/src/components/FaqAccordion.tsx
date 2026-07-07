import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { IconChevronDown } from './icons'

interface FaqItem {
  question: string
  answer: string
  category?: string
}

interface FaqAccordionProps {
  items: FaqItem[]
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="divide-y divide-white/10 border-t border-b border-white/10">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        const panelId = `faq-panel-${i}`
        const buttonId = `faq-button-${i}`

        return (
          <motion.div key={item.question} initial="rest" whileHover="hover" animate="rest" className="relative">
            <motion.div
              variants={{ rest: { x: '-100%' }, hover: { x: '0%' } }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 -z-10 bg-white/[0.03]"
              aria-hidden="true"
            />
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-1 py-5 text-left"
              >
                <span>
                  {item.category && (
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-pomelo-blue">
                      {item.category}
                    </span>
                  )}
                  <span className="text-base font-semibold text-white sm:text-lg">{item.question}</span>
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                    isOpen ? 'border-pomelo-blue bg-gradient-to-br from-pomelo-blue to-pomelo-purple text-white' : 'border-white/15 text-white/50'
                  }`}
                >
                  <IconChevronDown className="h-4 w-4" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-1 pb-5 pr-14 text-white/60">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
