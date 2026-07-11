import { FieldValue } from 'firebase-admin/firestore'
import type { DocumentData } from 'firebase-admin/firestore'
import { db } from '../config/firebase'
import { deleteFolder, uploadImage } from './storage'
import type { StoredImage, UploadFile } from './storage'

const CONTACTS = 'contacts'
const APPLICATIONS = 'applications'

function toIso(data: DocumentData): string | null {
  const c = data.createdAt
  return c?.toDate ? c.toDate().toISOString() : null
}

// ---------------- Contacts ----------------

export interface ContactInput {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface ContactSubmission extends Required<ContactInput> {
  id: string
  read: boolean
  createdAt: string | null
}

export async function saveContact(input: ContactInput): Promise<void> {
  await db()
    .collection(CONTACTS)
    .add({
      name: input.name,
      email: input.email,
      phone: input.phone ?? '',
      subject: input.subject,
      message: input.message,
      read: false,
      createdAt: FieldValue.serverTimestamp(),
    })
}

export async function listContacts(): Promise<ContactSubmission[]> {
  const snap = await db().collection(CONTACTS).orderBy('createdAt', 'desc').get()
  return snap.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      name: data.name ?? '',
      email: data.email ?? '',
      phone: data.phone ?? '',
      subject: data.subject ?? '',
      message: data.message ?? '',
      read: Boolean(data.read),
      createdAt: toIso(data),
    }
  })
}

export async function setContactRead(id: string, read: boolean): Promise<void> {
  await db().collection(CONTACTS).doc(id).update({ read })
}

export async function deleteContact(id: string): Promise<void> {
  await db().collection(CONTACTS).doc(id).delete()
}

// ---------------- Applications ----------------

export interface ApplicationInput {
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

export interface ApplicationPhoto extends StoredImage {
  label: string
}

export interface ApplicationSubmission extends Required<ApplicationInput> {
  id: string
  photos: ApplicationPhoto[]
  read: boolean
  createdAt: string | null
}

export interface ApplicationFileGroup {
  file: UploadFile
  label: string
}

export async function saveApplication(input: ApplicationInput, files: ApplicationFileGroup[]): Promise<void> {
  const ref = db().collection(APPLICATIONS).doc()
  const photos: ApplicationPhoto[] = await Promise.all(
    files.map(async ({ file, label }) => ({ ...(await uploadImage(`${APPLICATIONS}/${ref.id}`, file)), label })),
  )
  await ref.set({
    fullName: input.fullName,
    age: input.age,
    phone: input.phone,
    email: input.email ?? '',
    height: input.height,
    weight: input.weight,
    hairColor: input.hairColor,
    eyeColor: input.eyeColor,
    shoeSize: input.shoeSize,
    shirtSize: input.shirtSize,
    languages: input.languages,
    photos,
    read: false,
    createdAt: FieldValue.serverTimestamp(),
  })
}

export async function listApplications(): Promise<ApplicationSubmission[]> {
  const snap = await db().collection(APPLICATIONS).orderBy('createdAt', 'desc').get()
  return snap.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      fullName: data.fullName ?? '',
      age: data.age ?? '',
      phone: data.phone ?? '',
      email: data.email ?? '',
      height: data.height ?? '',
      weight: data.weight ?? '',
      hairColor: data.hairColor ?? '',
      eyeColor: data.eyeColor ?? '',
      shoeSize: data.shoeSize ?? '',
      shirtSize: data.shirtSize ?? '',
      languages: data.languages ?? '',
      photos: Array.isArray(data.photos) ? (data.photos as ApplicationPhoto[]) : [],
      read: Boolean(data.read),
      createdAt: toIso(data),
    }
  })
}

export async function setApplicationRead(id: string, read: boolean): Promise<void> {
  await db().collection(APPLICATIONS).doc(id).update({ read })
}

export async function deleteApplication(id: string): Promise<void> {
  await deleteFolder(`${APPLICATIONS}/${id}/`)
  await db().collection(APPLICATIONS).doc(id).delete()
}
