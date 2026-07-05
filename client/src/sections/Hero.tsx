import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import BrandPhoto from '../components/BrandPhoto'
import WordRotator from '../components/WordRotator'
import heroPhoto from '../assets/hero-crosswalk-blue.jpg'
import { hero } from '../data/content'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden pt-28 pb-16 sm:pt-32">
      <span
        className="pointer-events-none absolute -left-6 top-16 select-none text-[11rem] font-extrabold leading-none text-pomelo-purple/10 sm:text-[16rem]"
        aria-hidden="true"
      >
        01
      </span>

      <motion.div
        className="absolute -top-1/3 -left-1/4 h-2/3 w-2/3 rounded-full bg-pomelo-purple/20 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-1/4 -right-1/4 h-2/3 w-2/3 rounded-full bg-pomelo-blue/10 blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <motion.div style={{ y: textY, opacity }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-pomelo-blue"
          >
            <span className="h-px w-8 bg-pomelo-blue" />
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl"
          >
            {hero.headlineLead}{' '}
            <WordRotator words={hero.rotatingWords} className="text-gradient" /> <br />
            {hero.headlineTail}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-6 max-w-lg text-lg text-ink-soft"
          >
            {hero.subhead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10"
          >
            <a
              href="#contact"
              className="inline-block rounded-full bg-pomelo-blue px-8 py-4 text-base font-semibold text-[var(--color-on-accent)] transition-transform hover:scale-105"
            >
              {hero.cta} →
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 0.95, rotate: -3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
          whileHover={{ rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] w-full max-w-md justify-self-center overflow-hidden rounded-3xl shadow-[10px_10px_0_0_var(--color-pomelo-blue)] transition-transform duration-500 lg:justify-self-end"
        >
          <BrandPhoto src={heroPhoto} alt="Models walking for Pomelo Casting" className="h-full w-full" priority />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-line p-1.5"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-pomelo-blue" />
        </motion.div>
      </motion.div>
    </section>
  )
}
