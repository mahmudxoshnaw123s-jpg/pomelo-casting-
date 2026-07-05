export interface ContactFormValues {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+\d][\d\s()-]{6,}$/

export function validateField(field: keyof ContactFormValues, value: string): string {
  switch (field) {
    case 'name':
      if (!value.trim()) return 'Please enter your name.'
      if (value.trim().length < 2) return 'Name looks too short.'
      return ''
    case 'email':
      if (!value.trim()) return 'Please enter your email.'
      if (!EMAIL_RE.test(value.trim())) return 'Enter a valid email address.'
      return ''
    case 'phone':
      if (!value.trim()) return ''
      if (!PHONE_RE.test(value.trim())) return 'Enter a valid phone number.'
      return ''
    case 'subject':
      if (!value.trim()) return 'Please choose a subject.'
      return ''
    case 'message':
      if (!value.trim()) return 'Please add a short message.'
      if (value.trim().length < 10) return 'Tell us a little more (10+ characters).'
      return ''
    default:
      return ''
  }
}

export function validateAll(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}
  ;(Object.keys(values) as (keyof ContactFormValues)[]).forEach((field) => {
    const error = validateField(field, values[field])
    if (error) errors[field] = error
  })
  return errors
}
