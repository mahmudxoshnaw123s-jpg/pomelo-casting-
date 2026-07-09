import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { useRef } from 'react'
import BrandPhoto from './BrandPhoto'
import Magnetic from './Magnetic'
import PremiumButton from './PremiumButton'
import SplitText from './SplitText'
import { talentPage } from '../data/content'
import { images } from '../data/images'

const glowConic =
  'conic-gradient(from 0deg, transparent 0%, #00b2e2 12%, transparent 28%, #895193 50%, transparent 68%, #00b2e2 86%, transparent 100%)'

const particles = Array.from({ length: 16 }).map((_, i) => ({
  left: (i * 37 + 11) % 100,
  top: (i * 23 + 7) % 100,
  size: 2 + (i % 3),
  duration: 10 + (i % 5) * 2,
  delay: (i % 6) * 0.8,
}))

type GalleryItem = (typeof talentPage.gallery)[number]

function AmbientField() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 20 })
  const sy = useSpring(my, { stiffness: 40, damping: 20 })
  const blobX = useTransform(sx, [-0.5, 0.5], [-24, 24])
  const blobY = useTransform(sy, [-0.5, 0.5], [-18, 18])

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <div onMouseMove={handleMove} className="pointer-events-auto absolute inset-0 -z-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <motion.div
        style={{ x: blobX, y: blobY }}
        className="pointer-events-none absolute -left-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-pomelo-purple/25 blur-[130px]"
      />
      <motion.div
        style={{ x: useTransform(blobX, (v) => -v), y: useTransform(blobY, (v) => -v) }}
        className="pointer-events-none absolute -right-40 bottom-1/4 h-[32rem] w-[32rem] rounded-full bg-pomelo-blue/15 blur-[130px]"
      />
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/50"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -30, 0], opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}
      </div>
    </div>
  )
}

function GalleryCard({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover="hover"
      className="group relative isolate cursor-pointer overflow-hidden rounded-3xl border border-white/10"
    >
      <button type="button" onClick={onOpen} className="absolute inset-0 z-30" aria-label={`View ${item.title}`} />
      <motion.div
        className="pointer-events-none absolute -inset-px z-20 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: glowConic,
          padding: 1,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div className="relative aspect-[3/4] w-full">
        <motion.div variants={{ hover: { scale: 1.07 } }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0">
          <BrandPhoto src={images[item.image]} alt={item.title} className="h-full w-full" />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-pomelo-blue">{item.category}</span>
          <h3 className="mt-1 font-display text-xl italic text-white">{item.title}</h3>
          <p className="mt-2 max-w-xs text-sm text-white/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {item.description}
          </p>
        </div>
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          variants={{ hover: { opacity: 1, scale: 1 } }}
          transition={{ duration: 0.3 }}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </motion.span>
      </div>
    </motion.div>
  )
}

function Lightbox({ items, index, onClose, onNav }: { items: GalleryItem[]; index: number; onClose: () => void; onNav: (dir: 1 | -1) => void }) {
  const item = items[index]

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onNav])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-pomelo-blue/50 hover:text-pomelo-blue"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onNav(-1)
        }}
        aria-label="Previous"
        className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-pomelo-blue/50 hover:text-pomelo-blue sm:left-8"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onNav(1)
        }}
        aria-label="Next"
        className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-pomelo-blue/50 hover:text-pomelo-blue sm:right-8"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={item.image}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative mx-auto max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/60"
        >
          <img src={images[item.image]} alt={item.title} className="max-h-[85vh] w-auto object-contain" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-6">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-pomelo-blue">{item.category}</span>
            <p className="mt-1 font-display text-xl italic text-white">{item.title}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default function TalentShowcase() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const filtered =
    activeCategory === 'All' ? talentPage.gallery : talentPage.gallery.filter((item) => item.category === activeCategory)

  const openLightbox = (item: GalleryItem) => {
    setLightboxIndex(filtered.findIndex((g) => g.image === item.image))
  }
  const navLightbox = (dir: 1 | -1) => {
    setLightboxIndex((prev) => {
      if (prev === null) return prev
      return (prev + dir + filtered.length) % filtered.length
    })
  }

  return (
    <div className="relative bg-gradient-to-b from-[#0b0713] via-[#130b21] to-[#0a0f1a]">
      <div ref={heroRef} className="relative isolate flex min-h-[90svh] items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 -z-10">
          <img
            src={images[talentPage.gallery[0].image]}
            alt=""
            className="h-full w-full object-cover opacity-50"
            style={{ objectPosition: 'center 8%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/95 via-black/70 to-[#0a0f1a]" />
        </motion.div>
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-pomelo-blue"
          >
            <span className="h-px w-8 bg-pomelo-blue" />
            {talentPage.label}
            <span className="h-px w-8 bg-pomelo-blue" />
          </motion.p>
          <h1 className="text-balance font-display text-5xl italic leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            <SplitText text={talentPage.heading} delay={0.4} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mx-auto mt-6 max-w-lg text-lg text-white/70"
          >
            {talentPage.subhead}
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/25 p-1.5"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-pomelo-blue" />
          </motion.div>
        </motion.div>
      </div>

      <section className="relative isolate overflow-hidden py-24 sm:py-32">
        <AmbientField />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            {talentPage.categories.map((cat) => {
              const active = activeCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className="relative rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-widest text-white/70 transition-colors hover:text-white"
                >
                  {active && (
                    <motion.span
                      layoutId="talent-filter-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-pomelo-blue to-pomelo-purple"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={`relative z-10 ${active ? 'text-white' : ''}`}>{cat}</span>
                </button>
              )
            })}
          </div>

          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <GalleryCard key={item.image} item={item} onOpen={() => openLightbox(item)} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative isolate mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/10 lg:order-2"
          >
            <div className="aspect-[4/3] w-full">
              <BrandPhoto src={images[talentPage.spotlight.image]} alt={talentPage.spotlight.heading} className="h-full w-full" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:order-1"
          >
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-pomelo-blue">
              <span className="h-px w-8 bg-pomelo-blue" />
              {talentPage.spotlight.label}
            </p>
            <h2 className="text-balance font-display text-3xl italic leading-tight text-white sm:text-4xl">
              {talentPage.spotlight.heading}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/60">{talentPage.spotlight.body}</p>
          </motion.div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-24 sm:py-32">
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pomelo-purple/15 blur-[130px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative isolate mx-auto max-w-3xl overflow-hidden rounded-[2rem] p-px"
        >
          <motion.div
            className="absolute inset-[-30%] -z-10"
            style={{ background: glowConic }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
          <div className="relative flex flex-col items-center gap-6 rounded-[calc(2rem-1px)] bg-[#0d0a18]/95 px-8 py-14 text-center backdrop-blur-xl">
            <h3 className="text-balance font-display text-4xl italic leading-tight text-white sm:text-5xl">
              <SplitText text={talentPage.cta.heading} />
            </h3>
            <p className="max-w-md text-white/60">{talentPage.cta.body}</p>
            <Magnetic strength={16}>
              <PremiumButton href="/apply">Apply Now</PremiumButton>
            </Magnetic>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox items={filtered} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNav={navLightbox} />
        )}
      </AnimatePresence>
    </div>
  )
}
