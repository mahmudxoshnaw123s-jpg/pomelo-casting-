import { FieldValue } from 'firebase-admin/firestore'
import type { DocumentData, QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { db } from '../config/firebase'
import { deleteFolder, deletePaths, uploadImage } from './storage'
import type { StoredImage, UploadFile } from './storage'

const COLLECTION = 'posts'

export interface PostInput {
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  featured: boolean
}

export interface Post extends PostInput {
  id: string
  image: StoredImage | null
  order: number
  createdAt: string | null
}

function toPost(doc: QueryDocumentSnapshot<DocumentData>): Post {
  const data = doc.data()
  const image = data.image && typeof data.image.url === 'string' ? (data.image as StoredImage) : null
  return {
    id: doc.id,
    title: data.title ?? '',
    excerpt: data.excerpt ?? '',
    category: data.category ?? '',
    author: data.author ?? '',
    date: data.date ?? '',
    readTime: data.readTime ?? '',
    featured: Boolean(data.featured),
    image,
    order: typeof data.order === 'number' ? data.order : 0,
    createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
  }
}

export async function listPosts(featuredOnly = false): Promise<Post[]> {
  const snap = await db().collection(COLLECTION).orderBy('order', 'desc').get()
  const posts = snap.docs.map(toPost)
  return featuredOnly ? posts.filter((p) => p.featured) : posts
}

export async function createPost(input: PostInput, file?: UploadFile): Promise<Post> {
  const ref = db().collection(COLLECTION).doc()
  const image = file ? await uploadImage(`${COLLECTION}/${ref.id}`, file) : null

  await ref.set({
    title: input.title,
    excerpt: input.excerpt,
    category: input.category,
    author: input.author,
    date: input.date,
    readTime: input.readTime,
    featured: input.featured,
    image,
    order: Date.now(),
    createdAt: FieldValue.serverTimestamp(),
  })

  const saved = await ref.get()
  return toPost(saved as QueryDocumentSnapshot<DocumentData>)
}

export interface UpdatePostOptions {
  fields?: Partial<PostInput>
  newFile?: UploadFile
  removeImage?: boolean
}

export async function updatePost(id: string, options: UpdatePostOptions): Promise<Post | null> {
  const ref = db().collection(COLLECTION).doc(id)
  const current = await ref.get()
  if (!current.exists) return null

  const currentData = current.data() as DocumentData
  const currentImage: StoredImage | null =
    currentData.image && typeof currentData.image.url === 'string' ? (currentData.image as StoredImage) : null

  const patch: DocumentData = {}
  if (options.fields) {
    for (const [key, value] of Object.entries(options.fields)) {
      if (value !== undefined) patch[key] = value
    }
  }

  if (options.newFile) {
    if (currentImage) await deletePaths([currentImage.path])
    patch.image = await uploadImage(`${COLLECTION}/${id}`, options.newFile)
  } else if (options.removeImage && currentImage) {
    await deletePaths([currentImage.path])
    patch.image = null
  }

  await ref.update(patch)
  const saved = await ref.get()
  return toPost(saved as QueryDocumentSnapshot<DocumentData>)
}

export async function deletePost(id: string): Promise<boolean> {
  const ref = db().collection(COLLECTION).doc(id)
  const current = await ref.get()
  if (!current.exists) return false

  await deleteFolder(`${COLLECTION}/${id}/`)
  await ref.delete()
  return true
}
