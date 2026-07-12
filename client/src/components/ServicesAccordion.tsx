import { motion } from 'framer-motion'
import Magnetic from './Magnetic'
import PremiumButton from './PremiumButton'
import ServicesHorizontalAccordion from './ServicesHorizontalAccordion'
import ServicesVerticalAccordion from './ServicesVerticalAccordion'
import SplitText from './SplitText'
import { services } from '../data/content'

export default function ServicesAccordion() {
  return (
    <section id="services" className="relative isolate overflow-hidden bg-[#0b0b0d] py-28 sm:py-36">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-5 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-white/45"
        >
          <span className="h-px w-8 bg-white/25" />
          {services.label}
          <span className="h-px w-8 bg-white/25" />
        </motion.p>

        <h2 className="text-balance font-display text-4xl italic leading-tight text-white sm:text-5xl">
          <SplitText text={services.heading} />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 max-w-md text-lg text-white/55"
        >
          {services.subhead}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-20"
      >
        <div className="hidden lg:block">
          <ServicesHorizontalAccordion />
        </div>
        <div className="lg:hidden">
          <ServicesVerticalAccordion />
        </div>

        <div className="mt-12 flex justify-center px-6">
          <Magnetic strength={16}>
            <PremiumButton href="#contact" variant="outline">
              Start a project
            </PremiumButton>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  )
}
