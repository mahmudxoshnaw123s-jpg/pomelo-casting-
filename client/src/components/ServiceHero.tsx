import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import type { MotionValue } from 'framer-motion'
import type { ComponentType, MouseEvent } from 'react'
import { IconSparkle } from './icons'
import Magnetic from './Magnetic'
import PremiumButton from './PremiumButton'

interface ServiceItem {
  title: string
  description: string
  overview: string
  workflow: string[]
  deliverables: string[]
  timeline: string
  tools: string[]
}

interface SceneProps {
  className?: string
}

interface ServiceHeroProps {
  service: ServiceItem
  kicker: string
  heroImage: string
  imageAlt: string
  imageObjectPosition?: string
  Scene: ComponentType<SceneProps>
  pillLabel: string
  reverse?: boolean
  textInBox?: boolean
  dimBackground?: boolean
  spotlightOnBox?: boolean
  defaultExpanded?: boolean
}

const dust = [
  { left: '30%', delay: 0 },
  { left: '48%', delay: 1.4 },
  { left: '58%', delay: 2.8 },
  { left: '40%', delay: 4.2 },
]

function ScenePreview({
  Scene,
  pillLabel,
  title,
  description,
  overview,
  boxWidthClassName,
  spotlight,
  cursorX,
  cursorY,
}: {
  Scene: ComponentType<SceneProps>
  pillLabel: string
  title: string
  description?: string
  overview?: string
  boxWidthClassName: string
  spotlight?: boolean
  cursorX: MotionValue<number>
  cursorY: MotionValue<number>
}) {
  const tiltX = useSpring(useTransform(cursorY, [0, 1], [6, -6]), { stiffness: 60, damping: 20 })
  const tiltY = useSpring(useTransform(cursorX, [0, 1], [-6, 6]), { stiffness: 60, damping: 20 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1400 }}
      className={`relative mx-auto mt-14 w-full ${boxWidthClassName}`}
    >
      {spotlight && (
        <motion.div
          className="absolute -inset-10 -z-10 rounded-[3rem] bg-white/25 blur-[60px]"
          animate={{ opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <motion.div
        className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-gradient-to-br from-pomelo-blue/40 to-pomelo-purple/40 blur-xl"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
        className="relative flex flex-col overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-pomelo-purple-dark via-pomelo-purple to-pomelo-blue-dark shadow-2xl shadow-pomelo-purple/40 lg:rounded-[2.5rem]"
      >
        <div className="relative aspect-[4/3] w-full">
          <motion.div
            className="absolute -top-1/4 left-1/4 h-2/3 w-2/3 rounded-full bg-white/20 blur-3xl"
            animate={{ x: [0, 15, 0], y: [0, 10, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <Scene className="absolute inset-0 h-full w-full" />
          <div className="noise-overlay absolute inset-0" />

          <motion.span
            className="absolute right-3 top-3 text-white/70"
            animate={{ opacity: [0.4, 0.9, 0.4], rotate: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <IconSparkle className="h-3.5 w-3.5" />
          </motion.span>
        </div>

        <div className="relative border-t border-white/10 bg-black/10 px-6 py-5 text-center">
          <span className="inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-widest text-white/60">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-pomelo-blue"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            {pillLabel}
          </span>
          <p className="mt-1.5 text-balance font-display text-xl italic leading-snug text-white sm:text-2xl">{title}</p>

          {description && (
            <p className="mt-3 text-balance text-sm font-medium leading-relaxed text-white/85">{description}</p>
          )}
          {overview && <p className="mt-2 text-balance text-xs leading-relaxed text-white/60">{overview}</p>}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ServiceHero({
  service,
  kicker,
  heroImage,
  imageAlt,
  imageObjectPosition = 'center',
  Scene,
  pillLabel,
  reverse = false,
  textInBox = false,
  dimBackground = false,
  spotlightOnBox = false,
  defaultExpanded = false,
}: ServiceHeroProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  const cursorX = useMotionValue(0.5)
  const cursorY = useMotionValue(0.5)
  const handleCursorMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    cursorX.set((e.clientX - rect.left) / rect.width)
    cursorY.set((e.clientY - rect.top) / rect.height)
  }

  const glowSideA = reverse ? 'right-[10%]' : 'left-[10%]'
  const glowSideB = reverse ? 'left-[8%]' : 'right-[8%]'
  const overlayVertical = dimBackground ? 'from-black/92 via-black/65 to-black/45' : 'from-black/85 via-black/45 to-black/25'
  const overlayHorizontal = dimBackground ? 'from-black/50 via-transparent to-black/50' : 'from-black/35 via-transparent to-black/35'
  const imageFilter = dimBackground ? 'brightness(0.55) saturate(0.85)' : undefined

  return (
    <div ref={ref} onMouseMove={handleCursorMove} className="relative isolate min-h-[100svh] overflow-hidden border-b border-line">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div className="absolute inset-x-0 -top-[15%] h-[130%]" style={{ y: parallaxY }}>
          <motion.img
            src={heroImage}
            alt={imageAlt}
            className="h-full w-full object-cover"
            style={{ objectPosition: imageObjectPosition, filter: imageFilter }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <div className={`absolute inset-0 bg-gradient-to-t ${overlayVertical}`} />
        <div className={`absolute inset-0 bg-gradient-to-r ${overlayHorizontal}`} />

        <motion.div
          className={`absolute top-[15%] ${glowSideA} h-72 w-72 rounded-full bg-pomelo-blue/30 blur-[100px] mix-blend-screen`}
          animate={{ x: reverse ? [0, -60, 0] : [0, 60, 0], y: [0, 40, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={`absolute bottom-[18%] ${glowSideB} h-80 w-80 rounded-full bg-pomelo-purple/30 blur-[110px] mix-blend-screen`}
          animate={{ x: reverse ? [0, 50, 0] : [0, -50, 0], y: [0, -30, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pomelo-blue/10 blur-[140px]"
          animate={{ opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {spotlightOnBox && (
          <div className="pointer-events-none absolute inset-0 flex justify-center overflow-hidden">
            <motion.div
              className="h-full w-[26rem]"
              style={{
                background: 'linear-gradient(to bottom, rgba(180,225,255,0) 0%, rgba(180,225,255,0.16) 55%, rgba(200,230,255,0.4) 100%)',
                clipPath: 'polygon(47% 8%, 53% 8%, 100% 100%, 0% 100%)',
                filter: 'blur(22px)',
                mixBlendMode: 'screen',
              }}
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            {dust.map((d, i) => (
              <motion.span
                key={i}
                className="absolute bottom-0 h-1 w-1 rounded-full bg-white/70 blur-[1px]"
                style={{ left: d.left }}
                animate={{ y: ['0%', '-90%'], opacity: [0, 0.8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeOut', delay: d.delay }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-base to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-56 bg-gradient-to-t from-base to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-6 py-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-pomelo-blue"
        >
          <span className="h-px w-10 bg-pomelo-blue" />
          {kicker}
          <span className="h-px w-10 bg-pomelo-blue" />
        </motion.p>

        {!textInBox && (
          <>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-lg text-lg text-white/85"
            >
              {service.description}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 max-w-lg text-sm leading-relaxed text-white/60"
            >
              {service.overview}
            </motion.p>
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={textInBox ? '' : 'mt-9'}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Magnetic strength={16}>
              <PremiumButton href="#contact">Start a project</PremiumButton>
            </Magnetic>

            <Magnetic>
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="group relative inline-flex items-center gap-2 border-b border-white/70 pb-1 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:border-pomelo-blue hover:text-pomelo-blue"
              >
                {expanded ? 'Close' : 'The full process'}
                <motion.span animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.3 }}>
                  →
                </motion.span>
              </button>
            </Magnetic>
          </div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="mx-auto mt-6 max-w-lg space-y-4 border-t border-white/20 pt-6 text-left text-sm">
                  <p className="text-white/70">
                    <span className="font-semibold text-white">Workflow — </span>
                    {service.workflow.join('  ·  ')}
                  </p>
                  <p className="text-white/70">
                    <span className="font-semibold text-white">Deliverables — </span>
                    {service.deliverables.join('  ·  ')}
                  </p>
                  <p className="text-white/70">
                    <span className="font-semibold text-white">Timeline — </span>
                    {service.timeline}
                  </p>
                  <p className="text-white/70">
                    <span className="font-semibold text-white">Tools — </span>
                    {service.tools.join('  ·  ')}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <ScenePreview
          Scene={Scene}
          pillLabel={pillLabel}
          title={service.title}
          description={textInBox ? service.description : undefined}
          overview={textInBox ? service.overview : undefined}
          boxWidthClassName={textInBox ? 'max-w-sm sm:max-w-md' : 'max-w-xs sm:max-w-sm'}
          spotlight={spotlightOnBox}
          cursorX={cursorX}
          cursorY={cursorY}
        />
      </div>
    </div>
  )
}
