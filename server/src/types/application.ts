export interface ApplicationPayload {
  fullName: string
  age: string
  phone: string
  email?: string
  height: string
  weight: string
  hairColor: string
  eyeColor: string
  shoeSize: string
  shirtSize: string
  languages: string
}

export interface ApplicationAttachment {
  filename: string
  content: Buffer
  contentType: string
}
