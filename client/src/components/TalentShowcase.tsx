import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import AmbientField from './AmbientField'
import BrandPhoto from './BrandPhoto'
import Magnetic from './Magnetic'
import PremiumButton from './PremiumButton'
import SplitText from './SplitText'
import { useModalFocus } from '../hooks/useModalFocus'
import { talentPage } from '../data/content'
import { images } from '../data/images'
import { fetchModels } from '../lib/models'

const glowConic =
  'conic-gradient(from 0deg, transparent 0%, #00b2e2 12%, transparent 28%, #895193 50%, transparent 68%, #00b2e2 86%, transparent 100%)'

interface DisplayItem {
  id: string
  cover: string
  images: string[]
  eyebrow: string
  title: string
  description: string
}

// Placeholder roster shown before any real talent is uploaded.
const fallbackItems: DisplayItem[] = talentPage.gallery.map((item) => ({
  id: item.id,
  cover: images[item.image],
  images: [images[item.image]],
  eyebrow: item.category,
  title: item.title,
  description: item.description,
}))

function GalleryCard({ item, onOpen }: { item: DisplayItem; onOpen: () => void }) {
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
        <motion.div variants={{ hover: { scale: 1.08 } }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0">
          <BrandPhoto src={item.cover} alt={item.title} className="h-full w-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          variants={{ hover: { opacity: 1 } }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute inset-0 bg-white/[0.04] backdrop-blur-[2px]"
        />
        <motion.div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ background: 'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.16) 50%, transparent 65%)' }}
          initial={{ x: '-120%' }}
          variants={{ hover: { x: '120%' } }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        <motion.div
          variants={{ hover: { y: -4 } }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 bottom-0 p-5 sm:p-6"
        >
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-pomelo-blue">{item.eyebrow}</span>
          <h3 className="mt-1 font-display text-lg italic text-white sm:text-xl">{item.title}</h3>
          <p className="mt-2 max-w-xs text-sm text-white/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {item.description}
          </p>
        </motion.div>
        {item.images.length > 1 && (
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
            {item.images.length} photos
          </span>
        )}
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          variants={{ hover: { opacity: 1, scale: 1 } }}
          transition={{ duration: 0.3 }}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm sm:right-5 sm:top-5 sm:h-10 sm:w-10"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </motion.span>
      </div>
    </motion.div>
  )
}

function Lightbox({ item, onClose }: { item: DisplayItem; onClose: () => void }) {
  const [imageIndex, setImageIndex] = useState(0)
  const total = item.images.length
  const containerRef = useRef<HTMLDivElement>(null)
  useModalFocus(containerRef)

  const nav = (dir: 1 | -1) => setImageIndex((prev) => (prev + dir + total) % total)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setImageIndex((prev) => (prev + 1) % total)
      if (e.key === 'ArrowLeft') setImageIndex((prev) => (prev - 1 + total) % total)
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, total])

  return (
    <motion.div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 backdrop-blur-xl outline-none"
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

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              nav(-1)
            }}
            aria-label="Previous photo"
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
              nav(1)
            }}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-pomelo-blue/50 hover:text-pomelo-blue sm:right-8"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={`${item.id}-${imageIndex}`}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative mx-auto max-h-[85vh] w-[90vw] max-w-xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/60"
        >
          <img src={item.images[imageIndex]} alt={item.title} className="max-h-[85vh] w-full object-contain" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 sm:p-8">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-pomelo-blue">{item.eyebrow}</span>
            <p id="lightbox-title" className="mt-1 font-display text-2xl italic text-white">
              {item.title}
            </p>
            <p className="mt-2 max-w-md text-sm text-white/60">{item.description}</p>
            {total > 1 && (
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-white/40">
                {imageIndex + 1} / {total}
              </p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default function TalentShowcase() {
  const [models, setModels] = useState<DisplayItem[] | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  useEffect(() => {
    let active = true
    fetchModels(false)
      .then((data) => {
        if (!active) return
        const mapped: DisplayItem[] = data
          .filter((m) => m.images.length > 0)
          .map((m) => ({
            id: m.id,
            cover: m.images[0].url,
            images: m.images.map((img) => img.url),
            eyebrow: 'Pomelo Talent',
            title: m.firstName,
            description: `${m.height} · ${m.hairColor} hair · ${m.eyeColor} eyes`,
          }))
        setModels(mapped)
      })
      .catch(() => {
        if (active) setModels([])
      })
    return () => {
      active = false
    }
  }, [])

  const galleryItems = models && models.length > 0 ? models : fallbackItems
  const heroImage = galleryItems[0]?.cover ?? images[talentPage.gallery[0].image]
  const openItem = galleryItems.find((item) => item.id === openId) ?? null

  return (
    <div className="relative bg-gradient-to-b from-[#0b0713] via-[#130b21] to-[#0a0f1a]">
      <div ref={heroRef} className="relative isolate flex min-h-[90svh] items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 -z-10">
          <img src={heroImage} alt="" className="h-full w-full object-cover opacity-50" style={{ objectPosition: 'center 8%' }} />
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

      <section aria-label="Talent roster" className="relative isolate overflow-hidden py-24 sm:py-32">
        <AmbientField />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <h2 className="sr-only">Talent roster</h2>
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {galleryItems.map((item) => (
              <GalleryCard key={item.id} item={item} onOpen={() => setOpenId(item.id)} />
            ))}
          </motion.div>
        </div>
      </section>

      <section aria-label="Inside the studio" className="relative isolate overflow-hidden py-24 sm:py-32">
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

      <section aria-label="Apply call to action" className="relative isolate overflow-hidden py-24 sm:py-32">
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

      <AnimatePresence>{openItem && <Lightbox item={openItem} onClose={() => setOpenId(null)} />}</AnimatePresence>
    </div>
  )
}
