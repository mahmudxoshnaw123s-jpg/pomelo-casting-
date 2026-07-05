import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import { services } from '../data/content'

export default function Services() {
  return (
    <section id="services" className="relative bg-base py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-16">
          <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-pomelo-blue">
            <span className="h-px w-8 bg-pomelo-blue" />
            {services.label}
          </p>
          <h2 className="text-balance text-3xl font-bold leading-tight text-ink sm:text-4xl">
            {services.heading}
          </h2>
        </Reveal>

        <div className="border-t border-line">
          {services.items.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.06}>
              <motion.div
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="relative grid grid-cols-[3rem_1fr] items-start gap-4 overflow-hidden border-b border-line py-8 sm:grid-cols-[5rem_1fr_1.4fr] sm:items-center sm:gap-8"
              >
                <motion.div
                  variants={{ rest: { x: '-100%' }, hover: { x: '0%' } }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 -z-10 bg-base-soft"
                />

                <span className="text-lg font-bold text-pomelo-blue sm:text-xl">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <motion.h3
                  variants={{ rest: { x: 0 }, hover: { x: 12 } }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-2xl font-bold text-ink sm:text-3xl"
                >
                  {service.title}
                </motion.h3>

                <p className="col-span-2 text-ink-soft sm:col-span-1 sm:col-start-3 sm:row-start-1">
                  {service.description}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
