import { motion } from 'framer-motion'
import AuthorAvatar from './AuthorAvatar'
import BrandPhoto from './BrandPhoto'
import CategoryBadge from './CategoryBadge'

interface BlogCardProps {
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
}

export default function BlogCard({ title, excerpt, category, author, date, readTime, image }: BlogCardProps) {
  return (
    <motion.article whileHover="hover" className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-base-soft/60 transition-colors hover:border-pomelo-blue/40">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <motion.div variants={{ hover: { scale: 1.06 } }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0">
          <BrandPhoto src={image} alt="" className="h-full w-full" />
        </motion.div>
        <CategoryBadge className="absolute left-4 top-4">{category}</CategoryBadge>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-soft/70">
          {date} · {readTime}
        </p>
        <h3 className="mt-2 text-lg font-bold leading-snug text-ink">{title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-ink-soft">{excerpt}</p>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <div className="flex items-center gap-2">
            <AuthorAvatar name={author} className="h-7 w-7" />
            <span className="text-xs font-medium text-ink-soft">{author}</span>
          </div>

          <button
            type="button"
            className="flex items-center gap-1 text-sm font-semibold text-pomelo-blue"
          >
            Read more
            <motion.span variants={{ hover: { x: 4 } }} transition={{ duration: 0.25 }}>
              →
            </motion.span>
          </button>
        </div>
      </div>
    </motion.article>
  )
}
