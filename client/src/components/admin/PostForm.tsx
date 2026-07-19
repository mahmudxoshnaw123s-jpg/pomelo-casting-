import { useState } from 'react'
import type { FormEvent } from 'react'
import PhotoDropzone from '../PhotoDropzone'
import { fieldClass } from './adminStyles'
import type { Post } from '../../lib/posts'

const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/60'

interface PostFormProps {
  mode: 'create' | 'edit'
  initial?: Post
  submitting: boolean
  error?: string
  onSubmit: (formData: FormData) => void | Promise<void>
  onCancel?: () => void
}

export default function PostForm({ mode, initial, submitting, error, onSubmit, onCancel }: PostFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? '')
  const [category, setCategory] = useState(initial?.category ?? '')
  const [author, setAuthor] = useState(initial?.author ?? '')
  const [date, setDate] = useState(initial?.date ?? '')
  const [readTime, setReadTime] = useState(initial?.readTime ?? '')
  const [featured, setFeatured] = useState(initial?.featured ?? false)
  const existingImage = initial?.image ?? null
  const [removeImage, setRemoveImage] = useState(false)
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [localError, setLocalError] = useState('')

  const hasImage = (existingImage && !removeImage) || newFiles.length > 0

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !excerpt.trim() || !category.trim() || !author.trim() || !date.trim() || !readTime.trim()) {
      setLocalError('Please fill in every field.')
      return
    }
    if (!hasImage) {
      setLocalError('A cover image is required.')
      return
    }
    setLocalError('')

    const formData = new FormData()
    formData.append('title', title.trim())
    formData.append('excerpt', excerpt.trim())
    formData.append('category', category.trim())
    formData.append('author', author.trim())
    formData.append('date', date.trim())
    formData.append('readTime', readTime.trim())
    formData.append('featured', String(featured))
    if (newFiles[0]) formData.append('image', newFiles[0])
    else if (removeImage) formData.append('removeImage', 'true')

    void onSubmit(formData)
  }

  const shownError = localError || error

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={labelClass} htmlFor="pf-title">
          Title
        </label>
        <input id="pf-title" value={title} onChange={(e) => setTitle(e.target.value)} className={fieldClass} placeholder="5 Things to Prepare…" maxLength={160} />
      </div>

      <div>
        <label className={labelClass} htmlFor="pf-excerpt">
          Excerpt
        </label>
        <textarea
          id="pf-excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          className={`${fieldClass} resize-y`}
          placeholder="A short summary shown on the card…"
          maxLength={400}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="pf-category">
            Category
          </label>
          <input id="pf-category" value={category} onChange={(e) => setCategory(e.target.value)} className={fieldClass} placeholder="For Talent" maxLength={60} />
        </div>
        <div>
          <label className={labelClass} htmlFor="pf-author">
            Author
          </label>
          <input id="pf-author" value={author} onChange={(e) => setAuthor(e.target.value)} className={fieldClass} placeholder="Pomelo Team" maxLength={80} />
        </div>
        <div>
          <label className={labelClass} htmlFor="pf-date">
            Date
          </label>
          <input id="pf-date" value={date} onChange={(e) => setDate(e.target.value)} className={fieldClass} placeholder="June 12, 2026" maxLength={40} />
        </div>
        <div>
          <label className={labelClass} htmlFor="pf-readtime">
            Read time
          </label>
          <input id="pf-readtime" value={readTime} onChange={(e) => setReadTime(e.target.value)} className={fieldClass} placeholder="4 min read" maxLength={40} />
        </div>
      </div>

      {existingImage && !removeImage ? (
        <div>
          <span className={labelClass}>Cover image</span>
          <div className="group relative h-40 w-64 max-w-full overflow-hidden rounded-xl border border-white/15">
            <img src={existingImage.url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => {
                setRemoveImage(true)
                setNewFiles([])
              }}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Remove cover image"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <PhotoDropzone label="Cover image" required={!existingImage} files={newFiles} max={1} onChange={setNewFiles} />
          {existingImage && (
            <button
              type="button"
              onClick={() => {
                setRemoveImage(false)
                setNewFiles([])
              }}
              className="mt-2 text-sm font-semibold text-pomelo-blue hover:text-white"
            >
              Keep the original cover image
            </button>
          )}
        </div>
      )}

      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="h-5 w-5 rounded accent-pomelo-blue" />
        <span className="text-sm text-white/80">
          <span className="font-semibold text-white">Featured</span> — use as the large cover story at the top of Insights
        </span>
      </label>

      {shownError && (
        <p role="alert" className="text-sm font-medium text-red-400">
          {shownError}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-gradient-to-r from-pomelo-blue to-pomelo-purple px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pomelo-blue/20 transition-opacity disabled:opacity-60"
        >
          {submitting ? 'Saving…' : mode === 'create' ? 'Add post' : 'Save changes'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="text-sm font-semibold text-white/60 hover:text-white">
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
