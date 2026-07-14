import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Magnetic from './Magnetic'
import PremiumButton from './PremiumButton'
import SplitText from './SplitText'
import { featuredTalent } from '../data/content'
import { images } from '../data/images'
import { fetchModels } from '../lib/models'

interface TalentCardData {
  src: string
  caption: string
  tag: string
}

// Placeholder talent used before any featured models are uploaded (keeps the section full).
const fallbackCards: TalentCardData[] = featuredTalent.images.map((item) => ({
  src: images[item.image],
  caption: item.caption,
  tag: item.tag,
}))

// Clean staggered rhythm — each column sits at a different height, like an editorial spread.
const STAGGER = [
  { mt: 'lg:mt-16', aspect: 'aspect-[3/4]' },
  { mt: 'lg:mt-0', aspect: 'aspect-[2/3]' },
  { mt: 'lg:mt-24', aspect: 'aspect-[3/4]' },
  { mt: 'lg:mt-8', aspect: 'aspect-[2/3]' },
]

function Portrait({ item, index }: { item: TalentCardData; index: number }) {
  const layout = STAGGER[index % STAGGER.length]
  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group ${layout.mt}`}
    >
      <div className={`relative ${layout.aspect} w-full overflow-hidden rounded-xl`}>
        <img
          src={item.src}
          alt={item.caption}
          loading="lazy"
          className="h-full w-full object-cover grayscale transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:scale-[1.04] group-hover:grayscale-0"
          style={{ objectPosition: 'center 15%' }}
        />
      </div>
      <figcaption className="mt-4">
        <p className="font-display text-xl italic leading-tight text-white">{item.caption}</p>
        <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/40">{item.tag}</p>
      </figcaption>
    </motion.figure>
  )
}

export default function FeaturedTalent() {
  const [cards, setCards] = useState<TalentCardData[]>(fallbackCards)

  useEffect(() => {
    let active = true
    fetchModels(true)
      .then((models) => {
        if (!active) return
        const modelCards: TalentCardData[] = models
          .filter((m) => m.images.length > 0)
          .map((m) => ({ src: m.images[0].url, caption: m.firstName, tag: 'Pomelo Talent' }))
        if (modelCards.length === 0) return
        setCards([...modelCards, ...fallbackCards].slice(0, 4))
      })
      .catch(() => {
        /* keep placeholders before Firebase is configured */
      })
    return () => {
      active = false
    }
  }, [])

  const list = cards.slice(0, 4)

  return (
    <section aria-label="Featured talent" className="relative isolate overflow-hidden bg-[#0a0f1a] py-28 sm:py-36">
      {/* one soft, calm glow for depth — no grid or particles, so the photos lead */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[60rem] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] opacity-40 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse at center, rgba(137,81,147,0.35), rgba(0,178,226,0.12) 50%, transparent 72%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[88rem] px-6">
        <div className="mx-auto max-w-2xl text-center">
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

        <div className="mt-16 grid grid-cols-2 gap-6 sm:gap-8 lg:mt-20 lg:flex lg:items-start lg:gap-8">
          {list.map((item, i) => (
            <div key={`${item.caption}-${i}`} className="lg:flex-1">
              <Portrait item={item} index={i} />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-4"
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
