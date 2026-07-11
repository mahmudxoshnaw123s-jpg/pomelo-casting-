export interface ModelImage {
  url: string
  path: string
}

export interface TalentModel {
  id: string
  firstName: string
  height: string
  hairColor: string
  eyeColor: string
  featured: boolean
  images: ModelImage[]
  order: number
  createdAt: string | null
}

interface ModelsResponse {
  success: boolean
  models: TalentModel[]
  message?: string
}

interface ModelResponse {
  success: boolean
  model: TalentModel
  message?: string
}

/** Public: list talent for /talent and the home featured section. */
export async function fetchModels(featuredOnly = false): Promise<TalentModel[]> {
  const res = await fetch(`/api/models${featuredOnly ? '?featured=true' : ''}`)
  const data = (await res.json().catch(() => null)) as ModelsResponse | null
  if (!res.ok || !data?.success) {
    throw new Error(data?.message ?? 'Could not load talent.')
  }
  return data.models
}

async function writeModel(method: 'POST' | 'PATCH', path: string, token: string, body: FormData): Promise<TalentModel> {
  const res = await fetch(path, {
    method,
    headers: { Authorization: `Bearer ${token}` },
    body,
  })
  const data = (await res.json().catch(() => null)) as ModelResponse | null
  if (!res.ok || !data?.success) {
    throw new Error(data?.message ?? 'Request failed. Please try again.')
  }
  return data.model
}

export function createModel(token: string, formData: FormData): Promise<TalentModel> {
  return writeModel('POST', '/api/models', token, formData)
}

export function updateModel(token: string, id: string, formData: FormData): Promise<TalentModel> {
  return writeModel('PATCH', `/api/models/${id}`, token, formData)
}

export async function deleteModel(token: string, id: string): Promise<void> {
  const res = await fetch(`/api/models/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = (await res.json().catch(() => null)) as { success: boolean; message?: string } | null
  if (!res.ok || !data?.success) {
    throw new Error(data?.message ?? 'Could not delete the model.')
  }
}
