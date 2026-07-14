import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { useRef } from 'react'
import type { MouseEvent } from 'react'
import Magnetic from '../components/Magnetic'
import PremiumButton from '../components/PremiumButton'
import SplitText from '../components/SplitText'
import WordRotator from '../components/WordRotator'
import heroPhoto from '../assets/hero-crosswalk-blue.jpg'
import { hero } from '../data/content'

const particles = Array.from({ length: 16 }).map((_, i) => ({
  left: (i * 37 + 11) % 100,
  top: (i * 23 + 7) % 100,
  size: 2 + (i % 3),
  duration: 10 + (i % 5) * 2,
  delay: (i % 6) * 0.8,
  hue: i % 2 === 0 ? 'bg-pomelo-blue/60' : 'bg-pomelo-purple/60',
}))

function HeroParticle({
  p,
  cursorX,
  cursorY,
}: {
  p: (typeof particles)[number]
  cursorX: MotionValue<number>
  cursorY: MotionValue<number>
}) {
  const proximityScale = useTransform([cursorX, cursorY], (latest) => {
    const [cx, cy] = latest as [number, number]
    const dx = cx * 100 - p.left
    const dy = cy * 100 - p.top
    const dist = Math.sqrt(dx * dx + dy * dy)
    return 1 + Math.max(0, 1 - dist / 24) * 2.2
  })
  const springScale = useSpring(proximityScale, { stiffness: 220, damping: 22 })

  return (
    <motion.span
      className={`absolute rounded-full ${p.hue}`}
      style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, scale: springScale }}
      animate={{ y: [0, -30, 0], opacity: [0.15, 0.7, 0.15] }}
      transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
    />
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const coneWidthVw = useTransform(scrollYProgress, [0, 1], [46, 16])
  const coneWidth = useTransform(coneWidthVw, (v) => `${v}vw`)
  const dimOpacity = useTransform(scrollYProgress, [0, 1], [0.65, 0.95])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  const cursorX = useMotionValue(0.5)
  const cursorY = useMotionValue(0.5)
  const coneX = useSpring(useTransform(cursorX, [0, 1], ['-5%', '5%']), { stiffness: 40, damping: 20 })

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    cursorX.set((e.clientX - rect.left) / rect.width)
    cursorY.set((e.clientY - rect.top) / rect.height)
  }

  return (
    <section
      id="top"
      aria-label="Introduction"
      ref={ref}
      onMouseMove={handleMove}
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#0a0f1a]"
    >
      <div className="absolute inset-0 -z-20">
        <img
          src={heroPhoto}
          alt="Models walking for Pomelo Casting"
          className="h-full w-full object-cover opacity-70"
          style={{ objectPosition: 'center 30%' }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-black/60 to-[#0a0f1a]"
          style={{ opacity: dimOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 h-full -translate-x-1/2 mix-blend-screen"
        style={{ width: coneWidth, x: coneX }}
        aria-hidden="true"
      >
        <motion.div
          className="h-full w-full"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.22) 0%, rgba(180,225,255,0.1) 45%, transparent 82%)',
            clipPath: 'polygon(44% 0%, 56% 0%, 92% 100%, 8% 100%)',
            filter: 'blur(6px)',
          }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute -top-1/3 -left-1/4 h-2/3 w-2/3 rounded-full bg-pomelo-purple/25 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute top-1/4 -right-1/4 h-2/3 w-2/3 rounded-full bg-pomelo-blue/15 blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {particles.map((p, i) => (
          <HeroParticle key={i} p={p} cursorX={cursorX} cursorY={cursorY} />
        ))}
      </div>

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center px-6 text-center"
      >
        <h1 className="text-balance font-display text-5xl italic leading-[1.05] text-white sm:text-6xl lg:text-7xl">
          <SplitText text={hero.headlineLead} delay={1.5} />{' '}
          <WordRotator words={hero.rotatingWords} className="text-gradient not-italic" /> <br />
          <SplitText text={hero.headlineTail} delay={1.65} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.9 }}
          className="mt-6 max-w-lg text-lg text-white/70"
        >
          {hero.subhead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.05 }}
          className="mt-10"
        >
          <Magnetic strength={16}>
            <PremiumButton href="#contact">{hero.cta}</PremiumButton>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/25 p-1.5"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-pomelo-blue" />
        </motion.div>
        <p className="mt-2 text-center text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/40">
          Step inside
        </p>
      </motion.div>
    </section>
  )
}
