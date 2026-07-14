export interface Faq {
  id: string
  question: string
  answer: string
  category: string
  order: number
  createdAt: string | null
}

export interface FaqInput {
  question: string
  answer: string
  category: string
}

export async function fetchFaqs(): Promise<Faq[]> {
  const res = await fetch('/api/faqs')
  const data = (await res.json().catch(() => null)) as { success: boolean; faqs: Faq[]; message?: string } | null
  if (!res.ok || !data?.success) {
    throw new Error(data?.message ?? 'Could not load FAQs.')
  }
  return data.faqs
}

async function write(method: 'POST' | 'PATCH', path: string, token: string, body: FaqInput): Promise<Faq> {
  const res = await fetch(path, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = (await res.json().catch(() => null)) as { success: boolean; faq: Faq; message?: string } | null
  if (!res.ok || !data?.success) {
    throw new Error(data?.message ?? 'Request failed. Please try again.')
  }
  return data.faq
}

export function createFaq(token: string, input: FaqInput): Promise<Faq> {
  return write('POST', '/api/faqs', token, input)
}

export function updateFaq(token: string, id: string, input: FaqInput): Promise<Faq> {
  return write('PATCH', `/api/faqs/${id}`, token, input)
}

export async function deleteFaq(token: string, id: string): Promise<void> {
  const res = await fetch(`/api/faqs/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
  const data = (await res.json().catch(() => null)) as { success: boolean; message?: string } | null
  if (!res.ok || !data?.success) {
    throw new Error(data?.message ?? 'Could not delete the FAQ.')
  }
}
