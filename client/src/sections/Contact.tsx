import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import type { FormEvent } from 'react'
import FaqAccordion from '../components/FaqAccordion'
import FieldShell from '../components/FieldShell'
import Reveal from '../components/Reveal'
import { IconCheck, IconChevronDown, IconClock, IconInstagram, IconMail, IconPin, IconPhone, IconSpinner, IconWhatsapp } from '../components/icons'
import { contact } from '../data/content'
import { submitContact } from '../lib/api'
import { validateAll } from '../lib/validateContact'
import type { ContactFormErrors, ContactFormValues } from '../lib/validateContact'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const initialForm: ContactFormValues = { name: '', email: '', phone: '', subject: '', message: '' }

const glassCard =
  'rounded-3xl border border-line/70 bg-white/50 backdrop-blur-xl shadow-xl shadow-black/5 dark:bg-white/[0.04] dark:shadow-black/20'

const fieldClass =
  'w-full rounded-xl border bg-base/60 px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-soft/40 focus:border-pomelo-blue'

export default function Contact() {
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
    if (!touched[field]) return 'border-line'
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

  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`

  return (
    <section id="contact" className="relative overflow-hidden bg-base-soft py-28 sm:py-36">
      <span
        className="pointer-events-none absolute -right-10 top-10 select-none text-[11rem] font-extrabold leading-none text-pomelo-purple/10 sm:text-[16rem]"
        aria-hidden="true"
      >
        04
      </span>

      <motion.div
        className="absolute -top-1/4 left-1/3 h-2/3 w-2/3 rounded-full bg-pomelo-blue/15 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 25, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-0 -left-1/4 h-2/3 w-2/3 rounded-full bg-pomelo-purple/20 blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, -15, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-4 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-pomelo-blue">
            <span className="h-px w-8 bg-pomelo-blue" />
            {contact.label}
            <span className="h-px w-8 bg-pomelo-blue" />
          </p>
          <h2 className="text-balance text-4xl font-bold leading-tight text-ink sm:text-5xl">{contact.heading}</h2>
          <p className="mx-auto mt-5 max-w-md text-lg text-ink-soft">{contact.subhead}</p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <div className={`${glassCard} flex h-full flex-col gap-7 p-8`}>
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pomelo-blue/15 text-pomelo-blue">
                  <IconPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-ink">Studio</p>
                  <address className="mt-0.5 text-sm not-italic text-ink-soft">{contact.address}</address>
                  <a
                    href={directionsHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-sm font-medium text-pomelo-blue hover:underline"
                  >
                    Get directions →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pomelo-blue/15 text-pomelo-blue">
                  <IconPhone className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-ink">Phone</p>
                  <a href={contact.phoneHref} className="mt-0.5 block text-sm text-ink-soft hover:text-pomelo-blue">
                    {contact.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pomelo-blue/15 text-pomelo-blue">
                  <IconMail className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-ink">Email</p>
                  <a href={`mailto:${contact.email}`} className="mt-0.5 block text-sm text-ink-soft hover:text-pomelo-blue">
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pomelo-blue/15 text-pomelo-blue">
                  <IconClock className="h-5 w-5" />
                </span>
                <div className="w-full">
                  <p className="font-semibold text-ink">Business hours</p>
                  <dl className="mt-1 space-y-0.5 text-sm text-ink-soft">
                    {contact.hours.map((h) => (
                      <div key={h.day} className="flex justify-between gap-4">
                        <dt>{h.day}</dt>
                        <dd className="font-medium text-ink">{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-4 border-t border-line pt-6">
                <a
                  href={contact.instagramHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Pomelo Casting on Instagram"
                  className="group flex items-center gap-3 text-sm font-medium text-ink-soft transition-colors hover:text-pomelo-blue"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition-colors group-hover:border-pomelo-blue group-hover:text-pomelo-blue">
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
          </Reveal>

          <Reveal delay={0.12}>
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
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-pomelo-blue text-[var(--color-on-accent)]"
                    >
                      <IconCheck className="h-7 w-7" />
                    </motion.span>
                    <h3 className="mt-6 text-2xl font-bold text-ink">Message sent</h3>
                    <p className="mt-2 max-w-sm text-ink-soft">
                      Thanks for reaching out — we'll be in touch within 1 business day.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-8 text-sm font-semibold text-pomelo-blue hover:underline"
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
                            <option value="" disabled>
                              Select a subject
                            </option>
                            {contact.subjects.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
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
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-pomelo-blue px-8 py-4 text-base font-semibold text-[var(--color-on-accent)] transition-opacity disabled:opacity-70 sm:w-auto"
                    >
                      {status === 'submitting' && <IconSpinner className="h-4 w-4 animate-spin" />}
                      {status === 'submitting' ? 'Sending...' : 'Send message →'}
                    </motion.button>

                    {status === 'error' && (
                      <p role="alert" className="text-sm font-medium text-red-500">
                        {serverError}
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-8">
          <div className={`${glassCard} overflow-hidden`}>
            <iframe
              title="Pomelo Casting location"
              src={mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[360px] w-full grayscale-[0.2] contrast-[1.05] dark:invert dark:hue-rotate-180"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-24 max-w-3xl">
          <h3 className="mb-8 text-center text-2xl font-bold text-ink sm:text-3xl">Questions from talent</h3>
          <FaqAccordion items={contact.faq} />
        </Reveal>
      </div>
    </section>
  )
}
