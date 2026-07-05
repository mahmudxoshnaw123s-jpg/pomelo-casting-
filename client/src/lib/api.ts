export interface ContactPayload {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
}

export async function submitContact(payload: ContactPayload): Promise<ContactResponse> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = (await res.json().catch(() => null)) as ContactResponse | null

  if (!res.ok || !data) {
    throw new Error(data?.message ?? 'Something went wrong. Please try again.')
  }

  return data
}
