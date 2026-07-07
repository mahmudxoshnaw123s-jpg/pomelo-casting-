import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import type { MouseEvent } from 'react'
import { useRef } from 'react'
import babylonBg from '../assets/babylon.jpg'
import { contact } from '../data/content'

const glowConic =
  'conic-gradient(from 0deg, transparent 0%, #00b2e2 12%, transparent 28%, #895193 50%, transparent 68%, #00b2e2 86%, transparent 100%)'

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
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-5 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-pomelo-blue"
        >
          <span className="h-px w-8 bg-pomelo-blue" />
          Visit the studio
          <span className="h-px w-8 bg-pomelo-blue" />
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-xl text-balance font-display text-3xl italic leading-tight text-white sm:text-4xl"
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
          <motion.div
            className="absolute inset-[-40%] -z-10"
            style={{ background: glowConic }}
            animate={{ rotate: 360 }}
            transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
          />
          <div className="overflow-hidden rounded-[calc(2rem-1px)] border border-white/15 bg-white/[0.04] shadow-2xl shadow-black/50 backdrop-blur-xl">
            <iframe
              title="Pomelo Casting location"
              src={mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[360px] w-full grayscale-[0.15] contrast-[1.05] invert hue-rotate-180 sm:h-[420px]"
            />
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
