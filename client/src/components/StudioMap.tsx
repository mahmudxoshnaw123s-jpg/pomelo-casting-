import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import type { MouseEvent } from 'react'
import { useRef, useState } from 'react'
import babylonBg from '../assets/babylon-optimized.jpg'
import { contact } from '../data/content'

const ease = [0.16, 1, 0.3, 1] as const

function GlobeLauncher({ onLaunch }: { onLaunch: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onLaunch}
      initial={false}
      exit={{ scale: 6, opacity: 0, transition: { duration: 1, ease } }}
      className="group absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-[#0a0f1a]"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        className="relative h-36 w-36 sm:h-44 sm:w-44"
      >
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs>
            <linearGradient id="globeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00b2e2" />
              <stop offset="100%" stopColor="#895193" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="97" fill="none" stroke="url(#globeGrad)" strokeWidth="1.5" />
          <ellipse cx="100" cy="100" rx="97" ry="34" fill="none" stroke="rgba(0,178,226,0.35)" strokeWidth="1" />
          <ellipse cx="100" cy="100" rx="97" ry="66" fill="none" stroke="rgba(0,178,226,0.22)" strokeWidth="1" />
          <ellipse cx="100" cy="100" rx="34" ry="97" fill="none" stroke="rgba(137,81,147,0.35)" strokeWidth="1" />
          <ellipse cx="100" cy="100" rx="66" ry="97" fill="none" stroke="rgba(137,81,147,0.22)" strokeWidth="1" />
          <line x1="3" y1="100" x2="197" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </svg>
        <motion.span
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[63%] top-[36%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pomelo-blue shadow-[0_0_14px_3px_rgba(0,178,226,0.75)]"
          aria-hidden="true"
        />
      </motion.div>

      <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60 transition-colors group-hover:text-white">
        Click to locate us
      </span>
    </motion.button>
  )
}

const particles = Array.from({ length: 18 }).map((_, i) => ({
  left: (i * 43 + 7) % 100,
  top: (i * 27 + 11) % 100,
  size: 2 + (i % 3),
  duration: 12 + (i % 5) * 2.4,
  delay: (i % 7) * 0.6,
}))

export default function StudioMap() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  const { lat, lng } = contact.mapCoords
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
  const mapEmbedSrc = `https://www.google.com/maps?q=${lat},${lng}(${encodeURIComponent(contact.mapPlaceName)})&z=16&output=embed`

  const [launched, setLaunched] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)
  const handleLaunch = () => setLaunched(true)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 45, damping: 20 })
  const smy = useSpring(my, { stiffness: 45, damping: 20 })
  const tiltX = useTransform(smy, [-0.5, 0.5], [4, -4])
  const tiltY = useTransform(smx, [-0.5, 0.5], [-4, 4])
  const glowX = useTransform(smx, [-0.5, 0.5], [-18, 18])
  const glowY = useTransform(smy, [-0.5, 0.5], [-14, 14])

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Studio location"
      onMouseMove={handleMove}
      className="relative isolate overflow-hidden py-28 sm:py-36"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20 scale-110">
        <img src={babylonBg} alt="" loading="lazy" className="h-full w-full object-cover" aria-hidden="true" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#0a0f1a] via-transparent to-[#0a0f1a]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#0a0f1a]/60 via-transparent to-[#0a0f1a]/60" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_50%_48%,rgba(10,15,26,0.35)_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-pomelo-purple/10 via-transparent to-pomelo-blue/10" />
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute left-1/4 top-0 h-1/2 w-1/2 rounded-full bg-pomelo-blue/15 blur-[140px]"
        aria-hidden="true"
      />
      <motion.div
        style={{ x: useTransform(glowX, (v) => -v), y: useTransform(glowY, (v) => -v) }}
        className="pointer-events-none absolute bottom-0 right-1/4 h-1/2 w-1/2 rounded-full bg-pomelo-purple/15 blur-[140px]"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/60"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -32, 0], opacity: [0.1, 0.55, 0.1] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-xl text-balance font-display text-3xl leading-tight text-white sm:text-4xl"
        >
          Find us in the heart of Ankawa.
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
          className="relative isolate mx-auto mt-14 max-w-3xl rounded-[2rem] p-px"
        >
          <div className="relative h-[360px] w-full overflow-hidden rounded-[calc(2rem-1px)] border border-white/15 bg-white/[0.04] shadow-2xl shadow-black/50 backdrop-blur-xl sm:h-[420px]">
            {launched && (
              <>
                {!mapLoaded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 z-0 flex items-center justify-center bg-[#0a0f1a]"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                      className="h-3 w-3 rounded-full bg-pomelo-blue shadow-[0_0_14px_3px_rgba(0,178,226,0.75)]"
                      aria-hidden="true"
                    />
                  </motion.div>
                )}
                <motion.iframe
                  title="Pomelo Casting location"
                  src={mapEmbedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setMapLoaded(true)}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: mapLoaded ? 1 : 0, scale: mapLoaded ? 1 : 1.1 }}
                  transition={{ duration: 1, ease }}
                  className="absolute inset-0 z-0 h-full w-full grayscale-[0.15] contrast-[1.05] invert hue-rotate-180"
                />
              </>
            )}
            <AnimatePresence>
              {!launched && <GlobeLauncher key="launcher" onLaunch={handleLaunch} />}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-col items-center gap-1"
        >
          <address className="not-italic text-white/70">{contact.address}</address>
          <a
            href={directionsHref}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold uppercase tracking-widest text-pomelo-blue transition-colors hover:text-white"
          >
            Get directions →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
