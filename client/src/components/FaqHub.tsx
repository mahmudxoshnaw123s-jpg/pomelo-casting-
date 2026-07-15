import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import Magnetic from './Magnetic'
import PomeloMark from './PomeloMark'
import pomeloLogo from '../assets/pomelo-logo-dark-optimized.png'
import { IconFilmCameraBadge, IconSparkle, IconSpotlightBadge, IconWhatsapp } from './icons'
import { contact, faqSection } from '../data/content'

const ease = [0.16, 1, 0.3, 1] as const

const glowConic =
  'conic-gradient(from 0deg, transparent 0%, #00b2e2 12%, transparent 28%, #895193 50%, transparent 68%, #00b2e2 86%, transparent 100%)'

const topics = [
  { key: 'brands', label: 'For Brands', Icon: IconFilmCameraBadge, items: faqSection.items },
  { key: 'talent', label: 'For Talent', Icon: IconSpotlightBadge, items: contact.faq },
] as const

type TopicKey = (typeof topics)[number]['key']

const AUTO_ADVANCE_MS = 7000

function GripHand({ side }: { side: 'left' | 'right' }) {
  const gradId = `grip-${side}`
  return (
    <div
      className={`pointer-events-none absolute -bottom-7 z-20 hidden h-28 w-24 sm:block sm:-bottom-9 sm:h-36 sm:w-32 ${
        side === 'left' ? '-left-6 sm:-left-9' : '-right-6 sm:-right-9 -scale-x-100'
      }`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 130" className="h-full w-full drop-shadow-[0_14px_22px_rgba(0,0,0,0.55)]">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#2f2038" />
            <stop offset="100%" stopColor="#08060a" />
          </linearGradient>
        </defs>
        <rect x="16" y="10" width="18" height="78" rx="9" transform="rotate(-9 25 49)" fill={`url(#${gradId})`} stroke="rgba(0,178,226,0.3)" strokeWidth="1" />
        <rect x="41" y="4" width="18" height="86" rx="9" fill={`url(#${gradId})`} stroke="rgba(0,178,226,0.3)" strokeWidth="1" />
        <rect x="66" y="10" width="18" height="78" rx="9" transform="rotate(9 75 49)" fill={`url(#${gradId})`} stroke="rgba(137,81,147,0.3)" strokeWidth="1" />
        <rect x="8" y="76" width="84" height="50" rx="25" fill={`url(#${gradId})`} stroke="rgba(137,81,147,0.3)" strokeWidth="1" />
      </svg>
    </div>
  )
}

function CompCardStack({ onTap }: { onTap: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onTap}
      aria-label="Show next question"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92, rotate: -2 }}
      className="relative h-32 w-24 shrink-0 cursor-pointer sm:h-40 sm:w-32"
      style={{ perspective: 1000 }}
    >
      <div className="absolute -bottom-3 left-1/2 h-5 w-16 -translate-x-1/2 rounded-full bg-black/50 blur-lg" aria-hidden="true" />
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: [-10, 10, -10], rotateX: [3, -3, 3], y: [0, -6, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="absolute inset-0 translate-x-2.5 translate-y-3 rotate-[-8deg] rounded-2xl border border-white/10 bg-gradient-to-br from-pomelo-purple/30 to-[#0a0a0c]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 translate-x-1 translate-y-1.5 rotate-[-3deg] rounded-2xl border border-white/15 bg-gradient-to-br from-pomelo-blue/25 to-[#0a0a0c]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-[#1c1a1e] via-[#131215] to-[#08080a] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.65)]">
          <div className="noise-overlay h-full w-full">
            <PomeloMark className="absolute left-2.5 top-2.5 h-3.5 w-3.5 opacity-90 sm:left-3 sm:top-3 sm:h-4 sm:w-4" />
            <PomeloMark className="absolute bottom-2.5 right-2.5 h-3.5 w-3.5 rotate-180 opacity-90 sm:bottom-3 sm:right-3 sm:h-4 sm:w-4" />
            <div className="flex h-full w-full items-center justify-center px-3">
              <img
                src={pomeloLogo}
                alt="Pomelo Casting"
                className="w-full drop-shadow-[0_0_20px_rgba(0,178,226,0.4)]"
              />
            </div>
          </div>
        </div>
      </motion.div>
      <motion.span
        className="absolute -right-2.5 -top-2.5 z-20 flex items-center gap-1 rounded-full border border-white/25 bg-black/85 py-1 pl-1.5 pr-2 text-[0.55rem] font-semibold uppercase tracking-widest text-white shadow-[0_6px_16px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:-right-3 sm:-top-3 sm:py-1.5 sm:pl-2 sm:pr-2.5 sm:text-[0.6rem]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pomelo-blue opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-pomelo-blue" />
        </span>
        Press
      </motion.span>
    </motion.button>
  )
}

export default function FaqHub() {
  const [activeTopic, setActiveTopic] = useState<TopicKey>('brands')
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const active = topics.find((t) => t.key === activeTopic)!
  const item = active.items[index]

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [7, 1]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, -2]), { stiffness: 150, damping: 20 })

  const handlePanelMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  const selectTopic = (key: TopicKey) => {
    setActiveTopic(key)
    setIndex(0)
  }

  const goNext = () => setIndex((i) => (i + 1) % active.items.length)

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(goNext, AUTO_ADVANCE_MS)
    return () => window.clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTopic, paused])

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#0b0713] via-[#130b21] to-[#0a0f1a] py-16 sm:py-24"
    >
      {/* Full Q&A text for assistive tech and crawlers — the interactive panel below only ever shows one question at a time. */}
      <div className="sr-only">
        {topics.flatMap((topic) => topic.items).map((q) => (
          <div key={q.question}>
            <p>{q.question}</p>
            <p>{q.answer}</p>
          </div>
        ))}
      </div>

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-pomelo-purple/25 to-pomelo-blue/20 blur-[140px]"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease }}
        className="relative mx-auto max-w-5xl px-6"
      >
        <motion.div
          onMouseMove={handlePanelMove}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            mx.set(0.5)
            my.set(0.5)
            setPaused(false)
          }}
          style={{ rotateX, rotateY, transformPerspective: 1400 }}
          className="relative"
        >
          <GripHand side="left" />
          <GripHand side="right" />

          <div className="relative isolate overflow-hidden rounded-[2.5rem] p-px">
            <motion.div
              className="absolute inset-[-30%] -z-10"
              style={{ background: glowConic }}
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            />

            <div className="relative rounded-[2.4rem] bg-gradient-to-br from-[#26262e] via-[#111114] to-[#050506] p-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] sm:p-4">
              <span
                className="absolute left-1/2 top-2 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-black/60 ring-1 ring-white/10 sm:top-2.5"
                aria-hidden="true"
              />

              <div className="noise-overlay relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1b0d2e] via-[#140b20] to-[#0a1420] px-6 pb-10 pt-8 sm:px-10 sm:pb-12 sm:pt-9">
                <div
                  className="pointer-events-none absolute -inset-x-10 -top-24 h-56 rotate-[-6deg] bg-gradient-to-b from-white/20 via-white/5 to-transparent blur-2xl"
                  aria-hidden="true"
                />

                <div className="relative">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
                      <IconSparkle className="h-3 w-3 text-pomelo-blue" aria-hidden="true" />
                      {faqSection.label}
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_auto] lg:items-center lg:gap-10">
                    <div>
                      <h2 className="text-balance text-left font-display text-3xl leading-[0.95] text-white sm:text-4xl lg:text-[2.75rem]">
                        Your questions,
                        <br />
                        <span className="bg-gradient-to-r from-pomelo-blue to-pomelo-purple bg-clip-text text-transparent">
                          answered.
                        </span>
                      </h2>

                      <div className="relative mt-6 min-h-[6rem]">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${activeTopic}-${index}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease }}
                          >
                            <p className="text-balance text-lg font-semibold text-white sm:text-xl">{item.question}</p>
                            <p className="mt-3 max-w-xl text-balance text-sm leading-relaxed text-white/60">{item.answer}</p>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                      <CompCardStack onTap={goNext} />
                      <div className="flex flex-row gap-1.5 lg:flex-col" aria-hidden="true">
                        {active.items.map((q, i) => (
                          <button
                            key={q.question}
                            type="button"
                            onClick={() => setIndex(i)}
                            aria-label={`Question ${i + 1}`}
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-semibold transition-all duration-300 ${
                              i === index
                                ? 'bg-white text-[#140b20] shadow-[0_0_14px_-2px_rgba(0,178,226,0.8)]'
                                : 'bg-white/5 text-white/55 hover:bg-white/10 hover:text-white/70'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-9 flex items-center justify-center gap-6 border-t border-white/10 pt-7 sm:gap-10">
                    {topics.map((topic) => {
                      const isActive = activeTopic === topic.key
                      return (
                        <button
                          key={topic.key}
                          type="button"
                          onClick={() => selectTopic(topic.key)}
                          aria-pressed={isActive}
                          className="group flex flex-col items-center gap-2"
                        >
                          <span
                            className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${
                              isActive
                                ? 'bg-white shadow-[0_0_24px_-6px_rgba(0,178,226,0.9)]'
                                : 'border border-white/15 bg-white/[0.03] group-hover:border-white/30'
                            }`}
                          >
                            <topic.Icon className={`h-5 w-5 transition-colors duration-300 ${isActive ? 'text-[#140b20]' : 'text-white/45'}`} />
                          </span>
                          <span
                            className={`text-xs font-semibold uppercase tracking-wide transition-colors duration-300 ${
                              isActive ? 'text-white' : 'text-white/55 group-hover:text-white/70'
                            }`}
                          >
                            {topic.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-8 flex justify-center">
                    <Magnetic strength={12}>
                      <a
                        href={contact.whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_-8px_rgba(0,178,226,0.5)] backdrop-blur-sm transition-colors hover:border-pomelo-blue/50"
                      >
                        <IconWhatsapp className="h-4 w-4 text-[#25D366]" />
                        Chat on WhatsApp
                      </a>
                    </Magnetic>
                  </div>
                </div>

                <div
                  className="pointer-events-none absolute bottom-3 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-white/20 sm:bottom-4"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
