import { useState } from 'react'
import type { FormEvent } from 'react'
import PhotoDropzone from '../PhotoDropzone'
import { application } from '../../data/content'
import type { ModelImage, TalentModel } from '../../lib/models'

const MAX_IMAGES = 8

const fieldClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-white/25 focus:border-pomelo-blue focus:shadow-[0_0_0_4px_rgba(0,178,226,0.18)]'
const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/60'

interface ModelFormProps {
  mode: 'create' | 'edit'
  initial?: TalentModel
  submitting: boolean
  error?: string
  onSubmit: (formData: FormData) => void | Promise<void>
  onCancel?: () => void
}

export default function ModelForm({ mode, initial, submitting, error, onSubmit, onCancel }: ModelFormProps) {
  const [firstName, setFirstName] = useState(initial?.firstName ?? '')
  const [height, setHeight] = useState(initial?.height ?? '')
  const [hairColor, setHairColor] = useState(initial?.hairColor ?? '')
  const [eyeColor, setEyeColor] = useState(initial?.eyeColor ?? '')
  const [featured, setFeatured] = useState(initial?.featured ?? false)
  const [existing, setExisting] = useState<ModelImage[]>(initial?.images ?? [])
  const [removedPaths, setRemovedPaths] = useState<string[]>([])
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [localError, setLocalError] = useState('')

  const totalImages = existing.length + newFiles.length
  const slotsLeft = Math.max(0, MAX_IMAGES - existing.length)

  const removeExisting = (path: string) => {
    setExisting((prev) => prev.filter((img) => img.path !== path))
    setRemovedPaths((prev) => [...prev, path])
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!firstName.trim() || !height.trim() || !hairColor || !eyeColor) {
      setLocalError('Please fill in name, height, hair color, and eye color.')
      return
    }
    if (totalImages === 0) {
      setLocalError('Add at least one photo.')
      return
    }
    setLocalError('')

    const formData = new FormData()
    formData.append('firstName', firstName.trim())
    formData.append('height', height.trim())
    formData.append('hairColor', hairColor)
    formData.append('eyeColor', eyeColor)
    formData.append('featured', String(featured))
    newFiles.forEach((file) => formData.append('images', file))
    if (removedPaths.length > 0) {
      formData.append('removeImagePaths', JSON.stringify(removedPaths))
    }

    void onSubmit(formData)
  }

  const shownError = localError || error

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="mf-firstName">
            First name
          </label>
          <input
            id="mf-firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={fieldClass}
            placeholder="Lara"
            maxLength={80}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="mf-height">
            Height
          </label>
          <input
            id="mf-height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className={fieldClass}
            placeholder={`5'9" / 175cm`}
            maxLength={40}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="mf-hair">
            Hair color
          </label>
          <select id="mf-hair" value={hairColor} onChange={(e) => setHairColor(e.target.value)} className={fieldClass}>
            <option value="" disabled className="bg-[#130b21]">
              Select
            </option>
            {application.hairColors.map((c) => (
              <option key={c} value={c} className="bg-[#130b21]">
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="mf-eye">
            Eye color
          </label>
          <select id="mf-eye" value={eyeColor} onChange={(e) => setEyeColor(e.target.value)} className={fieldClass}>
            <option value="" disabled className="bg-[#130b21]">
              Select
            </option>
            {application.eyeColors.map((c) => (
              <option key={c} value={c} className="bg-[#130b21]">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {existing.length > 0 && (
        <div>
          <span className={labelClass}>Current photos</span>
          <div className="flex flex-wrap gap-3">
            {existing.map((img, i) => (
              <div key={img.path} className="group relative h-24 w-24 overflow-hidden rounded-xl border border-white/15">
                <img src={img.url} alt="" className="h-full w-full object-cover" />
                {i === 0 && (
                  <span className="absolute left-1 top-1 rounded bg-pomelo-blue/90 px-1.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-white">
                    Cover
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeExisting(img.path)}
                  aria-label="Remove photo"
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <PhotoDropzone
        label={mode === 'edit' ? 'Add more photos' : 'Photos'}
        hint={`First photo is the cover. Up to ${MAX_IMAGES} total.`}
        required={mode === 'create'}
        files={newFiles}
        max={slotsLeft}
        onChange={setNewFiles}
      />

      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="h-5 w-5 rounded accent-pomelo-blue"
        />
        <span className="text-sm text-white/80">
          <span className="font-semibold text-white">Featured</span> — show on the home &ldquo;Faces ready for your next campaign&rdquo; section
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
          {submitting ? 'Saving…' : mode === 'create' ? 'Add talent' : 'Save changes'}
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
