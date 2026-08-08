export interface ContactFormValues {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

export interface ContactValidationMessages {
  name: string
  nameShort: string
  email: string
  emailInvalid: string
  phoneInvalid: string
  subject: string
  message: string
  messageShort: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+\d][\d\s()-]{6,}$/

export function validateField(field: keyof ContactFormValues, value: string, messages: ContactValidationMessages): string {
  switch (field) {
    case 'name':
      if (!value.trim()) return messages.name
      if (value.trim().length < 2) return messages.nameShort
      return ''
    case 'email':
      if (!value.trim()) return messages.email
      if (!EMAIL_RE.test(value.trim())) return messages.emailInvalid
      return ''
    case 'phone':
      if (!value.trim()) return ''
      if (!PHONE_RE.test(value.trim())) return messages.phoneInvalid
      return ''
    case 'subject':
      if (!value.trim()) return messages.subject
      return ''
    case 'message':
      if (!value.trim()) return messages.message
      if (value.trim().length < 10) return messages.messageShort
      return ''
    default:
      return ''
  }
}

export function validateAll(values: ContactFormValues, messages: ContactValidationMessages): ContactFormErrors {
  const errors: ContactFormErrors = {}
  ;(Object.keys(values) as (keyof ContactFormValues)[]).forEach((field) => {
    const error = validateField(field, values[field], messages)
    if (error) errors[field] = error
  })
  return errors
}
