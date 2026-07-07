import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState } from 'react'
import type { FormEvent, MouseEvent } from 'react'
import FaqAccordion from './FaqAccordion'
import FieldShell from './FieldShell'
import SplitText from './SplitText'
import { IconCheck, IconChevronDown, IconClock, IconInstagram, IconMail, IconPin, IconPhone, IconSpinner, IconWhatsapp } from './icons'
import { contact } from '../data/content'
import { submitContact } from '../lib/api'
import { validateAll } from '../lib/validateContact'
import type { ContactFormErrors, ContactFormValues } from '../lib/validateContact'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const initialForm: ContactFormValues = { name: '', email: '', phone: '', subject: '', message: '' }

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

export default function ContactStudio() {
  const [values, setValues] = useState<ContactFormValues>(initialForm)
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormValues, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState('')

  const errors: ContactFormErrors = validateAll(values)

  const handleChange =
    (field: keyof ContactFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleBlur = (field: keyof ContactFormValues) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const borderClass = (field: keyof ContactFormValues) => {
    if (!touched[field]) return 'border-white/10'
    if (errors[field]) return 'border-red-400 focus:border-red-400'
    return 'border-pomelo-blue/50'
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, phone: true, subject: true, message: true })
    if (Object.keys(errors).length > 0) return

    setStatus('submitting')
    setServerError('')

    try {
      await submitContact(values)
      setStatus('success')
      setValues(initialForm)
      setTouched({})
    } catch (err) {
      setStatus('error')
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  const { lat, lng } = contact.mapCoords
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 40, damping: 20 })
  const smy = useSpring(my, { stiffness: 40, damping: 20 })
  const blobAX = useTransform(smx, [-0.5, 0.5], [-24, 24])
  const blobAY = useTransform(smy, [-0.5, 0.5], [-16, 16])
  const blobBX = useTransform(smx, [-0.5, 0.5], [22, -22])
  const blobBY = useTransform(smy, [-0.5, 0.5], [16, -16])

  const handleAmbientMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section
      id="contact"
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
        style={{ x: blobAX, y: blobAY }}
        className="pointer-events-none absolute -top-1/4 left-1/3 h-2/3 w-2/3 rounded-full bg-pomelo-blue/15 blur-[130px]"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        style={{ x: blobBX, y: blobBY }}
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

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <p className="mb-5 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-pomelo-blue">
            <span className="h-px w-8 bg-pomelo-blue" />
            {contact.label}
            <span className="h-px w-8 bg-pomelo-blue" />
          </p>
          <h2 className="text-balance font-display text-4xl italic leading-tight text-white sm:text-5xl lg:text-6xl">
            <SplitText text={contact.heading} />
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg text-white/60">{contact.subhead}</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={`${glassCard} flex h-full flex-col gap-7 p-8`}>
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-pomelo-blue">
                  <IconPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-white">Studio</p>
                  <address className="mt-0.5 text-sm not-italic text-white/55">{contact.address}</address>
                  <a
                    href={directionsHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-sm font-medium text-pomelo-blue hover:text-white"
                  >
                    Get directions →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-pomelo-blue">
                  <IconPhone className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-white">Phone</p>
                  <a href={contact.phoneHref} className="mt-0.5 block text-sm text-white/55 hover:text-pomelo-blue">
                    {contact.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-pomelo-blue">
                  <IconMail className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <a href={`mailto:${contact.email}`} className="mt-0.5 block text-sm text-white/55 hover:text-pomelo-blue">
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-pomelo-blue">
                  <IconClock className="h-5 w-5" />
                </span>
                <div className="w-full">
                  <p className="font-semibold text-white">Business hours</p>
                  <dl className="mt-1 space-y-0.5 text-sm text-white/55">
                    {contact.hours.map((h) => (
                      <div key={h.day} className="flex justify-between gap-4">
                        <dt>{h.day}</dt>
                        <dd className="font-medium text-white/80">{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-4 border-t border-white/10 pt-6">
                <a
                  href={contact.instagramHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Pomelo Casting on Instagram"
                  className="group flex items-center gap-3 text-sm font-medium text-white/55 transition-colors hover:text-pomelo-blue"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:border-pomelo-blue group-hover:text-pomelo-blue">
                    <IconInstagram className="h-4 w-4" />
                  </span>
                  {contact.instagramHandle}
                </a>

                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                >
                  <IconWhatsapp className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={`${glassCard} p-8`}>
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
                    <h3 className="mt-6 font-display text-2xl italic text-white">Message sent</h3>
                    <p className="mt-2 max-w-sm text-white/60">
                      Thanks for reaching out — we'll be in touch within 1 business day.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-8 text-sm font-semibold text-pomelo-blue hover:text-white"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-6"
                  >
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FieldShell label="Name" htmlFor="name" error={touched.name ? errors.name : undefined} showValid={touched.name}>
                        <input
                          id="name"
                          value={values.name}
                          onChange={handleChange('name')}
                          onBlur={handleBlur('name')}
                          className={`${fieldClass} ${borderClass('name')}`}
                          placeholder="Jane Doe"
                          autoComplete="name"
                        />
                      </FieldShell>

                      <FieldShell label="Email" htmlFor="email" error={touched.email ? errors.email : undefined} showValid={touched.email}>
                        <input
                          id="email"
                          type="email"
                          value={values.email}
                          onChange={handleChange('email')}
                          onBlur={handleBlur('email')}
                          className={`${fieldClass} ${borderClass('email')}`}
                          placeholder="jane@brand.com"
                          autoComplete="email"
                        />
                      </FieldShell>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <FieldShell
                        label="Phone"
                        htmlFor="phone"
                        optional
                        error={touched.phone ? errors.phone : undefined}
                        showValid={touched.phone && Boolean(values.phone)}
                      >
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

                      <FieldShell label="Subject" htmlFor="subject" error={touched.subject ? errors.subject : undefined} showValid={touched.subject}>
                        <div className="relative">
                          <select
                            id="subject"
                            value={values.subject}
                            onChange={handleChange('subject')}
                            onBlur={handleBlur('subject')}
                            className={`${fieldClass} ${borderClass('subject')} appearance-none pr-10`}
                          >
                            <option value="" disabled className="bg-[#130b21]">
                              Select a subject
                            </option>
                            {contact.subjects.map((s) => (
                              <option key={s} value={s} className="bg-[#130b21]">
                                {s}
                              </option>
                            ))}
                          </select>
                          <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                        </div>
                      </FieldShell>
                    </div>

                    <FieldShell label="Message" htmlFor="message" error={touched.message ? errors.message : undefined} showValid={touched.message}>
                      <textarea
                        id="message"
                        rows={5}
                        value={values.message}
                        onChange={handleChange('message')}
                        onBlur={handleBlur('message')}
                        className={`${fieldClass} ${borderClass('message')} resize-none`}
                        placeholder="Tell us about your project or brief..."
                      />
                    </FieldShell>

                    <motion.button
                      type="submit"
                      disabled={status === 'submitting'}
                      whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-pomelo-blue to-pomelo-purple px-8 py-4 text-base font-semibold text-white shadow-lg shadow-pomelo-blue/20 transition-shadow disabled:opacity-70 hover:shadow-xl hover:shadow-pomelo-purple/30 sm:w-auto"
                    >
                      <span className="pointer-events-none absolute inset-y-0 left-[-40%] w-1/3 -skew-x-12 bg-white/25 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[220%]" />
                      <span className="relative flex items-center gap-2">
                        {status === 'submitting' && <IconSpinner className="h-4 w-4 animate-spin" />}
                        {status === 'submitting' ? 'Sending...' : 'Send message →'}
                      </span>
                    </motion.button>

                    {status === 'error' && (
                      <p role="alert" className="text-sm font-medium text-red-400">
                        {serverError}
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-24 max-w-3xl"
        >
          <h3 className="mb-8 text-center font-display text-2xl italic text-white sm:text-3xl">Questions from talent</h3>
          <FaqAccordion items={contact.faq} />
        </motion.div>
      </div>
    </section>
  )
}
