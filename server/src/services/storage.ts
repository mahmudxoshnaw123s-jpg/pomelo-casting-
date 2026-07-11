import { randomUUID } from 'node:crypto'
import { bucket } from '../config/firebase'

export interface UploadFile {
  buffer: Buffer
  mimetype: string
  originalname: string
}

export interface StoredImage {
  url: string
  path: string
}

/** Upload one image under the given path prefix and return a public download URL + path. */
export async function uploadImage(prefix: string, file: UploadFile): Promise<StoredImage> {
  const token = randomUUID()
  const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-80)
  const path = `${prefix}/${randomUUID()}-${safeName}`
  const storageFile = bucket().file(path)

  await storageFile.save(file.buffer, {
    resumable: false,
    contentType: file.mimetype,
    metadata: { metadata: { firebaseStorageDownloadTokens: token } },
  })

  const url = `https://firebasestorage.googleapis.com/v0/b/${bucket().name}/o/${encodeURIComponent(
    path,
  )}?alt=media&token=${token}`

  return { url, path }
}

/** Best-effort delete of individual storage objects by path. */
export async function deletePaths(paths: string[]): Promise<void> {
  await Promise.all(
    paths.map((path) =>
      bucket()
        .file(path)
        .delete()
        .catch(() => undefined),
    ),
  )
}

/** Best-effort delete of every object under a folder prefix. */
export async function deleteFolder(prefix: string): Promise<void> {
  await bucket()
    .deleteFiles({ prefix })
    .catch(() => undefined)
}
