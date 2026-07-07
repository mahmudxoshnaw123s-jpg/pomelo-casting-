import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState } from 'react'
import type { MouseEvent } from 'react'
import { faqSection } from '../data/content'
import Magnetic from './Magnetic'
import PremiumButton from './PremiumButton'
import SplitText from './SplitText'

interface FaqItem {
  question: string
  answer: string
  category?: string
}

const particles = Array.from({ length: 18 }).map((_, i) => ({
  left: (i * 41 + 7) % 100,
  top: (i * 29 + 13) % 100,
  size: 2 + (i % 3),
  duration: 9 + (i % 5) * 2.2,
  delay: (i % 7) * 0.7,
}))

const glowConic =
  'conic-gradient(from 0deg, transparent 0%, #00b2e2 12%, transparent 28%, #895193 50%, transparent 68%, #00b2e2 86%, transparent 100%)'

function TogglePlus({ open }: { open: boolean }) {
  return (
    <Magnetic strength={10} className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors duration-300 group-hover:border-pomelo-blue/50">
      <motion.span
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative block h-3.5 w-3.5"
      >
        <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-white" />
        <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-white" />
      </motion.span>
    </Magnetic>
  )
}

function FaqCard({ item, isOpen, onToggle, index }: { item: FaqItem; isOpen: boolean; onToggle: () => void; index: number }) {
  const panelId = `faq-panel-${index}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.012 }}
      className="group relative isolate rounded-3xl p-px transition-shadow duration-300 hover:shadow-[0_0_50px_-15px_rgba(0,178,226,0.4)]"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute inset-[-45%] -z-10"
            style={{ background: glowConic }}
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.5 }, rotate: { duration: 6, repeat: Infinity, ease: 'linear' } }}
          />
        )}
      </AnimatePresence>

      <div
        className={`relative overflow-hidden rounded-[calc(1.5rem-1px)] border backdrop-blur-xl transition-colors duration-300 ${
          isOpen ? 'border-pomelo-blue/30 bg-white/[0.06]' : 'border-white/10 bg-white/[0.03] group-hover:border-white/20'
        }`}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-start justify-between gap-5 p-6 text-left sm:p-7"
        >
          <span>
            {item.category && (
              <span className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-pomelo-blue">
                {item.category}
              </span>
            )}
            <span className="text-balance text-lg font-semibold leading-snug text-white">{item.question}</span>
          </span>
          <TogglePlus open={isOpen} />
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={panelId}
              role="region"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="px-6 pb-6 text-sm leading-relaxed text-white/65 sm:px-7 sm:pb-7">{item.answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function FaqShowcase() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 20 })
  const sy = useSpring(my, { stiffness: 40, damping: 20 })
  const blobAX = useTransform(sx, [-0.5, 0.5], [-24, 24])
  const blobAY = useTransform(sy, [-0.5, 0.5], [-18, 18])
  const blobBX = useTransform(sx, [-0.5, 0.5], [28, -28])
  const blobBY = useTransform(sy, [-0.5, 0.5], [18, -18])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section
      id="faq"
      onMouseMove={handleMouseMove}
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#0b0713] via-[#130b21] to-[#0a0f1a] py-28 sm:py-36"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <motion.div
        style={{ x: blobAX, y: blobAY }}
        className="pointer-events-none absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full bg-pomelo-purple/25 blur-[130px]"
      />
      <motion.div
        style={{ x: blobBX, y: blobBY }}
        className="pointer-events-none absolute -right-40 bottom-0 h-[32rem] w-[32rem] rounded-full bg-pomelo-blue/20 blur-[140px]"
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-pomelo-purple/10 blur-[120px]"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="pointer-events-none absolute inset-y-0 w-[16%] -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.025] to-transparent blur-md"
        animate={{ left: ['-30%', '120%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
      />

      <div className="pointer-events-none absolute inset-0">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/60"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -34, 0], opacity: [0.15, 0.75, 0.15] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-5 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-pomelo-blue"
          >
            <span className="h-px w-8 bg-pomelo-blue" />
            {faqSection.label}
            <span className="h-px w-8 bg-pomelo-blue" />
          </motion.p>

          <h2 className="text-balance font-display text-4xl italic leading-tight text-white sm:text-5xl">
            <SplitText text={faqSection.heading} />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-lg text-white/60"
          >
            {faqSection.subhead}
          </motion.p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {faqSection.items.map((item, i) => (
            <FaqCard
              key={item.question}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative isolate mt-16 overflow-hidden rounded-[2rem] p-px"
        >
          <motion.div
            className="absolute inset-[-30%] -z-10"
            style={{ background: glowConic }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
          <div className="relative flex flex-col items-center justify-between gap-6 rounded-[calc(2rem-1px)] bg-[#0d0a18]/95 px-8 py-10 backdrop-blur-xl sm:flex-row sm:px-12">
            <div className="text-center sm:text-left">
              <p className="text-xl font-semibold text-white">Still have questions?</p>
              <p className="mt-1.5 text-sm text-white/60">Our team is here to help you every step of the way.</p>
            </div>
            <Magnetic strength={16}>
              <PremiumButton href="#contact">Contact Us</PremiumButton>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
