export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  read: boolean
  createdAt: string | null
}

export interface ApplicationPhoto {
  url: string
  path: string
  label: string
}

export interface ApplicationSubmission {
  id: string
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
  photos: ApplicationPhoto[]
  read: boolean
  createdAt: string | null
}

async function authFetch(path: string, token: string, init: RequestInit = {}): Promise<Record<string, unknown>> {
  const res = await fetch(path, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...(init.headers ?? {}) },
  })
  const data = (await res.json().catch(() => null)) as Record<string, unknown> | null
  if (!res.ok || !data?.success) {
    throw new Error((data?.message as string) ?? 'Request failed. Please try again.')
  }
  return data
}

export async function fetchContacts(token: string): Promise<ContactSubmission[]> {
  const data = await authFetch('/api/submissions/contacts', token)
  return (data.contacts as ContactSubmission[]) ?? []
}

export async function fetchApplications(token: string): Promise<ApplicationSubmission[]> {
  const data = await authFetch('/api/submissions/applications', token)
  return (data.applications as ApplicationSubmission[]) ?? []
}

function jsonInit(method: string, body?: unknown): RequestInit {
  return {
    method,
    headers: body === undefined ? {} : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  }
}

export function setContactRead(token: string, id: string, read: boolean): Promise<unknown> {
  return authFetch(`/api/submissions/contacts/${id}`, token, jsonInit('PATCH', { read }))
}

export function deleteContact(token: string, id: string): Promise<unknown> {
  return authFetch(`/api/submissions/contacts/${id}`, token, jsonInit('DELETE'))
}

export function setApplicationRead(token: string, id: string, read: boolean): Promise<unknown> {
  return authFetch(`/api/submissions/applications/${id}`, token, jsonInit('PATCH', { read }))
}

export function deleteApplication(token: string, id: string): Promise<unknown> {
  return authFetch(`/api/submissions/applications/${id}`, token, jsonInit('DELETE'))
}
