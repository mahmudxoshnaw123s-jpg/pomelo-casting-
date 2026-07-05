import { motion } from 'framer-motion'
import { useRef } from 'react'
import BrandPhoto from '../components/BrandPhoto'
import Reveal from '../components/Reveal'
import { work } from '../data/content'
import castingCall from '../assets/work-casting-call.jpg'
import pressFeature from '../assets/work-press-feature.jpg'
import onSet from '../assets/work-on-set.jpg'
import behindScenes from '../assets/work-behind-scenes.jpg'

const images: Record<string, string> = {
  'work-casting-call.jpg': castingCall,
  'work-press-feature.jpg': pressFeature,
  'work-on-set.jpg': onSet,
  'work-behind-scenes.jpg': behindScenes,
}

export default function Work() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollBy = (amount: number) => {
    scrollerRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section id="work" className="relative bg-base py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-pomelo-blue">
              <span className="h-px w-8 bg-pomelo-blue" />
              {work.label}
            </p>
            <h2 className="text-balance text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {work.heading}
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-360)}
              aria-label="Scroll work gallery left"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-pomelo-blue hover:text-pomelo-blue"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy(360)}
              aria-label="Scroll work gallery right"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-pomelo-blue hover:text-pomelo-blue"
            >
              →
            </button>
          </div>
        </Reveal>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="shrink-0 basis-[calc((100vw-72rem)/2-1.5rem)] max-lg:hidden" aria-hidden="true" />

        {work.items.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.06} y={0} className="shrink-0 snap-start">
            <div className="w-[260px] sm:w-[300px]">
              <motion.div
                whileHover="hover"
                className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
              >
                <motion.div
                  variants={{ hover: { scale: 1.06 } }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <BrandPhoto src={images[project.image]} alt={project.title} className="h-full w-full" />
                </motion.div>

                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-on-accent)]/60 text-sm font-bold text-white backdrop-blur-sm">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </motion.div>

              <div className="mt-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-pomelo-blue">
                  {project.tag}
                </span>
                <h3 className="mt-1 text-lg font-bold text-ink">{project.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{project.description}</p>
              </div>
            </div>
          </Reveal>
        ))}

        <div className="shrink-0 basis-6" aria-hidden="true" />
      </div>
    </section>
  )
}
