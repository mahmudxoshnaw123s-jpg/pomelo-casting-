import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import BrandPhoto from '../components/BrandPhoto'
import aboutPhoto from '../assets/hero-crosswalk-purple.jpg'
import Counter from '../components/Counter'
import Reveal from '../components/Reveal'
import { about } from '../data/content'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const artY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="about" ref={ref} className="relative bg-base py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
        <Reveal>
          <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-pomelo-blue">
            <span className="h-px w-8 bg-pomelo-blue" />
            {about.label}
          </p>
          <h2 className="text-balance text-3xl font-bold leading-tight text-ink sm:text-4xl">
            {about.heading}
          </h2>
          <p className="mt-6 text-lg text-ink-soft">{about.body}</p>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-8">
            {about.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-3xl font-extrabold text-pomelo-blue sm:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dd>
                <p className="mt-1 text-sm text-ink-soft">{stat.label}</p>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.15}>
          <motion.div
            style={{ y: artY }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-[-10px_10px_0_0_var(--color-pomelo-purple)]"
          >
            <BrandPhoto src={aboutPhoto} alt="Models cast by Pomelo Casting" className="h-full w-full" />
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
