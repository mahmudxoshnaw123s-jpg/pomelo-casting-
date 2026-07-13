import { motion, useAnimationFrame, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import AuthorAvatar from './AuthorAvatar'
import BrandPhoto from './BrandPhoto'
import PremiumButton from './PremiumButton'
import SplitText from './SplitText'
import { insights } from '../data/content'
import { images } from '../data/images'
import { fetchPosts } from '../lib/posts'

interface DisplayPost {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
}

// Current hard-coded articles, used until posts are published from the admin panel.
const fallbackCover: DisplayPost = {
  id: 'fallback-cover',
  ...insights.featured,
  image: images[insights.featured.image],
}
const fallbackList: DisplayPost[] = insights.posts.map((post, i) => ({
  id: `fallback-${i}`,
  title: post.title,
  excerpt: post.excerpt,
  category: post.category,
  author: post.author,
  date: post.date,
  readTime: post.readTime,
  image: images[post.image],
}))

const particles = Array.from({ length: 16 }).map((_, i) => ({
  left: (i * 33 + 13) % 100,
  top: (i * 21 + 9) % 100,
  size: 2 + (i % 3),
  duration: 11 + (i % 5) * 2,
  delay: (i % 6) * 0.75,
}))

export default function InsightsEditorial() {
  const [cover, setCover] = useState<DisplayPost>(fallbackCover)
  const [list, setList] = useState<DisplayPost[]>(fallbackList)

  useEffect(() => {
    let active = true
    fetchPosts(false)
      .then((posts) => {
        if (!active || posts.length === 0) return
        const withImages = posts.filter((p) => p.image)
        if (withImages.length === 0) return
        const featured = withImages.find((p) => p.featured) ?? withImages[0]
        const toDisplay = (p: (typeof withImages)[number]): DisplayPost => ({
          id: p.id,
          title: p.title,
          excerpt: p.excerpt,
          category: p.category,
          author: p.author,
          date: p.date,
          readTime: p.readTime,
          image: p.image!.url,
        })
        setCover(toDisplay(featured))
        setList(withImages.filter((p) => p.id !== featured.id).map(toDisplay))
      })
      .catch(() => {
        /* keep the fallback articles before Firebase is configured */
      })
    return () => {
      active = false
    }
  }, [])

  const coverRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ['start start', 'end start'] })
  const coverImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const coverImageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const coverTextOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Plain useSpring(motionValue, config) can reset mid-animation when the host component
  // re-renders frequently (attachFollow's effect keys off a JSON.stringify'd config and can
  // re-attach), which happens here on every row hover. A manual per-frame lerp sidesteps that
  // entirely since it doesn't depend on React's render cycle at all.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useMotionValue(0)
  const sy = useMotionValue(0)
  const blobX = useTransform(sx, [-0.5, 0.5], [-24, 24])
  const blobY = useTransform(sy, [-0.5, 0.5], [-18, 18])

  const handleAmbientMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  useAnimationFrame(() => {
    sx.set(sx.get() + (mx.get() - sx.get()) * 0.08)
    sy.set(sy.get() + (my.get() - sy.get()) * 0.08)
  })

  return (
    <section
      id="insights"
      onMouseMove={handleAmbientMove}
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#0b0713] via-[#130b21] to-[#0a0f1a]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />
      <motion.div
        style={{ x: blobX, y: blobY }}
        className="pointer-events-none absolute -left-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-pomelo-purple/25 blur-[130px]"
        aria-hidden="true"
      />
      <motion.div
        style={{ x: useTransform(sx, [-0.5, 0.5], [20, -20]), y: useTransform(sy, [-0.5, 0.5], [14, -14]) }}
        className="pointer-events-none absolute -right-40 bottom-1/4 h-[32rem] w-[32rem] rounded-full bg-pomelo-blue/15 blur-[130px]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/50"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -30, 0], opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}
      </div>

      <div ref={coverRef} className="relative z-10 flex min-h-[100svh] items-end overflow-hidden pt-32">
        <motion.div style={{ scale: coverImageScale, y: coverImageY }} className="absolute inset-0 -z-10">
          <BrandPhoto src={cover.image} alt="" className="h-full w-full" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-black/50 to-black/20" />
        </motion.div>

        <motion.div style={{ opacity: coverTextOpacity }} className="relative mx-auto w-full max-w-6xl px-6 pb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-pomelo-blue"
          >
            <span className="h-px w-8 bg-pomelo-blue" />
            {insights.label}
          </motion.p>

          <h1 className="max-w-3xl text-balance font-display text-4xl italic leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            <SplitText key={cover.id} text={cover.title} delay={0.35} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-6 max-w-xl text-lg text-white/70"
          >
            {cover.excerpt}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="mt-8 flex flex-wrap items-center gap-6"
          >
            <div className="flex items-center gap-3">
              <AuthorAvatar name={cover.author} className="h-10 w-10 text-sm" />
              <div>
                <p className="text-sm font-semibold text-white">{cover.author}</p>
                <p className="text-xs text-white/50">
                  {cover.date} · {cover.readTime}
                </p>
              </div>
            </div>
            <PremiumButton>Read the story</PremiumButton>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-28 sm:py-36">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-pomelo-blue"
        >
          <span className="h-px w-8 bg-pomelo-blue" />
          Contents
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 max-w-xl text-balance font-display text-2xl italic text-white/80 sm:text-3xl"
        >
          {insights.subhead}
        </motion.h2>

        <div className="relative divide-y divide-white/10 border-y border-white/10">
          {list.map((post, i) => (
            <motion.a
              key={post.id}
              href="#insights"
              onClick={(e) => e.preventDefault()}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex items-center gap-5 py-6 sm:gap-8 sm:py-8"
            >
              <span className="relative h-7 w-9 shrink-0 font-display text-lg italic text-white/40 transition-colors duration-300 group-hover:text-pomelo-blue sm:text-xl">
                <span className="absolute inset-0 transition-all duration-300 group-hover:-translate-y-2 group-hover:opacity-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  className="absolute inset-0 h-5 w-5 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>

              <div className="min-w-0 flex-1 transition-transform duration-300 group-hover:translate-x-2">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-pomelo-blue/80">{post.category}</p>
                <h3 className="mt-1 text-balance font-display text-xl italic leading-snug text-white sm:text-2xl">
                  {post.title}
                </h3>
                <p className="mt-2 hidden max-w-xl text-sm text-white/55 sm:line-clamp-1 sm:block">{post.excerpt}</p>
              </div>

              <div className="hidden shrink-0 items-center gap-3 text-right sm:flex">
                <div>
                  <p className="text-xs font-medium text-white/70">{post.author}</p>
                  <p className="text-[0.7rem] text-white/40">{post.date}</p>
                </div>
              </div>

              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl sm:hidden">
                <BrandPhoto src={post.image} alt="" className="h-full w-full" />
              </div>

              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-pomelo-blue to-pomelo-purple transition-transform duration-500 group-hover:scale-x-100" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
