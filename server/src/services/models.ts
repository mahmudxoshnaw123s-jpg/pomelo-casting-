import { FieldValue } from 'firebase-admin/firestore'
import type { DocumentData, QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { db } from '../config/firebase'
import { deleteFolder, deletePaths, uploadImage } from './storage'
import type { UploadFile } from './storage'
import type { Model, ModelImage, ModelInput } from '../types/model'

const COLLECTION = 'models'

function toModel(doc: QueryDocumentSnapshot<DocumentData>): Model {
  const data = doc.data()
  const createdAt = data.createdAt
  return {
    id: doc.id,
    firstName: data.firstName ?? '',
    gender: data.gender ?? '',
    height: data.height ?? '',
    hairColor: data.hairColor ?? '',
    eyeColor: data.eyeColor ?? '',
    featured: Boolean(data.featured),
    images: Array.isArray(data.images) ? (data.images as ModelImage[]) : [],
    order: typeof data.order === 'number' ? data.order : 0,
    createdAt: createdAt?.toDate ? createdAt.toDate().toISOString() : null,
  }
}

export async function listModels(featuredOnly = false): Promise<Model[]> {
  let query = db().collection(COLLECTION).orderBy('order', 'asc')
  if (featuredOnly) {
    // Filter in code to avoid requiring a composite index for (featured, order).
    const snap = await query.get()
    return snap.docs.map(toModel).filter((m) => m.featured)
  }
  const snap = await query.get()
  return snap.docs.map(toModel)
}

export async function createModel(input: ModelInput, files: UploadFile[]): Promise<Model> {
  const ref = db().collection(COLLECTION).doc()
  const images = await Promise.all(files.map((file) => uploadImage(`${COLLECTION}/${ref.id}`, file)))

  const payload = {
    firstName: input.firstName,
    gender: input.gender,
    height: input.height,
    hairColor: input.hairColor,
    eyeColor: input.eyeColor,
    featured: input.featured,
    images,
    order: Date.now(),
    createdAt: FieldValue.serverTimestamp(),
  }
  await ref.set(payload)

  const saved = await ref.get()
  return toModel(saved as QueryDocumentSnapshot<DocumentData>)
}

export interface UpdateModelOptions {
  fields?: Partial<ModelInput>
  newFiles?: UploadFile[]
  /** Storage paths of existing images to remove. */
  removeImagePaths?: string[]
}

export async function updateModel(id: string, options: UpdateModelOptions): Promise<Model | null> {
  const ref = db().collection(COLLECTION).doc(id)
  const current = await ref.get()
  if (!current.exists) return null

  const currentData = current.data() as DocumentData
  const currentImages: ModelImage[] = Array.isArray(currentData.images) ? currentData.images : []

  const remove = new Set(options.removeImagePaths ?? [])
  let images = currentImages.filter((img) => !remove.has(img.path))
  if (remove.size > 0) await deletePaths([...remove])

  if (options.newFiles?.length) {
    const uploaded = await Promise.all(options.newFiles.map((file) => uploadImage(`${COLLECTION}/${id}`, file)))
    images = [...images, ...uploaded]
  }

  const patch: DocumentData = { images }
  if (options.fields) {
    for (const [key, value] of Object.entries(options.fields)) {
      if (value !== undefined) patch[key] = value
    }
  }

  await ref.update(patch)
  const saved = await ref.get()
  return toModel(saved as QueryDocumentSnapshot<DocumentData>)
}

export async function deleteModel(id: string): Promise<boolean> {
  const ref = db().collection(COLLECTION).doc(id)
  const current = await ref.get()
  if (!current.exists) return false

  // Remove every image under this model's folder, then the document.
  await deleteFolder(`${COLLECTION}/${id}/`)
  await ref.delete()
  return true
}
