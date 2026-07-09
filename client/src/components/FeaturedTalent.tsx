import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { MouseEvent } from 'react'
import BrandPhoto from './BrandPhoto'
import Magnetic from './Magnetic'
import PremiumButton from './PremiumButton'
import SplitText from './SplitText'
import { featuredTalent } from '../data/content'
import { images } from '../data/images'

const particles = Array.from({ length: 14 }).map((_, i) => ({
  left: (i * 31 + 9) % 100,
  top: (i * 19 + 13) % 100,
  size: 2 + (i % 3),
  duration: 11 + (i % 5) * 2,
  delay: (i % 6) * 0.7,
}))

function TalentCard({ item, index, wide }: { item: (typeof featuredTalent.images)[number]; index: number; wide?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover="hover"
      className={`group relative isolate overflow-hidden rounded-3xl border border-white/10 ${wide ? 'aspect-[21/9]' : 'aspect-[3/4]'}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-20 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'conic-gradient(from 0deg, #00b2e2, transparent 35%, transparent 60%, #895193, transparent 90%)',
          padding: 1,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <motion.div variants={{ hover: { scale: 1.06 } }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0">
        <BrandPhoto src={images[item.image]} alt={item.caption} className="h-full w-full" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
        <div>
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-pomelo-blue">{item.tag}</span>
          <p className="mt-1 font-display text-lg italic text-white sm:text-xl">{item.caption}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function FeaturedTalent() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 20 })
  const sy = useSpring(my, { stiffness: 40, damping: 20 })
  const blobX = useTransform(sx, [-0.5, 0.5], [-22, 22])
  const blobY = useTransform(sy, [-0.5, 0.5], [-16, 16])

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const [first, second, third, fourth] = featuredTalent.images

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#0a0f1a] via-[#130b21] to-[#0b0713] py-28 sm:py-36"
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
        className="pointer-events-none absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-pomelo-purple/25 blur-[130px]"
        aria-hidden="true"
      />
      <motion.div
        style={{ x: useTransform(blobX, (v) => -v), y: useTransform(blobY, (v) => -v) }}
        className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-pomelo-blue/15 blur-[130px]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/50"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -28, 0], opacity: [0.15, 0.6, 0.15] }}
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
            {featuredTalent.label}
            <span className="h-px w-8 bg-pomelo-blue" />
          </motion.p>
          <h2 className="text-balance font-display text-4xl italic leading-tight text-white sm:text-5xl lg:text-6xl">
            <SplitText text={featuredTalent.heading} />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-5 max-w-md text-lg text-white/60"
          >
            {featuredTalent.subhead}
          </motion.p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          <TalentCard item={first} index={0} />
          <TalentCard item={second} index={1} />
          <TalentCard item={third} index={2} />
        </div>
        <div className="mt-5">
          <TalentCard item={fourth} index={3} wide />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic strength={14}>
            <PremiumButton href="/talent">{featuredTalent.showTalentCta}</PremiumButton>
          </Magnetic>
          <Magnetic strength={14}>
            <PremiumButton href="/apply" variant="outline">
              {featuredTalent.applyCta}
            </PremiumButton>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
