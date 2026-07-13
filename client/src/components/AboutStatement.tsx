import { motion } from 'framer-motion'
import Counter from './Counter'
import aboutPageOne from '../assets/about page.png'
import aboutPageTwo from '../assets/about page 2.png'
import { about } from '../data/content'

const ease = [0.16, 1, 0.3, 1] as const

interface PhoneMockupProps {
  src: string
  alt: string
  tilt: number
  delay: number
  floatDelay: number
  className?: string
}

function PhoneMockup({ src, alt, tilt, delay, floatDelay, className = '' }: PhoneMockupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease, delay }}
      className={className}
    >
      <motion.div
        animate={{ rotate: tilt, y: [0, -14, 0] }}
        whileHover={{ rotate: 0, scale: 1.04 }}
        transition={{
          rotate: { duration: 0.6, ease },
          scale: { duration: 0.4, ease },
          y: { duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: floatDelay },
        }}
        className="relative w-full max-w-[15rem] rounded-[2.75rem] border border-white/10 bg-[#111116] p-2.5 shadow-2xl shadow-black/60 sm:max-w-[17rem]"
      >
        <span className="absolute -left-[2px] top-24 h-8 w-[3px] rounded-l-full bg-[#111116]" aria-hidden="true" />
        <span className="absolute -left-[2px] top-36 h-12 w-[3px] rounded-l-full bg-[#111116]" aria-hidden="true" />
        <span className="absolute -right-[2px] top-32 h-14 w-[3px] rounded-r-full bg-[#111116]" aria-hidden="true" />

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.1rem] bg-black">
          <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute left-1/2 top-2.5 h-5 w-20 -translate-x-1/2 rounded-full bg-[#111116]" aria-hidden="true" />
          <div className="absolute bottom-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-white/40" aria-hidden="true" />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function AboutStatement() {
  return (
    <section id="about" className="relative isolate overflow-hidden bg-[#0a0f1a] py-24 sm:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-[10%] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-pomelo-purple/25 to-pomelo-blue/20 blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-3xl items-center justify-center gap-5 px-6 sm:gap-10">
        <PhoneMockup
          src={aboutPageOne}
          alt="Pomelo Casting — Not just faces, we cast presence"
          tilt={-7}
          delay={0}
          floatDelay={0}
          className="mt-12 sm:mt-16"
        />
        <PhoneMockup
          src={aboutPageTwo}
          alt="Pomelo Casting — We don't show, we select"
          tilt={6}
          delay={0.15}
          floatDelay={1.1}
        />
      </div>

      <div className="relative mx-auto mt-20 max-w-2xl px-6 text-center sm:mt-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-lg leading-relaxed text-white/60"
        >
          {about.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-14 gap-y-8"
        >
          {about.stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-4xl italic text-white sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/50">{stat.label}</p>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.12, ease }}
                style={{ transformOrigin: 'center' }}
                className="mx-auto mt-3 block h-px w-8 bg-gradient-to-r from-pomelo-blue to-pomelo-purple"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
