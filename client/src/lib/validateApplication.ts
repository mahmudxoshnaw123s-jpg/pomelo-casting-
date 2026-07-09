export interface ApplicationFormValues {
  fullName: string
  age: string
  phone: string
  email: string
  height: string
  weight: string
  hairColor: string
  eyeColor: string
  shoeSize: string
  shirtSize: string
  languages: string
}

export type ApplicationFormErrors = Partial<Record<keyof ApplicationFormValues, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+\d][\d\s()-]{6,}$/

export function validateApplicationField(field: keyof ApplicationFormValues, value: string): string {
  switch (field) {
    case 'fullName':
      if (!value.trim()) return 'Please enter your full name.'
      if (value.trim().length < 2) return 'Name looks too short.'
      return ''
    case 'age': {
      if (!value.trim()) return 'Please enter your age.'
      const age = Number(value)
      if (!Number.isInteger(age) || age < 14 || age > 90) return 'Enter a valid age (14–90).'
      return ''
    }
    case 'phone':
      if (!value.trim()) return 'Please enter your phone number.'
      if (!PHONE_RE.test(value.trim())) return 'Enter a valid phone number.'
      return ''
    case 'email':
      if (!value.trim()) return ''
      if (!EMAIL_RE.test(value.trim())) return 'Enter a valid email address.'
      return ''
    case 'height':
      if (!value.trim()) return 'Please enter your height.'
      return ''
    case 'weight':
      if (!value.trim()) return 'Please enter your weight.'
      return ''
    case 'hairColor':
      if (!value.trim()) return 'Please choose a hair color.'
      return ''
    case 'eyeColor':
      if (!value.trim()) return 'Please choose an eye color.'
      return ''
    case 'shoeSize':
      if (!value.trim()) return 'Please enter your shoe size.'
      return ''
    case 'shirtSize':
      if (!value.trim()) return 'Please choose a shirt size.'
      return ''
    case 'languages':
      if (!value.trim()) return 'Please list at least one language.'
      return ''
    default:
      return ''
  }
}

export function validateApplicationAll(values: ApplicationFormValues): ApplicationFormErrors {
  const errors: ApplicationFormErrors = {}
  ;(Object.keys(values) as (keyof ApplicationFormValues)[]).forEach((field) => {
    const error = validateApplicationField(field, values[field])
    if (error) errors[field] = error
  })
  return errors
}
