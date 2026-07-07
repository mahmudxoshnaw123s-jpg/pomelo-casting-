import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import BrandPhoto from './BrandPhoto'
import Counter from './Counter'
import SplitText from './SplitText'
import aboutPhoto from '../assets/hero-crosswalk-purple.jpg'
import { about } from '../data/content'

const TOTAL_BEATS = 4
const FADE = 0.07

const particles = Array.from({ length: 14 }).map((_, i) => ({
  left: (i * 31 + 9) % 100,
  top: (i * 19 + 13) % 100,
  size: 2 + (i % 3),
  duration: 11 + (i % 5) * 2,
  delay: (i % 6) * 0.7,
}))

const [sentenceOne, sentenceTwo] = about.body.split(/(?<=\.)\s+/)

function interpolateClamped(value: number, input: number[], output: number[]) {
  if (value <= input[0]) return output[0]
  for (let i = 0; i < input.length - 1; i++) {
    if (value <= input[i + 1]) {
      const t = (value - input[i]) / (input[i + 1] - input[i])
      return output[i] + t * (output[i + 1] - output[i])
    }
  }
  return output[output.length - 1]
}

function beatRange(index: number) {
  const segment = 1 / TOTAL_BEATS
  const start = index * segment
  const end = start + segment
  const isFirst = index === 0
  const isLast = index === TOTAL_BEATS - 1
  const input = isFirst
    ? [0, 0.001, end - FADE, end]
    : isLast
      ? [start - FADE, start, 0.999, 1]
      : [start - FADE, start, end - FADE, end]
  return { input, isFirst, isLast, center: start + segment / 2, segment }
}

// Note: multiple useTransform(scrollYProgress, array, array) calls sharing the same
// scroll-linked MotionValue can hit Framer Motion's native scroll-acceleration fast path,
// which only supports one set of keyframes per source value and silently cross-contaminates
// the others. Using the function-transformer overload opts each beat out of that path.
function StoryBeat({ index, progress, children }: { index: number; progress: MotionValue<number>; children: ReactNode }) {
  const { input, isFirst, isLast } = beatRange(index)
  const opacityOut = isFirst ? [1, 1, 1, 0] : isLast ? [0, 1, 1, 1] : [0, 1, 1, 0]
  const yOut = isFirst ? [0, 0, 0, -18] : isLast ? [18, 0, 0, 0] : [18, 0, 0, -18]
  const opacity = useTransform(progress, (v) => interpolateClamped(v, input, opacityOut))
  const y = useTransform(progress, (v) => interpolateClamped(v, input, yOut))

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      {children}
    </motion.div>
  )
}

function RailDot({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const { center, segment } = beatRange(index)
  const input = [center - segment / 2, center, center + segment / 2]
  const scale = useTransform(progress, (v) => interpolateClamped(v, input, [0.55, 1, 0.55]))
  const opacity = useTransform(progress, (v) => interpolateClamped(v, input, [0.3, 1, 0.3]))
  return <motion.span style={{ scale, opacity }} className="block h-2 w-2 rounded-full bg-pomelo-blue" />
}

export default function AboutStory() {
  const wrapperRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ['start start', 'end end'] })

  const saturate = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 1])
  const brightness = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.05, 0.92])
  const photoFilter = useTransform([saturate, brightness], (latest) => {
    const [s, b] = latest as [number, number]
    return `saturate(${s}) brightness(${b})`
  })
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 45, damping: 20 })
  const sy = useSpring(my, { stiffness: 45, damping: 20 })
  const blobAX = useTransform(sx, [-0.5, 0.5], [-26, 26])
  const blobAY = useTransform(sy, [-0.5, 0.5], [-20, 20])
  const blobBX = useTransform(sx, [-0.5, 0.5], [24, -24])
  const blobBY = useTransform(sy, [-0.5, 0.5], [16, -16])
  const tiltX = useSpring(useTransform(sy, [-0.5, 0.5], [6, -6]), { stiffness: 160, damping: 18 })
  const tiltY = useSpring(useTransform(sx, [-0.5, 0.5], [-6, 6]), { stiffness: 160, damping: 18 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section id="about" ref={wrapperRef} className="relative h-[420vh] bg-gradient-to-b from-[#0b0713] via-[#130b21] to-[#0a0f1a]">
      <div
        onMouseMove={handleMouseMove}
        className="sticky top-0 flex h-screen items-center overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />

        <motion.div
          style={{ x: blobAX, y: blobAY }}
          className="pointer-events-none absolute -left-36 top-10 h-[26rem] w-[26rem] rounded-full bg-pomelo-purple/25 blur-[130px]"
          aria-hidden="true"
        />
        <motion.div
          style={{ x: blobBX, y: blobBY }}
          className="pointer-events-none absolute -right-36 bottom-10 h-[28rem] w-[28rem] rounded-full bg-pomelo-blue/15 blur-[130px]"
          aria-hidden="true"
        />

        <motion.div
          className="pointer-events-none absolute inset-y-0 w-[14%] -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent blur-md"
          animate={{ left: ['-30%', '120%'] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', repeatDelay: 4 }}
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {particles.map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-white/50"
              style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
              animate={{ y: [0, -28, 0], opacity: [0.15, 0.65, 0.15] }}
              transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
          <div style={{ perspective: 1200 }} className="relative isolate mx-auto w-full max-w-md">
            <motion.div
              className="absolute -inset-4 -z-10 rounded-[2.5rem] opacity-70 blur-xl"
              style={{ background: 'conic-gradient(from 180deg, #895193, #00b2e2, #895193)' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40"
            >
              <motion.div style={{ filter: photoFilter, scale: photoScale }} className="h-full w-full">
                <BrandPhoto src={aboutPhoto} alt="Models cast by Pomelo Casting" className="h-full w-full" />
              </motion.div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>
          </div>

          <div className="flex items-stretch gap-6">
            <div className="hidden flex-col items-center gap-4 pt-2 sm:flex">
              {Array.from({ length: TOTAL_BEATS }).map((_, i) => (
                <RailDot key={i} index={i} progress={scrollYProgress} />
              ))}
            </div>

            <div className="relative min-h-[22rem] flex-1 sm:min-h-[26rem]">
              <StoryBeat index={0} progress={scrollYProgress}>
                <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-pomelo-blue">
                  <span className="h-px w-8 bg-pomelo-blue" />
                  {about.label}
                </p>
                <h2 className="text-balance font-display text-3xl italic leading-[1.15] text-white sm:text-4xl lg:text-[2.75rem]">
                  <SplitText text={about.heading} />
                </h2>
              </StoryBeat>

              <StoryBeat index={1} progress={scrollYProgress}>
                <p className="text-balance font-display text-2xl italic leading-relaxed text-white/90 sm:text-3xl">
                  {sentenceOne}
                </p>
              </StoryBeat>

              <StoryBeat index={2} progress={scrollYProgress}>
                <p className="text-balance text-lg leading-relaxed text-white/70 sm:text-xl">{sentenceTwo}</p>
              </StoryBeat>

              <StoryBeat index={3} progress={scrollYProgress}>
                <dl className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                  {about.stats.map((stat, i) => (
                    <div key={stat.label} className="relative">
                      <dt className="sr-only">{stat.label}</dt>
                      <dd className="font-display text-3xl italic text-white sm:text-4xl">
                        <Counter value={stat.value} suffix={stat.suffix} />
                      </dd>
                      <p className="mt-1.5 text-sm text-white/60">{stat.label}</p>
                      <span
                        className="absolute -bottom-2 left-0 h-px w-8 bg-gradient-to-r from-pomelo-blue to-pomelo-purple"
                        style={{ transitionDelay: `${i * 0.1}s` }}
                      />
                    </div>
                  ))}
                </dl>
              </StoryBeat>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
