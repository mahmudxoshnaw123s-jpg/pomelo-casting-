import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, Navigate, useParams } from 'react-router-dom'
import Magnetic from '../components/Magnetic'
import PremiumButton from '../components/PremiumButton'
import ServiceHero from '../components/ServiceHero'
import SplitText from '../components/SplitText'
import { services } from '../data/content'
import { serviceVisuals } from '../data/serviceVisuals'

const glowConic =
  'conic-gradient(from 0deg, transparent 0%, #00b2e2 12%, transparent 28%, #895193 50%, transparent 68%, #00b2e2 86%, transparent 100%)'

function SectionSeam() {
  return (
    <div className="relative h-px w-full overflow-hidden bg-line">
      <motion.div
        className="h-full w-1/4 bg-gradient-to-r from-transparent via-pomelo-blue to-transparent"
        animate={{ x: ['-100%', '500%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
      />
    </div>
  )
}

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const service = services.items.find((item) => item.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!service) {
    return <Navigate to="/" replace />
  }

  const meta = serviceVisuals[service.icon as keyof typeof serviceVisuals]
  const otherServices = services.items.filter((item) => item.slug !== slug)

  return (
    <>
      <ServiceHero
        service={service}
        kicker={meta.kicker}
        heroImage={meta.image}
        imageAlt={meta.imageAlt}
        imageObjectPosition={meta.imageObjectPosition}
        Scene={meta.Scene}
        pillLabel={meta.pillLabel}
        reverse={meta.reverse}
        textInBox
        dimBackground
        spotlightOnBox
        defaultExpanded
      />

      <SectionSeam />

      <section className="relative overflow-hidden bg-base py-24">
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pomelo-purple/10 blur-[120px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-pomelo-blue">
            <span className="h-px w-8 bg-pomelo-blue" />
            Explore more
            <span className="h-px w-8 bg-pomelo-blue" />
          </p>
          <h3 className="text-balance font-display text-3xl italic leading-tight text-ink sm:text-4xl">
            <SplitText text="The other ways we cast." />
          </h3>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {otherServices.map((item) => {
              const otherMeta = serviceVisuals[item.icon as keyof typeof serviceVisuals]
              const Badge = otherMeta.Badge
              return (
                <Magnetic key={item.slug} strength={12}>
                  <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.25 }}>
                    <Link
                      to={`/services/${item.slug}`}
                      className="group inline-flex items-center gap-2.5 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink shadow-sm transition-all duration-300 hover:border-pomelo-blue hover:text-pomelo-blue hover:shadow-lg hover:shadow-pomelo-blue/15"
                    >
                      <Badge className="h-4 w-4 opacity-70 transition-opacity group-hover:opacity-100" />
                      {item.title}
                      <motion.span
                        className="inline-block"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                </Magnetic>
              )
            })}
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden bg-base-soft px-6 py-24">
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pomelo-blue/10 blur-[120px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative isolate mx-auto max-w-3xl overflow-hidden rounded-[2rem] p-px"
        >
          <motion.div
            className="absolute inset-[-30%] -z-10"
            style={{ background: glowConic }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
          <div className="relative flex flex-col items-center gap-6 rounded-[calc(2rem-1px)] bg-surface px-8 py-14 text-center backdrop-blur-xl">
            <h3 className="text-balance font-display text-4xl italic leading-tight text-ink sm:text-5xl">
              <SplitText text="Ready to begin casting?" />
            </h3>
            <Magnetic strength={16}>
              <PremiumButton href="#contact">Start a project</PremiumButton>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </>
  )
}
