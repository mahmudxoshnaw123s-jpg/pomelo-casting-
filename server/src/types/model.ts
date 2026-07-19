export interface ModelImage {
  /** Public download URL used by the site. */
  url: string
  /** Storage path (e.g. models/<id>/<file>) used for deletion. */
  path: string
}

export interface ModelInput {
  firstName: string
  gender: string
  height: string
  hairColor: string
  eyeColor: string
  featured: boolean
}

export interface Model extends ModelInput {
  id: string
  images: ModelImage[]
  order: number
  createdAt: string | null
}
