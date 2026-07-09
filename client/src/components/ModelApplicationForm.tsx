import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState } from 'react'
import type { FormEvent, MouseEvent } from 'react'
import FieldShell from './FieldShell'
import PhotoDropzone from './PhotoDropzone'
import SplitText from './SplitText'
import { IconCheck, IconSpinner } from './icons'
import { application } from '../data/content'
import { submitApplication } from '../lib/api'
import { validateApplicationAll } from '../lib/validateApplication'
import type { ApplicationFormErrors, ApplicationFormValues } from '../lib/validateApplication'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const initialValues: ApplicationFormValues = {
  fullName: '',
  age: '',
  phone: '',
  email: '',
  height: '',
  weight: '',
  hairColor: '',
  eyeColor: '',
  shoeSize: '',
  shirtSize: '',
  languages: '',
}

const glassCard = 'rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl shadow-black/40'

const fieldClass =
  'w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-white/25 focus:border-pomelo-blue focus:shadow-[0_0_0_4px_rgba(0,178,226,0.18)]'

const particles = Array.from({ length: 14 }).map((_, i) => ({
  left: (i * 29 + 11) % 100,
  top: (i * 17 + 9) % 100,
  size: 2 + (i % 3),
  duration: 11 + (i % 5) * 2,
  delay: (i % 6) * 0.7,
}))

export default function ModelApplicationForm() {
  const [values, setValues] = useState<ApplicationFormValues>(initialValues)
  const [touched, setTouched] = useState<Partial<Record<keyof ApplicationFormValues, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState('')
  const [progress, setProgress] = useState(0)

  const [fullBody, setFullBody] = useState<File[]>([])
  const [mediumShot, setMediumShot] = useState<File[]>([])
  const [closeUp, setCloseUp] = useState<File[]>([])
  const [additional, setAdditional] = useState<File[]>([])
  const [photosTouched, setPhotosTouched] = useState(false)

  const errors: ApplicationFormErrors = validateApplicationAll(values)
  const photoErrors = {
    fullBody: photosTouched && fullBody.length === 0 ? 'A full body photo is required.' : undefined,
    mediumShot: photosTouched && mediumShot.length === 0 ? 'A medium shot is required.' : undefined,
    closeUp: photosTouched && closeUp.length === 0 ? 'A close-up photo is required.' : undefined,
  }

  const handleChange =
    (field: keyof ApplicationFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleBlur = (field: keyof ApplicationFormValues) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const borderClass = (field: keyof ApplicationFormValues) => {
    if (!touched[field]) return 'border-white/10'
    if (errors[field]) return 'border-red-400 focus:border-red-400'
    return 'border-pomelo-blue/50'
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched({
      fullName: true,
      age: true,
      phone: true,
      email: true,
      height: true,
      weight: true,
      hairColor: true,
      eyeColor: true,
      shoeSize: true,
      shirtSize: true,
      languages: true,
    })
    setPhotosTouched(true)

    const hasFieldErrors = Object.keys(errors).length > 0
    const hasPhotoErrors = fullBody.length === 0 || mediumShot.length === 0 || closeUp.length === 0
    if (hasFieldErrors || hasPhotoErrors) return

    setStatus('submitting')
    setServerError('')
    setProgress(0)

    const formData = new FormData()
    ;(Object.keys(values) as (keyof ApplicationFormValues)[]).forEach((key) => formData.append(key, values[key]))
    formData.append('fullBody', fullBody[0])
    formData.append('mediumShot', mediumShot[0])
    formData.append('closeUp', closeUp[0])
    additional.forEach((file) => formData.append('additional', file))

    try {
      await submitApplication(formData, setProgress)
      setStatus('success')
      setValues(initialValues)
      setTouched({})
      setFullBody([])
      setMediumShot([])
      setCloseUp([])
      setAdditional([])
      setPhotosTouched(false)
    } catch (err) {
      setStatus('error')
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 20 })
  const sy = useSpring(my, { stiffness: 40, damping: 20 })
  const blobX = useTransform(sx, [-0.5, 0.5], [-24, 24])
  const blobY = useTransform(sy, [-0.5, 0.5], [-16, 16])

  const handleAmbientMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section
      onMouseMove={handleAmbientMove}
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#0b0713] via-[#130b21] to-[#0a0f1a] py-28 sm:py-36"
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
        className="pointer-events-none absolute -top-1/4 left-1/3 h-2/3 w-2/3 rounded-full bg-pomelo-blue/15 blur-[130px]"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        style={{ x: useTransform(blobX, (v) => -v), y: useTransform(blobY, (v) => -v) }}
        className="pointer-events-none absolute bottom-0 -left-1/4 h-2/3 w-2/3 rounded-full bg-pomelo-purple/20 blur-[130px]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/50"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -28, 0], opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <p className="mb-5 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-pomelo-blue">
            <span className="h-px w-8 bg-pomelo-blue" />
            {application.label}
            <span className="h-px w-8 bg-pomelo-blue" />
          </p>
          <h1 className="text-balance font-display text-4xl italic leading-tight text-white sm:text-5xl">
            <SplitText text={application.heading} />
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg text-white/60">{application.subhead}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`${glassCard} p-6 sm:p-10`}
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pomelo-blue to-pomelo-purple text-white"
                >
                  <IconCheck className="h-7 w-7" />
                </motion.span>
                <h3 className="mt-6 font-display text-2xl italic text-white">{application.success.heading}</h3>
                <p className="mt-2 max-w-sm text-white/60">{application.success.body}</p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-sm font-semibold text-pomelo-blue hover:text-white"
                >
                  Submit another application
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} noValidate>
                <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-white/50">Model information</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <FieldShell label="Full name" htmlFor="fullName" error={touched.fullName ? errors.fullName : undefined} showValid={touched.fullName}>
                    <input
                      id="fullName"
                      value={values.fullName}
                      onChange={handleChange('fullName')}
                      onBlur={handleBlur('fullName')}
                      className={`${fieldClass} ${borderClass('fullName')}`}
                      placeholder="Jane Doe"
                      autoComplete="name"
                    />
                  </FieldShell>

                  <FieldShell label="Age" htmlFor="age" error={touched.age ? errors.age : undefined} showValid={touched.age}>
                    <input
                      id="age"
                      type="number"
                      min={14}
                      max={90}
                      value={values.age}
                      onChange={handleChange('age')}
                      onBlur={handleBlur('age')}
                      className={`${fieldClass} ${borderClass('age')}`}
                      placeholder="24"
                    />
                  </FieldShell>

                  <FieldShell label="Phone number" htmlFor="phone" error={touched.phone ? errors.phone : undefined} showValid={touched.phone}>
                    <input
                      id="phone"
                      type="tel"
                      value={values.phone}
                      onChange={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      className={`${fieldClass} ${borderClass('phone')}`}
                      placeholder="+964 750 000 0000"
                      autoComplete="tel"
                    />
                  </FieldShell>

                  <FieldShell
                    label="Email address"
                    htmlFor="email"
                    optional
                    error={touched.email ? errors.email : undefined}
                    showValid={touched.email && Boolean(values.email)}
                  >
                    <input
                      id="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange('email')}
                      onBlur={handleBlur('email')}
                      className={`${fieldClass} ${borderClass('email')}`}
                      placeholder="jane@email.com"
                      autoComplete="email"
                    />
                  </FieldShell>

                  <FieldShell label="Height" htmlFor="height" error={touched.height ? errors.height : undefined} showValid={touched.height}>
                    <input
                      id="height"
                      value={values.height}
                      onChange={handleChange('height')}
                      onBlur={handleBlur('height')}
                      className={`${fieldClass} ${borderClass('height')}`}
                      placeholder={`5'8" / 173cm`}
                    />
                  </FieldShell>

                  <FieldShell label="Weight" htmlFor="weight" error={touched.weight ? errors.weight : undefined} showValid={touched.weight}>
                    <input
                      id="weight"
                      value={values.weight}
                      onChange={handleChange('weight')}
                      onBlur={handleBlur('weight')}
                      className={`${fieldClass} ${borderClass('weight')}`}
                      placeholder="130lb / 59kg"
                    />
                  </FieldShell>

                  <FieldShell label="Hair color" htmlFor="hairColor" error={touched.hairColor ? errors.hairColor : undefined} showValid={touched.hairColor}>
                    <select
                      id="hairColor"
                      value={values.hairColor}
                      onChange={handleChange('hairColor')}
                      onBlur={handleBlur('hairColor')}
                      className={`${fieldClass} ${borderClass('hairColor')}`}
                    >
                      <option value="" disabled className="bg-[#130b21]">
                        Select
                      </option>
                      {application.hairColors.map((c) => (
                        <option key={c} value={c} className="bg-[#130b21]">
                          {c}
                        </option>
                      ))}
                    </select>
                  </FieldShell>

                  <FieldShell label="Eye color" htmlFor="eyeColor" error={touched.eyeColor ? errors.eyeColor : undefined} showValid={touched.eyeColor}>
                    <select
                      id="eyeColor"
                      value={values.eyeColor}
                      onChange={handleChange('eyeColor')}
                      onBlur={handleBlur('eyeColor')}
                      className={`${fieldClass} ${borderClass('eyeColor')}`}
                    >
                      <option value="" disabled className="bg-[#130b21]">
                        Select
                      </option>
                      {application.eyeColors.map((c) => (
                        <option key={c} value={c} className="bg-[#130b21]">
                          {c}
                        </option>
                      ))}
                    </select>
                  </FieldShell>

                  <FieldShell label="Shoe size" htmlFor="shoeSize" error={touched.shoeSize ? errors.shoeSize : undefined} showValid={touched.shoeSize}>
                    <input
                      id="shoeSize"
                      value={values.shoeSize}
                      onChange={handleChange('shoeSize')}
                      onBlur={handleBlur('shoeSize')}
                      className={`${fieldClass} ${borderClass('shoeSize')}`}
                      placeholder="US 8"
                    />
                  </FieldShell>

                  <FieldShell label="Shirt size" htmlFor="shirtSize" error={touched.shirtSize ? errors.shirtSize : undefined} showValid={touched.shirtSize}>
                    <select
                      id="shirtSize"
                      value={values.shirtSize}
                      onChange={handleChange('shirtSize')}
                      onBlur={handleBlur('shirtSize')}
                      className={`${fieldClass} ${borderClass('shirtSize')}`}
                    >
                      <option value="" disabled className="bg-[#130b21]">
                        Select
                      </option>
                      {application.shirtSizes.map((s) => (
                        <option key={s} value={s} className="bg-[#130b21]">
                          {s}
                        </option>
                      ))}
                    </select>
                  </FieldShell>

                  <FieldShell
                    label="Languages spoken"
                    htmlFor="languages"
                    error={touched.languages ? errors.languages : undefined}
                    showValid={touched.languages}
                  >
                    <input
                      id="languages"
                      value={values.languages}
                      onChange={handleChange('languages')}
                      onBlur={handleBlur('languages')}
                      className={`${fieldClass} ${borderClass('languages')}`}
                      placeholder="English, Kurdish, Arabic"
                    />
                  </FieldShell>
                </div>

                <h2 className="mb-6 mt-12 text-sm font-semibold uppercase tracking-[0.25em] text-white/50">Photos</h2>
                <div className="space-y-8">
                  <PhotoDropzone
                    label="Full body photo"
                    required
                    files={fullBody}
                    max={1}
                    onChange={setFullBody}
                    error={photoErrors.fullBody}
                  />
                  <PhotoDropzone
                    label="Medium shot"
                    required
                    files={mediumShot}
                    max={1}
                    onChange={setMediumShot}
                    error={photoErrors.mediumShot}
                  />
                  <PhotoDropzone
                    label="Close-up (headshot)"
                    required
                    files={closeUp}
                    max={1}
                    onChange={setCloseUp}
                    error={photoErrors.closeUp}
                  />
                  <PhotoDropzone
                    label="Additional photos"
                    hint="Up to 3 more — full body, movement, or editorial shots."
                    files={additional}
                    max={3}
                    onChange={setAdditional}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative mt-12 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-pomelo-blue to-pomelo-purple px-8 py-4 text-base font-semibold text-white shadow-lg shadow-pomelo-blue/20 transition-shadow disabled:opacity-80 hover:shadow-xl hover:shadow-pomelo-purple/30"
                >
                  {status === 'submitting' && (
                    <motion.span
                      className="absolute inset-y-0 left-0 bg-white/15"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <span className="pointer-events-none absolute inset-y-0 left-[-40%] w-1/3 -skew-x-12 bg-white/25 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[220%]" />
                  <span className="relative flex items-center gap-2">
                    {status === 'submitting' && <IconSpinner className="h-4 w-4 animate-spin" />}
                    {status === 'submitting' ? `Submitting… ${progress}%` : 'Submit application →'}
                  </span>
                </motion.button>

                {status === 'error' && (
                  <p role="alert" className="mt-4 text-sm font-medium text-red-400">
                    {serverError}
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
