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

export interface ApplicationValidationMessages {
  fullName: string
  nameShort: string
  age: string
  ageInvalid: string
  phone: string
  phoneInvalid: string
  email: string
  height: string
  weight: string
  hairColor: string
  eyeColor: string
  shoeSize: string
  shirtSize: string
  languages: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+\d][\d\s()-]{6,}$/

export function validateApplicationField(
  field: keyof ApplicationFormValues,
  value: string,
  messages: ApplicationValidationMessages,
): string {
  switch (field) {
    case 'fullName':
      if (!value.trim()) return messages.fullName
      if (value.trim().length < 2) return messages.nameShort
      return ''
    case 'age': {
      if (!value.trim()) return messages.age
      const age = Number(value)
      if (!Number.isInteger(age) || age < 14 || age > 90) return messages.ageInvalid
      return ''
    }
    case 'phone':
      if (!value.trim()) return messages.phone
      if (!PHONE_RE.test(value.trim())) return messages.phoneInvalid
      return ''
    case 'email':
      if (!value.trim()) return ''
      if (!EMAIL_RE.test(value.trim())) return messages.email
      return ''
    case 'height':
      if (!value.trim()) return messages.height
      return ''
    case 'weight':
      if (!value.trim()) return messages.weight
      return ''
    case 'hairColor':
      if (!value.trim()) return messages.hairColor
      return ''
    case 'eyeColor':
      if (!value.trim()) return messages.eyeColor
      return ''
    case 'shoeSize':
      if (!value.trim()) return messages.shoeSize
      return ''
    case 'shirtSize':
      if (!value.trim()) return messages.shirtSize
      return ''
    case 'languages':
      if (!value.trim()) return messages.languages
      return ''
    default:
      return ''
  }
}

export function validateApplicationAll(
  values: ApplicationFormValues,
  messages: ApplicationValidationMessages,
): ApplicationFormErrors {
  const errors: ApplicationFormErrors = {}
  ;(Object.keys(values) as (keyof ApplicationFormValues)[]).forEach((field) => {
    const error = validateApplicationField(field, values[field], messages)
    if (error) errors[field] = error
  })
  return errors
}
