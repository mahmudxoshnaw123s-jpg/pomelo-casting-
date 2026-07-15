import { FieldValue } from 'firebase-admin/firestore'
import type { DocumentData, QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { db } from '../config/firebase'

const COLLECTION = 'faqs'

export interface FaqInput {
  question: string
  answer: string
  category: string
}

export interface Faq extends FaqInput {
  id: string
  order: number
  createdAt: string | null
}

function toFaq(doc: QueryDocumentSnapshot<DocumentData>): Faq {
  const data = doc.data()
  return {
    id: doc.id,
    question: data.question ?? '',
    answer: data.answer ?? '',
    category: data.category ?? '',
    order: typeof data.order === 'number' ? data.order : 0,
    createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
  }
}

export async function listFaqs(): Promise<Faq[]> {
  const snap = await db().collection(COLLECTION).orderBy('order', 'asc').get()
  return snap.docs.map(toFaq)
}

export async function createFaq(input: FaqInput): Promise<Faq> {
  const ref = db().collection(COLLECTION).doc()
  await ref.set({
    question: input.question,
    answer: input.answer,
    category: input.category,
    order: Date.now(),
    createdAt: FieldValue.serverTimestamp(),
  })
  const saved = await ref.get()
  return toFaq(saved as QueryDocumentSnapshot<DocumentData>)
}

export async function updateFaq(id: string, fields: Partial<FaqInput>): Promise<Faq | null> {
  const ref = db().collection(COLLECTION).doc(id)
  const current = await ref.get()
  if (!current.exists) return null

  const patch: DocumentData = {}
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) patch[key] = value
  }
  await ref.update(patch)

  const saved = await ref.get()
  return toFaq(saved as QueryDocumentSnapshot<DocumentData>)
}

export async function deleteFaq(id: string): Promise<boolean> {
  const ref = db().collection(COLLECTION).doc(id)
  const current = await ref.get()
  if (!current.exists) return false
  await ref.delete()
  return true
}
