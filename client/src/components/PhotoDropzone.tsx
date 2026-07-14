import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'
import type { DragEvent, KeyboardEvent } from 'react'

interface PhotoDropzoneProps {
  label: string
  hint?: string
  required?: boolean
  files: File[]
  max: number
  onChange: (files: File[]) => void
  error?: string
}

function IconUpload() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 16V4M12 4 7 9M12 4l5 5" />
      <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </svg>
  )
}

function IconTrash() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0-1 14a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1L6 6" />
    </svg>
  )
}

function PhotoThumb({ file, onRemove }: { file: File; onRemove: () => void }) {
  // Created inside an effect (not useMemo during render) so StrictMode's dev-only
  // mount->cleanup->mount replay revokes the first URL before the <img> ever requests
  // it, instead of racing an in-flight blob fetch against the revoke.
  const [url, setUrl] = useState<string | null>(null)
  useEffect(() => {
    const objectUrl = URL.createObjectURL(file)
    setUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-white/5"
    >
      {url && <img src={url} alt={file.name} className="h-full w-full object-cover" />}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${file.name}`}
        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
      >
        <IconTrash />
      </button>
    </motion.div>
  )
}

export default function PhotoDropzone({ label, hint, required, files, max, onChange, error }: PhotoDropzoneProps) {
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const canAddMore = files.length < max
  const inputId = useId()
  const errorId = `${inputId}-error`
  const hintId = `${inputId}-hint`

  const addFiles = (incoming: FileList | File[]) => {
    const imagesOnly = Array.from(incoming).filter((f) => f.type.startsWith('image/'))
    const room = max - files.length
    if (room <= 0) return
    onChange([...files, ...imagesOnly.slice(0, room)])
  }

  const openPicker = () => inputRef.current?.click()

  const handleTriggerKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openPicker()
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    if (!canAddMore) return
    addFiles(e.dataTransfer.files)
  }

  const removeAt = (index: number) => {
    onChange(files.filter((_, i) => i !== index))
  }

  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-widest text-white/60">
          {label} {!required && <span className="normal-case text-white/55">(optional)</span>}
        </label>
        <AnimatePresence>
          {error && (
            <motion.span
              id={errorId}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs font-medium text-red-400"
              role="alert"
            >
              {error}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap gap-3">
        <AnimatePresence initial={false}>
          {files.map((file, i) => (
            <PhotoThumb key={`${file.name}-${file.lastModified}-${i}`} file={file} onRemove={() => removeAt(i)} />
          ))}
        </AnimatePresence>

        {canAddMore && (
          <motion.div
            role="button"
            tabIndex={0}
            aria-label={`Upload ${label.toLowerCase()}`}
            aria-describedby={describedBy}
            onClick={openPicker}
            onKeyDown={handleTriggerKeyDown}
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex h-24 w-24 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed text-white/50 outline-none transition-colors duration-300 focus-visible:border-pomelo-blue focus-visible:text-pomelo-blue ${
              dragOver ? 'border-pomelo-blue bg-pomelo-blue/10 text-pomelo-blue' : 'border-white/15 hover:border-white/30 hover:text-white/70'
            }`}
          >
            <IconUpload />
            <span className="text-[0.6rem] font-semibold uppercase tracking-wider">Add photo</span>
          </motion.div>
        )}
      </div>

      {hint && (
        <p id={hintId} className="mt-2 text-xs text-white/40">
          {hint}
        </p>
      )}

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/*"
        multiple={max > 1}
        required={required}
        aria-invalid={Boolean(error)}
        className="hidden"
        onChange={(e) => {
          if (e.target.files) addFiles(e.target.files)
          e.target.value = ''
        }}
      />
    </div>
  )
}
