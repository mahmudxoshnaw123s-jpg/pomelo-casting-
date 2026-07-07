import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { memo, useState } from 'react'
import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { services } from '../data/content'
import { serviceVisuals } from '../data/serviceVisuals'
import { IconArrowRight } from './icons'
import Magnetic from './Magnetic'
import PremiumButton from './PremiumButton'
import SplitText from './SplitText'

const MotionLink = motion.create(Link)

const glowConic =
  'conic-gradient(from 0deg, transparent 0%, #00b2e2 12%, transparent 28%, #895193 50%, transparent 68%, #00b2e2 86%, transparent 100%)'

// cross layout around the hub, in % of the diagram box
const NODE_POSITIONS = [
  { x: 50, y: 8 },
  { x: 92, y: 50 },
  { x: 50, y: 92 },
  { x: 8, y: 50 },
]

interface Node {
  slug: string
  title: string
  description: string
  icon: keyof typeof serviceVisuals
}

const ServiceNode = memo(function ServiceNode({
  node,
  pos,
  active,
  onEnter,
  onLeave,
}: {
  node: Node
  pos: { x: number; y: number }
  active: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  const meta = serviceVisuals[node.icon]
  const Badge = meta.Badge

  return (
    <MotionLink
      to={`/services/${node.slug}`}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onMouseLeave={onLeave}
      onBlur={onLeave}
      animate={{ opacity: active ? 1 : 0.45, scale: active ? 1.06 : 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group absolute z-10 flex w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 sm:w-32"
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
    >
      <span className="relative isolate flex h-16 w-16 items-center justify-center rounded-full p-px sm:h-20 sm:w-20">
        <AnimatePresence>
          {active && (
            <motion.span
              className="absolute inset-0 -z-10 rounded-full"
              style={{ background: glowConic }}
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 0.3 }, rotate: { duration: 4, repeat: Infinity, ease: 'linear' } }}
            />
          )}
        </AnimatePresence>
        <span className="flex h-full w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white backdrop-blur-xl transition-colors duration-300 group-hover:border-pomelo-blue/40">
          <Badge className="h-6 w-6 sm:h-7 sm:w-7" />
        </span>
      </span>
      <span className="text-balance text-center text-xs font-semibold uppercase tracking-widest text-white/80 sm:text-sm">
        {node.title}
      </span>
    </MotionLink>
  )
})

function Diagram({
  nodes,
  activeIndex,
  setActiveIndex,
}: {
  nodes: Node[]
  activeIndex: number | null
  setActiveIndex: (i: number | null) => void
}) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem] sm:max-w-[32rem]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        {NODE_POSITIONS.map((pos, i) => {
          const isActive = activeIndex === i
          return (
            <motion.line
              key={i}
              x1="50"
              y1="50"
              x2={pos.x}
              y2={pos.y}
              strokeWidth={isActive ? 0.6 : 0.35}
              strokeDasharray="1.5 3"
              animate={{
                stroke: isActive ? '#00b2e2' : 'rgba(255,255,255,0.25)',
                strokeDashoffset: [0, -8],
              }}
              transition={{
                stroke: { duration: 0.3 },
                strokeDashoffset: { duration: 1.4, repeat: Infinity, ease: 'linear' },
              }}
            />
          )
        })}
      </svg>

      <motion.div
        className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:h-28 sm:w-28"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 rounded-full bg-pomelo-blue/20 blur-2xl" />
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-0.5 rounded-full border border-white/15 bg-white/[0.06] text-center backdrop-blur-xl">
          <span className="font-display text-lg italic text-white sm:text-xl">Pomelo</span>
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/50">Casting</span>
        </div>
      </motion.div>

      {nodes.map((node, i) => (
        <ServiceNode
          key={node.slug}
          node={node}
          pos={NODE_POSITIONS[i]}
          active={activeIndex === null || activeIndex === i}
          onEnter={() => setActiveIndex(i)}
          onLeave={() => setActiveIndex(null)}
        />
      ))}
    </div>
  )
}

function MobileStops({
  nodes,
  activeIndex,
  setActiveIndex,
}: {
  nodes: Node[]
  activeIndex: number | null
  setActiveIndex: (i: number | null) => void
}) {
  return (
    <div className="relative mx-auto flex max-w-xs flex-col items-center gap-10 py-4">
      <div className="absolute left-1/2 top-6 bottom-6 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      {nodes.map((node, i) => {
        const meta = serviceVisuals[node.icon]
        const Badge = meta.Badge
        const active = activeIndex === null || activeIndex === i
        return (
          <MotionLink
            key={node.slug}
            to={`/services/${node.slug}`}
            onTouchStart={() => setActiveIndex(i)}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            animate={{ opacity: active ? 1 : 0.45 }}
            transition={{ duration: 0.4 }}
            className="group relative z-10 flex flex-col items-center gap-2"
          >
            <span className="relative isolate flex h-16 w-16 items-center justify-center rounded-full p-px">
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.span
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{ background: glowConic }}
                    initial={{ opacity: 0, rotate: 0 }}
                    animate={{ opacity: 1, rotate: 360 }}
                    exit={{ opacity: 0 }}
                    transition={{ opacity: { duration: 0.3 }, rotate: { duration: 4, repeat: Infinity, ease: 'linear' } }}
                  />
                )}
              </AnimatePresence>
              <span className="flex h-full w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white backdrop-blur-xl">
                <Badge className="h-6 w-6" />
              </span>
            </span>
            <span className="text-center text-xs font-semibold uppercase tracking-widest text-white/80">{node.title}</span>
          </MotionLink>
        )
      })}
    </div>
  )
}

function DetailPanel({ node }: { node: Node }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={node.slug}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative isolate mx-auto max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-center backdrop-blur-xl sm:p-8"
      >
        <h3 className="text-balance font-display text-xl italic text-white sm:text-2xl">{node.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/65">{node.description}</p>
        <Link
          to={`/services/${node.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-pomelo-blue transition-colors hover:text-white"
        >
          View discipline
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </AnimatePresence>
  )
}

export default function ServicesConstellation() {
  const nodes: Node[] = services.items.map((item) => ({
    slug: item.slug,
    title: item.title,
    description: item.description,
    icon: item.icon as keyof typeof serviceVisuals,
  }))

  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const shown = activeIndex ?? 0

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 20 })
  const sy = useSpring(my, { stiffness: 40, damping: 20 })
  const blobX = useTransform(sx, [-0.5, 0.5], [-20, 20])
  const blobY = useTransform(sy, [-0.5, 0.5], [-16, 16])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section
      id="services"
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
      />
      <motion.div
        style={{ x: blobX, y: blobY }}
        className="pointer-events-none absolute -left-40 top-1/4 h-[28rem] w-[28rem] rounded-full bg-pomelo-purple/25 blur-[130px]"
      />
      <motion.div
        style={{ x: blobX, y: blobY }}
        className="pointer-events-none absolute -right-40 bottom-1/4 h-[30rem] w-[30rem] rounded-full bg-pomelo-blue/15 blur-[130px]"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-5 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-pomelo-blue"
        >
          <span className="h-px w-8 bg-pomelo-blue" />
          {services.label}
          <span className="h-px w-8 bg-pomelo-blue" />
        </motion.p>

        <h2 className="text-balance font-display text-4xl italic leading-tight text-white sm:text-5xl lg:text-6xl">
          <SplitText text="The craft behind" />
          <br />
          <SplitText text="every casting call." delay={0.3} />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 max-w-md text-lg text-white/60"
        >
          {services.subhead}
        </motion.p>

        <div className="mt-16 hidden sm:block">
          <Diagram nodes={nodes} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        </div>
        <div className="mt-12 sm:hidden">
          <MobileStops nodes={nodes} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        </div>

        <div className="mt-14">
          <DetailPanel node={nodes[shown]} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-16 flex justify-center"
        >
          <Magnetic strength={16}>
            <PremiumButton href="#contact">Start a project</PremiumButton>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
