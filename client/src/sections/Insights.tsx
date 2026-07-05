import { motion } from 'framer-motion'
import AuthorAvatar from '../components/AuthorAvatar'
import BlogCard from '../components/BlogCard'
import BrandPhoto from '../components/BrandPhoto'
import CategoryBadge from '../components/CategoryBadge'
import Reveal from '../components/Reveal'
import { insights } from '../data/content'
import heroCrosswalkBlue from '../assets/hero-crosswalk-blue.jpg'
import heroCrosswalkPurple from '../assets/hero-crosswalk-purple.jpg'
import workCastingCall from '../assets/work-casting-call.jpg'
import workPressFeature from '../assets/work-press-feature.jpg'
import workOnSet from '../assets/work-on-set.jpg'
import workBehindScenes from '../assets/work-behind-scenes.jpg'

const images: Record<string, string> = {
  'hero-crosswalk-blue.jpg': heroCrosswalkBlue,
  'hero-crosswalk-purple.jpg': heroCrosswalkPurple,
  'work-casting-call.jpg': workCastingCall,
  'work-press-feature.jpg': workPressFeature,
  'work-on-set.jpg': workOnSet,
  'work-behind-scenes.jpg': workBehindScenes,
}

export default function Insights() {
  const { featured } = insights

  return (
    <section id="insights" className="relative overflow-hidden bg-base-soft py-28 sm:py-36">
      <span
        className="pointer-events-none absolute -right-10 bottom-0 select-none text-[11rem] font-extrabold leading-none text-pomelo-purple/10 sm:text-[16rem]"
        aria-hidden="true"
      >
        04
      </span>

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 max-w-2xl">
          <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-pomelo-blue">
            <span className="h-px w-8 bg-pomelo-blue" />
            {insights.label}
          </p>
          <h2 className="text-balance text-3xl font-bold leading-tight text-ink sm:text-4xl">{insights.heading}</h2>
          <p className="mt-5 text-lg text-ink-soft">{insights.subhead}</p>
        </Reveal>

        <Reveal>
          <motion.article
            whileHover="hover"
            className="group grid overflow-hidden rounded-3xl border border-line bg-base transition-colors hover:border-pomelo-blue/40 lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
              <motion.div
                variants={{ hover: { scale: 1.05 } }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <BrandPhoto src={images[featured.image]} alt="" className="h-full w-full" priority />
              </motion.div>
              <CategoryBadge className="absolute left-5 top-5">{featured.category}</CategoryBadge>
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-pomelo-blue">Featured</span>
              <h3 className="mt-3 text-2xl font-bold leading-tight text-ink sm:text-3xl">{featured.title}</h3>
              <p className="mt-4 text-ink-soft">{featured.excerpt}</p>

              <div className="mt-8 flex items-center gap-3">
                <AuthorAvatar name={featured.author} className="h-10 w-10 text-sm" />
                <div>
                  <p className="text-sm font-semibold text-ink">{featured.author}</p>
                  <p className="text-xs text-ink-soft">
                    {featured.date} · {featured.readTime}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="mt-8 flex w-fit items-center gap-2 rounded-full bg-pomelo-blue px-6 py-3 text-sm font-semibold text-[var(--color-on-accent)] transition-transform group-hover:scale-[1.03]"
              >
                Read article
                <motion.span variants={{ hover: { x: 4 } }} transition={{ duration: 0.25 }}>
                  →
                </motion.span>
              </button>
            </div>
          </motion.article>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {insights.posts.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.05}>
              <BlogCard
                title={post.title}
                excerpt={post.excerpt}
                category={post.category}
                author={post.author}
                date={post.date}
                readTime={post.readTime}
                image={images[post.image]}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
