import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import BrandPhoto from './BrandPhoto'
import SplitText from './SplitText'
import { work } from '../data/content'
import { images } from '../data/images'

const BLUE = '#00b2e2'
const PURPLE = '#895193'
const ACCENTS = [BLUE, PURPLE, BLUE, PURPLE]

const particles = Array.from({ length: 16 }).map((_, i) => ({
  left: (i * 37 + 11) % 100,
  top: (i * 23 + 7) % 100,
  size: 2 + (i % 3),
  duration: 10 + (i % 5) * 2,
  delay: (i % 6) * 0.8,
}))

function glowConic(accent: string) {
  return `conic-gradient(from 0deg, ${accent}, transparent 30%, transparent 55%, #895193, transparent 82%)`
}

const stageVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 60, scale: 0.95 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -60, scale: 0.96 }),
}

export default function WorkExhibition() {
  const [[index, direction], setIndexState] = useState<[number, number]>([0, 0])
  const total = work.items.length
  const project = work.items[index]
  const accent = ACCENTS[index % ACCENTS.length]

  const go = (next: number, dir: number) => setIndexState([(next + total) % total, dir])
  const goNext = () => go(index + 1, 1)
  const goPrev = () => go(index - 1, -1)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 20 })
  const sy = useSpring(my, { stiffness: 40, damping: 20 })
  const blobX = useTransform(sx, [-0.5, 0.5], [-24, 24])
  const blobY = useTransform(sy, [-0.5, 0.5], [-18, 18])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section
      id="work"
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
        aria-hidden="true"
      />

      <motion.div
        style={{ x: blobX, y: blobY }}
        className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full blur-[130px]"
        animate={{ backgroundColor: accent }}
        transition={{ duration: 0.8 }}
        initial={false}
      >
        <div className="h-full w-full rounded-full opacity-25" style={{ backgroundColor: accent }} />
      </motion.div>
      <motion.div
        style={{ x: useTransform(sx, [-0.5, 0.5], [20, -20]), y: useTransform(sy, [-0.5, 0.5], [14, -14]) }}
        className="pointer-events-none absolute -right-40 bottom-10 h-[32rem] w-[32rem] rounded-full bg-pomelo-purple/15 blur-[140px]"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/50"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -30, 0], opacity: [0.15, 0.65, 0.15] }}
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
            {work.label}
            <span className="h-px w-8 bg-pomelo-blue" />
          </motion.p>

          <h2 className="text-balance font-display text-4xl italic leading-tight text-white sm:text-5xl lg:text-6xl">
            <SplitText text={work.heading} />
          </h2>
        </div>

        <div className="relative mt-16">
          <div className="relative isolate mx-auto aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-[2rem] p-px">
            <motion.div
              key={`glow-${index}`}
              className="absolute inset-0 -z-10"
              style={{ background: glowConic(accent) }}
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative h-full w-full overflow-hidden rounded-[calc(2rem-1px)] bg-[#0d0a18]">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={stageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <BrandPhoto src={images[project.image]} alt={project.title} className="h-full w-full" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />

                  <motion.div
                    key={`sweep-${index}`}
                    className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    initial={{ x: '-140%' }}
                    animate={{ x: '340%' }}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                  />

                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-7 sm:p-10">
                    <span
                      className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm"
                      style={{ borderColor: `${accent}55` }}
                    >
                      {project.tag}
                    </span>
                    <h3 className="text-balance font-display text-2xl italic leading-tight text-white sm:text-3xl">
                      <SplitText text={project.title} delay={0.15} />
                    </h3>
                    <p className="max-w-md text-sm leading-relaxed text-white/65 sm:text-base">{project.description}</p>
                  </div>

                  <span className="absolute right-6 top-6 font-display text-sm italic text-white/50 sm:text-base">
                    {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous project"
            className="absolute left-0 top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-xl transition-colors hover:border-pomelo-blue/50 hover:text-pomelo-blue max-lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next project"
            className="absolute right-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-xl transition-colors hover:border-pomelo-blue/50 hover:text-pomelo-blue max-lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <div className="mt-10 flex justify-center gap-4">
          {work.items.map((item, i) => {
            const active = i === index
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => go(i, i > index ? 1 : -1)}
                aria-label={`View ${item.title}`}
                aria-current={active}
                className="group relative isolate h-16 w-16 shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-20"
              >
                <span
                  className="absolute -inset-0.5 -z-10 rounded-xl transition-opacity duration-300"
                  style={{ background: glowConic(accent), opacity: active ? 1 : 0 }}
                />
                <span className="absolute inset-0 overflow-hidden rounded-[calc(0.75rem-1px)]">
                  <BrandPhoto src={images[item.image]} alt="" className="h-full w-full" />
                  <span
                    className="absolute inset-0 bg-black transition-opacity duration-300"
                    style={{ opacity: active ? 0 : 0.55 }}
                  />
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
